import ApiService from "@/core/services/ApiService";

class InstitutionService {
  /**
   * Institutions
   */
  getInstitutions(options) {
    return ApiService.get(
      `/v1/admin/institutions?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getInstitution(id) {
    return ApiService.get(`/v1/admin/institutions/${id}`);
  }
  addInstitution(payload) {
    return ApiService.post(`/v1/admin/institutions`, payload);
  }
  updateInstitution(options) {
    return ApiService.patch(`/v1/admin/institutions/${options.id}`, options);
  }

  /**
   * Institution Types
   */
  getInstitutionTypes(options) {
    return ApiService.get(
      `/v1/admin/institution-types?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getInstitutionType(id) {
    return ApiService.get(`/v1/admin/institution-types/${id}`);
  }
  addInstitutionType(payload) {
    return ApiService.post(`/v1/admin/institution-types`, payload);
  }
  updateInstitutionType(options) {
    return ApiService.patch(
      `/v1/admin/institution-types/${options.id}`,
      options
    );
  }
}

export default new InstitutionService();
