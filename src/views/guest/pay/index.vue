<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body">
      <div class="row">
        <div class="col-md-12">
          <h4 v-if="form.step === 'input'" class="text-center">New Payment</h4>
          <hr />
        </div>
      </div>

      <!-- Payment -->
      <div class="row">
        <!--begin::Form-->
        <form class="my-auto pb-5">
          <!--begin::Step 2-->
          <div class="current" data-kt-stepper-element="content">
            <div class="w-100">
              <!--begin::Heading-->
              <div class="pb-10 pb-lg-15">
                <!--begin::Title-->
                <h2 class="fw-bold text-dark">Payment Info</h2>
                <!--end::Title-->

                <!--begin::Notice-->
                <div class="text-gray-400 fw-semobold fs-6">
                  If you need more info, please check out
                  <a href="#" class="link-primary fw-bold">Help Page</a>.
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
                <!--begin::Label-->
                <label class="form-label mb-3">Reference Code</label>
                <!--end::Label-->

                <!--begin::Input-->
                <input
                  type="text"
                  class="form-control form-control-lg form-control-solid"
                  v-model="request.collection_reference"
                  placeholder="Enter Payment Reference Code"
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
          <!--end::Step 2-->

          <!--begin::Actions-->

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
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
                <span v-else
                  >Retrieve {{ request.collection_type }} Details</span
                >
              </button>
            </div>
          </div>
          <!--end::Actions-->
        </form>
        <!--end::Form-->
      </div>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "guest-payment",
  components: { Field, ErrorMessage },
  setup() {
    const router = useRouter();

    const loadingPage = ref(true);
    const loadingData = ref(false);
    const loading = ref(false);
    const form = ref({
      step: "input",
      debit_institutions: [],
    });
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
    const validated = ref({});

    const confirmed = ref({});

    const instantiateForm = () => {
      request.value.collection_reference = route.params.reference;
    };

    // Validate Payment
    const validatePayment = () => {
      loading.value = true;

      switch (request.value.collection_type) {
        case "campaign":
          router.push(
            "/pay/payment/" +
              request.value.collection_reference +
              "/" +
              request.value.collection_type
          );
          break;
        case "invoice":
          router.push(
            "/pay/invoice-details/" + request.value.collection_reference
          );
          break;
        default:
        //do nothing.
      }

      loading.value = false;
    };

    const route = useRoute();
    onMounted(() => {
      loadingPage.value = true;
      instantiateForm();
      loadingPage.value = false;
    });

    return {
      validatePayment,
      instantiateForm,
      loadingPage,
      loadingData,
      loading,
      form,
      request,
      validated,
      confirmed,
      collectionTypes,
    };
  },
});
</script>
