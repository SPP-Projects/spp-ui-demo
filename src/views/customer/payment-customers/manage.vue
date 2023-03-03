<template>
  <!--begin::Card-->
  <PermissionDenied v-if="unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />
  <div class="card" v-else>
    <!--begin::Card header-->
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <span class="svg-icon svg-icon-1 position-absolute ms-6">
            <inline-svg src="/media/icons/duotune/general/gen021.svg" />
          </span>
          <input
            type="text"
            data-kt-subscription-table-filter="search"
            class="form-control form-control-solid w-250px ps-14"
            placeholder="Search ..."
            v-model="table_options.search_text"
          />
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Group actions-->
        <div class="d-flex justify-content-end align-items-center">
          <div class="fw-bold me-5">
            <span class="me-2" v-if="meta.total >= 1">
              Showing {{ meta.from }} to {{ meta.to }} of
              {{ meta.total }}
            </span>
          </div>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pt-0">
      <KTDatatable
        :data="paymentCustomers"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingPaymentCustomerData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:customer_id="{ row: data }">
          {{ data.customer_id }}
        </template>
        <template v-slot:name="{ row: data }">
          {{ data.name }}
        </template>
        <template v-slot:email="{ row: data }">
          <router-link :to="'/payment-customers/' + data.id">
            {{ data.email }}</router-link
          >
        </template>
        <template v-slot:phone="{ row: data }">
          {{ data.phone }}
        </template>

        <template v-slot:is_blacklisted="{ row: data }">
          <span v-if="!data.is_blacklisted" class="badge badge-light-success"
            >Active</span
          >

          <span v-else class="badge badge-danger">Black Listed</span>
        </template>

        <template v-slot:created_at="{ row: data }">
          {{ formatDateTime(data.created_at) }}
        </template>

        <template v-slot:actions="{ row: data }">
          <router-link
            :to="'/payment-customers/' + data.id"
            class="btn btn-sm btn-primary me-2 mb-2"
          >
            View Transactions
          </router-link>
          <button
            class="btn btn-sm btn-light-info btn-active-light-info mb-2"
            @click="showEditCustomerModal(data)"
            data-bs-toggle="modal"
            id="edit-btn"
            data-bs-target="#kt_modal_update_customer"
          >
            Edit
          </button>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <!--Update Customer Details Modal-->
  <div
    class="modal fade"
    id="kt_modal_update_customer"
    ref="updateCustomerModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->

      <div class="modal-content" v-if="customer">
        <!--begin::Form-->
        <el-form
          class="form"
          @submit.prevent="processCustomerAction()"
          :model="customer"
          :rules="rules"
          ref="formUpdateCustomerRef"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_customer_header">
            <!--begin::Modal title-->
            <h2>Update Payment Customer Details</h2>
            <!--end::Modal title-->

            <!--begin::Close-->
            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <span class="svg-icon svg-icon-1">
                <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
              </span>
            </div>
            <!--end::Close-->
          </div>
          <!--end::Modal header-->

          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_new_new_payment_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_new_customer_header"
              data-kt-scroll-wrappers="#kt_modal_new_new_payment_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="d-flex flex-column mb-4 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                  <span class="">Name</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="name">
                  <el-input
                    v-model="customer.name"
                    placeholder="Enter Name"
                    name="name"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="d-flex flex-column mb-4 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                  <span class="">Phone</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="phone">
                  <el-input
                    v-model="customer.phone"
                    placeholder="Enter Phone"
                    name="phone"
                    type="text"
                  ></el-input>
                </el-form-item>
              </div>

              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row g-9 mb-8">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Status / Blacklisted?</label
                  >
                  <hr />

                  <el-radio-group
                    v-model="customer.is_blacklisted"
                    size="large"
                  >
                    <el-radio-button label="0">Active</el-radio-button>
                    <el-radio-button label="1">BlackListed</el-radio-button>
                  </el-radio-group>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_update_customer_cancel"
              class="btn btn-light me-3"
              data-bs-dismiss="modal"
              :disabled="refData.loadingAction"
            >
              Cancel
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              :data-kt-indicator="refData.loadingAction ? 'on' : null"
              class="btn btn-lg btn-primary"
              type="submit"
              @click="processCustomerAction()"
              :disabled="refData.loadingAction"
            >
              <span v-if="!refData.loadingAction" class="indicator-label">
                Update
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                </span>
              </span>
              <span v-if="refData.loadingAction" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
  <!--Update Customer Details Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { hideModal } from "@/core/helpers/dom";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";

import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import useOutputFormat from "@/composables/useOutputFormat";
import { useCustomerPaymentCustomerStore } from "@/stores/customer/paymentcustomer";
import { AlertService } from "@/services/AlertService";

export default defineComponent({
  name: "manage-payment-customers",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const paymentCustomerStore = useCustomerPaymentCustomerStore();
    const { paymentCustomers, meta, loadingPaymentCustomerData, unauthorized } =
      storeToRefs(paymentCustomerStore);
    const { getPaymentCustomers } = useCustomerPaymentCustomerStore();

    //data variables
    const refData = ref({
      loadingPage: true,
      loadingAction: false,
    });

    const tableHeader = ref([
      {
        columnLabel: "customer_id",
        columnName: "customer id",
        sortEnabled: true,
      },
      { columnLabel: "name", columnName: "Name", sortEnabled: true },
      { columnLabel: "phone", columnName: "phone", sortEnabled: true },
      { columnLabel: "email", columnName: "email", sortEnabled: true },
      {
        columnLabel: "is_blacklisted",
        columnName: "is blacklisted?",
        sortEnabled: true,
      },
      {
        columnLabel: "created_at",
        columnName: "created at",
        sortEnabled: false,
      },
      {
        columnLabel: "actions",
        columnName: "Actions",
      },
    ]);

    const table_options = ref({
      current_page: 1,
      page_size: 20,
      search_text: "",
      sort: { column: "", direction: "" },
    });
    const action = ref("");
    const customer = ref<any>({
      id: 0,
      action: "Edit",
      name: "",
      phone: "",
      is_blacklisted: "",
    });

    const formUpdateCustomerRef = ref<null | HTMLFormElement>(null);
    const updateCustomerModalRef = ref<null | HTMLElement>(null);
    const rules = ref({
      // name: [
      //   {
      //     required: true,
      //     message: "Name is required",
      //     trigger: "change",
      //   },
      // ],
      // phone: [
      //   {
      //     required: true,
      //     message: "Phone is required",
      //     trigger: "change",
      //     type: "phone",
      //   },
      // ],
      // is_blacklisted: [
      //   {
      //     required: true,
      //     message: "Status is required",
      //     trigger: "change",
      //   },
      // ],
    });

    const searchRecords = ref({
      isSearching: false,
      debounceTimeout: ref<number>(0),
      debounce: 2000,
      kDebounceTimeoutMs: 1000,
    });

    const processCustomerAction = () => {
      if (!formUpdateCustomerRef.value) {
        return;
      }

      formUpdateCustomerRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          paymentCustomerStore
            .updatePaymentCustomer(customer.value)
            .then(() => {
              refData.value.loadingAction = false;

              //display message using shared AlertService
              AlertService.displaySuccessAlert(
                "Customer updated successfully!"
              );

              getPaymentCustomers(table_options.value);

              hideModal(updateCustomerModalRef.value);
            })
            .catch((error) => {
              //display message using shared AlertService
              AlertService.displayMultipleErrorsAlert(error);

              // update loading status
              refData.value.loadingAction = false;
            })
            .finally(() => (refData.value.loadingAction = false));
        } else {
          return false;
        }
      });
    };

    const handlePerPageChange = (size: number) => {
      table_options.value.current_page = 1;
      table_options.value.page_size = size;
      getPaymentCustomers(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getPaymentCustomers(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      // get customers
      getPaymentCustomers(table_options.value);
    };

    //modals
    const showEditCustomerModal = async (data) => {
      customer.value = data;
      customer.value.action = "Edit";
    };

    //output formatting
    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();

    watch(
      () => table_options.value.search_text,
      () => {
        if (searchRecords.value.debounceTimeout) {
          clearTimeout(searchRecords.value.debounceTimeout);
        }

        searchRecords.value.isSearching = true;

        searchRecords.value.debounceTimeout = setTimeout(() => {
          getPaymentCustomers(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    onMounted(() => {
      refData.value.loadingPage = true;

      getPaymentCustomers(table_options.value);

      refData.value.loadingPage = false;
    });
    return {
      refData,
      updateCustomerModalRef,
      formUpdateCustomerRef,
      rules,
      tableHeader,
      meta,
      table_options,
      action,
      customer,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      processCustomerAction,
      searchRecords,

      showEditCustomerModal,
      paymentCustomers,
      loadingPaymentCustomerData,
      unauthorized,

      //composable
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,
    };
  },
});
</script>
