<template>
  <!--begin::Layout-->
  <div class="d-flex flex-column flex-xl-row">
    <!--begin::Sidebar-->
    <div
      class="flex-column flex-lg-row-auto w-100 w-xl-300px mb-10"
      v-if="customer"
    >
      <!--begin::Card-->
      <div class="card mb-5 mb-xl-8">
        <!--begin::Card body-->
        <div class="card-body pt-15">
          <!--begin::Summary-->
          <div class="d-flex flex-center flex-column mb-5">
            <!--begin::Name-->
            <span class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1">
              {{ customer.name }}
            </span>
            <!--end::Name-->

            <!--begin::Position-->
            <div class="fs-5 fw-semobold text-muted mb-6">
              Phone: {{ customer.phone }}
            </div>
            <!--end::Position-->
          </div>
          <!--end::Summary-->

          <!--begin::Details toggle-->
          <div class="d-flex flex-stack fs-4 py-3">
            <div
              class="fw-bold rotate collapsible"
              data-bs-toggle="collapse"
              href="#kt_customer_view_details"
              role="button"
              aria-expanded="false"
              aria-controls="kt_customer_view_details"
            >
              Details
              <span class="ms-2 rotate-180">
                <span class="svg-icon svg-icon-3">
                  <inline-svg src="/media/icons/duotune/arrows/arr072.svg" />
                </span>
              </span>
            </div>

            <span
              data-bs-toggle="tooltip"
              data-bs-trigger="hover"
              title="Edit customer details"
            >
              <a
                href="#"
                class="btn btn-sm btn-light-primary"
                data-bs-toggle="modal"
                @click="showEditCustomerModal()"
                id="edit-btn"
                data-bs-target="#kt_modal_update_customer"
              >
                Edit
              </a>
            </span>
          </div>
          <!--end::Details toggle-->

          <div class="separator separator-dashed my-3"></div>

          <!--begin::Details content-->
          <div id="kt_customer_view_details" class="collapse show">
            <div class="py-5 fs-6">
              <!--begin::Details item-->
              <div class="fw-bold mt-5">Customer Type</div>
              <div class="text-gray-600" v-if="customer.type">
                {{ customer.type.name }}
              </div>
              <!--begin::Details item-->
              <!--begin::Details item-->
              <div class="fw-bold mt-5">Customer Group</div>
              <div class="text-gray-600">
                <span
                  class="text-gray-600 text-hover-primary"
                  v-if="customer.group"
                  >{{ customer.group.name }}</span
                >
              </div>
              <!--begin::Details item-->
            </div>
          </div>
          <!--end::Details content-->
        </div>
        <!--end::Card body-->
      </div>

      <div class="card mb-5 mb-xl-8">
        <!--begin::Card body-->
        <div class="card-body pt-2">
          <!--begin::Items-->
          <div class="py-2">
            <!--begin::Item-->
            <div class="d-flex flex-stack">
              <div class="d-flex">
                <div class="d-flex flex-column">
                  <router-link
                    to="/admin/customers/manage"
                    class="fs-5 text-dark text-hover-primary fw-bold"
                  >
                    All Customers ></router-link
                  >
                </div>
              </div>
            </div>
            <!--end::Item-->

            <div class="separator separator-dashed my-5"></div>

            <!--begin::Item-->
            <div class="d-flex flex-stack">
              <div class="d-flex">
                <div class="d-flex flex-column">
                  <router-link
                    to="/admin/customers/types"
                    class="fs-5 text-dark text-hover-primary fw-bold"
                  >
                    Customer Types ></router-link
                  >
                </div>
              </div>
            </div>
            <!--end::Item-->

            <div class="separator separator-dashed my-5"></div>

            <!--begin::Item-->
            <div class="d-flex flex-stack">
              <div class="d-flex">
                <div class="d-flex flex-column">
                  <router-link
                    to="/admin/customers/groups"
                    class="fs-5 text-dark text-hover-primary fw-bold"
                  >
                    Customer Groups ></router-link
                  >
                </div>
              </div>
            </div>
            <!--end::Item-->
          </div>
          <!--end::Items-->
        </div>
        <!--end::Card body-->
      </div>
    </div>
    <!--end::Sidebar-->

    <!--begin::Content-->
    <div class="flex-lg-row-fluid ms-lg-15">
      <!--begin::Navbar-->
      <div class="card mb-5 mb-xl-10">
        <div class="card-body pt-9 pb-0">
          <!--begin::Navs-->
          <div class="d-flex overflow-auto h-55px">
            <ul
              class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold flex-nowrap"
            >
              <!--begin::Nav item-->
              <li class="nav-item">
                <router-link
                  :to="'/admin/customers/view/' + customer.id"
                  class="nav-link text-active-primary me-6"
                  active-class="active"
                >
                  Overview
                </router-link>
              </li>
              <!--end::Nav item-->

              <!--begin::Nav item-->
              <li class="nav-item">
                <router-link
                  :to="'/admin/customers/view/' + customer.id + '/permissions/'"
                  class="nav-link text-active-primary me-6"
                  active-class="active"
                >
                  Permissions
                </router-link>
              </li>
              <!--end::Nav item-->

              <!--begin::Nav item-->
              <li class="nav-item">
                <router-link
                  :to="'/admin/customers/view/' + customer.id + '/users/'"
                  class="nav-link text-active-primary me-6"
                  active-class="active"
                >
                  Users
                </router-link>
              </li>
              <!--end::Nav item-->

              <!--begin::Nav item-->

              <li class="nav-item">
                <router-link
                  :to="'/admin/customers/view/' + customer.id + '/kyc/'"
                  class="nav-link text-active-primary me-6"
                  active-class="active"
                >
                  KYC
                </router-link>
              </li>
              <!--end::Nav item-->
            </ul>
          </div>
          <!--begin::Navs-->
        </div>
      </div>
      <!--end::Navbar-->

      <router-view></router-view>
    </div>
    <!--end::Content-->
  </div>
  <!--end::Layout-->

  <!-- Update Customer Modal-->
  <div
    class="modal fade"
    id="kt_modal_update_customer"
    ref="updateCustomerModalRef"
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
        <div
          class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15"
          v-if="formData"
        >
          <el-form
            @submit.prevent="processCustomerAction()"
            class="form"
            :model="formData"
            :rules="rules"
            ref="formAddUpdateCustomerRef"
          >
            <!--begin::Heading-->
            <div class="mb-13 text-center">
              <!--begin::Title-->
              <h1 class="mb-3">{{ formData.action }} Customer Details</h1>
              <!--end::Title-->
            </div>
            <!--end::Heading-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-4 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span class="required">Customer Name</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7"></i>
              </label>
              <!--end::Label-->

              <el-form-item prop="title">
                <el-input
                  v-model="formData.name"
                  placeholder="Enter name"
                  name="title"
                ></el-input>
              </el-form-item>
            </div>

            <div class="d-flex flex-column mb-4 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span class="required">Phone</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7"></i>
              </label>
              <!--end::Label-->

              <el-form-item prop="phone">
                <el-input
                  v-model="formData.phone"
                  placeholder="Enter phone"
                  name="phone"
                ></el-input>
              </el-form-item>
            </div>

            <!--end::Input group-->
          </el-form>
        </div>
        <div class="modal-footer flex-center" v-if="formData">
          <!--begin::Button-->
          <button
            type="reset"
            id="kt_modal_update_customer_cancel"
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
            @click="processCustomerAction()"
            :disabled="refData.loadingAction"
          >
            <span v-if="!refData.loadingAction" class="indicator-label">
              {{ formData.action === "Add" ? "Add" : "Update" }}
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
  <!-- Update Customer Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import { storeToRefs } from "pinia";
import { useAdminCustomerStore } from "@/stores/admin/customer";
import { useRoute } from "vue-router";
import Message from "vue-m-message";
import { hideModal } from "@/core/helpers/dom";

export default defineComponent({
  name: "admin-customers-customer-navbar",
  components: {},
  setup() {
    //store
    const customerStore = useAdminCustomerStore();
    const { customer, loadingCustomerInfo } = storeToRefs(customerStore);
    const { getCustomer } = useAdminCustomerStore();

    //route
    const route = useRoute();

    //ref
    const refData = ref({
      loadingPage: true,
      loadingAction: false,
    });

    const formData = ref({
      id: 0,
      action: "Add",
      name: "",
      phone: "",
    } as any);

    const formAddUpdateCustomerRef = ref<null | HTMLFormElement>(null);

    const updateCustomerModalRef = ref<null | HTMLElement>(null);

    const showEditCustomerModal = async () => {
      formData.value.id = customer.value.id;
      formData.value.name = customer.value.name;
      formData.value.phone = customer.value.phone;
      formData.value.action = "Edit";
    };
    const rules = ref({
      name: [
        {
          required: true,
          message: "Name is required",
          trigger: "change",
        },
      ],
      phone: [
        {
          required: true,
          message: "Phone is required",
          trigger: "change",
        },
      ],
      status_id: [
        {
          required: true,
          message: "Status is required",
          trigger: "change",
        },
      ],
    });
    const processCustomerAction = () => {
      if (!formAddUpdateCustomerRef.value) {
        return;
      }

      formAddUpdateCustomerRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          console.log(formData.value);
          customerStore
            .updateCustomer(formData.value)

            .then((response) => {
              console.log(response);

              formData.value.action = "Edit";

              // update loading status
              refData.value.loadingAction = false;

              Message({
                message: "Data updated successfully.",
                //TBC
                position: "bottom-right",
                type: "success",
                duration: 5000,
                zIndex: 99999,
              });

              // update records
              getCustomer(route.params.id);

              hideModal(updateCustomerModalRef.value);
            })
            .catch((error) => {
              // get errors from state
              let response = error.response.data;

              if (response.errors) {
                let errors = response.errors;
                for (const key in errors) {
                  Message({
                    message: errors[key][0],
                    //TBC
                    position: "bottom-right",
                    type: "error",
                    duration: 5000,
                    zIndex: 99999,
                  });
                }
              } else if (response.error) {
                Message({
                  message: response.error,
                  //TBC
                  position: "bottom-right",
                  type: "error",
                  duration: 5000,
                  zIndex: 99999,
                });
              }

              // update loading status
              refData.value.loadingAction = false;
            });
        } else {
          return false;
        }
      });
    };
    onMounted(() => {
      refData.value.loadingPage = true;
      getCustomer(route.params.id);
      refData.value.loadingPage = false;
    });

    return {
      refData,
      customer,
      loadingCustomerInfo,

      formAddUpdateCustomerRef,
      updateCustomerModalRef,
      showEditCustomerModal,
      formData,
      rules,
      processCustomerAction,
    };
  },
});
</script>
