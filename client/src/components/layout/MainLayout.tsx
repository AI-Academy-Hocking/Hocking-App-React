import React from 'react';
import { useLocation } from 'wouter';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useAuth } from '@/lib/auth';
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import Header from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="py-8">
          <TransitionGroup component={null}>
            <CSSTransition
              key={location}
              timeout={300}
              classNames="page"
              unmountOnExit
            >
              <div className="page">
                <div className="flex h-screen">
                  {/* Desktop Sidebar */}
                  <Sidebar />
                  
                  {/* Main Content */}
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <Header />
                    
                    {/* Main Content Area */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                      {children}
                    </main>
                    
                    {/* Mobile Navigation */}
                    <MobileNav />
                  </div>
                </div>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
