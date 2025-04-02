import { useLocation, Link } from "wouter";
import { Home, CalendarDays, Wrench, Map, UtensilsCrossed, MessageSquare, Shield } from "lucide-react";

export default function MobileNav() {
  const [location] = useLocation();
  
  const isActive = (path: string) => location === path;

  const navItems = [
    { path: "/home", label: "Home", icon: Home },
    { path: "/calendar", label: "Calendar", icon: CalendarDays },
    { path: "/tools", label: "Student Tools", icon: Wrench },
    { path: "/maps", label: "Maps", icon: Map },
    { path: "/dining", label: "Dining", icon: UtensilsCrossed },
    { path: "/discussions", label: "Discuss", icon: MessageSquare },
    { path: "/safety", label: "Safety", icon: Shield },
  ];

  return (
    <nav className="md:hidden bg-white border-t border-neutral-light">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <a className={`flex flex-col items-center py-2 ${
              isActive(item.path) ? 'text-primary' : 'text-neutral-dark'
            }`}>
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
