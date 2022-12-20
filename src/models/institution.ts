export interface Institution {
  id: number;
  name: string;
  code: string;
  type_id: number;

  branch_code: null;
  swift_code: null;
  validation_library: string;
  status_id: number;
  created_at: string;
  updated_at: string;
  type: {
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

export interface InstitutionType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface InstitutionPaymentMethod {
  id: number;
  payment_direction: string;
  institution_id: number;
  payment_method_id: number;
  created_at: string;
  updated_at: string;
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
  payment_method: {
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
  };
}
