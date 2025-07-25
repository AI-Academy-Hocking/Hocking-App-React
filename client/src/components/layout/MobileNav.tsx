import { useLocation, Link } from "wouter";
import { Home, CalendarDays, Wrench, Map, UtensilsCrossed, Shield, Bus } from "lucide-react";

export default function MobileNav() {
  


  const navItems = [
    { path: "/home", label: "Home", icon: Home },
    { path: "/calendar", label: "Calendar", icon: CalendarDays },
    { path: "/tools", label: "Student Tools", icon: Wrench },
    { path: "/maps", label: "Maps", icon: Map },
    { path: "/resources", label: "Resources", icon: GraduationCap },
    { path: "/dining", label: "Dining", icon: UtensilsCrossed },
    { path: "/safety", label: "Safety", icon: Shield },
    { path: "/transportation", label: "Transportation", icon: Bus },
  ];

  return (
    <nav className="md:hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <a className="flex flex-col items-center py-2 px-1 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
