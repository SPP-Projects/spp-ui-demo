import type { iTransaction } from "@/models/transaction";

export interface iInvoice {
  id: number;
  reference: string;
  user_reference: string;
  due_date: string;
  po_number: string;
  currency_code: string;
  bill_to_email: string;
  bill_to_name: string;
  bill_to_address: string;
  sub_total: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  customer_id: string;
  user_id: string;
  status_id: string;
  created_at: string;
  updated_at: string;
  paid: number;
  balance_due: number;
  payments: Array<iInvoicePayment>;
  items: Array<{ InvoiceItem }>;
}

export interface iInvoiceItem {
  id: number;
  invoice_reference: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  created_at: string;
  updated_at: string;
}

export interface iInvoicePayment {
  id: number;
  invoice_reference: string;
  payee_name: null;
  payee_phone: null;
  payee_email: string;
  payee_comment: null;
  amount: number;
  currency_code: string;
  transaction_reference: string;
  created_at: string;
  updated_at: string;
  transaction: iTransaction;
}
