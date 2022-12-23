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
            data-bs-target="#kt_modal_add_batch_transaction"
          >
            New Transaction Batch Upload
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
        :data="transactionBatches"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:created_at="{ row: data }">
          {{ data.created_at }}
        </template>
        <template v-slot:status_id="{ row: data }">
          <span v-if="data.status_id === '1'" class="badge badge-primary"
            >Created</span
          >
          <span v-if="data.status_id === '2'" class="badge badge-warning"
            >Validating</span
          >
          <span v-if="data.status_id === 3" class="badge badge-success"
            >Validated</span
          >
          <span v-if="data.status_id === '4'" class="badge badge-warning"
            >Submitting</span
          >
          <span v-if="data.status_id === '5'" class="badge badge-success"
            >Submitted</span
          >
          <span v-if="data.status_id === '6'" class="badge badge-info"
            >Paused</span
          >
          <span v-if="data.status_id === '7'" class="badge badge-danger"
            >Cancelled</span
          >
        </template>
        <template v-slot:id="{ row: data }">
          {{ data.id }}
        </template>
        <template v-slot:batch_reference="{ row: data }">
          {{ data.batch_reference }}
        </template>

        <template v-slot:file_name="{ row: data }">
          {{ data.file_name }}
        </template>
        <template v-slot:transaction_count="{ row: data }">
          {{ data.transaction_count }}
        </template>
        <!--                @click="transaction = { ...data }"-->
        <template v-slot:actions="{ row: data }">
          <router-link :to="`batch/${data.batch_reference}`">
            <button class="btn btn-sm btn-info btn-active-info me-5">
              View
            </button></router-link
          >
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            data-bs-toggle="modal"
            id="edit-btn"
            data-bs-target="#kt_modal_confirm_transaction_batch"
            @click="showConfirmTransactionBatchModal(data)"
            v-if="data.status_id === '3'"
          >
            Submit For Processing
          </button>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <!--uploadTransactionBatch Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_batch_transaction"
    tabindex="-1"
    aria-hidden="true"
    ref="uploadTransactionBatchModalRef"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Process Transaction Batch</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Form-->
        <el-form ref="formAddSenderIdRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div class="">
              <label class="form-label">Batch File (.csv)</label>
              <input
                type="file"
                class="mb-4"
                placeholder="Select Batch File"
                :ref="batch_file"
                :disabled="loading_batch.submit"
                @change="handleFileUpload($event)"
              />
            </div>
            <div class="d-flex flex-column mb-4 fv-row">
              <el-form-item prop="validation" class="m-3">
                <input
                  type="checkbox"
                  v-model="payload.validate"
                  placeholder="Select Batch File"
                  :disabled="loading_batch.submit"
                  required
                />
                Validate transactions before processing
              </el-form-item>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_add_customer_cancel"
              class="btn btn-light me-3"
              data-bs-dismiss="modal"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              class="btn btn-primary"
              @click="submitTransactionBatch()"
              :disabled="loading_batch.submit"
            >
              <span v-if="loading_batch.process"
                >Uploading Transaction Batch ...
              </span>
              <span v-else>Upload Batch </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
  <!--uploadTransactionBatch Modal-->

  <!--confirm_transaction_batch Modal-->
  <div
    class="modal fade"
    id="kt_modal_confirm_transaction_batch"
    tabindex="-1"
    aria-hidden="true"
    ref="confirmTransactionBatchModalRef"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Process Transaction Batch</h5>

          <!--begin::Close-->
          <div
            class="btn btn-icon btn-sm btn-active-light-primary ms-2"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span class="svg-icon svg-icon-2x"></span>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">
          <div class="modal-text">
            <h6 class="text-center">
              Are you sure you want to process this transaction batch?
            </h6>
            <p class="text-center" style="color: red">
              This action cannot be reversed.
            </p>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-light" data-bs-dismiss="modal" type="reset">
            Close
          </button>

          <button
            class="btn btn-primary"
            @click="processTransactionBatch()"
            :disabled="loading_batch.process"
          >
            <span v-if="loading_batch.process"
              >Submitting for Processing ...
            </span>
            <span v-else>Submit for Processing </span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--confirm_transaction_batch Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCustomerTransactionBatchStore } from "@/stores/customer/transactionbatch";

import { hideModal } from "@/core/helpers/dom";
import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";

export default defineComponent({
  name: "manage-transaction-batches",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const transactionBatchStore = useCustomerTransactionBatchStore();

    const { transactionBatches, meta, loadingData } = storeToRefs(
      transactionBatchStore
    );
    const { getAllTransactionBatches } = useCustomerTransactionBatchStore();

    //data variables
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,

      loadingAction: false,
    });

    //variables

    const tableHeader = ref([
      {
        columnLabel: "batch_reference",
        columnName: "Reference",
        sortEnabled: false,
      },
      {
        columnLabel: "file_name",
        columnName: "File Name",
        sortEnabled: false,
      },
      {
        columnLabel: "created_at",
        columnName: "Uploaded Date",
        sortEnabled: true,
      },
      { columnLabel: "status_id", columnName: "Status", sortEnabled: false },
      {
        columnLabel: "transaction_count",
        columnName: "Processed Transaction Count",
        sortEnabled: false,
      },
      //
      {
        columnLabel: "actions",
        columnName: "actions",
      },
    ]);

    const table_options = ref({
      current_page: 1,
      page_size: 10,
      search_text: "",
      sort: { column: "", direction: "" },
    });
    const loading_batch = ref({
      process: false,
      submit: false,
    });
    const payload = ref({
      batch_file: null,
      validate: true,
    });

    const transactions = ref([]);
    const transaction = ref({});
    const transaction_batch = ref({
      batch_reference: "",
      process: false,
    });

    const isBusy = false;

    const searchRecords = ref({
      isSearching: false,
      debounceTimeout: ref<number>(0),
      debounce: 2000,
      kDebounceTimeoutMs: 1000,
    });
    const batch_file = ref(null);
    const formAddSenderIdRef = ref<null | HTMLFormElement>(null);

    const uploadTransactionBatchModalRef = ref<null | HTMLElement>(null);

    const confirmTransactionBatchModalRef = ref<null | HTMLElement>(null);

    const loadingAddSenderIdForm = ref<boolean>(false);

    //functions

    // const getAllTransactionBatches = async (table_options): Promise<void> => {
    //   refData.value.loadingData = true;
    //
    //   await store
    //     .dispatch("transaction/getAllTransactionBatches", table_options)
    //     .then((response) => {
    //       transactionBatches.value = response.data;
    //
    //       // Populate transaction meta
    //       meta.value.total = response.total;
    //       meta.value.from = response.from;
    //       meta.value.to = response.to;
    //       meta.value.last_page = response.last_page;
    //     })
    //     .catch((error) => {
    //       if (error.response.status === 403) {
    //         // unauthorized.
    //         refData.value.unauthorized = true;
    //       }
    //     })
    //     .finally(() => {
    //       refData.value.loadingPage = false;
    //       refData.value.loadingData = false;
    //     });
    // };

    const handlePerPageChange = (size: number) => {
      table_options.value.current_page = 1;
      table_options.value.page_size = size;
      getAllTransactionBatches(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getAllTransactionBatches(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getAllTransactionBatches(table_options.value);
    };

    const handleFileUpload = ($event) => {
      payload.value.batch_file = $event.target.files[0];
    };

    const showConfirmTransactionBatchModal = (data) => {
      transaction_batch.value = data;
    };

    const processTransactionBatch = () => {
      transaction_batch.value.process = true;
      transactionBatchStore
        .processTransactionBatch(transaction_batch.value.batch_reference)

        .then(() => {
          Message({
            message: "Batch submitted for processing successfully.",
            position: "bottom-right",
            type: "success",
            duration: 5000,
            zIndex: 99999,
          });

          getAllTransactionBatches(table_options.value);
          hideModal(confirmTransactionBatchModalRef.value);
          // data.$bvModal.hide("confirmTransactionBatchModal");
        })
        .catch((error) => {
          if (error.response.status === 403) {
            // unauthorized.
            refData.value.unauthorized = true;
          }

          let response = error.response.data;

          if (response.errors) {
            let errors = response.errors;
            for (const key in errors) {
              Message({
                message: errors[key][0],
                position: "bottom-right",
                type: "error",
                duration: 5000,
                zIndex: 99999,
              });
            }
          } else if (response.error) {
            Message({
              message: response.error,
              position: "bottom-right",
              type: "error",
              duration: 5000,
              zIndex: 99999,
            });
          }
        })
        .finally(() => {
          loading_batch.value.process = !loading_batch.value.process;
        });
    };

    const submitTransactionBatch = () => {
      loading_batch.value.submit = true;

      // prepare payload
      let batchUploadPayload = new FormData();

      batchUploadPayload.append("validate", payload.value.validate ? "1" : "0");

      if (payload.value.batch_file !== null) {
        batchUploadPayload.append("batch_file", payload.value.batch_file);
      } else {
        loading_batch.value.submit = !loading_batch.value.submit;
        return;
      }
      for (let pair of batchUploadPayload.entries()) {
        console.log(pair[0] + " " + pair[1]);
      }
      console.log("file", JSON.stringify(batchUploadPayload));
      transactionBatchStore
        .submitTransactionBatch(batchUploadPayload)

        .then(() => {
          Message({
            message: "Batch uploaded successfully.",
            position: "bottom-right",
            type: "success",
            duration: 5000,
            zIndex: 99999,
          });

          getAllTransactionBatches(table_options.value);
          hideModal(uploadTransactionBatchModalRef.value);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            // unauthorized.
            refData.value.unauthorized = true;
          }

          let response = error.response.data;

          if (response.errors) {
            let errors = response.errors;
            for (const key in errors) {
              Message({
                message: errors[key][0],
                position: "bottom-right",
                type: "error",
                duration: 5000,
                zIndex: 99999,
              });
            }
          } else if (response.error) {
            Message({
              message: response.error,
              position: "bottom-right",
              type: "error",
              duration: 5000,
              zIndex: 99999,
            });
          }
        })
        .finally(() => {
          loading_batch.value.submit = !loading_batch.value.submit;
        });
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getAllTransactionBatches(table_options.value);
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
          getAllTransactionBatches(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      //variables
      refData,
      formAddSenderIdRef,
      loadingAddSenderIdForm,
      uploadTransactionBatchModalRef,
      confirmTransactionBatchModalRef,

      tableHeader,

      meta,
      table_options,
      batch_file,
      loading_batch,
      payload,
      searchRecords,
      transactions,
      transaction,
      transaction_batch,

      isBusy,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      submitTransactionBatch,
      processTransactionBatch,
      handleFileUpload,

      //modal
      showConfirmTransactionBatchModal,

      //state
      transactionBatches,
      loadingData,
    };
  },
});
</script>
