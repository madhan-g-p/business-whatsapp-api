import { BaseUpdate, WabaId } from './base';
export interface SystemUpdate extends BaseUpdate, WabaId {
    type: 'system';
    system: {
        type: 'customer_changed_number' | 'customer_changed_identity';
        [key: string]: any;
    };
}
export interface PhoneNumberChange extends BaseUpdate, WabaId {
    type: 'phone_number_change';
    old_wa_id: string;
    new_wa_id: string;
}
export interface IdentityChange extends BaseUpdate, WabaId {
    type: 'identity_change';
    wa_id: string;
}
