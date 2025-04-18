export type Library = {
    id: number;
    name: string;
    image: string | null;
    address: string;
    total_books: number;
    is_active: boolean;
};

export interface BookCardProps {
    id: number;
    name: string;
    author: string;
    publisher: string;
    quantity_in_library: number;
    image?: string;
    loading?: boolean;
}