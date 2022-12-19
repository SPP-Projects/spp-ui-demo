import { defineStore } from "pinia";
import PaymentMethodService from "@/services/admin/PaymentMethodService";
import { getError } from "@/helpers/errors";

export const useAdminPaymentMethodStore = defineStore(
  "adminPaymentMethodStore",
  {
    state: () => ({
      //paymentMethods
      paymentMethods: [],
      paymentMethod: {},

      //shared
      error: null,
      loadingPaymentMethodData: false,
      unauthorized: false,
      meta: { total: 0, from: 0, to: 0, last_page: 0 },
    }),
    actions: {
      getPaymentMethods(options) {
        return new Promise((resolve, reject) => {
          this.loadingPaymentMethodData = true;
          PaymentMethodService.getPaymentMethods(options)
            .then(({ data }) => {
              this.paymentMethods = data.data;
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

              this.loadingPaymentMethodData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingPaymentMethodData = false;
            });
        });
      },

      getPaymentMethod(payload) {
        return new Promise((resolve, reject) => {
          //  commit("SET_LOADING", true);
          PaymentMethodService.getPaymentMethod(payload)
            .then(({ data }) => {
              this.paymentMethod = data;
              resolve(data);
            })
            .catch((err) => {
              // commit("SET_ERROR", getError(err));
              reject(err);
            })
            .finally(() => {
              this.loadingPaymentMethodData = false;
            });
        });
      },

      addPaymentMethod(payload) {
        return new Promise((resolve, reject) => {
          //   commit("SET_LOADING", true);
          PaymentMethodService.addPaymentMethod(payload)
            .then((response) => {
              // commit("ADD_GENERAL_SETTING", response);
              resolve(response);
            })
            .catch((err) => {
              //  commit("SET_ERROR", getError(err));
              reject(err);
            })
            .finally(() => {
              this.loadingPaymentMethodData = false;
            });
        });
      },

      updatePaymentMethod(payload) {
        return new Promise((resolve, reject) => {
          PaymentMethodService.updatePaymentMethod(payload)
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
  }
);
