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
            <span class="me-2" v-if="meta.total > 0">
              Showing {{ meta.from }} to {{ meta.to }} of
              {{ meta.total }}
            </span>
          </div>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pt-0">
      <KTDatatable
        :data="smsReports"
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

        <template v-slot:from="{ row: data }">
          {{ data.from }}
        </template>

        <template v-slot:to="{ row: data }">
          {{ data.to }}
        </template>

        <template v-slot:content="{ row: data }">
          {{ data.content }}
        </template>
        <template v-slot:status_id="{ row: data }">
          <span
            v-if="data.status_id === 1"
            class="badge badge-light-info py-3 px-4 fs-7"
            >Pending</span
          >
          <span
            v-if="data.status_id === 2"
            class="badge badge-light-warning py-3 px-4 fs-7"
            >Processing</span
          >
          <span
            v-if="data.status_id === 3"
            class="badge badge-light-success py-3 px-4 fs-7"
            >Processed</span
          >
          <span
            v-if="data.status_id === 4"
            class="badge badge-light-danger py-3 px-4 fs-7"
            >Failed</span
          >
        </template>
        <template v-slot:created_at="{ row: data }">
          {{ formatDateTime(data.created_at) }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_view_sms"
            @click="viewSMS(data)"
          >
            View
          </button>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->
  <!--TODO - change to scroll type-->
  <!--View SMS Modal-->
  <div
    class="modal fade"
    id="kt_modal_view_sms"
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
          <!--begin::Heading-->
          <div class="text-center mb-13">
            <!--begin::Title-->
            <h1 class="mb-3" v-if="sms.id">SMS Details: # {{ sms.id }}</h1>
            <!--end::Title-->
          </div>
          <!--end::Heading-->

          <div class="mb-15">
            <div class="">
              <div v-if="sms.id" class="mod-text">
                <div
                  class="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed"
                >
                  <div class="d-flex align-items-center">
                    <div class="ms">
                      <span
                        class="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        SMS ID
                      </span>
                    </div>
                  </div>

                  <div class="d-flex">
                    <div class="text-end">
                      <div class="fs-5 text-dark">{{ sms.id }}</div>
                    </div>
                  </div>
                </div>

                <div
                  class="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed"
                >
                  <div class="d-flex align-items-center">
                    <div class="ms">
                      <span
                        class="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        Sender ID
                      </span>
                    </div>
                  </div>

                  <div class="d-flex">
                    <div class="text-end">
                      <div class="fs-5 text-dark">{{ sms.from }}</div>
                    </div>
                  </div>
                </div>

                <div
                  class="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed"
                >
                  <div class="d-flex align-items-center">
                    <div class="ms">
                      <span
                        class="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        Recipient
                      </span>
                    </div>
                  </div>

                  <div class="d-flex">
                    <div class="text-end">
                      <div class="fs-5 text-dark">{{ sms.to }}</div>
                    </div>
                  </div>
                </div>

                <div
                  class="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed"
                >
                  <div class="d-flex align-items-center">
                    <div class="ms">
                      <span
                        class="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        Date & Time
                      </span>
                    </div>
                  </div>

                  <div class="d-flex">
                    <div class="text-end">
                      <div class="fs-5 text-dark">
                        {{ sms.created_at }}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed"
                >
                  <div class="d-flex align-items-center">
                    <div class="ms">
                      <span class="badge badge-light fs-8 fw-semobold ms mb-4">
                        Message
                      </span>

                      <div class="fw-semobold text-gray-800">
                        {{ sms.content }}
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="sms.user">
                  <h6 class="mb-42 mt-3">Initiated By</h6>
                  <div>
                    Name: <b>{{ sms.user.name }}</b>
                  </div>
                  <div>
                    Email: <b>{{ sms.user.email }}</b>
                  </div>
                </div>
                <div v-if="sms.transaction">
                  <h6 class="mb-42 mt-3">Transaction</h6>
                  <div>
                    Reference: <b>{{ sms.transaction.reference }}</b>
                  </div>
                  <div>
                    Debit Account:
                    <b
                      >{{ sms.transaction.debit_account_no }} -
                      {{ sms.transaction.debit_account_name }}</b
                    >
                  </div>
                  <div>
                    Amount:
                    <b
                      >{{ sms.transaction.currency_code }}
                      {{ sms.transaction.amount }}</b
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--View SMS Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAdminSmsStore } from "@/stores/admin/sms";
import type { iSmsReport } from "@/models/sms";

import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import useOutputFormat from "@/composables/useOutputFormat";

export default defineComponent({
  name: "admin-manage-sms",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //admin sms store
    const smsStore = useAdminSmsStore();
    const { smsReports, meta, loadingSmsData, unauthorized } =
      storeToRefs(smsStore);
    const { getSmsReports } = useAdminSmsStore();

    //data variables
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,
      loadingAction: false,
    });

    //variables
    const sms = ref({} as iSmsReport);
    const tableHeader = ref([
      {
        columnLabel: "id",
        columnName: "ID",
        sortEnabled: true,
        columnWidth: 75,
      },
      {
        columnLabel: "from",
        columnName: "Sender",
        sortEnabled: true,
        columnWidth: 105,
      },
      {
        columnLabel: "to",
        columnName: "Recipient",
        sortEnabled: false,
        columnWidth: 145,
      },
      { columnLabel: "content", columnName: "Message", sortEnabled: false },
      { columnLabel: "status_id", columnName: "Status", sortEnabled: false },
      {
        columnLabel: "created_at",
        columnName: "Date & Time",
        sortEnabled: true,
        columnWidth: 145,
      },
      {
        columnLabel: "actions",
        columnName: "Actions",
        class: "actions text-center",
      },
    ]);

    const table_options = ref({
      current_page: 1,
      page_size: 20,
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
      getSmsReports(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getSmsReports(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getSmsReports(table_options.value);
    };

    //modal
    const viewSMS = (val) => {
      sms.value = val;
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getSmsReports(table_options.value);
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
          getSmsReports(table_options.value);
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
      tableHeader,
      table_options,
      searchRecords,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,

      //modal
      viewSMS,

      //api data
      sms,

      //state
      smsReports,
      loadingSmsData,
      meta,
      unauthorized,

      //output formatting
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,
    };
  },
});
</script>
