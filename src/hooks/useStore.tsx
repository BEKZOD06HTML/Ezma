import { create } from "zustand";
interface UserDatabase {
  data: {
    id: string;
    created_at: string;
    updated_at: string;
    image: string | null;
    is_active: boolean;
    login: string;
    phone_number: string;
    pin_code: number;
    wallet: string;
  };
  message: string;
  status_code: number;
}

interface StoreState {
  user: UserDatabase | null;
  setUser: (user: UserDatabase | null) => void;
  logout: () => void;
}

const getFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`LocalStorage error [get]: ${key}`, error);
    return defaultValue;
  }
};

const saveToLocalStorage = (key: string, value: unknown) => {
  try {
    if (value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.warn(`LocalStorage error [set/remove]: ${key}`, error);
  }
};

export const useStore = create<StoreState>((set) => ({
  user: getFromLocalStorage<UserDatabase | null>("user", null),

  setUser: (user) =>
    set(() => {
      saveToLocalStorage("user", user);
      return { user };
    }),

  logout: () =>
    set(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { user: null };
    }),
}));
