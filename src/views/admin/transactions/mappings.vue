<template>
  <!--begin::Card-->
  <PermissionDenied v-if="refData.unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />
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
            <span class="me-2">
              Showing {{ meta.from }} to {{ meta.to }} of
              {{ meta.total }}
            </span>
          </div>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_transaction_mapping"
            @click="showAddTransactionTypeAccountsMappingModal('Add', {})"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add Transaction Type Accounts Mapping
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
        :data="transactionTypeAccountMappings"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingMappingData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:id="{ row: data }">
          {{ data.id }}
        </template>

        <template v-slot:transaction_type="{ row: data }">
          {{ data.transaction_type.name }}
        </template>
        <template v-slot:debit_institution_type="{ row: data }">
          {{ data.debit_institution_type.name }}
        </template>
        <template v-slot:debit_account_type="{ row: data }">
          {{ data.debit_account_type.name }}
        </template>
        <template v-slot:credit_institution_type="{ row: data }">
          {{ data.credit_institution_type.name }}
        </template>
        <template v-slot:credit_account_type="{ row: data }">
          {{ data.credit_account_type.name }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            @click="showAddTransactionTypeAccountsMappingModal('Edit', data)"
            data-bs-toggle="modal"
            id="edit-btn"
            data-bs-target="#kt_modal_add_transaction_mapping"
          >
            View/Edit
          </button>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <!--Add transactionTypeAccountMapping Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_transaction_mapping"
    ref="transactionTypeAccountMappingModalRef"
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
          @submit.prevent="processTransactionTypeAccountsMappingAction()"
          :model="transactionTypeAccountMapping"
          :rules="modalFormRules"
          ref="formTransactionTypeAccountsMappingRef"
        >
          <!--begin::Modal header-->
          <div
            class="modal-header"
            id="kt_modal_new_transaction_mapping_header"
          >
            <!--begin::Modal title-->
            <h2>{{ transactionTypeAccountMapping.action }} Details</h2>
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
              id="kt_modal_new_transaction_mapping_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_new_transaction_mapping_header"
              data-kt-scroll-wrappers="#kt_modal_new_transaction_mapping_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2"
                  >Transaction Type</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="transaction_type_id">
                  <el-select
                    v-model="transactionTypeAccountMapping.transaction_type_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in transactionTypes"
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
                <label class="required fs-5 fw-semobold mb-2"
                  >Debit Institution Type</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="dr_institution_type_id">
                  <el-select
                    v-model="
                      transactionTypeAccountMapping.dr_institution_type_id
                    "
                    placeholder="Select"
                  >
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
                <label class="required fs-5 fw-semobold mb-2"
                  >Debit Account Type</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="dr_account_type_id">
                  <el-select
                    v-model="transactionTypeAccountMapping.dr_account_type_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in transactionOptions.account_types"
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
                <label class="required fs-5 fw-semobold mb-2"
                  >Credit Institution Type</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="cr_institution_type_id">
                  <el-select
                    v-model="
                      transactionTypeAccountMapping.cr_institution_type_id
                    "
                    placeholder="Select"
                  >
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
                <label class="required fs-5 fw-semobold mb-2"
                  >Credit Account Type</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="cr_account_type_id">
                  <el-select
                    v-model="transactionTypeAccountMapping.cr_account_type_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in transactionOptions.account_types"
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
              id="kt_modal_add_transaction_mapping_cancel"
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
              id="kt_modal_new_transaction_mapping_submit"
              class="btn btn-primary btn-sm"
              :data-kt-indicator="refData.loadingAction ? 'on' : null"
            >
              <span v-if="!refData.loadingAction" class="indicator-label">
                {{
                  transactionTypeAccountMapping.action === "Add"
                    ? "Add"
                    : "Update"
                }}
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
  <!--Add transactionTypeAccountMapping Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";

import { hideModal } from "@/core/helpers/dom";
import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";

import { storeToRefs } from "pinia";
import { useAdminTransactionStore } from "@/stores/admin/transaction";
import { useAdminInstitutionStore } from "@/stores/admin/institution";

export default defineComponent({
  name: "admin-transaction-type-accounts-mapping",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //admin transaction store
    const transactionStore = useAdminTransactionStore();
    const {
      transactionTypeAccountMappings,
      meta,
      loadingMappingData,
      transactionOptions,
      transactionTypes,
    } = storeToRefs(transactionStore);
    const {
      getTransactionTypeAccountsMappings,
      getTransactionChargeOptions,
      getTransactionTypes,
    } = useAdminTransactionStore();

    //admin institution type
    const institutionStore = useAdminInstitutionStore();
    const { institutionTypes } = storeToRefs(institutionStore);
    const { getInstitutionTypes } = useAdminInstitutionStore();
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
        columnLabel: "transaction_type",
        columnName: "transaction type",
        sortEnabled: true,
      },
      {
        columnLabel: "debit_institution_type",
        columnName: "debit institution type",
        sortEnabled: false,
      },
      {
        columnLabel: "debit_account_type",
        columnName: "debit account type",
        sortEnabled: true,
      },
      {
        columnLabel: "credit_institution_type",
        columnName: "credit institution type",
        sortEnabled: true,
      },
      {
        columnLabel: "credit_account_type",
        columnName: "credit account type",
        sortEnabled: true,
      },
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

    const transactionTypeAccountMapping = ref({
      id: 0,
      action: "Add",
      transaction_type_id: "",
      dr_institution_type_id: "",
      dr_account_type_id: "",
      cr_institution_type_id: "",
      cr_account_type_id: "",
    } as any);

    const formTransactionTypeAccountsMappingRef = ref<null | HTMLFormElement>(
      null
    );
    const transactionTypeAccountMappingModalRef = ref<null | HTMLElement>(null);
    const modalFormRules = ref({
      transaction_type_id: [
        {
          required: true,
          message: "transaction_type_id is required",
          trigger: "change",
        },
      ],
      dr_institution_type_id: [
        {
          required: true,
          message: "dr_institution_type_id is required",
          trigger: "change",
        },
      ],
      dr_account_type_id: [
        {
          required: true,
          message: "dr_account_type_id is required",
          trigger: "change",
        },
      ],
      cr_institution_type_id: [
        {
          required: true,
          message: "cr_institution_type_id is required",
          trigger: "change",
        },
      ],
      cr_account_type_id: [
        {
          required: true,
          message: "cr_account_type_id is required",
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

    const processTransactionTypeAccountsMappingAction = () => {
      if (!formTransactionTypeAccountsMappingRef.value) {
        return;
      }

      formTransactionTypeAccountsMappingRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          switch (transactionTypeAccountMapping.value.action) {
            case "Add":
              transactionStore
                .addTransactionTypeAccountsMapping(
                  transactionTypeAccountMapping.value
                )

                .then(() => {
                  getTransactionTypeAccountsMappings(table_options.value);

                  hideModal(transactionTypeAccountMappingModalRef.value);

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
              transactionStore
                .updateTransactionTypeAccountsMapping(
                  transactionTypeAccountMapping.value
                )
                .then(() => {
                  refData.value.loadingAction = false;

                  getTransactionTypeAccountsMappings(table_options.value);

                  hideModal(transactionTypeAccountMappingModalRef.value);

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
                        //position: "bottom-right",
                        type: "error",
                        duration: 5000,
                        zIndex: 99999,
                      });
                    }
                  } else if (response.error) {
                    Message({
                      message: response.error,
                      //TBC
                      //position: "bottom-right",
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
      getTransactionTypeAccountsMappings(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getTransactionTypeAccountsMappings(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getTransactionTypeAccountsMappings(table_options.value);
    };

    //modals

    const showAddTransactionTypeAccountsMappingModal = (action, data) => {
      if (action === "Add") {
        transactionTypeAccountMapping.value.transaction_type_id = "";
        transactionTypeAccountMapping.value.dr_institution_type_id = "";
        transactionTypeAccountMapping.value.dr_account_type_id = "";
        transactionTypeAccountMapping.value.cr_institution_type_id = "";
        transactionTypeAccountMapping.value.cr_account_type_id = "";
      } else {
        transactionTypeAccountMapping.value = data;
      }
      transactionTypeAccountMapping.value.action = action;
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getTransactionTypeAccountsMappings(table_options.value);
      getTransactionChargeOptions();
      getTransactionTypes({
        current_page: 1,
        page_size: 100,
        search_text: "",
        sort: { column: "", direction: "" },
      });
      getInstitutionTypes({
        current_page: 1,
        page_size: 100,
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
          getTransactionTypeAccountsMappings(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      //variables
      refData,
      transactionTypeAccountMappingModalRef,
      formTransactionTypeAccountsMappingRef,
      modalFormRules,
      tableHeader,
      meta,
      table_options,
      transactionTypeAccountMapping,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      processTransactionTypeAccountsMappingAction,
      searchRecords,

      //modals
      showAddTransactionTypeAccountsMappingModal,

      //state
      transactionTypeAccountMappings,
      loadingMappingData,
      transactionOptions,
      transactionTypes,
      institutionTypes,
    };
  },
});
</script>
