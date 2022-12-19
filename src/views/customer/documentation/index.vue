<template>
  <!--begin::Layout-->
  <PermissionDenied v-if="refData.unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />
  <div class="d-flex flex-column flex-xl-row">
    <!--begin::Content-->

    <div class="d-flex flex-column flex-md-row rounded border p-10">
      <!--begin:::Tabs-->
      <ul
        class="nav nav-custom nav-tabs nav-line-tabs-2x border-0 fs-4 fw-semobold mb-8 flex-column me-5 mb-3 mb-md-0 fs-6"
      >
        <!--begin:::Tab item-->
        <li class="nav-item w-md-200px me-0">
          <a
            class="nav-link text-active-primary pb-4 active"
            data-bs-toggle="tab"
            href="#kt_customer_view_introduction_tab"
            >Introduction</a
          >
        </li>

        <li class="nav-item w-md-200px me-0">
          <a
            class="nav-link text-active-primary pb-4"
            data-bs-toggle="tab"
            href="#kt_customer_view_overview_authentication_tab"
            >Authentication</a
          >
        </li>

        <li class="nav-item w-md-200px me-0">
          <a
            class="nav-link text-active-primary pb-4"
            data-kt-countup-tabs="true"
            data-bs-toggle="tab"
            href="#kt_customer_view_overview_users_permissions"
            >Users & Permissions</a
          >
        </li>

        <li class="nav-item w-md-200px me-0">
          <a
            class="nav-link text-active-primary pb-4"
            data-kt-countup-tabs="true"
            data-bs-toggle="tab"
            href="#kt_customer_view_overview_profile"
            >Profile</a
          >
        </li>

        <li class="nav-item w-md-200px me-0">
          <a
            class="nav-link text-active-primary pb-4"
            data-kt-countup-tabs="true"
            data-bs-toggle="tab"
            href="#kt_customer_view_overview_accounts"
            >Accounts</a
          >
        </li>

        <li class="nav-item w-md-200px me-0">
          <a
            class="nav-link text-active-primary pb-4"
            data-kt-countup-tabs="true"
            data-bs-toggle="tab"
            href="#kt_customer_view_overview_transactions"
            >Transactions</a
          >
        </li>

        <li class="nav-item w-md-200px me-0">
          <a
            class="nav-link text-active-primary pb-4"
            data-kt-countup-tabs="true"
            data-bs-toggle="tab"
            href="#kt_customer_view_overview_sms"
            >SMS</a
          >
        </li>

        <li class="nav-item w-md-200px me-0">
          <a
            class="nav-link text-active-primary pb-4"
            data-kt-countup-tabs="true"
            data-bs-toggle="tab"
            href="#kt_customer_view_overview_api"
            >API</a
          >
        </li>

        <li class="nav-item w-md-200px me-0">
          <a
            class="nav-link text-active-primary pb-4"
            data-kt-countup-tabs="true"
            data-bs-toggle="tab"
            href="#kt_customer_view_overview_support"
            >Support</a
          >
        </li>
      </ul>
      <!--end:::Tabs-->

      <!--begin:::Tab content-->
      <div class="tab-content" id="myTabContent">
        <!--begin:::Tab pane-->
        <div
          class="tab-pane fade show active"
          id="kt_customer_view_introduction_tab"
          role="tabpanel"
        >
          <IntroductionDocumentation></IntroductionDocumentation>
        </div>
        <!--end:::Tab pane-->

        <!--begin:::Tab pane-->
        <div
          class="tab-pane fade"
          id="kt_customer_view_overview_authentication_tab"
          role="tabpanel"
        >
          <AuthenticationDocumentation></AuthenticationDocumentation>
        </div>
        <!--end:::Tab pane-->

        <!--begin:::Tab pane-->
        <div
          class="tab-pane fade"
          id="kt_customer_view_overview_users_permissions"
          role="tabpanel"
        >
          <UsersPermissionsDocumentation></UsersPermissionsDocumentation>
        </div>

        <div
          class="tab-pane fade"
          id="kt_customer_view_overview_profile"
          role="tabpanel"
        >
          <ProfileDocumentation></ProfileDocumentation>
        </div>

        <div
          class="tab-pane fade"
          id="kt_customer_view_overview_accounts"
          role="tabpanel"
        >
          <AccountsDocumentation></AccountsDocumentation>
        </div>

        <div
          class="tab-pane fade"
          id="kt_customer_view_overview_transactions"
          role="tabpanel"
        >
          <TransactionsDocumentation></TransactionsDocumentation>
        </div>

        <div
          class="tab-pane fade"
          id="kt_customer_view_overview_sms"
          role="tabpanel"
        >
          <SMSDocumentation></SMSDocumentation>
        </div>

        <div
          class="tab-pane fade"
          id="kt_customer_view_overview_api"
          role="tabpanel"
        >
          <APIDocumentation></APIDocumentation>
        </div>

        <div
          class="tab-pane fade"
          id="kt_customer_view_overview_support"
          role="tabpanel"
        >
          <SupportDocumentation></SupportDocumentation>
        </div>
        <!--end:::Tab pane-->
      </div>
      <!--end:::Tab content-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Layout-->
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from "vue";

import SupportDocumentation from "@/views/customer/documentation/partials/support.vue";
import UsersPermissionsDocumentation from "@/views/customer/documentation/partials/permissions.vue";
import ProfileDocumentation from "@/views/customer/documentation/partials/profile.vue";
import TransactionsDocumentation from "@/views/customer/documentation/partials/transactions.vue";
import APIDocumentation from "@/views/customer/documentation/partials/api.vue";
import AccountsDocumentation from "@/views/customer/documentation/partials/accounts.vue";
import AuthenticationDocumentation from "@/views/customer/documentation/partials/authentication.vue";
import IntroductionDocumentation from "@/views/customer/documentation/partials/introduction.vue";
import SMSDocumentation from "@/views/customer/documentation/partials/sms.vue";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";

export default defineComponent({
  name: "customer-documentation",
  components: {
    SMSDocumentation,
    IntroductionDocumentation,
    AuthenticationDocumentation,
    AccountsDocumentation,
    APIDocumentation,
    TransactionsDocumentation,
    ProfileDocumentation,
    UsersPermissionsDocumentation,
    SupportDocumentation,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    const refData = ref({
      unauthorized: false,
      loadingPage: true,
    });

    onBeforeMount(() => {
      refData.value.loadingPage = true;
    });

    onMounted(() => {
      refData.value.loadingPage = false;
    });

    return {
      refData,
    };
  },
});
</script>
