<template>
  <!--begin::Row-->
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <h1>Customer Dashboard</h1>
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
            <a href="/transactions" class="btn btn-sm btn-light">More </a>
          </div>
          <!--end::Toolbar-->
        </div>
        <!--end::Header-->
        <PageLoader v-if="loadingTransactionData"></PageLoader>
        <!--begin::Body-->
        <div class="card-body pt-6" v-else>
          <div class="table-responsive">
            <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
              <!--begin::Table head-->
              <thead>
                <tr class="fs-7 fw-bold text-gray-400 border-bottom-0">
                  <th class="p-0 pb-3 min-w-145px text-start">Ref</th>
                  <th class="p-0 pb-3 min-w-100px text-end">Amount</th>
                  <th class="p-0 pb-3 min-w-100px text-end">Debit</th>
                  <th class="p-0 pb-3 min-w-100px text-end">Credit</th>
                  <th class="p-0 pb-3 min-w-145px text-end">Date</th>
                  <th class="p-0 pb-3 min-w-100px text-end">Status</th>
                </tr>
              </thead>
              <!--end::Table head-->

              <!--begin::Table body-->
              <tbody>
                <template v-for="(transaction, id) in transactions" :key="id">
                  <tr>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="d-flex justify-content-start flex-column">
                          <a
                            href="#"
                            class="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                            >{{ transaction.reference }}</a
                          >
                          <span
                            class="text-gray-400 fw-semibold d-block fs-7"
                            >{{ transaction.type_code }}</span
                          >
                        </div>
                      </div>
                    </td>

                    <td class="text-end pe-0">
                      <span
                        v-if="!transaction.icon"
                        class="badge badge-light-success fs-base"
                      >
                        <span
                          class="svg-icon svg-icon-5 svg-icon-success ms-n1"
                        >
                          <inline-svg
                            src="/media/icons/duotune/arrows/arr066.svg"
                          />
                        </span>
                        {{ transaction.currency.code }}
                        {{ formatNumber(transaction.amount) }}
                      </span>
                      <span v-else class="badge badge-light-danger fs-base">
                        <span class="svg-icon svg-icon-5 svg-icon-danger ms-n1">
                          <inline-svg
                            src="/media/icons/duotune/arrows/arr065.svg"
                          />
                        </span>
                        {{ transaction.currency.code }}
                        {{ formatNumber(transaction.amount) }}
                      </span>
                    </td>

                    <td class="text-end pe-0">
                      {{ transaction.debit_account_institution.name }}

                      <span class="text-gray-400 fw-semibold d-block fs-7">
                        {{ transaction.debit_account_no }}</span
                      >
                    </td>

                    <td class="text-end pe-0">
                      {{ transaction.credit_account_institution.name }}

                      <span class="text-gray-400 fw-semibold d-block fs-7">
                        {{ transaction.credit_account_no }}</span
                      >
                    </td>
                    <td class="text-end pe-0">
                      {{ timeAgo(transaction.created_at) }}
                    </td>

                    <td class="text-end">
                      <span
                        :class="`badge py-3 px-4 fs-7 badge-light-${transaction.status}`"
                        >{{ transaction.status }}</span
                      >

                      <span
                        v-if="transaction.status_id === 1"
                        class="badge badge-primary"
                        >Created</span
                      >
                      <span
                        v-if="transaction.status_id === 2"
                        class="badge badge-info"
                        >Submitted</span
                      >
                      <span
                        v-if="transaction.status_id === 3"
                        class="badge badge-warning"
                        >Processing</span
                      >
                      <span
                        v-if="transaction.status_id === 4"
                        class="badge badge-success"
                        >Success</span
                      >
                      <span
                        v-if="transaction.status_id === 5"
                        class="badge badge-danger"
                        >Error</span
                      >
                      <span
                        v-if="transaction.status_id === 6"
                        class="badge badge-danger"
                        >Cancelled</span
                      >
                    </td>
                  </tr>
                </template>
              </tbody>
              <!--end::Table body-->
            </table>
          </div>
          <div class="row mt-3">
            <div class="col-md-12 text-center">
              <router-link to="/transactions">
                <button class="btn btn-info btn-sm">
                  View All Transactions
                </button>
              </router-link>
            </div>
          </div>
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
        <div
          v-for="account in accounts"
          :key="account.id"
          class="col-md-12 layout-spacing"
        >
          <div class="">
            <div
              @click="viewAccountTransactions(account.id)"
              class="card bg-dark hoverable mb-xl-8"
            >
              <!--begin::Body-->
              <div class="card-body">
                <span class="svg-icon svg-icon-gray-100 svg-icon-3x ms-n1">
                  <!--                  <img-->
                  <!--                    src="/media/svg/coins/ghanacedis.svg"-->
                  <!--                    height="24"-->
                  <!--                    alt=""-->
                  <!--                  />-->
                  <span
                    class="add"
                    @click="viewAccountTransactions(account.id)"
                  >
                    <span class="p-2"> View Transactions >> </span>
                  </span>
                </span>

                <div class="text-gray-100 fw-bold fs-2 mb-2 mt-5">
                  <span class="w-currency">{{ account.currency.code }} </span>
                  {{ formatNumber(account.actual_balance) }}
                </div>
                <div class="fw-semibold text-gray-100">
                  {{ account.type.name }} Account /
                  {{ account.name_on_account }}
                </div>
              </div>
              <!--end::Body-->
            </div>
          </div>
        </div>
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
  name: "customer-dashboard",
  components: { PageLoader },
  props: {
    className: { type: String, required: false },
    transactionsData: [],
  },
  setup() {
    //transactions
    const transactionStore = useCustomerTransactionStore();
    const { transactions, loadingTransactionData } =
      storeToRefs(transactionStore);
    const { getTransactions } = useCustomerTransactionStore();

    //account
    const accountStore = useCustomerAccountStore();
    const { getAccounts } = useCustomerAccountStore();
    const { accounts, loadingAccountData } = storeToRefs(accountStore);

    //user
    const userStore = useCustomerUserStore();
    const { users, loadingUserData } = storeToRefs(userStore);
    const { getUser } = useCustomerUserStore();
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
      await getTransactions(table_options.value);
      await getAccounts({
        current_page: 1,
        page_size: 10, // Add view more at the bottom to link to accounts
        search_text: "",
        sort: { column: "is_default", direction: "DESC" },
      });
    });

    return {
      loading,
      authUser,

      //state
      loadingTransactionData,
      loadingAccountData,
      transactions,
      accounts,
    };
  },
});
</script>
