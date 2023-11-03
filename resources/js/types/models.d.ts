/**
 * This file is auto generated using 'php artisan typescript:generate'
 *
 * Changes to this file will be lost when the command is run again
 */

declare namespace App.Models {
    export interface Landing {
        id: number;
        created_at: string | null;
        updated_at: string | null;
        name: string;
        created_by: number;
        user?: App.Models.User | null;
        landing_settings?: App.Models.LandingSettings | null;
        global_product?: App.Models.GlobalProduct | null;
        advantage?: Array<App.Models.Advantage> | null;
        products?: Array<App.Models.Product> | null;
        advantage_count?: number | null;
        products_count?: number | null;
    }

    export interface User {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        password: string;
        remember_token: string | null;
        created_at: string | null;
        updated_at: string | null;
        landings?: Array<App.Models.Landing> | null;
        landings_count?: number | null;
    }

    export interface Product {
        id: number;
        landing_id: number;
        name: string;
        article: string;
        created_at: string | null;
        updated_at: string | null;
        landing?: App.Models.Landing | null;
        product_data?: App.Models.ProductData | null;
    }

    export interface LandingTemplate {
        id: number;
        name: string;
        created_at: string | null;
        updated_at: string | null;
        title: string;
    }

    export interface ProductData {
        id: number;
        product_id: number;
        sizes: string | null;
        price: number | null;
        discount: number | null;
        rest: number | null;
        created_at: string | null;
        updated_at: string | null;
        product?: App.Models.Landing | null;
    }

    export interface Advantage {
        id: number;
        landing_id: number;
        img_name: string;
        caption: string;
        created_at: string | null;
        updated_at: string | null;
        landing?: App.Models.Landing | null;
    }

    export interface ProductImage {
        id: number;
        product_id: number;
        img_name: string;
        created_at: string | null;
        updated_at: string | null;
    }

    export interface LandingSettings {
        id: number;
        landing_id: number;
        meta_title: string | null;
        meta_description: string | null;
        is_pub: boolean;
        fb_pixel_key: string | null;
        telegram_chat_id: string | null;
        crm_api_key: string | null;
        telegram_token: string | null;
        created_at: string | null;
        updated_at: string | null;
        template_id: number;
        landing?: App.Models.Landing | null;
    }

    export interface GlobalProduct {
        id: number;
        landing_id: number;
        sizes: string | null;
        price: number | null;
        discount: number | null;
        rest: number | null;
        drop_price: number | null;
        created_at: string | null;
        updated_at: string | null;
        landing?: App.Models.Landing | null;
    }

}
