import { ReactNode, useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import Header from "./Header";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useNotificationService } from "@/hooks/use-notification-service";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated, user } = useAuth();
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  // Initialize notification service
  useNotificationService();

  // Force reset mobile menu state on mount
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  // Scroll to top when location changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
    // Also scroll window to top as fallback
    window.scrollTo(0, 0);
  }, [location]);

  // Show loading state while checking authentication
  if (!isAuthenticated || !user) {
    return (
      <div className="flex h-screen items-center justify-center dark:bg-popover">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col dark:bg-popover">
      {/* Desktop Sidebar - absolute on desktop */}
      <div className="hidden md:block md:fixed md:inset-y-0 md:left-0 md:w-64 md:z-50">
        <Sidebar />
      </div>
      
      {/* Main wrapper - offset for sidebar on desktop */}
      <div className="flex flex-col flex-1 min-h-0 md:ml-64">
        {/* Header - fixed height */}
        <Header onMobileMenuChange={setIsMobileMenuOpen} />
        
        {/* Main Content Area - scrollable, with bottom padding for mobile nav */}
        <main 
          ref={mainContentRef} 
          className="flex-1 overflow-y-auto p-4 pb-20 md:pb-4 dark:bg-popover dark:text-gray-300"
        >
          {children}
        </main>
      </div>
      
      {/* Mobile Navigation - fixed at actual bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <MobileNav />
      </div>
    </div>
  );
}
