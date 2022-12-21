import type { iLanguage } from "@/models/language";

export interface NotificationActivity {
  id: number;
  name: string;
  group_id: number;
  activity_type: string;
  created_at: string;
  updated_at: string;
  group: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
}

export interface NotificationActivityGroup {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface NotificationSetting {
  id: number;
  activity_id: number;
  template_id: number;
  type_id: number;
  recipient_type: string;
  recipient_id: null;
  is_active: number;
  created_at: string;
  updated_at: string;
  activity: {
    id: number;
    name: string;
    group_id: number;
    activity_type: null;
    created_at: string;
    updated_at: string;
  };
  type: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  template: {
    id: number;
    language_id: number;
    name: string;
    subject: string;
    body: string;
    created_at: string;
    updated_at: string;
  };
}

export interface NotificationTemplate {
  id: number;
  language_id: number;
  name: string;
  subject: string;
  body: string;
  created_at: string;
  updated_at: string;
  language: {
    id: number;
    name: string;
    alias: string;
    created_at: string;
    updated_at: string;
  };
}

export interface iNotificationSettingOption {
  activities: Array<NotificationActivity>;
  types: Array<NotificationType>;
  templates: Array<NotificationTemplate>;
}

export interface NotificationType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface iNotificationActivityOption {
  groups: Array<NotificationActivityGroup>;
}

export interface iNotificationTemplateOption {
  languages: Array<iLanguage>;
}
