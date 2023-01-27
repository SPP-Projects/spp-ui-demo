<template>
  <!--begin::Navbar-->
  <div class="app-navbar flex-shrink-0">
    <!--begin::Search-->
    <div class="app-navbar-item align-items-stretch ms-1 ms-lg-3"></div>
    <!--end::Search-->
    <!--begin::Activities-->
    <div class="app-navbar-item ms-1 ms-lg-3">
      <!--begin::Drawer toggle-->

      <!--end::Drawer toggle-->
    </div>
    <!--end::Activities-->
    <!--begin::Notifications-->
    <div class="app-navbar-item ms-1 ms-lg-3">
      <!--begin::Menu- wrapper-->

      <!--end::Menu wrapper-->
    </div>
    <!--end::Notifications-->
    <!--begin::Chat-->
    <div class="app-navbar-item ms-1 ms-lg-3">
      <!--begin::Menu wrapper-->

      <!--end::Menu wrapper-->
    </div>
    <!--end::Chat-->
    <!--begin::Quick links-->
    <div class="app-navbar-item ms-1 ms-lg-3">
      <!--begin::Menu wrapper-->
      <!--end::Menu wrapper-->
    </div>
    <!--end::Quick links-->

    <!--begin::Switch Customer TYpe-->
    <div class="app-navbar-item ms-1 ms-lg-3">
      <!--begin::Menu wrapper-->
      <label
        class="form-check form-switch form-check-custom form-check-solid form-check-custom form-check-success"
      >
        <span class="form-check-label fw-semobold fs-2 text-danger me-5">
          <template v-if="currentUserMode">Administrator Mode</template>
          <template v-else>Normal User Mode</template></span
        >
        <input
          class="form-check-input"
          type="checkbox"
          value="1"
          v-model="currentUserMode"
          @change="switchUserMode()"
        />
      </label>
      <!--end::Menu wrapper-->
    </div>
    <!--begin::Switch Customer TYpe-->

    <!--begin::Theme mode-->
    <div class="app-navbar-item ms-1 ms-lg-3">
      <!--begin::Menu toggle-->
      <a
        href="#"
        class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
        data-kt-menu-trigger="{default:'click', lg: 'hover'}"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <span
          v-if="themeMode === 'light'"
          class="svg-icon theme-dark-hide svg-icon-2"
        >
          <inline-svg src="/media/icons/duotune/general/gen060.svg" />
        </span>
        <span v-else class="svg-icon theme-light-hide svg-icon-2">
          <inline-svg src="/media/icons/duotune/general/gen061.svg" />
        </span>
      </a>
      <!--begin::Menu toggle-->
      <KTThemeModeSwitcher />
    </div>
    <!--end::Theme mode-->
    <!--begin::Customer menu-->
    <div class="app-navbar-item ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
      <!--begin::Menu wrapper-->
      <div
        class="cursor-pointer symbol symbol-35px symbol-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <img src="/media/avatars/300-1.jpg" alt="user" />
      </div>
      <KTUserMenu />
      <!--end::Menu wrapper-->
    </div>
    <!--end::Customer menu-->
    <!--begin::Header menu toggle-->
    <div class="app-navbar-item d-lg-none ms-2 me-n3" title="Show header menu">
      <div
        class="btn btn-icon btn-active-color-primary w-35px h-35px"
        id="kt_app_header_menu_toggle"
      >
        <span class="svg-icon svg-icon-1">
          <inline-svg src="/media/icons/duotune/text/txt001.svg" />
        </span>
      </div>
    </div>
    <!--end::Header menu toggle-->
  </div>
  <!--end::Navbar-->
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";

import KTUserMenu from "@/layouts/main-layout/menus/UserAccountMenu.vue";
import KTThemeModeSwitcher from "@/layouts/main-layout/theme-mode/ThemeModeSwitcher.vue";
import { useThemeStore } from "@/stores/theme";

import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default defineComponent({
  name: "header-navbar",
  components: {
    KTUserMenu,
    KTThemeModeSwitcher,
  },
  setup() {
    const store = useThemeStore();
    const router = useRouter();
    const themeMode = computed(() => {
      return store.mode;
    });
    const currentUserMode = ref(false);
    const authStore = useAuthStore();
    const { isAdminMode } = storeToRefs(authStore);

    const switchUserMode = () => {
      const newUserMode = ref(false);

      Swal.fire({
        title: "Switch User Mode",
        icon: "warning",
        buttonsStyling: false,
        heightAuto: false,
        //   showCancelButton: true,

        showDenyButton: true,

        confirmButtonText: "Yes",
        denyButtonText: "No",

        cancelButtonText: "Cancel",

        customClass: {
          cancelButton: "btn btn-danger",
          confirmButton: "btn fw-semobold btn-light-primary",
          denyButton: "btn btn-danger",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("User Switched", "Continue", "success");

          newUserMode.value = !currentUserMode.value;
          authStore.setAdminMode(currentUserMode.value);

          // Go to dashboard
          //router.push({ name: "dashboard" });
          //TODO - fix bug with hidden menu inks

          window.location.href = "/";
        } else if (result.isDenied) {
          Swal.fire("Switching cancelled", "", "error");

          currentUserMode.value = !currentUserMode.value;
        } else {
          currentUserMode.value = !currentUserMode.value;
        }
      });
    };

    onMounted(() => {
      currentUserMode.value = authStore.getAdminMode();
    });
    return {
      themeMode,

      currentUserMode,
      isAdminMode,
      switchUserMode,
    };
  },
});
</script>
