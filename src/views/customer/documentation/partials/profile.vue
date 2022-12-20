<template>
  <div class="card pt-4 mb-6 mb-xl-9">
    <!--begin::Card header-->
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title">
        <h2>Completing KYC</h2>
      </div>
      <!--end::Card title-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body py-0">
      <p class="mb-4">
        As a company regulated by Bank of Ghana, we are required to collect
        certain information based on your business needs and required services.
        <br />
        It is very important that you complete all the details in this section.
        <br />
      </p>

      <p>
        You will be able to navigate and use the portal, but before settlements
        are made, checks will be done to ensure you have completed this section.
        <br />
        Access and update your customer information here -
        <router-link to="/onboarding/kyc"
          ><b class="text-info link-info"
            >Manage Your Customer Profile & Information</b
          ></router-link
        >
      </p>
    </div>
    <!--end::Card body-->
  </div>
</template>

<script lang="ts">
export default {
  name: "ProfileDocumentation",
};
</script>

<style scoped></style>
