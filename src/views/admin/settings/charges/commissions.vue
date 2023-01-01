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
            @click="showAddTransactionCommissionModal('Add', {})"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add Transaction Commission Setting
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
        :data="transactionCommissionSettings"
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
        <template v-slot:account_no="{ row: data }">
          {{ data.account_no }}
        </template>
        <template v-slot:commission_percentage="{ row: data }">
          {{ data.commission_percentage }}
        </template>
        <template v-slot:min_amount="{ row: data }">
          {{ data.min_amount }}
        </template>
        <template v-slot:order="{ row: data }">
          {{ data.order }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            @click="showAddTransactionCommissionModal('Edit', data)"
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

  <!--Add transactionCommission Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_payment_map"
    ref="transactionCommissionModalRef"
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
          @submit.prevent="processTransactionCommissionAction()"
          :model="transactionCommission"
          :rules="modalFormRules"
          ref="formTransactionCommissionRef"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_payment_map_header">
            <!--begin::Modal title-->
            <h2>{{ transactionCommission.action }} Details</h2>
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
                  <span class="required">Account No</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="account_no">
                  <el-input
                    v-model="transactionCommission.account_no"
                    placeholder="account_no"
                    name="account_no"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Commission percentage</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="commission_percentage">
                  <el-input
                    v-model="transactionCommission.commission_percentage"
                    placeholder="commission percentage"
                    name="commission_percentage"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Min Amount</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="min_amount">
                  <el-input
                    v-model="transactionCommission.min_amount"
                    placeholder="min amount"
                    name="min_amount"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Order</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="order">
                  <el-input
                    v-model="transactionCommission.order"
                    placeholder="order"
                    name="order"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <div class="separator separator-dotted border-dark my-10"></div>

              <!--begin::Input group-->
              <!--              <div class="d-flex flex-column mb-5 fv-row">-->
              <!--                &lt;!&ndash;begin::Label&ndash;&gt;-->
              <!--                <label class="required fs-5 fw-semobold mb-2"-->
              <!--                  >Account To Charge</label-->
              <!--                >-->
              <!--                &lt;!&ndash;end::Label&ndash;&gt;-->

              <!--                &lt;!&ndash;begin::Input&ndash;&gt;-->
              <!--                <el-form-item prop="account_to_charge">-->
              <!--                  <el-select-->
              <!--                    v-model="transactionCommission.account_to_charge"-->
              <!--                    placeholder="Select"-->
              <!--                  >-->
              <!--                    <el-option-->
              <!--                      v-for="item in sppData.isDebitOrCredit"-->
              <!--                      :key="item.id"-->
              <!--                      :label="item.name"-->
              <!--                      :value="item.id"-->
              <!--                      :disabled="refData.loadingAction"-->
              <!--                    />-->
              <!--                  </el-select>-->
              <!--                </el-form-item>-->
              <!--                &lt;!&ndash;end::Input&ndash;&gt;-->
              <!--              </div>-->
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
                {{ transactionCommission.action === "Add" ? "Add" : "Update" }}
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
  <!--Add transactionCommission Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAdminTransactionStore } from "@/stores/admin/transaction";
import { hideModal } from "@/core/helpers/dom";

import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
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
      transactionCommissionSettings,
      meta,
      loadingTransactionData,
      unauthorized,
    } = storeToRefs(transactionStore);
    const { getTransactionCommissionSettings } = useAdminTransactionStore();

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
        columnLabel: "account_no",
        columnName: "account no",
        sortEnabled: true,
      },
      {
        columnLabel: "commission_percentage",
        columnName: "commission percentage",
        sortEnabled: false,
      },
      {
        columnLabel: "min_amount",
        columnName: "min amount",
        sortEnabled: true,
      },
      {
        columnLabel: "order",
        columnName: "order",
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

    const transactionCommission = ref({
      id: 0,
      action: "Add",

      account_no: "",
      commission_percentage: "",
      min_amount: "",
      order: "",

      charge_setting_id: "",
      direction: "",
      account_type_id: "",
    } as any);

    const formTransactionCommissionRef = ref<null | HTMLFormElement>(null);
    const transactionCommissionModalRef = ref<null | HTMLElement>(null);
    const modalFormRules = ref({
      account_no: [
        {
          required: true,
          message: "account_no is required",
          trigger: "change",
        },
      ],
      commission_percentage: [
        {
          required: true,
          message: "commission_percentage is required",
          trigger: "change",
        },
      ],
      min_amount: [
        {
          required: true,
          message: "min_amount is required",
          trigger: "change",
        },
      ],
      order: [
        {
          required: true,
          message: "order is required",
          trigger: "change",
        },
      ],
      charge_setting_id: [
        {
          required: true,
          message: "charge_setting_id is required",
          trigger: "change",
        },
      ],
      direction: [
        {
          required: true,
          message: "direction is required",
          trigger: "change",
        },
      ],
      account_type_id: [
        {
          required: true,
          message: "account_type_id is required",
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

    const processTransactionCommissionAction = () => {
      if (!formTransactionCommissionRef.value) {
        return;
      }

      formTransactionCommissionRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          switch (transactionCommission.value.action) {
            case "Add":
              transactionStore
                .addTransactionCommissionSetting(transactionCommission.value)

                .then(() => {
                  getTransactionCommissionSettings(table_options.value);

                  hideModal(transactionCommissionModalRef.value);

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
                .updateTransactionCommissionSetting(transactionCommission.value)
                .then(() => {
                  refData.value.loadingAction = false;

                  getTransactionCommissionSettings(table_options.value);

                  hideModal(transactionCommissionModalRef.value);

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
      getTransactionCommissionSettings(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getTransactionCommissionSettings(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getTransactionCommissionSettings(table_options.value);
    };

    //modals

    const showAddTransactionCommissionModal = (action, data) => {
      if (action === "Add") {
        transactionCommission.value.account_to_charge = "";
        transactionCommission.value.min_limit = "";
        transactionCommission.value.max_limit = "";
        transactionCommission.value.type = "";
        transactionCommission.value.charge = "";

        transactionCommission.value.debit_account_currency_id = "";
        transactionCommission.value.debit_account_institution_id = "";
        transactionCommission.value.debit_account_type_id = "";
        transactionCommission.value.debit_customer_group_id = "";
        transactionCommission.value.debit_account_no = "";

        transactionCommission.value.credit_account_currency_id = "";
        transactionCommission.value.credit_account_institution_id = "";
        transactionCommission.value.credit_account_type_id = "";
        transactionCommission.value.credit_customer_group_id = "";
        transactionCommission.value.credit_account_no = "";
      } else {
        transactionCommission.value = data;
      }
      transactionCommission.value.action = action;
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getTransactionCommissionSettings(table_options.value);

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
          getTransactionCommissionSettings(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      //variables
      refData,
      transactionCommissionModalRef,
      formTransactionCommissionRef,
      modalFormRules,
      tableHeader,
      meta,
      table_options,
      transactionCommission,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      processTransactionCommissionAction,
      searchRecords,

      //modals
      showAddTransactionCommissionModal,

      //spp
      sppData,

      //state
      transactionCommissionSettings,
      loadingTransactionData,
      unauthorized,
    };
  },
});
</script>
