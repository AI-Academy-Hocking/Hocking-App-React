import { useLocation, Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { Home, Dumbbell, CalendarDays, Wrench, Map, LogOut, UtensilsCrossed, MessageSquare, Shield } from "lucide-react";
import HockingLogo from "../assets/HockingLogo.png";
export default function Sidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location === path;

  const navItems = [
    { path: "/home", label: "Home", icon: Home },
    { path: "/calendar", label: "Calendar", icon: CalendarDays },
    { path: "/tools", label: "Student Tools", icon: Wrench },
    { path: "/maps", label: "Maps & Directions", icon: Map },
    { path: "/dining", label: "Dining Hall", icon: UtensilsCrossed },
    { path: "/discussions", label: "Discussions", icon: MessageSquare },
    { path: "/safety", label: "Campus Safety", icon: Shield },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-primary text-white h-full">
      <div className="p-4 border-b border-primary-light">
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
              <Link href={item.path}>
                <a 
                  className={`flex items-center p-2 rounded-lg hover:bg-primary-light transition ${
                    isActive(item.path) ? 'bg-primary-light' : ''
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-primary-light">
        <button 
          onClick={logout} 
          className="flex items-center text-sm hover:text-neutral-light transition"
        >
          <LogOut className="mr-1 h-4 w-4" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
