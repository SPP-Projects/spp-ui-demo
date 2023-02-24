<template>
  <!--begin::Initiate Forgot Password-->
  <div class="w-lg-500px p-10" v-if="stepper === 'initiate'">
    <VForm
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      @submit="initiateForgotPassword"
      id="kt_login_password_reset_form"
      :validation-schema="forgotPasswordSchema"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Forgot Password ?</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          Enter your email to reset your password.
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <label class="form-label fw-bold text-gray-900 fs-6">Email</label>
        <Field
          class="form-control form-control-solid"
          type="email"
          placeholder=""
          name="email"
          autocomplete="off"
          v-model="passwordResetForm.email"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          type="submit"
          ref="submitButton"
          id="kt_password_reset_submit"
          class="btn btn-lg btn-primary fw-bold me-4"
        >
          <span class="indicator-label"> Submit </span>
          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>

        <router-link to="/" class="btn btn-lg btn-light-primary fw-bold"
          >Cancel</router-link
        >
      </div>
      <!--end::Actions-->
    </VForm>
  </div>
  <!--end::Initiate Forgot Password-->

  <!--begin::Validate Reset Code-->
  <div class="w-lg-500px p-10" v-if="stepper === 'validate'">
    <!--begin::Form-->
    <VForm
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      @submit="validateResetCode"
      id="kt_reset_code_form"
      :validation-schema="otpSchema"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Password Reset Code Verification</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          Enter the reset verification code we sent to your email address.
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::OTP-->
      <div class="fv-row mb-10">
        <label class="form-label fw-bold text-gray-900 fs-6"
          >Code Verification</label
        >
        <Field
          class="form-control form-control-solid"
          type="text"
          placeholder=""
          name="reset_code"
          autocomplete="off"
          v-model="passwordResetForm.reset_code"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="reset_code" />
          </div>
        </div>
      </div>
      <!--end::OTP-->

      <!--begin::Email-->
      <div class="fv-row mb-10">
        <Field
          class="form-control form-control-solid"
          type="hidden"
          placeholder=""
          name="email"
          autocomplete="off"
          v-model="passwordResetForm.email"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Email-->

      <!--begin::Actions-->
      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          type="submit"
          ref="validateResetCodeButton"
          id="kt_code_reset_submit"
          class="btn btn-lg btn-primary fw-bold me-4"
        >
          <span class="indicator-label"> Validate Code </span>
          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>

        <router-link to="/" class="btn btn-lg btn-light-primary fw-bold"
          >Cancel</router-link
        >
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
    <hr />
    <!--begin::Notice-->
    <div class="text-center fw-semibold fs-5">
      <span class="text-muted me-1">Didn’t get the code ?</span>
      <a href="/password-reset" class="link-primary fs-5 me-1">Resend</a>
    </div>
    <!--end::Notice-->
  </div>
  <!--end::Validate Reset Code-->

  <!--begin::Reset Password-->
  <div class="w-lg-500px p-10" v-if="stepper === 'reset'">
    <!--begin::Form-->
    <VForm
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      novalidate
      @submit="resetPassword"
      id="kt_login_signup_form"
      :validation-schema="resetPasswordSchema"
    >
      <!--begin::Heading-->
      <div class="mb-10 text-center">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Reset Password</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          Remember your password?

          <router-link to="/sign-in" class="link-primary fw-bold">
            Sign in here
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--end::Heading-->

      <!--begin::Separator-->
      <div class="d-flex align-items-center mb-10">
        <div class="border-bottom border-gray-300 mw-50 w-100"></div>
        <span class="fw-semobold text-gray-400 fs-7 mx-2">OR</span>
        <div class="border-bottom border-gray-300 mw-50 w-100"></div>
      </div>
      <!--end::Separator-->

      <!--begin::Input group-->
      <div class="fv-row mb-7">
        <Field
          class="form-control form-control-lg form-control-solid"
          type="hidden"
          placeholder=""
          name="reset_code"
          autocomplete="off"
          v-model="passwordResetForm.reset_code"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="reset_code" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-7">
        <label class="form-label fw-bold text-dark fs-6">Email</label>
        <Field
          class="form-control form-control-lg form-control-solid"
          type="email"
          placeholder=""
          name="email"
          autocomplete="off"
          v-model="passwordResetForm.email"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="mb-10 fv-row" data-kt-password-meter="true">
        <!--begin::Wrapper-->
        <div class="mb-1">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6"> Password </label>
          <!--end::Label-->

          <!--begin::Input wrapper-->
          <div class="position-relative mb-3">
            <Field
              class="form-control form-control-lg form-control-solid"
              type="password"
              placeholder=""
              name="new_password"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="new_password" />
              </div>
            </div>
          </div>
          <!--end::Input wrapper-->
          <!--begin::Meter-->
          <div
            class="d-flex align-items-center mb-3"
            data-kt-password-meter-control="highlight"
          >
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"
            ></div>
          </div>
          <!--end::Meter-->
        </div>
        <!--end::Wrapper-->
        <!--begin::Hint-->
        <div class="text-muted">
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
        <!--end::Hint-->
      </div>
      <!--end::Input group--->

      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bold text-dark fs-6"
          >Confirm Password</label
        >
        <Field
          class="form-control form-control-lg form-control-solid"
          type="password"
          placeholder=""
          name="new_password_confirmation"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="new_password_confirmation" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <button
          id="kt_sign_up_submit"
          ref="resetPasswordButton"
          type="submit"
          class="btn btn-lg btn-primary"
        >
          <span class="indicator-label"> Change Password </span>
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
    <!--end::Form-->
  </div>
  <!--end::Reset Password-->

  <!--begin::Success Sign In-->
  <div class="w-lg-500px p-10" v-if="stepper === 'success'">
    <!--begin::Heading-->
    <div class="mb-10 text-center">
      <!--begin::Title-->
      <h1 class="text-dark mb-3">Password Reset Successful</h1>
      <!--end::Title-->

      <!--begin::Link-->
      <div class="text-gray-400 fw-semobold fs-4">
        <div class="mb-10 text-center"></div>
        <router-link to="/sign-in" class="link-primary fw-bold">
          Sign in here
        </router-link>
      </div>
      <!--end::Link-->
    </div>
    <!--end::Heading-->
  </div>
  <!--end::Success Sign In-->
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import * as Yup from "yup";

import Message from "vue-m-message";
import { useRouter } from "vue-router";
import { useGuestOnboardingStore } from "@/stores/guest/onboarding";
import { PasswordMeterComponent } from "@/assets/ts/components";

export default defineComponent({
  name: "password-reset",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    //store
    const store = useAuthStore();
    const onboardingStore = useGuestOnboardingStore();

    //buttons
    const submitButton = ref<HTMLButtonElement | null>(null);
    const validateResetCodeButton = ref<HTMLButtonElement | null>(null);
    const resetPasswordButton = ref<HTMLButtonElement | null>(null);

    //validation
    const forgotPasswordSchema = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
    });
    const otpSchema = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
      reset_code: Yup.string().required().label("OTP"),
    });
    const resetPasswordSchema = Yup.object().shape({
      email: Yup.string().min(4).required().email().label("Email"),
      reset_code: Yup.string().required().label("Reset Code"),
      new_password: Yup.string().required().label("Password"),
      new_password_confirmation: Yup.string()
        .required()
        .oneOf([Yup.ref("new_password"), null], "Passwords must match")
        .label("Password Confirmation"),
    });

    //ref
    const passwordResetForm = ref({
      email: "test@sppaysolutions.com",
      reset_code: "26745",
      new_password: "Test",
      new_password_confirmation: "Test",
    });
    const loading = ref(true);
    const stepper = ref("initiate"); // initiate, validate, reset

    //methods
    const initiateForgotPassword = async (values: any) => {
      values = values as string;

      // eslint-disable-next-line
      submitButton.value!.disabled = true;
      // Activate loading indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");
      console.log(values);
      await onboardingStore
        .initiateForgotPassword(values)

        .then(({ data }) => {
          if (data.type === "Success") {
            Message({
              message: data.message,
              position: "bottom-right",
              type: "success",
              duration: 5000,
              zIndex: 99999,
            });
            stepper.value = "validate";
          } else {
            Message({
              message: "An error occurred - please try again",
              position: "bottom-right",
              type: "error",
              duration: 5000,
              zIndex: 99999,
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            // unauthorized.
            //  data.value.unauthorized = true;
          }
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
          loading.value = false;
        });

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
        submitButton.value!.disabled = false;
    };
    const validateResetCode = async (values: any) => {
      values = values as string;

      // eslint-disable-next-line
      validateResetCodeButton.value!.disabled = true;
      // Activate loading indicator
      validateResetCodeButton.value?.setAttribute("data-kt-indicator", "on");
      console.log(values);
      await onboardingStore
        .validateResetCode(values)

        .then(({ data }) => {
          if (data.type === "Success") {
            Message({
              message: data.message,
              position: "bottom-right",
              type: "success",
              duration: 5000,
              zIndex: 99999,
            });
            stepper.value = "reset";
          } else {
            Message({
              message: "An error occurred - please try again",
              position: "bottom-right",
              type: "error",
              duration: 5000,
              zIndex: 99999,
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            // unauthorized.
            //  data.value.unauthorized = true;
          }
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
          } else if (response.message) {
            Message({
              message: response.message,
              position: "bottom-right",
              type: "error",
              duration: 5000,
              zIndex: 99999,
            });
          }
        })
        .finally(() => {
          loading.value = false;
        });

      validateResetCodeButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      validateResetCodeButton.value!.disabled = false;
    };
    const resetPassword = async (values: any) => {
      values = values as string;

      // eslint-disable-next-line
      resetPasswordButton.value!.disabled = true;
      // Activate loading indicator
      resetPasswordButton.value?.setAttribute("data-kt-indicator", "on");
      console.log(values);
      await onboardingStore
        .resetPassword(values)

        .then(({ data }) => {
          console.log(data);

          if (data.type === "Success") {
            store.logout();

            stepper.value = "success";

            Message({
              message: data.message,
              position: "bottom-right",
              type: "success",
              duration: 5000,
              zIndex: 99999,
            });
          } else {
            Message({
              message: "An error occurred - please try again",
              position: "bottom-right",
              type: "error",
              duration: 5000,
              zIndex: 99999,
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            // unauthorized.
            //  data.value.unauthorized = true;
          }
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
          } else if (response.message) {
            Message({
              message: response.message,
              position: "bottom-right",
              type: "error",
              duration: 5000,
              zIndex: 99999,
            });
          } else {
            Message({
              message: error,
              position: "bottom-right",
              type: "error",
              duration: 5000,
              zIndex: 99999,
            });
          }
        })
        .finally(() => {
          loading.value = false;
        });

      resetPasswordButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      resetPasswordButton.value!.disabled = false;
    };

    onMounted(() => {
      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      });
    });

    return {
      stepper,
      initiateForgotPassword,
      validateResetCode,
      forgotPasswordSchema,
      resetPasswordSchema,
      otpSchema,
      submitButton,
      validateResetCodeButton,
      passwordResetForm,
      resetPasswordButton,
      resetPassword,
    };
  },
});
</script>
