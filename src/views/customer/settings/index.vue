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
          <span
            v-if="authenticatedUserDetails.status_id === 1"
            class="badge badge-light-info"
            >Inactive</span
          >
          <span
            v-if="authenticatedUserDetails.status_id === 2"
            class="badge badge-success"
            >Active</span
          >
          <span
            v-if="authenticatedUserDetails.status_id === 3"
            class="badge badge-danger"
            >Deleted</span
          >
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Last Login At</label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semobold fs-6">{{
            formatDateTime(authenticatedUserDetails.last_login_at)
          }}</span>
        </div>
        <!--begin::Label-->
      </div>

      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Last Login IP </label>
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
      <h3 class="mb-7">Customer Details</h3>
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
        <label class="col-lg-4 fw-semobold text-muted">Phone Number</label>
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
        <label class="col-lg-4 fw-semobold text-muted">Customer Group</label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semobold fs-6">{{
            getCustomerGroup(authenticatedUserDetails.customer.group_id).name
          }}</span>
        </div>
        <!--begin::Label-->
      </div>
      <div class="row mb-7" v-if="authenticatedUserDetails.customer">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Customer Type </label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semobold fs-6">{{
            getCustomerType(authenticatedUserDetails.customer.type_id).name
          }}</span>
        </div>
        <!--begin::Label-->
      </div>
      <div class="row mb-7" v-if="authenticatedUserDetails.customer">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Test Mode? </label>
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
            formatDateTime(authenticatedUserDetails.customer.created_at)
          }}</span>
        </div>
        <!--begin::Label-->
      </div>

      <div class="row mb-7" v-if="authenticatedUserDetails.customer">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Last Updated</label>
        <!--begin::Label-->

        <!--begin::Label-->
        <div class="col-lg-8">
          <span class="fw-semobold fs-6">{{
            formatDateTime(authenticatedUserDetails.customer.updated_at)
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
import sppData from "@/helpers/data";
import useOutputFormat from "@/composables/useOutputFormat";

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
      loadingPage: true,
      loadingAction: false,
    });

    const getCustomerType = (id: number) => {
      return sppData.customerTypes.find((item) => item.id === id);
    };
    const getCustomerGroup = (id: number) => {
      return sppData.customerGroups.find((item) => item.id === id);
    };

    //output formatting
    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();

    return {
      refData,
      authenticatedUserDetails,
      getCustomerGroup,
      getCustomerType,
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,
    };
  },
});
</script>
