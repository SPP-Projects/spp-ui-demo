<template>
  <div class="">
    <router-link
      to="/admin/transactions"
      :class="
        $route.name === 'admin-manage-transactions'
          ? 'btn-light-primary'
          : 'btn-primary'
      "
      class="m-1 btn btn-sm"
    >
      General
    </router-link>
    <router-link
      to="/admin/transactions/types"
      :class="
        $route.name === 'admin-manage-transaction-types'
          ? 'btn-light-primary'
          : 'btn-primary'
      "
      class="m-1 btn btn-sm"
    >
      Transaction Types
    </router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: "TransactionsSubMenu",
};
</script>

<style scoped></style>
