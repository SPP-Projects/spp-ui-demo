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
            Add Account Type KYC Setting
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
        :data="accountTypeKycSettings"
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

        <template v-slot:account_type_id="{ row: data }">
          {{ data.account_type.name }}
        </template>

        <template v-slot:kyc_requirement_id="{ row: data }">
          {{ data.kyc_requirement.name }}
        </template>
        <!--        <template v-slot:form_type="{ row: data }">-->
        <!--          {{ data.form_type }}-->
        <!--        </template>-->
        <!--        <template v-slot:group_id="{ row: data }">-->
        <!--          {{ data.group.name }}-->
        <!--        </template>-->

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
                  >Account Type</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="account_type_id">
                  <el-select
                    v-model="kycSetting.account_type_id"
                    placeholder="Select"
                    as="select"
                  >
                    <el-option
                      v-for="item in accountTypeKycRequirementOptions.account_types"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      :disabled="refData.loadingAction"
                    />
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2"
                  >Kyc Requirement</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="kyc_requirement_id">
                  <el-select
                    v-model="kycSetting.kyc_requirement_id"
                    placeholder="Select"
                    as="select"
                  >
                    <el-option
                      v-for="item in accountTypeKycRequirementOptions.kyc_requirements"
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
      accountTypeKycSettings,
      meta,
      loadingKycData,
      accountTypeKycRequirementOptions,
      unauthorized,
    } = storeToRefs(kycStore);
    const { getAccountTypeKycSettings, getAccountTypeKycRequirementOptions } =
      useAdminKycStore();

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
        columnLabel: "account_type_id",
        columnName: "account type",
        sortEnabled: true,
      },
      {
        columnLabel: "kyc_requirement_id",
        columnName: "kyc requirement",
        sortEnabled: false,
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
      account_type_id: "",
      kyc_requirement_id: "",
    } as any);

    const formKycSettingRef = ref<null | HTMLFormElement>(null);
    const kycSettingModalRef = ref<null | HTMLElement>(null);
    const modalFormRules = ref({
      account_type_id: [
        {
          required: true,
          message: "account type is required",
          trigger: "change",
        },
      ],
      kyc_requirement_id: [
        {
          required: true,
          message: "kyc requirement  is required",
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
                .addAccountTypeKycSetting(kycSetting.value)

                .then(() => {
                  getAccountTypeKycSettings(table_options.value);

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
                .updateAccountTypeKycSetting(kycSetting.value)
                .then(() => {
                  refData.value.loadingAction = false;

                  getAccountTypeKycSettings(table_options.value);

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
      getAccountTypeKycSettings(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getAccountTypeKycSettings(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getAccountTypeKycSettings(table_options.value);
    };

    //modals
    const showKycSettingModal = (action, data) => {
      if (action === "Add") {
        kycSetting.value.account_type_id = "";
        kycSetting.value.kyc_requirement_id = "";
      } else {
        kycSetting.value = data;
      }
      kycSetting.value.action = action;
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getAccountTypeKycSettings(table_options.value);
      getAccountTypeKycRequirementOptions();
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
          getAccountTypeKycSettings(table_options.value);
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
      accountTypeKycSettings,
      loadingKycData,
      accountTypeKycRequirementOptions,
      unauthorized,
    };
  },
});
</script>
