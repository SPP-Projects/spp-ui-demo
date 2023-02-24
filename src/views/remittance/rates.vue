<template>
  <!--begin::Row-->
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10 mt-2">
    <!--begin::Col-->
    <div class="col-xl-8">
      <div class="card">
        <!--begin::Header-->
        <div class="card-header pt-7">
          <!--begin::Title-->
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold text-gray-800"
              >Current Exchange Rates</span
            >
          </h3>
          <!--end::Title-->
        </div>
        <!--end::Header-->
        <PageLoader v-if="loadingExchangeRate"></PageLoader>
        <!--begin::Body-->

        <div v-else-if="exchangeRates.length === 0">
          <div class="card-body pt-6"><span>No Rates</span></div>
        </div>
        <div class="card-body pt-6" v-else>
          <div class="table-responsive">
            <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
              <!--begin::Table head-->
              <thead>
                <tr class="fs-7 fw-bold text-gray-400 border-bottom-0">
                  <th
                    class="p-0 pb-3 min-w-145px text-center align-items-center"
                  >
                    Base Currency
                  </th>
                  <th
                    class="p-0 pb-3 min-w-100px text-center align-items-center"
                  >
                    Quote Currency
                  </th>
                  <th class="p-0 pb-3 min-w-100px text-end">Rate</th>
                  <th class="p-0 pb-3 min-w-100px text-end">Account</th>
                  <th class="p-0 pb-3 min-w-145px text-end">Date</th>
                </tr>
              </thead>
              <!--end::Table head-->

              <!--begin::Table body-->
              <tbody>
                <template v-for="(fx, id) in exchangeRates" :key="id">
                  <tr>
                    <td class="pe-0 fw-bold align-items-center text-center">
                      {{ fx.base_currency_code }}
                    </td>

                    <td class="pe-0 fw-bold align-items-center text-center">
                      {{ fx.quote_currency_code }}
                    </td>

                    <td class="text-end pe-0">
                      {{ fx.rate }}
                    </td>

                    <td class="text-end pe-0 text-center">
                      {{ fx.account }}
                    </td>
                    <td class="text-end pe-0">
                      <span class="text-gray-400 fw-semibold d-block fs-7">
                        {{ formatDateTime(fx.updated_at) }}</span
                      >
                    </td>

                    <td class="text-end"></td>
                  </tr>
                </template>
              </tbody>
              <!--end::Table body-->
            </table>
          </div>
        </div>
        <!--end: Card Body-->
      </div>
    </div>
    <!--end::Col-->

    <!--begin::Col-->
    <div class="col-xl-4">
      <div class="card mb-10">
        <!--begin::Header-->
        <div
          class="card-header position-relative min-h-50px p-0 border-bottom-2"
        >
          <!--begin::Nav-->
          <span class="nav nav-pills nav-pills-custom d-flex position-relative">
            <!--begin::Link-->
            <a class="nav-link btn btn-color-muted active h-100">
              <span class="nav-text fw-bold fs-4 mb-3">Send Money</span>
            </a>
            <!--end::Link-->
          </span>
          <!--end::Nav-->
        </div>
        <!--end::Header-->
        <!--begin::Body-->

        <DataLoader v-if="loadingExchangeRate"></DataLoader>
        <div class="card-body" v-else>
          <!--begin::Tab Content-->
          <div class="tab-content">
            <!--begin::Tap pane-->
            <div class="">
              <!--begin::Input group-->
              <div class="form-floating border border-gray-300 rounded mb-7">
                <select
                  class="form-select form-select-transparent"
                  v-model="formRate.base_currency_code"
                  @change="handleRateChange($event)"
                >
                  <option
                    value="GBP"
                    data-kt-select2-icon="/media/svg/coins/bitcoin.svg"
                  >
                    GBP/GHS
                  </option>
                  <option
                    value="USD"
                    data-kt-select2-icon="/media/svg/coins/ethereum.svg"
                  >
                    USD/GHS
                  </option>
                  <option
                    value="EUR"
                    data-kt-select2-icon="/media/svg/coins/filecoin.svg"
                  >
                    EUR/GHS
                  </option>
                </select>
                <label for="floatingInputValue">Currency Name</label>
              </div>
              <!--end::Input group-->
              <!--begin::Row-->
              <div class="row mb-7">
                <!--begin::Col-->
                <div class="col-6">
                  <!--begin::Input group-->
                  <div class="form-floating">
                    <input
                      type="number"
                      class="form-control text-gray-800 fw-bold"
                      placeholder="00.0"
                      id="floatingInputValue"
                      @change="handleCurrencyConversion($event, 'forward')"
                      @keyup="handleCurrencyConversion($event, 'forward')"
                      v-model="formRate.sender_amount"
                    />
                    <label for="floatingInputValue"
                      >Amount({{ formRate.base_currency_code }})</label
                    >
                  </div>
                  <!--end::Input group-->
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-6">
                  <!--begin::Input group-->
                  <div class="form-floating">
                    <input
                      type="email"
                      class="form-control text-gray-800 fw-bold"
                      placeholder="00.0"
                      id="floatingInputValue"
                      v-model="formRate.receiver_amount"
                      @change="handleCurrencyConversion($event, 'reverse')"
                      @keyup="handleCurrencyConversion($event, 'reverse')"
                    />
                    <label for="floatingInputValue">Amount(GHS)</label>
                  </div>
                  <!--end::Input group-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->

              <div class="p-4 fs-4 text-danger">
                Exchange Rate: 1 {{ formRate.base_currency_code }} =
                {{ formRate.rate }} {{ formRate.quote_currency_code }}
              </div>
              <!--begin::Action-->
              <div class="d-flex align-items-end">
                <router-link
                  to="/remittance/initiate"
                  class="btn btn-primary fs-3 w-100"
                  >Send Money</router-link
                >
              </div>
              <!--end::Action-->
            </div>
            <!--end::Tap pane-->
          </div>
          <!--end::Tab Content-->
        </div>
        <!--end: Card Body-->
      </div>
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

import PageLoader from "@/components/PageLoader.vue";

import { storeToRefs } from "pinia";
import useOutputFormat from "@/composables/useOutputFormat";
import { useCustomerRemittanceStore } from "@/stores/remittance/remittance";
import DataLoader from "@/components/DataLoader.vue";

export default defineComponent({
  name: "exchange-rates",
  components: { DataLoader, PageLoader },

  setup() {
    //exchange rates
    const remittanceStore = useCustomerRemittanceStore();
    const { loadingExchangeRate, exchangeRates, formRate } =
      storeToRefs(remittanceStore);

    //outputformatting
    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();

    const handleRateChange = (e) => {
      let selectCurrency: {};
      selectCurrency = exchangeRates.value.filter((item) => {
        return item.base_currency_code === e.target.value;
      });

      formRate.value.rate = parseFloat(selectCurrency[0].rate).toFixed(2);
      formRate.value.receiver_amount = (
        formRate.value.rate * formRate.value.sender_amount
      ).toFixed(2);
    };

    const handleCurrencyConversion = (e, direction) => {
      if (direction === "forward") {
        formRate.value.receiver_amount = (
          formRate.value.rate * formRate.value.sender_amount
        ).toFixed(2);
      } else {
        formRate.value.sender_amount = (
          formRate.value.receiver_amount / formRate.value.rate
        ).toFixed(2);
      }
    };

    let defaultCurrency = {};
    const initExchangeRate = () => {
      remittanceStore
        .getExchangeRates()
        .then((data: any) => {
          defaultCurrency = data.filter((x) => {
            return x.base_currency_code === "GBP";
          });
          formRate.value.base_currency_code = "GBP";
          formRate.value.quote_currency_code = "GHS";
          formRate.value.rate = parseFloat(defaultCurrency[0].rate);
          formRate.value.sender_amount = 1;
          formRate.value.receiver_amount = (
            formRate.value.sender_amount * formRate.value.rate
          ).toFixed(2);
        })
        .finally(() => {});
    };

    onMounted(() => {
      initExchangeRate();
    });

    return {
      //
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,

      //
      loadingExchangeRate,
      exchangeRates,
      formRate,

      //
      handleRateChange,
      handleCurrencyConversion,
    };
  },
});
</script>
