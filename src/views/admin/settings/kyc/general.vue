<template>
  <!--begin::Card-->
  <PermissionDenied v-if="unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />
  <div class="card" v-else>
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
            <span class="me-2">
              Showing {{ meta.from }} to {{ meta.to }} of
              {{ meta.total }}
            </span>
          </div>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_kyc_setting"
            @click="showKycSettingModal('Add', {})"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add KYC Setting
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
        :data="kycSettings"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingKycData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:id="{ row: data }">
          {{ data.id }}
        </template>

        <template v-slot:name="{ row: data }">
          {{ data.name }}
        </template>

        <template v-slot:form_name="{ row: data }">
          {{ data.form_name }}
        </template>
        <template v-slot:form_type="{ row: data }">
          {{ data.form_type }}
        </template>
        <template v-slot:group_id="{ row: data }">
          {{ data.group.name }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            @click="showKycSettingModal('Edit', data)"
            data-bs-toggle="modal"
            id="edit-btn"
            data-bs-target="#kt_modal_add_kyc_setting"
          >
            View/Edit
          </button>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <!--Add kycSetting Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_kyc_setting"
    ref="kycSettingModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <el-form
          class="form"
          @submit.prevent="processKycSettingAction()"
          :model="kycSetting"
          :rules="modalFormRules"
          ref="formKycSettingRef"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_kyc_setting_header">
            <!--begin::Modal title-->
            <h2>{{ kycSetting.action }} Details</h2>
            <!--end::Modal title-->

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
          <!--end::Modal header-->

          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_kyc_setting_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_new_kyc_setting_header"
              data-kt-scroll-wrappers="#kt_modal_kyc_setting_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2"
                  >Requirement Group</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="group_id">
                  <el-select
                    v-model="kycSetting.group_id"
                    placeholder="Select"
                    as="select"
                  >
                    <el-option
                      v-for="item in kycRequirementOptions.groups"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      :disabled="refData.loadingAction"
                    />
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Requirement Name</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="name">
                  <el-input
                    v-model="kycSetting.name"
                    placeholder="Name"
                    name="name"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Form Name</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="form_name">
                  <el-input
                    v-model="kycSetting.form_name"
                    placeholder="Form name"
                    name="form_name"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Form Type</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="form_type">
                  <el-input
                    v-model="kycSetting.form_type"
                    placeholder="Form type"
                    name="form_type"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Form Validation</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="form_validation">
                  <el-input
                    v-model="kycSetting.form_validation"
                    placeholder="form validation"
                    name="form_validation"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_add_kyc_setting_cancel"
              class="btn btn-light me-3 btn-sm"
              data-bs-dismiss="modal"
              :disabled="refData.loadingAction"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              ref="submitButtonRef"
              type="submit"
              id="kt_modal_kyc_setting_submit"
              class="btn btn-primary btn-sm"
              :data-kt-indicator="refData.loadingAction ? 'on' : null"
            >
              <span v-if="!refData.loadingAction" class="indicator-label">
                {{ kycSetting.action === "Add" ? "Add" : "Update" }}
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                </span>
              </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
  <!--Add kycSetting Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAdminKycStore } from "@/stores/admin/kyc";
import { hideModal } from "@/core/helpers/dom";

import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import { AlertService } from "@/services/AlertService";

export default defineComponent({
  name: "admin-manage-general-kyc",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const kycStore = useAdminKycStore();
    const {
      kycSettings,
      meta,
      loadingKycData,
      kycRequirementOptions,
      unauthorized,
    } = storeToRefs(kycStore);
    const { getKycSettings, getRequirementOptions } = useAdminKycStore();

    //data variables
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,
      loadingAction: false,
    });

    const tableHeader = ref([
      { columnLabel: "id", columnName: "ID", sortEnabled: true },
      {
        columnLabel: "name",
        columnName: "name",
        sortEnabled: true,
      },
      {
        columnLabel: "form_name",
        columnName: "form name",
        sortEnabled: false,
      },
      {
        columnLabel: "form_type",
        columnName: "form type",
        sortEnabled: true,
      },

      {
        columnLabel: "group_id",
        columnName: "group",
        sortEnabled: true,
      },
      {
        columnLabel: "actions",
        columnName: "Actions",
      },
    ]);

    const table_options = ref({
      current_page: 1,
      page_size: 20,
      search_text: "",
      sort: { column: "", direction: "" },
    });

    const kycSetting = ref({
      id: 0,
      action: "Add",
      name: "",
      form_name: "",
      form_type: "",
      form_validation: "",
      group_id: "",
    } as any);

    const formKycSettingRef = ref<null | HTMLFormElement>(null);
    const kycSettingModalRef = ref<null | HTMLElement>(null);
    const modalFormRules = ref({
      name: [
        {
          required: true,
          message: "Name is required",
          trigger: "change",
        },
      ],
      form_name: [
        {
          required: true,
          message: "Form Name  is required",
          trigger: "change",
        },
      ],
      form_type: [
        {
          required: true,
          message: "Form type is required",
          trigger: "change",
        },
      ],

      form_validation: [
        {
          required: true,
          message: "Validation is required",
          trigger: "change",
        },
      ],

      group_id: [
        {
          required: true,
          message: "Group is required",
          trigger: "change",
        },
      ],
    });

    const searchRecords = ref({
      isSearching: false,
      debounceTimeout: ref<number>(0),
      debounce: 2000,
      kDebounceTimeoutMs: 1000,
    });

    const processKycSettingAction = () => {
      if (!formKycSettingRef.value) {
        return;
      }

      formKycSettingRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          switch (kycSetting.value.action) {
            case "Add":
              kycStore
                .addKycSetting(kycSetting.value)

                .then(() => {
                  getKycSettings(table_options.value);

                  hideModal(kycSettingModalRef.value);

                  //display message using shared AlertService
                  AlertService.displaySuccessAlert(
                    "Data updated successfully!"
                  );
                })
                .finally(() => (refData.value.loadingAction = false));
              break;
            case "Edit":
              kycStore
                .updateKycSetting(kycSetting.value)
                .then(() => {
                  refData.value.loadingAction = false;

                  getKycSettings(table_options.value);

                  hideModal(kycSettingModalRef.value);

                  //display message using shared AlertService
                  AlertService.displaySuccessAlert(
                    "Data updated successfully!"
                  );
                })
                .catch((error) => {
                  //display message using shared AlertService
                  AlertService.displayMultipleErrorsAlert(error);

                  // update loading status
                  refData.value.loadingAction = false;
                });
              break;
            default:
            //do nothing.
          }
        } else {
          return false;
        }
      });
    };

    const handlePerPageChange = (size: number) => {
      table_options.value.current_page = 1;
      table_options.value.page_size = size;
      getKycSettings(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getKycSettings(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getKycSettings(table_options.value);
    };

    //modals
    const showKycSettingModal = (action, data) => {
      if (action === "Add") {
        kycSetting.value.name = "";
        kycSetting.value.form_name = "";
        kycSetting.value.form_type = "";
        kycSetting.value.form_validation = "";
        kycSetting.value.group_id = "";
      } else {
        kycSetting.value = data;
      }
      kycSetting.value.action = action;
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getKycSettings(table_options.value);
      getRequirementOptions();
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
          getKycSettings(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      //variables
      refData,
      kycSettingModalRef,
      formKycSettingRef,
      modalFormRules,
      tableHeader,
      meta,
      table_options,
      kycSetting,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      processKycSettingAction,
      searchRecords,

      //modals
      showKycSettingModal,

      //state
      kycSettings,
      loadingKycData,
      kycRequirementOptions,
      unauthorized,
    };
  },
});
</script>
