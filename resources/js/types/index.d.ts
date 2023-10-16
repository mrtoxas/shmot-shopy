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

export interface Landing {
    id: number,
    name: string,
    created_at: string,
}

export interface Theme {
    name: string
}