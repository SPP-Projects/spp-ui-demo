<template>
  <!--begin::details View-->

  <DataLoader v-if="loadingCustomerInfo"></DataLoader>
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view" v-else>
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Customer Information</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Name</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{ customer.name }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted"> Phone </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 d-flex align-items-center">
          <span class="fw-bold fs-6 me-2">{{ customer.phone }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted"> country </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 d-flex align-items-center" v-if="customer.country">
          <span class="fw-bold fs-6 me-2">{{ customer.country.name }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->
      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Created At</label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semobold fs-6">{{
            formatDateTime(customer.created_at)
          }}</span>
        </div>
        <!--begin::Label-->
      </div>

      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted"> Last updated </label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semobold fs-6">{{
            formatDateTime(customer.updated_at)
          }}</span>
        </div>
        <!--begin::Label-->
      </div>
      <!--end::Input group-->

      <hr class="mb-10 pt-2" />
      <h3 class="mb-7">Categorization</h3>
      <div class="row mb-7" v-if="customer">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Customer Group</label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8" v-if="customer.group">
          <span class="fw-semobold fs-6">{{ customer.group.name }}</span>
        </div>
        <!--begin::Label-->
      </div>
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Customer Type</label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8" v-if="customer.type">
          <span class="fw-semobold fs-6">{{ customer.type.name }}</span>
        </div>
        <!--begin::Label-->
      </div>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useCustomerUserStore } from "@/stores/customer/user";
import { storeToRefs } from "pinia";
import { useAdminCustomerStore } from "@/stores/admin/customer";
import { useRoute } from "vue-router";
import DataLoader from "@/components/DataLoader.vue";
import useOutputFormat from "@/composables/useOutputFormat";

export default defineComponent({
  inheritAttrs: false,
  name: "admin-customers-overview",
  components: { DataLoader },
  setup() {
    //store
    const customerStore = useAdminCustomerStore();
    const { customer, loadingCustomerInfo } = storeToRefs(customerStore);

    //ref
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,
      loadingAction: false,
    });

    onMounted(() => {
      refData.value.loadingPage = true;
      refData.value.loadingPage = false;
    });
    //output formatting
    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();
    return {
      refData,
      customer,
      loadingCustomerInfo,
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,
    };
  },
});
</script>
