<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card header-->
    <div class="card-header border-5 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <el-input
            type="text"
            class="me-5"
            data-kt-subscription-table-filter="search"
            placeholder="Search ..."
            v-model="table_options.amount_or_reference"
          />
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          class="d-flex justify-content-end align-items-center"
          data-kt-customer-table-toolbar="base"
        >
          <div class="fw-bold me-5">
            <span class="me-2" v-if="meta.total >= 1">
              Showing {{ meta.from }} to {{ meta.to }} of
              {{ meta.total }}
            </span>
          </div>

          <!--begin::Filter-->
          <button
            type="button"
            class="btn btn-light-primary me-3 btn-sm"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
          >
            <!--begin::Svg Icon | path: icons/duotune/general/gen031.svg-->
            <span class="svg-icon svg-icon-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <!--end::Svg Icon-->Filter
          </button>
          <!--begin::Menu 1-->
          <div
            class="menu menu-sub menu-sub-dropdown w-300px w-md-325px"
            data-kt-menu="true"
            id="kt-toolbar-filter"
          >
            <!--begin::Header-->
            <div class="px-7 py-5">
              <div class="fs-4 text-dark fw-bold">Filter Options</div>
            </div>
            <!--end::Header-->
            <!--begin::Separator-->
            <div class="separator border-gray-200"></div>
            <!--end::Separator-->
            <!--begin::Content-->
            <div class="px-7 py-5">
              <!--begin::Amount or Reference-->
              <div class="mb-5">
                <!--begin::Label-->
                <label class="form-label fs-5 fw-semibold mb-3"
                  >Amount or Reference:</label
                >
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item
                  prop="amount_or_reference"
                  class="fw-bold"
                  data-kt-select2="true"
                  data-placeholder="Select option"
                  data-allow-clear="true"
                  data-kt-customer-table-filter="amount_or_reference"
                  data-dropdown-parent="#kt-toolbar-filter"
                >
                  <el-input
                    v-model="table_options.amount_or_reference"
                    placeholder="Amount or Reference"
                    name="amount_or_reference"
                  ></el-input>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Amount or Reference-->

              <!--begin::Remittance Status-->
              <div class="mb-5">
                <!--begin::Label-->
                <label class="form-label fs-5 fw-semibold mb-3"
                  >Remittance Status:</label
                >
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item
                  prop="status_id"
                  class="fw-bold"
                  data-kt-select2="true"
                  data-placeholder="Select option"
                  data-allow-clear="true"
                  data-kt-customer-table-filter="status_id"
                  data-dropdown-parent="#kt-toolbar-filter"
                >
                  <el-select
                    placeholder="Select"
                    v-model="table_options.status_id"
                  >
                    <el-option
                      v-for="item in sppData.transactionStatuses"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      :disabled="loadingPage"
                    />
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Remittance Status-->

              <!--begin::Remittance Date-->
              <div class="mb-5">
                <!--begin::Label-->
                <label class="form-label fs-5 fw-semibold mb-3">Date:</label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-row :gutter="0">
                  <el-form-item prop="date">
                    <el-date-picker
                      v-model="table_options.date"
                      type="date"
                      placeholder="Select a date"
                      :teleported="false"
                      name="due_date"
                      value-format="YYYY-MM-DD"
                    />
                  </el-form-item>
                </el-row>
                <!--end::Input-->
              </div>
              <!--end::Remittance Date-->

              <!--begin::Actions-->
              <div class="d-flex justify-content-end">
                <button
                  type="reset"
                  class="btn btn-light btn-active-light-primary me-2 btn-sm"
                  data-kt-menu-dismiss="true"
                  data-kt-customer-table-filter="reset"
                  @click.prevent="handleFilterChange('reset')"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  class="btn btn-primary btn-sm"
                  data-kt-menu-dismiss="true"
                  data-kt-customer-table-filter="filter"
                  @click.prevent="handleFilterChange('submit')"
                >
                  Apply
                </button>
              </div>
              <!--end::Actions-->
            </div>
            <!--end::Content-->
          </div>
          <!--end::Menu 1-->

          <!--end::Filter-->
          <!--begin::Refresh-->
          <button
            type="button"
            class="btn btn-light-primary me-3 btn-sm"
            @click.prevent="handleFilterChange('reset')"
          >
            Refresh Transfers
          </button>
          <!--end::Refresh-->

          <!--begin::New Transfer-->
          <router-link to="/remittance/initiate" class="btn btn-primary btn-sm">
            Send Money >>
          </router-link>
          <!--end::New Transfer-->
        </div>
        <!--end::Toolbar-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Remittance List-->
    <div class="card-body">
      <!--begin::Table-->
      <KTDatatable
        :data="remittances"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingRemittanceData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:created_at="{ row: data }">
          {{ formatDateTime(data.created_at) }}
        </template>
        <template v-slot:status_id="{ row: data }">
          <span v-if="data.status_id === 1" class="badge badge-light-primary"
            >Created</span
          >
          <span v-if="data.status_id === 2" class="badge badge-light-info"
            >Submitted</span
          >
          <span v-if="data.status_id === 3" class="badge badge-light-warning"
            >Processing</span
          >
          <span v-if="data.status_id === 4" class="badge badge-light-success"
            >Success</span
          >
          <span v-if="data.status_id === 5" class="badge badge-light-danger"
            >Error</span
          >
          <span v-if="data.status_id === 6" class="badge badge-light-danger"
            >Cancelled</span
          >
        </template>

        <template v-slot:reference="{ row: data }">
          <router-link :to="'/remittance/' + data.reference">
            {{ data.reference }}</router-link
          >
        </template>
        <template v-slot:type_code="{ row: data }">
          {{ data.type_code }}
        </template>
        <template v-slot:amount="{ row: data }">
          <span class="fw-bold"
            >{{ data.currency.symbol
            }}{{ formatCurrencyAmount(data.amount) }}</span
          >
        </template>
        <template v-slot:debit_account_institution_name="{ row: data }">
          {{ data.debit_account_institution.name }} <br />
          <span class="text-muted fs-6 fw-normal text-muted small">
            {{ data.debit_account_no }}
          </span>
        </template>

        <template v-slot:credit_account_institution_name="{ row: data }">
          {{ data.credit_account_institution.name }} <br />
          <span class="text-muted fs-6 fw-normal text-muted small">
            {{ data.credit_account_no }}
          </span>
        </template>

        <template v-slot:actions="{ row: data }">
          <router-link :to="'/remittances/' + data.reference">
            <button class="btn btn-sm btn-light-info btn-active-light-info">
              View
            </button>
          </router-link>
        </template>
      </KTDatatable>
      <!--end::Table-->
    </div>
    <!--end::Remittance List-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";

import { useCustomerAccountStore } from "@/stores/customer/account";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import useOutputFormat from "@/composables/useOutputFormat";

import sppData from "@/helpers/data";
import { useCustomerRemittanceStore } from "@/stores/remittance/remittance";
import type { iRemittance } from "@/models/remittance";
export default {
  name: "customer-manage-remittance",
  components: { KTDatatable },
  setup() {
    //remittance store
    const remittanceStore = useCustomerRemittanceStore();
    const { remittances, meta, loadingRemittanceData } =
      storeToRefs(remittanceStore);
    const { getRemittances } = useCustomerRemittanceStore();

    //accounts store
    const accountStore = useCustomerAccountStore();

    const { accounts } = storeToRefs(accountStore);

    //refs
    const loadingPage = ref(true);
    const tableHeader = ref([
      {
        columnLabel: "reference",
        columnName: "Reference",
        sortEnabled: false,
      },
      {
        columnLabel: "created_at",
        columnName: "Created Date",
        sortEnabled: true,
      },
      { columnLabel: "status_id", columnName: "Status", sortEnabled: false },

      { columnLabel: "type_code", columnName: "Type", sortEnabled: false },
      { columnLabel: "amount", columnName: "Amount", sortEnabled: true },
      {
        columnLabel: "debit_account_institution_name",
        columnName: "Debit Account",
        sortEnabled: false,
      },

      {
        columnLabel: "credit_account_institution_name",
        columnName: "Credit Account",
        sortEnabled: false,
      },

      {
        columnName: "Actions",
        columnLabel: "actions",
      },
    ]);
    const table_options = ref({
      account: "" as any,
      current_page: 1,
      page_size: 20,
      amount_or_reference: "",
      type_code: "REMIT",
      status_id: "",
      date: "",
      account_no: "",
      sort: { column: "", direction: "" },
    });
    const searchRecords = ref({
      isSearching: false,
      debounceTimeout: ref<number>(0),
      debounce: 2000,
      kDebounceTimeoutMs: 1000,
    });
    const remittance = ref<iRemittance | any>({});

    //methods
    const handlePerPageChange = (size: number) => {
      table_options.value.current_page = 1;
      table_options.value.page_size = size;
      getRemittances(table_options.value);
    };
    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getRemittances(table_options.value);
    };
    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;
      table_options.value.current_page = 1;

      getRemittances(table_options.value);
    };
    const accountChanged = (table_options) => {
      //  set account
      accountStore.setLastSelectedAccount(table_options.account);
      getRemittances(table_options);
    };
    const viewRemittance = (val) => {
      //TODO - SPP
      //call remittance by ref from api to get charge details
      remittance.value = val;
    };
    const handleFilterChange = (action) => {
      //set current page to page 1
      table_options.value.current_page = 1;

      if (action === "reset") {
        table_options.value.status_id = "";
        table_options.value.amount_or_reference = "";
        table_options.value.date = "";
      }

      getRemittances(table_options.value);
    };

    //search
    watch(
      () => table_options.value.amount_or_reference,
      () => {
        if (searchRecords.value.debounceTimeout) {
          clearTimeout(searchRecords.value.debounceTimeout);
        }

        searchRecords.value.isSearching = true;

        searchRecords.value.debounceTimeout = setTimeout(() => {
          getRemittances(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    //output formatting
    let { formatCurrencyAmount, formatDateTime } = useOutputFormat();

    onMounted(async () => {
      loadingPage.value = true;

      table_options.value.account = accountStore.lastSelectedAccount;

      await getRemittances(table_options.value);

      loadingPage.value = false;
    });
    return {
      loadingRemittanceData,
      loadingPage,
      meta,
      remittances,
      tableHeader,
      table_options,
      handlePageChange,
      handlePerPageChange,
      handleFilterChange,
      sortingChanged,
      viewRemittance,
      formatCurrencyAmount,
      formatDateTime,
      sppData,
      getRemittances,
      accounts,

      //TODO
      accountChanged,
    };
  },
};
</script>

<style scoped></style>
