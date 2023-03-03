<template>
  <!--begin::Layout-->
  <PermissionDenied v-if="unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />

  <div class="d-flex flex-column flex-xl-row" v-else>
    <!--begin::Sidebar-->

    <div class="flex-column flex-lg-row-auto w-100 w-xl-450px mb-10">
      <div class="card card-flush pt-3 mb-5 mb-xl-5">
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title">
            <h2 class="fw-bold">Campaign Details</h2>
          </div>
          <!--begin::Card title-->
          <!--begin::Card toolbar-->
          <div class="card-toolbar">
            <span
              data-bs-toggle="tooltip"
              data-bs-trigger="hover"
              title="Edit campaign details"
            >
              <a
                href="#"
                class="btn btn-sm btn-light-primary"
                @click="showEditCampaignModal()"
                data-bs-toggle="modal"
                id="edit-btn"
                data-bs-target="#kt_modal_update_campaign"
              >
                Edit Campaign
              </a>
            </span>
          </div>
          <!--end::Card toolbar-->
        </div>
        <!--end::Card header-->
        <!--begin::Card body-->
        <div class="card-body pt-3">
          <!--begin::Section-->
          <div class="mb-1">
            <!--begin::Details-->
            <div class="d-flex flex-wrap py-5">
              <!--begin::Row-->
              <div class="me-5">
                <!--begin::Details-->
                <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2 m-0">
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400 min-w-175px w-175px">Status:</td>
                    <td class="text-gray-800 min-w-200px">
                      <span
                        v-if="campaignDetails.status_id === '1'"
                        class="badge badge-light-warning"
                        >In-Review</span
                      >
                      <span
                        v-if="campaignDetails.status_id === '2'"
                        class="badge badge-light-success"
                        >Live</span
                      >
                      <span
                        v-if="campaignDetails.status_id === '3'"
                        class="badge badge-light-danger"
                        >Closed</span
                      >
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400 min-w-175px w-175px">
                      Reference #:
                    </td>
                    <td class="text-gray-800 min-w-200px">
                      {{ campaignDetails.reference }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Title</td>
                    <td class="text-gray-800">{{ campaignDetails.title }}</td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400" colspan="2">
                      Description:

                      <div class="text-gray-800">
                        {{ campaignDetails.description }}
                      </div>
                    </td>
                    <!--                    <td class="text-gray-800">-->
                    <!--                      {{ campaignDetails.description }}-->
                    <!--                    </td>-->
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Goal:</td>
                    <td class="text-gray-800">{{ campaignDetails.goal }}</td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Youtube:</td>
                    <td class="text-gray-800">
                      {{ campaignDetails.youtube_url }}
                    </td>
                  </tr>
                  <tr v-if="campaignDetails.image_url">
                    <td class="text-gray-400">Image:</td>
                    <td class="text-gray-800">
                      <el-image :src="campaignDetails.image_url"></el-image>
                    </td>
                  </tr>
                  <!--end::Row-->
                </table>
                <!--end::Details-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Row-->
          </div>
          <!--end::Section-->

          <div class="separator separator-dashed mb-1"></div>
        </div>
        <!--end::Card body-->
      </div>

      <div class="card mb-5 mb-xl-10">
        <!--begin::Body-->
        <div class="card-body py-10">
          <h1 class="mb-2 text-danger">{{ campaignDetails.title }}</h1>
          <div class="separator separator-dashed my-3"></div>
          <!--begin::Stats-->
          <div class="row">
            <!--begin::Col-->
            <div class="col">
              <div class="card card-dashed flex-center min-w-175px my-3 p-6">
                <span class="fs-4 fw-semibold text-info pb-1 px-2">Goal</span>
                <span class="fs-1 fw-bold d-flex justify-content-center">
                  {{ campaignDetails.currency_code }}
                  <span
                    data-kt-countup="true"
                    data-kt-countup-value="63,240.00"
                  >
                    {{ formatCurrencyAmount(campaignDetails.goal) }}</span
                  ></span
                >
              </div>
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col">
              <div class="card card-dashed flex-center min-w-175px my-3 p-6">
                <span class="fs-4 fw-semibold text-success pb-1 px-2"
                  >Donated</span
                >
                <span class="fs-1 fw-bold d-flex justify-content-center">
                  {{ campaignDetails.currency_code }}
                  <span data-kt-countup="true" data-kt-countup-value="8,530.00">
                    {{ formatCurrencyAmount(campaignDetails.donated) }}</span
                  ></span
                >
              </div>
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col">
              <div class="card card-dashed flex-center min-w-175px my-3 p-6">
                <span class="fs-4 fw-semibold text-danger pb-1 px-2"
                  >Amount Left</span
                >
                <span class="fs-1 fw-bold d-flex justify-content-center">
                  {{ campaignDetails.currency_code }}
                  <span data-kt-countup="true" data-kt-countup-value="2,600">
                    {{
                      formatCurrencyAmount(campaignDetails.amount_to_goal)
                    }}</span
                  ></span
                >
              </div>
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col">
              <div class="card card-dashed flex-center min-w-175px my-3 p-6">
                <span class="fs-4 fw-semibold text-primary pb-1 px-2"
                  >Attempts</span
                >
                <span
                  class="fs-1 fw-bold d-flex justify-content-center"
                  v-if="campaignDetails.donations"
                >
                  <span data-kt-countup="true" data-kt-countup-value="">{{
                    campaignDetails.donations.total
                  }}</span></span
                >
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Stats-->
        </div>
        <!--end::Body-->
      </div>
    </div>
    <!--end::Sidebar-->

    <!--begin::Content-->
    <div class="flex-lg-row-fluid ms-lg-15">
      <div class="card pt-4">
        <!--begin::Card header-->
        <div class="card-header border-0">
          <!--begin::Card title-->
          <div class="card-title">
            <h2>Payments/Donations</h2>
          </div>
          <!--end::Card title-->

          <!--begin::Card toolbar-->
          <div class="card-toolbar">
            <div class="fw-bold me-5">
              <span class="me-2" v-if="meta.total >= 1">
                Showing {{ meta.from }} to {{ meta.to }} of
                {{ meta.total }}
              </span>
            </div>
          </div>
          <!--end::Card toolbar-->
        </div>
        <!--end::Card header-->

        <!--begin::Card body-->
        <div class="card-body pt-0 pb-5" v-if="campaignPayments">
          <KTDatatable
            :data="campaignPayments"
            :header="tableHeader"
            :enable-items-per-page-dropdown="true"
            :checkbox-enabled="false"
            checkbox-label="id"
            :itemsPerPage="table_options.page_size"
            :total="meta.total"
            :loading="loadingData"
            @page-change="handlePageChange"
            @on-items-per-page-change="handlePerPageChange"
            @on-sort="sortingChanged"
          >
            <template v-slot:status="{ row: data }">
              <span
                v-if="data.transaction.status_id === 1"
                class="badge badge-light-primary"
                >Created</span
              >
              <span
                v-if="data.transaction.status_id === 2"
                class="badge badge-light-info"
                >Submitted</span
              >
              <span
                v-if="data.transaction.status_id === 3"
                class="badge badge-light-warning"
                >Processing</span
              >
              <span
                v-if="data.transaction.status_id === 4"
                class="badge badge-light-success"
                >Success</span
              >
              <span
                v-if="data.transaction.status_id === 5"
                class="badge badge-light-danger"
                >Error</span
              >
              <span
                v-if="data.transaction.status_id === 6"
                class="badge badge-light-danger"
                >Cancelled</span
              >

              <br />

              <span class="text-muted fs-7 fw-normal text-muted small">{{
                data.transaction.status_message
              }}</span>
            </template>

            <template v-slot:created_at="{ row: data }">
              {{ formatDateTime(data.created_at) }}
            </template>

            <template v-slot:transaction_reference="{ row: data }">
              {{ data.transaction_reference }}
            </template>

            <template v-slot:amount="{ row: data }">
              {{ data.currency_code }}
              {{ formatCurrencyAmount(data.amount) }}
            </template>

            <template v-slot:donor="{ row: data }">
              {{ data.donor_email }} <br />
              {{ data.transaction.debit_account_no }}
            </template>

            <template v-slot:actions="{ row: data }">
              <button
                class="btn btn-sm btn-light-info btn-active-light-info"
                data-bs-toggle="modal"
                id="edit-btn"
                data-bs-target="#kt_modal_view_donation"
                @click="viewDonation(data)"
              >
                View
              </button>
            </template>
          </KTDatatable>
        </div>
        <!--end::Card body-->
      </div>
    </div>
    <!--end::Content-->
  </div>

  <!-- View Payment Modal-->
  <div
    class="modal fade"
    id="kt_modal_view_donation"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header pb-0 border-0 justify-content-end">
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--begin::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
          <div data-kt-stepper-element="content">
            <!--begin::Wrapper-->
            <div class="w-100" v-if="donation.id">
              <!--begin::Heading-->
              <div class="pb-12">
                <!--begin::Title-->
                <h1 class="fw-bold text-dark">
                  Transaction Details: {{ donation.transaction.id }} -
                  {{ donation.transaction.reference }}
                </h1>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
            </div>
            <!--end::Wrapper-->
          </div>
          <div v-if="donation.id">
            <!--  General Info -->
            <div
              class="py-2 border-bottom border-bottom-dashed border-gray-300"
            >
              <div class="ms">
                <span
                  class="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                >
                  General
                </span>
              </div>
              <div class="flex-equal table-responsive">
                <table
                  class="table table-flush fw-semobold gy-1"
                  style="width: 100%"
                >
                  <tbody>
                    <tr>
                      <td class="text-muted">Amount</td>
                      <td class="text-gray-800">
                        {{ formatCurrencyAmount(donation.transaction.amount) }}
                        {{ donation.transaction.currency_code }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Type Name</td>
                      <td class="text-gray-800">
                        {{ donation.transaction.type_code }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Status</td>
                      <td class="text-gray-800">
                        {{ donation.transaction.status_message }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Created At</td>
                      <td class="text-gray-800">
                        {{ formatDateTime(donation.transaction.created_at) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Last Updated At</td>
                      <td class="text-gray-800">
                        {{ formatDateTime(donation.transaction.updated_at) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--  General Info -->

            <!--  Debit Info -->
            <div
              class="py-2 border-bottom border-bottom-dashed border-gray-300"
            >
              <div class="ms">
                <span
                  class="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                >
                  Debit Account
                </span>
              </div>
              <div class="flex-equal table-responsive">
                <table class="table table-flush fw-semobold gy-1">
                  <tbody>
                    <tr>
                      <td class="text-muted">Institution</td>
                      <td class="text-gray-800">
                        {{ donation.transaction.debit_account_institution_id }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Account No</td>
                      <td class="text-gray-800">
                        {{ donation.transaction.debit_account_no }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Account Name</td>
                      <td class="text-gray-800">
                        {{ donation.transaction.debit_account_name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Debit Status</td>
                      <td class="text-gray-800">
                        {{ donation.transaction.debit_status_message }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--  Debit Info -->

            <!--  Credit Info -->
            <div
              class="py-2 border-bottom border-bottom-dashed border-gray-300"
            >
              <div class="ms">
                <span
                  class="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                >
                  Credit Account
                </span>
              </div>
              <div class="flex-equal table-responsive">
                <table class="table table-flush fw-semobold gy-1">
                  <tbody>
                    <tr>
                      <td class="text-muted">Institution</td>
                      <td class="text-gray-800">
                        {{ donation.transaction.credit_account_institution_id }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Account No.</td>
                      <td class="text-gray-800">
                        {{ donation.transaction.credit_account_no }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Account Name</td>
                      <td class="text-gray-800">
                        {{ donation.transaction.credit_account_name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Credit Status</td>
                      <td class="text-gray-800">
                        {{ donation.transaction.credit_status_message }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--  Credit Info -->
          </div>
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!-- View Payment Modal-->

  <!-- Update Campaign Modal-->
  <div
    class="modal fade"
    id="kt_modal_update_campaign"
    ref="updateCampaignModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header pb-0 border-0 justify-content-end">
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--begin::Modal header-->

        <!--begin::Modal body-->
        <div
          class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15"
          v-if="campaign"
        >
          <el-form
            @submit.prevent="processCampaignAction()"
            class="form"
            :model="campaign"
            :rules="campaignFormRules"
            ref="formAddUpdateCampaignRef"
          >
            <!--begin::Heading-->
            <div class="mb-13 text-center">
              <!--begin::Title-->
              <h1 class="mb-3">{{ campaign.action }} Campaign Details</h1>
              <!--end::Title-->
            </div>
            <!--end::Heading-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-4 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span class="required">Status</span>
              </label>
              <!--end::Label-->

              <el-form-item prop="status_id">
                <el-select v-model="campaign.status_id" placeholder="Select">
                  <el-option
                    v-for="item in sppData.campaignStatuses"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    :disabled="refData.loadingAction"
                  >
                    {{ item.name }}</el-option
                  >
                </el-select></el-form-item
              >
            </div>
            <div class="d-flex flex-column mb-4 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span class="required">Campaign Title</span>
              </label>
              <!--end::Label-->

              <el-form-item prop="title">
                <el-input
                  v-model="campaign.title"
                  placeholder="Enter title"
                  name="title"
                ></el-input>
              </el-form-item>
            </div>
            <div class="d-flex flex-column mb-4 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span class="required">Description</span>
              </label>
              <!--end::Label-->

              <el-form-item prop="description">
                <el-input
                  v-model="campaign.description"
                  placeholder="Enter description"
                  name="description"
                  type="textarea"
                  rows="3"
                ></el-input>
              </el-form-item>
            </div>
            <div class="d-flex flex-column mb-4 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span class="required">Goal/Amount</span>
              </label>
              <!--end::Label-->

              <el-form-item prop="goal">
                <el-input
                  v-model="campaign.goal"
                  placeholder="Enter goal"
                  name="goal"
                ></el-input>
              </el-form-item>
            </div>
            <div class="d-flex flex-column mb-4 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span class="required">Image</span>
              </label>
              <!--end::Label-->

              <el-form-item prop="phone">
                <input
                  type="file"
                  class="mb-4"
                  placeholder="Select Batch File"
                  :ref="campaignImageRef"
                  :disabled="refData.loadingAction"
                  @change="handleFileUpload($event)"
                />
              </el-form-item>
            </div>
            <!--end::Input group-->
          </el-form>
        </div>
        <div class="modal-footer flex-center" v-if="campaign">
          <!--begin::Button-->
          <button
            type="reset"
            id="kt_modal_update_campaign_cancel"
            class="btn btn-light me-3"
            data-bs-dismiss="modal"
            :disabled="refData.loadingAction"
          >
            Cancel
          </button>
          <!--end::Button-->

          <!--begin::Button-->
          <button
            :data-kt-indicator="refData.loadingAction ? 'on' : null"
            class="btn btn-lg btn-primary"
            type="submit"
            @click="processCampaignAction()"
            :disabled="refData.loadingAction"
          >
            <span v-if="!refData.loadingAction" class="indicator-label">
              {{ campaign.action === "Add" ? "Add" : "Update" }}
              <span class="svg-icon svg-icon-3 ms-2 me-0">
                <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
              </span>
            </span>
            <span v-if="refData.loadingAction" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <!--end::Button-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!-- Update Campaign Modal-->

  <!--end::Layout-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";

import { useRoute } from "vue-router";
import Message from "vue-m-message";
import { hideModal } from "@/core/helpers/dom";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";

import { storeToRefs } from "pinia";
import type { iCampaignDonation } from "@/models/campaign";
import useOutputFormat from "@/composables/useOutputFormat";

import { useAdminCampaignStore } from "@/stores/admin/campaign";
import sppData from "@/helpers/data";
import {AlertService} from "@/services/AlertService";

export default defineComponent({
  name: "admin-view-campaign",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const campaignStore = useAdminCampaignStore();
    const {
      campaignPayments,
      meta,
      loadingData,
      campaignDetails,
      unauthorized,
    } = storeToRefs(campaignStore);
    const { getCampaign } = useAdminCampaignStore();

    //route
    const route = useRoute();

    //data variables
    const refData = ref({
      loadingPage: true,
      loadingData: false,
      loadingAction: false,
    });

    const tableHeader = ref([
      {
        columnLabel: "created_at",
        columnName: "Created Date",
        sortEnabled: true,
      },

      {
        columnLabel: "status",
        columnName: "status",
        sortEnabled: true,
      },

      {
        columnLabel: "transaction_reference",
        columnName: "reference",
        sortEnabled: false,
      },
      {
        columnLabel: "amount",
        columnName: "amount",
        sortEnabled: false,
      },

      {
        columnLabel: "donor",
        columnName: "donor",
        sortEnabled: false,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
      },
    ]);

    const table_options = ref({
      reference: "",
      current_page: 1,
      page_size: 20,
      search_text: "",
      sort: { column: "", direction: "" },
    });

    const donation = ref({} as iCampaignDonation);

    const donations = ref([]);

    const campaign = ref({
      id: 0,
      action: "Add",
      title: "",
      description: "",
      image: "",
      goal: "",
      reference: "",
      status_id: "",
    } as any);

    const campaignImageRef = ref(null);

    const payload = ref({
      batch_file: null,
      validate: true,
    });

    const action = ref("");

    const searchRecords = ref({
      isSearching: false,
      debounceTimeout: ref<number>(0),
      debounce: 2000,
      kDebounceTimeoutMs: 1000,
    });

    //functions
    const handlePerPageChange = (size: number) => {
      table_options.value.current_page = 1;
      table_options.value.page_size = size;
      getCampaign(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getCampaign(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getCampaign(table_options.value);
    };

    const viewDonation = (val) => {
      donation.value = val;
    };

    //modals
    const showEditCampaignModal = async () => {
      //campaign.value = data;
      campaign.value.action = "Edit";

      campaign.value.title = campaignDetails.value.title;
      campaign.value.description = campaignDetails.value.description;
      //campaign.value.image = campaignDetails.value.title;
      campaign.value.goal = campaignDetails.value.goal;
      campaign.value.reference = campaignDetails.value.reference;
      campaign.value.status_id = campaignDetails.value.status_id;
      //Todo
      // await getCampaign();
      campaign.value.action = "Edit";
    };

    const formAddUpdateCampaignRef = ref<null | HTMLFormElement>(null);

    const updateCampaignModalRef = ref<null | HTMLElement>(null);

    const handleFileUpload = ($event) => {
      payload.value.batch_file = $event.target.files[0];
    };

    const campaignFormRules = ref({
      title: [
        {
          required: true,
          message: "title is required",
          trigger: "change",
        },
      ],
    });

    const processCampaignAction = () => {
      if (!formAddUpdateCampaignRef.value) {
        return;
      }

      formAddUpdateCampaignRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          let formPayload = new FormData();
          formPayload.append("title", campaign.value.title);
          formPayload.append("description", campaign.value.description);
          formPayload.append("goal", campaign.value.goal);
          formPayload.append("status_id", campaign.value.status_id);

          if (payload.value.batch_file !== null) {
            formPayload.append("image", payload.value.batch_file);
          }

          formPayload.append("reference", campaign.value.reference);

          campaignStore
            .updateCampaign([formPayload, campaign.value.reference])

            .then((response) => {
              console.log(response);

              campaign.value.action = "Edit";

              // update loading status
              refData.value.loadingAction = false;

              //display message using shared AlertService
              AlertService.displaySuccessAlert("Data updated successfully!");

              // update campaign records
              getCampaign(table_options.value);

              hideModal(updateCampaignModalRef.value);
            })
            .catch((error) => {
              //display message using shared AlertService
              AlertService.displayMultipleErrorsAlert(error);

              // update loading status
              refData.value.loadingAction = false;
            });
        } else {
          return false;
        }
      });
    };

    onMounted(async () => {
      refData.value.loadingPage = true;
      table_options.value.reference = Array.isArray(route.params.reference)
        ? route.params.reference[0]
        : route.params.reference;
      await getCampaign(table_options.value);
      refData.value.loadingPage = false;
    });

    watch(
      () => table_options.value.search_text,
      () => {
        if (searchRecords.value.debounceTimeout) {
          clearTimeout(searchRecords.value.debounceTimeout);
        }

        searchRecords.value.isSearching = true;
        searchRecords.value.debounceTimeout = setTimeout(() => {
          getCampaign(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    //output formatting
    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();

    const siteUrl = import.meta.env.VITE_APP_API_URL;

    return {
      //variables
      searchRecords,
      refData,
      tableHeader,
      meta,
      table_options,
      campaignDetails,
      donation,
      donations,
      campaign,
      payload,
      campaignImageRef,
      action,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      viewDonation,

      showEditCampaignModal,
      handleFileUpload,
      processCampaignAction,
      campaignFormRules,
      formAddUpdateCampaignRef,
      updateCampaignModalRef,

      //state
      loadingData,
      campaignPayments,
      getCampaign,
      unauthorized,
      //composable
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,

      //url
      siteUrl,

      sppData,
    };
  },
});
</script>

<style lang="scss">
.el-select {
  width: 100%;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>

<style lang="scss">
.override-styles {
  z-index: 99999 !important;
  pointer-events: initial;
}
</style>
