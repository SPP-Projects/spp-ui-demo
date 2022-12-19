<template>
  <!--begin::Card-->
  <PermissionDenied v-if="refData.unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />

  <div class="card">
    <!--begin::Card header-->
    <div class="card-header border-1 pt-6 mb-0">
      <div class="row">
        <div class="col-12">
          <h4>View Transactions</h4>
        </div>
      </div>
    </div>
    <div class="card-header border-0 pt-1">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <el-input
            type="text"
            class="me-5"
            data-kt-subscription-table-filter="search"
            placeholder="Search ..."
            v-model="table_options.search_text"
          />
        </div>
        <span class="ml me-5"> ddd </span>

        <!--end::Search-->
      </div>
      <!--begin::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Group actions-->
        <div class="d-flex justify-content-end align-items-center">
          <div class="fw-bold me-5">
            <span class="me-2">
              Showing {{ meta.from }} to {{ meta.to }} of
              {{ meta.total }}
            </span>
          </div>

          <TransactionsSubMenu></TransactionsSubMenu>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pt-0">
      <KTDatatable
        :data="transactionTypes"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingTransactionData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:id="{ row: data }">
          {{ data.id }}
        </template>
        <template v-slot:code="{ row: data }">
          {{ data.code }}
        </template>
        <template v-slot:name="{ row: data }">
          {{ data.name }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            data-bs-toggle="modal"
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
  <!--end::Card-->

  <!--View Transaction Modal-->
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
                        {{ formatNumber(transaction.amount) }}
                        {{ transaction.currency_code }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Type Name</td>
                      <td class="text-gray-800">
                        {{ transaction.type.name }} /
                        {{ transaction.type_code }}
                      </td>
                    </tr>

                    <tr>
                      <td class="text-muted">Created At</td>
                      <td class="text-gray-800">
                        {{ formatDate(transaction.created_at) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Last Updated At</td>
                      <td class="text-gray-800">
                        {{ formatDate(transaction.updated_at) }}
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
                        {{ transaction.debit_account_institution.name }}
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
                  Debit Account
                </span>
              </div>
              <div class="flex-equal table-responsive">
                <table class="table table-flush fw-semobold gy-1">
                  <tbody>
                    <tr>
                      <td class="text-muted">Debit Institution</td>
                      <td class="text-gray-800">
                        {{ transaction.credit_account_institution.name }}
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
                        {{ transaction.charge.amount }}
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
  <!--View Transaction Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";

import PageLoader from "@/components/PageLoader.vue";
import PermissionDenied from "@/components/PermissionDenied.vue";

import sppay from "@/helpers/sppay";
import { storeToRefs } from "pinia";
import { useAdminTransactionStore } from "@/stores/admin/transaction";
import TransactionsSubMenu from "@/components/_sppay/admin/TransactionsSubMenu.vue";
export default defineComponent({
  name: "transactions-list",
  components: {
    TransactionsSubMenu,
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const transactionStore = useAdminTransactionStore();
    const { transactionTypes, meta, loadingTransactionData } =
      storeToRefs(transactionStore);
    const { getTransactionTypes } = useAdminTransactionStore();

    const { formatDateTime } = sppay();
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,

      loadingAction: false,
    });

    const tableHeader = ref([
      { columnLabel: "id", columnName: "id", sortEnabled: true },
      { columnLabel: "code", columnName: "code", sortEnabled: false },

      {
        columnLabel: "name",
        columnName: "mame",
        sortEnabled: false,
      },

      {
        columnName: "Actions",
        columnLabel: "actions",
      },
    ]);
    const transaction = ref({});

    const table_options = ref({
      account: "" as any,
      current_page: 1,
      page_size: 10,
      search_text: "",
      sort: { column: "", direction: "" },
    });

    const searchRecords = ref({
      isSearching: false,
      debounceTimeout: ref<number>(0),
      debounce: 2000,
      kDebounceTimeoutMs: 1000,
    });

    const handlePerPageChange = (size: number) => {
      table_options.value.current_page = 1;
      table_options.value.page_size = size;
      getTransactionTypes(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getTransactionTypes(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;
      table_options.value.current_page = 1;

      getTransactionTypes(table_options.value);
    };

    //view single transaction
    const viewTransaction = (val) => {
      //TODO - SPP
      //call transaction by ref from api to get charge details
      transaction.value = val;
    };

    onMounted(async () => {
      refData.value.loadingPage = true;

      await getTransactionTypes(table_options.value);
      refData.value.loadingPage = false;
    });

    //search data
    watch(
      () => table_options.value.search_text,
      () => {
        if (searchRecords.value.debounceTimeout) {
          clearTimeout(searchRecords.value.debounceTimeout);
        }

        searchRecords.value.isSearching = true;

        searchRecords.value.debounceTimeout = setTimeout(() => {
          getTransactionTypes(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      refData,
      searchRecords,
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      viewTransaction,
      getTransactionTypes,

      table_options,
      meta,
      tableHeader,
      transaction,
      transactionTypes,

      formatDateTime,

      //state
      loadingTransactionData,
    };
  },
});
</script>
