import { getError } from "@/helpers/errors";
import KycService from "@/services/customer/KycService";
import { defineStore } from "pinia";

export const useCustomerKycStore = defineStore("customerKycStore", {
  state: () => ({
    kycRequirements: [],
    kycDetails: [],

    //shared
    loadingData: false,
    error: null,
    unauthorized: false,
  }),
  actions: {
    getKycRequirements() {
      return new Promise((resolve, reject) => {
        this.loadingData = true;
        KycService.getKycRequirements()
          .then(({ data }) => {
            this.kycRequirements = data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.kycRequirements = [];
            this.loadingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingData = false;
          });
      });
    },

    getKycDetails() {
      return new Promise((resolve, reject) => {
        this.loadingData = true;
        KycService.getKycDetails()
          .then(({ data }) => {
            this.kycDetails = data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.kycDetails = [];
            this.loadingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingData = false;
          });
      });
    },

    updateKYC(payload) {
      return new Promise((resolve, reject) => {
        this.loadingData = true;
        KycService.updateKYC(payload)
          .then((response) => {
            resolve(response.data);
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

    updatePassword(payload) {
      return new Promise((resolve, reject) => {
        this.loadingData = true;
        KycService.updatePassword(payload)
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
});
