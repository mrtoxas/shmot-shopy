/**
 * This file is auto generated using 'php artisan typescript:generate'
 *
 * Changes to this file will be lost when the command is run again
 */

declare namespace App.Models {
    export interface Advantage {
        id: number;
        landing_id: number;
        img_name: string;
        caption: string;
        created_at: string | null;
        updated_at: string | null;
        landing?: App.Models.Landing | null;
    }

    export interface GlobalProduct {
        id: number;
        landing_id: number;
        sizes: string | null;
        price: number | null;
        discount: number | null;
        discounted_price: number | null;
        description: number | null;
        rest: number | null;
        created_at: string | null;
        updated_at: string | null;
        landing?: App.Models.Landing | null;
    }

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

    export interface LandingSettings {
        id: number;
        landing_id: number;
        meta_title: string | null;
        meta_description: string | null;
        is_pub: boolean;
        use_global_product: boolean;
        fb_pixel_key: string | null;
        telegram_chat_id: string | null;
        crm_api_key: string | null;
        telegram_token: string | null;
        template_name: string;
        template_settings: Array<any> | any | null;
        created_at: string | null;
        updated_at: string | null;
        landing?: App.Models.Landing | null;
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
        product_images?: Array<App.Models.ProductImage> | null;
        product_features?: Array<App.Models.ProductFeature> | null;
        product_variants?: Array<App.Models.ProductVariant> | null;
        product_images_count?: number | null;
        product_features_count?: number | null;
        product_variants_count?: number | null;
    }

    export interface ProductData {
        id: number;
        product_id: number;
        sizes: string | null;
        price: number | null;
        discount: number | null;
        discounted_price: number | null;
        rest: number | null;
        created_at: string | null;
        updated_at: string | null;
        product?: App.Models.Product | null;
    }

    export interface ProductFeature {
        id: number;
        product_id: number;
        name: string;
        value: string;
        created_at: string | null;
        updated_at: string | null;
        product?: App.Models.Product | null;
    }

    export interface ProductImage {
        id: number;
        product_id: number;
        img_name: string;
        created_at: string | null;
        updated_at: string | null;
        product?: App.Models.Product | null;
    }

    export interface ProductVariant {
        id: number;
        product_id: number;
        name: string;
        value: string;
        created_at: string | null;
        updated_at: string | null;
        product?: App.Models.Product | null;
    }

    export interface User {
        id: number;
        name: string;
        role: string;
        email: string;
        email_verified_at: string | null;
        password: string;
        remember_token: string | null;
        created_at: string | null;
        updated_at: string | null;
        landings?: Array<App.Models.Landing> | null;
        landings_count?: number | null;
    }

}
