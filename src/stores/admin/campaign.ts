import { defineStore } from "pinia";
import { getError } from "@/helpers/errors";
import CampaignService from "@/services/admin/CampaignService";
import type { iCampaign } from "@/models/campaign";

export const useAdminCampaignStore = defineStore("adminCampaignStore", {
  state: () => ({
    campaigns: [],
    campaign: {},
    campaignPayments: [],
    campaignDetails: {} as iCampaign,

    donations: [],

    //shared
    meta: { total: 0, from: 0, to: 0, last_page: 0 },
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
            this.campaigns = data.campaigns.data;
            console.log(data.campaigns);
            this.meta.total = data.campaigns.total;
            this.meta.from = data.campaigns.from;
            this.meta.to = data.campaigns.to;
            this.meta.last_page = data.campaigns.last_page;
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
