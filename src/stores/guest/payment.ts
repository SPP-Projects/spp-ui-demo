import { defineStore } from "pinia";
import PaymentService from "@/services/guest/PaymentService";
import { getError } from "@/helpers/errors";

import type { iInvoice, iInvoiceItem } from "@/models/invoice";
import type { iCampaign } from "@/models/campaign";
import { useStorage } from "@vueuse/core";

export const useGuestPaymentStore = defineStore("guestPaymentStore", {
  state: () => ({
    loadingData: false,
    error: null,
    paymentInfo: {},
    validatedPayment: null,

    //store in local storage
    paymentValidationResponse: useStorage(
      "paymentValidationResponse",
      []
    ) as any,
    paymentInvoiceData: useStorage("paymentInvoiceData", {} as iInvoice),
    paymentInvoiceItems: useStorage(
      "paymentInvoiceItems",
      [] as iInvoiceItem[]
    ),

    submittedPayment: [],
    submittedOtpResponse: [],

    //invoice
    invoiceInfo: {},
    invoiceData: {} as iInvoice,
    invoiceItems: [] as iInvoiceItem[],

    //campaign
    campaignData: {} as iCampaign,

    //shared
    loadingPaymentData: false,
    loadingValidatedData: false,
    loadingOtpResponse: false,
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
            console.log("final");
            this.loadingData = false;
          });
      });
    },

    submitPaystackOtp(payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        this.loadingOtpResponse = true;
        PaymentService.submitPaystackOtp(payload)
          .then((response) => {
            this.submittedOtpResponse = response.data;
            resolve(response);
          })
          .catch((error) => {
            this.loadingOtpResponse = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingOtpResponse = false;
          });
      });
    },

    validatePayment(payload) {
      return new Promise((resolve, reject) => {
        this.loadingData = true;

        PaymentService.validatePayment(payload)
          .then((response) => {
            //TODO - remove redundant validatedPayment
            this.validatedPayment = response.data;
            this.paymentValidationResponse = response.data;
            resolve(response);
          })
          .catch((error) => {
            this.loadingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            console.log("finally");
            this.loadingData = false;
          });
      });
    },

    getInvoice(id) {
      this.paymentInvoiceData = {} as iInvoice;
      this.paymentInvoiceItems = [] as iInvoiceItem[];
      return new Promise((resolve, reject) => {
        this.loadingPaymentData = true;
        PaymentService.getInvoiceByReference(id)
          .then(({ data }) => {
            if (data.status !== "Error") {
              this.invoiceData = data.invoice;
              this.invoiceItems = data.invoice.items;
              this.paymentInvoiceData = data.invoice;
              this.paymentInvoiceItems = data.invoice.items;
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

  getters: {
    getPaymentValidationResponse(state) {
      return state.paymentValidationResponse;
    },
    getPaymentInvoiceData(state) {
      return state.paymentInvoiceData;
    },
    getPaymentInvoiceItems(state) {
      return state.paymentInvoiceItems;
    },
  },
});
