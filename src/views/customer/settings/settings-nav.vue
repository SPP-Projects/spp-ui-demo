<template>
  <div class="card mb-5 mb-xl-10">
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->
      <div
        class="d-flex flex-wrap flex-sm-nowrap mb-3"
        v-if="authenticatedUserDetails"
      >
        <!--begin::Info-->
        <div class="flex-grow-1">
          <!--begin::Title-->
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <!--begin::Customer-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
              <div class="d-flex align-items-center mb-2">
                <span
                  class="text-gray-800 text-hover-primary fs-2 fw-bold me-1"
                  >{{ authenticatedUserDetails.name }}</span
                >
              </div>
              <!--end::Name-->
            </div>
            <!--end::Customer-->
          </div>
          <!--end::Title-->
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->

      <!--begin::Navs-->
      <div class="d-flex overflow-auto h-55px">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold flex-nowrap"
        >
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/settings/overview"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Overview
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/settings/permissions"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Permissions
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/settings/security"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Security
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/settings/kyc"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              KYC & Compliance
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/settings/team"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Team/Users
            </router-link>
          </li>
          <!--end::Nav item-->
        </ul>
      </div>
      <!--begin::Navs-->
    </div>
  </div>

  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCustomerUserStore } from "@/stores/customer/user";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "settings-nav",
  components: {},
  setup() {
    //store
    const userStore = useCustomerUserStore();
    const { loadingUserData, authenticatedUserDetails } =
      storeToRefs(userStore);

    return {
      authenticatedUserDetails,
      loadingUserData,
    };
  },
});
</script>
