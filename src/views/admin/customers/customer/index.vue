<template>
  <!--begin::Layout-->

  <div class="d-flex flex-column flex-xl-row">
    <!--begin::Sidebar-->
    <!--    <div class="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10">-->
    <!--      &lt;!&ndash;begin::Card&ndash;&gt;-->
    <!--      <div class="card mb-5 mb-xl-8">-->
    <!--        &lt;!&ndash;begin::Card body&ndash;&gt;-->
    <!--        <div class="card-body pt-15">-->
    <!--          &lt;!&ndash;begin::Summary&ndash;&gt;-->
    <!--          <div class="d-flex flex-center flex-column mb-5">-->
    <!--            &lt;!&ndash;begin::Avatar&ndash;&gt;-->
    <!--            <div class="symbol symbol-100px symbol-circle mb-7">-->
    <!--              <img src="/media/avatars/300-1.jpg" alt="image" />-->
    <!--            </div>-->
    <!--            &lt;!&ndash;end::Avatar&ndash;&gt;-->

    <!--            &lt;!&ndash;begin::Name&ndash;&gt;-->
    <!--            <a-->
    <!--              href="#"-->
    <!--              class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1"-->
    <!--            >-->
    <!--              Max Smith-->
    <!--            </a>-->
    <!--            &lt;!&ndash;end::Name&ndash;&gt;-->

    <!--            &lt;!&ndash;begin::Position&ndash;&gt;-->
    <!--            <div class="fs-5 fw-semobold text-muted mb-6">Software Enginer</div>-->
    <!--            &lt;!&ndash;end::Position&ndash;&gt;-->

    <!--            &lt;!&ndash;begin::Info&ndash;&gt;-->
    <!--            <div class="d-flex flex-wrap flex-center">-->
    <!--              &lt;!&ndash;begin::Stats&ndash;&gt;-->
    <!--              <div-->
    <!--                class="border border-gray-300 border-dashed rounded py-3 px-3 mb-3"-->
    <!--              >-->
    <!--                <div class="fs-4 fw-bold text-gray-700">-->
    <!--                  <span class="w-75px">6,900</span>-->
    <!--                  <span class="svg-icon svg-icon-3 svg-icon-success">-->
    <!--                    <inline-svg src="/media/icons/duotune/arrows/arr066.svg" />-->
    <!--                  </span>-->
    <!--                </div>-->
    <!--                <div class="fw-semobold text-muted">Earnings</div>-->
    <!--              </div>-->
    <!--              &lt;!&ndash;end::Stats&ndash;&gt;-->

    <!--              &lt;!&ndash;begin::Stats&ndash;&gt;-->
    <!--              <div-->
    <!--                class="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3"-->
    <!--              >-->
    <!--                <div class="fs-4 fw-bold text-gray-700">-->
    <!--                  <span class="w-50px">130</span>-->
    <!--                  <span class="svg-icon svg-icon-3 svg-icon-danger">-->
    <!--                    <inline-svg src="/media/icons/duotune/arrows/arr065.svg" />-->
    <!--                  </span>-->
    <!--                </div>-->
    <!--                <div class="fw-semobold text-muted">Tasks</div>-->
    <!--              </div>-->
    <!--              &lt;!&ndash;end::Stats&ndash;&gt;-->

    <!--              &lt;!&ndash;begin::Stats&ndash;&gt;-->
    <!--              <div-->
    <!--                class="border border-gray-300 border-dashed rounded py-3 px-3 mb-3"-->
    <!--              >-->
    <!--                <div class="fs-4 fw-bold text-gray-700">-->
    <!--                  <span class="w-50px">500</span>-->
    <!--                  <span class="svg-icon svg-icon-3 svg-icon-success">-->
    <!--                    <inline-svg src="/media/icons/duotune/arrows/arr066.svg" />-->
    <!--                  </span>-->
    <!--                </div>-->
    <!--                <div class="fw-semobold text-muted">Hours</div>-->
    <!--              </div>-->
    <!--              &lt;!&ndash;end::Stats&ndash;&gt;-->
    <!--            </div>-->
    <!--            &lt;!&ndash;end::Info&ndash;&gt;-->
    <!--          </div>-->
    <!--          &lt;!&ndash;end::Summary&ndash;&gt;-->

    <!--          &lt;!&ndash;begin::Details toggle&ndash;&gt;-->
    <!--          <div class="d-flex flex-stack fs-4 py-3">-->
    <!--            <div-->
    <!--              class="fw-bold rotate collapsible"-->
    <!--              data-bs-toggle="collapse"-->
    <!--              href="#kt_customer_view_details"-->
    <!--              role="button"-->
    <!--              aria-expanded="false"-->
    <!--              aria-controls="kt_customer_view_details"-->
    <!--            >-->
    <!--              Details-->
    <!--              <span class="ms-2 rotate-180">-->
    <!--                <span class="svg-icon svg-icon-3">-->
    <!--                  <inline-svg src="/media/icons/duotune/arrows/arr072.svg" />-->
    <!--                </span>-->
    <!--              </span>-->
    <!--            </div>-->

    <!--            <span-->
    <!--              data-bs-toggle="tooltip"-->
    <!--              data-bs-trigger="hover"-->
    <!--              title="Edit customer details"-->
    <!--            >-->
    <!--              <a-->
    <!--                href="#"-->
    <!--                class="btn btn-sm btn-light-primary"-->
    <!--                data-bs-toggle="modal"-->
    <!--                data-bs-target="#kt_modal_update_customer"-->
    <!--              >-->
    <!--                Edit-->
    <!--              </a>-->
    <!--            </span>-->
    <!--          </div>-->
    <!--          &lt;!&ndash;end::Details toggle&ndash;&gt;-->

    <!--          <div class="separator separator-dashed my-3"></div>-->

    <!--          &lt;!&ndash;begin::Details content&ndash;&gt;-->
    <!--          <div id="kt_customer_view_details" class="collapse show">-->
    <!--            <div class="py-5 fs-6">-->
    <!--              &lt;!&ndash;begin::Badge&ndash;&gt;-->
    <!--              <div class="badge badge-light-info d-inline">Premium user</div>-->
    <!--              &lt;!&ndash;begin::Badge&ndash;&gt;-->
    <!--              &lt;!&ndash;begin::Details item&ndash;&gt;-->
    <!--              <div class="fw-bold mt-5">Account ID</div>-->
    <!--              <div class="text-gray-600">ID-45453423</div>-->
    <!--              &lt;!&ndash;begin::Details item&ndash;&gt;-->
    <!--              &lt;!&ndash;begin::Details item&ndash;&gt;-->
    <!--              <div class="fw-bold mt-5">Billing Email</div>-->
    <!--              <div class="text-gray-600">-->
    <!--                <a href="#" class="text-gray-600 text-hover-primary"-->
    <!--                  >info@keenthemes.com</a-->
    <!--                >-->
    <!--              </div>-->
    <!--              &lt;!&ndash;begin::Details item&ndash;&gt;-->
    <!--              &lt;!&ndash;begin::Details item&ndash;&gt;-->
    <!--              <div class="fw-bold mt-5">Billing Address</div>-->
    <!--              <div class="text-gray-600">-->
    <!--                101 Collin Street, <br />Melbourne 3000 VIC <br />Australia-->
    <!--              </div>-->
    <!--              &lt;!&ndash;begin::Details item&ndash;&gt;-->
    <!--              &lt;!&ndash;begin::Details item&ndash;&gt;-->
    <!--              <div class="fw-bold mt-5">Language</div>-->
    <!--              <div class="text-gray-600">English</div>-->
    <!--              &lt;!&ndash;begin::Details item&ndash;&gt;-->
    <!--              &lt;!&ndash;begin::Details item&ndash;&gt;-->
    <!--              <div class="fw-bold mt-5">Upcoming Invoice</div>-->
    <!--              <div class="text-gray-600">54238-8693</div>-->
    <!--              &lt;!&ndash;begin::Details item&ndash;&gt;-->
    <!--              &lt;!&ndash;begin::Details item&ndash;&gt;-->
    <!--              <div class="fw-bold mt-5">Tax ID</div>-->
    <!--              <div class="text-gray-600">TX-8674</div>-->
    <!--              &lt;!&ndash;begin::Details item&ndash;&gt;-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          &lt;!&ndash;end::Details content&ndash;&gt;-->
    <!--        </div>-->
    <!--        &lt;!&ndash;end::Card body&ndash;&gt;-->
    <!--      </div>-->
    <!--      &lt;!&ndash;end::Card&ndash;&gt;-->

    <!--      &lt;!&ndash;begin::Connected Accounts&ndash;&gt;-->
    <!--      <div class="card mb-5 mb-xl-8">-->
    <!--        &lt;!&ndash;begin::Card header&ndash;&gt;-->
    <!--        <div class="card-header border-0">-->
    <!--          <div class="card-title">-->
    <!--            <h3 class="fw-bold m-0">Connected Accounts</h3>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        &lt;!&ndash;end::Card header&ndash;&gt;-->

    <!--        &lt;!&ndash;begin::Card body&ndash;&gt;-->
    <!--        <div class="card-body pt-2">-->
    <!--          <div-->
    <!--            class="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-9 p-6"-->
    <!--          >-->
    <!--            <span class="svg-icon svg-icon-2tx svg-icon-primary me-4">-->
    <!--              <inline-svg src="/media/icons/duotune/art/art006.svg" />-->
    <!--            </span>-->
    <!--            &lt;!&ndash;begin::Wrapper&ndash;&gt;-->
    <!--            <div class="d-flex flex-stack flex-grow-1">-->
    <!--              &lt;!&ndash;begin::Content&ndash;&gt;-->
    <!--              <div class="fw-semobold">-->
    <!--                <div class="fs-6 text-gray-700">-->
    <!--                  By connecting an account, you hereby agree to our-->
    <!--                  <a href="#" class="me-1">privacy policy</a>and-->
    <!--                  <a href="#">terms of use</a>.-->
    <!--                </div>-->
    <!--              </div>-->
    <!--              &lt;!&ndash;end::Content&ndash;&gt;-->
    <!--            </div>-->
    <!--            &lt;!&ndash;end::Wrapper&ndash;&gt;-->
    <!--          </div>-->

    <!--          &lt;!&ndash;begin::Items&ndash;&gt;-->
    <!--          <div class="py-2">-->
    <!--            &lt;!&ndash;begin::Item&ndash;&gt;-->
    <!--            <div class="d-flex flex-stack">-->
    <!--              <div class="d-flex">-->
    <!--                <img-->
    <!--                  src="/media/svg/brand-logos/google-icon.svg"-->
    <!--                  class="w-30px me-6"-->
    <!--                  alt=""-->
    <!--                />-->

    <!--                <div class="d-flex flex-column">-->
    <!--                  <a href="#" class="fs-5 text-dark text-hover-primary fw-bold"-->
    <!--                    >Google</a-->
    <!--                  >-->
    <!--                  <div class="fs-6 fw-semobold text-muted">-->
    <!--                    Plan properly your workflow-->
    <!--                  </div>-->
    <!--                </div>-->
    <!--              </div>-->

    <!--              <div class="d-flex justify-content-end">-->
    <!--                &lt;!&ndash;begin::Switch&ndash;&gt;-->
    <!--                <label-->
    <!--                  class="form-check form-switch form-switch-sm form-check-custom form-check-solid"-->
    <!--                >-->
    <!--                  &lt;!&ndash;begin::Input&ndash;&gt;-->
    <!--                  <input-->
    <!--                    class="form-check-input"-->
    <!--                    name="google"-->
    <!--                    type="checkbox"-->
    <!--                    value="1"-->
    <!--                    id="kt_modal_connected_accounts_google"-->
    <!--                    checked-->
    <!--                  />-->
    <!--                  &lt;!&ndash;end::Input&ndash;&gt;-->

    <!--                  &lt;!&ndash;begin::Label&ndash;&gt;-->
    <!--                  <span-->
    <!--                    class="form-check-label fw-semobold text-muted"-->
    <!--                    for="kt_modal_connected_accounts_google"-->
    <!--                  ></span>-->
    <!--                  &lt;!&ndash;end::Label&ndash;&gt;-->
    <!--                </label>-->
    <!--                &lt;!&ndash;end::Switch&ndash;&gt;-->
    <!--              </div>-->
    <!--            </div>-->
    <!--            &lt;!&ndash;end::Item&ndash;&gt;-->

    <!--            <div class="separator separator-dashed my-5"></div>-->

    <!--            &lt;!&ndash;begin::Item&ndash;&gt;-->
    <!--            <div class="d-flex flex-stack">-->
    <!--              <div class="d-flex">-->
    <!--                <img-->
    <!--                  src="/media/svg/brand-logos/github.svg"-->
    <!--                  class="w-30px me-6"-->
    <!--                  alt=""-->
    <!--                />-->

    <!--                <div class="d-flex flex-column">-->
    <!--                  <a href="#" class="fs-5 text-dark text-hover-primary fw-bold"-->
    <!--                    >Github</a-->
    <!--                  >-->
    <!--                  <div class="fs-6 fw-semobold text-muted">-->
    <!--                    Keep eye on on your Repositories-->
    <!--                  </div>-->
    <!--                </div>-->
    <!--              </div>-->

    <!--              <div class="d-flex justify-content-end">-->
    <!--                &lt;!&ndash;begin::Switch&ndash;&gt;-->
    <!--                <label-->
    <!--                  class="form-check form-switch form-switch-sm form-check-custom form-check-solid"-->
    <!--                >-->
    <!--                  &lt;!&ndash;begin::Input&ndash;&gt;-->
    <!--                  <input-->
    <!--                    class="form-check-input"-->
    <!--                    name="github"-->
    <!--                    type="checkbox"-->
    <!--                    value="1"-->
    <!--                    id="kt_modal_connected_accounts_github"-->
    <!--                    checked-->
    <!--                  />-->
    <!--                  &lt;!&ndash;end::Input&ndash;&gt;-->

    <!--                  &lt;!&ndash;begin::Label&ndash;&gt;-->
    <!--                  <span-->
    <!--                    class="form-check-label fw-semobold text-muted"-->
    <!--                    for="kt_modal_connected_accounts_github"-->
    <!--                  ></span>-->
    <!--                  &lt;!&ndash;end::Label&ndash;&gt;-->
    <!--                </label>-->
    <!--                &lt;!&ndash;end::Switch&ndash;&gt;-->
    <!--              </div>-->
    <!--            </div>-->
    <!--            &lt;!&ndash;end::Item&ndash;&gt;-->

    <!--            <div class="separator separator-dashed my-5"></div>-->

    <!--            &lt;!&ndash;begin::Item&ndash;&gt;-->
    <!--            <div class="d-flex flex-stack">-->
    <!--              <div class="d-flex">-->
    <!--                <img-->
    <!--                  src="/media/svg/brand-logos/slack-icon.svg"-->
    <!--                  class="w-30px me-6"-->
    <!--                  alt=""-->
    <!--                />-->

    <!--                <div class="d-flex flex-column">-->
    <!--                  <a href="#" class="fs-5 text-dark text-hover-primary fw-bold"-->
    <!--                    >Slack</a-->
    <!--                  >-->
    <!--                  <div class="fs-6 fw-semobold text-muted">-->
    <!--                    Integrate Projects Discussions-->
    <!--                  </div>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--              <div class="d-flex justify-content-end">-->
    <!--                &lt;!&ndash;begin::Switch&ndash;&gt;-->
    <!--                <label-->
    <!--                  class="form-check form-switch form-switch-sm form-check-custom form-check-solid"-->
    <!--                >-->
    <!--                  &lt;!&ndash;begin::Input&ndash;&gt;-->
    <!--                  <input-->
    <!--                    class="form-check-input"-->
    <!--                    name="slack"-->
    <!--                    type="checkbox"-->
    <!--                    value="1"-->
    <!--                    id="kt_modal_connected_accounts_slack"-->
    <!--                  />-->
    <!--                  &lt;!&ndash;end::Input&ndash;&gt;-->

    <!--                  &lt;!&ndash;begin::Label&ndash;&gt;-->
    <!--                  <span-->
    <!--                    class="form-check-label fw-semobold text-muted"-->
    <!--                    for="kt_modal_connected_accounts_slack"-->
    <!--                  ></span>-->
    <!--                  &lt;!&ndash;end::Label&ndash;&gt;-->
    <!--                </label>-->
    <!--                &lt;!&ndash;end::Switch&ndash;&gt;-->
    <!--              </div>-->
    <!--            </div>-->
    <!--            &lt;!&ndash;end::Item&ndash;&gt;-->
    <!--          </div>-->
    <!--          &lt;!&ndash;end::Items&ndash;&gt;-->
    <!--        </div>-->
    <!--        &lt;!&ndash;end::Card body&ndash;&gt;-->

    <!--        &lt;!&ndash;begin::Card footer&ndash;&gt;-->
    <!--        <div class="card-footer border-0 d-flex justify-content-center pt-0">-->
    <!--          <button class="btn btn-sm btn-light-primary">Save Changes</button>-->
    <!--        </div>-->
    <!--        &lt;!&ndash;end::Card footer&ndash;&gt;-->
    <!--      </div>-->
    <!--      &lt;!&ndash;end::Connected Accounts&ndash;&gt;-->
    <!--    </div>-->
    <!--end::Sidebar-->

    <!--begin::Content-->
    <div class="flex-lg-row-fluid ms-lg-15">
      <!--begin:::Tabs-->
      <ul
        class="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semobold mb-8"
      >
        <!--begin:::Tab item-->
        <li
          class="nav-item"
          v-for="(_, tab) in tabs"
          :key="tab"
          :class="['tab-button nav-item', { active: currentTab === tab }]"
          @click="currentTab = tab"
        >
          <a class="nav-link text-active-primary pb-4">{{ tab }}</a>
        </li>
        <!--end:::Tab item-->

        <!--begin:::Tab item-->
        <li class="nav-item ms-auto">
          <!--begin::Action menu-->
          <a
            href="#"
            class="btn btn-primary ps-7"
            data-kt-menu-trigger="click"
            data-kt-menu-attach="parent"
            data-kt-menu-placement="bottom-end"
          >
            Actions
            <span class="svg-icon svg-icon-2 me-0">
              <inline-svg src="/media/icons/duotune/arrows/arr072.svg" />
            </span>
          </a>
          <Dropdown3></Dropdown3>
          <!--end::Menu-->
        </li>
        <!--end:::Tab item-->
      </ul>
      <!--end:::Tabs-->

      <!--begin:::Tab content-->
      <div class="tab-contentl" id="myTabContentl">
        <!--begin:::Tab pane-->

        <component
          :is="tabs[currentTab]"
          class="tab-pane fade show tab"
        ></component>

        <!--end:::Tab pane-->
      </div>
      <!--end:::Tab content-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Layout-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Dropdown3 from "@/components/dropdown/Dropdown3.vue";
import Permissions from "@/views/admin/customers/customer/permissions.vue";
import Users from "@/views/admin/customers/customer/users.vue";
import Kyc from "@/views/admin/customers/customer/kyc.vue";
import Overview from "@/views/admin/customers/customer/general.vue";
export default defineComponent({
  name: "customer-details",
  components: {
    Dropdown3,
    Overview,

    Permissions,
    Users,
  },
  setup() {
    const overviewTab = () => {
      console.log("Test");
    };

    const currentTab = ref("Overview");

    const tabs = {
      Overview,
      Permissions,
      Users,
      Kyc,
    };

    return { overviewTab, currentTab, tabs };
  },
});
</script>
<style>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
