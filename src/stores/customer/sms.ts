import { defineStore } from "pinia";
import SmsService from "@/services/customer/SmsService";
import { getError } from "@/helpers/errors";

export const useCustomerSmsStore = defineStore("customerSmsStore", {
  state: () => ({
    loadingData: false,
    error: null,
    unauthorized: false,

    smsReports: [],
    meta: { total: 0, from: 0, to: 0, last_page: 0 },

    senderIDs: [],
  }),
  actions: {
    getSmsReports(options) {
      return new Promise((resolve, reject) => {
        this.loadingData = true;
        SmsService.getSMSReports(options)
          .then(({ data }) => {
            this.smsReports = data.data;
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

            this.loadingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingData = false;
          });
      });
    },

    getSenderIDs(options) {
      return new Promise((resolve, reject) => {
        this.loadingData = true;
        SmsService.getSenderIDs(options)
          .then(({ data }) => {
            this.senderIDs = data.data;
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

            this.loadingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingData = false;
          });
      });
    },

    addSenderID(payload) {
      return new Promise((resolve, reject) => {
        this.loadingData = true;
        SmsService.addSenderID(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingData = false;
          });
      });
    },
  },
});
