import { defineStore } from "pinia";
import InvoiceService from "@/services/customer/InvoiceService";
import { getError } from "@/helpers/errors";
import type { Invoice } from "@/models/invoice";

export const useCustomerInvoiceStore = defineStore("customerInvoiceStore", {
  state: () => ({
    invoices: [],
    invoiceDetails: {} as Invoice,
    invoiceItems: [],
    invoicePayments: [],
    meta: { total: 0, from: 0, to: 0, last_page: 0 },
    invoice: {},
    loadingInvoiceData: false,
    error: null,
    unauthorized: false,
  }),
  actions: {
    getAllInvoices(options) {
      return new Promise((resolve, reject) => {
        this.loadingInvoiceData = true;
        InvoiceService.getAllInvoices(options)
          .then(({ data }) => {
            this.invoices = data.data;
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

            this.loadingInvoiceData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingInvoiceData = false;
          });
      });
    },

    addInvoice(payload) {
      return new Promise((resolve, reject) => {
        this.loadingInvoiceData = true;
        InvoiceService.addInvoice(payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingInvoiceData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingInvoiceData = false;
          });
      });
    },

    updateInvoiceStatus([payload, reference]) {
      return new Promise((resolve, reject) => {
        this.loadingInvoiceData = true;
        InvoiceService.updateInvoiceStatus(payload, reference)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingInvoiceData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingInvoiceData = false;
          });
      });
    },

    getInvoiceByReference(id) {
      console.log(id);
      return new Promise((resolve, reject) => {
        this.loadingInvoiceData = true;
        InvoiceService.getInvoiceByReference(id)
          .then(({ data }) => {
            this.invoiceDetails = data.invoice;
            this.invoiceItems = data.invoice.items;
            this.invoicePayments = data.invoice.payments;
            console.log(data);
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingInvoiceData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingInvoiceData = false;
          });
      });
    },
  },
});
