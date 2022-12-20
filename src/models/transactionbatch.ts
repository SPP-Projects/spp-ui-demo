export interface TransactionBatch {
  id: number;
  customer_id: string;
  batch_reference: string;
  file_name: string;
  transaction_count: number;
  status_id: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionBatchItems {
  id: number;
  batch_reference: string;
  row_number: string;
  debit_account_institution_code: string;
  debit_account_no: string;
  credit_account_institution_code: string;
  credit_account_no: string;
  amount: string;
  external_reference: string;
  status: string;
  errors: null;
  transaction_id: null;
  created_at: string;
  updated_at: string;
  transaction: null;
}
