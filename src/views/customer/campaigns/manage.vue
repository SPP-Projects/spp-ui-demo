<template>
  <PermissionDenied v-if="refData.unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card header-->
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <span class="svg-icon svg-icon-1 position-absolute ms-6">
            <inline-svg src="/media/icons/duotune/general/gen021.svg" />
          </span>
          <input
            type="text"
            data-kt-subscription-table-filter="search"
            class="form-control form-control-solid w-250px ps-14"
            placeholder="Search ..."
            v-model="table_options.search_text"
          />
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Group actions-->
        <div class="d-flex justify-content-end align-items-center">
          <div class="fw-bold me-5">
            <span class="me-2" v-if="meta.total >= 1">
              Showing {{ meta.from }} to {{ meta.to }} of
              {{ meta.total }}
            </span>
          </div>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_campaign"
            @click="showAddCampaignModal"
          >
            Add Campaign
          </button>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pt-0">
      <KTDatatable
        :data="campaigns"
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
        <template v-slot:id="{ row: data }">
          {{ data.id }}
        </template>

        <template v-slot:status_id="{ row: data }">
          <span
            v-if="data.status_id === '1'"
            class="badge py-3 px-4 fs-7 badge-light-warning"
            >In-Review</span
          >
          <span
            v-if="data.status_id === '2'"
            class="badge badge-light-success py-3 px-4 fs-7"
            >Approved</span
          >
          <span
            v-if="data.status_id === '3'"
            class="badge badge-light-danger py-3 px-4 fs-7"
            >Rejected</span
          >
          <span
            v-if="data.status_id === '4'"
            class="badge badge-light-danger py-3 px-4 fs-7"
            >Suspended</span
          >
        </template>

        <template v-slot:created_at="{ row: data }">
          <p class="text-muted">{{ data.created_at }}</p>
        </template>

        <template v-slot:reference="{ row: data }">
          {{ data.reference }}
        </template>

        <template v-slot:goal="{ row: data }">
          {{ data.goal }}
        </template>

        <template v-slot:donated="{ row: data }">
          {{ data.donated }}
        </template>

        <template v-slot:title="{ row: data }">
          {{ data.title }}
        </template>

        <template v-slot:actions="{ row: data }">
          <router-link :to="`/campaigns/payments/${data.reference}`">
            <button class="btn btn-sm btn-info btn-active-info">
              View Details >>
            </button>
          </router-link>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <!--View Campaign Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_campaign"
    ref="AddUpdateCampaignModalRef"
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
                  type="number"
                ></el-input>
              </el-form-item>
            </div>
            <div class="d-flex flex-column mb-4 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span>Image/Banner</span>
                <i
                  class="fas fa-exclamation-circle ms-2 fs-7"
                  data-bs-toggle="tooltip"
                ></i>
              </label>
              <!--end::Label-->

              <el-form-item prop="image">
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
            id="kt_modal_add_campaign_cancel"
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
  <!--View Campaign Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCustomerCampaignStore } from "@/stores/customer/campaign";
import { hideModal } from "@/core/helpers/dom";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";

import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";

export default defineComponent({
  name: "manage-campaigns",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const campaignStore = useCustomerCampaignStore();
    const { campaigns, meta, loadingData } = storeToRefs(campaignStore);
    const { getCampaigns } = useCustomerCampaignStore();

    //data variables
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,
      loadingData: false,
      loadingAction: false,
    });

    //variables
    const tableHeader = ref([
      {
        columnLabel: "created_at",
        columnName: "created dated",
        sortEnabled: true,
      },
      {
        columnLabel: "status_id",
        columnName: "status",
        sortEnabled: true,
      },
      { columnLabel: "id", columnName: "ID", sortEnabled: true },
      {
        columnLabel: "reference",
        columnName: "reference",
        sortEnabled: true,
      },

      { columnLabel: "title", columnName: "title", sortEnabled: true },
      { columnLabel: "goal", columnName: "goal", sortEnabled: false },
      { columnLabel: "donated", columnName: "donated", sortEnabled: true },

      {
        columnLabel: "actions",
        columnName: "Actions",
      },
    ]);

    const table_options = ref({
      current_page: 1,
      page_size: 10,
      search_text: "",
      sort: { column: "", direction: "" },
    });
    const action = ref("");

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
    const searchRecords = ref({
      isSearching: false,
      debounceTimeout: ref<number>(0),
      debounce: 2000,
      kDebounceTimeoutMs: 1000,
    });
    const formAddUpdateCampaignRef = ref<null | HTMLFormElement>(null);

    const AddUpdateCampaignModalRef = ref<null | HTMLElement>(null);

    //functions
    const handleFileUpload = ($event) => {
      payload.value.batch_file = $event.target.files[0];
    };

    const handlePerPageChange = (size: number) => {
      table_options.value.current_page = 1;
      table_options.value.page_size = size;
      getCampaigns(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getCampaigns(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getCampaigns(table_options.value);
    };

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

          campaignStore
            .addCampaign(formPayload)

            .then((response) => {
              // update campaign action to edit
              campaign.value = response;
              campaign.value.action = "Edit";

              // update loading status
              refData.value.loadingAction = false;

              Message({
                message: "Campaign updated successfully.",
                //TBC
                position: "bottom-right",
                type: "success",
                duration: 5000,
                zIndex: 99999,
              });

              getCampaigns(table_options.value);

              hideModal(AddUpdateCampaignModalRef.value);
            })
            .catch((error) => {
              // get errors from state
              let response = error.response.data;

              if (response.errors) {
                let errors = response.errors;
                for (const key in errors) {
                  Message({
                    message: errors[key][0],
                    position: "bottom-right",
                    type: "error",
                    duration: 5000,
                    zIndex: 99999,
                  });
                }
              } else if (response.error) {
                Message({
                  message: response.error,
                  position: "bottom-right",
                  type: "error",
                  duration: 5000,
                  zIndex: 99999,
                });
              }
            })
            .finally(() => (refData.value.loadingAction = false));
        } else {
          return false;
        }
      });
    };

    //modals
    const showAddCampaignModal = () => {
      campaign.value = {
        id: 0,
        action: "Add",
        title: "",
        description: "",
        image: "",
        goal: "",
        reference: "",
      };
    };

    const rules = ref({
      title: [
        {
          required: true,
          message: "Campaign Title is required",
          trigger: "change",
        },
      ],
      description: [
        {
          required: true,
          message: "Description is required",
          trigger: "change",
        },
      ],
      goal: [
        {
          required: true,
          message: "Campaign goal/amount is required",
          trigger: "change",
        },
      ],
    });

    watch(
      () => table_options.value.search_text,
      () => {
        if (searchRecords.value.debounceTimeout) {
          clearTimeout(searchRecords.value.debounceTimeout);
        }

        searchRecords.value.isSearching = true;

        searchRecords.value.debounceTimeout = setTimeout(() => {
          getCampaigns(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    onMounted(() => {
      refData.value.loadingPage = true;
      getCampaigns(table_options.value);
      refData.value.loadingPage = false;
    });
    return {
      //variables
      refData,
      tableHeader,
      meta,
      table_options,
      action,
      campaign,

      campaignImageRef,
      payload,
      searchRecords,

      //functions
      handlePageChange,
      handlePerPageChange,
      processCampaignAction,
      formAddUpdateCampaignRef,
      AddUpdateCampaignModalRef,
      sortingChanged,

      //modals
      showAddCampaignModal,
      rules,
      handleFileUpload,

      //state
      loadingData,
      campaigns,
    };
  },
});
</script>
