export interface iMoneyRequest {
  id: number;
  reference: string;
  amount: number;
  description: string;
  requester_customer_id: string;
  requester_user_id: string;
  requester_account_no: string;
  giver_customer_id: string;
  giver_user_id: string;
  giver_user_email: string;
  transaction_reference: null;
  status_id: string;
  created_at: string;
  updated_at: string;
  transaction: null;
  status: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
}
