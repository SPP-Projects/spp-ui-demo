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
            data-bs-target="#kt_modal_add_payment_map"
            @click="showAddPaymentMapModal('Add', {})"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add Institution Payment Method Map
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
        :data="paymentMaps"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingPaymentMapData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:id="{ row: data }">
          {{ data.id }}
        </template>

        <template v-slot:institution="{ row: data }">
          {{ data.institution.name }}
        </template>

        <template v-slot:payment_method="{ row: data }">
          {{ data.payment_method.name }}
        </template>
        <template v-slot:payment_direction="{ row: data }">
          {{ data.payment_direction }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            @click="showAddPaymentMapModal('Edit', data)"
            data-bs-toggle="modal"
            id="edit-btn"
            data-bs-target="#kt_modal_add_payment_map"
          >
            View/Edit
          </button>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <!--Add paymentMap Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_payment_map"
    ref="paymentMapModalRef"
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
          @submit.prevent="processPaymentMapAction()"
          :model="paymentMap"
          :rules="modalFormRules"
          ref="formPaymentMapRef"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_payment_map_header">
            <!--begin::Modal title-->
            <h2>{{ paymentMap.action }} Details</h2>
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
              id="kt_modal_new_new_payment_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_new_payment_map_header"
              data-kt-scroll-wrappers="#kt_modal_new_new_payment_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Payment Direction</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="payment_direction">
                  <el-input
                    v-model="paymentMap.payment_direction"
                    placeholder="Payment Direction"
                    name="payment_direction"
                  ></el-input>
                </el-form-item>
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
                    v-model="paymentMap.institution_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in paymentMapOptions.institutions"
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
                  >Payment Method</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="payment_method_id">
                  <el-select
                    v-model="paymentMap.payment_method_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in paymentMapOptions.payment_methods"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      :disabled="refData.loadingAction"
                    /> </el-select
                ></el-form-item>
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
              id="kt_modal_add_payment_map_cancel"
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
              id="kt_modal_new_new_payment_submit"
              class="btn btn-primary btn-sm"
              :data-kt-indicator="refData.loadingAction ? 'on' : null"
            >
              <span v-if="!refData.loadingAction" class="indicator-label">
                {{ paymentMap.action === "Add" ? "Add" : "Update" }}
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
  <!--Add paymentMap Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useAdminPaymentMapStore } from "@/stores/admin/paymentmap";
import { hideModal } from "@/core/helpers/dom";
import { storeToRefs } from "pinia";

import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import { AlertService } from "@/services/AlertService";

export default defineComponent({
  name: "admin-payment-maps",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const paymentMapStore = useAdminPaymentMapStore();
    const {
      paymentMaps,
      meta,
      loadingPaymentMapData,
      paymentMapOptions,
      unauthorized,
    } = storeToRefs(paymentMapStore);
    const { getPaymentMaps, getPaymentMapsOptions } = useAdminPaymentMapStore();

    //data variables
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,
      loadingAction: false,
    });

    const tableHeader = ref([
      { columnLabel: "id", columnName: "ID", sortEnabled: true },
      {
        columnLabel: "institution",
        columnName: "institution",
        sortEnabled: true,
      },
      {
        columnLabel: "payment_method",
        columnName: "payment method",
        sortEnabled: false,
      },
      {
        columnLabel: "payment_direction",
        columnName: "payment direction",
        sortEnabled: true,
      },
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

    const paymentMap = ref({
      id: 0,
      action: "Add",
      payment_direction: "",
      institution_id: "",
      payment_method_id: "",
    } as any);

    const formPaymentMapRef = ref<null | HTMLFormElement>(null);
    const paymentMapModalRef = ref<null | HTMLElement>(null);
    const modalFormRules = ref({
      payment_direction: [
        {
          required: true,
          message: "Payment Direction is required",
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
      payment_method_id: [
        {
          required: true,
          message: "Payment method is required",
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

    const processPaymentMapAction = () => {
      if (!formPaymentMapRef.value) {
        return;
      }

      formPaymentMapRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          switch (paymentMap.value.action) {
            case "Add":
              paymentMapStore
                .addPaymentMap(paymentMap.value)

                .then(() => {
                  getPaymentMaps(table_options.value);

                  hideModal(paymentMapModalRef.value);

                  //display message using shared AlertService
                  AlertService.displaySuccessAlert(
                    "Data updated successfully!"
                  );
                })
                .finally(() => (refData.value.loadingAction = false));
              break;
            case "Edit":
              paymentMapStore
                .updatePaymentMap(paymentMap.value)
                .then(() => {
                  refData.value.loadingAction = false;

                  getPaymentMaps(table_options.value);

                  hideModal(paymentMapModalRef.value);

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
      getPaymentMaps(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getPaymentMaps(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getPaymentMaps(table_options.value);
    };

    //modals

    const showAddPaymentMapModal = (action, data) => {
      if (action === "Add") {
        paymentMap.value.payment_direction = "";
        paymentMap.value.institution_id = "";
        paymentMap.value.payment_method_id = "";
      } else {
        paymentMap.value = data;
      }
      paymentMap.value.action = action;
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getPaymentMaps(table_options.value);
      getPaymentMapsOptions();
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
          getPaymentMaps(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      //variables
      refData,
      paymentMapModalRef,
      formPaymentMapRef,
      modalFormRules,
      tableHeader,
      meta,
      table_options,
      paymentMap,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      processPaymentMapAction,
      searchRecords,

      //modals
      showAddPaymentMapModal,

      //state
      paymentMaps,
      loadingPaymentMapData,
      paymentMapOptions,
      unauthorized,
    };
  },
});
</script>
