<template>
  <!--begin::Card-->
  <PermissionDenied v-if="refData.unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />
  <div class="card" v-else>
    <!--begin::Card body-->
    <DataLoader v-if="refData.loadingData"></DataLoader>
    <div class="card-body pt-5" v-else>
      <div class="row mb-10">
        <div class="col-md-12 m5">
          <h2 class="mb-5">Customer Portal Permissions</h2>
        </div>
        <hr />

        <div
          v-for="(
            permission_group, key
          ) in customerPermissionList.customer_permissions"
          :key="key"
          class="col-md-6 mb-10"
        >
          <h5>{{ key }}</h5>
          <div v-for="permission in permission_group" :key="permission.id">
            <label
              class="form-check form-check-custom form-check-solid me-10 mb-3"
            >
              <input
                class="form-check-input h-20px w-20px checkbox-success"
                type="checkbox"
                :value="permission.id"
                v-model="checkedRows"
              />

              <span class="form-check-label fw-semobold">
                <b>Can</b> {{ permission.name }}
              </span>
            </label>
          </div>
        </div>
      </div>
      <div class="row" v-if="customer.id === 1">
        <div class="col-md-12">
          <h2>Admin Portal Permissions</h2>
        </div>
        <hr />
        <div
          v-for="(
            permission_group, key
          ) in customerPermissionList.admin_permissions"
          :key="key"
          class="col-md-5 mb-4"
        >
          <h5>{{ key }}</h5>
          <div v-for="permission in permission_group" :key="permission.id">
            <label
              class="form-check form-check-custom form-check-solid me-10 mb-3"
            >
              <input
                class="form-check-input h-20px w-20px checkbox-success"
                type="checkbox"
                :value="permission.id"
                v-model="checkedRows"
              />

              <span class="form-check-label fw-semobold">
                <b>Can</b> {{ permission.name }}
              </span>
            </label>
          </div>
        </div>
      </div>

      <div class="col-md-12 pb-3">
        <button
          v-if="!refData.loadingAction"
          class="btn btn-success btn-sm"
          @click="updatePermissions"
        >
          Update Permissions
        </button>
        <button v-else class="btn btn-success btn-sm" disabled>
          Processing ...
        </button>
      </div>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useAdminCustomerStore } from "@/stores/admin/customer";
import { useRoute } from "vue-router";
import type { iCustomer, iCustomerPermissionList } from "@/models/customer";

import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import DataLoader from "@/components/DataLoader.vue";
import useOutputFormat from "@/composables/useOutputFormat";
import { AlertService } from "@/services/AlertService";

export default defineComponent({
  inheritAttrs: false,
  name: "admin-customers-permissions",
  components: {
    DataLoader,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //admin account store
    const customerStore = useAdminCustomerStore();
    const route = useRoute();

    //data variables
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,
      loadingData: true,
      loadingAction: false,
    });

    const customer = ref({} as iCustomer);

    const customerPermissionList = ref<iCustomerPermissionList>();

    const checkedRows = ref<Array<number>>([]);

    const getCustomerPermissions = () => {
      refData.value.loadingData = true;
      customerStore
        .getCustomerPermissionsList(route.params.id)
        .then((response: iCustomerPermissionList) => {
          customerPermissionList.value = response;
          checkedRows.value = response.enabled_permissions;
          refData.value.loadingData = false;
        });
    };

    const updatePermissions = () => {
      refData.value.loadingAction = true;
      const payload = {
        customer_id: route.params.id,
        request: {
          enabled_permissions: checkedRows.value,
        },
      };
      customerStore
        .updateCustomerPermissions(payload)
        .then(() => {
          //display message using shared AlertService
          AlertService.displaySuccessAlert("Data updated successfully!");
        })
        .catch((error) => {
          //display message using shared AlertService
          AlertService.displayErrorAlert(error.response.data);
        })
        .finally(() => (refData.value.loadingAction = false));
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getCustomerPermissions();
      refData.value.loadingPage = false;
    });

    //output formatting
    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();
    return {
      //variables
      refData,

      //functions
      updatePermissions,

      //api data

      customerPermissionList,
      customer,
      //
      checkedRows,

      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,
    };
  },
});
</script>
