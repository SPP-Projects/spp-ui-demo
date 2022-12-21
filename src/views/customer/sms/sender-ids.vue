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
            <span class="me-2" v-if="meta.total > 0">
              Showing {{ meta.from }} to {{ meta.to }} of
              {{ meta.total }}
            </span>
          </div>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_customer"
          >
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
        :loading="loadingData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:id="{ row: data }">
          {{ data.id }}
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
          <p class="text-muted">{{ data.created_at }}</p>
        </template>
      </KTDatatable>
    </div>

    <!--Modal-->
    <div
      class="modal fade"
      id="kt_modal_add_customer"
      ref="AddSenderIdModalRef"
      tabindex="-1"
      aria-hidden="true"
    >
      <!--begin::Modal dialog-->
      <div class="modal-dialog modal-dialog-centered mw-650px">
        <!--begin::Modal content-->
        <div class="modal-content">
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_add_customer_header">
            <!--begin::Modal title-->
            <h2 class="fw-bold">Add Sender ID</h2>
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
          <el-form
            @submit.prevent="processAddSenderID()"
            :model="senderID"
            :rules="addSenderIdFormRules"
            ref="formAddSenderIdRef"
          >
            <!--begin::Modal body-->
            <div class="modal-body py-10 px-lg-17">
              <!--begin::Scroll-->
              <div
                class="scroll-y me-n7 pe-7"
                id="kt_modal_add_customer_scroll"
                data-kt-scroll="true"
                data-kt-scroll-activate="{default: false, lg: true}"
                data-kt-scroll-max-height="auto"
                data-kt-scroll-dependencies="#kt_modal_add_customer_header"
                data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
                data-kt-scroll-offset="300px"
              >
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">Name</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="name">
                    <el-input
                      v-model="senderID.name"
                      type="text"
                      placeholder=""
                    />
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
                id="kt_modal_add_customer_cancel"
                class="btn btn-light me-3"
                data-bs-dismiss="modal"
              >
                Discard
              </button>
              <!--end::Button-->

              <!--begin::Button-->
              <button
                :data-kt-indicator="loadingAddSenderIdForm ? 'on' : null"
                class="btn btn-lg btn-primary"
                type="submit"
              >
                <span v-if="!loadingAddSenderIdForm" class="indicator-label">
                  Submit
                  <span class="svg-icon svg-icon-3 ms-2 me-0">
                    <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                  </span>
                </span>
                <span v-if="loadingAddSenderIdForm" class="indicator-progress">
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
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useCustomerSmsStore } from "@/stores/customer/sms";
import { storeToRefs } from "pinia";
import { hideModal } from "@/core/helpers/dom";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";

import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";

export default defineComponent({
  name: "sender-ids-list",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const smsStore = useCustomerSmsStore();
    const { senderIDs, meta, loadingData } = storeToRefs(smsStore);
    const { getSenderIDs } = useCustomerSmsStore();

    //ref variables
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,
      loadingData: false,
      loadingAction: false,
    });

    //senderIds

    const senderID = ref({
      name: "",
    });

    const tableHeader = ref([
      {
        columnName: "id",
        columnLabel: "id",
        sortEnabled: true,
        columnWidth: "50",
      },
      {
        columnName: "Sender ID",
        columnLabel: "text",
        sortEnabled: true,
      },
      {
        columnName: "Status",
        columnLabel: "status_id",
        sortEnabled: true,
        columnWidth: "30",
      },
      {
        columnName: "Submitted On",
        columnLabel: "created_at",
        sortEnabled: true,
        columnWidth: "30",
      },
    ]);

    //api data

    const table_options = ref({
      current_page: 1,
      page_size: 10,
      search_text: "",
      sort: { column: "", direction: "" },
    });

    const addSenderIdFormRules = ref({
      name: [
        {
          required: true,
          message: "Sender ID name is required",
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

    const formAddSenderIdRef = ref<null | HTMLFormElement>(null);

    const AddSenderIdModalRef = ref<null | HTMLElement>(null);

    const loadingAddSenderIdForm = ref<boolean>(false);

    const processAddSenderID = () => {
      if (!formAddSenderIdRef.value) {
        return;
      }

      formAddSenderIdRef.value.validate((valid) => {
        if (valid) {
          loadingAddSenderIdForm.value = true;

          smsStore
            .addSenderID(senderID.value)

            .then(() => {
              senderID.value.name = "";

              Message({
                message: "Sender ID submitted successfully.",
                //TODO
                //position: "bottom-right",
                type: "success",
                duration: 5000,
                zIndex: 99999,
              });

              getSenderIDs(table_options.value);
              //TODO
              hideModal(AddSenderIdModalRef.value);
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
            .finally(() => {
              loadingAddSenderIdForm.value = false;
            });
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

    return {
      refData,
      searchRecords,
      handlePageChange,
      handlePerPageChange,
      processAddSenderID,
      formAddSenderIdRef,
      loadingAddSenderIdForm,
      AddSenderIdModalRef,
      sortingChanged,
      senderIDs,
      senderID,
      tableHeader,
      meta,
      table_options,
      addSenderIdFormRules,

      //state
      loadingData,
    };
  },
});
</script>
