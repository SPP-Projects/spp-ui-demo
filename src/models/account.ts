import type { iKycRequirement } from "@/models/kyc";

export interface Account {
  id: number;
  name_on_account: string;
  customer_id: number;
  type_id: number;
  currency_id: number;
  group_id: number;
  actual_balance: string;
  is_default: number;
  institution_id: number;
  account_no: null;
  status_id: number;
  created_at: string;
  updated_at: string;
  currency: {
    id: number;
    type: string;
    name: string;
    symbol: string;
    code: string;
    logo: string;
    default: string;
    allow_address_creation: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  customer: {
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
  type: {
    id: number;
    name: string;
    description: string;
    is_hidden: number;
    created_at: string;
    updated_at: string;
  };
  institution: {
    id: number;
    name: string;
    type_id: string;
    code: string;
    branch_code: null;
    swift_code: null;
    validation_library: null;
    status_id: number;
    created_at: string;
    updated_at: string;
  };

  group: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };

  status: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
}

export interface iAccountType {
  id: number;
  name: string;
  description: string;
  is_hidden: number;
  created_at: string;
  updated_at: string;
}

export interface AccountGroup {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface AccountCurrency {
  id: number;
  type: string;
  name: string;
  symbol: string;
  code: string;
  logo: string;
  default: string;
  allow_address_creation: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AccountStatus {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface iAccountOption {
  types: Array<iAccountType>;
  groups: Array<AccountGroup>;
  currencies: Array<AccountCurrency>;
  statuses: Array<AccountStatus>;
}

export interface AccountKycRequirement {
  id: number;
  account_type_id: number;
  kyc_requirement_id: number;
  created_at: string;
  updated_at: string;
  account_type: {
    id: number;
    name: string;
    description: null;
    is_hidden: number;
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

export interface AccountLimit {
  id: number;
  account_no: number;
  account_type_id: number;
  type_id: number;
  direction: string;
  currency_id: number;
  value: string;
  created_at: string;
  updated_at: string;
  type: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  currency: {
    id: number;
    type: string;
    name: string;
    symbol: string;
    code: string;
    logo: string;
    default: string;
    allow_address_creation: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  account_type: {
    id: number;
    name: string;
    description: string;
    is_hidden: number;
    created_at: string;
    updated_at: string;
  };
}

export interface iAccountLimitOption {
  account_types: Array<iAccountType>;
  types: Array<AccountOptionType>;
  currencies: Array<AccountCurrency>;
}

export interface AccountOptionType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface iAccountKycRequirementOption {
  kyc_requirements: Array<iKycRequirement>;
  account_types: Array<iAccountType>;
}
