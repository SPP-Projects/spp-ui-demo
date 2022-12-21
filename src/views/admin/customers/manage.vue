<template>
  <!--begin::Card-->
  <PermissionDenied v-if="refData.unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />

  <div class="card">
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
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pt-0">
      <KTDatatable
        :data="customers"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingCustomerData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:id="{ row: data }">
          {{ data.id }}
        </template>
        <template v-slot:name="{ row: data }">
          {{ data.name }}
        </template>
        <template v-slot:phone="{ row: data }">
          {{ data.phone }}
        </template>
        <template v-slot:country="{ row: data }">
          {{ data.country.name }}
        </template>
        <template v-slot:group="{ row: data }">
          {{ data.group.name }}
        </template>
        <template v-slot:type="{ row: data }">
          {{ data.type.name }}
        </template>

        <template v-slot:actions="{ row: data }">
          <router-link :to="`/admin/customers/view/${data.id}`">
            <button class="btn btn-sm btn-light-info btn-active-light-info">
              View
            </button></router-link
          >
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import sppay from "@/helpers/sppay";
import { storeToRefs } from "pinia";
import { useAdminCustomerStore } from "@/stores/admin/customer";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import PageLoader from "@/components/PageLoader.vue";
import PermissionDenied from "@/components/PermissionDenied.vue";

export default defineComponent({
  name: "admin-customers-manage",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup: function () {
    //admin customer store
    const customerStore = useAdminCustomerStore();
    const { getCustomers } = useAdminCustomerStore();
    const { customers, meta, loadingCustomerData } = storeToRefs(customerStore);

    const { formatDateTime } = sppay();
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
        columnName: "Customer Name",
        columnLabel: "name",
        sortEnabled: true,
      },
      {
        columnName: "Phone",
        columnLabel: "phone",
        sortEnabled: true,
      },

      {
        columnName: "Country",
        columnLabel: "country",
        sortEnabled: true,
      },
      {
        columnName: "group",
        columnLabel: "group",
        sortEnabled: true,
      },
      {
        columnName: "Customer Type",
        columnLabel: "type",
        sortEnabled: true,
      },

      {
        columnName: "Actions",
        columnLabel: "actions",
      },
    ]);

    const customer = ref("");

    const table_options = ref({
      customer: "" as any,
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

    const handlePerPageChange = (size: number) => {
      table_options.value.current_page = 1;
      table_options.value.page_size = size;
      getCustomers(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getCustomers(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;
      table_options.value.current_page = 1;

      getCustomers(table_options.value);
    };

    const customerChanged = (table_options) => {
      getCustomers(table_options);
    };

    onMounted(async () => {
      refData.value.loadingPage = true;

      await getCustomers(table_options.value);

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
          getCustomers(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      refData,
      searchRecords,
      handlePageChange,
      handlePerPageChange,
      sortingChanged,

      getCustomers,

      //functions
      customerChanged,
      table_options,
      meta,
      tableHeader,

      //api data
      customer,
      formatDateTime,

      //state
      loadingCustomerData,
      customers,
    };
  },
});
</script>
