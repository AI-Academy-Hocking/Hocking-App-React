import { useLocation, Link } from "wouter";
import { useAuth } from "../../lib/auth";
import { Home, CalendarDays, Wrench, Map, LogOut, UtensilsCrossed, MessageSquare, Shield } from "lucide-react";
import HockingLogo from "../../assets/HawkLogo.png";
import { LucideIcon } from "lucide-react";

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

export default function Sidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location === path;

  const navItems: NavItem[] = [
    { path: "/home", label: "Home", icon: Home },
    { path: "/calendar", label: "Calendar", icon: CalendarDays },
    { path: "/tools", label: "Student Tools", icon: Wrench },
    { path: "/maps", label: "Maps & Directions", icon: Map },
    { path: "/dining", label: "Dining Hall", icon: UtensilsCrossed },
    { path: "/safety", label: "Campus Safety", icon: Shield },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 text-white h-full shadow-lg">
      <div className="p-4 border-b border-slate-700 bg-blue-600">
        <img 
          src={HockingLogo} 
          alt="Hocking College Logo" 
          className="h-12" 
        />
      </div>
      
      <nav className="flex-1 overflow-y-auto no-scrollbar p-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link 
                href={item.path}
                className={`flex items-center p-2 rounded-lg hover:bg-slate-800 transition ${
                  isActive(item.path) ? 'bg-slate-700 text-white' : 'text-white'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${
                  isActive(item.path) ? 'text-white' : 'text-blue-300'
                }`} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-700 bg-slate-800">
        <button 
          onClick={logout} 
          className="flex items-center text-sm text-white hover:text-blue-200 transition"
        >
          <LogOut className="mr-1 h-4 w-4 text-white" />
          <span>Return To Welcome Page</span>
        </button>
      </div>
    </div>
  );
}
