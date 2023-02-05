export interface iPaymentValidationResponse {
  status: string;
  message: string;
  transaction: {
    headers: {};
    original: {
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
      charge: {
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
    };
    exception: null;
  };
}
