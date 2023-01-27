<template>
  <!--begin::Row-->
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <h1>Admin Dashboard</h1>
    <!--begin::Col-->
    <div class="col-xl-8">
      <div class="card card-flush">
        <!--begin::Header-->
        <div class="card-header pt-7">
          <!--begin::Title-->
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold text-gray-800"
              >Recent Transactions</span
            >
          </h3>
          <!--end::Title-->

          <!--begin::Toolbar-->
          <div class="card-toolbar">
            <!--            <a href="/transactions" class="btn btn-sm btn-light">More </a>-->
          </div>
          <!--end::Toolbar-->
        </div>
        <!--end::Header-->
        <PageLoader v-if="loadingTransactionData"></PageLoader>
        <!--begin::Body-->
        <div class="card-body pt-6" v-else>
          <div class="table-responsive"></div>
        </div>
        <!--end: Card Body-->
      </div>
    </div>
    <!--end::Col-->

    <!--begin::Col-->
    <div class="col-xl-4">
      <h4>Your Accounts</h4>
      <PageLoader v-if="loadingAccountData" />
      <div
        v-else
        class="row layout-top-spacing"
        style="height: 800px; overflow-y: scroll"
      >
        ..
      </div>
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import PageLoader from "@/components/PageLoader.vue";
import { useCustomerTransactionStore } from "@/stores/customer/transaction";
import { useCustomerAccountStore } from "@/stores/customer/account";
import { storeToRefs } from "pinia";
import { useCustomerUserStore } from "@/stores/customer/user";

export default defineComponent({
  name: "admin-dashboard",
  components: { PageLoader },
  props: {
    className: { type: String, required: false },
    transactionsData: [],
  },
  setup() {
    //transactions
    const transactionStore = useCustomerTransactionStore();
    const { transactions, loadingTransactionData, unauthorized } =
      storeToRefs(transactionStore);
    const { getTransactions } = useCustomerTransactionStore();

    //account
    const accountStore = useCustomerAccountStore();
    const { getAccounts } = useCustomerAccountStore();
    const { accounts, loadingAccountData } = storeToRefs(accountStore);

    //
    const loading = ref({
      page: true,
      transactions: true,
      accounts: true,
    });

    const authUser = ref({});

    const table_options = ref({
      account: "",
      current_page: 1,
      page_size: 10,
      search_text: "",
      sort: { column: "created_at", direction: "DESC" },
    });

    onMounted(async () => {
      // await getTransactions(table_options.value);
      //  await getAccounts({
      //    current_page: 1,
      //    page_size: 10, // Add view more at the bottom to link to accounts
      //    search_text: "",
      //    sort: { column: "is_default", direction: "DESC" },
      //  });

      loadingTransactionData.value = false;
      loadingAccountData.value = false;
    });

    return {
      loading,
      authUser,

      //state
      loadingTransactionData,
      loadingAccountData,
      transactions,
      accounts,
      unauthorized,
    };
  },
});
</script>
