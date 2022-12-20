export interface Customer {
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
  parent: null;
  type: {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  group: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  country: {
    id: number;
    short_name: string;
    name: string;
    iso3: string;
    number_code: string;
    phone_code: string;
    is_default: number;
    created_at: string;
    updated_at: string;
  };
}

export interface CustomerType {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerGroup {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerKycRequirement {
  id: number;
  customer_type_id: number;
  kyc_requirement_id: number;
  created_at: string;
  updated_at: string;
  customer_type: {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  kyc_requirement: {
    id: number;
    name: string;
    form_name: string;
    form_type: string;
    form_validation: string;
    group_id: number;
    created_at: string;
    updated_at: string;
  };
}

export interface CustomerKycRequirementOption {
  kyc_requirements: [
    {
      id: number;
      name: string;
      form_name: string;
      form_type: string;
      form_validation: string;
      group_id: number;
      created_at: string;
      updated_at: string;
      group: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
      };
    }
  ];
  customer_types: [
    {
      id: number;
      name: string;
      description: string;
      created_at: string;
      updated_at: string;
    }
  ];
}

export interface CustomerPermissionList {
  customer_permissions: CustomerPermissions;
  admin_permissions: AdminPermissions;
  enabled_permissions?: Array<number>;
}
export interface CustomerPermissions {
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

export interface AdminPermissions {
  Authentication: Array<PermissionDetail>;
  Transactions: Array<PermissionDetail>;
  Account: Array<PermissionDetail>;
  "Account Types": Array<PermissionDetail>;
  "Account Groups": Array<PermissionDetail>;
  "Account Limits": Array<PermissionDetail>;
  Customers: Array<PermissionDetail>;
  "Customer Types": Array<PermissionDetail>;
  "Customer Groups": Array<PermissionDetail>;
  SMS: Array<PermissionDetail>;
  Settings: Array<PermissionDetail>;
  "Setting Groups": Array<PermissionDetail>;
  "Setting Types": Array<PermissionDetail>;
  "KYC Requirements": Array<PermissionDetail>;
  "Account KYC Requirements": Array<PermissionDetail>;
  "Customer KYC Requirements": Array<PermissionDetail>;
  "Transaction Charge Settings": Array<PermissionDetail>;
  "Notification Settings": Array<PermissionDetail>;
  "Notification Activities": Array<PermissionDetail>;
  "Notification Templates": Array<PermissionDetail>;
  "Institution Payment Method Mappings": Array<PermissionDetail>;
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
