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
              <div class="fs-5 fw-semibold">
                <!--                Let’s contribute to make world a better place-->
              </div>
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
                    {{ campaignData.title }}
                  </h4>
                  <!--end::Title-->

                  <!--begin::Row-->
                  <div class="row g-12">
                    <!--begin::Col-->
                    <div class="col-12">
                      <!--begin::Earnings-->
                      <div class="cards card-xxl-stretch mb-5 mb-xxl-10">
                        <div class="separator separator-dashed mb-5"></div>

                        <!--begin::Body-->
                        <div class="card-bodys">
                          <span
                            class="fs-5 fw-semibold text-gray-600 pb-5 d-block"
                            >Fund Raiser: {{ campaignData.user_id }}
                          </span>

                          <span
                            class="fs-5 fw-semibold text-gray-600 pb-5 d-block"
                            >Created On:
                            {{ formatDateTime(campaignData.created_at) }}
                          </span>

                          <!--begin::Left Section-->
                          <div
                            class="d-flex flex-wrap justify-content-between pb-6"
                          >
                            <!--begin::Stats-->
                            <div class="row">
                              <!--begin::Col-->
                              <div class="col-4">
                                <div
                                  class="card card-dashed flex-center min-w-150px my-3 p-6"
                                >
                                  <span
                                    class="fs-4 fw-semibold text-info pb-1 px-2"
                                    >Goal</span
                                  >
                                  <span
                                    class="fs-4 fw-bold d-flex justify-content-center"
                                  >
                                    <!--                                    {{ campaignData.currency_code }}-->
                                    <span data-kt-countup="true">
                                      {{
                                        formatCurrencyAmount(campaignData.goal)
                                      }}</span
                                    ></span
                                  >
                                </div>
                              </div>
                              <!--end::Col-->
                              <!--begin::Col-->
                              <div class="col-4">
                                <div
                                  class="card card-dashed flex-center min-w-150px my-3 p-6"
                                >
                                  <span
                                    class="fs-4 fw-semibold text-success pb-1 px-2"
                                    >Amt Raised</span
                                  >
                                  <span
                                    class="fs-4 fw-bold d-flex justify-content-center"
                                  >
                                    <span data-kt-countup="true">
                                      {{
                                        formatCurrencyAmount(
                                          campaignData.donated
                                        )
                                      }}</span
                                    ></span
                                  >
                                </div>
                              </div>
                              <!--end::Col-->
                              <!--begin::Col-->
                              <div class="col-4">
                                <div
                                  class="card card-dashed flex-center min-w-150px my-3 p-6"
                                >
                                  <span
                                    class="fs-4 fw-semibold text-danger pb-1 px-2"
                                    >Amt Left</span
                                  >
                                  <span
                                    class="fs-4 fw-bold d-flex justify-content-center"
                                  >
                                    <span data-kt-countup="true">
                                      {{
                                        formatCurrencyAmount(
                                          campaignData.amount_to_goal
                                        )
                                      }}</span
                                    ></span
                                  >
                                </div>
                              </div>
                              <!--end::Col-->
                            </div>
                            <!--end::Stats-->
                          </div>
                          <!--end::Left Section-->

                          <div class="separator separator-dashed mb-5"></div>
                        </div>
                        <!--end::Body-->
                      </div>
                      <!--end::Earnings-->
                    </div>
                    <!--end::Col-->
                  </div>
                  <!--end::Row-->

                  <!--begin::Text-->
                  <el-image
                    :src="campaignData.image_url"
                    class="mb-15 w-auto"
                  />

                  <p class="fw-semibold fs-4 text-gray-600 mb-2">
                    {{ campaignData.description }}
                  </p>
                  <!--end::Text-->
                </div>
                <!--end::Description-->
              </div>
              <!--end::Job-->
            </div>
            <!--end::Content-->
            <!--begin::Sidebar-->
            <div class="flex-lg-row-auto w-100 w-lg-275px w-xxl-350px">
              <!--begin::Careers about-->
              <div class="card">
                <!--begin::Body-->
                <div class="card-bodys">
                  <!--begin::Progress-->

                  <div class="d-flex flex-column mb-10">
                    <div
                      class="d-flex justify-content-between w-100 fs-4 fw-bold mb-3"
                    >
                      <span>Amount Raised</span>
                      <span>
                        {{ formatCurrencyAmount(campaignData.donated) }}
                        of
                        {{ formatCurrencyAmount(campaignData.goal) }}
                      </span>
                    </div>
                    <div class="h-8px bg-light rounded mb-3">
                      <div
                        class="bg-success rounded h-8px"
                        role="progressbar"
                        style="width: 68%"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div class="fw-semibold text-gray-600">
                      {{ campaignData.donated }} Backers of this campaign
                    </div>
                  </div>
                  <!--end::Progress-->

                  <!--begin::Top-->
                  <div class="mb-7">
                    <!--begin::Title-->
                    <h2 class="fs-1 text-gray-800 w-bolder mb-6">
                      Make a donation
                    </h2>
                    <!--end::Title-->

                    <!--begin::Form-->
                    <PageLoader v-if="loadingPage"></PageLoader>
                    <div v-else class="cardS">
                      <div class="card-bodyS">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="separator separator-dashed mb-5"></div>

                            <VForm
                              id="kt_modal_create_api_key_form"
                              class="form"
                              @submit="submit"
                              :validation-schema="validationSchema"
                            >
                              <!--begin::Payment Method-->
                              <div class="d-flex flex-column mb-7 fv-row">
                                <!--begin::Label-->
                                <label
                                  class="required fs-6 fw-semobold form-label mb-2"
                                  >Payment Method</label
                                >
                                <!--end::Label-->

                                <!--begin::Row-->
                                <div class="row fv-row">
                                  <!--begin::Col-->
                                  <div class="col-12">
                                    <Field
                                      v-model="request.payee.account.code"
                                      name="paymentMethod"
                                      class="form-select form-select-solid"
                                      data-control="select2"
                                      data-hide-search="true"
                                      as="select"
                                    >
                                      <option></option>
                                      <option
                                        v-for="institution in form.debit_institutions"
                                        :key="institution.code"
                                        :value="institution.code"
                                      >
                                        {{ institution.name }}
                                      </option>
                                    </Field>
                                    <div class="fv-plugins-message-container">
                                      <div class="fv-help-block">
                                        <ErrorMessage name="paymentMethod" />
                                      </div>
                                    </div>
                                  </div>
                                  <!--end::Col-->
                                </div>
                                <!--end::Row-->
                              </div>
                              <!--begin::Payment Method-->

                              <!--begin::Phone Number-->
                              <div class="d-flex flex-column mb-7 fv-row">
                                <!--begin::Label-->
                                <label
                                  class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                                >
                                  <span class="required">Phone Number</span>
                                  <i
                                    class="fas fa-exclamation-circle ms-2 fs-7"
                                    data-bs-toggle="tooltip"
                                    title="Specify a card holder's name"
                                  ></i>
                                </label>
                                <!--end::Label-->

                                <Field
                                  type="text"
                                  class="form-control form-control-solid"
                                  placeholder=""
                                  name="phoneNumber"
                                  v-model="request.payee.account.number"
                                />
                                <div class="fv-plugins-message-container">
                                  <div class="fv-help-block">
                                    <ErrorMessage name="phoneNumber" />
                                  </div>
                                </div>
                              </div>
                              <!--end::Phone Number-->

                              <!--begin::Payment Amount-->
                              <div class="d-flex flex-column mb-7 fv-row">
                                <!--begin::Label-->
                                <label
                                  class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                                >
                                  <span class="required">Amount</span>
                                  <i
                                    class="fas fa-exclamation-circle ms-2 fs-7"
                                    data-bs-toggle="tooltip"
                                    title="Specify amount"
                                  ></i>
                                </label>
                                <!--end::Label-->

                                <Field
                                  type="number"
                                  class="form-control form-control-solid"
                                  placeholder=""
                                  name="paymentAmount"
                                  v-model="request.amount"
                                />
                                <div class="fv-plugins-message-container">
                                  <div class="fv-help-block">
                                    <ErrorMessage name="paymentAmount" />
                                  </div>
                                </div>
                              </div>
                              <!--begin::Payment Amount-->

                              <!--begin::Payment Email-->
                              <div class="d-flex flex-column mb-7 fv-row">
                                <!--begin::Label-->
                                <label
                                  class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                                >
                                  <span class="required">Email</span>
                                  <i
                                    class="fas fa-exclamation-circle ms-2 fs-7"
                                    data-bs-toggle="tooltip"
                                    title="Specify your email"
                                  ></i>
                                </label>
                                <!--end::Label-->

                                <Field
                                  type="text"
                                  class="form-control form-control-solid"
                                  placeholder=""
                                  name="paymentEmail"
                                  v-model="request.payee.email"
                                />
                                <div class="fv-plugins-message-container">
                                  <div class="fv-help-block">
                                    <ErrorMessage name="paymentEmail" />
                                  </div>
                                </div>
                              </div>
                              <!--begin::Payment Email-->

                              <!--begin::Actions-->
                              <div class="text-center pt-5">
                                <button
                                  type="reset"
                                  id="kt_modal_new_card_cancel"
                                  class="btn btn-light me-3"
                                >
                                  Discard
                                </button>

                                <button
                                  ref="submitButtonRef"
                                  type="submit"
                                  id="kt_modal_new_card_submit"
                                  class="btn btn-success"
                                >
                                  <span class="indicator-label">
                                    Donate Now!
                                  </span>
                                  <span class="indicator-progress">
                                    Please wait...
                                    <span
                                      class="spinner-border spinner-border-sm align-middle ms-2"
                                    ></span>
                                  </span>
                                </button>
                              </div>
                              <!--end::Actions-->
                            </VForm>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!--end::Form-->
                  </div>
                  <!--end::Top-->
                </div>
                <!--end::Body-->
              </div>
              <!--end::Careers about-->
            </div>
            <!--end::Sidebar-->
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
import { useRoute, useRouter } from "vue-router";
import { useGuestPaymentStore } from "@/stores/guest/payment";

import PageLoader from "@/components/PageLoader.vue";
import Message from "vue-m-message";
import { Field, ErrorMessage, Form as VForm } from "vee-validate";
import { storeToRefs } from "pinia";
import { useGuestGeneralStore } from "@/stores/guest/general";
import DataLoader from "@/components/DataLoader.vue";
import useOutputFormat from "@/composables/useOutputFormat";
import * as Yup from "yup";

export default defineComponent({
  name: "guest-donations",
  components: { DataLoader, PageLoader, Field, ErrorMessage, VForm },
  setup() {
    //theme
    const storeBody = useBodyStore();
    const storeTheme = useThemeStore();
    const themeMode = computed(() => {
      return storeTheme.mode;
    });
    const bgImage = themeMode.value !== "dark" ? "bg5.png" : "bg1-dark.jpg";

    //guest payment store
    const paymentStore = useGuestPaymentStore();
    const { loadingPaymentData, campaignData } = storeToRefs(paymentStore);
    const { getCampaign } = useGuestPaymentStore();

    //common store
    const generalStore = useGuestGeneralStore();

    const route = useRoute();

    const loadingPage = ref(true);

    const loading = ref(false);

    const form = ref({
      step: "input",
      debit_institutions: [] as any,
    });

    const request = ref({
      collection_type: "campaign" as any,
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

    const instantiateForm = () => {
      request.value.collection_reference = route.params.reference;
      request.value.collection_type = "campaign";
      getInstitutions(); // Not async, so will run in background :)
    };

    const getInstitutions = () => {
      generalStore.getInstitutions({ type_id: 3 }).then((response: any) => {
        //  form.value.debit_institutions = response;
        //TODO
        //   sort institutions to debit and credit institutions
        form.value.debit_institutions = response.filter(function (
          institution: any
        ) {
          return institution.type_id === "3"; // Get only mobile money institutions
        });
      });
    };

    const router = useRouter();

    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();

    const submitButtonRef = ref<null | HTMLButtonElement>(null);

    const validationSchema = Yup.object().shape({
      paymentMethod: Yup.string().required().label("Payment Method"),
      phoneNumber: Yup.string().required().label("Phone Number"),
      paymentAmount: Yup.number().required().label("Payment Amount"),
      paymentEmail: Yup.string().email().required().label("Email"),
    });

    const submit = () => {
      if (!submitButtonRef.value) {
        return;
      }

      //Disable button
      submitButtonRef.value.disabled = true;
      // Activate indicator
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");

      loading.value = true;
      paymentStore
        .validatePayment(request.value)
        .then(() => {
          router.push(
            "/donations/process/" + request.value.collection_reference
          );
          Message({
            message: "Payment submitted successfully, please confirm details.",
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
          } else {
            Message({
              message: "Error occured - please try again",
              position: "bottom-right",
              type: "error",
              duration: 5000,
              zIndex: 99999,
            });
          }

          submitButtonRef.value.disabled = false;

          submitButtonRef.value?.removeAttribute("data-kt-indicator");
        })
        .finally(() => (loading.value = false));
    };
    onMounted(() => {
      loadingPage.value = true;

      //theme
      LayoutService.emptyElementClassesAndAttributes(document.body);
      storeBody.addBodyClassname("bg-body");
      storeBody.addBodyAttribute({
        qualifiedName: "style",
        value: `background-image: url("/media/auth/${bgImage}")`,
      });

      //campaign
      getCampaign(route.params.reference);
      instantiateForm();

      loadingPage.value = false;
    });

    return {
      //page
      getIllustrationsPath,
      bgImage,
      loadingPage,

      instantiateForm,

      loading,
      form,
      request,

      //state
      loadingPaymentData,
      campaignData,

      //dates
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,

      //new
      validationSchema,
      submit,
      submitButtonRef,
    };
  },
});
</script>
