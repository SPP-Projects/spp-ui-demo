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
            data-bs-target="#kt_modal_add_payment_map"
            @click="showAddInstitutionModal('Add', {})"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add Institution
          </button>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pt-0">
      {{ meta }}
      <KTDatatable
        :data="institutions"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingInstitutionData"
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
        <template v-slot:code="{ row: data }">
          {{ data.code }}
        </template>
        <template v-slot:validation_library="{ row: data }">
          {{ data.validation_library }}
        </template>
        <template v-slot:type="{ row: data }">
          {{ data.type.name }}
        </template>
        <template v-slot:status="{ row: data }">
          {{ data.status.name }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            @click="showAddInstitutionModal('Edit', data)"
            data-bs-toggle="modal"
            id="edit-btn"
            data-bs-target="#kt_modal_add_payment_map"
          >
            View/Edit
          </button>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <!--Add institution Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_payment_map"
    ref="institutionModalRef"
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
          @submit.prevent="processInstitutionAction()"
          :model="institution"
          :rules="modalFormRules"
          ref="formInstitutionRef"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_payment_map_header">
            <!--begin::Modal title-->
            <h2>{{ institution.action }} Details</h2>
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
              id="kt_modal_new_new_payment_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_new_payment_map_header"
              data-kt-scroll-wrappers="#kt_modal_new_new_payment_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Name</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="name">
                  <el-input
                    v-model="institution.name"
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
                  <span class="required">Code</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="code">
                  <el-input
                    v-model="institution.code"
                    placeholder="Code"
                    name="code"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Branch Code</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="branch_code">
                  <el-input
                    v-model="institution.branch_code"
                    placeholder="branch code"
                    name="branch_code"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Swift Code</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="swift_code">
                  <el-input
                    v-model="institution.swift_code"
                    placeholder="swift_code"
                    name="swift_code"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2"
                  >Institution Type</label
                >

                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="type_id">
                  <el-select v-model="institution.type_id" placeholder="Select">
                    <el-option
                      v-for="item in institutionTypes"
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
                <label class="required fs-5 fw-semobold mb-2">Status</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="status_id">
                  <el-select
                    v-model="institution.status_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in sppData.institutionStatuses"
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
              id="kt_modal_add_payment_map_cancel"
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
              id="kt_modal_new_new_payment_submit"
              class="btn btn-primary btn-sm"
              :data-kt-indicator="refData.loadingAction ? 'on' : null"
            >
              <span v-if="!refData.loadingAction" class="indicator-label">
                {{ institution.action === "Add" ? "Add" : "Update" }}
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
  <!--Add institution Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAdminInstitutionStore } from "@/stores/admin/institution";
import { hideModal } from "@/core/helpers/dom";

import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import sppData from "@/helpers/data";

export default defineComponent({
  name: "admin-payment-maps",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const institutionStore = useAdminInstitutionStore();
    const {
      institutions,
      meta,
      loadingInstitutionData,
      institutionTypes,
      unauthorized,
    } = storeToRefs(institutionStore);
    const { getInstitutions, getInstitutionTypes } = useAdminInstitutionStore();

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
        columnLabel: "code",
        columnName: "code",
        sortEnabled: false,
      },
      {
        columnLabel: "validation_library",
        columnName: "validation_library",
        sortEnabled: true,
      },

      {
        columnLabel: "type",
        columnName: "type",
        sortEnabled: true,
      },
      {
        columnLabel: "status",
        columnName: "status",
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

    const institution = ref({
      id: 0,
      action: "Add",
      payment_direction: "",
      institution_id: "",
      payment_method_id: "",
    } as any);

    const formInstitutionRef = ref<null | HTMLFormElement>(null);
    const institutionModalRef = ref<null | HTMLElement>(null);
    const modalFormRules = ref({
      name: [
        {
          required: true,
          message: "Name is required",
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
      status_id: [
        {
          required: true,
          message: "Status is required",
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

    const processInstitutionAction = () => {
      if (!formInstitutionRef.value) {
        return;
      }

      formInstitutionRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          switch (institution.value.action) {
            case "Add":
              institutionStore
                .addInstitution(institution.value)

                .then(() => {
                  getInstitutions(table_options.value);

                  hideModal(institutionModalRef.value);

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
              institutionStore
                .updateInstitution(institution.value)
                .then(() => {
                  refData.value.loadingAction = false;

                  getInstitutions(table_options.value);

                  hideModal(institutionModalRef.value);

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
      getInstitutions(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getInstitutions(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getInstitutions(table_options.value);
    };

    //modals

    const showAddInstitutionModal = (action, data) => {
      if (action === "Add") {
        institution.value.payment_direction = "";
        institution.value.institution_id = "";
        institution.value.payment_method_id = "";
      } else {
        institution.value = data;
      }
      institution.value.action = action;
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getInstitutions(table_options.value);
      getInstitutionTypes({
        current_page: 1,
        page_size: 10,
        search_text: "",
        sort: { column: "", direction: "" },
      });
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
          getInstitutions(table_options.value);

          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      //variables
      refData,
      institutionModalRef,
      formInstitutionRef,
      modalFormRules,
      tableHeader,
      meta,
      table_options,
      institution,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      processInstitutionAction,
      searchRecords,

      //modals
      showAddInstitutionModal,

      //sppdata
      sppData,

      //state
      institutions,
      loadingInstitutionData,
      institutionTypes,
      unauthorized,
    };
  },
});
</script>
