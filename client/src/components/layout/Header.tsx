import * as React from "react";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useAuth } from "../../lib/auth";
import { Link } from "wouter";
import HawkLogo from "../../assets/HawkLogo.png";

export default function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-900 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden p-1 text-yellow-400 hover:bg-yellow-100 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_100%)]"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-primary text-white border-none w-64 p-0 z-[2000]"
            >
              <div className="p-4 border-b border-primary-light">
                <img 
                  src={HawkLogo} 
                  alt="Hocking College Logo" 
                  className="h-8 w-auto object-contain" 
                />
              </div>
              
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <Link href="/home" className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition text-blue-800">
                      <span className="material-icons mr-3">home</span>
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/calendar" className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition text-blue-800">
                      <span className="material-icons mr-3">calendar_today</span>
                      <span>Calendar</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools" className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition text-blue-800">
                      <span className="material-icons mr-3">build</span>
                      <span>Student Tools</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/maps" className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition text-blue-800">
                      <span className="material-icons mr-3">map</span>
                      <span>Maps & Directions</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              
              <div className="p-4 mt-auto border-t border-gray-200">
                <button 
                  onClick={logout} 
                  className="flex items-center text-sm hover:text-gray-600 transition text-blue-800"
                >
                  <span className="material-icons mr-1 text-sm">logout</span>
                  <span>Log Out</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>
          <img 
            src={HawkLogo} 
            alt="Hocking College Logo" 
            className="h-8 w-auto object-contain" 
          />
          <h1 className="text-xl font-heading font-bold text-yellow-400 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_100%)]">
            Hocking College
          </h1>
        </div>
      </div>
    </header>
  );
}
