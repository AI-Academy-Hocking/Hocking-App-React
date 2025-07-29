import { useLocation, Link } from "wouter";
import { 
  Home, 
  CalendarDays, 
  Wrench, 
  Calendar,
  Map,
  UtensilsCrossed,
  Shield
} from "lucide-react";

export default function MobileNav() {
  const [location] = useLocation();
  
  const isActive = (path: string) => location === path;

  const navItems = [
    // Main Navigation
    { path: "/home", label: "Home", icon: Home },
    { path: "/calendar", label: "Calendar", icon: CalendarDays },
    { path: "/tools", label: "Tools", icon: Wrench },
    
    // Campus Services
    { path: "/events", label: "Events", icon: Calendar },
    { path: "/maps", label: "Maps", icon: Map },
    { path: "/dining", label: "Dining", icon: UtensilsCrossed },
    { path: "/safety", label: "Safety", icon: Shield },
  ];

  return (
    <nav className="md:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around flex-wrap">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={`flex flex-col items-center py-2 px-1 min-w-[60px] ${
              isActive(item.path) 
                ? 'text-primary dark:text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1 text-center">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
