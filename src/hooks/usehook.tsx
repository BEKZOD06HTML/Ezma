import { useQuery } from "@tanstack/react-query";
import API from "../api/API";

export const useSearch = <T = any>(query: string) => {
  const enabled = query.trim().length > 0;
  const { data, error, isLoading, isError } = useQuery<T>({
    queryKey: ["search", query], 
    queryFn: () => API.get(`books/search/book/?q=${query}`).then((res) => res.data), 
    enabled, 
    retry: 1, 
    staleTime: 5 * 60 * 1000,
  });

  return { data, error, isLoading, isError };
};
