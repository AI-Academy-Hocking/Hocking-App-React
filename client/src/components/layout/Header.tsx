import { useState } from "react";
import { Menu, Bell, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Link } from "wouter";
import HawkLogo from "../assets/Hawklogo.png";


export default function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
<header className="bg-yellow-500 text-blue-800 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex-1"></div>

        <div className="flex items-center">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden mr-2 p-1 text-white hover:bg-primary-light"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-primary text-white border-none w-64 p-0"
            >
              <div className="p-4 border-b border-primary-light">
                <img
                  src={HawkLogo}
                  alt="Hocking College Logo"
                  className="h-12"
                />
              </div>

              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <Link href="/home">
                      <a className="flex items-center p-2 rounded-lg hover:bg-primary-light transition">
                        <span className="material-icons mr-3">home</span>
                        <span>Home</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/calendar">
                      <a className="flex items-center p-2 rounded-lg hover:bg-primary-light transition">
                        <span className="material-icons mr-3">
                          calendar_today
                        </span>
                        <span>Calendar</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools">
                      <a className="flex items-center p-2 rounded-lg hover:bg-primary-light transition">
                        <span className="material-icons mr-3">build</span>
                        <span>Student Tools</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/maps">
                      <a className="flex items-center p-2 rounded-lg hover:bg-primary-light transition">
                        <span className="material-icons mr-3">map</span>
                        <span>Maps & Directions</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="p-4 mt-auto border-t border-primary-light">
                <button
                  onClick={logout}
                  className="flex items-center text-sm hover:text-neutral-light transition"
                >
                  <span className="material-icons mr-1 text-sm">logout</span>
                  <span>Log Out</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-heading font-bold text-white outlined-text">
            Hocking College
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="hover:bg-primary-light p-2 rounded-full"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="hover:bg-primary-light p-2 rounded-full"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
