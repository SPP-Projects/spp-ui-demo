import type { Institution } from "@/models/institution";

export interface PaymentMethod {
  id: number;
  name: string;
  status: string;
  logo: null;
  rate: number;
  charge: number;
  namespace: string;
  currency_name: null;
  is_auto: number;
  image_accept: number;
  test_mode: number;
  customer_status: number;
  global_status: number;
  fraud_checker: number;
  phone_required: number;
  data: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentOption {
  institutions: Array<Institution>;
  payment_methods: Array<PaymentMethod>;
}
