<template>
  <!--begin::Card-->
  <PermissionDenied v-if="unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />

  <div class="card" v-else>
    <!--begin::Card header-->

    <div class="card-header border-0 pt-1">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <el-input
            type="text"
            class="me-5"
            data-kt-subscription-table-filter="search"
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
            data-bs-target="#kt_modal_add_account"
            @click="showAddAddAccountModal('Add', {})"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add Account
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
        :data="accounts"
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
        <template v-slot:name_on_account="{ row: data }">
          {{ data.name_on_account }} <br />
          Customer: {{ data.customer.name }}
        </template>

        <template v-slot:type="{ row: data }">
          {{ data.type.name }}
        </template>
        <template v-slot:institution="{ row: data }">
          {{ data.institution.name }}
        </template>
        <template v-slot:actual_balance="{ row: data }">
          {{ data.currency.code }}
          {{ formatCurrencyAmount(data.actual_balance) }}
        </template>
        <template v-slot:created_at="{ row: data }">
          {{ formatDateTime(data.created_at) }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info me-5"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_view_account"
            @click="viewTransaction(data)"
          >
            View
          </button>
          <button
            class="btn btn-sm btn-light-success"
            @click="showAddAddAccountModal('Edit', data)"
            data-bs-toggle="modal"
            id="edit-btn"
            data-bs-target="#kt_modal_add_account"
          >
            Edit
          </button>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <!--View Account Modal-->
  <div
    class="modal fade"
    id="kt_modal_view_account"
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
        <div class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
          <div data-kt-stepper-element="content">
            <!--begin::Wrapper-->
            <div class="w-100" v-if="account.id">
              <!--begin::Heading-->
              <div class="pb-12">
                <!--begin::Title-->
                <h1 class="fw-bold text-dark">Account #: {{ account.id }}</h1>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
            </div>
            <!--end::Wrapper-->
          </div>
          <div v-if="account.id">
            <!--  General Info -->
            <div
              class="py-2 border-bottom border-bottom-dashed border-gray-300"
            >
              <div class="ms">
                <span
                  class="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                >
                  General
                </span>
              </div>
              <div class="flex-equal table-responsive">
                <table class="table table-flush fw-semobold gy-1">
                  <tbody>
                    <tr>
                      <td class="text-muted">Name</td>
                      <td class="text-gray-800">
                        {{ account.name_on_account }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Type</td>
                      <td class="text-gray-800">
                        {{ account.type.name }}
                      </td>
                    </tr>

                    <tr>
                      <td class="text-muted">Created At</td>
                      <td class="text-gray-800">
                        {{ account.created_at }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Last Updated At</td>
                      <td class="text-gray-800">
                        {{ account.updated_at }}
                      </td>
                    </tr>
                    <!--                    TODO-->
                    <tr>
                      <td class="text-muted">Status - TODO</td>
                      <td class="text-gray-800">
                        {{ account.status_id }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--  General Info -->

            <!--  Debit Info -->
            <div
              class="py-2 border-bottom border-bottom-dashed border-gray-300"
            >
              <div class="ms">
                <span
                  class="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                >
                  Standing
                </span>
              </div>
              <div class="flex-equal table-responsive">
                <table class="table table-flush fw-semobold gy-1">
                  <tbody>
                    <tr>
                      <td class="text-muted">Currency</td>
                      <td class="text-gray-800">
                        {{ account.currency.code }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Balance</td>
                      <td class="text-gray-800">
                        {{ account.actual_balance }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--  Debit Info -->

            <!--  Credit Info -->
            <div
              class="py-2 border-bottom border-bottom-dashed border-gray-300"
            >
              <div class="ms">
                <span
                  class="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                >
                  Holder
                </span>
              </div>
              <div class="flex-equal table-responsive">
                <table class="table table-flush fw-semobold gy-1">
                  <tbody>
                    <tr>
                      <td class="text-muted">Customer</td>
                      <td class="text-gray-800">
                        {{ account.customer.name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Contact</td>
                      <td class="text-gray-800">
                        {{ account.customer.phone }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Institution</td>
                      <td class="text-gray-800">
                        {{ account.institution.name }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--  Credit Info -->

            <!--  Charge Info -->
            <!--            TODO - SPP-->
            <!--            GET CHARGE DETAILS-->
            <div
              class="py-2 border-bottom border-bottom-dashed border-gray-300"
              v-if="account.charge"
            >
              <div class="ms">
                <span
                  class="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                >
                  Charge
                </span>
              </div>
              <div class="flex-equal table-responsive">
                <table class="table table-flush fw-semobold gy-1">
                  <tbody>
                    <tr v-if="account.charge.amount">
                      <td class="text-muted">Amount</td>
                      <td class="text-gray-800">
                        {{ account.charge.amount }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--  Charge Info -->
          </div>
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--View Account Modal-->

  <!--Add addAccount Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_account"
    ref="addAccountModalRef"
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
          @submit.prevent="processAddAccountAction()"
          :model="account"
          :rules="modalFormRules"
          ref="formAddAccountRef"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_account_header">
            <!--begin::Modal title-->
            <h2>{{ account.action }} Account</h2>
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
              id="kt_modal_new_account_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_new_account_header"
              data-kt-scroll-wrappers="#kt_modal_new_account_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Account Name</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="name_on_account">
                  <el-input
                    v-model="account.name_on_account"
                    placeholder="Account Name"
                    name="name_on_account"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2">Customer</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="customer_id">
                  <el-select v-model="account.customer_id" placeholder="Select">
                    <el-option
                      v-for="item in customers"
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
                  >Account Type</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="type_id">
                  <el-select v-model="account.type_id" placeholder="Select">
                    <el-option
                      v-for="item in accountOptions.types"
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
                  >Account Group</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="group_id">
                  <el-select v-model="account.group_id" placeholder="Select">
                    <el-option
                      v-for="item in accountOptions.groups"
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
                  >Institution</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="institution_id">
                  <el-select
                    v-model="account.institution_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in sppData.institutions"
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
                <label class="required fs-5 fw-semobold mb-2">Currency</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="currency_id">
                  <el-select v-model="account.currency_id" placeholder="Select">
                    <el-option
                      v-for="item in accountOptions.currencies"
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
              id="kt_modal_add_account_cancel"
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
              id="kt_modal_new_account_submit"
              class="btn btn-primary btn-sm"
              :data-kt-indicator="refData.loadingAction ? 'on' : null"
              :disabled="refData.loadingAction"
            >
              <span v-if="!refData.loadingAction" class="indicator-label">
                {{ account.action === "Add" ? "Add" : "Update" }}
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
  <!--Add addAccount Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useAdminAccountStore } from "@/stores/admin/account";
import { useAdminCustomerStore } from "@/stores/admin/customer";
import { useAdminInstitutionStore } from "@/stores/admin/institution";
import { hideModal } from "@/core/helpers/dom";

import sppData from "@/helpers/data";
import { storeToRefs } from "pinia";

import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import PageLoader from "@/components/PageLoader.vue";
import PermissionDenied from "@/components/PermissionDenied.vue";

import Message from "vue-m-message";
import useOutputFormat from "@/composables/useOutputFormat";
export default defineComponent({
  name: "accounts-list",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //admin account store

    const accountStore = useAdminAccountStore();
    const { getAccounts, getAccountOptions } = useAdminAccountStore();
    const { accounts, meta, loadingAccountData, accountOptions, unauthorized } =
      storeToRefs(accountStore);

    //admin customer store
    const customerStore = useAdminCustomerStore();
    const { getCustomers } = useAdminCustomerStore();
    const { customers } = storeToRefs(customerStore);

    //admin institution store
    const institutionStore = useAdminInstitutionStore();
    const { getInstitutions } = useAdminInstitutionStore();
    const { institutions } = storeToRefs(institutionStore);

    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,

      loadingAction: false,
    });

    const tableHeader = ref([
      {
        columnName: "id",
        columnLabel: "id",
        sortEnabled: true,
      },
      {
        columnName: "Account Name",
        columnLabel: "name_on_account",
        sortEnabled: true,
      },

      {
        columnName: "Account Type",
        columnLabel: "type",
        sortEnabled: true,
      },

      {
        columnName: "institution",
        columnLabel: "institution",
        sortEnabled: true,
      },

      {
        columnName: "Actual Balance",
        columnLabel: "actual_balance",
        sortEnabled: true,
      },
      {
        columnName: "created_at",
        columnLabel: "created_at",
        sortEnabled: true,
      },

      {
        columnName: "Actions",
        columnLabel: "actions",
      },
    ]);

    const account = ref({
      id: 0,
      action: "Add",
      name_on_account: "",
      customer_id: "",
      type_id: "",
      currency_id: "",
      group_id: "",
      institution_id: "",
    } as any);

    const table_options = ref({
      account: "" as any,
      current_page: 1,
      page_size: 15,
      search_text: "",
      sort: { column: "", direction: "" },
    });

    const searchRecords = ref({
      isSearching: false,
      debounceTimeout: ref<number>(0),
      debounce: 2000,
      kDebounceTimeoutMs: 1000,
    });

    const handlePerPageChange = (size: number) => {
      table_options.value.current_page = 1;
      table_options.value.page_size = size;
      getAccounts(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getAccounts(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;
      table_options.value.current_page = 1;

      getAccounts(table_options.value);
    };

    const accountChanged = (table_options) => {
      getAccounts(table_options);
    };

    //view single account
    const viewTransaction = (val) => {
      //TODO - SPP
      //call account by ref from api to get charge details
      account.value = val;
    };

    //modals
    const showAddAddAccountModal = (action, data) => {
      if (action === "Add") {
        account.value.name_on_account = "";
        account.value.customer_id = "";
        account.value.type_id = "";
        account.value.currency_id = "";
        account.value.group_id = "";
        account.value.institution_id = "";
      } else {
        account.value = data;
      }

      account.value.action = action;
    };

    const processAddAccountAction = () => {
      if (!formAddAccountRef.value) {
        return;
      }

      formAddAccountRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          switch (account.value.action) {
            case "Add":
              accountStore
                .addAccount(account.value)

                .then(() => {
                  getAccounts(table_options.value);

                  hideModal(addAccountModalRef.value);

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
                .updateAccount(account.value)
                .then(() => {
                  refData.value.loadingAction = false;

                  getAccounts(table_options.value);

                  hideModal(addAccountModalRef.value);

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
    onMounted(async () => {
      refData.value.loadingPage = true;

      await getAccounts(table_options.value);
      await getAccountOptions();
      await getCustomers({
        current_page: 1,
        page_size: 100,
        search_text: "",
        sort: { column: "", direction: "" },
      });
      await getInstitutions({
        current_page: 1,
        page_size: 100,
        search_text: "",
        sort: { column: "", direction: "" },
      });

      refData.value.loadingPage = false;
    });

    //search data
    watch(
      () => table_options.value.search_text,
      () => {
        if (searchRecords.value.debounceTimeout) {
          clearTimeout(searchRecords.value.debounceTimeout);
        }

        searchRecords.value.isSearching = true;

        searchRecords.value.debounceTimeout = setTimeout(() => {
          getAccounts(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );
    const formAddAccountRef = ref<null | HTMLFormElement>(null);
    const addAccountModalRef = ref<null | HTMLElement>(null);
    const modalFormRules = ref({
      name_on_account: [
        {
          required: true,
          message: "Account Name is required",
          trigger: "change",
        },
      ],
      type_id: [
        {
          required: true,
          message: "Account type is required",
          trigger: "change",
        },
      ],
      customer_id: [
        {
          required: true,
          message: "Customer is required",
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
      group_id: [
        {
          required: true,
          message: "Group is required",
          trigger: "change",
        },
      ],
      institution_id: [
        {
          required: true,
          message: "Institution is required",
          trigger: "change",
        },
      ],
    });

    //output formatting
    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();

    return {
      //ref
      tableHeader,
      refData,
      table_options,

      //modals
      showAddAddAccountModal,
      modalFormRules,
      formAddAccountRef,
      addAccountModalRef,

      //functions
      accountChanged,
      getAccounts,
      searchRecords,
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      processAddAccountAction,
      viewTransaction,

      //api data
      account,

      accountOptions,
      customers,
      institutions,

      //state
      loadingAccountData,
      accounts,
      meta,
      unauthorized,

      //output formatting
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,

      //
      sppData,
    };
  },
});
</script>
