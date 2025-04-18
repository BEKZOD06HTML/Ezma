import { useQuery } from "@tanstack/react-query";
import API from "../api/API";

export const useGetLibrary = () => {
  const fetchLibraries = async () => {
    const response = await API.get("/libraries/libraries/");
    return response.data;
  };

  const {
    data: library,
    error: libraryError,
    isLoading: libraryLoading,
  } = useQuery({
    queryKey: ["library"],
    queryFn: fetchLibraries,
    staleTime: 5 * 60 * 1000, 
  });

  return { library, libraryError, libraryLoading };
};

export const useGetLibraryDetail = (libraryId: string) => {
  const fetchLibraryDetail = async () => {
    if (!libraryId) throw new Error("Library ID is required");

    const response = await API.get(`/libraries/library/${libraryId}`);
    return response.data;
  };

  const {
    data: libraryDetail,
    error: libraryDetailError,
    isLoading: libraryDetailLoading,
  } = useQuery({
    queryKey: ["libraryDetail", libraryId],
    queryFn: fetchLibraryDetail,
    enabled: !!libraryId,
    staleTime: 5 * 60 * 1000, 
  });

  return { libraryDetail, libraryDetailError, libraryDetailLoading };
};
