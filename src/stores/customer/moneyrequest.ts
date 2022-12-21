import { defineStore } from "pinia";
import MoneyRequestService from "@/services/customer/MoneyRequestService";
import { getError } from "@/helpers/errors";
import type { iMoneyRequest } from "@/models/moneyrequest";

export const useCustomerMoneyRequestStore = defineStore(
  "customerMoneyRequestStore",
  {
    state: () => ({
      moneyRequests: [],
      moneyRequestDetails: {} as iMoneyRequest,
      moneyRequestPayments: [],
      meta: { total: 0, from: 0, to: 0, last_page: 0 },
      moneyRequest: {},
      accountMoneyRequests: [],
      loadingMoneyRequestData: false,
      error: null,
      unauthorized: false,
    }),
    actions: {
      getAllMoneyRequests(options) {
        return new Promise((resolve, reject) => {
          this.loadingMoneyRequestData = true;
          MoneyRequestService.getAllMoneyRequests(options)
            .then(({ data }) => {
              this.moneyRequests = data.data;
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

              this.loadingMoneyRequestData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingMoneyRequestData = false;
            });
        });
      },

      addMoneyRequest(payload) {
        return new Promise((resolve, reject) => {
          this.loadingMoneyRequestData = true;
          MoneyRequestService.addMoneyRequest(payload)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingMoneyRequestData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingMoneyRequestData = false;
            });
        });
      },

      updateMoneyRequest([payload, reference]) {
        return new Promise((resolve, reject) => {
          this.loadingMoneyRequestData = true;
          MoneyRequestService.updateMoneyRequest(payload, reference)
            .then(({ data }) => {
              resolve(data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingMoneyRequestData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingMoneyRequestData = false;
            });
        });
      },

      getMoneyRequest(id) {
        return new Promise((resolve, reject) => {
          this.loadingMoneyRequestData = true;
          MoneyRequestService.getMoneyRequestByReference(id)
            .then((response) => {
              console.log(".............", response.data.money_request);
              this.moneyRequestDetails = response.data.money_request;

              resolve(response);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingMoneyRequestData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingMoneyRequestData = false;
            });
        });
      },

      payMoneyRequest([payload, reference]) {
        return new Promise((resolve, reject) => {
          this.loadingMoneyRequestData = true;
          MoneyRequestService.payMoneyRequest(payload, reference)
            .then(({ data }) => {
              resolve(data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingMoneyRequestData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingMoneyRequestData = false;
            });
        });
      },
    },
  }
);
