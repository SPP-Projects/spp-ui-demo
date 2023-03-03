import type { iTransaction } from "@/models/transaction";

export interface iCampaign {
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
  donations: iDonations;
  image_url: string;
  is_private: boolean;
}

export interface iDonations {
  current_page: number;
  data: Array<iCampaignDonation>;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  //links: Link[];
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface iCampaignDonation {
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
  transaction: iTransaction;
}
