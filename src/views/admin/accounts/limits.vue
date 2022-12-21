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
            data-bs-target="#kt_modal_add_account_limit"
            @click="showAddAccountLimitModal('Add', {})"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add Account Limit
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
        :data="accountLimits"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingAccountData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:id="{ row: data }">
          {{ data.id }}
        </template>

        <template v-slot:type="{ row: data }">
          {{ data.type.name }}
        </template>
        <template v-slot:account_type="{ row: data }">
          {{ data.account_type.name }}
        </template>

        <template v-slot:direction="{ row: data }">
          {{ data.direction }}
        </template>
        <template v-slot:currency="{ row: data }">
          {{ data.currency.code }}
        </template>
        <template v-slot:value="{ row: data }">
          {{ data.value }}
        </template>
        <template v-slot:account_no="{ row: data }">
          {{ data.account_no }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            @click="showAddAccountLimitModal('Edit', data)"
            data-bs-toggle="modal"
            id="edit-btn"
            data-bs-target="#kt_modal_add_account_limit"
          >
            View/Edit
          </button>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <!--Add accountLimit Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_account_limit"
    ref="accountLimitModalRef"
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
          @submit.prevent="processAccountLimitAction()"
          :model="accountLimit"
          :rules="modalFormRules"
          ref="formAccountLimitRef"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_account_limit_header">
            <!--begin::Modal title-->
            <h2>{{ accountLimit.action }} Account Limits</h2>
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
              id="kt_modal_new_account_limit_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_new_account_limit_header"
              data-kt-scroll-wrappers="#kt_modal_new_account_limit_scroll"
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
                    v-model="accountLimit.account_type_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in accountLimitOptions.account_types"
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
                <label class="required fs-5 fw-semobold mb-2">Limit Type</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="type_id">
                  <el-select
                    v-model="accountLimit.type_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in accountLimitOptions.types"
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
                  <span class="required">Payment Direction</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="direction">
                  <el-input
                    v-model="accountLimit.direction"
                    placeholder="Payment Direction"
                    name="direction"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2">Currency</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="currency_id">
                  <el-select
                    v-model="accountLimit.currency_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in accountLimitOptions.currencies"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      :disabled="refData.loadingAction"
                    /> </el-select
                ></el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Value</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="value">
                  <el-input
                    v-model="accountLimit.value"
                    placeholder="value"
                    name="value"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span
                    >Account No (Optional. for Account specific limits)</span
                  >
                </label>
                <!--end::Label-->

                <el-form-item prop="account_no">
                  <el-input
                    v-model="accountLimit.account_no"
                    placeholder="Account No - Optional"
                    name="account_no"
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
              id="kt_modal_add_account_limit_cancel"
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
              id="kt_modal_new_account_limit_submit"
              class="btn btn-primary btn-sm"
              :data-kt-indicator="refData.loadingAction ? 'on' : null"
            >
              <span v-if="!refData.loadingAction" class="indicator-label">
                {{ accountLimit.action === "Add" ? "Add" : "Update" }}
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
  <!--Add accountLimit Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAdminAccountStore } from "@/stores/admin/account";
import { hideModal } from "@/core/helpers/dom";

import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";

export default defineComponent({
  name: "admin-accounts-limits",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //admin account limits store
    const accountStore = useAdminAccountStore();
    const { accountLimits, meta, loadingAccountData, accountLimitOptions } =
      storeToRefs(accountStore);
    const { getAccountLimits, getAccountLimitOptions } = useAdminAccountStore();

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
        columnLabel: "type",
        columnName: "type",
        sortEnabled: true,
      },
      {
        columnLabel: "account_type",
        columnName: "account_type",
        sortEnabled: true,
      },
      {
        columnLabel: "direction",
        columnName: "payment method",
        sortEnabled: false,
      },
      {
        columnLabel: "currency",
        columnName: "currency",
        sortEnabled: true,
      },
      {
        columnLabel: "value",
        columnName: "value",
        sortEnabled: true,
      },
      {
        columnLabel: "account_no",
        columnName: "account_no",
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

    const accountLimit = ref({
      id: 0,
      action: "Add",
      account_type_id: "",
      currency_id: "",
      type_id: "",
      direction: "",
      value: "",
    } as any);

    const formAccountLimitRef = ref<null | HTMLFormElement>(null);
    const accountLimitModalRef = ref<null | HTMLElement>(null);
    const modalFormRules = ref({
      direction: [
        {
          required: true,
          message: "Payment Direction is required",
          trigger: "change",
        },
      ],
      type_id: [
        {
          required: true,
          message: "Limit type is required",
          trigger: "change",
        },
      ],
      account_type_id: [
        {
          required: true,
          message: "Account Type is required",
          trigger: "change",
        },
      ],
      currency_id: [
        {
          required: true,
          message: "Currency is required",
          trigger: "change",
        },
      ],
      value: [
        {
          required: true,
          message: "Amount is required",
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

    const processAccountLimitAction = () => {
      if (!formAccountLimitRef.value) {
        return;
      }

      formAccountLimitRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          switch (accountLimit.value.action) {
            case "Add":
              accountStore
                .addAccountLimit(accountLimit.value)
                .then(() => {
                  getAccountLimits(table_options.value);

                  hideModal(accountLimitModalRef.value);

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
              accountStore
                .updateAccountLimit(accountLimit.value)
                .then(() => {
                  refData.value.loadingAction = false;

                  getAccountLimits(table_options.value);

                  hideModal(accountLimitModalRef.value);

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
      getAccountLimits(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getAccountLimits(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getAccountLimits(table_options.value);
    };

    //modals
    const showAddAccountLimitModal = (action, data) => {
      if (action === "Add") {
        accountLimit.value.account_type_id = "";
        accountLimit.value.currency_id = "";
        accountLimit.value.type_id = "";
        accountLimit.value.direction = "";
        accountLimit.value.value = "";
        accountLimit.value.account_no = "";
      } else {
        accountLimit.value = data;
        accountLimit.value.value = parseFloat(data.value).toFixed(2);
      }

      accountLimit.value.action = action;
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getAccountLimits(table_options.value);
      getAccountLimitOptions();
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
          getAccountLimits(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      //variables
      refData,
      accountLimitModalRef,
      formAccountLimitRef,
      modalFormRules,
      tableHeader,
      table_options,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      processAccountLimitAction,
      searchRecords,

      //modals
      showAddAccountLimitModal,

      //api
      accountLimit,

      //state
      meta,
      accountLimits,
      loadingAccountData,
      accountLimitOptions,
    };
  },
});
</script>
