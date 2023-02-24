import ApiService from "@/core/services/ApiService";
class CampaignService {
  getCampaigns(options) {
    return ApiService.get(
      `/v1/admin/campaigns?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  getCampaign(payload) {
    return ApiService.get(`/v1/admin/campaigns/${payload.reference}`);
  }

  updateCampaign(options, reference) {
    return ApiService.post(`/v1/admin/campaigns/${reference}`, options);
  }
}

export default new CampaignService();
