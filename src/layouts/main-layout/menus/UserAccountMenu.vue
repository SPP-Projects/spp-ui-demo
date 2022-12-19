<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold py-4 fs-6 w-275px"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">
        <!--begin::Avatar-->

        <!--        TODO-->
        <div class="symbol symbol-50px me-5">
          <img alt="Logo" src="/media/avatars/300-1.jpg" />
        </div>
        <!--end::Avatar-->

        <!--begin::Username-->
        <div class="d-flex flex-column">
          <div class="fw-bold d-flex align-items-center fs-5">
            {{ authenticatedUser.name }}
            <span class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2"
              >TODO</span
            >
          </div>
          <a href="#" class="fw-semobold text-muted text-hover-primary fs-7">
            {{ authenticatedUser.email }}</a
          >
        </div>
        <!--end::Username-->
      </div>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->

    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <router-link to="/profile/overview" class="menu-link px-5">
        My Profile
      </router-link>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->

    <!--begin::Menu item-->
    <div class="menu-item px-5 my-1">
      <router-link to="/" class="menu-link px-5">
        Account Settings
      </router-link>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <a @click="signOut()" class="menu-link px-5"> Sign Out </a>
    </div>
    <!--end::Menu item-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "kt-user-menu",
  components: {},
  setup() {
    const router = useRouter();

    const store = useAuthStore();

    const { authenticatedUser } = storeToRefs(store);

    const signOut = () => {
      store.logout();
      router.push({ name: "sign-in" });
    };

    return {
      signOut,
      authenticatedUser,
    };
  },
});
</script>
