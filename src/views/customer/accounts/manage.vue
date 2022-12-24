<template>
  <PermissionDenied v-if="refData.unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card header-->
    <div class="card-header border-0 pt-6">
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
          <button
            class="btn btn-primary btn-sm"
            @click="getAccounts(table_options)"
          >
            Refresh Accounts
          </button>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pt-0">
      <KTDatatable
        :data="accounts"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingAccountData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:id="{ row: data }">
          {{ data.id }}
        </template>
        <template v-slot:type="{ row: data }">
          {{ data.type.name }}
        </template>
        <template v-slot:customer="{ row: data }">
          {{ data.customer.name }}
        </template>
        <template v-slot:name_on_account="{ row: data }">
          {{ data.name_on_account }}
          <span v-if="data.is_default === 1" class="badge badge-primary"
            >Default</span
          >
        </template>
        <template v-slot:balance="{ row: data }">
          {{ data.currency.code }} {{ data.actual_balance }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            @click="viewAccountTransactions(data.id)"
          >
            View Transactions
          </button>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useCustomerAccountStore } from "@/stores/customer/account";
import { storeToRefs } from "pinia";

import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import router from "@/router";
import PageLoader from "@/components/PageLoader.vue";
import PermissionDenied from "@/components/PermissionDenied.vue";

export default defineComponent({
  name: "manage-accounts",
  components: {
    PermissionDenied,
    PageLoader,
    KTDatatable,
  },
  setup() {
    //store
    const accountStore = useCustomerAccountStore();
    const { accounts, meta, loadingAccountData } = storeToRefs(accountStore);
    const { getAccounts } = useCustomerAccountStore();

    //refdata
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],
      loadingPage: true,

      loadingAction: false,
    });

    const searchRecords = ref({
      isSearching: false,
      debounceTimeout: ref<number>(0),
      debounce: 2000,
      kDebounceTimeoutMs: 1000,
    });

    const tableHeader = ref([
      {
        columnName: "id",
        columnLabel: "id",
        sortEnabled: true,
      },
      {
        columnName: "Account Type",
        columnLabel: "type",
        sortEnabled: true,
      },
      {
        columnName: "Customer",
        columnLabel: "customer",
        sortEnabled: true,
      },
      {
        columnName: "Account name",
        columnLabel: "name_on_account",
        sortEnabled: true,
      },
      {
        columnName: "Balance",
        columnLabel: "balance",
        sortEnabled: true,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
      },
    ]);

    const table_options = ref({
      account: "",
      current_page: 1,
      page_size: 10,
      search_text: "",
      sort: { column: "", direction: "" },
    });

    const handlePerPageChange = (size: number) => {
      table_options.value.current_page = 1;
      table_options.value.page_size = size;
      getAccounts(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getAccounts(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;
      table_options.value.current_page = 1;

      getAccounts(table_options.value);
    };

    const viewAccountTransactions = (account_no) => {
      //Set account number in store
      accountStore.setLastSelectedAccount(account_no);

      router.push("/transactions");
    };
    onMounted(async () => {
      refData.value.loadingPage = true;

      await getAccounts(table_options.value);

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
          getAccounts(table_options.value);

          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      //variables
      refData,
      tableHeader,
      table_options,

      //functions
      searchRecords,
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      viewAccountTransactions,

      //state
      meta,
      loadingAccountData,
      getAccounts,
      accounts,
    };
  },
});
</script>
