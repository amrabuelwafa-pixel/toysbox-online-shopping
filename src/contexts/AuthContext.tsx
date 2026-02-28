import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
}

interface Order {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  shippingInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
    address: string;
    city: string;
    governorate: string;
  };
  paymentMethod: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "userId" | "createdAt">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("toybox_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Load user's orders
      const savedOrders = localStorage.getItem(`toybox_orders_${userData.id}`);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    }
  }, []);

  // Save orders when they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`toybox_orders_${user.id}`, JSON.stringify(orders));
    }
  }, [orders, user]);

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem("toybox_users") || "[]");
      const userExists = existingUsers.find((u: any) => u.email === email);
      
      if (userExists) {
        return false; // User already exists
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date().toISOString(),
      };

      // Save password separately (in real app, this would be hashed on backend)
      const userWithPassword = { ...newUser, password };
      existingUsers.push(userWithPassword);
      localStorage.setItem("toybox_users", JSON.stringify(existingUsers));

      // Set current user
      setUser(newUser);
      localStorage.setItem("toybox_user", JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem("toybox_users") || "[]");
      const foundUser = existingUsers.find(
        (u: any) => u.email === email && u.password === password
      );

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("toybox_user", JSON.stringify(userWithoutPassword));
        
        // Load user's orders
        const savedOrders = localStorage.getItem(`toybox_orders_${foundUser.id}`);
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem("toybox_user");
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("toybox_user", JSON.stringify(updatedUser));
      
      // Update in users list
      const existingUsers = JSON.parse(localStorage.getItem("toybox_users") || "[]");
      const updatedUsers = existingUsers.map((u: any) =>
        u.id === user.id ? { ...u, ...data } : u
      );
      localStorage.setItem("toybox_users", JSON.stringify(updatedUsers));
    }
  };

  const addOrder = (orderData: Omit<Order, "id" | "userId" | "createdAt">) => {
    if (user) {
      const newOrder: Order = {
        ...orderData,
        id: Date.now().toString(),
        userId: user.id,
        createdAt: new Date().toISOString(),
      };
      
      setOrders((prev) => [newOrder, ...prev]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
        orders,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
