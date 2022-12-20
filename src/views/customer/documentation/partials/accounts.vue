<template>
  <div class="card pt-4 mb-6 mb-xl-9">
    <!--begin::Card header-->
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title">
        <h2>Managing Your Accounts</h2>
      </div>
      <!--end::Card title-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body py-0">
      <p class="mb-4">
        As a business on our platform, you may have one or more accounts. You
        will be able view and manage your accounts from the
        <router-link to="/accounts"
          ><b class="text-info">Accounts Area</b></router-link
        ><br />
        You can also view all your accounts on the right section of your
        <router-link to="/"><b class="text-info">Dashboard</b></router-link>
      </p>

      <p>
        From both areas, there are links to access the accounts transactions
        using the View Transactions Button which links to the
        <router-link to="/transactions"
          ><b class="text-info">Transactions Area</b></router-link
        >
      </p>
    </div>
    <!--end::Card body-->
  </div>
</template>

<script lang="ts">
export default {
  name: "AccountsDocumentation",
};
</script>

<style scoped></style>
