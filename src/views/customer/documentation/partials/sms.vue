<template>
  <div class="card pt-4 mb-6 mb-xl-9">
    <!--begin::Card header-->
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title">
        <h2>Sending Messages</h2>
      </div>
      <!--end::Card title-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body py-0">
      <p class="mb-4">
        The SP Pay platform offers SMS functionality to all customers. To be
        able to use this feature, you will need to have API Access and a Valid
        Sender ID
      </p>

      <p class="mb-4">
        Sender IDs are a unique 11 digit character code that are displayed as
        the Sender when your SMS' reach your customers. Sender IDs are subject
        to approval and are screened for fraudulent or suspicious intents. To
        create a Sender ID, visit the
        <router-link to="/sms/sender-ids"
          ><b class="text-info">Sender IDs Section</b></router-link
        >
      </p>

      <p class="text-danger mb-4">
        Ensure that your each Sender ID you submit, is unique to your business.
        If you have 3 or more rejected sender IDs, your account could be
        terminated.
      </p>

      <p>
        All SMS generated from your account can be viewed via the
        <router-link to="/sms/reports"
          ><b class="text-info">SMS Reports Section</b></router-link
        >
      </p>
    </div>
    <!--end::Card body-->
  </div>
</template>

<script>
export default {
  name: "SMSDocumentation",
};
</script>

<style scoped></style>
