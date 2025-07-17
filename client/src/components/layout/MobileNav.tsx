import { useLocation, Link } from "wouter";
import { 
  Home, 
  LayoutDashboard, 
  CalendarDays, 
  BookOpen, 
  Users, 
  Heart, 
  Briefcase, 
  UserPlus,
  Brain,
  TrendingUp
} from "lucide-react";

export default function MobileNav() {
  const [location] = useLocation();
  
  const isActive = (path: string) => location === path;

  const navItems = [
    { path: "/home", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/ai-study-assistant", label: "AI", icon: Brain },
    { path: "/study-planner", label: "Study", icon: BookOpen },
    { path: "/wellness", label: "Wellness", icon: Heart },
    { path: "/career-hub", label: "Career", icon: Briefcase },
    { path: "/roommate-finder", label: "Roommates", icon: UserPlus },
    { path: "/predictive-analytics", label: "Analytics", icon: TrendingUp },
  ];

  return (
    <nav className="md:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={`flex flex-col items-center py-2 px-1 ${
              isActive(item.path) 
                ? 'text-primary dark:text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
