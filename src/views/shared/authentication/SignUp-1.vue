<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10">
    <PageLoader v-if="processing"></PageLoader>
    <div v-else class="col-md-12 mx-auto mt-5">
      {{ form }}
      <h5>{{ step }}</h5>

      <div
        v-if="step === 'Step 1 of 4 - How will you categorise yourself?'"
        class="statbox panel box-box-shadow"
      >
        <div class="panel-body">
          <el-radio-group class="mt-3 m-0" v-model="form.customer_type_id">
            <div class="mb-10 fv-row">
              <el-radio
                v-for="customer_type in customer_types"
                class="radio-classic radio-warning mb-3 col-12 mb-8"
                :value="customer_type.id"
                :key="customer_type.id"
                :label="customer_type.id"
              >
                <h6 class="mb-0">{{ customer_type.name }}</h6>
                <small id="sh-text1" class="form-text text-muted">{{
                  customer_type.description
                }}</small>
              </el-radio>
            </div>
          </el-radio-group>
        </div>
        <div class="panel-footer p-3 text-center">
          <button
            @click="processStepAction('Next', 2)"
            class="btn btn-sm btn-success"
            :disabled="!form.customer_type_id"
          >
            Step 2 - Choose Account Type
          </button>
        </div>
      </div>
      <div
        v-else-if="
          step === 'Step 2 of 4 - Which account type will better suit you?'
        "
        class="statbox panel box-box-shadow"
      >
        <template v-for="account_type in account_types" :key="account_type.id">
          <div class="d-flex fv-row">
            <!--begin::Radio-->
            <div class="form-check form-check-custom form-check-solid">
              <!--begin::Input-->
              <input
                class="form-check-input me-3"
                name="user_role"
                type="radio"
                v-model="form.account_type_id"
                :value="account_type.id"
                :key="account_type.id"
                :label="account_type.id"
              />
              <!--end::Input-->
              <!--begin::Label-->
              <label
                class="form-check-label"
                for="kt_modal_update_role_option_0"
              >
                <div class="fw-bold text-gray-800">
                  {{ account_type.name }}
                </div>
                <div class="text-gray-600">
                  {{ account_type.description }}
                </div>
              </label>
              <!--end::Label-->
            </div>
            <!--end::Radio-->
          </div>
          <!--end::Input row-->
          <div class="separator separator-dashed my-5"></div>
        </template>

        <!--        <div class="panel-body">-->
        <!--          <el-radio-group class="mt-3 m-0" v-model="form.account_type_id">-->
        <!--            <el-radio-->
        <!--              v-for="account_type in account_types"-->
        <!--              class="radio-classic radio-warning mb-3 m-10"-->
        <!--              :value="account_type.id"-->
        <!--              :key="account_type.id"-->
        <!--              :label="account_type.id"-->
        <!--            >-->
        <!--              <h6 class="mb-0">{{ account_type.name }}</h6>-->
        <!--              <small id="sh-text1" class="form-text text-muted text-wrap">{{-->
        <!--                account_type.description-->
        <!--              }}</small>-->
        <!--            </el-radio>-->
        <!--          </el-radio-group>-->
        <!--        </div>-->
        <div class="panel-footer p-3 text-center">
          <button
            @click="processStepAction('Previous', 1)"
            class="btn btn-sm btn-warning mr-2 me-10"
          >
            Back to Step 1 - Choose Customer Type
          </button>
          <button
            @click="processStepAction('Next', 3)"
            class="btn btn-sm btn-success"
            :disabled="!form.account_type_id"
          >
            Step 3 - Your Details
          </button>
        </div>
      </div>
      <div
        v-else-if="step === 'Step 3 of 4 - Lets get to know you better.'"
        class="statbox panel box-box-shadow"
      >
        <!--        model-value="Identity & Profile"-->
        <div class="card-body pt-0">
          <el-tabs
            v-model="active_tab"
            pills
            vertical
            class="mb-4 mt-3 demo-tabs"
            nav-wrapper-class="col-sm-4 col-12"
            nav-class="mb-sm-0 mb-3   text-center mx-auto"
            @tab-click="handleClick"
            tab-position="left"
          >
            <el-tab-pane
              v-for="(group, key) in kyc"
              :title="key"
              :key="key"
              title-link-class="mb-3 text-right"
              :label="key"
              :name="key"
            >
              <h5 class="mb-4">{{ key }}</h5>
              <form>
                <div
                  v-for="requirement in group"
                  :key="requirement.id"
                  :id="'requirement-group-' + requirement.id"
                  :label="requirement.name"
                  :label-for="'requirement-' + requirement.id"
                  class="mt-2"
                >
                  <h6>{{ requirement.name }}</h6>
                  <el-select
                    v-if="requirement.form_type === 'select'"
                    v-model="form.kyc_details[requirement.form_name]"
                  >
                    <el-option
                      v-for="item in requirement.options"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value"
                    />
                  </el-select>
                  <input
                    v-else-if="requirement.form_type === 'file'"
                    placeholder="Choose a file or drop it here..."
                    class="mb-4"
                    :ref="requirement.form_name"
                    :id="requirement.form_name"
                    type="file"
                    @change="handleFileUpload($event)"
                  />
                  <el-input
                    v-else
                    :id="'requirement-' + requirement.id"
                    v-model="form.kyc_details[requirement.form_name]"
                  ></el-input>
                  <div v-if="requirement?.detail?.file?.file_name">
                    <a
                      v-if="
                        requirement.form_type === 'file' &&
                        requirement.detail !== null &&
                        requirement.detail.file !== null
                      "
                      target="_blank"
                      :href="
                        'https://sppay.dev/uploads/files/kyc_detail_files/' +
                        requirement.detail.file.file_name
                      "
                    >
                      <small
                        style="color: black"
                        :id="requirement.form_name + '_help'"
                        class="form-text text-muted mt-0"
                        >Current File:
                        {{ requirement.detail.file.original_name }}</small
                      >
                    </a>
                  </div>
                </div>
              </form>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="panel-footer p-3 text-center">
          <button
            @click="processStepAction('Previous', 2)"
            class="btn btn-sm btn-warning mr-2 me-10"
          >
            Back to Step 2 - Choose Account Type
          </button>
          <button
            @click="processStepAction('Next', 4)"
            class="btn btn-sm btn-success"
            :disabled="!form.customer_type_id"
          >
            Step 4 - Enter Your iUser Details
          </button>
        </div>
      </div>
      <div
        v-else-if="step === 'Step 4 of 4 - Almost there!'"
        class="statbox panel box-box-shadow"
      >
        <div class="panel-body">
          <div class="row">
            <div class="col-md-6">
              <el-input
                id="'first_name"
                v-model="form.user.first_name"
                placeholder="Your First Name"
              ></el-input>
            </div>
            <div class="col-md-6">
              <el-input
                id="last_name"
                v-model="form.user.last_name"
                placeholder="Your Last Name"
              ></el-input>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-6">
              <!--              <el-input-->
              <!--                id="email"-->
              <!--                v-model="form.user.email"-->
              <!--                placeholder="Your e-mail"-->
              <!--                type="email"-->
              <!--                :value="-->
              <!--                  form.customer_type_id === '1' || form.customer_type_id === 1-->
              <!--                    ? form.kyc_details.email-->
              <!--                    : ''-->
              <!--                "-->
              <!--              ></el-input>-->

              <el-input
                id="email"
                v-model="form.user.email"
                placeholder="Your e-mail"
                type="email"
              ></el-input>
            </div>
            <div class="col-md-6">
              <el-input
                id="password"
                v-model="form.user.password"
                placeholder="Your Password"
                type="password"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="panel-footer p-3 text-center">
          <button
            @click="processStepAction('Previous', 3)"
            class="btn btn-sm btn-warning mr-2 me-10"
          >
            Back to Step 3 - Your Details
          </button>
          <button
            @click="registerCustomer()"
            class="btn btn-sm btn-success"
            :disabled="!form.customer_type_id"
          >
            Sign Up!
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import * as Yup from "yup";
import { useRouter } from "vue-router";
import PageLoader from "@/components/PageLoader.vue";
import { useGuestOnboardingStore } from "@/stores/guest/onboarding";
import type { TabsPaneContext } from "element-plus";
import Message from "vue-m-message";

export default defineComponent({
  name: "sign-up",
  components: { PageLoader },
  setup() {
    const router = useRouter();
    const submitButton = ref<HTMLButtonElement | null>(null);

    const registration = Yup.object().shape({
      first_name: Yup.string().required().label("Name"),
      last_name: Yup.string().required().label("Surname"),
      email: Yup.string().min(4).required().email().label("Email"),
      password: Yup.string().required().label("Password"),
      password_confirmation: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .label("Password Confirmation"),
    });

    const active_tab = ref(0);
    const kyc = ref({} as any);
    const customer_types = ref([] as any);
    const account_types = ref([] as any);
    const step = ref("Step 1 of 4 - How will you categorise yourself?");
    const processing = ref(true);
    const form = ref({
      customer_type_id: "",
      account_type_id: "",
      kyc_details: {
        country: "",
        name: "",
        phone: "",
        email: "",
      },
      user: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
      device_name: navigator.userAgent,
    });

    const processStepAction = async (action, formStep) => {
      processing.value = true;
      if (action === "Next") {
        // Progress to next step
        switch (formStep) {
          case 2:
            await getAccountTypes();
            step.value =
              "Step 2 of 4 - Which account type will better suit you?";
            break;
          case 3:
            await getKycRequirements();
            step.value = "Step 3 of 4 - Lets get to know you better.";
            break;
          case 4:
            step.value = "Step 4 of 4 - Almost there!";
            processing.value = false;
            break;
        }
      } else {
        // Return to previous step
        switch (formStep) {
          case 1:
            step.value = "Step 1 of 4 - How will you categorise yourself?";
            processing.value = false;
            break;
          case 2:
            step.value =
              "Step 2 of 4 - Which account type will better suit you?";
            processing.value = false;
            break;
          case 3:
            step.value = "Step 3 of 4 - Lets get to know you better.";
            processing.value = false;
            break;
        }
      }
    };
    //account

    const onboardingStore = useGuestOnboardingStore();

    const getCustomerTypes = () => {
      onboardingStore
        .getCustomerType()

        .then((response) => {
          customer_types.value = response;
        })
        .catch((error) => {
          if (error.response.status === 403) {
            // unauthorized.
            //  data.value.unauthorized = true;
          }
        })
        .finally(() => {
          processing.value = false;
        });
    };

    const getAccountTypes = () => {
      onboardingStore
        .getAccountType({
          customer_type_id: form.value.customer_type_id,
        })

        .then((response) => {
          account_types.value = response;
        })
        .finally(() => {
          processing.value = false;
        });
    };

    const getKycRequirements = () => {
      onboardingStore
        .getKYCRequirements({
          customer_type_id: form.value.customer_type_id,
          account_type_id: form.value.account_type_id,
        })

        .then((response) => {
          kyc.value = response;
          for (const key in kyc.value) {
            kyc.value[key].forEach((requirement) => {
              if (requirement.form_type === "file") {
                form.value.kyc_details[requirement.form_name] = null;
              } else {
                form.value.kyc_details[requirement.form_name] =
                  requirement.detail ? requirement.detail.value : null;
              }
            });
          }
        })
        .finally(() => {
          processing.value = false;
        });
    };

    const registerCustomer = () => {
      processing.value = true;
      form.value.kyc_details.email = form.value.user.email;

      let formData = new FormData();

      //append account & customer types
      formData.append("device_name", form.value.device_name);
      formData.append("customer_type_id", form.value.account_type_id);
      formData.append("account_type_id", form.value.account_type_id);

      //append kyc details
      for (let key in form.value.kyc_details) {
        if (form.value.kyc_details[key] != null) {
          formData.append(`kyc_details[${key}]`, form.value.kyc_details[key]);
        }
      }
      //append user details
      for (let key in form.value.user) {
        if (form.value.user[key] != null) {
          formData.append(`user[${key}]`, form.value.user[key]);
        }
      }

      onboardingStore
        .registerCustomer(formData)

        .then(() => {
          Message({
            message: "Registration successful! Welcome to SP Pay.",
            position: "bottom-right",
            type: "success",
            duration: 5000,
            zIndex: 99999,
          });

          router.push({ name: "dashboard" });
        })
        .catch((error) => {
          // get errors from state
          let response = error.response.data;

          if (response.errors) {
            let errors = response.errors;
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
        .finally(() => {
          processing.value = false;
        });
    };
    const handleClick = (tab: TabsPaneContext) => {
      console.log(tab);
      //  initiateSection(Number(tab.index));
    };

    const handleFileUpload = (event) => {
      form.value.kyc_details[event.target.id] = event.target.files[0];
    };

    onMounted(() => {
      getCustomerTypes();
    });
    return {
      registration,
      submitButton,

      ///
      active_tab,
      kyc,
      customer_types,
      account_types,
      step,
      processing,
      form,

      processStepAction,

      getCustomerTypes,

      getAccountTypes,

      getKycRequirements,

      registerCustomer,
      handleClick,
      handleFileUpload,
    };
  },
});
</script>
