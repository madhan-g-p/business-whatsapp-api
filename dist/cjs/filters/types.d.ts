export interface FilterTypeMessageFilter {
    from?: string;
    to?: string;
    since?: string;
    before?: string;
    limit?: number;
    fields?: string[];
}
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
}[Keys];
interface BaseFilterOperator {
    AND?: FilterTypeMessageFilter[];
    OR?: FilterTypeMessageFilter[];
    NOT?: FilterTypeMessageFilter;
}
export type FilterOperator = RequireAtLeastOne<BaseFilterOperator>;
export interface BaseUpdate {
    id: string;
    timestamp: string;
    raw: any;
}
export interface FilterMessage extends BaseUpdate {
    type: 'text' | 'image' | 'document' | 'audio' | 'video' | 'location' | 'interactive';
    from: string;
    to: string;
    messaging_product: 'whatsapp';
    [key: string]: any;
}
export interface Callback extends BaseUpdate {
    type: 'callback';
    from: string;
    to: string;
    messaging_product: 'whatsapp';
    [key: string]: any;
}
export interface SystemUpdate extends BaseUpdate {
    type: 'system';
    system: {
        type: 'customer_changed_number' | 'customer_changed_identity';
        [key: string]: any;
    };
}
export interface PhoneNumberChange extends BaseUpdate {
    type: 'phone_number_change';
    old_wa_id: string;
    new_wa_id: string;
}
export interface IdentityChange extends BaseUpdate {
    type: 'identity_change';
    wa_id: string;
}
export interface StatusUpdate extends BaseUpdate {
    type: 'status';
    status: {
        id: string;
        status: 'sent' | 'delivered' | 'read' | 'failed';
        timestamp: string;
        [key: string]: any;
    };
}
export interface ChatOpened extends BaseUpdate {
    type: 'chat_opened';
    from: string;
    metadata: {
        display_name: string;
    };
}
export interface UserPreferences extends BaseUpdate {
    type: 'user_preferences';
    preferences: {
        marketing: {
            opt_in: boolean;
            source: string;
        };
    };
}
export interface Call extends BaseUpdate {
    type: 'call';
    call: {
        id: string;
        direction: 'inbound' | 'outbound';
        status: 'initiated' | 'ringing' | 'in_progress' | 'completed' | 'failed';
        timestamp: string;
        duration?: number;
        from?: string;
        to?: string;
    };
}
export type Update = FilterMessage | Callback | SystemUpdate | PhoneNumberChange | IdentityChange | StatusUpdate | ChatOpened | UserPreferences | Call;
export {};
