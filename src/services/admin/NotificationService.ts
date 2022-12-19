import ApiService from "@/core/services/ApiService";

class NotificationService {
  /**
   * Notification Activities
   */
  getNotificationActivities(options) {
    return ApiService.get(
      `/v1/admin/notification-activities?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  addNotificationActivity(payload) {
    return ApiService.post(`/v1/admin/notification-activities`, payload);
  }
  updateNotificationActivity(options) {
    return ApiService.patch(
      `/v1/admin/notification-activities/${options.id}`,
      options
    );
  }
  getNotificationActivityOptions() {
    return ApiService.get(`/v1/admin/notification-activities/options`);
  }

  /**
   * Notification Settings
   */
  getAllNotifications(options) {
    return ApiService.get(
      `/v1/admin/notification-settings?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getSingleNotification(id) {
    return ApiService.get(`/v1/admin/notification-settings/${id}`);
  }
  addNotification(payload) {
    return ApiService.post(`/v1/admin/notification-settings`, payload);
  }
  updateNotification(options) {
    return ApiService.patch(
      `/v1/admin/notification-settings/${options.id}`,
      options
    );
  }
  getNotificationOptions() {
    return ApiService.get(`/v1/admin/notification-settings/options`);
  }

  /**
   * Notification Templates
   */
  getNotificationTemplates(options) {
    return ApiService.get(
      `/v1/admin/notification-templates?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  addNotificationTemplate(payload) {
    return ApiService.post(`/v1/admin/notification-templates`, payload);
  }
  updateNotificationTemplate(options) {
    return ApiService.patch(
      `/v1/admin/notification-templates/${options.id}`,
      options
    );
  }
  getNotificationTemplateOptions() {
    return ApiService.get(`/v1/admin/notification-templates/options`);
  }

  /**
   * Notification Activity Groups
   */
  getNotificationActivityGroups(options) {
    return ApiService.get(
      `/v1/admin/notification-activity-groups?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getNotificationActivityGroup(id) {
    return ApiService.get(`/v1/admin/notification-activity-groups/${id}`);
  }
  updateNotificationActivityGroup(payload) {
    return ApiService.patch(
      `/v1/admin/notification-activity-groups/${payload.id}`,
      payload
    );
  }
}

export default new NotificationService();
