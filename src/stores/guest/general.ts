import { defineStore } from "pinia";
import { getError } from "@/helpers/errors";
import GeneralService from "@/services/guest/GeneralService";

export const useGuestGeneralStore = defineStore("guestGeneralStore", {
  state: () => ({
    institutions: [],
    permissions: {},
    countries: {},

    //shared
    loadingGeneralData: false,
    error: null,
  }),
  actions: {
    getInstitutions(options) {
      return new Promise((resolve, reject) => {
        this.loadingGeneralData = true;

        GeneralService.getInstitutions(options)
          .then(({ data }) => {
            this.institutions = data;
            resolve(data);
          })
          .catch((error) => {
            this.loadingGeneralData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingGeneralData = false;
          });
      });
    },
    getPermissions() {
      return new Promise((resolve, reject) => {
        this.loadingGeneralData = true;

        GeneralService.getPermissions()
          .then(({ data }) => {
            this.permissions = data;
            resolve(data);
          })
          .catch((error) => {
            this.loadingGeneralData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingGeneralData = false;
          });
      });
    },
    getCountries() {
      return new Promise((resolve, reject) => {
        this.loadingGeneralData = true;

        GeneralService.getCountries()
          .then(({ data }) => {
            this.countries = data;
            resolve(data);
          })
          .catch((error) => {
            this.loadingGeneralData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingGeneralData = false;
          });
      });
    },
  },
});
