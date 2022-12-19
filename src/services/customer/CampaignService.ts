import ApiService from "@/core/services/ApiService";
class CampaignService {
  getCampaigns(options) {
    return ApiService.get(
      `/v1/campaigns/records?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  getCampaign(payload) {
    return ApiService.get(`/v1/campaigns/${payload.reference}`);
  }

  addCampaign(payload) {
    return ApiService.post(`/v1/campaigns/add`, payload);
  }

  updateCampaign(options, reference) {
    return ApiService.post(`/v1/campaigns/${reference}`, options);
  }

  submitCampaign(payload) {
    return ApiService.post(`/v1/pay/confirm`, payload);
  }

  validateCampaign(payload) {
    return ApiService.post(`/v1/pay/initiate`, payload);
  }
}

export default new CampaignService();
