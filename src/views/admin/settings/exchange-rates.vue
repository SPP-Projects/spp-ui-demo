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
            @click="showAddExchangeRateModal('Add', {})"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add Exchange Rate
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
        :data="exchangeRates"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingExchangeRateData"
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

        <template v-slot:quote_currency_code="{ row: data }">
          {{ data.quote_currency_code }}
        </template>
        <template v-slot:base_currency_code="{ row: data }">
          {{ data.base_currency_code }}
        </template>

        <template v-slot:rate="{ row: data }">
          {{ data.rate }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            @click="showAddExchangeRateModal('Edit', data)"
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

  <!--Add exchangeRate Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_payment_map"
    ref="exchangeRateModalRef"
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
          @submit.prevent="processExchangeRateAction()"
          :model="exchangeRate"
          :rules="modalFormRules"
          ref="formExchangeRateRef"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_payment_map_header">
            <!--begin::Modal title-->
            <h2>{{ exchangeRate.action }} Details</h2>
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
                  <span class="required">Base Currency</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="base_currency_code">
                  <el-input
                    v-model="exchangeRate.base_currency_code"
                    placeholder="base currency code"
                    name="base_currency_code"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Quote Currency</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="quote_currency_code">
                  <el-input
                    v-model="exchangeRate.quote_currency_code"
                    placeholder="quote currency code"
                    name="quote_currency_code"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Rate</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="rate">
                  <el-input
                    v-model="exchangeRate.rate"
                    placeholder="Rate"
                    name="Rate"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span>Account No.</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="account_no">
                  <el-input
                    v-model="exchangeRate.account_no"
                    placeholder="account no"
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
                {{ exchangeRate.action === "Add" ? "Add" : "Update" }}
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
  <!--Add exchangeRate Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";

import { hideModal } from "@/core/helpers/dom";
import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";

import { storeToRefs } from "pinia";
import { useAdminExchangeRateStore } from "@/stores/admin/exchange-rate";

export default defineComponent({
  name: "admin-payment-maps",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const exchangeRateStore = useAdminExchangeRateStore();
    const { exchangeRates, meta, loadingExchangeRateData } =
      storeToRefs(exchangeRateStore);
    const { getExchangeRates } = useAdminExchangeRateStore();

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
        columnLabel: "base_currency_code",
        columnName: "base currency",
        sortEnabled: true,
      },
      {
        columnLabel: "quote_currency_code",
        columnName: "quote currency",
        sortEnabled: false,
      },
      {
        columnLabel: "rate",
        columnName: "rate",
        sortEnabled: true,
      },
      {
        columnLabel: "account_no",
        columnName: "account no",
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

    const exchangeRate = ref({
      id: 0,
      action: "Add",
      base_currency_code: "",
      account_no: "",
      quote_currency_code: "",
      rate: "",
    } as any);

    const formExchangeRateRef = ref<null | HTMLFormElement>(null);
    const exchangeRateModalRef = ref<null | HTMLElement>(null);
    const modalFormRules = ref({
      base_currency_code: [
        {
          required: true,
          message: "base_currency_code is required",
          trigger: "change",
        },
      ],
      rate: [
        {
          required: true,
          message: "Rate is required",
          trigger: "change",
        },
      ],
      quote_currency_code: [
        {
          required: true,
          message: "quote_currency_code is required",
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

    const processExchangeRateAction = () => {
      if (!formExchangeRateRef.value) {
        return;
      }

      formExchangeRateRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          switch (exchangeRate.value.action) {
            case "Add":
              exchangeRateStore
                .addExchangeRate(exchangeRate.value)

                .then(() => {
                  getExchangeRates(table_options.value);

                  hideModal(exchangeRateModalRef.value);

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
              exchangeRateStore
                .updateExchangeRate(exchangeRate.value)
                .then(() => {
                  refData.value.loadingAction = false;

                  getExchangeRates(table_options.value);

                  hideModal(exchangeRateModalRef.value);

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
      getExchangeRates(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getExchangeRates(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getExchangeRates(table_options.value);
    };

    //modals

    const showAddExchangeRateModal = (action, data) => {
      if (action === "Add") {
        exchangeRate.value.base_currency_code = "";
        exchangeRate.value.account_no = "";
        exchangeRate.value.quote_currency_code = "";
        exchangeRate.value.rate = "";
      } else {
        exchangeRate.value = data;
      }
      exchangeRate.value.action = action;
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getExchangeRates(table_options.value);
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
          getExchangeRates(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      //variables
      refData,
      exchangeRateModalRef,
      formExchangeRateRef,
      modalFormRules,
      tableHeader,
      meta,
      table_options,
      exchangeRate,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      processExchangeRateAction,
      searchRecords,

      //modals
      showAddExchangeRateModal,

      //state
      exchangeRates,
      loadingExchangeRateData,
    };
  },
});
</script>
