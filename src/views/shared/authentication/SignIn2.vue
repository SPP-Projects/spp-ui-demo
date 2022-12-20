<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10">
    <!--begin::Form-->
    <VForm
      class="form w-100"
      id="kt_login_signin_form"
      @submit="onSubmitLogin"
      :validation-schema="login"
      :initial-values="{ email: 'admin@demo.com', password: 'demo' }"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Sign In</h1>
        <!--end::Title-->
      </div>
      <!--begin::Heading-->

      <div class="mb-10 bg-light-info p-8 rounded">
        <div class="text-info">
          Username: <strong>test@sppaysolutions.com</strong> <br />Password:
          <strong>T3st2021$</strong>
        </div>
      </div>

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bold text-dark">Email</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          tabindex="1"
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="email"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6 mb-0">Password</label>
          <!--end::Label-->

          <!--begin::Link-->
          <router-link to="/password-reset" class="link-primary fs-6 fw-bold">
            Forgot Password ?
          </router-link>
          <!--end::Link-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          tabindex="2"
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <!--end::Input group-->
      <!--begin::Input-->
      <Field
        tabindex="2"
        class="form-control form-control-lg form-control-solid"
        type="hidden"
        name="device_name"
        value="sppay"
      />
      <!--end::Input-->
      <!--begin::Actions-->
      <div class="text-center">
        <!--begin::Submit button-->
        <button
          tabindex="3"
          type="submit"
          ref="submitButton"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-primary w-100 mb-5"
        >
          <span class="indicator-label"> Continue </span>

          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Submit button-->

        <!--begin::Separator-->
        <div class="text-center text-muted text-uppercase fw-bold mb-5">or</div>
        <!--end::Separator-->

        <!--begin::Sign up-->
        <hr />

        <!--begin::Sign up-->

        <!--begin::Google link-->
        <router-link
          to="/pay"
          class="btn btn-flex flex-center btn-light-primary btn-sm mb-5 me-5 fs-6"
        >
          Make Payment >>
        </router-link>
        <!--end::Google link-->

        <!--begin::Google link-->
        <router-link
          to="/sign-up"
          class="btn btn-flex flex-center btn-light-info btn-sm mb-5 fs-6"
        >
          Sign Up >>
        </router-link>
        <!--end::Google link-->
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type CoreUser } from "@/stores/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Message from "vue-m-message";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const login = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().min(4).required().label("Password"),
      device_name: Yup.string().min(4).required().label("device_name"),
    });

    //Form submit function
    const onSubmitLogin = async (values: any) => {
      values = values as CoreUser;
      // Clear existing errors
      store.logout();

      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Send login request
      await store.login(values);
      const error = Object.values(store.errors);

      if (error.length === 0) {
        Message({
          message: "You have successfully logged in!",
          position: "bottom-right",
          type: "success",
          duration: 5000,
          zIndex: 99999,
        });

        //TODO - MOVE TO CENTRAL PLACE
        //verify auth user
        await store.verifyAuth();

        // Go to page after successfully login
        router.push({ name: "dashboard" });
      } else {
        Message({
          message: error[0] as string,
          position: "bottom-right",
          type: "error",
          duration: 5000,
          zIndex: 99999,
        });
      }

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
        submitButton.value!.disabled = false;
    };

    return {
      onSubmitLogin,
      login,
      submitButton,
    };
  },
});
</script>
