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
            <!--begin::Title-->
            <h1 class="fw-bolder text-gray-900 mb-5 text-center">
              Make A Payment
            </h1>

            <div class="separator separator-dashed"></div>
            <!--end::Title-->
          </div>
          <div class="w-lg-600px">
            <PageLoader v-if="loadingPage"></PageLoader>
            <div v-else class="col-md-12 mx-auto mt-5">
              <div class="card-body">
                <div class="row">
                  <!--begin::Form-->
                  <el-form
                    class="my-auto pb-5"
                    @submit.prevent="processPaymentAction()"
                    :model="request"
                    :rules="modalFormRules"
                    ref="formPaymentRef"
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
                          <a href="#" class="link-primary fw-bold">Help Page</a
                          >.
                        </div>
                        <!--end::Notice-->
                      </div>
                      <!--end::Heading-->

                      <!--begin::Input group-->
                      <div class="mb-10 fv-row">
                        <!--begin::Label-->
                        <label class="form-label mb-3">Payment Type</label>
                        <!--end::Label-->

                        <!--begin::Input-->
                        <div>
                          <Field
                            name="collection_type"
                            class="form-select form-select-solid select2-hidden-accessible"
                            as="select"
                            v-model="request.collection_type"
                            :disabled="loading"
                          >
                            <option value="">Select Payment Type</option>
                            <option
                              v-for="collection in collectionTypes"
                              :key="collection.collection_type"
                              :value="collection.collection_type"
                            >
                              {{ collection.name }}
                            </option>
                          </Field>
                          <ErrorMessage
                            class="fv-plugins-message-container invalid-feedback"
                            name="collection_type"
                          />
                        </div>

                        <!--end::Input-->
                      </div>

                      <div class="mb-10 fv-row">
                        <!--begin::Input group-->
                        <div class="d-flex flex-column mb-5 fv-row">
                          <!--begin::Label-->
                          <label
                            class="d-flex align-items-center fs-5 fw-semobold mb-2"
                          >
                            <span class="required">Reference Code</span>
                          </label>
                          <!--end::Label-->

                          <el-form-item
                            prop="collection_reference"
                            class="form-control form-control-lg form-control-solid"
                          >
                            <el-input
                              placeholder="Reference Code"
                              name="collection_reference"
                              v-model="request.collection_reference"
                            ></el-input>
                          </el-form-item>
                        </div>
                        <!--end::Input group-->
                      </div>

                      <!--end::Input group-->
                    </div>

                    <!--begin::Actions-->
                    <div class="row">
                      <div class="col-12 mb-3 text-right">
                        <button
                          class="btn btn-success"
                          type="submit"
                          :disabled="loading"
                          ref="submitButtonRef"
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
                          <span v-else
                            >Retrieve
                            {{ request.collection_type }} Details</span
                          >
                        </button>
                      </div>
                    </div>
                    <!--end::Actions-->
                  </el-form>
                  <!--end::Form-->
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
import { useRoute, useRouter } from "vue-router";
import { useGuestPaymentStore } from "@/stores/guest/payment";

import PageLoader from "@/components/PageLoader.vue";
import Message from "vue-m-message";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "blank-page",
  components: { PageLoader, Field, ErrorMessage },
  setup() {
    //page theme
    const storeBody = useBodyStore();
    const storeTheme = useThemeStore();
    const themeMode = computed(() => {
      return storeTheme.mode;
    });
    const bgImage = themeMode.value !== "dark" ? "bg5.png" : "bg1-dark.jpg";
    const loadingPage = ref(true);

    //pay
    const router = useRouter();
    const loading = ref(false);
    const submitButtonRef = ref<null | HTMLButtonElement>(null);

    const request = ref({
      collection_type: "invoice",
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

    const collectionTypes = ref([
      { id: 1, name: "Campaign", collection_type: "campaign" },
      { id: 2, name: "Invoice", collection_type: "invoice" },
    ]);

    const instantiateForm = () => {
      request.value.collection_reference = route.params.reference;
    };

    const formPaymentRef = ref<null | HTMLFormElement>(null);
    const paymentModalRef = ref<null | HTMLElement>(null);
    const modalFormRules = ref({
      collection_reference: [
        {
          required: true,
          message: "Collection reference is required",
          trigger: "change",
        },
      ],
    });

    //guest payment store
    const paymentStore = useGuestPaymentStore();

    const processPaymentAction = () => {
      if (!formPaymentRef.value) {
        return;
      }

      formPaymentRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;

          switch (request.value.collection_type) {
            case "campaign":
              paymentStore
                .getCampaign(request.value.collection_reference)
                .then((response: any) => {
                  if (response.status === "Error") {
                    Message({
                      message:
                        "Reference code incorrect, please confirm details.",
                      position: "bottom-right",
                      type: "error",
                      duration: 5000,
                      zIndex: 99999,
                    });
                  } else {
                    router.push(
                      "/donations/" + request.value.collection_reference
                    );
                  }
                })
                .catch((error) => {
                  const response = error.response;
                  Message({
                    message: response.error,
                    position: "bottom-right",
                    type: "error",
                    duration: 5000,
                    zIndex: 99999,
                  });
                })
                .finally(() => (loading.value = false));

              break;
            case "invoice":
              paymentStore
                .getInvoice(request.value.collection_reference)
                .then((response: any) => {
                  console.log(response);
                  if (response.status === "Success") {
                    router.push(
                      "/pay/invoice-details/" +
                        request.value.collection_reference
                    );
                  } else {
                    Message({
                      message:
                        "Reference code incorrect, please confirm details.",
                      position: "bottom-right",
                      type: "error",
                      duration: 5000,
                      zIndex: 99999,
                    });
                  }
                })
                .catch((error) => {
                  const response = error.response;
                  Message({
                    message: response.error,
                    position: "bottom-right",
                    type: "error",
                    duration: 5000,
                    zIndex: 99999,
                  });
                })
                .finally(() => (loading.value = false));

              break;
            default:
            //do nothing.
          }

          loading.value = false;
        } else {
          return false;
        }
      });
    };

    const route = useRoute();
    onMounted(() => {
      loadingPage.value = true;
      instantiateForm();
      loadingPage.value = false;
    });

    onMounted(() => {
      loadingPage.value = true;

      LayoutService.emptyElementClassesAndAttributes(document.body);

      storeBody.addBodyClassname("bg-body");
      storeBody.addBodyAttribute({
        qualifiedName: "style",
        value: `background-image: url("/media/auth/${bgImage}")`,
      });

      loadingPage.value = false;
    });
    return {
      //theme
      getIllustrationsPath,
      bgImage,
      loadingPage,

      //payment
      instantiateForm,
      loading,
      request,

      collectionTypes,
      submitButtonRef,

      formPaymentRef,
      paymentModalRef,
      modalFormRules,
      processPaymentAction,
    };
  },
});
</script>
