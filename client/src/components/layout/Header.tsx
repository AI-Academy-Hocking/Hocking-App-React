import { useState, useEffect } from "react";
import { Menu, Moon, Sun, LogOut, Home, Calendar, Wrench, Map, UtensilsCrossed, Shield, Bell, X, MessageSquare, AlertTriangle, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useAuth } from "../../lib/auth";
import { Link, useLocation } from "wouter";
import HawkLogo from "../../assets/HawkLogo.png";
import { SearchBar } from "@/components/SearchBar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";

const navItems = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/calendar", label: "Calendar", icon: Calendar },
  { path: "/tools", label: "Student Tools", icon: Wrench },
  { path: "/maps", label: "Maps & Directions", icon: Map },
  { path: "/dining", label: "Dining Hall", icon: UtensilsCrossed },
  { path: "/safety", label: "Campus Safety", icon: Shield },
];

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'social' | 'calendar' | 'general' | 'alert';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export default function Header() {
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const [location, setLocation] = useLocation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const isActive = (path: string) => location === path;

  // Load notifications from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const notificationsWithDates = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
        setNotifications(notificationsWithDates);
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
  }, []);

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // @ts-ignore
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    setIsNotificationOpen(false);
    if (notification.actionUrl) {
      setLocation(notification.actionUrl);
    }
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setDarkMode(isDark);
  };

  // Add some sample notifications for testing
  const addSampleNotification = () => {
    addNotification({
      title: "New Social Post",
      message: "Someone posted in the Campus Social Hub",
      type: "social",
      actionUrl: "/housing/social",
      actionLabel: "View Post"
    });
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
              
              {/* Mobile Search Bar */}
              <div className="p-4 border-b border-gray-700">
                <SearchBar className="w-full" placeholder="Search..." />
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
        {/* Compact SearchBar */}
        <div className="flex items-center gap-2">
          {/* Desktop SearchBar */}
          <div className="hidden md:block">
            <SearchBar className="w-48" placeholder="Search..." />
          </div>
          
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2 rounded-full bg-white/20 hover:bg-white/40 transition text-yellow-400"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu with search"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Notification Bell */}
          <DropdownMenu open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative p-2 rounded-full bg-white/20 hover:bg-white/40 transition text-yellow-400"
                aria-label="Notifications"
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 border-2 border-blue-600"
            >
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`p-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className="flex-shrink-0 mt-1">
                          {notification.type === 'social' && <MessageSquare className="h-4 w-4 text-blue-600" />}
                          {notification.type === 'calendar' && <Calendar className="h-4 w-4 text-green-600" />}
                          {notification.type === 'alert' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                          {notification.type === 'general' && <Bell className="h-4 w-4 text-gray-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${!notification.read ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'}`}>
                              {notification.title}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className="text-gray-400 hover:text-red-500 transition"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {notification.timestamp.toLocaleString()}
                          </p>
                          {notification.actionLabel && (
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                              Click to {notification.actionLabel.toLowerCase()}
                            </p>
                          )}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              )}
              
              {notifications.length > 0 && (
                <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => {
                      setNotifications([]);
                      setIsNotificationOpen(false);
                    }}
                  >
                    Clear All Notifications
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-full bg-white/20 hover:bg-white/40 transition text-yellow-400"
            aria-label="Toggle light/dark mode"
          >
            {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
          
          {/* Test Button (remove in production) */}
          <button
            onClick={addSampleNotification}
            className="ml-2 p-2 rounded-full bg-white/20 hover:bg-white/40 transition text-yellow-400 text-xs"
            title="Add test notification"
          >
            Test
          </button>
        </div>
      </div>
    </header>
  );
}
