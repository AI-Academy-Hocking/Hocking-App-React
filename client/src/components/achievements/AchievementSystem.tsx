import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Award, CheckCircle, Lock, Zap, Heart, BookOpen, Users, Calendar, MapPin, Home, Coffee, GraduationCap, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'academic' | 'social' | 'wellness' | 'housing' | 'campus' | 'career';
  points: number;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface UserStats {
  totalPoints: number;
  level: number;
  achievementsUnlocked: number;
  totalAchievements: number;
  streak: number;
  lastLogin: Date;
}

const achievements: Achievement[] = [
  // Academic Achievements
  {
    id: 'first-login',
    title: 'Welcome to Hocking!',
    description: 'Complete your first login to the app',
    icon: <Star className="h-6 w-6" />,
    category: 'academic',
    points: 10,
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: new Date(),
    rarity: 'common'
  },
  {
    id: 'study-session',
    title: 'Study Warrior',
    description: 'Complete a 30-minute study session',
    icon: <BookOpen className="h-6 w-6" />,
    category: 'academic',
    points: 25,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'perfect-attendance',
    title: 'Perfect Attendance',
    description: 'Log in for 7 consecutive days',
    icon: <Calendar className="h-6 w-6" />,
    category: 'academic',
    points: 50,
    progress: 3,
    maxProgress: 7,
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'library-visit',
    title: 'Knowledge Seeker',
    description: 'Visit the library resources section',
    icon: <BookOpen className="h-6 w-6" />,
    category: 'academic',
    points: 15,
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: new Date(),
    rarity: 'common'
  },

  // Social Achievements
  {
    id: 'social-explorer',
    title: 'Social Butterfly',
    description: 'Visit the social hub',
    icon: <Users className="h-6 w-6" />,
    category: 'social',
    points: 20,
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: new Date(),
    rarity: 'common'
  },
  {
    id: 'event-attendee',
    title: 'Event Enthusiast',
    description: 'RSVP to your first campus event',
    icon: <Calendar className="h-6 w-6" />,
    category: 'social',
    points: 30,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    rarity: 'rare'
  },

  // Housing Achievements
  {
    id: 'housing-explorer',
    title: 'Home Sweet Home',
    description: 'Explore the housing section',
    icon: <Home className="h-6 w-6" />,
    category: 'housing',
    points: 15,
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: new Date(),
    rarity: 'common'
  },
  {
    id: 'maintenance-request',
    title: 'Maintenance Master',
    description: 'Submit a maintenance request',
    icon: <Wrench className="h-6 w-6" />,
    category: 'housing',
    points: 25,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    rarity: 'common'
  },

  // Campus Achievements
  {
    id: 'campus-explorer',
    title: 'Campus Explorer',
    description: 'Use the campus map feature',
    icon: <MapPin className="h-6 w-6" />,
    category: 'campus',
    points: 20,
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: new Date(),
    rarity: 'common'
  },
  {
    id: 'dining-visitor',
    title: 'Foodie',
    description: 'Check the dining hall menu',
    icon: <Coffee className="h-6 w-6" />,
    category: 'campus',
    points: 15,
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: new Date(),
    rarity: 'common'
  },

  // Wellness Achievements
  {
    id: 'wellness-check',
    title: 'Wellness Warrior',
    description: 'Complete a wellness check-in',
    icon: <Heart className="h-6 w-6" />,
    category: 'wellness',
    points: 20,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    rarity: 'common'
  },

  // Career Achievements
  {
    id: 'career-explorer',
    title: 'Career Ready',
    description: 'Visit the career center',
    icon: <GraduationCap className="h-6 w-6" />,
    category: 'career',
    points: 25,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    rarity: 'rare'
  }
];

const rarityColors = {
  common: 'bg-gray-100 text-gray-800 border-gray-300',
  rare: 'bg-blue-100 text-blue-800 border-blue-300',
  epic: 'bg-purple-100 text-purple-800 border-purple-300',
  legendary: 'bg-yellow-100 text-yellow-800 border-yellow-300'
};

const rarityIcons = {
  common: <Star className="h-4 w-4" />,
  rare: <Award className="h-4 w-4" />,
  epic: <Trophy className="h-4 w-4" />,
  legendary: <Zap className="h-4 w-4" />
};

export default function AchievementSystem() {
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 95,
    level: 3,
    achievementsUnlocked: 6,
    totalAchievements: achievements.length,
    streak: 3,
    lastLogin: new Date()
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null);
  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'All', icon: <Trophy className="h-4 w-4" /> },
    { id: 'academic', name: 'Academic', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'social', name: 'Social', icon: <Users className="h-4 w-4" /> },
    { id: 'housing', name: 'Housing', icon: <Home className="h-4 w-4" /> },
    { id: 'campus', name: 'Campus', icon: <MapPin className="h-4 w-4" /> },
    { id: 'wellness', name: 'Wellness', icon: <Heart className="h-4 w-4" /> },
    { id: 'career', name: 'Career', icon: <GraduationCap className="h-4 w-4" /> }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const progressToNextLevel = (userStats.totalPoints % 100) / 100;

  const unlockAchievement = (achievement: Achievement) => {
    if (achievement.unlocked) return;
    
    const updatedAchievement = { ...achievement, unlocked: true, unlockedAt: new Date() };
    setUnlockedAchievement(updatedAchievement);
    setShowUnlockAnimation(true);
    
    setUserStats(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + achievement.points,
      achievementsUnlocked: prev.achievementsUnlocked + 1,
      level: Math.floor((prev.totalPoints + achievement.points) / 100) + 1
    }));

    toast({
      title: "Achievement Unlocked! 🎉",
      description: `${achievement.title} - ${achievement.points} points earned!`,
    });

    setTimeout(() => setShowUnlockAnimation(false), 3000);
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Achievements & Progress</h1>
        <p className="text-gray-600 dark:text-gray-300">Track your progress and unlock achievements as you explore Hocking College</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Level</p>
                <p className="text-2xl font-bold">{userStats.level}</p>
              </div>
              <Trophy className="h-8 w-8 opacity-80" />
            </div>
            <Progress value={progressToNextLevel * 100} className="mt-2 bg-blue-400" />
            <p className="text-xs mt-1 opacity-90">{userStats.totalPoints % 100}/100 XP to next level</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Points</p>
                <p className="text-2xl font-bold">{userStats.totalPoints}</p>
              </div>
              <Star className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Achievements</p>
                <p className="text-2xl font-bold">{userStats.achievementsUnlocked}/{userStats.totalAchievements}</p>
              </div>
              <Award className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Login Streak</p>
                <p className="text-2xl font-bold">{userStats.streak} days</p>
              </div>
              <Zap className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            {category.icon}
            {category.name}
          </Button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`h-full transition-all duration-300 hover:shadow-lg ${
              achievement.unlocked ? 'border-2 border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-2 border-gray-200'
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-full ${
                    achievement.unlocked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {achievement.unlocked ? achievement.icon : <Lock className="h-6 w-6" />}
                  </div>
                  <Badge className={rarityColors[achievement.rarity]}>
                    <span className="mr-1">{rarityIcons[achievement.rarity]}</span>
                    {achievement.rarity}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{achievement.title}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <Progress 
                    value={(achievement.progress / achievement.maxProgress) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{achievement.points} points</span>
                    {achievement.unlocked ? (
                      <div className="flex items-center text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Unlocked
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        onClick={() => unlockAchievement(achievement)}
                        disabled={achievement.progress < achievement.maxProgress}
                      >
                        Unlock
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Achievement Unlock Animation */}
      <AnimatePresence>
        {showUnlockAnimation && unlockedAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-2xl shadow-2xl text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: 3 }}
                className="mb-4"
              >
                <Trophy className="h-16 w-16 mx-auto" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Achievement Unlocked!</h3>
              <p className="text-lg mb-2">{unlockedAchievement.title}</p>
              <p className="text-sm opacity-90">+{unlockedAchievement.points} points</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 