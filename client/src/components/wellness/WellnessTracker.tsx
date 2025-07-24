import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Activity, 
  Moon, 
  Sun, 
  Coffee, 
  Droplets, 
  Apple, 
  Dumbbell, 
  Brain, 
  Smile, 
  TrendingUp,
  Calendar,
  Clock,
  Target,
  Trophy,
  Star,
  Zap,
  CheckCircle,
  Plus,
  Minus,
  BarChart3,
  Target as TargetIcon,
  Users,
  Award,
  Bell,
  Settings,
  RefreshCw,
  Play,
  Pause,
  Square,
  X,
  BookOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 1-5 scale
  energy: number; // 1-5 scale
  stress: number; // 1-5 scale
  notes: string;
  activities: string[];
}

interface FitnessGoal {
  id: string;
  name: string;
  type: 'steps' | 'workouts' | 'water' | 'sleep' | 'meditation';
  target: number;
  current: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
  streak: number;
}

interface WellnessChallenge {
  id: string;
  title: string;
  description: string;
  duration: number; // days
  participants: number;
  reward: string;
  progress: number;
  isActive: boolean;
  category: 'fitness' | 'mental' | 'nutrition' | 'sleep';
}

interface SleepData {
  date: string;
  hours: number;
  quality: number; // 1-5 scale
  bedtime: string;
  wakeTime: string;
}

const moodEmojis = ['😢', '😐', '🙂', '😊', '🤩'];
const moodLabels = ['Very Low', 'Low', 'Okay', 'Good', 'Excellent'];

const fitnessGoals: FitnessGoal[] = [
  {
    id: 'steps',
    name: 'Daily Steps',
    type: 'steps',
    target: 10000,
    current: 7500,
    unit: 'steps',
    icon: <Activity className="h-5 w-5" />,
    color: 'bg-blue-500',
    streak: 5
  },
  {
    id: 'workouts',
    name: 'Weekly Workouts',
    type: 'workouts',
    target: 4,
    current: 2,
    unit: 'workouts',
    icon: <Dumbbell className="h-5 w-5" />,
    color: 'bg-green-500',
    streak: 3
  },
  {
    id: 'water',
    name: 'Water Intake',
    type: 'water',
    target: 8,
    current: 6,
    unit: 'glasses',
    icon: <Droplets className="h-5 w-5" />,
    color: 'bg-blue-400',
    streak: 7
  },
  {
    id: 'sleep',
    name: 'Sleep Hours',
    type: 'sleep',
    target: 8,
    current: 7.5,
    unit: 'hours',
    icon: <Moon className="h-5 w-5" />,
    color: 'bg-purple-500',
    streak: 4
  },
  {
    id: 'meditation',
    name: 'Meditation',
    type: 'meditation',
    target: 10,
    current: 8,
    unit: 'minutes',
    icon: <Brain className="h-5 w-5" />,
    color: 'bg-orange-500',
    streak: 6
  }
];

const wellnessChallenges: WellnessChallenge[] = [
  {
    id: '1',
    title: '30-Day Fitness Challenge',
    description: 'Complete 30 days of consistent exercise and earn exclusive rewards!',
    duration: 30,
    participants: 156,
    reward: 'Fitness Champion Badge + 500 XP',
    progress: 15,
    isActive: true,
    category: 'fitness'
  },
  {
    id: '2',
    title: 'Mindful Minutes',
    description: 'Practice 10 minutes of meditation daily for 21 days',
    duration: 21,
    participants: 89,
    reward: 'Mindfulness Master Badge + 300 XP',
    progress: 8,
    isActive: true,
    category: 'mental'
  },
  {
    id: '3',
    title: 'Hydration Hero',
    description: 'Drink 8 glasses of water daily for 14 days',
    duration: 14,
    participants: 234,
    reward: 'Hydration Hero Badge + 200 XP',
    progress: 12,
    isActive: true,
    category: 'nutrition'
  },
  {
    id: '4',
    title: 'Sleep Well',
    description: 'Get 8 hours of sleep for 7 consecutive days',
    duration: 7,
    participants: 67,
    reward: 'Sleep Master Badge + 150 XP',
    progress: 5,
    isActive: true,
    category: 'sleep'
  }
];

const recentMoodEntries: MoodEntry[] = [
  {
    id: '1',
    date: '2024-04-15',
    mood: 4,
    energy: 3,
    stress: 2,
    notes: 'Had a great study session with friends!',
    activities: ['Study Group', 'Exercise', 'Social']
  },
  {
    id: '2',
    date: '2024-04-14',
    mood: 3,
    energy: 4,
    stress: 3,
    notes: 'Feeling productive but a bit tired.',
    activities: ['Exercise', 'Study']
  },
  {
    id: '3',
    date: '2024-04-13',
    mood: 5,
    energy: 5,
    stress: 1,
    notes: 'Amazing day! Completed all my goals.',
    activities: ['Exercise', 'Social', 'Study', 'Meditation']
  }
];

export default function WellnessTracker() {
  const [activeTab, setActiveTab] = useState<'overview' | 'mood' | 'fitness' | 'sleep' | 'challenges'>('overview');
  const [currentMood, setCurrentMood] = useState(3);
  const [currentEnergy, setCurrentEnergy] = useState(3);
  const [currentStress, setCurrentStress] = useState(3);
  const [moodNotes, setMoodNotes] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [showMoodEntry, setShowMoodEntry] = useState(false);
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const { toast } = useToast();

  const activities = [
    { id: 'exercise', name: 'Exercise', icon: <Dumbbell className="h-4 w-4" /> },
    { id: 'study', name: 'Study', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'social', name: 'Social', icon: <Users className="h-4 w-4" /> },
    { id: 'meditation', name: 'Meditation', icon: <Brain className="h-4 w-4" /> },
    { id: 'sleep', name: 'Sleep', icon: <Moon className="h-4 w-4" /> },
    { id: 'nutrition', name: 'Nutrition', icon: <Apple className="h-4 w-4" /> }
  ];

  const toggleActivity = (activityId: string) => {
    setSelectedActivities(prev => 
      prev.includes(activityId) 
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const submitMoodEntry = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: currentMood,
      energy: currentEnergy,
      stress: currentStress,
      notes: moodNotes,
      activities: selectedActivities
    };

    toast({
      title: "Mood recorded! 💚",
      description: "Thanks for checking in with us. Keep up the great work!",
    });

    setShowMoodEntry(false);
    setMoodNotes('');
    setSelectedActivities([]);
  };

  const updateGoal = (goalId: string, increment: boolean) => {
    toast({
      title: increment ? "Progress updated! 📈" : "Progress adjusted! 📊",
      description: `Keep up the great work on your ${fitnessGoals.find(g => g.id === goalId)?.name.toLowerCase()} goal!`,
    });
  };

  const startTimer = () => {
    setTimerRunning(true);
    toast({
      title: "Meditation started! 🧘‍♀️",
      description: "Take deep breaths and find your center.",
    });
  };

  const stopTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(0);
    toast({
      title: "Meditation completed! ✨",
      description: "Great job taking time for yourself!",
    });
  };

  useEffect(() => {
    let interval: number;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Wellness Score */}
            <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Your Wellness Score</h3>
                    <div className="text-3xl font-bold">85/100</div>
                    <p className="text-sm opacity-90">Excellent! You're doing great!</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl">🎯</div>
                    <div className="text-sm opacity-90">+5 this week</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => setShowMoodEntry(true)}
                className="h-20 flex flex-col gap-2 bg-blue-500 hover:bg-blue-600"
              >
                <Smile className="h-6 w-6" />
                <span className="text-sm">Check Mood</span>
              </Button>
              <Button 
                onClick={startTimer}
                className="h-20 flex flex-col gap-2 bg-purple-500 hover:bg-purple-600"
              >
                <Brain className="h-6 w-6" />
                <span className="text-sm">Meditate</span>
              </Button>
              <Button 
                className="h-20 flex flex-col gap-2 bg-green-500 hover:bg-green-600"
              >
                <Activity className="h-6 w-6" />
                <span className="text-sm">Log Exercise</span>
              </Button>
            </div>

            {/* Fitness Goals Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fitnessGoals.map((goal) => (
                <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full ${goal.color} text-white`}>
                          {goal.icon}
                        </div>
                        <div>
                          <div className="font-semibold">{goal.name}</div>
                          <div className="text-sm text-gray-600">{goal.current}/{goal.target} {goal.unit}</div>
                        </div>
                      </div>
                      <Badge variant="secondary">{goal.streak} day streak</Badge>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="mb-3" />
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateGoal(goal.id, false)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateGoal(goal.id, true)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'mood':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mood Tracking</h2>
              <Button onClick={() => setShowMoodEntry(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Log Mood
              </Button>
            </div>

            {/* Mood Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Mood Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                    <p>Mood tracking chart will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Entries */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recent Entries</h3>
              {recentMoodEntries.map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{moodEmojis[entry.mood - 1]}</div>
                        <div>
                          <div className="font-semibold">{moodLabels[entry.mood - 1]}</div>
                          <div className="text-sm text-gray-600">{entry.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Energy: {entry.energy}/5</div>
                        <div className="text-sm text-gray-600">Stress: {entry.stress}/5</div>
                      </div>
                    </div>
                    {entry.notes && (
                      <p className="text-gray-700 mb-3">{entry.notes}</p>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {entry.activities.map((activity) => (
                        <Badge key={activity} variant="secondary" className="text-xs">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'fitness':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Fitness & Activity</h2>

            {/* Activity Timer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Meditation Timer
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-4">
                  {formatTime(timerSeconds)}
                </div>
                <div className="flex justify-center gap-2">
                  {!isTimerRunning ? (
                    <Button onClick={startTimer} className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Start Meditation
                    </Button>
                  ) : (
                    <Button onClick={stopTimer} variant="destructive" className="flex items-center gap-2">
                      <Square className="h-4 w-4" />
                      Stop
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fitnessGoals.map((goal) => (
                <Card key={goal.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className={`p-2 rounded-full ${goal.color} text-white`}>
                        {goal.icon}
                      </div>
                      {goal.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium">{goal.current}/{goal.target} {goal.unit}</span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TargetIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Target: {goal.target} {goal.unit}</span>
                      </div>
                      <Badge variant="secondary">{goal.streak} day streak</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateGoal(goal.id, false)}
                        className="flex-1"
                      >
                        <Minus className="h-3 w-3 mr-1" />
                        Decrease
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateGoal(goal.id, true)}
                        className="flex-1"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Increase
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'sleep':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Sleep Tracking</h2>

            {/* Sleep Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5" />
                  Sleep Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">7.5 hours</div>
                  <div className="text-sm text-gray-600 mb-4">Last night's sleep</div>
                  <Progress value={93.75} className="mb-4" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Bedtime: 11:30 PM</span>
                    <span>Wake time: 7:00 AM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sleep Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Sleep Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium">Stick to a sleep schedule</div>
                    <div className="text-sm text-gray-600">Go to bed and wake up at the same time every day</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium">Create a bedtime routine</div>
                    <div className="text-sm text-gray-600">Read a book or practice relaxation techniques</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium">Limit screen time</div>
                    <div className="text-sm text-gray-600">Avoid screens 1 hour before bedtime</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'challenges':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Wellness Challenges</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wellnessChallenges.map((challenge) => (
                <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <Badge variant={challenge.isActive ? "default" : "secondary"}>
                        {challenge.isActive ? 'Active' : 'Completed'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress: {challenge.progress}/{challenge.duration} days</span>
                      <span>{challenge.participants} participants</span>
                    </div>
                    <Progress value={(challenge.progress / challenge.duration) * 100} />
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="text-sm font-medium text-yellow-800">Reward:</div>
                      <div className="text-sm text-yellow-700">{challenge.reward}</div>
                    </div>
                    <Button className="w-full">
                      {challenge.isActive ? 'Continue Challenge' : 'Join Challenge'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Wellness Tracker</h1>
        <p className="text-gray-600 dark:text-gray-300">Track your mood, fitness, sleep, and overall wellness journey</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'overview', name: 'Overview', icon: <Heart className="h-4 w-4" /> },
          { id: 'mood', name: 'Mood', icon: <Smile className="h-4 w-4" /> },
          { id: 'fitness', name: 'Fitness', icon: <Activity className="h-4 w-4" /> },
          { id: 'sleep', name: 'Sleep', icon: <Moon className="h-4 w-4" /> },
          { id: 'challenges', name: 'Challenges', icon: <Trophy className="h-4 w-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Mood Entry Modal */}
      <AnimatePresence>
        {showMoodEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">How are you feeling?</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMoodEntry(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Mood Rating */}
                <div>
                  <label className="block text-sm font-medium mb-3">Mood</label>
                  <div className="flex justify-between">
                    {moodEmojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMood(index + 1)}
                        className={`text-3xl p-2 rounded-lg transition-colors ${
                          currentMood === index + 1 ? 'bg-blue-100 dark:bg-blue-900' : ''
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <div className="text-center mt-2 text-sm text-gray-600">
                    {moodLabels[currentMood - 1]}
                  </div>
                </div>

                {/* Energy Level */}
                <div>
                  <label className="block text-sm font-medium mb-3">Energy Level</label>
                  <Slider
                    value={[currentEnergy]}
                    onValueChange={(value) => setCurrentEnergy(value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center mt-2 text-sm text-gray-600">
                    {currentEnergy}/5
                  </div>
                </div>

                {/* Stress Level */}
                <div>
                  <label className="block text-sm font-medium mb-3">Stress Level</label>
                  <Slider
                    value={[currentStress]}
                    onValueChange={(value) => setCurrentStress(value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center mt-2 text-sm text-gray-600">
                    {currentStress}/5
                  </div>
                </div>

                {/* Activities */}
                <div>
                  <label className="block text-sm font-medium mb-3">Activities Today</label>
                  <div className="grid grid-cols-2 gap-2">
                    {activities.map((activity) => (
                      <button
                        key={activity.id}
                        onClick={() => toggleActivity(activity.id)}
                        className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                          selectedActivities.includes(activity.id)
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-600'
                        }`}
                      >
                        {activity.icon}
                        <span className="text-sm">{activity.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium mb-2">Notes (optional)</label>
                  <textarea
                    value={moodNotes}
                    onChange={(e) => setMoodNotes(e.target.value)}
                    placeholder="How was your day?"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowMoodEntry(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button onClick={submitMoodEntry} className="flex-1">
                    Save Entry
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 