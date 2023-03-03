import { defineStore } from "pinia";

import { getError } from "@/helpers/errors";

import PaymentCustomerService from "@/services/customer/PaymentCustomerService";

export const useCustomerPaymentCustomerStore = defineStore(
  "customerPaymentCustomerStore",
  {
    state: () => ({
      paymentCustomers: [] as any[],
      paymentCustomer: {} as any,

      paymentCustomerTransactions: [],
      paymentCustomerDetails: {} as any,

      //shared
      loadingPaymentCustomerData: false,

      error: null,
      meta: { total: 0, from: 0, to: 0, last_page: 0 },
      unauthorized: false,
    }),
    actions: {
      getPaymentCustomers(options) {
        return new Promise((resolve, reject) => {
          this.loadingPaymentCustomerData = true;
          PaymentCustomerService.getPaymentCustomers(options)
            .then(({ data }) => {
              this.paymentCustomers = data.data;

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

              this.loadingPaymentCustomerData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingPaymentCustomerData = false;
            });
        });
      },

      getPaymentCustomer(id) {
        return new Promise((resolve, reject) => {
          this.loadingPaymentCustomerData = true;

          PaymentCustomerService.getPaymentCustomer(id)
            .then(({ data }) => {
              this.paymentCustomer = data;
              console.log(data.payment_customer);
              console.log(data.transactions.total);

              this.paymentCustomerDetails = data.payment_customer;
              this.paymentCustomerTransactions = data.transactions.data;
              //
              this.meta.total = data.transactions.total;
              this.meta.from = data.transactions.from;
              this.meta.to = data.transactions.to;
              this.meta.last_page = data.transactions.last_page;
              resolve(data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingPaymentCustomerData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingPaymentCustomerData = false;
            });
        });
      },

      updatePaymentCustomer(payload) {
        return new Promise((resolve, reject) => {
          this.loadingPaymentCustomerData = true;
          PaymentCustomerService.updatePaymentCustomer(payload)
            .then(({ data }) => {
              resolve(data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingPaymentCustomerData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingPaymentCustomerData = false;
            });
        });
      },
    },
  }
);
