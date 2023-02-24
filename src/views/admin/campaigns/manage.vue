<template>
  <PermissionDenied v-if="unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />
  <!--begin::Card-->
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
            <span class="me-2" v-if="meta.total >= 1">
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
        :data="campaigns"
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
        <template v-slot:status_id="{ row: data }">
          <span v-if="data.status_id === '1'" class="badge badge-light-warning"
            >In-Review</span
          >
          <span v-if="data.status_id === '2'" class="badge badge-light-success"
            >Live</span
          >
          <span v-if="data.status_id === '3'" class="badge badge-light-danger"
            >Closed</span
          >
        </template>

        <template v-slot:created_at="{ row: data }">
          <p class="text-muted">{{ formatDateTime(data.created_at) }}</p>
        </template>

        <template v-slot:reference="{ row: data }">
          {{ data.reference }}
        </template>

        <template v-slot:goal="{ row: data }">
          {{ data.currency_code }} {{ formatCurrencyAmount(data.goal) }}
        </template>

        <template v-slot:donated="{ row: data }">
          {{ data.donated }}
        </template>

        <template v-slot:title="{ row: data }">
          {{ data.title }}
        </template>

        <template v-slot:actions="{ row: data }">
          <router-link :to="`/admin/campaigns/${data.reference}`">
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
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";

import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";

import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import useOutputFormat from "@/composables/useOutputFormat";
import { useAdminCampaignStore } from "@/stores/admin/campaign";

export default defineComponent({
  name: "admin-manage-campaigns",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const campaignStore = useAdminCampaignStore();
    const { campaigns, meta, loadingData, unauthorized } =
      storeToRefs(campaignStore);
    const { getCampaigns } = useAdminCampaignStore();

    //data variables
    const refData = ref({
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,
      loadingData: false,
      loadingAction: false,
    });

    //variables
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

      { columnLabel: "title", columnName: "title", sortEnabled: true },
      { columnLabel: "goal", columnName: "goal", sortEnabled: false },
      { columnLabel: "donated", columnName: "donated", sortEnabled: true },

      {
        columnLabel: "actions",
        columnName: "Actions",
      },
    ]);

    const table_options = ref({
      current_page: 1,
      page_size: 20,
      search_text: "",
      sort: { column: "", direction: "" },
    });
    const action = ref("");

    const searchRecords = ref({
      isSearching: false,
      debounceTimeout: ref<number>(0),
      debounce: 2000,
      kDebounceTimeoutMs: 1000,
    });

    const handlePerPageChange = (size: number) => {
      table_options.value.current_page = 1;
      table_options.value.page_size = size;
      getCampaigns(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getCampaigns(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getCampaigns(table_options.value);
    };

    watch(
      () => table_options.value.search_text,
      () => {
        if (searchRecords.value.debounceTimeout) {
          clearTimeout(searchRecords.value.debounceTimeout);
        }

        searchRecords.value.isSearching = true;

        searchRecords.value.debounceTimeout = setTimeout(() => {
          getCampaigns(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    onMounted(() => {
      refData.value.loadingPage = true;
      getCampaigns(table_options.value);
      refData.value.loadingPage = false;
    });

    //output formatting
    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();
    return {
      //variables
      refData,
      tableHeader,
      meta,
      table_options,
      action,
      searchRecords,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,

      //state
      loadingData,
      campaigns,
      unauthorized,

      //composable
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,
    };
  },
});
</script>
