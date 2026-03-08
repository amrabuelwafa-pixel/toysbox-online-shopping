import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { CartProvider } from "@/contexts/CartContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileNav } from "@/components/MobileNav";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import ReturnPolicy from "./pages/ReturnPolicy";
import Checkout from "./pages/Checkout";
import Recommendations from "./pages/Recommendations";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import ProductForm from "./pages/admin/ProductForm";
import OrderManagement from "./pages/admin/OrderManagement";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is authenticated (for private deployment)
    const auth = sessionStorage.getItem('toybox_auth');
    const authTime = sessionStorage.getItem('toybox_auth_time');
    
    if (auth === 'true' && authTime) {
      // Check if session is still valid (24 hours)
      const timeElapsed = Date.now() - parseInt(authTime);
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      if (timeElapsed < twentyFourHours) {
        setIsAuthenticated(true);
      } else {
        // Session expired, redirect to auth
        sessionStorage.removeItem('toybox_auth');
        sessionStorage.removeItem('toybox_auth_time');
        window.location.href = '/auth.html';
      }
    } else {
      // Not authenticated, redirect to auth page
      window.location.href = '/auth.html';
    }
    
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #9b87f5 0%, #d946ef 100%)',
        color: 'white',
        fontSize: '20px',
        fontFamily: 'system-ui'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LanguageProvider>
            <AuthProvider>
              <AdminProvider>
                <CartProvider>
                  <Routes>
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/products" element={<ProductManagement />} />
                    <Route path="/admin/products/new" element={<ProductForm />} />
                    <Route path="/admin/products/edit/:id" element={<ProductForm />} />
                    <Route path="/admin/orders" element={<OrderManagement />} />

                    {/* Customer Routes */}
                    <Route path="/*" element={
                      <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-1 pb-20 md:pb-0">
                          <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/recommendations" element={<Recommendations />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/return-policy" element={<ReturnPolicy />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </main>
                        <Footer />
                        <MobileNav />
                        <CartDrawer />
                      </div>
                    } />
                  </Routes>
                </CartProvider>
              </AdminProvider>
            </AuthProvider>
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
