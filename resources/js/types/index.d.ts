export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface FlashProps {
    success: string | null;
    error: string | null;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    flash: FlashProps;
};

// export interface LandingSettings {
//     crm_api_key: string,
//     fb_pixel_key: string,
//     is_pub: boolean,
//     meta_description: string,
//     meta_title: string,
//     telegram_chat_id: string,
//     telegram_token: string,
// }

// export interface Landing {
//     id: number,
//     name: string,
//     created_at: string,   
// }

// export interface LandingFull extends Landing {
//     landing_settings: LandingSettings, 
// }

// export interface Theme {
//     name: string
// }