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
          <!--          <button-->
          <!--            type="button"-->
          <!--            class="btn btn-primary btn-sm"-->
          <!--            data-bs-toggle="modal"-->
          <!--            data-bs-target="#kt_modal_add_notification_activity_group"-->
          <!--            @click="showNotificationActivityGroupModal('Add', {})"-->
          <!--          >-->
          <!--            <span class="svg-icon svg-icon-2">-->
          <!--              <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />-->
          <!--            </span>-->
          <!--            Add Notification Activity Group-->
          <!--          </button>-->
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pt-0">
      <KTDatatable
        :data="notificationActivityGroups"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
        :itemsPerPage="table_options.page_size"
        :total="meta.total"
        :loading="loadingNotificationData"
        @page-change="handlePageChange"
        @on-items-per-page-change="handlePerPageChange"
        @on-sort="sortingChanged"
      >
        <template v-slot:id="{ row: data }">
          {{ data.id }}
        </template>
        <template v-slot:name="{ row: data }">
          <p class="text-gray-800 fw-bold">{{ data.name }}</p>
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            @click="showNotificationActivityGroupModal('Edit', data)"
            data-bs-toggle="modal"
            id="edit-btn"
            data-bs-target="#kt_modal_add_notification_activity_group"
          >
            View/Edit
          </button>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <!--Add notificationActivityGroup Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_notification_activity_group"
    ref="notificationActivityGroupModalRef"
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
          @submit.prevent="processNotificationActivityGroupAction()"
          :model="notificationActivityGroup"
          :rules="modalFormRules"
          ref="formNotificationActivityGroupRef"
        >
          <!--begin::Modal header-->
          <div
            class="modal-header"
            id="kt_modal_new_notification_activity_group_header"
          >
            <!--begin::Modal title-->
            <h2>
              {{ notificationActivityGroup.action }} Notification Activity Group
            </h2>
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
              id="kt_modal_notification_activity_group_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_new_notification_activity_group_header"
              data-kt-scroll-wrappers="#kt_modal_notification_activity_group_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Name</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="name">
                  <el-input
                    v-model="notificationActivityGroup.name"
                    placeholder="Name"
                    name="name"
                  ></el-input>
                </el-form-item>
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
              id="kt_modal_add_notification_activity_group_cancel"
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
              id="kt_modal_notification_activity_group_submit"
              class="btn btn-primary btn-sm"
              :data-kt-indicator="refData.loadingAction ? 'on' : null"
            >
              <span v-if="!refData.loadingAction" class="indicator-label">
                {{
                  notificationActivityGroup.action === "Add" ? "Add" : "Update"
                }}
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
  <!--Add notificationActivityGroup Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { hideModal } from "@/core/helpers/dom";
import { useAdminNotificationStore } from "@/stores/admin/notification";

import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import sppData from "@/helpers/data";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import { AlertService } from "@/services/AlertService";

export default defineComponent({
  name: "admin-manage-notification-activity-groups",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //admin notification store
    const notificationStore = useAdminNotificationStore();
    const {
      notificationActivityGroups,
      meta,
      loadingNotificationData,
      unauthorized,
    } = storeToRefs(notificationStore);
    const { getNotificationActivityGroups } = useAdminNotificationStore();

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
        columnName: "ID",
        columnLabel: "id",

        columnWidth: 55,
      },
      {
        columnName: "Notification Activity Group",
        columnLabel: "name",

        columnWidth: 255,
      },

      {
        columnName: "Actions",
        columnLabel: "actions",

        columnWidth: 100,
      },
    ]);

    const table_options = ref({
      current_page: 1,
      page_size: 20,
      search_text: "",
      sort: { column: "", direction: "" },
    });

    const notificationActivityGroup = ref({
      id: 0,
      action: "Add",
      name: "",
      status_id: "",
    } as any);

    const formNotificationActivityGroupRef = ref<null | HTMLFormElement>(null);
    const notificationActivityGroupModalRef = ref<null | HTMLElement>(null);
    const modalFormRules = ref({
      name: [
        {
          required: true,
          message: "Name is required",
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

    const processNotificationActivityGroupAction = () => {
      if (!formNotificationActivityGroupRef.value) {
        return;
      }

      formNotificationActivityGroupRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          switch (notificationActivityGroup.value.action) {
            case "Add":
              break;
            case "Edit":
              notificationStore
                .updateNotificationActivityGroup(
                  notificationActivityGroup.value
                )
                .then(() => {
                  refData.value.loadingAction = false;

                  getNotificationActivityGroups(table_options.value);

                  hideModal(notificationActivityGroupModalRef.value);

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
      getNotificationActivityGroups(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getNotificationActivityGroups(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getNotificationActivityGroups(table_options.value);
    };

    //modal
    const showNotificationActivityGroupModal = (action, data) => {
      if (action === "Add") {
        notificationActivityGroup.value.name = "";
      } else {
        notificationActivityGroup.value.name = data.name;
        notificationActivityGroup.value.id = data.id;
      }

      notificationActivityGroup.value.action = action;
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getNotificationActivityGroups(table_options.value);
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
          getNotificationActivityGroups(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      //variables
      refData,
      notificationActivityGroupModalRef,
      formNotificationActivityGroupRef,
      modalFormRules,
      tableHeader,

      table_options,
      notificationActivityGroup,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      processNotificationActivityGroupAction,
      searchRecords,

      //modal
      showNotificationActivityGroupModal,

      //imported data
      sppData,

      //state
      notificationActivityGroups,
      loadingNotificationData,
      meta,
      unauthorized,
    };
  },
});
</script>
