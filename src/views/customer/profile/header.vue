<template>
  <div class="card mb-5 mb-xl-10">
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->
      <div
        class="d-flex flex-wrap flex-sm-nowrap mb-3"
        v-if="authenticatedUserDetails"
      >
        <!--begin: Pic-->
        <div class="me-7 mb-4">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
            <img src="/media/avatars/300-1.jpg" alt="image" />
            <div
              class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"
            ></div>
          </div>
        </div>
        <!--end::Pic-->

        <!--begin::Info-->
        <div class="flex-grow-1">
          <!--begin::Title-->
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <!--begin::User-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
              <div class="d-flex align-items-center mb-2">
                <a
                  href="#"
                  class="text-gray-800 text-hover-primary fs-2 fw-bold me-1"
                  >{{ authenticatedUserDetails.name }}</a
                >
                <a href="#">
                  <span class="svg-icon svg-icon-1 svg-icon-primary">
                    <inline-svg src="/media/icons/duotune/general/gen026.svg" />
                  </span>
                </a>

                <a
                  href="#"
                  class="btn btn-sm btn-light-success fw-bold ms-2 fs-8 py-1 px-3"
                  >Account type</a
                >
              </div>
              <!--end::Name-->

              <!--begin::Info-->
              <div class="d-flex flex-wrap fw-semobold fs-6 mb-4 pe-2">
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotune/general/gen018.svg" />
                  </span>
                  Location
                </a>
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg
                      src="/media/icons/duotune/communication/com011.svg"
                    />
                  </span>
                  {{ authenticatedUserDetails.email }}
                </a>
              </div>
              <!--end::Info-->
            </div>
            <!--end::User-->

            <!--begin::Actions-->
            <div class="d-flex my-4">
              <!--begin::Menu-->
              ...
              <!--end::Menu-->
            </div>
            <!--end::Actions-->
          </div>
          <!--end::Title-->

          <!--begin::Stats-->
          <div class="d-flex flex-wrap flex-stack">
            <!--begin::Wrapper-->
            <div class="d-flex flex-column flex-grow-1 pe-8">
              <!--begin::Stats-->
              <div class="d-flex flex-wrap">
                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <span class="svg-icon svg-icon-success me-2">
                      <inline-svg
                        src="/media/icons/duotune/arrows/arr066.svg"
                      />
                    </span>
                    <div
                      class="fs-2 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="4500"
                      data-kt-countup-prefix="Ghs"
                    >
                      <!--                      TODO-->
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-semobold fs-6 text-gray-400">
                    Actual Balance
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->

                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <span class="svg-icon svg-icon-3 svg-icon-success me-2">
                      <inline-svg
                        src="/media/icons/duotune/arrows/arr066.svg"
                      />
                    </span>
                    <div
                      class="fs-2 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="60"
                      data-kt-countup-prefix="%"
                    >
                      <!--                      TODO-->
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-semobold fs-6 text-gray-400">
                    Available Balance
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->
              </div>
              <!--end::Stats-->
            </div>
            <!--end::Wrapper-->

            <!--begin::Progress-->
            <div
              class="d-flex align-items-center w-200px w-sm-300px flex-column mt-3"
            >
              <!--              TODO-->
              <div class="d-flex justify-content-between w-100 mt-auto mb-2">
                <span class="fw-semobold fs-6 text-gray-400"
                  >KYC Completion</span
                >
                <span class="fw-bold fs-6">TBC%</span>
              </div>

              <div class="h-5px mx-3 w-100 bg-light mb-3">
                <div
                  class="bg-success rounded h-5px"
                  role="progressbar"
                  style="width: 50%"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <!--end::Progress-->
          </div>
          <!--end::Stats-->
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->

      <!--begin::Navs-->
      <div class="d-flex overflow-auto h-55px">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold flex-nowrap"
        >
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/profile/overview"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Overview
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/profile/permissions"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Permissions
            </router-link>
          </li>
          <!--end::Nav item-->
        </ul>
      </div>
      <!--begin::Navs-->
    </div>
  </div>

  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useCustomerUserStore } from "@/stores/customer/user";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "profile-index",
  components: {},
  setup() {
    //store
    const userStore = useCustomerUserStore();
    const { loadingUserData, authenticatedUserDetails } =
      storeToRefs(userStore);

    //ref
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,
      loadingData: false,
      loadingAction: false,
    });

    return {
      refData,
      authenticatedUserDetails,
      loadingUserData,
    };
  },
});
</script>
