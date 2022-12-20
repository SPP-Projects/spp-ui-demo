export interface User {
  action: string;
  id: number;
  name?: string;
  email?: string;
  avatar?: string;
  phone?: string;
  status_id?: number;
  last_login_at?: string;
  last_login_ip?: string;
  customer?: {
    id: number;
    parent_id: null;
    type_id: number;
    group_id: number;
    country_id: number;
    name: string;
    phone: string;
    test_mode: number;
    created_at: string;
    updated_at: string;
  };
  permissions?: Permissions;
  enabled_permissions?: Array<number>;

  customer_id?: number;

  email_verified_at?: null;
  two_factor_secret?: null;
  two_factor_recovery_codes?: null;

  created_at?: number;
  updated_at?: number;
}

export interface Permissions {
  Authentication: Array<PermissionDetail>;
  Transactions: Array<PermissionDetail>;
  Customers: Array<PermissionDetail>;
  Users: Array<PermissionDetail>;
  Permissions: Array<PermissionDetail>;
  Account: Array<PermissionDetail>;
  SMS: Array<PermissionDetail>;
  Campaigns: Array<PermissionDetail>;
  Invoices: Array<PermissionDetail>;
  Payments: Array<PermissionDetail>;
  "Money Requests": Array<PermissionDetail>;
}

export interface PermissionDetail {
  id: number;
  name: string;
  enabled: number;
  permission_id: number;
  group: PermissionDetailGroup;
}

export interface PermissionDetailGroup {
  id: number;
  name: string;
}
