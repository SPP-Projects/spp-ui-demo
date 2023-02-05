<template>
  <!--begin::Wrapper-->
  <div class="d-flex flex-column flex-center flex-column-fluid">
    <!--begin::Content-->
    <div class="d-flex flex-column flex-center p-10">
      <!--begin::Wrapper-->
      <div class="card card-flush w-lg-650px py-5">
        <div class="card-body py-10 py-lg-10">
          <div>
            <!--begin::Logo-->
            <div class="mb-10 text-center">
              <router-link to="/" class="">
                <img
                  alt="Logo"
                  src="/media/logos/custom-2.svg"
                  class="h-40px"
                  ref="picture"
                />
              </router-link>
            </div>
            <!--end::Logo-->
          </div>

          <div class="w-lg-600px">
            <PageLoader v-if="loadingPage"></PageLoader>
            <div v-else class="col-md-12 mx-auto mt-5">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <h2 v-if="form.step === 'input'" class="text-center">
                      Invoice Payment
                    </h2>
                    <h2 v-if="form.step === 'validated'" class="text-center">
                      Confirm Payment
                    </h2>
                    <h2 v-if="form.step === 'initiated'" class="text-center">
                      Approve Payment
                    </h2>
                    <h2 v-if="form.step === 'confirmed'" class="text-center">
                      Payment Submitted
                    </h2>
                    <div class="separator separator-dashed m-5"></div>
                  </div>
                </div>

                <div class="row">
                  <!--begin::Form-->
                  <form class="my-auto pb-5">
                    <!--begin:: Input-->
                    <div
                      v-if="form.step === 'input'"
                      class="current"
                      data-kt-stepper-element="content"
                    >
                      <div class="w-100">
                        <!--begin::Heading-->
                        <div class="pb-10 pb-lg-15">
                          <!--begin::Title-->
                          <h2 class="fw-bold text-dark">Payment Info</h2>
                          <!--end::Title-->

                          <!--begin::Notice-->
                          <div class="text-gray-400 fw-semobold fs-6">
                            If you need more info, please check out
                            <a href="#" class="link-primary fw-bold"
                              >Help Page</a
                            >.
                          </div>
                          <!--end::Notice-->
                        </div>
                        <!--end::Heading-->

                        <!--begin::Input group-->
                        <div class="mb-10 fv-row">
                          <!--begin::Label-->
                          <label class="form-label mb-3">Payment Method</label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <div>
                            <Field
                              name="institution_id"
                              class="form-select form-select-solid select2-hidden-accessible"
                              placeholder="Month"
                              as="select"
                              v-model="request.payee.account.code"
                              :disabled="loading"
                            >
                              <option value="">Select Payment Method</option>
                              <option
                                v-for="institution in form.debit_institutions"
                                :key="institution.code"
                                :value="institution.code"
                              >
                                {{ institution.name }}
                              </option>
                            </Field>
                            <ErrorMessage
                              class="fv-plugins-message-container invalid-feedback"
                              name="institution_id"
                            />
                          </div>

                          <!--end::Input-->
                        </div>
                        <div class="mb-10 fv-row">
                          <!--begin::Label-->
                          <label class="form-label mb-3"
                            >Debit Account Number</label
                          >
                          <!--end::Label-->

                          <!--begin::Input-->
                          <input
                            type="text"
                            class="form-control form-control-lg form-control-solid"
                            v-model="request.payee.account.number"
                            placeholder="Enter Account Number to Initiate Payment From E.g. 027XXXXXXX"
                          />
                          <ErrorMessage
                            name="accountName"
                            class="fv-plugins-message-container invalid-feedback"
                          ></ErrorMessage>
                          <!--end::Input-->
                        </div>
                        <div class="mb-10 fv-row">
                          <!--begin::Label-->
                          <label class="form-label mb-3">Amount</label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <input
                            type="text"
                            class="form-control form-control-lg form-control-solid"
                            v-model="request.amount"
                            placeholder="Enter Amount"
                          />
                          <ErrorMessage
                            name="accountName"
                            class="fv-plugins-message-container invalid-feedback"
                          ></ErrorMessage>
                          <!--end::Input-->
                        </div>
                        <div class="mb-10 fv-row">
                          <!--begin::Label-->
                          <label class="form-label mb-3">Email</label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <input
                            type="text"
                            class="form-control form-control-lg form-control-solid"
                            v-model="request.payee.email"
                            placeholder="Enter Email"
                          />

                          <ErrorMessage
                            name="accountName"
                            class="fv-plugins-message-container invalid-feedback"
                          ></ErrorMessage>
                          <!--end::Input-->
                        </div>
                        <!--end::Input group-->
                      </div>
                    </div>
                    <!--begin:: Input-->

                    <!--begin::Validated-->
                    <div
                      v-if="form.step === 'validated'"
                      class="current"
                      data-kt-stepper-element="content"
                    >
                      <div class="w-100">
                        <!--begin::Heading-->
                        <div class="pb-10 pb-lg-15">
                          <!--begin::Title-->
                          <h2 class="fw-bold text-dark">Validation - OTP</h2>
                          <!--end::Title-->

                          <!--begin::Notice-->
                          <div class="text-gray-400 fw-semobold fs-6">
                            {{ validated.message }}
                          </div>
                          <!--end::Notice-->
                        </div>
                        <!--end::Heading-->

                        <div class="w-100">
                          <!--begin::Input group-->
                          <div class="d-flex flex-column mb-7 fv-row">
                            <!--begin::Label-->
                            <label
                              class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                            >
                              <span class="required">OTP</span>
                              <i
                                class="fas fa-exclamation-circle ms-2 fs-7"
                                title="Enter OTP"
                              ></i>
                            </label>
                            <!--end::Label-->

                            <Field
                              type="text"
                              class="form-control form-control-solid"
                              placeholder="Enter OTP - you will receive this on your phone"
                              name="nameOnCard"
                              v-model="request.otp.pin"
                              :disabled="loading"
                            />
                            <ErrorMessage
                              class="fv-plugins-message-container invalid-feedback"
                              name="otpError"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--begin::Validated-->

                    <!--begin::Confirmed-->
                    <div
                      v-if="form.step === 'confirmed'"
                      class="current"
                      data-kt-stepper-element="content"
                    >
                      <div class="w-100">
                        <!--begin::Body-->
                        <div class="mb-0">
                          <!--begin::Alert-->
                          <div
                            class="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6"
                          >
                            <!--begin::Icon-->
                            <span
                              class="svg-icon svg-icon-2tx svg-icon-warning me-4"
                            >
                              <inline-svg
                                src="/media/icons/duotune/general/gen044.svg"
                              />
                            </span>
                            <!--end::Icon-->
                            <!--begin::Wrapper-->
                            <div class="d-flex flex-stack flex-grow-1">
                              <!--begin::Content-->
                              <div class="fw-semobold">
                                <div class="fs-6 text-gray-600">
                                  {{ confirmed.message }}
                                </div>
                              </div>
                              <!--end::Content-->
                            </div>
                            <!--end::Wrapper-->
                          </div>
                          <!--end::Alert-->

                          <br />

                          <div class="col-md-12">
                            Status:
                            <span
                              v-if="confirmed.transaction.status === 1"
                              class="badge badge-primary"
                              >Created</span
                            >
                            <span
                              v-if="confirmed.transaction.status === 2"
                              class="badge badge-info"
                              >Submitted</span
                            >
                            <span
                              v-if="confirmed.status === 3"
                              class="badge badge-warning"
                              >Processing</span
                            >
                            <span
                              v-if="confirmed.status === 4"
                              class="badge badge-success"
                              >Success</span
                            >
                            <span
                              v-if="confirmed.transaction.status === 5"
                              class="badge badge-danger"
                              >Error</span
                            >
                            <span
                              v-if="confirmed.transaction.status === 6"
                              class="badge badge-danger"
                              >Cancelled</span
                            >
                          </div>
                          <div class="col-md-12">
                            Reference:
                            <b>{{ confirmed.transaction.reference }}</b>
                          </div>
                          <div v-if="confirmed.email" class="col-md-12">
                            External Reference: <b>{{ confirmed.email }}</b>
                          </div>
                          <div class="col-md-12">
                            Send Amount:
                            <b
                              >{{ confirmed.transaction.currency }}
                              {{ confirmed.transaction.amount }}</b
                            >
                          </div>
                          <div class="col-md-12">
                            From:
                            <b
                              >{{ confirmed.transaction.debit_account_no }}
                              {{ confirmed.transaction.debit_account_name }}</b
                            >
                          </div>
                          <div
                            v-if="confirmed.credit_account_name"
                            class="col-md-12"
                          >
                            Recipient Name:
                            <b>{{ confirmed.credit_account_name }}</b>
                          </div>
                          <div v-if="confirmed.charge" class="col-md-12">
                            Charge: <b>{{ confirmed.charge.amount }}</b>
                          </div>
                          <div v-if="confirmed.tax" class="col-md-12">
                            Taxable Amount:
                            <b>{{ validated.taxable_amount }}</b>
                          </div>
                          <div v-if="confirmed.tax" class="col-md-12">
                            Tax: <b>{{ confirmed.tax.amount }}</b>
                          </div>

                          <hr />
                        </div>
                        <!--end::Body-->
                      </div>
                    </div>
                    <!--begin::Confirmed-->
                  </form>
                  <!--end::Form-->
                  <div v-if="form.step === 'input'" class="col-md-12">
                    <div class="row">
                      <div class="col-12 mb-3 text-right">
                        <button
                          class="btn btn-success"
                          type="submit"
                          @click.prevent="validatePayment()"
                          :disabled="loading"
                        >
                          <svg
                            v-if="loading"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-loader spin ml-2"
                          >
                            <line x1="12" y1="2" x2="12" y2="6"></line>
                            <line x1="12" y1="18" x2="12" y2="22"></line>
                            <line
                              x1="4.93"
                              y1="4.93"
                              x2="7.76"
                              y2="7.76"
                            ></line>
                            <line
                              x1="16.24"
                              y1="16.24"
                              x2="19.07"
                              y2="19.07"
                            ></line>
                            <line x1="2" y1="12" x2="6" y2="12"></line>
                            <line x1="18" y1="12" x2="22" y2="12"></line>
                            <line
                              x1="4.93"
                              y1="19.07"
                              x2="7.76"
                              y2="16.24"
                            ></line>
                            <line
                              x1="16.24"
                              y1="7.76"
                              x2="19.07"
                              y2="4.93"
                            ></line>
                          </svg>
                          <span v-else>Validate Payment</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="form.step === 'validated'"
                    class="col-md-12"
                    style="font-size: 14px"
                  >
                    <!--TODO-->
                    <!--                  <div class="col-md-12">-->
                    <!--                    <h5>Amount</h5>-->
                    <!--                    <div class="col-md-12">Send Amount: <b>{{ validated.debit_currency }} {{ validated.debit_amount | formatAmount }}</b></div>-->
                    <!--                    <div class="col-md-12">Charge: <b>{{ validated.charge_amount | formatAmount }}</b></div>-->
                    <!--                    <div class="col-md-12 mb-2">Account to Charge: <b>{{ validated.charge_account }}</b></div>-->
                    <!--                    <div class="col-md-12">Taxable Amount: <b>{{ validated.taxable_amount | formatAmount }}</b></div>-->
                    <!--                    <div class="col-md-12">Tax: <b>{{ validated.tax_amount | formatAmount }}</b></div>-->
                    <!--                    <div class="col-md-12">Account to Tax: <b>{{ validated.tax_account }}</b></div>-->
                    <!--                  </div>-->
                    <hr />
                    <div class="row">
                      <div class="col-12 mb-3 text-right">
                        <button
                          class="btn btn-warning me-5"
                          type="submit"
                          @click.prevent="form.step = 'input'"
                          :disabled="loading"
                        >
                          <i class="mdi mdi-content-save"></i> Edit Details
                        </button>
                        <button
                          class="btn btn-success"
                          type="submit"
                          @click.prevent="confirmPayment()"
                          :disabled="loading"
                        >
                          <svg
                            v-if="loading"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-loader spin ml-2"
                          >
                            <line x1="12" y1="2" x2="12" y2="6"></line>
                            <line x1="12" y1="18" x2="12" y2="22"></line>
                            <line
                              x1="4.93"
                              y1="4.93"
                              x2="7.76"
                              y2="7.76"
                            ></line>
                            <line
                              x1="16.24"
                              y1="16.24"
                              x2="19.07"
                              y2="19.07"
                            ></line>
                            <line x1="2" y1="12" x2="6" y2="12"></line>
                            <line x1="18" y1="12" x2="22" y2="12"></line>
                            <line
                              x1="4.93"
                              y1="19.07"
                              x2="7.76"
                              y2="16.24"
                            ></line>
                            <line
                              x1="16.24"
                              y1="7.76"
                              x2="19.07"
                              y2="4.93"
                            ></line>
                          </svg>
                          <span v-else> Initiate Payment</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useBodyStore } from "@/stores/body";
import { useThemeStore } from "@/stores/theme";
import LayoutService from "@/core/services/LayoutService";
import { getIllustrationsPath } from "@/core/helpers/assets";

import PageLoader from "@/components/PageLoader.vue";
import { useGuestPaymentStore } from "@/stores/guest/payment";
import { storeToRefs } from "pinia";
import { useGuestGeneralStore } from "@/stores/guest/general";
import { useRoute } from "vue-router";
import { Field, ErrorMessage } from "vee-validate";
import Message from "vue-m-message";

export default defineComponent({
  name: "blank-page",
  components: { PageLoader, Field, ErrorMessage },
  setup() {
    const storeBody = useBodyStore();
    const storeTheme = useThemeStore();
    const themeMode = computed(() => {
      return storeTheme.mode;
    });
    const bgImage = themeMode.value !== "dark" ? "bg5.png" : "bg1-dark.jpg";

    const loadingPage = ref(true);

    //payment
    //guest payment store
    const paymentStore = useGuestPaymentStore();
    const { loadingPaymentData, invoiceData } = storeToRefs(paymentStore);
    const { getInvoice } = useGuestPaymentStore();
    //common store
    const generalStore = useGuestGeneralStore();
    const { loadingGeneralData } = storeToRefs(generalStore);
    const route = useRoute();

    const loadingData = ref(false);
    const loading = ref(false);

    const form = ref({
      step: "input",
      debit_institutions: [] as any,
    });

    const request = ref({
      collection_type: "" as any,
      collection_reference: "" as any,
      amount: 0,
      payee: {
        email: "",
        account: {
          code: "",
          number: "",
        },
      },
      otp: {
        id: "",
        pin: "",
      },
    });

    const validated = ref({} as any);

    const confirmed = ref({} as any);

    const instantiateForm = () => {
      request.value.collection_reference = route.params.reference;
      request.value.collection_type = route.params.collectiontype;
      request.value.amount = invoiceData.value.total;
      request.value.payee.email = invoiceData.value.bill_to_email;
      getInstitutions(); // Not async, so will run in background :)
    };

    const getInstitutions = () => {
      generalStore.getInstitutions({ type_id: 3 }).then((response) => {
        form.value.debit_institutions = response;
        //TODO
        //   sort institutions to debit and credit institutions
        // data.value.form.debit_institutions =
        //   data.value.form.credit_institutions.filter(function (
        //     institution: any
        //   ) {
        //     return institution.type_id === "3"; // Get only mobile money institutions
        //   });d
      });
    };

    const validatePayment = () => {
      JSON.stringify(request);
      console.log("request", 1);
      loading.value = true;
      paymentStore
        .validatePayment(request.value)

        .then((response: any) => {
          validated.value = response.data;
          request.value.otp.id = response.data.otp_id;
          form.value.step = "validated";
          console.log(response);
          Message({
            message: "Validation successful, please confirm details.",
            position: "bottom-right",
            type: "success",
            duration: 5000,
            zIndex: 99999,
          });
        })
        .catch((error) => {
          // get errors from state
          const response = error.response.data;

          if (response.errors) {
            const errors = response.errors;
            for (const key in errors) {
              Message({
                message: errors[key][0],
                position: "bottom-right",
                type: "error",
                duration: 5000,
                zIndex: 99999,
              });
            }
          } else if (response.error) {
            Message({
              message: response.error,
              position: "bottom-right",
              type: "error",
              duration: 5000,
              zIndex: 99999,
            });
          }
        })
        .finally(() => (loading.value = false));
    };

    const confirmPayment = () => {
      loading.value = true;

      paymentStore
        .submitPayment(request.value)
        .then((response: any) => {
          confirmed.value = response.data;

          form.value.step = "confirmed";

          Message({
            message: "Payment submitted successfully.",
            position: "bottom-right",
            type: "success",
            duration: 5000,
            zIndex: 99999,
          });
        })
        .catch((error) => {
          // get errors from state
          const response = error.response.data;

          if (response.errors) {
            const errors = response.errors;
            for (const key in errors) {
              Message({
                message: errors[key][0],
                position: "bottom-right",
                type: "error",
                duration: 5000,
                zIndex: 99999,
              });
            }
          } else if (response.error) {
            Message({
              message: response.error,
              position: "bottom-right",
              type: "error",
              duration: 5000,
              zIndex: 99999,
            });
          }
        })
        .finally(() => (loading.value = false));
    };

    onMounted(() => {
      loadingPage.value = true;
      console.log(route.params.reference);
      LayoutService.emptyElementClassesAndAttributes(document.body);

      storeBody.addBodyClassname("bg-body");
      storeBody.addBodyAttribute({
        qualifiedName: "style",
        value: `background-image: url("/media/auth/${bgImage}")`,
      });
      //  getInvoice(route.params.reference);
      instantiateForm();
      loadingPage.value = false;
    });
    return {
      //page
      getIllustrationsPath,
      bgImage,
      loadingPage,

      //form
      validatePayment,
      confirmPayment,
      instantiateForm,

      loadingData,
      loading,
      form,
      request,
      validated,
      confirmed,

      //state
      loadingGeneralData,
      loadingPaymentData,
      invoiceData,
    };
  },
});
</script>
