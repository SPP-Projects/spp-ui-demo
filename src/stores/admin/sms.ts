import { defineStore } from "pinia";
import SmsService from "@/services/admin/SmsService";
import { getError } from "@/helpers/errors";

export const useAdminSmsStore = defineStore("adminSmsStore", {
  state: () => ({
    loadingSmsData: false,
    error: null,
    unauthorized: false,

    smsReports: [],
    senderIDs: [],
    meta: { total: 0, from: 0, to: 0, last_page: 0 },
  }),
  actions: {
    getSmsReports(options) {
      return new Promise((resolve, reject) => {
        this.loadingSmsData = true;
        SmsService.getSMSMessages(options)
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

            this.loadingSmsData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingSmsData = false;
          });
      });
    },

    getSenderIDs(options) {
      return new Promise((resolve, reject) => {
        this.loadingSmsData = true;
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

            this.loadingSmsData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingSmsData = false;
          });
      });
    },

    addSenderID(payload) {
      return new Promise((resolve, reject) => {
        SmsService.addSenderID(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    updateSenderID(payload) {
      return new Promise((resolve, reject) => {
        SmsService.updateSenderID(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  getters: {},
});
