import type { iAccountType } from "@/models/account";
import type { iInstitution } from "@/models/institution";

export interface iRemittance {
  id: number;
  primary: number;
  reference: string;
  currency_code: string;
  external_reference: string;
  narration: string;
  amount: string;
  debit_account_type_id: number;
  debit_account_institution_id: number;
  debit_account_no: string;
  debit_account_name: string;
  debit_account_balance_before: string;
  debit_account_balance_after: string;
  debit_operator_account_no: null;
  debit_operator_account_balance_before: null;
  debit_operator_account_balance_after: null;
  credit_account_type_id: number;
  credit_account_institution_id: number;
  credit_account_no: string;
  credit_account_name: string;
  credit_account_balance_before: string;
  credit_account_balance_after: string;
  credit_operator_account_no: null;
  credit_operator_account_balance_before: null;
  credit_operator_account_balance_after: null;
  debit_status_id: number;
  debit_status_message: string;
  debit_status_updated_at: string;
  credit_status_id: number;
  credit_status_message: string;
  credit_status_updated_at: string;
  type_code: string;
  status_id: number;
  initiator_id: null;
  status_message: string;
  status: string;
  collection_type: null;
  created_at: string;
  updated_at: string;
  type: {
    id: number;
    name: string;
    code: string;
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
  debit_account_type: {
    id: number;
    name: string;
    description: string;
    is_hidden: number;
    created_at: string;
    updated_at: string;
  };
  debit_account_institution: {
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
  credit_account_type: {
    id: number;
    name: string;
    description: string;
    is_hidden: number;
    created_at: string;
    updated_at: string;
  };
  credit_account_institution: {
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
  charge: {
    amount: string;
    id: number;
    reference: string;
    external_reference: string;
    primary: number;
    type_code: string;
    currency: string;
    debit_account_name: string;
    debit_account_no: string;
    debit_account_institution_id: number;
    credit_account_name: string;
    credit_account_no: string;
    credit_account_institution_id: number;
    status: number;
    status_message: string;
    created_at: string;
    updated_at: string;
  };
  tax: {
    id: number;
    reference: string;
    external_reference: string;
    primary: number;
    type_code: string;
    currency: string;
    amount: string;
    debit_account_name: string;
    debit_account_no: string;
    debit_account_institution_id: number;
    credit_account_name: string;
    credit_account_no: string;
    credit_account_institution_id: number;
    status: number;
    status_message: string;
    created_at: string;
    updated_at: string;
  };
}

export interface iValidatedTransaction {
  external_reference: string;
  type_code: string;
  type_name: string;
  debit_currency: string;
  debit_amount: string;
  credit_currency: string;
  credit_amount: string;
  rate: number;
  debit_account_no: string;
  debit_account_name: string;
  debit_account_type_id: number;
  debit_account_type_name: string;
  debit_account_institution_id: number;
  debit_account_institution_name: string;
  credit_account_no: number;
  credit_account_name: string;
  credit_account_type_id: number;
  credit_account_type_name: string;
  credit_account_institution_id: number;
  credit_account_institution_name: string;
  charge_setting: number;
  charge_amount: number;
  charge_account: string;
  taxable_amount: number;
  tax_amount: number;
  tax_account: string;
}

export interface TransactionCharge {
  id: number;
  account_to_charge: string;
  debit_customer_group_id: number;
  debit_account_type_id: number;
  debit_account_currency_id: number;
  debit_account_institution_id: number;
  debit_account_no: string;
  credit_customer_group_id: number;
  credit_account_type_id: number;
  credit_account_currency_id: number;
  credit_account_institution_id: number;
  credit_account_no: string;
  min_limit: number;
  max_limit: number;
  type: string;
  charge: number;
  created_at: string;
  updated_at: string;
  debit_customer_group: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  debit_account_type: {
    id: number;
    name: string;
    description: string;
    is_hidden: number;
    created_at: string;
    updated_at: string;
  };
  debit_account_currency: {
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
  debit_account_institution: {
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
  credit_customer_group: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  credit_account_type: {
    id: number;
    name: string;
    description: string;
    is_hidden: number;
    created_at: string;
    updated_at: string;
  };
  credit_account_currency: {
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
  credit_account_institution: {
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
  commission_settings: [];
}

export interface TransactionCommission {
  id: number;
  charge_setting_id: number;
  direction: null;
  account_type_id: null;
  account_no: string;
  commission_percentage: string;
  min_amount: string;
  order: number;
  created_at: string;
  updated_at: string;
  charge_setting: {
    id: number;
    account_to_charge: string;
    debit_customer_group_id: number;
    debit_account_type_id: number;
    debit_account_currency_id: number;
    debit_account_institution_id: number;
    debit_account_no: "N/A";
    credit_customer_group_id: number;
    credit_account_type_id: number;
    credit_account_currency_id: number;
    credit_account_institution_id: number;
    credit_account_no: string;
    min_limit: number;
    max_limit: number;
    type: string;
    charge: number;
    created_at: string;
    updated_at: string;
  };
}

export interface TransactionType {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionTypeAccountMapping {
  id: number;
  transaction_type_id: number;
  dr_institution_type_id: number;
  dr_account_type_id: number;
  cr_institution_type_id: number;
  cr_account_type_id: number;
  created_at: string;
  updated_at: string;
  transaction_type: {
    id: number;
    name: string;
    code: string;
    created_at: string;
    updated_at: string;
  };
  debit_institution_type: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  debit_account_type: {
    id: number;
    name: string;
    description: string;
    is_hidden: number;
    created_at: string;
    updated_at: string;
  };
  credit_institution_type: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  credit_account_type: {
    id: number;
    name: string;
    description: string;
    is_hidden: number;
    created_at: string;
    updated_at: string;
  };
}

export interface iTransactionChargeSettingOption {
  account_types: Array<iAccountType>;
  institutions: Array<iInstitution>;
  customer_groups: [
    {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
    }
  ];
  currencies: [
    {
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
  ];
}
