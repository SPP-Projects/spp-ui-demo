export interface Permission {
  id: number;
  name: string;
  channel: string;
  type_id: number;
  group_id: number;
  created_at: string;
  updated_at: string;
  type: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  group: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
}

export interface PermissionGroup {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface PermissionType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
