import { useToast } from "../hooks/use-toast";
import { Card, CardContent } from "../components/ui/card";
import HockingLogo from "../components/assets/HockingLogo.png";
import { Button } from "../components/ui/button";
import { useLocation } from "wouter";
import { useAuth } from "../lib/auth";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Crown, User, Info } from "lucide-react";

export default function Login() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { guestLogin, login } = useAuth();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: ''
  });

  const handleGetStarted = () => {
    localStorage.setItem('hasClickedGetStarted', 'true');
    guestLogin(); // Authenticate as guest user
    toast({
      title: "Welcome",
      description: "Let's get started with your Hocking College experience",
    });
    setLocation("/home");
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(adminCredentials.username, adminCredentials.password);
      toast({
        title: "Admin Login Successful",
        description: "Welcome to the admin dashboard",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid admin credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 min-h-screen">
      <Card className="w-full max-w-md p-8 bg-white/30 rounded-xl shadow-lg border border-white/30 z-10">
        <CardContent className="p-0">
          <div className="text-center space-y-6">
            <div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-white/40 rounded-full blur-xl transform scale-125"></div>
                <img 
                  src={HockingLogo}
                  alt="Hocking College Logo" 
                  className="h-20 mx-auto mb-6 relative z-10" 
                />
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">Welcome to Hocking College</h1>
              <p className="text-base text-white">We serve as a pathway to prosperity, teaching and inspiring all who seek to learn, growing careers and changing lives.</p>
            </div>
            <div className="pt-4 space-y-3">
              <Button 
                type="button" 
                onClick={handleGetStarted}
                className="w-full bg-navy-500/90 text-white py-3 text-lg rounded-xl font-semibold hover:bg-navy-600 transition shadow-md border-2 border-white/30"
              >
                <User className="mr-2 h-6 w-6" />
                Get Started
              </Button>
              
              <Button 
                type="button" 
                onClick={() => setShowAdminLogin(!showAdminLogin)}
                className="w-full bg-white/1 !text-white py-3 text-lg rounded-xl font-semibold hover:bg-white/8 transition border-2 border-white/30"
              >
                <Crown className="mr-2 h-6 w-6 text-white" />
                Login as Admin
              </Button>
              
              <Button 
                type="button" 
                className="w-full bg-navy-500/90 text-white py-3 text-lg rounded-xl font-semibold hover:bg-navy-600 transition shadow-md border-2 border-white/30"
              >
                <Info className="mr-2 h-6 w-6" />
                More about Hocking
              </Button>
            </div>

            {showAdminLogin && (
              <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20">
                <form onSubmit={handleAdminLogin} className="space-y-3">
                  <div>
                    <Label htmlFor="username" className="text-white text-sm">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={adminCredentials.username}
                      onChange={(e) => setAdminCredentials(prev => ({ ...prev, username: e.target.value }))}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      placeholder="Enter username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-white text-sm">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={adminCredentials.password}
                      onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      placeholder="Enter password"
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-blue-600/90 text-white py-2 hover:bg-blue-700 transition"
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Login as Admin
                  </Button>
                </form>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/src/assets/landing page.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
    </div>
  );
}
