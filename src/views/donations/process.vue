<template>
  <!--begin::Wrapper-->
  <div class="d-flex flex-column flex-column-fluid">
    <!--begin::Content-->
    <div class="d-flex flex-column flex-center p-10">
      <!--begin::Wrapper-->

      <div class="card card-flush w-lg-1000px py-5 pt-0">
        <!--begin::Body-->
        <div class="card-body p-lg-17">
          <!--begin::Hero-->
          <div class="position-relative mb-17">
            <div class="mb-2 text-center">
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

            <div class="separator separator-dashed mb-5"></div>
            <!--begin::Overlay-->
            <div class="overlay overlay-show">
              <!--begin::Image-->
              <div
                class="bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-150px"
                style="background-image: url('/media/donations/img-4.jpg')"
              ></div>
              <!--end::Image-->
              <!--begin::layer-->
              <div
                class="overlay-layer rounded bg-black"
                style="opacity: 0.4"
              ></div>
              <!--end::layer-->
            </div>
            <!--end::Overlay-->
            <!--begin::Heading-->
            <div class="position-absolute text-white mb-8 ms-10 bottom-0">
              <!--begin::Title-->
              <h3 class="text-white fs-2qx fw-bold mb-3 m">
                Donations with SPPAY
              </h3>
              <!--end::Title-->
              <!--begin::Text-->
              <!--              <div class="fs-5 fw-semibold">...</div>-->
              <!--end::Text-->
            </div>
            <!--end::Heading-->
          </div>
          <!--end::-->
          <!--begin::Layout-->
          <DataLoader v-if="loadingPaymentData"></DataLoader>
          <div class="d-flex flex-column flex-lg-row mb-17" v-else>
            <!--begin::Content-->
            <div class="flex-lg-row-fluid me-0 me-lg-20">
              <!--begin::Job-->
              <div class="mb-10 mb-lg-0">
                <!--begin::Description-->
                <div class="m-0">
                  <!--begin::Title-->
                  <h4 class="fs-1 text-gray-800 w-bolder mb-6">
                    <router-link
                      :to="'/donations/' + request.transaction_reference"
                    >
                      {{ campaignData.title }}</router-link
                    >
                  </h4>
                  <!--end::Title-->

                  <!--begin::Row-->
                  <div class="row g-12">
                    <!--begin::Col-->
                    <div class="col-12">
                      <!--begin::Earnings-->
                      <div class="cards card-xxl-stretch mb-5 mb-xxl-10">
                        <div class="separator separator-dashed mb-5"></div>
                      </div>
                      <!--end::Earnings-->
                    </div>
                    <!--end::Col-->
                  </div>
                  <!--end::Row-->

                  <template v-if="!validatedPayment"
                    >An error occurred - please try again</template
                  >

                  <template v-else>
                    <!--begin::OTP-->
                    <div
                      class="w-lg-500px p-10"
                      v-if="validatedPayment.message === 'OTP Required'"
                    >
                      {{ validatedPayment }}
                      <!--begin::Form-->
                      <el-form
                        class="form w-100 mb-13"
                        @submit.prevent="submitPaystackOTP()"
                        :model="request"
                        :rules="otpValidationRules"
                        ref="formAddUpdateCampaignRef"
                      >
                        <!--begin::Heading-->
                        <div class="text-center mb-10">
                          <!--begin::Title-->
                          <h1 class="text-dark mb-3">OTP Validation</h1>
                          <!--end::Title-->
                          <!--begin::Sub-title-->
                          <div class="text-muted fw-semibold fs-5 mb-5">
                            Enter the verification code we sent to your mobile
                            phone
                          </div>
                          <!--end::Sub-title-->
                          <!--begin::Mobile no-->
                          <div class="fw-bold text-dark fs-3 text-center">
                            <!--                            ******7859-->
                          </div>
                          <!--end::Mobile no-->
                        </div>
                        <!--end::Heading-->
                        <!--begin::Section-->
                        <div class="mb-10">
                          <!--begin::Label-->
                          <div
                            class="fw-bold text-start text-dark fs-6 mb-1 ms-1"
                          >
                            Type your 6 digit security code
                          </div>
                          <!--end::Label-->
                          <!--begin::Input group-->
                          <div class="d-flex flex-wrap flex-stack">
                            <el-form-item prop="otp">
                              <el-input
                                type="text"
                                name="code_1"
                                data-inputmask="'mask': '9', 'placeholder': 'Enter OTP'"
                                maxlength="6"
                                class="h-60px fs-2qx text-center"
                                v-model="request.otp"
                                :disabled="loading"
                                placeholder="Enter OTP"
                            /></el-form-item>
                          </div>
                          <!--begin::Input group-->
                        </div>
                        <!--end::Section-->
                        <!--begin::Submit-->
                        <div class="d-flex flex-center">
                          <button
                            :data-kt-indicator="loading ? 'on' : null"
                            class="btn btn-success"
                            type="submit"
                            @submit.prevent="submitPaystackOTP()"
                            :disabled="loading"
                          >
                            <span v-if="!loading" class="indicator-label">
                              Confirm OTP
                              <span class="svg-icon svg-icon-3 ms-2 me-0">
                                <inline-svg
                                  src="/media/icons/duotune/arrows/arr064.svg"
                                />
                              </span>
                            </span>
                            <span v-if="loading" class="indicator-progress">
                              Please wait...
                              <span
                                class="spinner-border spinner-border-sm align-middle ms-2"
                              ></span>
                            </span>
                          </button>
                        </div>

                        <!--end::Submit-->
                      </el-form>
                      <!--end::Form-->
                      <!--begin::Notice-->
                      <div class="text-center fw-semibold fs-5">
                        <span class="text-muted me-1"
                          >Didn’t get the code ?</span
                        >
                        <a href="#" class="link-primary fs-5 me-1">Resend</a>
                      </div>
                      <!--end::Notice-->
                    </div>
                    <!--end::OTP-->

                    <!--begin::Text-->
                    <div class="fw-semibold fs-4 text-gray-600 mb-2" v-else>
                      <div class="current" data-kt-stepper-element="content">
                        <div class="">
                          <!--begin::Body-->
                          <div class="">
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
                                  <div class="fs-3 text-gray-600">
                                    {{ validatedPayment.message }} <br />
                                    <b>
                                      Please confirm payment from your momo
                                      provider</b
                                    >
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
                                v-if="
                                  validatedPayment.transaction.original
                                    .status === 1
                                "
                                class="badge badge-primary"
                                >Created</span
                              >
                              <span
                                v-if="
                                  validatedPayment.transaction.original
                                    .status === 2
                                "
                                class="badge badge-info"
                                >Submitted</span
                              >
                              <span
                                v-if="
                                  validatedPayment.transaction.original
                                    .status === 3
                                "
                                class="badge badge-warning"
                                >Processing</span
                              >
                              <span
                                v-if="
                                  validatedPayment.transaction.original
                                    .status === 4
                                "
                                class="badge badge-success"
                                >Success</span
                              >
                              <span
                                v-if="
                                  validatedPayment.transaction.original
                                    .status === 5
                                "
                                class="badge badge-danger"
                                >Error</span
                              >
                              <span
                                v-if="
                                  validatedPayment.transaction.original
                                    .status === 6
                                "
                                class="badge badge-danger"
                                >Cancelled</span
                              >
                            </div>
                            <div class="col-md-12">
                              Reference:
                              <b>{{
                                validatedPayment.transaction.original.reference
                              }}</b>
                            </div>
                            <div v-if="confirmed.email" class="col-md-12">
                              External Reference:
                              <b>{{ confirmed.email }}</b>
                            </div>
                            <div class="col-md-12">
                              Send Amount:
                              <b
                                >{{
                                  validatedPayment.transaction.original.currency
                                }}
                                {{
                                  validatedPayment.transaction.original.amount
                                }}</b
                              >
                            </div>
                            <div
                              class="col-md-12"
                              v-if="
                                validatedPayment.transaction.original.charge
                              "
                            >
                              Charge:
                              <b
                                >{{
                                  validatedPayment.transaction.original.charge
                                    .currency
                                }}
                                {{
                                  validatedPayment.transaction.original.charge
                                    .amount
                                }}</b
                              >
                            </div>
                            <div class="col-md-12">
                              From:
                              <b
                                >{{
                                  validatedPayment.transaction.original
                                    .debit_account_no
                                }}
                                {{
                                  validatedPayment.transaction.original
                                    .debit_account_name
                                }}</b
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
                    </div>
                    <!--end::Text-->
                  </template>
                </div>
                <!--end::Description-->
              </div>
              <!--end::Job-->
            </div>
            <!--end::Content-->
          </div>
          <!--end::Layout-->

          <!--begin::Card-->
          <div class="card mb-4 bg-light text-center">
            <!--begin::Body-->
            <div class="card-body py-12">
              <!--begin::Icon-->
              <a href="#" class="mx-4">
                <img
                  src="/media/svg/brand-logos/facebook-4.svg"
                  class="h-30px my-2"
                  alt=""
                />
              </a>
              <!--end::Icon-->
              <!--begin::Icon-->
              <a href="#" class="mx-4">
                <img
                  src="/media/svg/brand-logos/instagram-2-1.svg"
                  class="h-30px my-2"
                  alt=""
                />
              </a>
              <!--end::Icon-->
              <!--begin::Icon-->
              <a href="#" class="mx-4">
                <img
                  src="/media/svg/brand-logos/github.svg"
                  class="h-30px my-2"
                  alt=""
                />
              </a>
              <!--end::Icon-->
              <!--begin::Icon-->
              <a href="#" class="mx-4">
                <img
                  src="/media/svg/brand-logos/behance.svg"
                  class="h-30px my-2"
                  alt=""
                />
              </a>
              <!--end::Icon-->
              <!--begin::Icon-->
              <a href="#" class="mx-4">
                <img
                  src="/media/svg/brand-logos/pinterest-p.svg"
                  class="h-30px my-2"
                  alt=""
                />
              </a>
              <!--end::Icon-->
              <!--begin::Icon-->
              <a href="#" class="mx-4">
                <img
                  src="/media/svg/brand-logos/twitter.svg"
                  class="h-30px my-2"
                  alt=""
                />
              </a>
              <!--end::Icon-->
              <!--begin::Icon-->
              <a href="#" class="mx-4">
                <img
                  src="/media/svg/brand-logos/dribbble-icon-1.svg"
                  class="h-30px my-2"
                  alt=""
                />
              </a>
              <!--end::Icon-->

              <!--begin::Icon-->
              <a href="#" class="mx-4">
                <img
                  src="/media/svg/brand-logos/whatsapp-2.svg"
                  class="h-30px my-2"
                  alt=""
                />
              </a>
              <!--end::Icon-->
            </div>
            <!--end::Body-->
          </div>
          <!--end::Card-->
        </div>
        <!--end::Body-->
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
import { useRoute } from "vue-router";
import { useGuestPaymentStore } from "@/stores/guest/payment";

import Message from "vue-m-message";

import { storeToRefs } from "pinia";
import { useGuestGeneralStore } from "@/stores/guest/general";
import DataLoader from "@/components/DataLoader.vue";
import useOutputFormat from "@/composables/useOutputFormat";

export default defineComponent({
  name: "guest-donations",
  components: { DataLoader },
  setup() {
    const storeBody = useBodyStore();
    const storeTheme = useThemeStore();
    const themeMode = computed(() => {
      return storeTheme.mode;
    });
    const bgImage = themeMode.value !== "dark" ? "bg5.png" : "bg1-dark.jpg";

    const loadingPage = ref(true);

    //guest payment store
    const paymentStore = useGuestPaymentStore();
    const {
      loadingPaymentData,
      campaignData,
      validatedPayment,
      loadingValidatedData,
      submittedOtpResponse,
      loadingOtpResponse,
    } = storeToRefs(paymentStore);
    const { getCampaign } = useGuestPaymentStore();

    //common store
    const generalStore = useGuestGeneralStore();
    const { loadingGeneralData } = storeToRefs(generalStore);
    const route = useRoute();

    const loadingData = ref(false);
    const loading = ref(false);

    const stepperForm = ref({
      step: "input",
    });

    const request = ref({
      transaction_reference: "" as any,
      otp: "",
    });

    const validated = ref({} as any);

    const confirmed = ref({} as any);

    const formAddUpdateCampaignRef = ref<null | HTMLFormElement>(null);

    const submitPaystackOTP = () => {
      if (!formAddUpdateCampaignRef.value) {
        return;
      }

      formAddUpdateCampaignRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;

          let payload = {
            otp: request.value.otp,
            transaction_reference:
              validatedPayment.value.transaction.original.reference,
          };

          console.log("payload ", payload);
          paymentStore
            .submitPaystackOtp(payload)
            .then((response: any) => {
              confirmed.value = response.data;

              stepperForm.value.step = "confirmed";

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
              const response = error.response.data.message;
              console.log(error.response);
              Message({
                message: response,
                position: "bottom-right",
                type: "error",
                duration: 5000,
                zIndex: 99999,
              });
            })
            .finally(() => (loading.value = false));
        } else {
          return false;
        }
      });
    };

    const otpValidationRules = ref({
      transaction_reference: [
        {
          required: true,
          message: "Transaction reference is required",
          trigger: "change",
        },
      ],
      otp: [
        {
          required: true,
          message: "OTP is required",
          trigger: "change",
        },
      ],
    });

    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();

    onMounted(() => {
      loadingPage.value = true;

      LayoutService.emptyElementClassesAndAttributes(document.body);

      storeBody.addBodyClassname("bg-body");
      storeBody.addBodyAttribute({
        qualifiedName: "style",
        value: `background-image: url("/media/auth/${bgImage}")`,
      });
      request.value.transaction_reference =
        validatedPayment.value.transaction.original.reference;
      getCampaign(route.params.reference);
      console.log(validatedPayment.value.transaction.original.reference);
      console.log(1);

      loadingPage.value = false;
    });
    return {
      //page
      getIllustrationsPath,
      bgImage,
      loadingPage,

      //form

      submitPaystackOTP,

      loadingData,
      loading,
      stepperForm,
      request,
      validated,
      confirmed,

      //state
      loadingGeneralData,
      loadingPaymentData,
      campaignData,

      //dates
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,

      //otp
      otpValidationRules,
      formAddUpdateCampaignRef,
      loadingValidatedData,
      validatedPayment,

      //
      submittedOtpResponse,
      loadingOtpResponse,
    };
  },
});
</script>
