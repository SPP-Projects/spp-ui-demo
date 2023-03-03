<template>
  <!--begin::Layout-->
  <PermissionDenied v-if="unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />

  <div class="d-flex flex-column flex-xl-row" v-else>
    <!--begin::Sidebar-->

    <div class="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10">
      <!--begin::Card-->
      <div
        class="card card-flush pt-3 mb-2 mb-xl-5"
        v-if="paymentCustomerDetails"
      >
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title">
            <h2 class="fw-bold">Customer</h2>
          </div>
          <!--begin::Card title-->
          <!--begin::Card toolbar-->
          <div class="card-toolbar">
            <a
              href="#"
              class="btn btn-sm btn-light-primary"
              @click="showEditCustomerModal(paymentCustomerDetails)"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_update_customer"
            >
              Update Customer
            </a>
          </div>
          <!--end::Card toolbar-->
        </div>
        <!--end::Card header-->

        <!--begin::Card body-->
        <div class="card-body pt-0">
          <!--begin::Section-->
          <div class="mb-1">
            <!--begin::Details-->
            <div class="d-flex flex-wrap py-0">
              <!--begin::Row-->
              <div class="me-5">
                <!--begin::Details-->
                <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2 m-0">
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Blacklisted?:</td>
                    <td class="text-gray-800">
                      <span
                        v-if="paymentCustomerDetails.is_blacklisted"
                        class="badge badge-light-danger"
                        >Blacklisted</span
                      >
                      <span v-else class="badge badge-light-success"
                        >Active</span
                      >
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Customer ID:</td>
                    <td class="text-gray-800">
                      {{ paymentCustomerDetails.customer_id }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Email</td>
                    <td class="text-gray-800">
                      {{ paymentCustomerDetails.email }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Name</td>
                    <td class="text-gray-800">
                      {{ paymentCustomerDetails.name }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Phone</td>
                    <td class="text-gray-800">
                      {{ paymentCustomerDetails.phone }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Created At</td>
                    <td class="text-gray-800">
                      {{ formatDateTime(paymentCustomerDetails.created_at) }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Updated At</td>
                    <td class="text-gray-800">
                      {{ formatDateTime(paymentCustomerDetails.updated_at) }}
                    </td>
                  </tr>
                  <!--end::Row-->
                </table>
                <!--end::Details-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Row-->
          </div>
          <!--end::Section-->

          <div class="separator separator-dashed mb-1"></div>
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::Sidebar-->

    <!--begin::Content-->
    <div class="flex-lg-row-fluid ms-lg-15" v-if="paymentCustomerDetails">
      <div class="card pt-4">
        <!--begin::Card header-->
        <div class="card-header border-0">
          <!--begin::Card title-->
          <div class="card-title">
            <h2>Transactions</h2>
          </div>
          <!--end::Card title-->

          <!--begin::Card toolbar-->
          <div class="card-toolbar">
            <div class="fw-bold me-5">
              <span class="me-2" v-if="meta.total >= 1">
                Showing {{ meta.from }} to {{ meta.to }} of
                {{ meta.total }}
              </span>
            </div>
          </div>
          <!--end::Card toolbar-->
        </div>
        <!--end::Card header-->

        <!--begin::Card body-->
        <div class="card-body pt-0 pb-5">
          <KTDatatable
            :data="paymentCustomerTransactions"
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
            <template v-slot:status="{ row: data }">
              <span
                v-if="data.status_id === 1"
                class="badge badge-light-primary"
                >Created</span
              >
              <span v-if="data.status_id === 2" class="badge badge-light-info"
                >Submitted</span
              >
              <span
                v-if="data.status_id === 3"
                class="badge badge-light-warning"
                >Processing</span
              >
              <span
                v-if="data.status_id === 4"
                class="badge badge-light-success"
                >Success</span
              >
              <span v-if="data.status_id === 5" class="badge badge-light-danger"
                >Error</span
              >
              <span v-if="data.status_id === 6" class="badge badge-light-danger"
                >Cancelled</span
              >

              <br />

              <span class="text-muted fs-7 fw-normal text-muted small">{{
                data.reference
              }}</span>
            </template>

            <template v-slot:created_at="{ row: data }">
              {{ formatDate(data.created_at) }}
            </template>

            <template v-slot:amount="{ row: data }">
              {{ data.currency_code }}
              {{ formatCurrencyAmount(data.amount) }}
            </template>

            <template v-slot:debit="{ row: data }">
              {{ data.debit_account_no }} <br />
              <span class="text-muted fs-7 fw-normal text-muted small">
                {{ data.debit_account_name }}
              </span>
            </template>
            <template v-slot:credit="{ row: data }">
              {{ data.credit_account_no }} <br />

              <span class="text-muted fs-7 fw-normal text-muted small">
                {{ data.credit_account_name }}
              </span>
            </template>

            <template v-slot:actions="{ row: data }">
              <button
                class="btn btn-sm btn-light-info btn-active-light-info"
                data-bs-toggle="modal"
                id="edit-btn"
                data-bs-target="#kt_modal_view_transaction"
                @click="viewTransaction(data)"
              >
                View
              </button>
            </template>
          </KTDatatable>
        </div>
        <!--end::Card body-->
      </div>
    </div>
    <!--end::Content-->
  </div>

  <!-- View Transaction Modal-->
  <div
    class="modal fade"
    id="kt_modal_view_transaction"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header pb-0 border-0 justify-content-end">
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
        <!--begin::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
          <div data-kt-stepper-element="content">
            <!--begin::Wrapper-->
            <div class="w-100" v-if="transaction.id">
              <!--begin::Heading-->
              <div class="pb-12">
                <!--begin::Title-->
                <h1 class="fw-bold text-dark">
                  Transaction Details: {{ transaction.id }} -
                  {{ transaction.reference }}
                </h1>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
            </div>
            <!--end::Wrapper-->
          </div>
          <div v-if="transaction.id">
            <!--  General Info -->
            <div
              class="py-2 border-bottom border-bottom-dashed border-gray-300"
            >
              <div class="ms">
                <span
                  class="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                >
                  General
                </span>
              </div>
              <div class="flex-equal table-responsive">
                <table
                  class="table table-flush fw-semobold gy-1"
                  style="width: 100%"
                >
                  <tbody>
                    <tr>
                      <td class="text-muted">Amount</td>
                      <td class="text-gray-800">
                        {{ formatCurrencyAmount(transaction.amount) }}
                        {{ transaction.currency_code }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Type Name</td>
                      <td class="text-gray-800">
                        {{ transaction.type_code }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Status</td>
                      <td class="text-gray-800">
                        {{ transaction.status_message }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Created At</td>
                      <td class="text-gray-800">
                        {{ formatDateTime(transaction.created_at) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Last Updated At</td>
                      <td class="text-gray-800">
                        {{ formatDateTime(transaction.updated_at) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--  General Info -->

            <!--  Debit Info -->
            <div
              class="py-2 border-bottom border-bottom-dashed border-gray-300"
            >
              <div class="ms">
                <span
                  class="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                >
                  Debit Account
                </span>
              </div>
              <div class="flex-equal table-responsive">
                <table class="table table-flush fw-semobold gy-1">
                  <tbody>
                    <tr>
                      <td class="text-muted">Institution</td>
                      <td class="text-gray-800">
                        {{ transaction.debit_account_institution_id }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Account No</td>
                      <td class="text-gray-800">
                        {{ transaction.debit_account_no }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Account Name</td>
                      <td class="text-gray-800">
                        {{ transaction.debit_account_name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Debit Status</td>
                      <td class="text-gray-800">
                        {{ transaction.debit_status_message }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--  Debit Info -->

            <!--  Credit Info -->
            <div
              class="py-2 border-bottom border-bottom-dashed border-gray-300"
            >
              <div class="ms">
                <span
                  class="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                >
                  Credit Account
                </span>
              </div>
              <div class="flex-equal table-responsive">
                <table class="table table-flush fw-semobold gy-1">
                  <tbody>
                    <tr>
                      <td class="text-muted">Institution</td>
                      <td class="text-gray-800">
                        {{ transaction.credit_account_institution_id }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Account No.</td>
                      <td class="text-gray-800">
                        {{ transaction.credit_account_no }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Account Name</td>
                      <td class="text-gray-800">
                        {{ transaction.credit_account_name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Credit Status</td>
                      <td class="text-gray-800">
                        {{ transaction.credit_status_message }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--  Credit Info -->
          </div>
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!-- View Transaction Modal-->

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

  <!--end::Layout-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import { useRoute } from "vue-router";
import { hideModal } from "@/core/helpers/dom";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import { storeToRefs } from "pinia";
import useOutputFormat from "@/composables/useOutputFormat";
import { useCustomerPaymentCustomerStore } from "@/stores/customer/paymentcustomer";
import type { iTransaction } from "@/models/transaction";
import { AlertService } from "@/services/AlertService";

export default defineComponent({
  name: "view-payment-customer",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const paymentCustomerStore = useCustomerPaymentCustomerStore();
    const {
      paymentCustomerTransactions,
      meta,
      loadingPaymentCustomerData,
      paymentCustomerDetails,
      unauthorized,
    } = storeToRefs(paymentCustomerStore);
    const { getPaymentCustomer } = useCustomerPaymentCustomerStore();

    //route
    const route = useRoute();

    //data variables
    const refData = ref({
      //loading
      loadingPage: true,

      loadingAction: false,
    });

    const tableHeader = ref([
      {
        columnLabel: "created_at",
        columnName: "Created Date",
        sortEnabled: true,
      },

      {
        columnLabel: "status",
        columnName: "status",
        sortEnabled: true,
      },

      {
        columnLabel: "amount",
        columnName: "amount",
        sortEnabled: false,
      },

      {
        columnLabel: "debit",
        columnName: "debit",
        sortEnabled: false,
      },
      {
        columnLabel: "credit",
        columnName: "credit",
        sortEnabled: false,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
      },
    ]);

    const table_options = ref({
      id: "",
      current_page: 1,
      page_size: 10,
      search_text: "",
      sort: { column: "", direction: "" },
    });

    const transaction = ref({} as iTransaction);
    const transactions = ref([]);

    const action = ref("");

    //functions
    const handlePerPageChange = (size: number) => {
      table_options.value.current_page = 1;
      table_options.value.page_size = size;
      getPaymentCustomer(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getPaymentCustomer(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getPaymentCustomer(table_options.value);
    };

    const viewTransaction = (val) => {
      transaction.value = val;
    };

    onMounted(async () => {
      refData.value.loadingPage = true;
      table_options.value.id = Array.isArray(route.params.id)
        ? route.params.id[0]
        : route.params.id;
      await getPaymentCustomer(table_options.value);
      refData.value.loadingPage = false;
    });

    //output formatting
    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();

    const siteUrl = import.meta.env.VITE_APP_API_URL;

    //new
    const formRef = ref<null | HTMLFormElement>(null);
    const newTargetModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
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
    const customer = ref<any>({
      id: 0,
      action: "Edit",
      name: "",
      phone: "",
      is_blacklisted: "",
    });
    const formUpdateCustomerRef = ref<null | HTMLFormElement>(null);
    const updateCustomerModalRef = ref<null | HTMLElement>(null);
    const showEditCustomerModal = async (data) => {
      customer.value = data;
      customer.value.action = "Edit";
    };

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

              getPaymentCustomer(table_options.value);

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
    return {
      refData,
      tableHeader,
      meta,
      table_options,
      paymentCustomerDetails,
      transaction,
      transactions,
      action,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      viewTransaction,

      //state
      loadingPaymentCustomerData,
      paymentCustomerTransactions,
      getPaymentCustomer,
      unauthorized,
      //composable
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,

      //url
      siteUrl,

      //new

      loading,
      formRef,

      newTargetModalRef,

      showEditCustomerModal,
      customer,
      rules,
      processCustomerAction,
      formUpdateCustomerRef,
      updateCustomerModalRef,
    };
  },
});
</script>

<style lang="scss">
.el-select {
  width: 100%;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>

<style lang="scss">
.override-styles {
  z-index: 99999 !important;
  pointer-events: initial;
}
</style>
