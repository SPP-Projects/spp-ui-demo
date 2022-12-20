import { defineStore } from "pinia";
import { getError } from "@/helpers/errors";
import CampaignService from "@/services/customer/CampaignService";
import type { Campaign } from "@/models/campaign";

export const useCustomerCampaignStore = defineStore("customerCampaignStore", {
  state: () => ({
    campaigns: [],
    donations: [],
    meta: { total: 0, from: 0, to: 0, last_page: 0 },
    campaign: {},
    campaignPayments: [],
    campaignDetails: {} as Campaign,
    loadingData: false,
    error: null,
    unauthorized: false,
  }),
  actions: {
    getCampaigns(options) {
      return new Promise((resolve, reject) => {
        this.loadingData = true;
        CampaignService.getCampaigns(options)
          .then(({ data }) => {
            this.campaigns = data.data;
            console.log(this.campaigns);
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

            this.loadingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingData = false;
          });
      });
    },

    addCampaign(payload) {
      return new Promise((resolve, reject) => {
        this.loadingData = true;
        CampaignService.addCampaign(payload)
          .then((response) => {
            resolve(response);
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

    updateCampaign([payload, reference]) {
      return new Promise((resolve, reject) => {
        this.loadingData = true;
        CampaignService.updateCampaign(payload, reference)
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

    getCampaign(payload) {
      return new Promise((resolve, reject) => {
        this.loadingData = true;
        CampaignService.getCampaign(payload)
          .then(({ data }) => {
            console.log(data);

            this.campaignDetails = data.campaign;
            this.campaignPayments = data.campaign.donations.data;

            this.meta.total = data.campaign.donations.total;
            this.meta.from = data.campaign.donations.from;
            this.meta.to = data.campaign.donations.to;
            this.meta.last_page = data.campaign.donations.last_page;

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
