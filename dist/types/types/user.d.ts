import { BaseUpdate, WabaId } from './base';
export interface UserPreferences extends BaseUpdate, WabaId {
    type: 'user_preferences';
    preferences: {
        marketing: {
            opt_in: boolean;
            source: string;
        };
    };
}
export interface ChatOpened extends BaseUpdate, WabaId {
    type: 'chat_opened';
    from: string;
    metadata: {
        display_name: string;
    };
}
export interface BusinessPhoneNumber {
    id: string;
    display_phone_number: string;
    code_verification_status: string;
    quality_rating: string;
    is_on_biz_app: boolean;
}
