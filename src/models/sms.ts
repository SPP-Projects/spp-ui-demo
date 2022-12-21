import type { iTransaction } from "@/models/transaction";
import type { iUser } from "@/models/user";

export interface SenderID {
  id: number;
  text: string;
  customer_id: number;
  status_id: number;
  created_at: string;
  updated_at: string;

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
}

export interface iSmsReport {
  id: number;
  customer_id: number;
  user_id: null;
  transaction_reference: null;
  content: string;
  from: string;
  to: string;
  response: string;
  status_id: number;
  status_message: string;
  created_at: string;
  updated_at: string;
  transaction: iTransaction | any;
  user: iUser | any;
}
