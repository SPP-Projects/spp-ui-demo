<template>
  <!--begin::Layout-->

  <div class="d-flex flex-column flex-xl-row">
    <!--begin::Sidebar-->

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
