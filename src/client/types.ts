export interface PhoneNumber {
  id: string;
  display_phone_number: string;
  code_verification_status: string;
  quality_rating: string;
}

export interface BusinessAccount {
  id: string;
  name: string;
  phone_number_id: string;
  vertical: string;
  category: string;
  website: string;
  description: string;
  address: string;
  message_template_namespace: string;
}

export interface BusinessPhoneNumber extends PhoneNumber {
  is_on_biz_app: boolean;
}
