<template>
  <!--begin::Wrapper-->
  <div class="">
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
        <!--        <label class="form-label fs-6 fw-bold text-dark">Email</label>-->
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          tabindex="1"
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="email"
          autocomplete="off"
          placeholder="Email"
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
          <!--          <label class="form-label fw-bold text-dark fs-6 mb-0">Password</label>-->
          <!--end::Label-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          tabindex="2"
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
          placeholder="Password"
        />
        <!--end::Input-->

        <div
          class="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8 mt-5"
        >
          <div></div>
          <!--begin::Link-->
          <router-link to="/password-reset" class="link-primary fs-6 fw-bold">
            Forgot Password ?
          </router-link>
          <!--end::Link-->
        </div>
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
        <div class="separator separator-content my-14">
          <span class="w-125px text-gray-500 fw-semibold fs-7">Or</span>
        </div>
        <!--end::Separator-->

        <!--begin::Sign up-->

        <!--begin::Sign up-->

        <router-link
          to="/pay"
          class="btn btn-flex flex-center btn-light-primary btn-sm mb-5 me-5 fs-6"
        >
          Make Payment >>
        </router-link>

        <router-link
          to="/sign-up"
          class="btn btn-flex flex-center btn-light-info btn-sm mb-5 fs-6"
        >
          Sign Up >>
        </router-link>
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import LayoutService from "@/core/services/LayoutService";
import { useBodyStore } from "@/stores/body";
import { getIllustrationsPath } from "@/core/helpers/assets";
import { useThemeStore } from "@/stores/theme";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";

import { useAuthStore, type CoreUser } from "@/stores/auth";
import { useRouter } from "vue-router";

import * as Yup from "yup";

import { AlertService } from "@/services/AlertService";
export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const storeBody = useBodyStore();
    const storeTheme = useThemeStore();
    const themeMode = computed(() => {
      return storeTheme.mode;
    });
    const bgImage = themeMode.value !== "dark" ? "bg5.png" : "bg1-dark.jpg";

    //auth
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
        //display message using shared AlertService
        AlertService.displaySuccessAlert("You have successfully logged in!");

        //verify auth user
        await store.verifyAuth();

        // Go to page after successfully login
        router.push({ name: "dashboard" });
      } else {
        //display message using shared AlertService
        AlertService.displayErrorAlert(error[0]);
      }

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    onMounted(() => {
      LayoutService.emptyElementClassesAndAttributes(document.body);

      storeBody.addBodyClassname("bg-body");
      storeBody.addBodyAttribute({
        qualifiedName: "style",
        value: `background-image: url("/media/auth/${bgImage}")`,
      });
    });

    return {
      //body
      getIllustrationsPath,
      bgImage,

      //auth
      onSubmitLogin,
      login,
      submitButton,
    };
  },
});
</script>
