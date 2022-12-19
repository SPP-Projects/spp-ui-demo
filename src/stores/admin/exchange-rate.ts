import { defineStore } from "pinia";
import ExchangeRateService from "@/services/admin/ExchangeRateService";
import { getError } from "@/helpers/errors";

export const useAdminExchangeRateStore = defineStore("adminExchangeRateStore", {
  state: () => ({
    //exchangeRates
    exchangeRates: [],
    exchangeRate: {},

    //shared
    error: null,
    loadingExchangeRateData: false,
    unauthorized: false,
    meta: { total: 0, from: 0, to: 0, last_page: 0 },
  }),
  actions: {
    getExchangeRates(options) {
      return new Promise((resolve, reject) => {
        this.loadingExchangeRateData = true;
        ExchangeRateService.getExchangeRates(options)
          .then(({ data }) => {
            this.exchangeRates = data.data;
            this.meta.total = data.total;
            this.meta.from = data.from;
            this.meta.to = data.to;
            this.meta.last_page = data.last_page;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingExchangeRateData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingExchangeRateData = false;
          });
      });
    },

    getExchangeRate(payload) {
      return new Promise((resolve, reject) => {
        //  commit("SET_LOADING", true);
        ExchangeRateService.getExchangeRate(payload)
          .then(({ data }) => {
            this.exchangeRate = data;
            resolve(data);
          })
          .catch((err) => {
            // commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => {
            this.loadingExchangeRateData = false;
          });
      });
    },

    addExchangeRate(payload) {
      return new Promise((resolve, reject) => {
        //   commit("SET_LOADING", true);
        ExchangeRateService.addExchangeRate(payload)
          .then((response) => {
            // commit("ADD_GENERAL_SETTING", response);
            resolve(response);
          })
          .catch((err) => {
            //  commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => {
            this.loadingExchangeRateData = false;
          });
      });
    },

    updateExchangeRate(payload) {
      return new Promise((resolve, reject) => {
        ExchangeRateService.updateExchangeRate(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally();
      });
    },
  },
  getters: {},
});
