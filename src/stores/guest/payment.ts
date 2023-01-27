import { defineStore } from "pinia";
import PaymentService from "@/services/guest/PaymentService";
import { getError } from "@/helpers/errors";

import type { iInvoice, iInvoiceItem } from "@/models/invoice";
import type { iCampaign } from "@/models/campaign";

export const useGuestPaymentStore = defineStore("guestPaymentStore", {
  state: () => ({
    loadingData: false,
    error: null,
    paymentInfo: {},
    validatedPayment: null,
    submittedPayment: [],

    //invoice
    invoiceInfo: {},
    invoiceData: {} as iInvoice,
    invoiceItems: [] as iInvoiceItem[],

    //campaigin
    campaignData: {} as iCampaign,

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
          .then(({ data }) => {
            if (data.status !== "Error") {
              this.invoiceData = data.invoice;
              this.invoiceItems = data.invoice.items;
              console.log(data.invoice);
            }

            resolve(data);
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

    getCampaign(id) {
      return new Promise((resolve, reject) => {
        this.loadingPaymentData = true;
        PaymentService.getCampaign(id)
          .then(({ data }) => {
            if (data.status !== "Error") {
              this.campaignData = data.campaign;
            }

            resolve(data);
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
