import { useLocation, Link } from "wouter";
import { 
  Home, 
  CalendarDays, 
  Wrench, 
  Map,
  UtensilsCrossed,
  Shield,
  Bus
} from "lucide-react";

export default function MobileNav() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  const navItems = [
    // Main Navigation
    { path: "/home", label: "Home", icon: Home },
    { path: "/calendar", label: "Calendar", icon: CalendarDays },
    { path: "/tools", label: "Tools", icon: Wrench },
    
    // Campus Services
    { path: "/maps", label: "Maps", icon: Map },
    { path: "/dining", label: "Dining", icon: UtensilsCrossed },
    { path: "/safety", label: "Safety", icon: Shield },
    { path: "/transportation", label: "Transport", icon: Bus },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex justify-evenly px-1 py-1.5">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <a className={`flex flex-col items-center py-1.5 px-1.5 min-w-0 transition-colors duration-200 rounded-lg ${
              isActive(item.path) 
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}>
              <item.icon className="h-5 w-5 mb-0.5" />
              <span className="text-[9px] font-medium leading-tight text-center truncate w-full">{item.label}</span>
            </a>
          </Link>
        ))}
      </div>
      {/* Safe area padding for devices with home indicator */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
