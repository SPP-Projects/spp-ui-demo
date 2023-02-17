<template>
  <PermissionDenied v-if="unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />
  <div class="card" v-else>
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
            v-model="table_options.search_text"
            class="form-control form-control-solid w-250px ps-15 mr-10"
            placeholder="Search ..."
          />

          <div class="m-lg-5">
            <button
              class="btn btn-primary btn-sm"
              @click="getTransactionBatch(table_options)"
            >
              Refresh Data
            </button>
          </div>
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <div
          class="d-flex justify-content-end align-items-center"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bold me-5">
            <div class="dataTables_info">
              Showing {{ meta.from }} to {{ meta.to }} of
              {{ meta.total }}
            </div>
          </div>
        </div>
      </div>
      <!--end::Card toolbar-->
    </div>

    <div class="card-body pt-0">
      <KTDatatable
        :data="transactionBatches"
        :header="tableHeader"
        :enable-items-per-page-dropdown="false"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="5"
        :loading="loadingData"
      >
        <template v-slot:row_number="{ row: data }">
          {{ data.row_number }}
        </template>
        <template v-slot:transaction_reference="{ row: data }">
          <span v-if="data.transaction">
            <router-link :to="`/transactions/${data.transaction.reference}`">
              {{ data.transaction.reference }} <br />

              <span class="fs-6 text-muted">
                {{ data.transaction.currency_code }}
                {{ formatCurrencyAmount(data.transaction.amount) }}
              </span>
            </router-link>
          </span>

          <span v-else> {{ data.transaction }}</span>
        </template>

        <template v-slot:status="{ row: data }">
          <span v-if="data.status === 'Created'" class="badge badge-primary"
            >Created</span
          >
          <span
            v-if="data.status === 'Failed validation'"
            class="badge badge-danger"
            >Failed validation</span
          >
          <span v-if="data.status === 'Validated'" class="badge badge-success"
            >Validated</span
          >
          <span
            v-if="data.status === 'Failed submission'"
            class="badge badge-danger"
            >Failed submission</span
          >
          <span v-if="data.status === 'Submitted'" class="badge badge-success"
            >Submitted</span
          >

          <span class="fs-6 fw-bold text-danger">
            <br />
            {{ data.errors }}
          </span>
        </template>

        <template v-slot:debit_account_no="{ row: data }">
          {{ data.debit_account_institution_code }}
          <br />
          {{ data.debit_account_no }}
        </template>
        <template v-slot:credit_account_no="{ row: data }">
          {{ data.debit_account_institution_code }} <br />
          {{ data.credit_account_no }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            v-if="data.transaction"
            size="sm"
            class="info btn btn-info btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_view_transaction"
            @click.prevent="viewTransactionModal(data.transaction)"
          >
            View Transaction</button
          ><span v-else>{{ data.transaction }}</span>
        </template>
      </KTDatatable>
    </div>
  </div>

  <!-- View transaction Modal-->
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
                <table class="table table-flush fw-semobold gy-1">
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
                        {{ transaction.type }} /
                        {{ transaction.type_code }}
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
                    <tr>
                      <td class="text-muted">Status message</td>
                      <td class="text-gray-800">
                        {{ transaction.status_message }}
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
                        {{ transaction.debit_account_institution }}
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
                      <td class="text-muted">Debit Institution</td>
                      <td class="text-gray-800">
                        {{ transaction.credit_account_institution }}
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

            <!--  Charge Info -->
            <!--            TODO - SPP-->
            <!--            GET CHARGE DETAILS-->
            <div
              class="py-2 border-bottom border-bottom-dashed border-gray-300"
              v-if="transaction.charge"
            >
              <div class="ms">
                <span
                  class="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                >
                  Charge
                </span>
              </div>
              <div class="flex-equal table-responsive">
                <table class="table table-flush fw-semobold gy-1">
                  <tbody>
                    <tr v-if="transaction.charge.amount">
                      <td class="text-muted">Amount</td>
                      <td class="text-gray-800">
                        {{ formatCurrencyAmount(transaction.charge.amount) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--  Charge Info -->
          </div>
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!-- View transaction Modal-->
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useCustomerTransactionBatchStore } from "@/stores/customer/transactionbatch";
import { storeToRefs } from "pinia";
import type { iTransaction } from "@/models/transaction";

import { useRoute } from "vue-router";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import useOutputFormat from "@/composables/useOutputFormat";

export default defineComponent({
  name: "view-transaction-batch",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const transactionBatchStore = useCustomerTransactionBatchStore();

    const { transactionBatches, meta, loadingData, unauthorized } = storeToRefs(
      transactionBatchStore
    );
    const { getTransactionBatch } = useCustomerTransactionBatchStore();

    //data variables
    const refData = ref({
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,
      loadingData: false,
      loadingAction: false,
    });

    //variables

    const tableHeader = ref([
      {
        columnLabel: "row_number",
        columnName: "File Row Number",
        sortEnabledable: false,
      },

      {
        columnLabel: "transaction_reference",
        columnName: "transaction reference",
        sortEnabledable: true,
      },
      {
        columnLabel: "debit_account_no",
        columnName: "Debit Account",
        sortEnabledable: true,
      },

      {
        columnLabel: "credit_account_no",
        columnName: "Credit Account",
        sortEnabledable: true,
      },
      { columnLabel: "status", columnName: "Status", sortEnabledable: false },

      {
        columnLabel: "actions",
        columnName: "actions",
      },
    ]);

    //Array.isArray(params.username) ? params.username[0] : params.username
    const table_options = ref({
      reference: "",
      current_page: 1,
      page_size: 20,
      search_text: "",
      sort: { column: "", direction: "" },
    });

    const transaction = ref<iTransaction | any>({});
    const searchRecords = ref({
      isSearching: false,
      debounceTimeout: ref<number>(0),
      debounce: 2000,
      kDebounceTimeoutMs: 1000,
    });

    const route = useRoute();

    //functions
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const getTransactionBatch = async (options): Promise<void> => {
    //   refData.value.loadingData = true;
    //   await transactionBatchStore
    //     .getTransactionBatch(table_options.value)
    //
    //     .then((response) => {
    //       transactions.value = response.data;
    //
    //       // Populate transaction meta
    //       meta.value.total = response.total;
    //       meta.value.from = response.from;
    //       meta.value.to = response.to;
    //       meta.value.last_page = response.last_page;
    //     })
    //     .catch((error) => {
    //       if (error.response.status === 403) {
    //         // unauthorized.
    //         refData.value.unauthorized = true;
    //       }
    //     })
    //     .finally(() => {
    //       refData.value.loadingPage = false;
    //       refData.value.loadingData = false;
    //     });
    // };

    const handlePerPageChange = (size: number) => {
      table_options.value.current_page = 1;
      table_options.value.page_size = size;
      getTransactionBatch(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getTransactionBatch(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getTransactionBatch(table_options.value);
    };

    onMounted(() => {
      refData.value.loadingPage = true;

      table_options.value.reference = Array.isArray(route.params.reference)
        ? route.params.reference[0]
        : route.params.reference;
      getTransactionBatch(table_options.value);

      refData.value.loadingPage = false;
    });
    ////////////////

    const viewTransactionModal = (data) => {
      transaction.value = data;
    };

    watch(
      () => table_options.value.search_text,
      () => {
        if (searchRecords.value.debounceTimeout) {
          clearTimeout(searchRecords.value.debounceTimeout);
        }

        searchRecords.value.isSearching = true;

        searchRecords.value.debounceTimeout = setTimeout(() => {
          getTransactionBatch(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );
    //output formatting
    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();
    return {
      //variables
      refData,
      searchRecords,

      tableHeader,

      meta,
      table_options,

      transactionBatches,
      transaction,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      getTransactionBatch,

      //modal
      viewTransactionModal,

      //state
      loadingData,
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
