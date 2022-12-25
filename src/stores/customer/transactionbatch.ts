import { getError } from "@/helpers/errors";
import { defineStore } from "pinia";
import TransactionBatchService from "@/services/customer/TransactionBatchService";

export const useCustomerTransactionBatchStore = defineStore(
  "customerTransactionBatchStore",
  {
    state: () => ({
      validatedTransactionBatch: null,
      submittedTransactionBatch: [],

      transactionBatches: [],
      transactions: [],
      meta: { total: 0, from: 0, to: 0, last_page: 0 },
      transactionsBatch: {},

      //shared
      loadingData: false,
      error: null,
      unauthorized: false,
    }),
    actions: {
      getAllTransactionBatches(options) {
        return new Promise((resolve, reject) => {
          this.loadingData = true;
          TransactionBatchService.getAllTransactionBatches(options)
            .then(({ data }) => {
              console.log(data);
              this.transactionBatches = data.data;
              this.meta.total = data.total;
              this.meta.from = data.from;
              this.meta.to = data.to;
              this.meta.last_page = data.last_page;
              resolve(data.data);
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

      getTransactionBatch(options) {
        return new Promise((resolve, reject) => {
          this.loadingData = true;
          TransactionBatchService.getTransactionBatch(options)
            .then(({ data }) => {
              console.log(data);
              this.transactionBatches = data.data;
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

              this.loadingData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingData = false;
            });
        });
      },

      processTransactionBatch(reference) {
        return new Promise((resolve, reject) => {
          this.loadingData = true;
          TransactionBatchService.processTransactionBatch(reference)
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

      submitTransactionBatch(payload) {
        return new Promise((resolve, reject) => {
          this.loadingData = true;
          TransactionBatchService.submitTransactionBatch(payload)
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
  }
);
