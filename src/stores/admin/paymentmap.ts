import { defineStore } from "pinia";
import PaymentMapService from "@/services/admin/PaymentMapService";
import { getError } from "@/helpers/errors";
import type { iPaymentOption } from "@/models/payment";

export const useAdminPaymentMapStore = defineStore("adminPaymentMapStore", {
  state: () => ({
    paymentMaps: [],
    paymentMapOptions: {} as iPaymentOption,

    paymentMap: {},

    //shared
    error: null,
    loadingPaymentMapData: false,
    unauthorized: false,
    meta: { total: 0, from: 0, to: 0, last_page: 0 },
  }),

  actions: {
    getPaymentMaps(options) {
      return new Promise((resolve, reject) => {
        this.loadingPaymentMapData = true;
        PaymentMapService.getAllPaymentMap(options)
          .then(({ data }) => {
            this.paymentMaps = data.data;

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

            this.paymentMaps = [];
            this.loadingPaymentMapData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingPaymentMapData = false;
          });
      });
    },

    getPaymentMap(id) {
      return new Promise((resolve, reject) => {
        this.loadingPaymentMapData = true;
        PaymentMapService.getSinglePaymnetMap(id)
          .then(({ data }) => {
            this.paymentMap = data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingPaymentMapData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingPaymentMapData = false;
          });
      });
    },

    addPaymentMap(payload) {
      return new Promise((resolve, reject) => {
        this.loadingPaymentMapData = true;
        PaymentMapService.addPaymentMap(payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingPaymentMapData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingPaymentMapData = false;
          });
      });
    },

    getPaymentMapsOptions() {
      return new Promise((resolve, reject) => {
        this.loadingPaymentMapData = true;
        PaymentMapService.getPaymnetMapOptions()
          .then(({ data }) => {
            this.paymentMapOptions = data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }
            this.loadingPaymentMapData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingPaymentMapData = false;
          });
      });
    },

    updatePaymentMap(payload) {
      return new Promise((resolve, reject) => {
        PaymentMapService.updatePaymentMap(payload)
          .then(({ data }) => {
            this.paymentMap = data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }
            this.loadingPaymentMapData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally();
      });
    },
  },
  getters: {
    // loading: (state) => state.loading,
    // error: (state) => state.error,
    // paymentmaps: (state) => state.paymentmaps,
    // paymentmaps_options: (state) => state.paymentmaps_options,
  },
});
