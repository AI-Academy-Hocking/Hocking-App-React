import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { 
  Settings, 
  Plus, 
  X, 
  Bell, 
  User, 
  Calendar, 
  BookOpen, 
  MapPin, 
  Home, 
  Users, 
  Trophy, 
  Heart,
  TrendingUp,
  Clock,
  Target,
  Star,
  Zap,
  Coffee,
  Wifi,
  Car,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface Widget {
  id: string;
  type: 'quick-stats' | 'calendar' | 'achievements' | 'wellness' | 'housing' | 'social' | 'study-timer' | 'weather' | 'notifications';
  title: string;
  icon: React.ReactNode;
  size: 'small' | 'medium' | 'large';
  enabled: boolean;
  order: number;
}

interface UserProfile {
  name: string;
  avatar: string;
  level: number;
  points: number;
  streak: number;
  notifications: number;
}

const availableWidgets: Widget[] = [
  {
    id: 'quick-stats',
    type: 'quick-stats',
    title: 'Quick Stats',
    icon: <TrendingUp className="h-5 w-5" />,
    size: 'medium',
    enabled: true,
    order: 1
  },
  {
    id: 'calendar',
    type: 'calendar',
    title: 'Today\'s Schedule',
    icon: <Calendar className="h-5 w-5" />,
    size: 'medium',
    enabled: true,
    order: 2
  },
  {
    id: 'achievements',
    type: 'achievements',
    title: 'Recent Achievements',
    icon: <Trophy className="h-5 w-5" />,
    size: 'small',
    enabled: true,
    order: 3
  },
  {
    id: 'wellness',
    type: 'wellness',
    title: 'Wellness Check',
    icon: <Heart className="h-5 w-5" />,
    size: 'small',
    enabled: true,
    order: 4
  },
  {
    id: 'housing',
    type: 'housing',
    title: 'Housing Updates',
    icon: <Home className="h-5 w-5" />,
    size: 'small',
    enabled: false,
    order: 5
  },
  {
    id: 'social',
    type: 'social',
    title: 'Social Feed',
    icon: <Users className="h-5 w-5" />,
    size: 'medium',
    enabled: false,
    order: 6
  },
  {
    id: 'study-timer',
    type: 'study-timer',
    title: 'Study Timer',
    icon: <Clock className="h-5 w-5" />,
    size: 'small',
    enabled: false,
    order: 7
  },
  {
    id: 'weather',
    type: 'weather',
    title: 'Campus Weather',
    icon: <Coffee className="h-5 w-5" />,
    size: 'small',
    enabled: false,
    order: 8
  },
  {
    id: 'notifications',
    type: 'notifications',
    title: 'Notifications',
    icon: <Bell className="h-5 w-5" />,
    size: 'small',
    enabled: false,
    order: 9
  }
];

export default function CustomizableDashboard() {
  const [widgets, setWidgets] = useState<Widget[]>(availableWidgets);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Alex Johnson',
    avatar: '/api/placeholder/150/150',
    level: 8,
    points: 1250,
    streak: 7,
    notifications: 3
  });
  const [studyTime, setStudyTime] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  const { toast } = useToast();

  const enabledWidgets = widgets.filter(w => w.enabled).sort((a, b) => a.order - b.order);

  const toggleWidget = (widgetId: string) => {
    setWidgets(prev => prev.map(w => 
      w.id === widgetId ? { ...w, enabled: !w.enabled } : w
    ));
  };

  const reorderWidgets = (newOrder: Widget[]) => {
    setWidgets(prev => prev.map(w => {
      const newWidget = newOrder.find(nw => nw.id === w.id);
      return newWidget ? { ...w, order: newWidget.order } : w;
    }));
  };

  const startStudySession = () => {
    setIsStudying(true);
    toast({
      title: "Study session started! 📚",
      description: "Focus mode activated. Good luck with your studies!",
    });
  };

  const stopStudySession = () => {
    setIsStudying(false);
    toast({
      title: "Study session completed! 🎉",
      description: `Great job! You studied for ${Math.floor(studyTime / 60)} minutes.`,
    });
  };

  useEffect(() => {
    let interval: number;
    if (isStudying) {
      interval = setInterval(() => {
        setStudyTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStudying]);

  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case 'quick-stats':
        return (
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                {widget.icon}
                {widget.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{userProfile.level}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{userProfile.points}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{userProfile.streak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{userProfile.notifications}</div>
                  <div className="text-sm text-gray-600">Notifications</div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'calendar':
        return (
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                {widget.icon}
                {widget.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Math 101 - 9:00 AM</span>
                  </div>
                  <Badge variant="secondary">Room 205</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Study Group - 2:00 PM</span>
                  </div>
                  <Badge variant="secondary">Library</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Campus Event - 6:00 PM</span>
                  </div>
                  <Badge variant="secondary">Student Center</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'achievements':
        return (
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                {widget.icon}
                {widget.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Perfect Attendance</div>
                  <div className="text-xs text-gray-600">7-day login streak</div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">+50 XP</Badge>
              </div>
              <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                <Star className="h-4 w-4 text-blue-600" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Study Warrior</div>
                  <div className="text-xs text-gray-600">30-min study session</div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">+25 XP</Badge>
              </div>
            </CardContent>
          </Card>
        );

      case 'wellness':
        return (
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                {widget.icon}
                {widget.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">Great!</div>
                <div className="text-sm text-gray-600 mb-3">How are you feeling today?</div>
                <div className="flex justify-center gap-2">
                  {['😢', '😐', '🙂', '😊', '🤩'].map((emoji, index) => (
                    <button
                      key={index}
                      className="text-2xl hover:scale-110 transition-transform"
                      onClick={() => toast({
                        title: "Mood recorded! 💚",
                        description: "Thanks for checking in with us.",
                      })}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'study-timer':
        return (
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                {widget.icon}
                {widget.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-3">
                  {Math.floor(studyTime / 60)}:{(studyTime % 60).toString().padStart(2, '0')}
                </div>
                <div className="space-y-2">
                  {!isStudying ? (
                    <Button onClick={startStudySession} className="w-full">
                      Start Studying
                    </Button>
                  ) : (
                    <Button onClick={stopStudySession} variant="destructive" className="w-full">
                      Stop Session
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'weather':
        return (
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                {widget.icon}
                {widget.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-4xl mb-2">☀️</div>
                <div className="text-2xl font-bold">72°F</div>
                <div className="text-sm text-gray-600">Sunny</div>
                <div className="text-xs text-gray-500 mt-1">Perfect day for campus activities!</div>
              </div>
            </CardContent>
          </Card>
        );

      case 'notifications':
        return (
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                {widget.icon}
                {widget.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">New achievement unlocked!</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Study group meeting in 30 min</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Campus event reminder</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      {/* Header with Profile */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={userProfile.avatar} />
            <AvatarFallback className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              {userProfile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-primary">Welcome back, {userProfile.name}!</h1>
            <p className="text-gray-600 dark:text-gray-300">Level {userProfile.level} • {userProfile.points} points</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCustomizing(!isCustomizing)}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            {isCustomizing ? 'Done' : 'Customize'}
          </Button>
          <Button variant="outline" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            {userProfile.notifications > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                {userProfile.notifications}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Customization Panel */}
      {isCustomizing && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-3">Customize Your Dashboard</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {availableWidgets.map((widget) => (
              <div
                key={widget.id}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  widget.enabled
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 bg-white dark:bg-gray-700'
                }`}
                onClick={() => toggleWidget(widget.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  {widget.icon}
                  <span className="text-sm font-medium">{widget.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant={widget.enabled ? "default" : "secondary"} className="text-xs">
                    {widget.size}
                  </Badge>
                  {widget.enabled && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Dashboard Grid */}
      <Reorder.Group
        axis="y"
        values={enabledWidgets}
        onReorder={reorderWidgets}
        className="space-y-6"
      >
        {enabledWidgets.map((widget) => (
          <Reorder.Item
            key={widget.id}
            value={widget}
            className={`${widget.size === 'large' ? 'col-span-2' : ''}`}
          >
            <motion.div
              layout
              className={`${widget.size === 'large' ? 'col-span-2' : ''}`}
            >
              {renderWidget(widget)}
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <Calendar className="h-6 w-6" />
            <span className="text-sm">View Calendar</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <MapPin className="h-6 w-6" />
            <span className="text-sm">Campus Map</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <Users className="h-6 w-6" />
            <span className="text-sm">Social Hub</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <Trophy className="h-6 w-6" />
            <span className="text-sm">Achievements</span>
          </Button>
        </div>
      </div>
    </div>
  );
} 