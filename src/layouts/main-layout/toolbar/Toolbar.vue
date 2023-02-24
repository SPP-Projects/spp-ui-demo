<template>
  <!--begin::Toolbar-->
  <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
    <!--begin::Toolbar container-->
    <div
      id="kt_app_toolbar_container"
      class="app-container d-flex flex-stack"
      :class="{
        'container-fluid': toolbarWidthFluid,
        'container-xxl': !toolbarWidthFluid,
      }"
    >
      <KTPageTitle />
      <!--begin::Actions-->

      <div class="d-flex align-items-center gap-2 gap-lg-3">
        <!--begin::Secondary button-->

        <span
          class="btn btn-sm fw-bold bg-body btn-color-gray-700 btn-active-color-primary"
          v-for="(fx, id) in fxRates"
          :key="id"
        >
          {{ fx.base_currency_code }}/{{ fx.quote_currency_code }}:
          {{ parseFloat(fx.rate).toFixed(2) }}</span
        >

        <!--end::Primary button-->
      </div>
      <!--end::Actions-->
    </div>
    <!--end::Toolbar container-->
  </div>
  <!--end::Toolbar-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { toolbarWidthFluid } from "@/core/helpers/config";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import { useCustomerRemittanceStore } from "@/stores/remittance/remittance";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "layout-toolbar",
  components: {
    KTPageTitle,
  },
  setup() {
    //exchange rates
    const remittanceStore = useCustomerRemittanceStore();
    const { loadingExchangeRate, exchangeRates, fxRates } =
      storeToRefs(remittanceStore);
    return {
      toolbarWidthFluid,
      fxRates,
    };
  },
});
</script>
