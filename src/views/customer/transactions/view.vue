<template>
  <!--begin::Layout-->
  <PermissionDenied v-if="unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />

  <div class="d-flex flex-column flex-lg-row" v-else>
    <!--begin::Content-->
    <div
      class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0"
      v-if="transaction"
    >
      {{ transaction }}
      <!--begin::Card-->
      <div class="card card-flush pt-3 mb-5 mb-xl-10">
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title">
            <h2 class="fw-bold">Transaction # {{ transaction.reference }}</h2>
          </div>
          <!--begin::Card title-->
          <!--begin::Card toolbar-->
          <div class="card-toolbar" v-if="!refData.loadingData">
            <h2 class="fw-bold text-success">
              {{ transaction.status_message }}
            </h2>
          </div>
          <!--end::Card toolbar-->
        </div>
        <!--end::Card header-->
        <!--begin::Card body-->
        <div class="card-body pt-3">
          <!--begin::Section-->
          <div class="mb-1">
            <!--begin::Title-->
            <h5 class="mb-4">Transaction:</h5>
            <!--end::Title-->
            <!--begin::Details-->
            <div class="d-flex flex-wrap py-5">
              <!--begin::Row-->
              <div class="me-5">
                <!--begin::Details-->
                <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2 m-0">
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400 min-w-175px w-175px">
                      Request Reference:
                    </td>
                    <td class="text-gray-800 min-w-200px">
                      {{ transaction.reference }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">external_reference:</td>
                    <td class="text-gray-800">
                      {{ transaction.external_reference }}
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">type_code:</td>
                    <td class="text-gray-800">
                      {{ transaction.type_code }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Account No:</td>
                    <td class="text-gray-800">
                      {{ transaction.debit_account_no }}
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Amount:</td>
                    <td class="text-gray-800">
                      {{ transaction.currency }}
                      {{ formatCurrencyAmount(transaction.amount) }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-gray-400">status_message:</td>
                    <td class="text-gray-800">
                      {{ transaction.status_message }}
                    </td>
                  </tr>
                  <!--end::Row-->
                </table>
                <!--end::Details-->
              </div>
              <!--end::Row-->
              <!--begin::Row-->
              <div class="flex-equal">
                <!--begin::Details-->
                <!--                <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2 m-0">-->
                <!--                  &lt;!&ndash;begin::Row&ndash;&gt;-->
                <!--                  <tr>-->
                <!--                    <td class="text-gray-400 min-w-175px w-175px">-->
                <!--                      Customer ID:-->
                <!--                    </td>-->
                <!--                    <td class="text-gray-800 min-w-200px">-->
                <!--                      {{ transaction.requester_customer_id }}-->
                <!--                    </td>-->
                <!--                  </tr>-->
                <!--                  &lt;!&ndash;end::Row&ndash;&gt;-->
                <!--                  &lt;!&ndash;begin::Row&ndash;&gt;-->
                <!--                  <tr>-->
                <!--                    <td class="text-gray-400">Customer ID:</td>-->
                <!--                    <td class="text-gray-800">-->
                <!--                      {{ transaction.requester_user_id }}-->
                <!--                    </td>-->
                <!--                  </tr>-->
                <!--                  &lt;!&ndash;end::Row&ndash;&gt;-->
                <!--                </table>-->
                <!--end::Details-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Row-->
          </div>
          <!--end::Section-->

          <div class="separator separator-dashed mb-10"></div>

          <!--begin::Section-->
          <div class="mb-5">
            <!--begin::Title-->
            <h5 class="mb-1">Debit Account:</h5>
            <!--end::Title-->
            <!--begin::Details-->
            <div class="d-flex flex-wrap py-5">
              <!--begin::Row-->
              <div class="flex-equal me-5">
                <!--begin::Details-->
                <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2 m-0">
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400 min-w-175px w-175px">
                      debit_account_name:
                    </td>
                    <td class="text-gray-800 min-w-200px">
                      {{ transaction.debit_account_name }}
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">debit_account_no:</td>
                    <td class="text-gray-800">
                      {{ transaction.debit_account_no }}
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">debit_account_institution_id:</td>
                    <td class="text-gray-800">
                      {{ transaction.debit_account_institution_id }}
                    </td>
                  </tr>
                  <!--end::Row-->
                </table>
                <!--end::Details-->
              </div>
              <!--end::Row-->
              <!--begin::Row-->
              <div class="flex-equal">
                <!--begin::Details-->
                <!--                <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2 m-0">-->
                <!--                  &lt;!&ndash;begin::Row&ndash;&gt;-->
                <!--                  <tr>-->
                <!--                    <td class="text-gray-400 min-w-175px w-175px">.</td>-->
                <!--                    <td class="text-gray-800 min-w-200px">.</td>-->
                <!--                  </tr>-->
                <!--                  &lt;!&ndash;end::Row&ndash;&gt;-->
                <!--                  &lt;!&ndash;begin::Row&ndash;&gt;-->

                <!--                  &lt;!&ndash;end::Row&ndash;&gt;-->
                <!--                </table>-->
                <!--end::Details-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Row-->
          </div>
          <!--end::Section-->

          <div class="separator separator-dashed mb-10"></div>

          <!--begin::Section-->
          <div class="mb-5">
            <!--begin::Title-->
            <h5 class="mb-1">Credit Account:</h5>
            <!--end::Title-->
            <!--begin::Details-->
            <div class="d-flex flex-wrap py-5">
              <!--begin::Row-->
              <div class="flex-equal me-5">
                <!--begin::Details-->
                <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2 m-0">
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400 min-w-175px w-175px">
                      credit_account_name:
                    </td>
                    <td class="text-gray-800 min-w-200px">
                      {{ transaction.credit_account_name }}
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">credit_account_no:</td>
                    <td class="text-gray-800">
                      {{ transaction.credit_account_no }}
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">
                      credit_account_institution_id:
                    </td>
                    <td class="text-gray-800">
                      {{ transaction.credit_account_institution_id }}
                    </td>
                  </tr>
                  <!--end::Row-->
                </table>
                <!--end::Details-->
              </div>
              <!--end::Row-->
              <!--begin::Row-->
              <div class="flex-equal">
                <!--begin::Details-->
                <!--                <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2 m-0">-->
                <!--                  &lt;!&ndash;begin::Row&ndash;&gt;-->
                <!--                  <tr>-->
                <!--                    <td class="text-gray-400 min-w-175px w-175px">.</td>-->
                <!--                    <td class="text-gray-800 min-w-200px">.</td>-->
                <!--                  </tr>-->
                <!--                  &lt;!&ndash;end::Row&ndash;&gt;-->
                <!--                  &lt;!&ndash;begin::Row&ndash;&gt;-->

                <!--                  &lt;!&ndash;end::Row&ndash;&gt;-->
                <!--                </table>-->
                <!--end::Details-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Row-->
          </div>
          <!--end::Section-->

          <div class="separator separator-dashed mb-10"></div>
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::Content-->
    <!--begin::Sidebar-->
    <div
      class="flex-column flex-lg-row-auto w-lg-350px w-xl-300px mb-10 order-1 order-lg-2"
    >
      <!--begin::Card-->
      <div
        class="card card-flush mb-0"
        data-kt-sticky="true"
        data-kt-sticky-name="subscription-summary"
        data-kt-sticky-offset="{default: false, lg: '200px'}"
        data-kt-sticky-width="{lg: '350px', xl: '300px'}"
        data-kt-sticky-left="auto"
        data-kt-sticky-top="150px"
        data-kt-sticky-animation="false"
        data-kt-sticky-zindex="95"
      >
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title">
            <h2>Action</h2>
          </div>
          <!--end::Card title-->
        </div>
        <!--end::Card header-->
        <!--begin::Card body-->
        <div class="card-body pt-0 fs-6" v-if="transaction">
          <!--begin::Seperator-->
          <div class="separator separator-dashed mb-2"></div>
          <!--end::Seperator-->
          <!--begin::Section-->
          <div class="mb-5">
            <!--begin::Details-->
            <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2">
              <!--begin::Row-->
              <tr class="">
                <td class="text-gray-400">Status:</td>
                <td v-if="transaction.status_message">
                  <span class="badge badge-light-success">
                    {{ transaction.status_message }}</span
                  >
                </td>
              </tr>
              <tr class="">
                <td class="text-gray-400">Created At:</td>
                <td class="text-gray-800" v-if="transaction.created_at">
                  {{ formatDate(transaction.created_at) }} <br />
                  {{ formatTime(transaction.created_at) }}
                </td>
              </tr>
              <tr class="">
                <td class="text-gray-400">Updated Atfffffffffffffffff:</td>
                <td class="text-gray-800" v-if="transaction.updated_at">
                  {{ formatDate(transaction.updated_at) }} <br />
                  {{ formatTime(transaction.updated_at) }}
                </td>
              </tr>
              <!--end::Row-->
            </table>
            <!--end::Details-->
          </div>
          <!--end::Section-->
          <!--begin::Seperator-->
          <div class="separator separator-dashed mb-7"></div>
          <!--end::Seperator-->
          <!--begin::Section-->

          <!--end::Section-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::Sidebar-->
  </div>

  <!--end::Layout-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import useOutputFormat from "@/composables/useOutputFormat";
import { useCustomerTransactionStore } from "@/stores/customer/transaction";

export default defineComponent({
  name: "money-request-details",
  components: { PermissionDenied, PageLoader },
  setup() {
    //store
    const moneyRequestStore = useCustomerTransactionStore();
    const { transaction, unauthorized } = storeToRefs(moneyRequestStore);
    const { getTransactionByReference } = useCustomerTransactionStore();

    //auth user
    const authStore = useAuthStore();
    const { authenticatedUser } = storeToRefs(authStore);
    //ref data
    const refData = ref({
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,
      loadingData: false,
      loadingAction: false,
      loadingAccounts: false,
    });

    //moneyRequest

    const moneyRequestForm = ref({
      id: 0,
      action: "cancel",
      paid: 0,
      reference: "",
    } as any);
    const payMoneyRequestForm = ref({
      debit_account_no: "",
    });
    const action = ref("");
    const my_accounts = ref([]);
    const route = useRoute();
    onMounted(async () => {
      refData.value.loadingPage = true;
      moneyRequestForm.value.reference = route.params.reference;
      await getTransactionByReference(moneyRequestForm.value.reference);
      refData.value.loadingPage = false;
    });

    const showEditMoneyRequestModal = async () => {
      // refData.value.moneyRequestForm.action = "Edit";
    };

    const formUpdateMoneyRequestRef = ref<null | HTMLFormElement>(null);

    const UpdateMoneyRequestModalRef = ref<null | HTMLElement>(null);

    const rules = ref({
      paid: [
        {
          required: true,
          message: "status is required",
          trigger: "change",
        },
      ],
    });

    //output formatting
    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();
    return {
      //variables
      refData,

      moneyRequestForm,
      payMoneyRequestForm,
      action,
      my_accounts,

      //functions
      getTransactionByReference,
      showEditMoneyRequestModal,

      rules,
      formUpdateMoneyRequestRef,
      UpdateMoneyRequestModalRef,

      //state
      transaction,
      authenticatedUser,

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
