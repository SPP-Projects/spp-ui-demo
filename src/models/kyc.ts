export interface iKycRequirement {
  id: number;
  name: string;
  form_name: string;
  form_type: string;
  form_validation: string;
  group_id: number;
  created_at: string;
  updated_at: string;
  group: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
}

export interface iKycRequirementOption {
  groups: Array<KycRequirementGroup>;
}

export interface KycRequirementGroup {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
