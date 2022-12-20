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
            data-bs-target="#kt_modal_add_customer"
            @click="showAddUserModal"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add User
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
        :data="customerUsers"
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
          <div class="d-flex align-items-center">
            <!--begin:: Avatar -->
            <div class="symbol symbol-circle symbol-50px overflow-hidden me-3">
              <div class="symbol-label" v-if="data.avatar">
                <img :src="data.avatar" class="w-100" :alt="data.name" />
              </div>

              <div class="symbol-label fs-3 bg-light-danger text-danger" v-else>
                {{ data.name.charAt(0) }}
              </div>
            </div>
            <!--end::Avatar-->
            <!--begin::User details-->
            <div class="d-flex flex-column">
              <a
                href="#"
                class="text-gray-900 text-hover-primary mb-1 fw-bold"
                >{{ data.name }}</a
              >
              <span>{{ data.email }}</span>
            </div>
            <!--begin::User details-->
          </div>
        </template>

        <template v-slot:status_id="{ row: data }">
          <span v-if="data.status_id === 1" class="badge badge-light-primary"
            >Inactive</span
          >

          <span v-if="data.status_id === 2" class="badge badge-light-success"
            >Active</span
          >

          <span v-if="data.status_id === 3" class="badge badge-light-danger"
            >Deleted</span
          >
        </template>

        <template v-slot:phone="{ row: data }">
          {{ data.phone }}
        </template>

        <template v-slot:last_login_at="{ row: data }">
          {{ data.last_login_at }}
        </template>

        <template v-slot:last_login_ip="{ row: data }">
          {{ data.last_login_ip }}
        </template>

        <template v-slot:actions="{ row: data }">
          <button
            class="btn btn-sm btn-light-info btn-active-light-info"
            @click="showEditUserModal(data)"
            data-bs-toggle="modal"
            id="edit-btn"
            data-bs-target="#kt_modal_add_customer"
          >
            View/Edit
          </button>
        </template>
      </KTDatatable>
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <!--Add user Modal-->
  <div
    class="modal fade"
    id="kt_modal_add_customer"
    ref="AddUpdateUserModalRef"
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
        <div class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15" v-if="user">
          <el-form
            @submit.prevent="processUserAction()"
            class="form"
            :model="user"
            :rules="rules"
            ref="formAddUpdateUserRef"
          >
            <!--begin::Heading-->
            <div class="mb-13 text-center">
              <!--begin::Title-->
              <h1 class="mb-3">{{ user.action }} User Details</h1>
              <!--end::Title-->
            </div>
            <!--end::Heading-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-4 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span class="required">Name</span>
                <i
                  class="fas fa-exclamation-circle ms-2 fs-7"
                  data-bs-toggle="tooltip"
                  title="Specify a target name for future usage and reference"
                ></i>
              </label>
              <!--end::Label-->

              <el-form-item prop="name">
                <el-input
                  v-model="user.name"
                  placeholder="Enter Name"
                  name="name"
                ></el-input>
              </el-form-item>
            </div>
            <div class="d-flex flex-column mb-4 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span class="required">Email</span>
                <i
                  class="fas fa-exclamation-circle ms-2 fs-7"
                  data-bs-toggle="tooltip"
                  title="Specify a target name for future usage and reference"
                ></i>
              </label>
              <!--end::Label-->

              <el-form-item prop="email">
                <el-input
                  v-model="user.email"
                  placeholder="Enter Email"
                  name="email"
                ></el-input>
              </el-form-item>
            </div>
            <div class="d-flex flex-column mb-4 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span class="required">Phone</span>
                <i
                  class="fas fa-exclamation-circle ms-2 fs-7"
                  data-bs-toggle="tooltip"
                  title="Specify a target name for future usage and reference"
                ></i>
              </label>
              <!--end::Label-->

              <el-form-item prop="phone">
                <el-input
                  v-model="user.phone"
                  placeholder="Enter Phone"
                  name="phone"
                ></el-input>
              </el-form-item>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row g-9 mb-8">
              <!--begin::Col-->
              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2">Status</label>

                <el-select v-model="user.status_id" placeholder="Select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="refData.loadingAction"
                  />
                </el-select>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->

            <h4>Permissions</h4>
            <div
              class="mb-5 row fv-row"
              v-for="(permission_group, key) in user.permissions"
              :key="key"
            >
              <div class="">
                <div class="fw-semobold me-5">
                  <label class="fs-6">{{ key }}</label>
                </div>
                <div
                  class="d-flex align-items-center m-3"
                  v-for="permission in permission_group"
                  :key="permission.id"
                >
                  <label
                    class="form-check form-check-custom form-check-solid me-10"
                  >
                    <input
                      class="form-check-input h-20px w-20px checkbox-success"
                      type="checkbox"
                      :value="permission.permission_id"
                      v-model="checkedRows"
                    />

                    <span class="form-check-label fw-semobold">
                      <b>Can</b> {{ permission.name }}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <!--end::Input group-->
          </el-form>
        </div>
        <div class="modal-footer flex-center" v-if="user">
          <!--begin::Button-->
          <button
            type="reset"
            id="kt_modal_add_customer_cancel"
            class="btn btn-light me-3"
            data-bs-dismiss="modal"
            :disabled="refData.loadingAction"
          >
            Cancel
          </button>
          <!--end::Button-->

          <!--begin::Button-->
          <button
            :data-kt-indicator="refData.loadingAction ? 'on' : null"
            class="btn btn-lg btn-primary"
            type="submit"
            @click="processUserAction()"
          >
            <span v-if="!refData.loadingAction" class="indicator-label">
              {{ user.action === "Add" ? "Add" : "Update" }}
              <span class="svg-icon svg-icon-3 ms-2 me-0">
                <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
              </span>
            </span>
            <span v-if="refData.loadingAction" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <!--end::Button-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--Add user Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";

import { hideModal } from "@/core/helpers/dom";
import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";

import { storeToRefs } from "pinia";

import { useAdminCustomerStore } from "@/stores/admin/customer";
import { useRoute } from "vue-router";
import type { User } from "@/models/user";

export default defineComponent({
  inheritAttrs: false,
  name: "admin-manage-customer-users",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  setup() {
    //store
    const customerStore = useAdminCustomerStore();
    const { customerUsers, meta, loadingCustomerData } =
      storeToRefs(customerStore);
    const { getCustomerUsers } = useAdminCustomerStore();
    const route = useRoute();
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
      { columnLabel: "name", columnName: "Name", sortEnabled: true },
      { columnLabel: "status_id", columnName: "Status", sortEnabled: false },
      { columnLabel: "phone", columnName: "Phone", sortEnabled: true },
      {
        columnLabel: "last_login_at",
        columnName: "Last Logged Time",
        sortEnabled: true,
      },
      {
        columnLabel: "last_login_ip",
        columnName: "Last Logged IP",
        sortEnabled: false,
      },
      {
        columnLabel: "actions",
        columnName: "Actions",
      },
    ]);

    const table_options = ref({
      customer_id: 0 as number,
      current_page: 1,
      page_size: 10,
      search_text: "",
      sort: { column: "", direction: "" },
    } as any);
    const action = ref("");
    // const user = ref<User>({
    //   id: 0,
    //   action: "Add",
    //   name: "",
    //   email: "",
    //   phone: "",
    //   enabled_permissions: [],
    // });
    const user = ref<User>();
    const formAddUpdateUserRef = ref<null | HTMLFormElement>(null);
    const AddUpdateUserModalRef = ref<null | HTMLElement>(null);
    const rules = ref({
      name: [
        {
          required: true,
          message: "Name is required",
          trigger: "change",
        },
      ],
    });
    const options = [
      {
        value: "1",
        label: "Inactive",
      },
      {
        value: "2",
        label: "Active",
      },
      {
        value: "3",
        label: "Deleted",
      },
    ];

    const searchRecords = ref({
      isSearching: false,
      debounceTimeout: ref<number>(0),
      debounce: 2000,
      kDebounceTimeoutMs: 1000,
    });

    const processUserAction = () => {
      if (!formAddUpdateUserRef.value) {
        return;
      }

      formAddUpdateUserRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;
          user.value.enabled_permissions = checkedRows.value;
          const payload = {
            customer_id: route.params.id,
            user_id: user.value.id,
            request: user.value,
          };

          switch (user.value.action) {
            case "Add":
              //TODO - work on add user api
              customerStore
                .addCustomerUser(user.value)

                .then((response: User) => {
                  // update user action to edit
                  user.value = response;
                  user.value.action = "Edit";

                  // update user records
                  getCustomerUsers(table_options.value);
                })
                .finally(() => (refData.value.loadingAction = false));
              break;
            case "Edit":
              customerStore
                .updateCustomerUser(payload)
                .then((response: any) => {
                  // update user action to edit
                  user.value = response.user;
                  user.value.action = "Edit";

                  // update loading status
                  refData.value.loadingAction = false;

                  Message({
                    message: "User updated successfully.",
                    //TBC
                    //position: "bottom-right",
                    type: "success",
                    duration: 5000,
                    zIndex: 99999,
                  });

                  // update user records
                  getCustomerUsers(table_options.value);

                  hideModal(AddUpdateUserModalRef.value);
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
      getCustomerUsers(table_options.value);
    };

    const handlePageChange = (val) => {
      table_options.value.current_page = val;
      getCustomerUsers(table_options.value);
    };

    const sortingChanged = (ctx) => {
      table_options.value.sort.column = ctx.label;
      table_options.value.sort.direction = ctx.order === true ? "DESC" : "ASC";
      table_options.value.sort.direction = ctx.order;

      // reset page to 1
      table_options.value.current_page = 1;

      // get customers
      getCustomerUsers(table_options.value);
    };

    const checkedRows = ref<Array<number>>([]);
    const getUser = () => {
      const payload = {
        customer_id: route.params.id,
        user_id: user.value.id,
      };
      customerStore.getCustomerUser(payload).then((response: User) => {
        const action = user.value.action;

        user.value = response;
        user.value.action = action;

        checkedRows.value = response.enabled_permissions;
      });
    };

    //modals
    const showEditUserModal = async (data) => {
      user.value = data;
      user.value.action = "Edit";
      await getUser();
      user.value.action = "Edit";
    };

    const showAddUserModal = () => {
      user.value = {
        id: 0,
        action: "Add",
        name: "",
        email: "",
        phone: "",
        enabled_permissions: [],
      };
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      table_options.value.customer_id = route.params.id;

      getCustomerUsers(table_options.value);
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
          getCustomerUsers(table_options.value);
          searchRecords.value.isSearching = false;
        }, searchRecords.value.kDebounceTimeoutMs);
      }
    );

    return {
      //variables
      refData,
      AddUpdateUserModalRef,
      formAddUpdateUserRef,
      options,
      rules,
      tableHeader,
      meta,
      table_options,
      action,
      user,

      //functions
      handlePageChange,
      handlePerPageChange,
      sortingChanged,
      processUserAction,
      getUser,
      searchRecords,

      //modals
      showAddUserModal,
      showEditUserModal,

      //state
      customerUsers,
      loadingCustomerData,

      //
      checkedRows,
    };
  },
});
</script>
