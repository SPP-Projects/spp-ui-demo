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
            data-bs-target="#kt_modal_add_payment_map"
            @click="showAddTransactionChargeModal('Add', {})"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add Transaction Charge Setting
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
        :data="transactionChargeSettings"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingTransactionData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:id="{ row: data }">
          {{ data.id }}
        </template>

        <template v-slot:debit_conditions="{ row: data }">
          {{
            data.debit_account_currency
              ? "Currency: " + data.debit_account_currency.code
              : ""
          }}
          {{
            data.debit_account_institution
              ? ", Institution: " + data.debit_account_institution.name
              : ""
          }}
          {{
            data.debit_account_type
              ? ", Account Type: " + data.debit_account_type.name
              : ""
          }}
          {{
            data.debit_customer_group
              ? ", Customer Group: " + data.debit_customer_group.name
              : ""
          }}
          {{
            data.debit_account_no
              ? ", Account No: " + data.debit_account_no
              : ""
          }}
        </template>

        <template v-slot:credit_conditions="{ row: data }">
          {{
            data.credit_account_currency
              ? "Currency: " + data.credit_account_currency.code
              : ""
          }}
          {{
            data.credit_account_institution
              ? ", Institution: " + data.credit_account_institution.name
              : ""
          }}
          {{
            data.credit_account_type
              ? ", Account Type: " + data.credit_account_type.name
              : ""
          }}
          {{
            data.credit_customer_group
              ? ", Customer Group: " + data.credit_customer_group.name
              : ""
          }}
          {{
            data.credit_account_no
              ? ", Account No: " + data.credit_account_no
              : ""
          }}
        </template>

        <template v-slot:account_to_charge="{ row: data }">
          {{ data.account_to_charge }}
        </template>
        <template v-slot:min_limit="{ row: data }">
          {{ data.min_limit }}
        </template>
        <template v-slot:max_limit="{ row: data }">
          {{ data.max_limit }}
        </template>
        <template v-slot:charge="{ row: data }">
          {{ data.charge }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            @click="showAddTransactionChargeModal('Edit', data)"
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

  <!--Add transactionCharge Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_payment_map"
    ref="transactionChargeModalRef"
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
          @submit.prevent="processTransactionChargeAction()"
          :model="transactionCharge"
          :rules="modalFormRules"
          ref="formTransactionChargeRef"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_payment_map_header">
            <!--begin::Modal title-->
            <h2>{{ transactionCharge.action }} Details</h2>
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
                <label class="required fs-5 fw-semobold mb-2"
                  >Account To Charge</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="account_to_charge">
                  <el-select
                    v-model="transactionCharge.account_to_charge"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in sppData.isDebitOrCredit"
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
                  <span class="required">Min Limit</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="min_limit">
                  <el-input
                    v-model="transactionCharge.min_limit"
                    placeholder="min limit"
                    name="min_limit"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Max Limit</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="max_limit">
                  <el-input
                    v-model="transactionCharge.max_limit"
                    placeholder="max limit"
                    name="max_limit"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2"
                  >Charge type</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="type">
                  <el-select
                    v-model="transactionCharge.type"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in sppData.chargeType"
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
                  <span class="required">charge</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="Charge">
                  <el-input
                    v-model="transactionCharge.charge"
                    placeholder="charge"
                    name="charge"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <div class="separator separator-dotted border-dark my-10"></div>

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2"
                  >Debit Account Currency</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="debit_account_currency_id">
                  <el-select
                    v-model="transactionCharge.debit_account_currency_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in transactionChargeSettingOptions.currencies"
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
                  >Debit Account Institution</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="debit_account_institution_id">
                  <el-select
                    v-model="transactionCharge.debit_account_institution_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in transactionChargeSettingOptions.institutions"
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
                <el-form-item prop="debit_account_type_id">
                  <el-select
                    v-model="transactionCharge.debit_account_type_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in transactionChargeSettingOptions.account_types"
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
                  >Debit Customer Group</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="debit_customer_group_id">
                  <el-select
                    v-model="transactionCharge.debit_customer_group_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in transactionChargeSettingOptions.customer_groups"
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
                  <span>Debit Account Number (Optional)</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="debit_account_no">
                  <el-input
                    v-model="transactionCharge.debit_account_no"
                    placeholder="debit_account_no"
                    name="debit_account_no"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <div class="separator separator-dotted border-dark my-10"></div>

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2"
                  >Credit Account Currency</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="credit_account_currency_id">
                  <el-select
                    v-model="transactionCharge.credit_account_currency_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in transactionChargeSettingOptions.currencies"
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
                  >Credit Account Institution</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="credit_account_institution_id">
                  <el-select
                    v-model="transactionCharge.credit_account_institution_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in transactionChargeSettingOptions.institutions"
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
                <el-form-item prop="credit_account_type_id">
                  <!--                  :key="item.id"-->
                  <el-select
                    v-model="transactionCharge.credit_account_type_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="(
                        item, index
                      ) in transactionChargeSettingOptions.account_types"
                      :key="index"
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
                  >Credit Customer Group</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="credit_customer_group_id">
                  <el-select
                    v-model="transactionCharge.credit_customer_group_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in transactionChargeSettingOptions.customer_groups"
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
                  <span>Credit Account Number (Optional)</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="credit_account_no">
                  <el-input
                    v-model="transactionCharge.credit_account_no"
                    placeholder="credit_account_no"
                    name="credit_account_no"
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
                {{ transactionCharge.action === "Add" ? "Add" : "Update" }}
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
  <!--Add transactionCharge Modal-->
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
    const transactionStore = useAdminTransactionStore();
    const {
      transactionChargeSettings,
      meta,
      loadingTransactionData,
      transactionChargeSettingOptions,
    } = storeToRefs(transactionStore);
    const { getTransactionChargeSettings, getTransactionChargeSettingOptions } =
      useAdminTransactionStore();

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
        columnLabel: "debit_conditions",
        columnName: "debit conditions",
        sortEnabled: true,
      },
      {
        columnLabel: "credit_conditions",
        columnName: "credit conditions",
        sortEnabled: false,
      },
      {
        columnLabel: "account_to_charge",
        columnName: "account to charge",
        sortEnabled: true,
      },
      {
        columnLabel: "min_limit",
        columnName: "min limit",
        sortEnabled: true,
      },
      {
        columnLabel: "max_limit",
        columnName: "max limit",
        sortEnabled: true,
      },
      {
        columnLabel: "charge",
        columnName: "charge",
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

    const transactionCharge = ref({
      id: 0,
      action: "Add",
      account_to_charge: "",
      min_limit: "",
      max_limit: "",
      type: "",
      charge: "",

      debit_account_currency_id: "",
      debit_account_institution_id: "",
      debit_account_type_id: "",
      debit_customer_group_id: "",
      debit_account_no: "",

      credit_account_currency_id: "",
      credit_account_institution_id: "",
      credit_account_type_id: "",
      credit_customer_group_id: "",
      credit_account_no: "",
    } as any);

    const formTransactionChargeRef = ref<null | HTMLFormElement>(null);
    const transactionChargeModalRef = ref<null | HTMLElement>(null);
    const modalFormRules = ref({
      account_to_charge: [
        {
          required: true,
          message: "account_to_charge is required",
          trigger: "change",
        },
      ],
      min_limit: [
        {
          required: true,
          message: "min_limit is required",
          trigger: "change",
        },
      ],
      max_limit: [
        {
          required: true,
          message: "max_limit is required",
          trigger: "change",
        },
      ],
      type: [
        {
          required: true,
          message: "type is required",
          trigger: "change",
        },
      ],
      charge: [
        {
          required: true,
          message: "charge is required",
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

    const processTransactionChargeAction = () => {
      if (!formTransactionChargeRef.value) {
        return;
      }

      formTransactionChargeRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          switch (transactionCharge.value.action) {
            case "Add":
              transactionStore
                .addTransactionChargeSetting(transactionCharge.value)

                .then(() => {
                  getTransactionChargeSettings(table_options.value);

                  hideModal(transactionChargeModalRef.value);

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
                .updateTransactionChargeSetting(transactionCharge.value)
                .then(() => {
                  refData.value.loadingAction = false;

                  getTransactionChargeSettings(table_options.value);

                  hideModal(transactionChargeModalRef.value);

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
      getTransactionChargeSettings(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getTransactionChargeSettings(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getTransactionChargeSettings(table_options.value);
    };

    //modals

    const showAddTransactionChargeModal = (action, data) => {
      if (action === "Add") {
        transactionCharge.value.account_to_charge = "";
        transactionCharge.value.min_limit = "";
        transactionCharge.value.max_limit = "";
        transactionCharge.value.type = "";
        transactionCharge.value.charge = "";

        transactionCharge.value.debit_account_currency_id = "";
        transactionCharge.value.debit_account_institution_id = "";
        transactionCharge.value.debit_account_type_id = "";
        transactionCharge.value.debit_customer_group_id = "";
        transactionCharge.value.debit_account_no = "";

        transactionCharge.value.credit_account_currency_id = "";
        transactionCharge.value.credit_account_institution_id = "";
        transactionCharge.value.credit_account_type_id = "";
        transactionCharge.value.credit_customer_group_id = "";
        transactionCharge.value.credit_account_no = "";
      } else {
        transactionCharge.value = data;
      }
      transactionCharge.value.action = action;
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getTransactionChargeSettings(table_options.value);
      getTransactionChargeSettingOptions();
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
          getTransactionChargeSettings(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      //variables
      refData,
      transactionChargeModalRef,
      formTransactionChargeRef,
      modalFormRules,
      tableHeader,
      meta,
      table_options,
      transactionCharge,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      processTransactionChargeAction,
      searchRecords,

      //modals
      showAddTransactionChargeModal,

      //spp
      sppData,

      //state
      transactionChargeSettings,
      loadingTransactionData,
      transactionChargeSettingOptions,
    };
  },
});
</script>
