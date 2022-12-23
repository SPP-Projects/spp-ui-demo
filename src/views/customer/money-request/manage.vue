<template>
  <PermissionDenied v-if="refData.unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />
  <!--begin::Card-->
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
            <span class="me-2" v-if="meta.total >= 1">
              Showing {{ meta.from }} to {{ meta.to }} of
              {{ meta.total }}
            </span>
          </div>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_money_request"
            @click="showMoneyRequestModal()"
          >
            Submit Money Request
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
        :data="moneyRequests"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingMoneyRequestData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:status_id="{ row: data }">
          <span
            v-if="data.status_id === '1'"
            class="badge py-3 px-4 fs-7 badge-light-warning"
            >In-Review</span
          >
          <span
            v-if="data.status_id === '2'"
            class="badge badge-light-success py-3 px-4 fs-7"
            >Approved</span
          >
          <span
            v-if="data.status_id === '3'"
            class="badge badge-light-danger py-3 px-4 fs-7"
            >Rejected</span
          >
          <span
            v-if="data.status_id === '4'"
            class="badge badge-light-danger py-3 px-4 fs-7"
            >Suspended</span
          >
        </template>

        <template v-slot:created_at="{ row: data }">
          <p class="text-muted">{{ data.created_at }}</p>
        </template>

        <template v-slot:reference="{ row: data }">
          {{ data.reference }}
        </template>

        <template v-slot:amount="{ row: data }">
          {{ data.amount }}
        </template>

        <template v-slot:description="{ row: data }">
          {{ data.description }}
        </template>

        <template v-slot:giver_user_email="{ row: data }">
          {{ data.giver_user_email }}
        </template>

        <template v-slot:actions="{ row: data }">
          <router-link :to="`/money-requests/payments/${data.reference}`">
            <button class="btn btn-sm btn-info btn-active-info">
              View Details >>
            </button>
          </router-link>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->
  <!--Money Request Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_money_request"
    ref="AddMoneyRequestModalRef"
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
        <div
          class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15"
          v-if="moneyRequest"
        >
          <el-form
            @submit.prevent="processMoneyRequestAction()"
            class="form"
            :model="moneyRequest"
            :rules="rules"
            ref="formAddMoneyRequestRef"
          >
            <!--begin::Heading-->
            <div class="mb-13 text-center">
              <!--begin::Title-->
              <h1 class="mb-3">
                {{ moneyRequest.action }} Money Request Details
              </h1>
              <!--end::Title-->
            </div>
            <!--end::Heading-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-4 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span class="required">SPayer Email</span>
                <i
                  class="fas fa-exclamation-circle ms-2 fs-7"
                  data-bs-toggle="tooltip"
                  title="Specify valid SPPAY user account email"
                ></i>
              </label>
              <!--end::Label-->

              <el-form-item prop="giver_user_email">
                <el-input
                  v-model="moneyRequest.giver_user_email"
                  placeholder="Enter valid SPPAY User Email"
                  name="giver_user_email"
                ></el-input>
              </el-form-item>
            </div>
            <div class="d-flex flex-column mb-4 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span class="required">Your account no.</span>

                <i
                  class="fas fa-exclamation-circle ms-2 fs-7"
                  data-bs-toggle="tooltip"
                  title="Specify your account number"
                ></i>
              </label>
              <!--end::Label-->

              <el-form-item prop="requester_account_no">
                <el-select
                  v-model="moneyRequest.requester_account_no"
                  placeholder="Select Account to receive this request"
                >
                  <el-option
                    v-for="item in accounts"
                    :key="item.id"
                    :value="item.id"
                    :disabled="refData.loadingAction"
                    >#{{ item.id }} - {{ item.name_on_account }}</el-option
                  >
                </el-select>
              </el-form-item>
            </div>
            <div class="d-flex flex-column mb-4 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span class="required">Description</span>
                <i
                  class="fas fa-exclamation-circle ms-2 fs-7"
                  data-bs-toggle="tooltip"
                  title="Specify a target name for future usage and reference"
                ></i>
              </label>
              <!--end::Label-->

              <el-form-item prop="description">
                <el-input
                  v-model="moneyRequest.description"
                  placeholder="Enter description"
                  name="description"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </div>
            <div class="d-flex flex-column mb-4 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span class="required">Amount</span>
                <i
                  class="fas fa-exclamation-circle ms-2 fs-7"
                  data-bs-toggle="tooltip"
                  title="Specify a target name for future usage and reference"
                ></i>
              </label>
              <!--end::Label-->

              <el-form-item prop="amount">
                <el-input
                  v-model="moneyRequest.amount"
                  placeholder="Enter amount"
                  name="amount"
                  type="number"
                ></el-input>
              </el-form-item>
            </div>

            <!--end::Input group-->
          </el-form>
        </div>
        <div class="modal-footer flex-center" v-if="moneyRequest">
          <!--begin::Button-->
          <button
            type="reset"
            id="kt_modal_add_money_request_cancel"
            class="btn btn-light me-3"
            data-bs-dismiss="modal"
            :disabled="refData.loadingAction"
          >
            Cancel
          </button>
          <!--end::Button-->

          <!--begin::Button-->
          <button
            :data-kt-indicator="refData.loadingAction ? 'on' : null"
            class="btn btn-lg btn-primary"
            type="submit"
            @click="processMoneyRequestAction()"
          >
            <span v-if="!refData.loadingAction" class="indicator-label">
              Add Request
              <span class="svg-icon svg-icon-3 ms-2 me-0">
                <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
              </span>
            </span>
            <span v-if="refData.loadingAction" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <!--end::Button-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--Money Request Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCustomerMoneyRequestStore } from "@/stores/customer/moneyrequest";
import { useCustomerAccountStore } from "@/stores/customer/account";

import { hideModal } from "@/core/helpers/dom";
import Message from "vue-m-message";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";

export default defineComponent({
  name: "manage-money-requests",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const moneyRequestStore = useCustomerMoneyRequestStore();
    const { moneyRequests, meta, loadingMoneyRequestData } =
      storeToRefs(moneyRequestStore);
    const { getAllMoneyRequests } = useCustomerMoneyRequestStore();

    //store
    const accountStore = useCustomerAccountStore();
    const { accounts, loadingAccountData } = storeToRefs(accountStore);
    const { getAccounts } = useCustomerAccountStore();
    //data variables
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,

      loadingAction: false,
    });

    //variables
    const searchRecords = ref({
      isSearching: false,
      debounceTimeout: ref<number>(0),
      debounce: 2000,
      kDebounceTimeoutMs: 1000,
    });
    const formAddMoneyRequestRef = ref<null | HTMLFormElement>(null);
    const AddMoneyRequestModalRef = ref<null | HTMLElement>(null);

    const tableHeader = ref([
      {
        columnLabel: "reference",
        columnName: "reference",
        sortEnabled: true,
      },
      {
        columnLabel: "created_at",
        columnName: "created dated",
        sortEnabled: true,
      },
      {
        columnLabel: "status_id",
        columnName: "status",
        sortEnabled: true,
      },

      {
        columnLabel: "giver_user_email",
        columnName: "giver user email",
        sortEnabled: true,
      },
      { columnLabel: "amount", columnName: "amount", sortEnabled: false },
      {
        columnLabel: "description",
        columnName: "description",
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
    const action = ref("");
    const moneyRequest = ref({
      id: 0,
      action: "Add",
      giver_user_email: "",
      description: "",
      requester_account_no: "",
      amount: "",
      reference: "",
    } as any);

    const rules = ref({
      giver_user_email: [
        {
          required: true,
          message: "Payer email is required",
          trigger: "change",
        },
      ],
      requester_account_no: [
        {
          required: true,
          message: "Your SPPAY account number is required",
          trigger: "change",
        },
      ],
      description: [
        {
          required: true,
          message: "Request description is required",
          trigger: "change",
        },
      ],
      amount: [
        {
          required: true,
          message: "Amount requested is required",
          trigger: "change",
        },
      ],
    });
    //functions

    const processMoneyRequestAction = () => {
      if (!formAddMoneyRequestRef.value) {
        return;
      }
      formAddMoneyRequestRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          const formPayload = new FormData();
          formPayload.append(
            "giver_user_email",
            moneyRequest.value.giver_user_email
          );
          formPayload.append(
            "requester_account_no",
            moneyRequest.value.requester_account_no
          );
          formPayload.append("description", moneyRequest.value.description);
          formPayload.append("amount", moneyRequest.value.amount);
          moneyRequestStore
            .addMoneyRequest(formPayload)

            .then((response) => {
              // update moneyRequest action to edit
              moneyRequest.value = response;
              moneyRequest.value.action = "Edit";

              // update loading status
              refData.value.loadingAction = false;

              Message({
                message: "Money request added successfully.",
                //TBC
                //position: "bottom-right",
                type: "success",
                duration: 5000,
                zIndex: 99999,
              });

              // update moneyRequest records
              getAllMoneyRequests(table_options.value);

              hideModal(AddMoneyRequestModalRef.value);
            })
            .catch((error) => {
              // get errors from state
              const response = error.response.data;

              if (response.errors) {
                const errors = response.errors;
                for (const key in errors) {
                  Message({
                    message: errors[key][0],
                    //TODO
                    //position: "bottom-right",
                    type: "error",
                    duration: 5000,
                    zIndex: 99999,
                  });
                }
              } else if (response.error) {
                Message({
                  message: response.error,
                  //TODO
                  //position: "bottom-right",
                  type: "error",
                  duration: 5000,
                  zIndex: 99999,
                });
              }
            })
            .finally(() => (refData.value.loadingAction = false));

          //do nothing.
        } else {
          return false;
        }
      });
    };

    const handlePerPageChange = (size: number) => {
      table_options.value.current_page = 1;
      table_options.value.page_size = size;
      getAllMoneyRequests(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getAllMoneyRequests(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getAllMoneyRequests(table_options.value);
    };

    const showMoneyRequestModal = () => {
      moneyRequest.value = {
        id: 0,
        action: "Add",
        giver_user_email: "",
        description: "",
        requester_account_no: "",
        amount: "",
        reference: "",
      };
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getAllMoneyRequests(table_options.value);
      getAccounts({
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
          getAllMoneyRequests(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    const addMoneyRequestModalRef = ref<null | HTMLElement>(null);

    return {
      //variables
      refData,
      searchRecords,
      tableHeader,
      meta,
      table_options,
      action,
      moneyRequest,

      //functions
      handlePageChange,
      handlePerPageChange,
      processMoneyRequestAction,
      formAddMoneyRequestRef,
      AddMoneyRequestModalRef,
      sortingChanged,

      //modals
      showMoneyRequestModal,
      rules,
      addMoneyRequestModalRef,

      //state
      moneyRequests,
      loadingMoneyRequestData,
      loadingAccountData,
      accounts,
    };
  },
});
</script>
