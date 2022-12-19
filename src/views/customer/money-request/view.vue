<template>
  <!--begin::Layout-->
  <PermissionDenied v-if="refData.unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />

  <div class="d-flex flex-column flex-lg-row">
    <!--begin::Content-->
    <div class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
      <!--begin::Alert-->
      <div
        class="alert alert-danger d-flex align-items-center p-5"
        v-if="moneyRequestDetails.status_id === '3'"
      >
        <!--begin::Icon-->
        <span class="svg-icon svg-icon-2hx svg-icon-primary me-3"></span>
        <!--end::Icon-->

        <!--begin::Wrapper-->
        <div class="d-flex flex-column">
          <!--begin::Title-->
          <h4 class="mb-1 text-dark">Alert!</h4>
          <!--end::Title-->
          <!--begin::Content-->
          <span
            >The request was cancelled at
            {{ moneyRequestDetails.status.updated_at }}.</span
          >
          <!--end::Content-->
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Alert-->

      <!--begin::Card-->
      <div class="card card-flush pt-3 mb-5 mb-xl-10">
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title">
            <h2 class="fw-bold">
              Money Request # {{ moneyRequestDetails.reference }}
            </h2>
          </div>
          <!--begin::Card title-->
          <!--begin::Card toolbar-->
          <div class="card-toolbar" v-if="!refData.loadingData">
            <a
              href="#"
              class="btn btn-light-primary"
              @click="showEditMoneyRequestModal()"
              data-bs-toggle="modal"
              id="edit-btn"
              data-bs-target="#kt_modal_add_customer"
              v-if="moneyRequestDetails.status_id === '1'"
              >Cancel Request</a
            >
            <h2
              class="fw-bold text-success"
              v-else-if="moneyRequestDetails.status_id === '2'"
            >
              Completed
            </h2>
            <h2 class="fw-bold text-danger" v-else>Cancelled!</h2>
          </div>
          <!--end::Card toolbar-->
        </div>
        <!--end::Card header-->
        <!--begin::Card body-->
        <div class="card-body pt-3">
          <!--begin::Section-->
          <div class="mb-10">
            <!--begin::Title-->
            <h5 class="mb-4">Requester Details:</h5>
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
                      Reference:
                    </td>
                    <td class="text-gray-800 min-w-200px">
                      <a href="#" class="text-gray-800 text-hover-primary">{{
                        moneyRequestDetails.reference
                      }}</a>
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">description:</td>
                    <td class="text-gray-800">
                      {{ moneyRequestDetails.description }}
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Account No:</td>
                    <td class="text-gray-800">
                      {{ moneyRequestDetails.requester_account_no }}
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">amount:</td>
                    <td class="text-gray-800">
                      {{ moneyRequestDetails.amount }}
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
                <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2 m-0">
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400 min-w-175px w-175px">
                      Customer ID:
                    </td>
                    <td class="text-gray-800 min-w-200px">
                      {{ moneyRequestDetails.requester_customer_id }}
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">User ID:</td>
                    <td class="text-gray-800">
                      {{ moneyRequestDetails.requester_user_id }}
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

          <div class="separator separator-dashed mb-10"></div>

          <!--begin::Section-->
          <div class="mb-10">
            <!--begin::Title-->
            <h5 class="mb-4">Giver Details:</h5>
            <!--end::Title-->
            <!--begin::Details-->
            <div class="d-flex flex-wrap py-5">
              <!--begin::Row-->
              <div class="flex-equal me-5">
                <!--begin::Details-->
                <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2 m-0">
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400 min-w-175px w-175px">Email:</td>
                    <td class="text-gray-800 min-w-200px">
                      <a href="#" class="text-gray-800 text-hover-primary">{{
                        moneyRequestDetails.giver_user_email
                      }}</a>
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Transaction Reference:</td>
                    <td class="text-gray-800">
                      {{ moneyRequestDetails.transaction_reference }}
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Payment Status:</td>
                    <td class="text-gray-800" v-if="moneyRequestDetails.status">
                      {{ moneyRequestDetails.status.name }}
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">.</td>
                    <td class="text-gray-800">.</td>
                  </tr>
                  <!--end::Row-->
                </table>
                <!--end::Details-->
              </div>
              <!--end::Row-->
              <!--begin::Row-->
              <div class="flex-equal">
                <!--begin::Details-->
                <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2 m-0">
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400 min-w-175px w-175px">.</td>
                    <td class="text-gray-800 min-w-200px">.</td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->

                  <!--end::Row-->
                </table>
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
      class="flex-column flex-lg-row-auto w-lg-250px w-xl-300px mb-10 order-1 order-lg-2"
    >
      <!--begin::Card-->
      <div
        class="card card-flush mb-0"
        data-kt-sticky="true"
        data-kt-sticky-name="subscription-summary"
        data-kt-sticky-offset="{default: false, lg: '200px'}"
        data-kt-sticky-width="{lg: '250px', xl: '300px'}"
        data-kt-sticky-left="auto"
        data-kt-sticky-top="150px"
        data-kt-sticky-animation="false"
        data-kt-sticky-zindex="95"
      >
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title">
            <h2>ACTION</h2>
          </div>
          <!--end::Card title-->
          <!--begin::Card toolbar-->
          <div class="card-toolbar">
            <!--begin::More options-->
            <a
              href="#"
              class="btn btn-sm btn-light btn-icon"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
            >
              <!--begin::Svg Icon | path: icons/duotune/general/gen052.svg-->
              <span class="svg-icon svg-icon-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="10"
                    y="10"
                    width="4"
                    height="4"
                    rx="2"
                    fill="currentColor"
                  />
                  <rect
                    x="17"
                    y="10"
                    width="4"
                    height="4"
                    rx="2"
                    fill="currentColor"
                  />
                  <rect
                    x="3"
                    y="10"
                    width="4"
                    height="4"
                    rx="2"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <!--end::Svg Icon-->
            </a>
            <!--begin::Menu-->
            <div
              class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-6 w-200px py-4"
              data-kt-menu="true"
            >
              <!--begin::Menu item-->
              <div class="menu-item px-3">
                <a
                  href="#"
                  class="menu-link px-3"
                  data-kt-subscriptions-view-action="delete"
                  >Cancel Request</a
                >
              </div>
              <!--end::Menu item-->
              <!--begin::Menu item-->
              <div class="menu-item px-3">
                <a
                  href="#"
                  class="menu-link text-danger px-3"
                  data-kt-subscriptions-view-action="edit"
                  >Fulfill Request</a
                >
              </div>
              <!--end::Menu item-->
            </div>
            <!--end::Menu-->
            <!--end::More options-->
          </div>
          <!--end::Card toolbar-->
        </div>
        <!--end::Card header-->
        <!--begin::Card body-->
        <div class="card-body pt-0 fs-6">
          <!--begin::Seperator-->
          <div class="separator separator-dashed mb-7"></div>
          <!--end::Seperator-->
          <!--begin::Section-->
          <div class="mb-10">
            <!--begin::Details-->
            <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2">
              <!--begin::Row-->
              <tr class="">
                <td class="text-gray-400">Status:</td>
                <td v-if="moneyRequestDetails.status">
                  <span class="badge badge-light-success">
                    {{ moneyRequestDetails.status.name }}</span
                  >
                </td>
              </tr>
              <tr class="">
                <td class="text-gray-400">Created At:</td>
                <td class="text-gray-800" v-if="moneyRequestDetails.status">
                  {{ formatDate(moneyRequestDetails.status.created_at) }}
                </td>
              </tr>
              <tr class="">
                <td class="text-gray-400">Updated At:</td>
                <td class="text-gray-800" v-if="moneyRequestDetails.status">
                  {{ formatDate(moneyRequestDetails.status.updated_at) }}
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
          <!--          TODO-->
          <div
            class="mb-10"
            v-if="
              authenticatedUser.id !==
                parseInt(moneyRequestDetails.requester_user_id) &&
              !refData.loadingAccounts &&
              moneyRequestDetails.status_id !== '3'
            "
          >
            <!--begin::Title-->
            <h5 class="mb-4">Pay from Account</h5>
            <!--end::Title-->
            <!--begin::Details-->
            <div class="mb-0">
              <!--begin::Card info-->
              <div
                class="fw-semibold text-gray-600 d-flex align-items-center row"
              >
                <div class="col-md-12">
                  <div class="mb-3">
                    <label class="form-label">Payment Method</label>

                    <select
                      name="institution_id"
                      class="form-select form-control"
                      v-model="payMoneyRequestForm.debit_account_no"
                      :disabled="refData.loadingAccounts"
                    >
                      <option value="">Select Credit Account</option>
                      <option
                        v-for="account in accounts"
                        :key="account.id"
                        :value="account.id"
                      >
                        {{ account.id + " - " + account.name_on_account }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="mb-3">
                    <button
                      :data-kt-indicator="refData.loadingAccounts ? 'on' : null"
                      class="btn btn-lg btn-danger"
                      @click="payMoneyRequestAction()"
                    >
                      <span
                        v-if="!refData.loadingAccounts"
                        class="indicator-label"
                      >
                        Fulfill Payment
                        <span class="svg-icon svg-icon-3 ms-2 me-0">
                          <inline-svg
                            src="/media/icons/duotune/arrows/arr064.svg"
                          />
                        </span>
                      </span>
                      <span
                        v-if="refData.loadingAccounts"
                        class="indicator-progress"
                      >
                        Please wait...
                        <span
                          class="spinner-border spinner-border-sm align-middle ms-2"
                        ></span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <!--end::Card info-->
            </div>
            <!--end::Details-->
          </div>
          <!--end::Section-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::Sidebar-->
  </div>

  <!-- Cancel Money Request Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_customer"
    ref="UpdateMoneyRequestModalRef"
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
        <div
          class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15"
          v-if="moneyRequestForm"
        >
          <el-form
            @submit.prevent="processMoneyRequestAction()"
            class="form"
            :model="moneyRequestForm"
            :rules="rules"
            ref="formUpdateMoneyRequestRef"
          >
            <!--begin::Heading-->
            <div class="mb-13 text-center">
              <!--begin::Title-->
              <h1 class="mb-3">Cancel Money Request</h1>
              <!--end::Title-->
            </div>
            <!--end::Heading-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-4 fv-row">
              <div class="modal-text">
                <h6 class="text-center" style="color: red">
                  Are you sure you want to process this money request?
                </h6>
              </div>
            </div>

            <!--end::Input group-->
          </el-form>
        </div>
        <div class="modal-footer flex-center" v-if="moneyRequestForm">
          <!--begin::Button-->
          <button
            type="reset"
            id="kt_modal_add_customer_cancel"
            class="btn btn-light me-3"
            data-bs-dismiss="modal"
            :disabled="refData.loadingAction"
          >
            Discard
          </button>
          <!--end::Button-->

          <!--begin::Button-->
          <button
            :data-kt-indicator="refData.loadingAction ? 'on' : null"
            class="btn btn-lg btn-danger"
            type="submit"
            @click="processMoneyRequestAction()"
          >
            <span v-if="!refData.loadingAction" class="indicator-label">
              Cancel Request
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
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!-- Cancel Money Request Modal-->

  <!--end::Layout-->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";

import { useRoute } from "vue-router";
import Message from "vue-m-message";
import { hideModal } from "@/core/helpers/dom";

import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import { useCustomerMoneyRequestStore } from "@/stores/customer/moneyrequest";
import { storeToRefs } from "pinia";
import { useCustomerAccountStore } from "@/stores/customer/account";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "money-request-details",
  components: { PermissionDenied, PageLoader },
  setup() {
    //store
    const moneyRequestStore = useCustomerMoneyRequestStore();
    const {
      moneyRequestDetails,
      moneyRequestPayments,
      meta,
      loadingMoneyRequestData,
    } = storeToRefs(moneyRequestStore);
    const { getMoneyRequest } = useCustomerMoneyRequestStore();

    //account store
    const accountStore = useCustomerAccountStore();
    const { getAccounts } = useCustomerAccountStore();
    const { accounts, loadingAccountData } = storeToRefs(accountStore);

    //auth user
    const authStore = useAuthStore();
    const { authenticatedUser } = storeToRefs(authStore);
    //ref data
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,

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

    // const getMoneyRequest = async (option): Promise<void> => {
    //   refData.value.loadingData = true;
    //
    //   await store
    //     .dispatch("moneyrequest/getMoneyRequestByReference", option)
    //     .then((response) => {
    //       moneyRequestData.value = response.data.money_request;
    //     })
    //     .catch((error) => {
    //       // if (error.response.status === 403) {
    //       //   // unauthorized.
    //       //   refData.value.unauthorized = true;
    //       // }
    //       console.log(error);
    //     })
    //     .finally(() => {
    //       refData.value.loadingPage = false;
    //       refData.value.loadingData = false;
    //     });
    // };

    const route = useRoute();
    onMounted(async () => {
      refData.value.loadingPage = true;

      moneyRequestForm.value.reference = route.params.reference;

      await getMoneyRequest(moneyRequestForm.value.reference);
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

    const payMoneyRequestAction = () => {
      refData.value.loadingAction = true;

      moneyRequestStore
        .payMoneyRequest([
          payMoneyRequestForm.value,
          moneyRequestForm.value.reference,
        ])

        .then(() => {
          refData.value.loadingAction = false;

          Message({
            message: "Data updated successfully.",
            //TBC
            //position: "bottom-right",
            type: "success",
            duration: 5000,
            zIndex: 99999,
          });

          getMoneyRequest(moneyRequestForm.value.reference);
        })
        .catch((error) => {
          console.log(error);
          // get errors from state
          //T0D0
          const response = error.response.data;

          if (response.errors) {
            const errors = response.errors;
            for (const key in errors) {
              Message({
                message: errors[key][0],
                //TBC
                //position: "bottom-right",
                type: "error",
                duration: 5000,
                zIndex: 99999,
              });
            }
          } else if (response.error) {
            Message({
              message: response.error,
              //TBC
              //position: "bottom-right",
              type: "error",
              duration: 5000,
              zIndex: 99999,
            });
          }

          refData.value.loadingAction = false;
        });
    };

    const processMoneyRequestAction = () => {
      if (!formUpdateMoneyRequestRef.value) {
        return;
      }

      formUpdateMoneyRequestRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          const payload = {
            action: "cancel",
          };

          moneyRequestStore
            .updateMoneyRequest([payload, moneyRequestForm.value.reference])

            .then(() => {
              moneyRequestForm.value.action = "Edit";

              refData.value.loadingAction = false;

              Message({
                message: "Data updated successfully.",
                //TBC
                //position: "bottom-right",
                type: "success",
                duration: 5000,
                zIndex: 99999,
              });

              getMoneyRequest(moneyRequestForm.value.reference);

              hideModal(UpdateMoneyRequestModalRef.value);
            })
            .catch((error) => {
              // get errors from state
              const response = error.response.data;

              if (response.errors) {
                const errors = response.errors;
                for (const key in errors) {
                  Message({
                    message: errors[key][0],
                    //TBC
                    //position: "bottom-right",
                    type: "error",
                    duration: 5000,
                    zIndex: 99999,
                  });
                }
              } else if (response.error) {
                Message({
                  message: response.error,
                  //TBC
                  //position: "bottom-right",
                  type: "error",
                  duration: 5000,
                  zIndex: 99999,
                });
              }

              // update loading status
              refData.value.loadingAction = false;
            });

          //do nothing.
        } else {
          return false;
        }
      });
    };

    onMounted(async () => {
      await getAccounts({
        account: "",
        current_page: 1,
        page_size: 10,
        search_text: "",
        sort: { column: "", direction: "" },
      });
    });
    //get authenticated user
    //TODO
    // const store = useStore();
    // const authSppUser = computed(() => store.getters.authorisedUser);
    return {
      //variables
      refData,

      moneyRequestForm,
      payMoneyRequestForm,
      action,
      my_accounts,

      //functions
      getMoneyRequest,
      showEditMoneyRequestModal,
      processMoneyRequestAction,
      rules,
      formUpdateMoneyRequestRef,
      UpdateMoneyRequestModalRef,
      payMoneyRequestAction,

      //state
      moneyRequestDetails,
      authenticatedUser,
      accounts,
    };
  },
});
</script>
