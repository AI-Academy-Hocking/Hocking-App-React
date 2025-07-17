import React, { useState, useEffect } from 'react';
import { Heart, Activity, Moon, Coffee, BookOpen, Users, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WellnessActivity {
  id: string;
  type: 'sleep' | 'exercise' | 'nutrition' | 'social' | 'study' | 'mindfulness';
  name: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

interface WellnessTrackerProps {
  activities: WellnessActivity[];
  onUpdateActivity: (id: string, value: number) => void;
  onAddActivity: (activity: Omit<WellnessActivity, 'id' | 'current'>) => void;
}

export function WellnessTracker({ activities, onUpdateActivity, onAddActivity }: WellnessTrackerProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showAddForm, setShowAddForm] = useState(false);

  const getOverallScore = () => {
    if (activities.length === 0) return 0;
    const totalScore = activities.reduce((sum, activity) => {
      const percentage = Math.min((activity.current / activity.target) * 100, 100);
      return sum + percentage;
    }, 0);
    return Math.round(totalScore / activities.length);
  };

  const getStreak = () => {
    // Mock streak calculation - in real app, this would come from backend
    return 7;
  };

  const getRecommendations = () => {
    const lowActivities = activities.filter(activity => 
      (activity.current / activity.target) < 0.5
    );
    
    return lowActivities.map(activity => ({
      type: activity.type,
      message: `Try to increase your ${activity.name.toLowerCase()} to reach your daily goal`
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Wellness Tracker
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your daily wellness activities and build healthy habits
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
          <Target className="mr-2 h-4 w-4" />
          Add Activity
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-green-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">Overall Score</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {getOverallScore()}%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400">Current Streak</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {getStreak()} days
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-400">Activities</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {activities.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 dark:text-orange-400">Completed</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                  {activities.filter(a => a.current >= a.target).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.bgColor}`}>
                      <activity.icon className={`h-5 w-5 ${activity.color}`} />
                    </div>
                    <Badge className={
                      activity.current >= activity.target 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                    }>
                      {activity.current >= activity.target ? 'Complete' : 'In Progress'}
                    </Badge>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {activity.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {activity.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-gray-900 dark:text-white">
                        {activity.current}/{activity.target} {activity.unit}
                      </span>
                    </div>
                    <Progress 
                      value={(activity.current / activity.target) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => onUpdateActivity(activity.id, activity.current + 1)}
                      className="flex-1"
                    >
                      +1
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateActivity(activity.id, Math.max(0, activity.current - 1))}
                      className="flex-1"
                    >
                      -1
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.bgColor}`}>
                        <activity.icon className={`h-5 w-5 ${activity.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {activity.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Current</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {activity.current} {activity.unit}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Target</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {activity.target} {activity.unit}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => onUpdateActivity(activity.id, activity.current + 1)}
                        >
                          +
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onUpdateActivity(activity.id, Math.max(0, activity.current - 1))}
                        >
                          -
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                {getRecommendations().length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    Great job! You're on track with all your wellness goals.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {getRecommendations().map((rec, index) => (
                      <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          {rec.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <div key={activity.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">{activity.name}</span>
                        <span className="text-gray-900 dark:text-white">
                          {Math.round((activity.current / activity.target) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(activity.current / activity.target) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 