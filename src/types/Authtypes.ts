export interface LoginData {
    phone: string;
    password: string;
} 

export interface RegisterData {
    user: {
        password: string;
        name: string;
        phone: string;
    };
    library: {
        address: string;
        social_media: Record<string, string>;
        can_rent_books: boolean;
        latitude: string;
        longitude: string;
    };
}