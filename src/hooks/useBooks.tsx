import { useQuery } from '@tanstack/react-query';
import API from '../api/API';

interface Library {
  id: number;
  name: string;
  address: string;
  phone?: string;
  working_hours?: string;
  description?: string;
  social_media?: {
    telegram?: string;
    instagram?: string;
    facebook?: string;
  };
  google_maps_url?: string;
  image?: string;
}

interface Book {
  id: number;
  name: string;
  author: string;
  publisher?: string;
  isbn?: string;
  quantity_in_library?: number;
  available?: boolean;
  category?: string;
  image?: string;
}

export const useLibraries = () => {
  const { data, error } = useQuery<Library[]>({
    queryKey: ['libraries'],
    queryFn: async () => {
      const response = await API.get<Library[]>('/libraries');
      return response.data;
    },
  });

  return { libraries: data, librariesError: error };
};

export const useBooks = () => {
  const { data, error } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: async () => {
      const response = await API.get<Book[]>('/books');
      return response.data;
    },
  });

  return { books: data, booksError: error };
};
