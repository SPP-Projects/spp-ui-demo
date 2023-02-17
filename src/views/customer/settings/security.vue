<template>
  <!--begin::Change Password-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_signin_method"
    >
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Change Password</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_signin_method" class="collapse show">
      <!--begin::Card body-->
      <div class="card-body border-top p-9">
        <!--begin::Password-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div
            id="kt_signin_password"
            :class="{ 'd-none': passwordFormDisplay }"
          >
            <div class="fs-4 fw-bolder mb-1">Password</div>
            <div class="fs-6 fw-semobold text-gray-600">************</div>
          </div>
          <div
            id="kt_signin_password_edit"
            class="flex-row-fluid"
            :class="{ 'd-none': !passwordFormDisplay }"
          >
            <div class="fs-6 fw-semobold text-gray-600 mb-4">
              Password must be at least 8 character and contain symbols
            </div>

            <!--begin::Form-->
            <VForm
              id="kt_signin_change_password"
              class="form"
              novalidate
              @submit="updatePassword()"
              :validation-schema="changePassword"
            >
              <div class="row mb-6">
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="current_password"
                      class="form-label fs-6 fw-bold mb-3"
                      >Current Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="current_password"
                      id="current_password"
                      v-model="updatePasswordFormData.current_password"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="current_password" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="newpassword"
                      class="form-label fs-6 fw-bold mb-3"
                      >New Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="new_password"
                      id="new_password"
                      v-model="updatePasswordFormData.new_password"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="new_password" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="new_password_confirmation"
                      class="form-label fs-6 fw-bold mb-3"
                      >Confirm New Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="new_password_confirmation"
                      id="new_password_confirmation"
                      v-model="updatePasswordFormData.new_password_confirmation"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="new_password_confirmation" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  id="kt_password_submit"
                  type="submit"
                  ref="updatePasswordButton"
                  class="btn btn-primary me-2 px-6"
                >
                  <span class="indicator-label"> Update Password </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
                <button
                  id="kt_password_cancel"
                  type="button"
                  @click="passwordFormDisplay = !passwordFormDisplay"
                  class="btn btn-color-gray-400 btn-active-light-primary px-6"
                >
                  Cancel
                </button>
              </div>
            </VForm>
            <!--end::Form-->
          </div>
          <div
            id="kt_signin_password_button"
            class="ms-auto"
            :class="{ 'd-none': passwordFormDisplay }"
          >
            <button
              @click="passwordFormDisplay = !passwordFormDisplay"
              class="btn btn-light fw-bolder"
              :disabled="loadingAction"
            >
              Reset Password
            </button>
          </div>
        </div>
        <!--end::Password-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Change Email and Password-->

  <!--begin::Change Email-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_signin_method"
    >
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Change Email - Todo</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_signin_method" class="collapse show">
      <!--begin::Card body-->
      <div class="card-body border-top p-9">
        <!--begin::Email Address-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div id="kt_signin_email" :class="{ 'd-none': emailFormDisplay }">
            <div class="fs-4 fw-bolder mb-1">Email Address</div>
            <div class="fs-6 fw-semobold text-gray-600">
              support@sppaygh.com
            </div>
          </div>

          <div
            id="kt_signin_email_edit"
            :class="{ 'd-none': !emailFormDisplay }"
            class="flex-row-fluid"
          >
            <!--begin::Form-->
            <VForm
              id="kt_signin_change_email"
              class="form"
              novalidate
              @submit="updateEmail()"
              :validation-schema="changeEmail"
            >
              <div class="row mb-6">
                <div class="col-lg-6 mb-4 mb-lg-0">
                  <div class="fv-row mb-0">
                    <label
                      for="emailaddress"
                      class="form-label fs-6 fw-bold mb-3"
                      >Enter New Email Address</label
                    >
                    <Field
                      type="email"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      id="emailaddress"
                      placeholder="Email Address"
                      name="emailaddress"
                      value="support@sppaygh.com"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="emailaddress" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="fv-row mb-0">
                    <label
                      for="confirmemailpassword"
                      class="form-label fs-6 fw-bold mb-3"
                      >Confirm Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="confirmemailpassword"
                      id="confirmemailpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="confirmemailpassword" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  id="kt_signin_submit"
                  type="submit"
                  ref="updateEmailButton"
                  class="btn btn-primary me-2 px-6"
                >
                  <span class="indicator-label"> Change Email </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
                <button
                  id="kt_signin_cancel"
                  type="button"
                  class="btn btn-color-gray-400 btn-active-light-primary px-6"
                  @click="emailFormDisplay = !emailFormDisplay"
                >
                  Cancel
                </button>
              </div>
            </VForm>
            <!--end::Form-->
          </div>
          <div
            id="kt_signin_email_button"
            :class="{ 'd-none': emailFormDisplay }"
            class="ms-auto"
          >
            <button
              class="btn btn-light fw-bolder px-6"
              @click="emailFormDisplay = !emailFormDisplay"
            >
              Change Email
            </button>
          </div>
        </div>
        <!--end::Email Address-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Change Email-->

  <!--begin::Deactivate Account-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_deactivate"
      aria-expanded="true"
      aria-controls="kt_account_deactivate"
    >
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Deactivate Account - TODO</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_deactivate" class="collapse show">
      <!--begin::Form-->
      <form
        id="kt_account_deactivate_form"
        class="form"
        @submit.prevent="deactivateAccount()"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <div
            class="notice d-flex bg-light-warning rounded border-warning border border-dashed mb-9 p-6"
          >
            <span class="svg-icon svg-icon-2tx svg-icon-warning me-4">
              <inline-svg src="/media/icons/duotune/general/gen044.svg" />
            </span>
            <!--begin::Wrapper-->
            <div class="d-flex flex-stack flex-grow-1">
              <!--begin::Content-->
              <div class="fw-semobold">
                <h4 class="text-gray-800 fw-bold">
                  You Are Deactivating Your Account
                </h4>

                <div class="fs-6 text-gray-600">
                  For extra security, this requires you to confirm your email or
                  phone number when you reset yousignr password. <br /><a
                    class="fw-bold"
                    href="#"
                    >Learn more</a
                  >
                </div>
              </div>
              <!--end::Content-->
            </div>
            <!--end::Wrapper-->
          </div>

          <!--begin::Form input row-->
          <div class="form-check form-check-solid fv-row">
            <input
              name="deactivate"
              class="form-check-input"
              type="checkbox"
              value=""
              id="deactivate"
            />
            <label
              class="form-check-label fw-semobold ps-2 fs-6"
              for="deactivate"
              >Confirm Account Deactivation</label
            >
          </div>
          <!--end::Form input row-->
        </div>
        <!--end::Card body-->

        <!--begin::Card footer-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            id="kt_account_deactivate_account_submit"
            ref="deActivateAccountSubmitButton"
            type="submit"
            class="btn btn-danger fw-semobold"
          >
            <span class="indicator-label"> Deactivate Account </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Card footer-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Deactivate Account-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Message from "vue-m-message";

import { useCustomerKycStore } from "@/stores/customer/kyc";

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    //kyc store
    const kycStore = useCustomerKycStore();

    //refs
    const loadingAction = ref(false);
    const deActivateAccountSubmitButton = ref<HTMLElement | null>(null);
    const updateEmailButton = ref<HTMLElement | null>(null);
    const emailFormDisplay = ref(false);
    const changeEmail = Yup.object().shape({
      emailaddress: Yup.string().required().email().label("Email"),
      confirmemailpassword: Yup.string().required().label("Password"),
    });

    //password validation
    const updatePasswordButton = ref<HTMLElement | null>(null);
    const passwordFormDisplay = ref(false);
    const updatePasswordFormData = ref({
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    });
    const changePassword = Yup.object().shape({
      current_password: Yup.string().required().label("Current password"),
      new_password: Yup.string().min(4).required().label("Password"),
      new_password_confirmation: Yup.string()
        .min(4)
        .required()
        .oneOf([Yup.ref("new_password"), null], "Passwords must match")
        .label("Password Confirmation"),
    });

    const deactivateAccount = () => {
      if (deActivateAccountSubmitButton.value) {
        // Activate indicator
        deActivateAccountSubmitButton.value.setAttribute(
          "data-kt-indicator",
          "on"
        );

        setTimeout(() => {
          deActivateAccountSubmitButton.value?.removeAttribute(
            "data-kt-indicator"
          );

          Swal.fire({
            text: "Email is successfully changed!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          }).then(() => {
            emailFormDisplay.value = false;
          });
        }, 2000);
      }
    };

    const updateEmail = () => {
      if (updateEmailButton.value) {
        // Activate indicator
        updateEmailButton.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          updateEmailButton.value?.removeAttribute("data-kt-indicator");

          emailFormDisplay.value = false;
        }, 2000);
      }
    };

    const updatePassword = () => {
      if (updatePasswordButton.value) {
        // Activate indicator
        updatePasswordButton.value.setAttribute("data-kt-indicator", "on");

        console.log(updatePasswordFormData.value);

        loadingAction.value = true;

        kycStore
          .updatePassword(updatePasswordFormData.value)

          .then((response) => {
            console.log(response);
            updatePasswordButton.value?.removeAttribute("data-kt-indicator");
            // update loading status
            loadingAction.value = false;
            passwordFormDisplay.value = false;

            Message({
              message: "Password updated successfully.",
              position: "bottom-right",
              type: "success",
              duration: 5000,
              zIndex: 99999,
            });
          })
          .catch((error) => {
            // get errors from state
            let response = error.response.data;

            if (response.errors) {
              let errors = response.errors;
              for (const key in errors) {
                Message({
                  message: errors[key][0],
                  //TBC
                  position: "bottom-right",
                  type: "error",
                  duration: 5000,
                  zIndex: 99999,
                });
              }
            } else if (response.error) {
              Message({
                message: response.error,
                //TBC
                position: "bottom-right",
                type: "error",
                duration: 5000,
                zIndex: 99999,
              });
            } else {
              Message({
                message: error,
                //TBC
                position: "bottom-right",
                type: "error",
                duration: 5000,
                zIndex: 99999,
              });
            }

            // update loading status
            loadingAction.value = false;
          })
          .finally(() => {
            updatePasswordButton.value?.removeAttribute("data-kt-indicator");
          });

        // setTimeout(() => {
        //   updatePasswordButton.value?.removeAttribute("data-kt-indicator");
        //
        //   Swal.fire({
        //     text: "Password is successfully changed!",
        //     icon: "success",
        //     confirmButtonText: "Ok",
        //     buttonsStyling: false,
        //     heightAuto: false,
        //     customClass: {
        //       confirmButton: "btn btn-light-primary",
        //     },
        //   }).then(() => {
        //     passwordFormDisplay.value = false;
        //   });
        // }, 2000);
      }
    };

    return {
      deactivateAccount,
      emailFormDisplay,
      passwordFormDisplay,

      changeEmail,
      changePassword,
      updateEmailButton,
      updatePasswordButton,
      updateEmail,
      updatePassword,

      //
      updatePasswordFormData,
      loadingAction,
    };
  },
});
</script>
