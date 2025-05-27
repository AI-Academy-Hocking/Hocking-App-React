import { useAuth } from "../lib/auth";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { Card, CardContent } from "../components/ui/card";

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
                src="client\src\components\assets\Hocking_logo_Full_Color_RGB.webp" 
                alt="Hocking College Logo" 
                className="h-20 mx-auto mb-6" 
              />
              <h1 className="text-3xl font-bold text-primary mb-3">Welcome to Hocking College</h1>
              <p className="text-lg text-neutral-dark">Your gateway to campus resources and information</p>
            </div>
            
            <div className="pt-4">
              <Button 
                type="button" 
                onClick={handleGuestLogin}
                className="w-full bg-primary text-white py-3 text-lg rounded-lg font-semibold hover:bg-primary-dark transition shadow-md"
              >
                Enter Campus Portal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
