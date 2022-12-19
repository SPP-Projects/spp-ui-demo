import { getError } from "@/helpers/errors";
import TransactionService from "@/services/customer/TransactionService";
import { defineStore } from "pinia";

export const useCustomerTransactionStore = defineStore(
  "customerTransactionStore",
  {
    state: () => ({
      transactions: [],
      meta: { total: 0, from: 0, to: 0, last_page: 0 },
      transaction: {},
      accountTransactions: [],
      loadingTransactionData: false,

      error: null,
      validatedTransaction: null,
      submittedTransaction: [],
      transactionValidationForm: {},
      transactionStatuses: [],
      transactionsValue: {},
      transactionsCount: {},
      unauthorized: false,
    }),
    actions: {
      getTransactions(options) {
        return new Promise((resolve, reject) => {
          this.loadingTransactionData = true;
          TransactionService.getAllTransactions(options)
            .then(({ data }) => {
              this.transactions = data.data;
              console.log(data.data);
              this.meta.total = data.total;
              this.meta.from = data.from;
              this.meta.to = data.to;
              this.meta.last_page = data.last_page;

              //TODO - POPULATION FOR CHART IF DASHBOARD ROUTE
              //TODO - chart data
              // for (let key in response.data) {
              //   chartData.value.push(parseInt(response.data[key].amount));
              // }

              resolve(data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.transactions = [];
              this.loadingTransactionData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingTransactionData = false;
            });
        });
      },

      getTransactionByReference(id) {
        return new Promise((resolve, reject) => {
          this.loadingTransactionData = true;
          TransactionService.getTransactionByReference(id)
            .then((response) => {
              this.transaction = response.data.data;
              resolve(response);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingTransactionData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingTransactionData = false;
            });
        });
      },

      getTransactionStatuses() {
        return new Promise((resolve, reject) => {
          this.loadingTransactionData = true;
          TransactionService.getTransactionStatuses()
            .then(({ data }) => {
              this.transactionStatuses = data.data;
              resolve(data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingTransactionData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingTransactionData = false;
            });
        });
      },

      getTransactionsValue(payload) {
        return new Promise((resolve, reject) => {
          this.loadingTransactionData = true;
          TransactionService.getTransactionsValue(payload)
            .then(({ data }) => {
              this.transactionsValue = data.data;
              resolve(data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingTransactionData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingTransactionData = false;
            });
        });
      },

      getTransactionsCount(payload) {
        return new Promise((resolve, reject) => {
          this.loadingTransactionData = true;
          TransactionService.getTransactionsCount(payload)
            .then(({ data }) => {
              this.transactionsCount = data.data;
              resolve(data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingTransactionData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingTransactionData = false;
            });
        });
      },

      submitTransaction(payload) {
        return new Promise((resolve, reject) => {
          this.loadingTransactionData = true;
          TransactionService.submitTransaction(payload)
            .then((response) => {
              this.submittedTransaction = response.data;
              resolve(response);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingTransactionData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingTransactionData = false;
            });
        });
      },

      validateTransaction(payload) {
        return new Promise((resolve, reject) => {
          this.loadingTransactionData = true;

          TransactionService.validateTransaction(payload)
            .then((response) => {
              this.validatedTransaction = response.data;

              resolve(response.data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingTransactionData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingTransactionData = false;
            });
        });
      },
    },

    getters: {
      // loadingData: (state) => state.loadingData,
      // error: (state) => state.error,
      // transactions: (state) => state.transactions,
      // transaction: (state) => state.transaction,
      // accountTransactions: (state) => state.accountTransactions,
      // validatedTransaction: (state) => state.validatedTransaction,
      // submittedTransaction: (state) => state.submittedTransaction,
      // transactionValidationForm: (state) => state.transactionValidationForm,
      // transactionStatuses: (state) => state.transactionStatuses,
      // transactionsValue: (state) => state.transactionsValue,
      // transactionsCount: (state) => state.transactionsCount,
    },
  }
);
