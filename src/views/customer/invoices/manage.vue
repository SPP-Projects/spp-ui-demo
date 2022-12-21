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

          <router-link to="/invoices/new" class="btn btn-primary btn-sm">
            New iInvoice
          </router-link>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pt-0">
      <KTDatatable
        :data="invoices"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingInvoiceData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:id="{ row: data }">
          {{ data.id }}
        </template>

        <template v-slot:created_at="{ row: data }">
          <p class="text-muted">{{ data.created_at }}</p>
        </template>

        <template v-slot:reference="{ row: data }">
          {{ data.reference }}
        </template>

        <template v-slot:total="{ row: data }">
          {{ data.total }} {{ data.currency_code }}
        </template>

        <template v-slot:user_reference="{ row: data }">
          {{ data.user_reference }}
        </template>

        <template v-slot:bill_to_email="{ row: data }">
          {{ data.bill_to_email }}
        </template>

        <template v-slot:actions="{ row: data }">
          <router-link :to="`/invoices/payments/${data.reference}`">
            <button class="btn btn-sm btn-info btn-active-info">View >></button>
          </router-link>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCustomerInvoiceStore } from "@/stores/customer/invoice";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";

export default defineComponent({
  name: "manage-invoices",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const invoiceStore = useCustomerInvoiceStore();
    const { invoices, meta, loadingInvoiceData } = storeToRefs(invoiceStore);
    const { getAllInvoices } = useCustomerInvoiceStore();

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
        columnLabel: "created_at",
        columnName: "created dated",
        sortEnabled: true,
      },

      { columnLabel: "id", columnName: "ID", sortEnabled: true },
      {
        columnLabel: "reference",
        columnName: "reference",
        sortEnabled: true,
      },

      {
        columnLabel: "bill_to_email",
        columnName: "Email",
        sortEnabled: true,
      },
      { columnLabel: "total", columnName: "total", sortEnabled: false },
      {
        columnLabel: "user_reference",
        columnName: "User Ref",
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

    const searchRecords = ref({
      isSearching: false,
      debounceTimeout: ref<number>(0),
      debounce: 2000,
      kDebounceTimeoutMs: 1000,
    });

    //functions
    // const getAllInvoices = async (table_options): Promise<void> => {
    //   refData.value.loadingInvoiceData = true;
    //
    //   await store
    //     .dispatch("invoice/getAllInvoices", table_options)
    //     .then((response) => {
    //       invoiceData.value = response.data;
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
    //       refData.value.loadingInvoiceData = false;
    //     });
    // };

    const handlePerPageChange = (size: number) => {
      table_options.value.current_page = 1;
      table_options.value.page_size = size;
      getAllInvoices(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getAllInvoices(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getAllInvoices(table_options.value);
    };

    onBeforeMount(() => {
      refData.value.loadingPage = true;
    });

    onMounted(() => {
      refData.value.loadingPage = true;
      getAllInvoices(table_options.value);
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
          getAllInvoices(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      //variables
      refData,
      searchRecords,
      tableHeader,
      meta,
      table_options,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,

      //state
      invoices,
      loadingInvoiceData,
    };
  },
});
</script>
