<template>
  <admin-dashboard v-if="isAdminMode"></admin-dashboard>
  <customer-dashboard v-else></customer-dashboard>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import AdminDashboard from "@/views/admin/index.vue";
import CustomerDashboard from "@/views/customer/index.vue";

export default {
  name: "shared-dashboard",
  components: { CustomerDashboard, AdminDashboard },
  setup() {
    const authStore = useAuthStore();
    const { isAdminMode } = storeToRefs(authStore);

    return {
      isAdminMode,
    };
  },
};
</script>

<style scoped></style>
