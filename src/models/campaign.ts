import type { Transaction } from "@/models/transaction";

export interface Campaign {
  id: number;
  reference: string;
  title: string;
  description: string;
  currency_code: string;
  goal: number;
  image: string;
  youtube_url: string;
  status_id: string;
  customer_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  donated: number;
  amount_to_goal: number;
  donations: Array<CampaignDonation>;
}

export interface CampaignDonation {
  id: number;
  campaign_reference: string;
  donor_name: null;
  donor_phone: null;
  donor_email: string;
  donor_comment: null;
  is_anonymous: number;
  amount: number;
  currency_code: string;
  transaction_reference: string;
  created_at: string;
  updated_at: string;
  transaction: Transaction;
}
