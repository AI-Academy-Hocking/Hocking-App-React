import { useAuth } from "../lib/auth";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { Card, CardContent } from "../components/ui/card";
import HockingLogo from "../components/assets/HockingLogo.png";

export default function Login() {
  const { guestLogin, isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = (path: string) => window.location.href = path;

  const handleGetStarted = () => {
    localStorage.setItem('hasClickedGetStarted', 'true');
    guestLogin();
    toast({
      title: "Welcome",
      description: "Let's get started with your Hocking College experience",
    });
  };

  if (isAuthenticated) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 min-h-screen">
        <Card className="w-full max-w-md p-8 bg-white/30 rounded-lg shadow-lg border border-white/30 z-10">
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
                <h1 className="text-3xl font-bold text-white mb-3">Welcome!</h1>
                <p className="text-base text-white">Your go-to hub for schedules, tools, maps, and more right at your fingertips</p>
              </div>
              <div className="flex flex-col gap-3 pt-4">
                <Button onClick={() => { localStorage.setItem('hasClickedGetStarted', 'true'); navigate('/home'); }} className="w-full bg-navy-500/90 text-white py-3 text-lg rounded-lg font-semibold hover:bg-navy-600 transition shadow-md border-2 border-white/30">Get Started</Button>
              </div>
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
            <source src="/src/assets/AIProjectRoughCut.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 min-h-screen">
      <Card className="w-full max-w-md p-8 bg-white/30 rounded-lg shadow-lg border border-white/30 z-10">
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
              <p className="text-base text-white">Your go-to hub for schedules, tools, maps, and more right at your fingertips</p>
            </div>
            
            <div className="pt-4">
              <Button 
                type="button" 
                onClick={handleGetStarted}
                className="w-full bg-navy-500/90 text-white py-3 text-lg rounded-lg font-semibold hover:bg-navy-600 transition shadow-md border-2 border-white/30"
              >
                Get Started
              </Button>
            </div>
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
          <source src="/src/assets/AIProjectRoughCut.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
    </div>
  );
}
