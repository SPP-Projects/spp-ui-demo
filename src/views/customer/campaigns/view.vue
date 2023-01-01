<template>
  <!--begin::Layout-->
  <PermissionDenied v-if="unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />
  <div class="d-flex flex-column flex-xl-row" v-else>
    <!--begin::Sidebar-->
    <div class="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10">
      <!--begin::Card-->
      <div class="card mb-5 mb-xl-8">
        <!--begin::Card body-->
        <div class="card-body pt-15">
          <!--begin::Summary-->
          <div class="d-flex flex-center flex-column mb-5" v-if="!loadingData">
            <!--           TODO - Campaign Image-->

            <!--begin::Avatar-->
            <!--            <div class="symbol symbol-100px symbol-circle mb-7">-->
            <!--              {{ campaignDetails.image }} - <img src="/" alt="image" />-->
            <!--            </div>-->
            <!--end::Avatar-->

            <span class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1">
              {{ campaignDetails.title }}
            </span>

            <div class="fs-5 fw-semobold text-muted mb-6">
              {{ campaignDetails.description }}
            </div>

            <div class="fs-5 fw-semobold text-muted mb-6">
              Image - Todo - {{ campaignDetails.image }}
            </div>

            <div class="d-flex flex-wrap flex-center">
              <div
                class="border border-gray-300 border-dashed rounded py-3 px-3 mb-3"
              >
                <div class="fs-4 fw-bold text-gray-700">
                  <span class="w-75px">
                    {{ campaignDetails.currency_code }}
                    {{ formatCurrencyAmount(campaignDetails.goal) }}</span
                  >
                </div>
                <div class="fw-semobold text-muted">Goal</div>
              </div>

              <div
                class="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3"
              >
                <div class="fs-4 fw-bold text-gray-700">
                  <span class="w-50px">
                    {{ campaignDetails.currency_code }}
                    {{ formatCurrencyAmount(campaignDetails.donated) }}</span
                  >
                </div>
                <div class="fw-semobold text-muted">Donated</div>
              </div>

              <div
                class="border border-gray-300 border-dashed rounded py-3 px-3 mb-3"
              >
                <div class="fs-4 fw-bold text-gray-700">
                  <span class="w-50px">
                    {{ campaignDetails.currency_code }}
                    {{
                      formatCurrencyAmount(campaignDetails.amount_to_goal)
                    }}</span
                  >
                </div>
                <div class="fw-semobold text-muted">Amt Left</div>
              </div>
            </div>
          </div>
          <!--end::Summary-->

          <!--begin::Details toggle-->
          <div class="d-flex flex-stack fs-4 py-3">
            <div
              class="fw-bold rotate collapsible"
              data-bs-toggle="collapse"
              href="#kt_campaign_view_details"
              role="button"
              aria-expanded="false"
              aria-controls="kt_campaign_view_details"
            >
              Details
              <span class="ms-2 rotate-180">
                <span class="svg-icon svg-icon-3">
                  <inline-svg src="/media/icons/duotune/arrows/arr072.svg" />
                </span>
              </span>
            </div>

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
          <!--end::Details toggle-->

          <div class="separator separator-dashed my-3"></div>

          <!--begin::Details content-->
          <div
            id="kt_campaign_view_details"
            class="collapse show"
            v-if="campaignDetails"
          >
            <div class="py-5 fs-6">
              <div class="badge badge-light-info d-inline">
                Status - {{ campaignDetails.status_id }}
              </div>

              <div class="fw-bold mt-5">Youtube URL</div>
              <div class="text-gray-600">
                {{ campaignDetails.youtube_url }}
              </div>

              <div class="fw-bold mt-5">Total Donation Attempts</div>
              <div class="text-gray-600" v-if="campaignDetails.donations">
                {{ campaignDetails.donations.total }}
              </div>

              <div class="fw-bold mt-5">Total Successful Donations</div>
              <div class="text-gray-600">
                {{ donations.length }}
              </div>
            </div>
          </div>
          <!--end::Details content-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
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
        <div class="card-body pt-0 pb-5">
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
                        {{ donation.transaction.amount }}
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
                        {{ donation.transaction.created_at }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Last Updated At</td>
                      <td class="text-gray-800">
                        {{ donation.transaction.updated_at }}
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
            :rules="rules"
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
                <span class="required">Campaign Title</span>
                <i
                  class="fas fa-exclamation-circle ms-2 fs-7"
                  data-bs-toggle="tooltip"
                  title="Specify a target name for future usage and reference"
                ></i>
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
                <i
                  class="fas fa-exclamation-circle ms-2 fs-7"
                  data-bs-toggle="tooltip"
                  title="Specify a target name for future usage and reference"
                ></i>
              </label>
              <!--end::Label-->

              <el-form-item prop="description">
                <el-input
                  v-model="campaign.description"
                  placeholder="Enter description"
                  name="description"
                ></el-input>
              </el-form-item>
            </div>
            <div class="d-flex flex-column mb-4 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span class="required">Goal/Amount</span>
                <i
                  class="fas fa-exclamation-circle ms-2 fs-7"
                  data-bs-toggle="tooltip"
                ></i>
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
                <i
                  class="fas fa-exclamation-circle ms-2 fs-7"
                  data-bs-toggle="tooltip"
                ></i>
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
import { useCustomerCampaignStore } from "@/stores/customer/campaign";
import { storeToRefs } from "pinia";
import type { iCampaignDonation } from "@/models/campaign";
import useOutputFormat from "@/composables/useOutputFormat";

export default defineComponent({
  name: "campaign-payments",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const campaignStore = useCustomerCampaignStore();
    const {
      campaignPayments,
      meta,
      loadingData,
      campaignDetails,
      unauthorized,
    } = storeToRefs(campaignStore);
    const { getCampaign } = useCustomerCampaignStore();

    //route
    const route = useRoute();

    //data variables
    const refData = ref({
      noDataMessage: ["No Data"],

      //loading
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
      page_size: 10,
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
      //Todo
      // await getCampaign();
      campaign.value.action = "Edit";
    };

    const formAddUpdateCampaignRef = ref<null | HTMLFormElement>(null);

    const updateCampaignModalRef = ref<null | HTMLElement>(null);

    const handleFileUpload = ($event) => {
      payload.value.batch_file = $event.target.files[0];
    };

    const rules = ref({
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

              Message({
                message: "Data updated successfully.",
                //TBC
                position: "bottom-right",
                type: "success",
                duration: 5000,
                zIndex: 99999,
              });

              // update campaign records
              getCampaign(table_options.value);

              hideModal(updateCampaignModalRef.value);
            })
            .catch((error) => {
              // get errors from state
              let response = error.response.data;

              if (response.errors) {
                let errors = response.errors;
                for (const key in errors) {
                  Message({
                    message: errors[key][0],
                    //TBC
                    position: "bottom-right",
                    type: "error",
                    duration: 5000,
                    zIndex: 99999,
                  });
                }
              } else if (response.error) {
                Message({
                  message: response.error,
                  //TBC
                  position: "bottom-right",
                  type: "error",
                  duration: 5000,
                  zIndex: 99999,
                });
              }

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
      rules,
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
    };
  },
});
</script>
