<template>
  <div class="card pt-4 mb-6 mb-xl-9">
    <!--begin::Card header-->
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title">
        <h2>Users & Managing Permissions</h2>
      </div>
      <!--end::Card title-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body py-0">
      <p class="mb-4">
        As mentioned in the authentication section, the key card for accessing
        our web portal is an active user account. By default, the first user
        account is created at registration. This account will have all the
        permissions granted to your customer account assigned by default.
      </p>

      <p>
        This user will be able to create, edit and de-activate other users,
        including their own user account depending on the permissions they have.
        Once you have adequate permissions, you should be able to view and
        manage users here -
        <router-link to="/users"
          ><b class="text-info link-info"
            >User Accounts and Permissions</b
          ></router-link
        >
      </p>
    </div>
    <!--end::Card body-->
  </div>
</template>

<script>
export default {
  name: "UsersPermissionsDocumentation",
};
</script>

<style scoped></style>
