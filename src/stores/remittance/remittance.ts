import { getError } from "@/helpers/errors";

import { defineStore } from "pinia";

import RemittanceService from "@/services/remittance/RemittanceService";
import TransactionService from "@/services/customer/TransactionService";
import { useStorage } from "@vueuse/core";

export const useCustomerRemittanceStore = defineStore(
  "customerRemittanceStore",
  {
    state: () => ({
      remittances: [] as any,
      remittance: {} as any,
      validatedRemittance: useStorage("validatedRemittanceResponse", []) as any, //store in local storage
      loadingRemittanceData: false,

      //exchange rates
      exchangeRate: useStorage("exchangeRate", {}) as any,
      exchangeRates: useStorage("exchangeRates", []) as any,
      formRate: useStorage("checkRates", {
        base_currency_code: "USD",
        quote_currency_code: "",
        rate: null,
        sender_amount: null,
        receiver_amount: null,
      }),
      fxRates: useStorage("fxRates", []),
      loadingExchangeRate: false,

      //others
      unauthorized: false,
      error: null,
      meta: { total: 0, from: 0, to: 0, last_page: 0 },
    }),
    actions: {
      getRemittances(options) {
        return new Promise((resolve, reject) => {
          this.loadingRemittanceData = true;
          RemittanceService.getRemittances(options)
            .then(({ data }) => {
              this.remittances = data.data;

              this.meta.total = data.total;
              this.meta.from = data.from;
              this.meta.to = data.to;
              this.meta.last_page = data.last_page;
              resolve(data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.remittances = [];
              this.loadingRemittanceData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingRemittanceData = false;
            });
        });
      },
      getRemittance(id) {
        return new Promise((resolve, reject) => {
          this.loadingRemittanceData = true;
          RemittanceService.getRemittance(id)
            .then((response) => {
              console.log(response.data);
              this.remittance = response.data;
              resolve(response);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingRemittanceData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingRemittanceData = false;
            });
        });
      },
      validateRemittance(payload) {
        return new Promise((resolve, reject) => {
          this.loadingRemittanceData = true;

          RemittanceService.validateRemittance(payload)
            .then((response) => {
              this.validatedRemittance = response.data;

              resolve(response.data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingRemittanceData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingRemittanceData = false;
            });
        });
      },
      confirmRemittance(payload) {
        return new Promise((resolve, reject) => {
          this.loadingRemittanceData = true;

          RemittanceService.confirmRemittance(payload)
            .then((response) => {
              this.validatedRemittance = response.data;

              resolve(response.data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingRemittanceData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingRemittanceData = false;
            });
        });
      },
      getExchangeRates() {
        return new Promise((resolve, reject) => {
          this.loadingExchangeRate = true;
          RemittanceService.getExchangeRates()
            .then(({ data }: any) => {
              this.exchangeRates = data.exchange_rates;

              //store top 3 currencies in state
              this.fxRates = data.exchange_rates.filter((fx) => {
                return (
                  fx.base_currency_code === "GBP" ||
                  fx.base_currency_code === "USD" ||
                  fx.base_currency_code === "EUR"
                );
              });
              //store top 3 currencies in state

              resolve(data.exchange_rates);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingExchangeRate = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingExchangeRate = false;
            });
        });
      },
      getExchangeRate(payload) {
        return new Promise((resolve, reject) => {
          this.loadingExchangeRate = true;
          RemittanceService.getExchangeRate(payload)
            .then((response) => {
              this.exchangeRate = response.data;
              resolve(response);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                this.unauthorized = true;
              }

              this.loadingExchangeRate = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingExchangeRate = false;
            });
        });
      },
    },

    getters: {
      getValidatedRemittanceResponse(state) {
        return state.validatedRemittance;
      },
    },
  }
);
