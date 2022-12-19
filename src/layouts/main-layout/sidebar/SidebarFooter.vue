<template>
  <!--begin::Footer-->
  <div
    class="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6"
    id="kt_app_sidebar_footer"
  >
    <router-link
      to="/profile/overview"
      class="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100"
      data-bs-toggle="tooltip"
      data-bs-trigger="hover"
      data-bs-dismiss-="click"
      title="200+ in-house components and 3rd-party plugins"
      v-if="!isAdminMode"
    >
      <span class="btn-label">User Settings</span>
      <span class="svg-icon btn-icon svg-icon-2 m-0">
        <inline-svg src="/media/icons/duotune/general/gen005.svg" />
      </span>
    </router-link>
  </div>
  <!--end::Footer-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "sidebar-footer",
  components: {},

  setup() {
    const authStore = useAuthStore();
    const { isAdminMode } = storeToRefs(authStore);

    return {
      isAdminMode,
    };
  },
});
</script>
