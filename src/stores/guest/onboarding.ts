import { defineStore } from "pinia";
import { getError } from "@/helpers/errors";
import OnboardingService from "@/services/guest/OnboardingService";

export const useGuestOnboardingStore = defineStore("guestOnboardingStore", {
  state: () => ({
    customer_types: [],
    account_types: [],
    newCustomer: {},

    //shared
    loadingOnboardingData: false,
    error: null,
  }),
  actions: {
    getCustomerType() {
      return new Promise((resolve, reject) => {
        this.loadingOnboardingData = true;
        OnboardingService.getCustomerType()
          .then(({ data }) => {
            this.customer_types = data;
            resolve(data);
          })
          .catch((error) => {
            this.loadingOnboardingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingOnboardingData = false;
          });
      });
    },

    getAccountType(data) {
      return new Promise((resolve, reject) => {
        this.loadingOnboardingData = true;
        OnboardingService.getAccountType(data)
          .then(({ data }) => {
            this.account_types = data;

            resolve(data);
          })
          .catch((error) => {
            this.loadingOnboardingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingOnboardingData = false;
          });
      });
    },

    getKYCRequirements(data) {
      return new Promise((resolve, reject) => {
        this.loadingOnboardingData = true;
        OnboardingService.getKYCRequirements({
          account_type_id: data.account_type_id,
          customer_type_id: data.customer_type_id,
          kyc_group_ids: [1, 4],
        })
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            this.loadingOnboardingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingOnboardingData = false;
          });
      });
    },

    registerCustomer(data) {
      return new Promise((resolve, reject) => {
        this.loadingOnboardingData = true;
        OnboardingService.registerCustomer(data)
          .then((response) => {
            console.log(response);
            this.newCustomer = response.data;
            resolve(response);
          })
          .catch((error) => {
            this.loadingOnboardingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingOnboardingData = false;
          });
      });
    },

    initiateForgotPassword(data) {
      return new Promise((resolve, reject) => {
        this.loadingOnboardingData = true;
        OnboardingService.initiateForgotPassword(data)
          .then((response) => {
            console.log(response);
            this.newCustomer = response.data;
            resolve(response);
          })
          .catch((error) => {
            this.loadingOnboardingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingOnboardingData = false;
          });
      });
    },
    validateResetCode(data) {
      return new Promise((resolve, reject) => {
        this.loadingOnboardingData = true;
        OnboardingService.validateResetCode(data)
          .then((response) => {
            console.log(response);
            this.newCustomer = response.data;
            resolve(response);
          })
          .catch((error) => {
            this.loadingOnboardingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingOnboardingData = false;
          });
      });
    },
    resetPassword(data) {
      return new Promise((resolve, reject) => {
        this.loadingOnboardingData = true;
        OnboardingService.resetPassword(data)
          .then((response) => {
            console.log(response);
            this.newCustomer = response.data;
            resolve(response);
          })
          .catch((error) => {
            this.loadingOnboardingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingOnboardingData = false;
          });
      });
    },
  },

  getters: {},
});
