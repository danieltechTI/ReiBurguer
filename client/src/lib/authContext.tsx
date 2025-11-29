import { createContext, useContext, useState, useEffect } from "react";
import { apiRequest } from "./queryClient";

interface Customer {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  customer: Customer | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      await apiRequest("GET", "/api/auth/me");
      // If we get here, we're authenticated - just set loading to false
      setIsLoading(false);
    } catch {
      setCustomer(null);
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setIsLoading(true);
    try {
      const data = await apiRequest("POST", "/api/auth/login", { email, password });
      setCustomer(data as Customer);
    } finally {
      setIsLoading(false);
    }
  }

  async function register(email: string, password: string, name: string) {
    setIsLoading(true);
    try {
      const data = await apiRequest("POST", "/api/auth/register", { email, password, name });
      setCustomer(data as Customer);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      setCustomer(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ customer, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
