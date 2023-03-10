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
            data-bs-target="#kt_modal_add_sender_id"
            @click="showSenderIdModal('Add', {})"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add Sender ID
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
        :data="senderIDs"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingSmsData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:id="{ row: data }">
          {{ data.id }}
        </template>
        <template v-slot:customer="{ row: data }">
          <p class="text-gray-800 fw-bold">{{ data.customer.name }}</p>
        </template>
        <template v-slot:text="{ row: data }">
          <p class="text-gray-800 fw-bold">{{ data.text }}</p>
        </template>
        <template v-slot:status_id="{ row: data }">
          <span
            v-if="data.status_id === 1"
            class="badge py-3 px-4 fs-7 badge-light-warning"
            >In-Review</span
          >
          <span
            v-if="data.status_id === 2"
            class="badge badge-light-success py-3 px-4 fs-7"
            >Approved</span
          >
          <span
            v-if="data.status_id === 3"
            class="badge badge-light-danger py-3 px-4 fs-7"
            >Rejected</span
          >
          <span
            v-if="data.status_id === 4"
            class="badge badge-light-danger py-3 px-4 fs-7"
            >Suspended</span
          >
        </template>
        <template v-slot:created_at="{ row: data }">
          <p class="text-muted">{{ formatDateTime(data.created_at) }}</p>
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            @click="showSenderIdModal('Edit', data)"
            data-bs-toggle="modal"
            id="edit-btn"
            data-bs-target="#kt_modal_add_sender_id"
          >
            View/Edit
          </button>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <!--Add senderID Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_sender_id"
    ref="senderIdModalRef"
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
          @submit.prevent="processSenderIdAction()"
          :model="senderID"
          :rules="modalFormRules"
          ref="formSenderIdRef"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_sender_id_header">
            <!--begin::Modal title-->
            <h2>{{ senderID.action }} Sender ID</h2>
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
              id="kt_modal_sender_id_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_new_sender_id_header"
              data-kt-scroll-wrappers="#kt_modal_sender_id_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2">Customer</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="customer_id">
                  <el-select
                    v-model="senderID.customer_id"
                    placeholder="Select"
                  >
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
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Sender ID</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="name">
                  <el-input
                    v-model="senderID.name"
                    placeholder="Sender ID"
                    name="name"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2">Status</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="status_id">
                  <el-select v-model="senderID.status_id" placeholder="Select">
                    <el-option
                      v-for="item in sppData.senderIdStatuses"
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
              id="kt_modal_add_sender_id_cancel"
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
              id="kt_modal_sender_id_submit"
              class="btn btn-primary btn-sm"
              :data-kt-indicator="refData.loadingAction ? 'on' : null"
              :disabled="refData.loadingAction"
            >
              <span v-if="!refData.loadingAction" class="indicator-label">
                {{ senderID.action === "Add" ? "Add" : "Update" }}
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
  <!--Add senderID Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { storeToRefs } from "pinia";
import { useAdminSmsStore } from "@/stores/admin/sms";

import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import sppData from "@/helpers/data";
import useOutputFormat from "@/composables/useOutputFormat";
import { useAdminCustomerStore } from "@/stores/admin/customer";
import { AlertService } from "@/services/AlertService";

export default defineComponent({
  name: "admin-manage-sender-ids",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //admin sms store
    const smsStore = useAdminSmsStore();
    const { senderIDs, meta, loadingSmsData, unauthorized } =
      storeToRefs(smsStore);
    const { getSenderIDs } = useAdminSmsStore();

    //admin customer store
    const customerStore = useAdminCustomerStore();
    const { getCustomers } = useAdminCustomerStore();
    const { customers, loadingCustomerData } = storeToRefs(customerStore);

    //data variables
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,
      loadingAction: false,
    });

    const tableHeader = ref([
      {
        columnLabel: "id",
        columnName: "ID",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "customer",
        columnLabel: "customer",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Sender ID",
        columnLabel: "text",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Status",
        columnLabel: "status_id",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Submitted On",
        columnLabel: "created_at",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnLabel: "actions",
        columnName: "Actions",
        columnWidth: 100,
      },
    ]);

    const table_options = ref({
      current_page: 1,
      page_size: 20,
      search_text: "",
      sort: { column: "", direction: "" },
    });

    const senderID = ref({
      id: 0,
      action: "Add",
      name: "",
      status_id: "",
      customer_id: "",
    } as any);

    const formSenderIdRef = ref<null | HTMLFormElement>(null);
    const senderIdModalRef = ref<null | HTMLElement>(null);
    const modalFormRules = ref({
      name: [
        {
          required: true,
          message: "Sender ID is required",
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
      customer_id: [
        {
          required: true,
          message: "Customer is required",
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

    const processSenderIdAction = () => {
      if (!formSenderIdRef.value) {
        return;
      }

      formSenderIdRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          switch (senderID.value.action) {
            case "Add":
              smsStore
                .addSenderID(senderID.value)

                .then(() => {
                  getSenderIDs(table_options.value);

                  hideModal(senderIdModalRef.value);

                  //display message using shared AlertService
                  AlertService.displaySuccessAlert(
                    "Data updated successfully!"
                  );
                })
                .finally(() => (refData.value.loadingAction = false));
              break;
            case "Edit":
              console.log("edt");
              smsStore
                .updateSenderID(senderID.value)
                .then(() => {
                  refData.value.loadingAction = false;

                  getSenderIDs(table_options.value);

                  hideModal(senderIdModalRef.value);

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
      getSenderIDs(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getSenderIDs(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getSenderIDs(table_options.value);
    };

    //modal
    const showSenderIdModal = (action, data) => {
      getCustomers({
        current_page: 1,
        page_size: 100,
        search_text: "",
        sort: { column: "", direction: "" },
      });
      if (action === "Add") {
        senderID.value.name = "";
      } else {
        senderID.value.name = data.text;
        senderID.value.status_id = data.status_id;
        senderID.value.customer_id = data.customer_id;
        senderID.value.id = data.id;
      }

      senderID.value.action = action;
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getSenderIDs(table_options.value);
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
          getSenderIDs(table_options.value);
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
      senderIdModalRef,
      formSenderIdRef,
      modalFormRules,
      tableHeader,

      table_options,
      senderID,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      processSenderIdAction,
      searchRecords,

      //modal
      showSenderIdModal,

      //imported data
      sppData,

      //state
      senderIDs,
      loadingSmsData,
      meta,
      unauthorized,

      //output formatting
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,

      //
      customers,
      loadingCustomerData,
    };
  },
});
</script>
