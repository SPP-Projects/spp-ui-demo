import ApiService from "@/core/services/ApiService";

class LanguageService {
  getLanguages(options) {
    return ApiService.get(
      `/v1/admin/languages?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  getLanguage(id) {
    return ApiService.get(`/v1/admin/languages/${id}`);
  }

  addLanguage(payload) {
    return ApiService.post(`/v1/admin/languages`, payload);
  }

  updateLanguage(options) {
    return ApiService.patch(`/v1/admin/languages/${options.id}`, options);
  }
}

export default new LanguageService();
