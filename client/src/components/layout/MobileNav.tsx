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
    <nav className="md:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex justify-evenly px-2 py-1">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <a className={`flex flex-col items-center py-3 px-2 min-w-0 transition-colors duration-200 rounded-lg ${
              isActive(item.path) 
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}>
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-[10px] font-medium leading-tight text-center truncate w-full">{item.label}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
