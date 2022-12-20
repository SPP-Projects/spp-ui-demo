import { defineStore } from "pinia";
import PaymentService from "@/services/guest/PaymentService";
import { getError } from "@/helpers/errors";

import { ref } from "vue";
import type { Invoice, InvoiceItem } from "@/models/invoice";

export const useGuestPaymentStore = defineStore("guestPaymentStore", {
  state: () => ({
    loadingData: false,
    error: null,
    paymentInfo: {},
    validatedPayment: null,
    submittedPayment: [],

    //invoice
    invoiceInfo: {},
    invoiceData: {} as Invoice,
    invoiceItems: [] as InvoiceItem[],
    //shared
    loadingPaymentData: false,
  }),
  actions: {
    submitPayment(payload) {
      return new Promise((resolve, reject) => {
        this.loadingData = true;
        PaymentService.submitPayment(payload)
          .then((response) => {
            this.submittedPayment = response.data;
            resolve(response);
          })
          .catch((error) => {
            this.loadingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingData = false;
          });
      });
    },

    validatePayment(payload) {
      return new Promise((resolve, reject) => {
        this.loadingData = true;

        PaymentService.validatePayment(payload)
          .then((response) => {
            this.validatedPayment = response.data;
            resolve(response);
          })
          .catch((error) => {
            this.loadingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingData = false;
          });
      });
    },

    getInvoice(id) {
      return new Promise((resolve, reject) => {
        this.loadingPaymentData = true;
        PaymentService.getInvoiceByReference(id)
          .then((response) => {
            this.invoiceData = response.data.invoice;
            this.invoiceItems = response.data.invoice.items;

            resolve(response);
          })
          .catch((error) => {
            this.loadingPaymentData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingPaymentData = false;
          });
      });
    },
  },
});
