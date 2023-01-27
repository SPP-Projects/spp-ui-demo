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
        </template>

        <template v-slot:debit_account_no="{ row: data }">
          {{ data.debit_account_no }}
        </template>
        <template v-slot:credit_account_no="{ row: data }">
          {{ data.credit_account_no }}
        </template>
        <template v-slot:errors="{ row: data }">
          {{ data.errors }}
        </template>

        <template v-slot:row_number="{ row: data }">
          {{ data.row_number }} {{ data }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            v-if="data.transaction"
            size="sm"
            class="info"
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
          <div v-if="transaction.id" class="modal-text">
            Transaction Details: {{ transaction.id }} -
            {{ transaction.reference }}

            <h6 class="mb-42 mt-2">General</h6>
            <div>
              <div>
                Currency: <b>{{ transaction.currency_code }}</b>
              </div>
              <div>
                Amount: <b>{{ transaction.amount }}</b>
              </div>
              <div>
                Type Code: <b>{{ transaction.type_code }}</b>
              </div>
              <div>
                Type Name: <b>{{ transaction.type.name }}</b>
              </div>
              <div>
                Status: <b>{{ transaction.status_message }}</b>
              </div>
              <div>
                Created At: <b>{{ transaction.created_at }}</b>
              </div>
              <div>
                Last Updated At:
                <b>{{ transaction.updated_at }}</b>
              </div>
            </div>
            <h6 class="mb-42 mt-3">Debit Account</h6>
            <div>
              <div>
                Institution ID:
                <b>{{ transaction.debit_account_institution.id }}</b>
              </div>
              <div>
                Institution Name:
                <b>{{ transaction.debit_account_institution.name }}</b>
              </div>
              <div>
                Account No: <b>{{ transaction.debit_account_no }}</b>
              </div>
              <div>
                Account Name: <b>{{ transaction.debit_account_name }}</b>
              </div>
              <div>
                Debit Status:
                <b>{{ transaction.debit_status_message }}</b>
              </div>
            </div>
            <h6 class="mb-42 mt-3">Credit Account</h6>
            <div>
              <div>
                Institution ID:
                <b>{{ transaction.credit_account_institution.id }}</b>
              </div>
              <div>
                Institution Name:
                <b>{{ transaction.credit_account_institution.name }}</b>
              </div>
              <div>
                Account No: <b>{{ transaction.credit_account_no }}</b>
              </div>
              <div>
                Account Name:
                <b>{{ transaction.credit_account_name }}</b>
              </div>
              <div>
                Credit Status:
                <b>{{ transaction.credit_status_message }}</b>
              </div>
            </div>
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
        columnLabel: "debit_account_no",
        columnName: "Dr Acc. No.",
        sortEnabledable: true,
      },

      {
        columnLabel: "credit_account_no",
        columnName: "Cr Acc. No.",
        sortEnabledable: true,
      },
      { columnLabel: "status", columnName: "Status", sortEnabledable: false },
      { columnLabel: "errors", columnName: "Errors", sortEnabledable: false },

      {
        columnLabel: "actions",
        columnName: "actions",
      },
    ]);

    //Array.isArray(params.username) ? params.username[0] : params.username
    const table_options = ref({
      reference: "",
      current_page: 1,
      page_size: 10,
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
    };
  },
});
</script>
