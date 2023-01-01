<template>
  <!--begin::Navbar-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pb-0">
      <!--begin::Navs-->
      <div class="d-flex overflow-auto h-45px">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold flex-nowrap"
        >
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/admin/settings/kyc/general"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              General KYC Settings
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              class="nav-link text-active-primary me-6"
              to="/admin/settings/kyc/accounts"
              active-class="active"
            >
              Account Specific KYC Settings
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              class="nav-link text-active-primary me-6"
              to="/admin/settings/kyc/customers"
              active-class="active"
            >
              Customer Specific KYC Settings
            </router-link>
          </li>
          <!--end::Nav item-->
        </ul>
      </div>
      <!--begin::Navs-->
    </div>
  </div>
  <!--end::Navbar-->
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "admin-settings-kyc-navbar",
  components: {},
});
</script>
