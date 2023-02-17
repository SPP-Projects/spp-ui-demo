import { getError } from "@/helpers/errors";

import { defineStore } from "pinia";

import RemittanceService from "@/services/remittance/RemittanceService";
import TransactionService from "@/services/customer/TransactionService";
import { useStorage } from "@vueuse/core";

export const useCustomerRemittanceStore = defineStore(
  "customerRemittanceStore",
  {
    state: () => ({
      remittances: [] as any,
      meta: { total: 0, from: 0, to: 0, last_page: 0 },
      remittance: {} as any,
      accountRemittances: [],
      loadingRemittanceData: false,

      error: null,

      //store in local storage
      validatedRemittance: useStorage("validatedRemittanceResponse", []) as any,

      submittedRemittance: [],
      remittanceValidationForm: {},
      remittanceStatuses: [],
      remittancesValue: {},
      remittancesCount: {},
      unauthorized: false,

      //general
      institutions: [],
      loadingInstitutionData: false,
    }),
    actions: {
      getRemittances(options) {
        return new Promise((resolve, reject) => {
          this.loadingRemittanceData = true;
          RemittanceService.getRemittances(options)
            .then(({ data }) => {
              this.remittances = data.data;

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

              this.remittances = [];
              this.loadingRemittanceData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingRemittanceData = false;
            });
        });
      },
      getRemittance(id) {
        return new Promise((resolve, reject) => {
          this.loadingRemittanceData = true;
          RemittanceService.getRemittance(id)
            .then((response) => {
              console.log(response.data);
              this.remittance = response.data;
              resolve(response);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingRemittanceData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingRemittanceData = false;
            });
        });
      },
      validateRemittance(payload) {
        return new Promise((resolve, reject) => {
          this.loadingRemittanceData = true;

          RemittanceService.validateRemittance(payload)
            .then((response) => {
              this.validatedRemittance = response.data;

              resolve(response.data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingRemittanceData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingRemittanceData = false;
            });
        });
      },
      initiateRemittance(payload) {
        return new Promise((resolve, reject) => {
          this.loadingRemittanceData = true;

          RemittanceService.initiateRemittance(payload)
            .then((response) => {
              this.validatedRemittance = response.data;

              resolve(response.data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingRemittanceData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingRemittanceData = false;
            });
        });
      },
      confirmRemittance(payload) {
        return new Promise((resolve, reject) => {
          this.loadingRemittanceData = true;

          RemittanceService.confirmRemittance(payload)
            .then((response) => {
              this.validatedRemittance = response.data;

              resolve(response.data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingRemittanceData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingRemittanceData = false;
            });
        });
      },

      //TODO - MOVE TO COMMON PLACE
      getInstitutions(options) {
        return new Promise((resolve, reject) => {
          this.loadingInstitutionData = true;

          TransactionService.getInstitutions(options)
            .then(({ data }) => {
              this.institutions = data;
              resolve(data);
            })
            .catch((error) => {
              this.loadingInstitutionData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingInstitutionData = false;
            });
        });
      },

      validateTransfer(payload) {
        return new Promise((resolve, reject) => {
          this.loadingRemittanceData = true;

          RemittanceService.initiateRemittance(payload)
            .then((response) => {
              this.validatedRemittance = response.data;

              resolve(response.data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                // unauthorized.
                this.unauthorized = true;
              }

              this.loadingRemittanceData = false;
              this.error = getError(error);
              reject(error);
            })
            .finally(() => {
              this.loadingRemittanceData = false;
            });
        });
      },
    },

    getters: {
      getValidatedRemittanceResponse(state) {
        return state.validatedRemittance;
      },
    },
  }
);
