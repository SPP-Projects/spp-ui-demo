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
            data-bs-target="#kt_modal_add_notification"
            @click="showNotificationModal('Add', {})"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add Notification
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
        :data="notifications"
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

        <template v-slot:activity="{ row: data }">
          {{ data.activity.name }}
        </template>
        <template v-slot:type="{ row: data }">
          {{ data.type.name }}
        </template>
        <template v-slot:recipient_type="{ row: data }">
          {{ data.recipient_type }}
        </template>
        <template v-slot:template="{ row: data }">
          {{ data.template }}
        </template>
        <template v-slot:isActive="{ row: data }">
          {{ data.is_active === 1 ? "Yes" : "No" }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            @click="showNotificationModal('Edit', data)"
            data-bs-toggle="modal"
            id="edit-btn"
            data-bs-target="#kt_modal_add_notification"
          >
            View/Edit
          </button>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <!--Add notification Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_notification"
    ref="notificationModalRef"
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
          @submit.prevent="processNotificationAction()"
          :model="notification"
          :rules="modalFormRules"
          ref="formNotificationRef"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_notification_header">
            <!--begin::Modal title-->
            <h2>{{ notification.action }} Details</h2>
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
              id="kt_modal_new_notification_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_new_notification_header"
              data-kt-scroll-wrappers="#kt_modal_new_notification_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2"
                  >Notification Activity</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="activity_id">
                  <el-select
                    v-model="notification.activity_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in notificationOptions.activities"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      :disabled="refData.loadingAction"
                      >{{ item.name }}
                      {{ item.activity_type ? " - " + item.activity_type : "" }}
                    </el-option>
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2"
                  >Notification Type</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="type_id">
                  <el-select
                    v-model="notification.type_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in notificationOptions.types"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      :disabled="refData.loadingAction"
                    /> </el-select
                ></el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="fs-5 fw-semobold mb-2"
                  >Notification Destination</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="recipient_type">
                  <el-select
                    v-model="notification.recipient_type"
                    placeholder="Select"
                  >
                    <!--                    <el-option value=""></el-option>-->
                    <el-option
                      v-for="item in notificationOptions.types"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      :disabled="refData.loadingAction"
                    /> </el-select
                ></el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2"
                  >Notification Template</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="template_id">
                  <el-select
                    v-model="notification.template_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in notificationOptions.templates"
                      :key="item.id"
                      :label="item.subject"
                      :value="item.id"
                      :disabled="refData.loadingAction"
                      >{{ item.subject }}</el-option
                    >
                  </el-select></el-form-item
                >
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2">Status</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="template_id">
                  <el-select
                    v-model="notification.is_active"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in sppData.adminNotificationStatuses"
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
              id="kt_modal_add_notification_cancel"
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
              id="kt_modal_new_notification_submit"
              class="btn btn-primary btn-sm"
              :data-kt-indicator="refData.loadingAction ? 'on' : null"
            >
              <span v-if="!refData.loadingAction" class="indicator-label">
                {{ notification.action === "Add" ? "Add" : "Update" }}
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
  <!--Add notification Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { hideModal } from "@/core/helpers/dom";
import { useAdminNotificationStore } from "@/stores/admin/notification";

import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import sppData from "@/helpers/data";

export default defineComponent({
  name: "admin-manage-notifications",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const notificationStore = useAdminNotificationStore();
    const {
      notifications,
      meta,
      loadingNotificationData,
      notificationOptions,
    } = storeToRefs(notificationStore);
    const { getNotifications, getNotificationOptions } =
      useAdminNotificationStore();

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
        columnLabel: "activity",
        columnName: "Notification Activity",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnLabel: "type",
        columnName: "Notification Type",
        sortEnabled: false,
        columnWidth: 150,
      },
      {
        columnLabel: "recipient_type",
        columnName: "Notification Destination",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnLabel: "template",
        columnName: "Notification Template",
        sortEnabled: false,
        columnWidth: 150,
      },
      {
        columnLabel: "isActive",
        columnName: "Is Active",
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

    const notification = ref({
      id: 0,
      action: "Add",
      activity_id: "",
      template_id: "",
      type_id: "",
      recipient_type: "",
      is_active: 0,
    } as any);

    const formNotificationRef = ref<null | HTMLFormElement>(null);
    const notificationModalRef = ref<null | HTMLElement>(null);
    const modalFormRules = ref({
      activity_id: [
        {
          required: true,
          message: "Notification Activity is required",
          trigger: "change",
        },
      ],
      template_id: [
        {
          required: true,
          message: "Template is required",
          trigger: "change",
        },
      ],
      type_id: [
        {
          required: true,
          message: "Type is required",
          trigger: "change",
        },
      ],
      // recipient_type: [
      //   {
      //     required: true,
      //     message: "Recipient is required",
      //     trigger: "change",
      //   },
      // ],
      is_active: [
        {
          required: true,
          message: "Status is required",
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

    const processNotificationAction = () => {
      if (!formNotificationRef.value) {
        return;
      }

      formNotificationRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          switch (notification.value.action) {
            case "Add":
              notificationStore
                .addNotification(notification.value)

                .then(() => {
                  getNotifications(table_options.value);

                  hideModal(notificationModalRef.value);

                  Message({
                    message: "Data added successfully.",
                    position: "bottom-right",
                    type: "success",
                    duration: 5000,
                    zIndex: 99999,
                  });
                })
                .finally(() => (refData.value.loadingAction = false));
              break;
            case "Edit":
              notificationStore
                .updateNotification(notification.value)
                .then(() => {
                  refData.value.loadingAction = false;

                  getNotifications(table_options.value);

                  hideModal(notificationModalRef.value);

                  Message({
                    message: "Data updated successfully.",
                    position: "bottom-right",
                    type: "success",
                    duration: 5000,
                    zIndex: 99999,
                  });
                })
                .catch((error) => {
                  // get errors from state
                  const response = error.response.data;

                  if (response.errors) {
                    const errors = response.errors;
                    for (const key in errors) {
                      Message({
                        message: errors[key][0],
                        //TBC
                        //position: "bottom-right",
                        type: "error",
                        duration: 5000,
                        zIndex: 99999,
                      });
                    }
                  } else if (response.error) {
                    Message({
                      message: response.error,
                      //TBC
                      //position: "bottom-right",
                      type: "error",
                      duration: 5000,
                      zIndex: 99999,
                    });
                  }

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
      getNotifications(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getNotifications(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getNotifications(table_options.value);
    };

    //modals
    const showNotificationModal = (action, data) => {
      if (action === "Add") {
        notification.value.activity_id = "";
        notification.value.template_id = "";
        notification.value.type_id = "";
        notification.value.recipient_type = "";
        notification.value.is_active = 0;
      } else {
        notification.value = data;
      }

      notification.value.action = action;
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getNotifications(table_options.value);
      getNotificationOptions();
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
          getNotifications(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      //variables
      refData,
      notificationModalRef,
      formNotificationRef,
      modalFormRules,
      tableHeader,
      meta,
      table_options,
      notification,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      processNotificationAction,
      searchRecords,

      //modals
      showNotificationModal,

      //sppdata
      sppData,

      //state
      notifications,
      loadingNotificationData,
      notificationOptions,
    };
  },
});
</script>
