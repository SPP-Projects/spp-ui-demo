<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Profile Details</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9" v-if="authenticatedUserDetails">
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Full Name</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            authenticatedUserDetails.name
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted"> Email </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 d-flex align-items-center">
          <span class="fw-bold fs-6 me-2">{{
            authenticatedUserDetails.email
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Status </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">
            {{ authenticatedUserDetails.status_id }}
            <span class="badge badge-success">Verified</span></span
          >
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">last_login_at</label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semobold fs-6">{{
            authenticatedUserDetails.last_login_at
          }}</span>
        </div>
        <!--begin::Label-->
      </div>

      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">last_login_ip </label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semobold fs-6">{{
            authenticatedUserDetails.last_login_ip
          }}</span>
        </div>
        <!--begin::Label-->
      </div>
      <!--end::Input group-->

      <hr />
      <h3>Customer Details</h3>
      <div class="row mb-7" v-if="authenticatedUserDetails.customer">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Customer Name</label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semobold fs-6">{{
            authenticatedUserDetails.customer.name
          }}</span>
        </div>
        <!--begin::Label-->
      </div>
      <div class="row mb-7" v-if="authenticatedUserDetails.customer">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">phone</label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semobold fs-6">{{
            authenticatedUserDetails.customer.phone
          }}</span>
        </div>
        <!--begin::Label-->
      </div>
      <div class="row mb-7" v-if="authenticatedUserDetails.customer">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Country</label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semobold fs-6">{{
            authenticatedUserDetails.customer.country_id
          }}</span>
        </div>
        <!--begin::Label-->
      </div>

      <div class="row mb-7" v-if="authenticatedUserDetails.customer">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Group ID</label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semobold fs-6">{{
            authenticatedUserDetails.customer.group_id
          }}</span>
        </div>
        <!--begin::Label-->
      </div>
      <div class="row mb-7" v-if="authenticatedUserDetails.customer">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">type_id </label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semobold fs-6">{{
            authenticatedUserDetails.customer.type_id
          }}</span>
        </div>
        <!--begin::Label-->
      </div>
      <div class="row mb-7" v-if="authenticatedUserDetails.customer">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">test_mode </label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semobold fs-6">{{
            authenticatedUserDetails.customer.test_mode
          }}</span>
        </div>
        <!--begin::Label-->
      </div>
      <div class="row mb-7" v-if="authenticatedUserDetails.customer">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Created At</label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semobold fs-6">{{
            authenticatedUserDetails.customer.created_at
          }}</span>
        </div>
        <!--begin::Label-->
      </div>

      <div class="row mb-7" v-if="authenticatedUserDetails.customer">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">updated_at</label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semobold fs-6">{{
            authenticatedUserDetails.customer.updated_at
          }}</span>
        </div>
        <!--begin::Label-->
      </div>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useCustomerUserStore } from "@/stores/customer/user";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "account-overview",
  components: {},
  setup() {
    //store
    const userStore = useCustomerUserStore();
    const { authenticatedUserDetails } = storeToRefs(userStore);

    //ref
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,

      loadingAction: false,
    });

    return {
      refData,
      authenticatedUserDetails,
    };
  },
});
</script>
