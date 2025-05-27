import { useAuth } from "../lib/auth";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { Card, CardContent } from "../components/ui/card";
import hockingLogo from "../components/assets/HockingLogo.png";

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
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 min-h-screen relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/src/components/assets/campus-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" /> {/* Overlay for better text readability */}
      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg relative z-10">
        <CardContent className="p-0">
          <div className="text-center space-y-6">
            <div>
              <img 
                src={hockingLogo}
                alt="Hocking College Logo" 
                className="h-20 mx-auto mb-6" 
              />
              <h1 className="text-3xl font-bold text-primary mb-3">Welcome to Hocking College</h1>
              <p className="text-base text-neutral-dark">Your go-to hub for schedules, tools, maps, and more right at your fingertips</p>
            </div>
            
            <div className="pt-4">
              <Button 
                type="button" 
                onClick={handleGuestLogin}
                className="w-full bg-primary text-black py-3 text-lg rounded-lg font-semibold hover:bg-primary-dark transition shadow-md border-2 border-black"
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
