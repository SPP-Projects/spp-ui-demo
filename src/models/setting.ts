export interface Setting {
  id: number;
  type_id: number;
  group_id: number;
  name: string;
  short_name: string;
  description: string;
  value: string;
  entity_id: number;
  created_at: string;
  updated_at: string;
  type: SettingType;
  group: SettingGroup;
}

export interface SettingGroup {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface SettingType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface iSettingOption {
  groups: Array<SettingGroup>;
  types: Array<SettingType>;
}
