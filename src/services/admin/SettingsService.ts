import ApiService from "@/core/services/ApiService";

class SettingsService {
  /**
   * Settings
   */
  getAllGeneralSettings(options) {
    return ApiService.get(
      `/v1/admin/settings?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  addGeneralSettings(payload) {
    return ApiService.post(`/v1/admin/settings`, payload);
  }
  updateGeneralSettings(options) {
    return ApiService.patch(`/v1/admin/settings/${options.id}`, options);
  }
  getSettingOptions() {
    return ApiService.get(`/v1/admin/settings/options`);
  }

  /**
   * Setting Groups
   */
  getSettingGroups(options) {
    return ApiService.get(
      `/v1/admin/setting-groups?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  addSettingGroups(payload) {
    return ApiService.post(`/v1/admin/setting-groups`, payload);
  }
  updateSettingGroups(options) {
    return ApiService.patch(`/v1/admin/setting-groups/${options.id}`, options);
  }

  /**
   * Setting Types
   */
  getSettingTypes(options) {
    return ApiService.get(
      `/v1/admin/setting-types?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  addSettingTypes(payload) {
    return ApiService.post(`/v1/admin/setting-types`, payload);
  }
  updateSettingTypes(options) {
    return ApiService.patch(`/v1/admin/setting-types/${options.id}`, options);
  }
}

export default new SettingsService();
