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
            data-bs-target="#kt_modal_add_notification_template"
            @click="showAddNotificationTemplateModal('Add', {})"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add Notification Template
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
        :data="notificationTemplates"
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

        <template v-slot:language_id="{ row: data }">
          {{ data.language.name }}
        </template>
        <template v-slot:name="{ row: data }">
          {{ data.name }}
        </template>
        <template v-slot:subject="{ row: data }">
          {{ data.subject }}
        </template>
        <template v-slot:body="{ row: data }">
          {{ data.body }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            @click="showAddNotificationTemplateModal('Edit', data)"
            data-bs-toggle="modal"
            id="edit-btn"
            data-bs-target="#kt_modal_add_notification_template"
          >
            View/Edit
          </button>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <!--Add notificationTemplate Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_notification_template"
    ref="notificationTemplateModalRef"
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
          @submit.prevent="processNotificationTemplateAction()"
          :model="notificationTemplate"
          :rules="modalFormRules"
          ref="formNotificationTemplateRef"
        >
          <!--begin::Modal header-->
          <div
            class="modal-header"
            id="kt_modal_new_notification_template_header"
          >
            <!--begin::Modal title-->
            <h2>{{ notificationTemplate.action }} Details</h2>
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
              id="kt_modal_new_notification_template_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_new_notification_template_header"
              data-kt-scroll-wrappers="#kt_modal_new_notification_template_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semobold mb-2">Language</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="language_id">
                  <el-select
                    v-model="notificationTemplate.language_id"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in notificationTemplateOptions.languages"
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
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Name</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="name">
                  <el-input
                    v-model="notificationTemplate.name"
                    placeholder="name"
                    name="name"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Subject</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="subject">
                  <el-input
                    v-model="notificationTemplate.subject"
                    placeholder="subject"
                    name="subject"
                  ></el-input>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="d-flex align-items-center fs-5 fw-semobold mb-2">
                  <span class="required">Body</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="body">
                  <el-input
                    v-model="notificationTemplate.body"
                    placeholder="body"
                    name="body"
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
              id="kt_modal_add_notification_template_cancel"
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
              id="kt_modal_new_notification_template_submit"
              class="btn btn-primary btn-sm"
              :data-kt-indicator="refData.loadingAction ? 'on' : null"
            >
              <span v-if="!refData.loadingAction" class="indicator-label">
                {{ notificationTemplate.action === "Add" ? "Add" : "Update" }}
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
  <!--Add notificationTemplate Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAdminNotificationStore } from "@/stores/admin/notification";
import { hideModal } from "@/core/helpers/dom";

import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import { AlertService } from "@/services/AlertService";

export default defineComponent({
  name: "admin-manage-notification-templates",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const notificationStore = useAdminNotificationStore();
    const {
      notificationTemplates,
      meta,
      loadingNotificationData,
      notificationTemplateOptions,
      unauthorized,
    } = storeToRefs(notificationStore);
    const { getNotificationTemplates, getNotificationTemplateOptions } =
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
        columnLabel: "language_id",
        columnName: "language",
        sortEnabled: true,
      },
      {
        columnLabel: "name",
        columnName: "name",
        sortEnabled: true,
      },
      {
        columnLabel: "subject",
        columnName: "subject",
        sortEnabled: false,
      },
      {
        columnLabel: "body",
        columnName: "body",
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

    const notificationTemplate = ref({
      id: 0,
      action: "Add",
      language_id: 1,
      name: "",
      subject: "",
      body: "",
    } as any);

    const formNotificationTemplateRef = ref<null | HTMLFormElement>(null);
    const notificationTemplateModalRef = ref<null | HTMLElement>(null);
    const modalFormRules = ref({
      name: [
        {
          required: true,
          message: "Name is required",
          trigger: "change",
        },
      ],
      language_id: [
        {
          required: true,
          message: "Language is required",
          trigger: "change",
        },
      ],
      subject: [
        {
          required: true,
          message: "Subject is required",
          trigger: "change",
        },
      ],
      body: [
        {
          required: true,
          message: "Body is required",
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

    const processNotificationTemplateAction = () => {
      if (!formNotificationTemplateRef.value) {
        return;
      }

      formNotificationTemplateRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          switch (notificationTemplate.value.action) {
            case "Add":
              notificationStore
                .addNotificationTemplate(notificationTemplate.value)

                .then(() => {
                  getNotificationTemplates(table_options.value);

                  hideModal(notificationTemplateModalRef.value);

                  //display message using shared AlertService
                  AlertService.displaySuccessAlert(
                    "Data updated successfully!"
                  );
                })
                .finally(() => (refData.value.loadingAction = false));
              break;
            case "Edit":
              notificationStore
                .updateNotificationTemplate(notificationTemplate.value)
                .then(() => {
                  refData.value.loadingAction = false;

                  getNotificationTemplates(table_options.value);

                  hideModal(notificationTemplateModalRef.value);

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
      getNotificationTemplates(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getNotificationTemplates(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      getNotificationTemplates(table_options.value);
    };

    //modals

    const showAddNotificationTemplateModal = (action, data) => {
      if (action === "Add") {
        notificationTemplate.value.language_id = 1;
        notificationTemplate.value.name = "";
        notificationTemplate.value.body = "";
        notificationTemplate.value.subject = "";
      } else {
        notificationTemplate.value = data;
      }
      notificationTemplate.value.action = action;
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getNotificationTemplates(table_options.value);
      getNotificationTemplateOptions();
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
          getNotificationTemplates(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      //variables
      refData,
      notificationTemplateModalRef,
      formNotificationTemplateRef,
      modalFormRules,
      tableHeader,
      meta,
      table_options,
      notificationTemplate,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      processNotificationTemplateAction,
      searchRecords,

      //modals
      showAddNotificationTemplateModal,

      //state
      notificationTemplates,
      loadingNotificationData,
      notificationTemplateOptions,
      unauthorized,
    };
  },
});
</script>
