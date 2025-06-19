import { useState } from "react";
import { Menu, Moon, Sun, LogOut, Home, Calendar, Wrench, Map, UtensilsCrossed, Shield } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useAuth } from "../../lib/auth";
import { Link, useLocation } from "wouter";
import HawkLogo from "../../assets/HawkLogo.png";

const navItems = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/calendar", label: "Calendar", icon: Calendar },
  { path: "/tools", label: "Student Tools", icon: Wrench },
  { path: "/maps", label: "Maps & Directions", icon: Map },
  { path: "/dining", label: "Dining Hall", icon: UtensilsCrossed },
  { path: "/safety", label: "Campus Safety", icon: Shield },
];

export default function Header() {
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setDarkMode(isDark);
  };

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
              className="border-none w-64 p-0 z-[2000] flex flex-col h-full bg-gray-800"
            >
              <div className="p-4 border-b-2 border-white bg-blue-500">
                <img 
                  src={HawkLogo} 
                  alt="Hocking College Logo" 
                  className="h-8 w-auto object-contain" 
                />
              </div>
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link 
                        href={item.path}
                        className={`flex items-center p-2 rounded-lg hover:bg-gray-700 transition text-[#00b86b] ${
                          isActive(item.path) ? 'bg-gray-700' : ''
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="p-4 border-t border-gray-700">
                <button 
                  onClick={logout} 
                  className="flex items-center text-sm text-white hover:text-gray-300 transition w-full"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Return To Welcome Page</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>
          <img 
            src={HawkLogo} 
            alt="Hocking College Logo" 
            className="h-8 w-auto object-contain" 
          />
          <h1 className="text-xl font-bold text-yellow-400 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_100%)]">
            Hocking College
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-full bg-white/20 hover:bg-white/40 transition text-yellow-400"
          aria-label="Toggle light/dark mode"
        >
          {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </button>
      </div>
    </header>
  );
}
