import { useAuth } from "../lib/auth";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "wouter";
import { Home } from "lucide-react";

export default function Login() {
  const { guestLogin } = useAuth();
  const { toast } = useToast();

  const handleGuestLogin = () => {
    guestLogin();
    toast({
      title: "Welcome Guest",
      description: "You are now logged in as a guest",
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <CardContent className="p-0">
          <div className="text-center space-y-6">
            <div>
              <img 
                src="client\src\components\assets\HockingLogo.png" 
                alt="Hocking College Logo" 
                className="h-20 mx-auto mb-6" 
              />
              <h1 className="text-3xl font-bold text-primary mb-3">Welcome to Hocking College</h1>
              <p className="text-lg text-neutral-dark">Your go-to hub for schedules, tools, maps, and more right at your fingertips</p>
            </div>
            
            <div className="pt-4 space-y-3">
              <Button 
                type="button" 
                onClick={handleGuestLogin}
                className="w-full bg-primary text-white py-3 text-lg rounded-lg font-semibold hover:bg-primary-dark transition shadow-md"
              >
                Enter Campus Portal
              </Button>

              <Link href="/home">
                <Button 
                  type="button" 
                  variant="ghost"
                  className="w-full py-3 text-lg rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
                >
                  <Home className="h-5 w-5" />
                  Go to Home Page
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
