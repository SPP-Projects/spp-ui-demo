<template>
  <div class="card pt-4 mb-6 mb-xl-9">
    <!--begin::Card header-->
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title">
        <h2>Registration & Authentication</h2>
      </div>
      <!--end::Card title-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body py-0">
      <p class="mb-4">
        Access to the platform is through two channels - Web and through and API
        Integration. <br />
        To be able to use either, you will first need to have a registered
        customer account which you must have completed to be able to access this
        guide.<br />
      </p>

      <p class="mb-4">
        To access our web interface, you will need an active user account - use
        your email and password combination to login, each time you visit our
        platform. <br />
        You may create as many user accounts as required but be sure to grant
        only the required permissions to the users you create. <br />
        You can manage your users and their permissions here -
        <router-link to="/users"
          ><b class="text-info link-info"
            >User Accounts and Permissions</b
          ></router-link
        >. <br />
        To know more about creating and managing users, check out the

        <!--        TODO-->
        <!--        @click="activeTab = 2"-->
        <router-link to="" @click.prevent=""
          ><b class="text-info font-weight-bold"
            >Creating & Managing Users</b
          ></router-link
        >
        of this documentation.
      </p>

      <p>
        To access our API, you will need an active user account, as well as an
        API Client ID and Password. <br />
        You will need these in addition to your email and password combination,
        to generate an API token. <br />
        You can manage your API Credentials here -
        <router-link to="/api"><b class="text-info">API Access</b></router-link
        >. <br />
        To know more about how to access and use our API, check out the

        <!--        TODO-->
        <!--        @click="activeTab = 7"-->
        <router-link to="" @click.prevent=""
          ><b class="text-info font-weight-bold"
            >API Integrations Section</b
          ></router-link
        >
        of this documentation.
      </p>
    </div>
    <!--end::Card body-->
  </div>
</template>

<script lang="ts">
export default {
  name: "AuthenticationDocumentation",
};
</script>

<style scoped></style>
