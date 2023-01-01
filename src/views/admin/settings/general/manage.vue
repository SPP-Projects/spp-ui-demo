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
            data-bs-target="#kt_modal_add_general_setting"
            @click="showAddGeneralSettingModal('Add', {})"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add Settings
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
        :data="generalSettings"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingSettingsData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:id="{ row: data }">
          {{ data.id }}
        </template>

        <template v-slot:name="{ row: data }"> {{ data.name }} </template>
        <template v-slot:description="{ row: data }">
          {{ data.description }}
        </template>
        <template v-slot:value="{ row: data }"> {{ data.value }} </template>
        <template v-slot:group="{ row: data }">
          {{ data.group.name }}
        </template>
        <template v-slot:type="{ row: data }"> {{ data.type.name }} </template>
        <template v-slot:updated_at="{ row: data }">
          {{ formatDateTime(data.updated_at) }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            @click="showAddGeneralSettingModal('Edit', data)"
            data-bs-toggle="modal"
            id="edit-btn"
            data-bs-target="#kt_modal_add_general_setting"
          >
            View/Edit
          </button>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <!--Add generalSetting Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_general_setting"
    ref="generalSettingModalRef"
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
          @submit.prevent="processGeneralSettingAction()"
          :model="generalSetting"
          :rules="modalFormRules"
          ref="formGeneralSettingRef"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_general_setting_header">
            <!--begin::Modal title-->
            <h2>{{ generalSetting.action }} General Setting</h2>
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
              id="kt_modal_new_general_setting_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_new_general_setting_header"
              data-kt-scroll-wrappers="#kt_modal_new_general_setting_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2">Type</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="type_id">
                  <el-select
                    v-model="generalSetting.type_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in generalSettingsOptions.types"
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
              <div class="d-flex flex-column mb-3 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2">Group</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="group_id">
                  <el-select
                    v-model="generalSetting.group_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in generalSettingsOptions.groups"
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
              <div class="d-flex flex-column mb-3 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Name</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="name">
                  <el-input
                    v-model="generalSetting.name"
                    placeholder="name"
                    name="name"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-3 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Short Name</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="short_name">
                  <el-input
                    v-model="generalSetting.short_name"
                    placeholder="short_name"
                    name="short_name"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-3 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span>Description</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="description">
                  <el-input
                    v-model="generalSetting.description"
                    placeholder="Description"
                    name="description"
                    :rows="3"
                    type="textarea"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-3 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span>Value</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="value">
                  <el-input
                    v-model="generalSetting.value"
                    placeholder="value"
                    name="value"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-3 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span>Entity ID</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="entity_id">
                  <el-input
                    v-model="generalSetting.entity_id"
                    placeholder="Entity ID"
                    name="entity_id"
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
              id="kt_modal_add_general_setting_cancel"
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
              id="kt_modal_new_general_setting_submit"
              class="btn btn-primary btn-sm"
              :data-kt-indicator="refData.loadingAction ? 'on' : null"
              :disabled="refData.loadingAction"
            >
              <span v-if="!refData.loadingAction" class="indicator-label">
                {{ generalSetting.action === "Add" ? "Add" : "Update" }}
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
  <!--Add generalSetting Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAdminSettingStore } from "@/stores/admin/setting";
import { hideModal } from "@/core/helpers/dom";

import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import useOutputFormat from "@/composables/useOutputFormat";

export default defineComponent({
  name: "admin-manage-general-settings",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //admin settings store
    const settingStore = useAdminSettingStore();
    const {
      generalSettings,
      meta,
      loadingSettingsData,
      generalSettingsOptions,
      unauthorized,
    } = storeToRefs(settingStore);
    const { getGeneralSettings, getGeneralSettingOptions } =
      useAdminSettingStore();

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
        columnLabel: "description",
        columnName: "description",
        sortEnabled: true,
      },
      {
        columnLabel: "value",
        columnName: "value",
        sortEnabled: false,
      },
      {
        columnLabel: "group",
        columnName: "group",
        sortEnabled: true,
      },
      {
        columnLabel: "type",
        columnName: "type",
        sortEnabled: true,
      },
      {
        columnLabel: "updated_at",
        columnName: "Last Updated",
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

    const generalSetting = ref({
      id: 0,
      action: "Add",
      name: "",
      type_id: "",
      group_id: "",
      short_name: "",
      description: "",
      value: "",
      entity_id: "",
    } as any);

    const formGeneralSettingRef = ref<null | HTMLFormElement>(null);
    const generalSettingModalRef = ref<null | HTMLElement>(null);
    const modalFormRules = ref({
      name: [
        {
          required: true,
          message: "Name is required",
          trigger: "change",
        },
      ],
      short_name: [
        {
          required: true,
          message: "Short name is required",
          trigger: "change",
        },
      ],
      type_id: [
        {
          required: true,
          message: "Type is required",
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
      value: [
        {
          required: true,
          message: "Value is required",
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

    const processGeneralSettingAction = () => {
      if (!formGeneralSettingRef.value) {
        return;
      }

      formGeneralSettingRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          switch (generalSetting.value.action) {
            case "Add":
              settingStore
                .addGeneralSettings(generalSetting.value)

                .then(() => {
                  getGeneralSettings(table_options.value);

                  hideModal(generalSettingModalRef.value);

                  Message({
                    message: "Data added successfully.",
                    position: "bottom-right",
                    type: "success",
                    duration: 5000,
                    zIndex: 99999,
                  });
                })
                .finally(() => (refData.value.loadingAction = false));
              break;
            case "Edit":
              settingStore
                .updateGeneralSettings(generalSetting.value)
                .then(() => {
                  refData.value.loadingAction = false;

                  getGeneralSettings(table_options.value);

                  hideModal(generalSettingModalRef.value);

                  Message({
                    message: "Data updated successfully.",
                    position: "bottom-right",
                    type: "success",
                    duration: 5000,
                    zIndex: 99999,
                  });
                })
                .catch((error) => {
                  // get errors from state
                  const response = error.response.data;

                  if (response.errors) {
                    const errors = response.errors;
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
      getGeneralSettings(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getGeneralSettings(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getGeneralSettings(table_options.value);
    };

    //modals
    const showAddGeneralSettingModal = (action, data) => {
      if (action === "Add") {
        generalSetting.value.name = "";
        generalSetting.value.type_id = "";
        generalSetting.value.group_id = "";
        generalSetting.value.short_name = "";
        generalSetting.value.description = "";
        generalSetting.value.value = "";
        generalSetting.value.entity_id = "";
      } else {
        generalSetting.value = data;
      }

      generalSetting.value.action = action;
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getGeneralSettings(table_options.value);
      getGeneralSettingOptions();
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
          getGeneralSettings(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    //output formatting
    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();
    return {
      //variables
      refData,
      generalSettingModalRef,
      formGeneralSettingRef,
      modalFormRules,
      tableHeader,
      table_options,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      processGeneralSettingAction,
      searchRecords,

      //modals
      showAddGeneralSettingModal,

      //api
      generalSetting,

      //state
      meta,
      generalSettings,
      loadingSettingsData,
      generalSettingsOptions,
      unauthorized,

      //output formatting
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,
    };
  },
});
</script>
