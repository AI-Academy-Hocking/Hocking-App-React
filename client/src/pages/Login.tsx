import { useToast } from "../hooks/use-toast";
import { Card, CardContent } from "../components/ui/card";
import HockingLogo from "../components/assets/HockingLogo.png";
// Using public folder - no import needed

import { Button } from "../components/ui/button";
import { useLocation } from "wouter";
import { useAuth } from "../lib/auth";
import { useState, useEffect, useRef } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      console.log('Setting up video...');
      
      // Simple error handler
      video.addEventListener('error', (e) => {
        console.error('Video error:', e);
        console.error('Failed to load video from /LandingPage.mp4');
      });
      
      // Success handler
      video.addEventListener('canplay', () => {
        console.log('Video can play!');
        video.play().catch(console.error);
      });
      
      // Force load
      video.load();
    }
  }, []);

  // Old complex video logic (commented out)
  /*useEffect(() => {
    // Enhanced video loading with better error handling and fallbacks
    const video = videoRef.current;
    if (video) {
      console.log('Video element found, attempting to load...');
      console.log('Video source path: /LandingPage.mp4');
      
      // Set video properties directly
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.loop = true;
      
      // Ensure the source is set correctly with fallbacks
      if (!video.src && !video.querySelector('source')) {
        // Try public path first, then asset import
        video.src = '/LandingPage.mp4';
        
        // Add error handler for debugging
        video.addEventListener('error', () => {
          console.log('Public path failed - check if /LandingPage.mp4 exists');
        }, { once: true });
      }
      
      // Add event listeners for debugging
      video.addEventListener('loadstart', () => console.log('Video: Load started'));
      video.addEventListener('loadedmetadata', () => console.log('Video: Metadata loaded'));
      video.addEventListener('loadeddata', () => console.log('Video: Data loaded'));
      video.addEventListener('canplay', () => {
        console.log('Video: Can play');
        // Try to play when canplay event fires
        video.play().catch(error => {
          console.error('Auto-play failed on canplay:', error);
        });
      });
      video.addEventListener('canplaythrough', () => console.log('Video: Can play through'));
      video.addEventListener('play', () => console.log('Video: Playing successfully'));
      video.addEventListener('pause', () => console.log('Video: Paused'));
      video.addEventListener('error', (e) => {
        console.error('Video error event:', e);
        const error = video.error;
        if (error) {
          console.error('Video error code:', error.code);
          console.error('Video error message:', error.message);
          // Error codes: 1=ABORTED, 2=NETWORK, 3=DECODE, 4=SRC_NOT_SUPPORTED
          const errorMessages = {
            1: 'Video loading aborted',
            2: 'Network error while loading video',
            3: 'Video decoding error',
            4: 'Video format not supported'
          };
          console.error('Error meaning:', errorMessages[error.code] || 'Unknown error');
        }
      });
      
      // Force load the video and set source directly as well
      video.load();
      
      // Also try setting src directly on the video element
      if (!video.src) {
        video.src = '/LandingPage.mp4';
        console.log('Set video src directly to:', video.src);
      }
      
      // Try multiple play attempts with different timing
      const attemptPlay = async (attempt = 1) => {
        try {
          console.log(`Play attempt ${attempt}`);
          await video.play();
          console.log('Video started playing successfully');
        } catch (error) {
          console.error(`Play attempt ${attempt} failed:`, error);
          if (attempt < 3) {
            setTimeout(() => attemptPlay(attempt + 1), 500 * attempt);
          } else {
            console.error('All play attempts failed. Video may need user interaction.');
          }
        }
      };
      
      // First immediate attempt
      setTimeout(() => attemptPlay(), 100);
      
      // Cleanup function
      return () => {
        if (video) {
          video.pause();
          video.removeAttribute('src');
          video.load();
        }
      };
    } else {
      console.error('Video element not found!');
    }
  }, []);*/

  const handleGetStarted = () => {
    // Video logic temporarily disabled
    
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
    
    // Try to play video on user interaction
    const video = videoRef.current;
    if (video && video.paused) {
      video.play().catch(console.error);
    }
    
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

  // Add a global click handler to try playing video on any user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      const video = videoRef.current;
      if (video && video.paused) {
        video.play().catch(console.error);
      }
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

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
                onClick={() => setLocation("/learn-more")}
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
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/LandingPage.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
      </div>
    </div>
  );
}
