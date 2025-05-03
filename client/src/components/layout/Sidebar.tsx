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
    <div className="hidden md:flex flex-col w-64 bg-gray-800 text-gray-100 h-full">
      <div className="p-4 border-b border-primary-light bg-blue-500">
        <img 
          src="client\src\components\assets\HockingLogo.png" 
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
                  className={`flex items-center p-2 rounded-lg hover:bg-gray-700 transition ${
                    isActive(item.path) ? 'bg-gray-700' : ''
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
          className="flex items-center text-sm hover:text-gray-300 transition"
        >
          <LogOut className="mr-1 h-4 w-4" />
          <span>Log Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <div className="border border-neutral-200 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-3">Standard Plan</h3>
          <p className="text-neutral-600 mb-4">
            The Standard Plan is perfect for students who live on campus and want access to meals throughout the week.
          </p>
          <ul className="space-y-1 text-neutral-600">
            <li>Unlimited meals</li>
            <li>$100 dining dollars</li>
            <li>Cost: $1,200 per semester</li>
          </ul>
        </div>

        <div className="border border-neutral-200 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-3">Premium Plan</h3>
          <p className="text-neutral-600 mb-4">
            The Premium Plan offers additional dining dollars for students who want more flexibility.
          </p>
          <ul className="space-y-1 text-neutral-600">
            <li>Unlimited meals</li>
            <li>$200 dining dollars</li>
            <li>Cost: $1,500 per semester</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
