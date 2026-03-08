import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface AdminUser {
  id: string;
  email: string;
  name: string;
}

interface AdminContextType {
  admin: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isConfigured: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isConfigured = isSupabaseConfigured();

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setAdmin({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || 'Admin',
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAdmin({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || 'Admin',
        });
      } else {
        setAdmin(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [isConfigured]);

  const login = async (email: string, password: string) => {
    if (!isConfigured) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      setAdmin({
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.name || 'Admin',
      });
    }
  };

  const logout = async () => {
    if (!isConfigured) return;
    
    await supabase.auth.signOut();
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, loading, login, logout, isConfigured }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}
