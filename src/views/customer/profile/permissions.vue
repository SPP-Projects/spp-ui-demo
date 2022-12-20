<template>
  <!--begin::details View-->
  <div class="card card-flush">
    <!--begin::Card header-->
    <div class="card-header mt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <h3>Permissions</h3>
      </div>
      <!--end::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Button-->
        <button type="button" class="btn btn-light-primary">
          <!--begin::Svg Icon | path: icons/duotune/general/gen035.svg-->
          <span class="svg-icon svg-icon-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                opacity="0.3"
                x="2"
                y="2"
                width="20"
                height="20"
                rx="5"
                fill="currentColor"
              />
              <rect
                x="10.8891"
                y="17.8033"
                width="12"
                height="2"
                rx="1"
                transform="rotate(-90 10.8891 17.8033)"
                fill="currentColor"
              />
              <rect
                x="6.01041"
                y="10.9247"
                width="12"
                height="2"
                rx="1"
                fill="currentColor"
              />
            </svg>
          </span>
          <!--end::Svg Icon-->
          Update Permissions
        </button>
        <!--end::Button-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->
    <!--begin::Card body-->
    <div class="card-body pt-0">
      <!--begin::Table-->
      <table
        class="table align-middle table-row-dashed fs-6 gy-5 mb-0"
        id="kt_permissions_table"
      >
        <!--begin::Table head-->
        <thead>
          <!--begin::Table row-->
          <tr class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
            <th class="min-w-125px">Name</th>
            <th class="min-w-250px">Assigned to</th>

            <th class="text-end min-w-100px">Actions</th>
          </tr>
          <!--end::Table row-->
        </thead>
        <!--end::Table head-->
        <!--begin::Table body-->
        <tbody class="fw-semibold text-gray-600">
          <tr
            v-for="(
              permission_group, key
            ) in authenticatedUserDetails.permissions"
            :key="key"
          >
            <!--begin::Name=-->
            <td>{{ key }}</td>
            <!--end::Name=-->
            <!--begin::Assigned to=-->
            <td>
              {{ data.user.enabled_permissions }}
              <template
                v-for="permission in permission_group"
                :key="permission.id"
              >
                <div class="m-3">
                  <input
                    class="form-check-input h-20px w-20px checkbox-success me-3 mw-10"
                    type="checkbox"
                    :value="permission.permission_id"
                    v-model="authenticatedUserDetails.enabled_permissions"
                    disabled
                  />
                  <span class="form-check-label fw-semobold me-md-1">
                    <b>Can</b> {{ permission.name }}
                  </span>
                </div>
              </template>
            </td>

            <td class="text-end">...</td>
            <!--end::Action=-->
          </tr>
        </tbody>
        <!--end::Table body-->
      </table>
      <!--end::Table-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useCustomerUserStore } from "@/stores/customer/user";
import { storeToRefs } from "pinia";
import type { User } from "@/models/user";

export default defineComponent({
  name: "user-permissions",
  components: {},
  setup() {
    //store
    const userStore = useCustomerUserStore();
    const { authenticatedUserDetails, loadingUserData } =
      storeToRefs(userStore);

    //data variables
    const data = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,

      loadingAction: false,

      user: {} as User,
      permissions: [],
    });

    return {
      data,
      authenticatedUserDetails,
      loadingUserData,
    };
  },
});
</script>
