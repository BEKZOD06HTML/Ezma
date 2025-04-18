import API from "../api/API";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useStore } from "./useStore";
import { LoginData, RegisterData } from "../types/Authtypes";

const login = async ({ phone, password }: LoginData) => {
  const response = await API.post("/auth/login/", { phone, password });
  if (![200, 201].includes(response.status)) {
    throw new Error("Loginga kirdi");
  }
  return response.data;
};

const registerLibrary = async (data: RegisterData) => {
  const response = await API.post("/auth/register-library/", data);
  if (![200, 201].includes(response.status)) {
    throw new Error("ishladi");
  }
  return response.data;
};

const fetchUserProfile = async (token: string) => {
  const response = await API.get("/auth/profile/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
const useAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      if (!data?.access) {
        message.error("login error");
        return;
      }

      localStorage.setItem("token", data.access);

      try {
        const user = await fetchUserProfile(data.access);
        setUser(user);
        navigate("/");
        message.success("success");
      } catch {
        message.error("error");
      }
    },
    onError: (error: any) => {
      const status = error?.response?.status;

      if (status === 400) {
        message.error("login error");
      } else if (status === 403) {
        message.warning("error");
      } else {
        message.error("error");
      }

      console.error("Login xatosi:", error);
    },
  });

  const registerLibraryMutation = useMutation({
    mutationFn: registerLibrary,
    onSuccess: (data) => {
      if (data?.user) {
        setUser(data.user);
      }

      message.success("success");
      navigate("/library");
    },
    onError: (error: any) => {
      const status = error?.response?.status;

      if (status === 400) {
        message.error("error");
      } else if (status === 409) {
        message.error("error");
      } else {
        message.error("error");
      }

      console.error("error:", error);
    },
  });

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
    message.info("success");
  };
  const useUserProfile = () => {
    const token = localStorage.getItem("token");
    return useQuery({
      queryKey: ["userProfile"],
      queryFn: () => fetchUserProfile(token || ""),
      enabled: !!token,
      staleTime: 5 * 60 * 1000, 
      retry: 1,
    });
  };
  return {
    loginMutation,
    registerLibraryMutation,
    logout,
    useUserProfile,
  };
};

export default useAuth;
