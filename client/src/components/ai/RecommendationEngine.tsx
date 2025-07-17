import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Target, Users, BookOpen, Heart, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Recommendation {
  id: string;
  type: 'study' | 'social' | 'wellness' | 'career' | 'housing';
  title: string;
  description: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  category: string;
  impact: string;
  timeToComplete: string;
  icon: React.ComponentType<any>;
}

interface UserProfile {
  academicLevel: string;
  major: string;
  interests: string[];
  goals: string[];
  studyHabits: string[];
  socialPreferences: string[];
  wellnessGoals: string[];
  careerAspirations: string[];
}

interface RecommendationEngineProps {
  userProfile: UserProfile;
  userActivity: any;
  onApplyRecommendation: (recommendation: Recommendation) => void;
}

export function RecommendationEngine({ 
  userProfile, 
  userActivity, 
  onApplyRecommendation 
}: RecommendationEngineProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // AI-powered recommendation generation
  const generateRecommendations = (profile: UserProfile, activity: any): Recommendation[] => {
    const recs: Recommendation[] = [];

    // Study recommendations based on academic performance
    if (activity.studyHours < 20) {
      recs.push({
        id: '1',
        type: 'study',
        title: 'Increase Study Time',
        description: `Based on your ${activity.studyHours} hours this week, consider increasing study time to improve academic performance.`,
        confidence: 0.85,
        priority: 'high',
        category: 'Academic Performance',
        impact: 'High - Direct impact on grades',
        timeToComplete: 'Ongoing',
        icon: BookOpen
      });
    }

    // Social recommendations
    if (activity.socialConnections < 5) {
      recs.push({
        id: '2',
        type: 'social',
        title: 'Join Study Groups',
        description: 'Connect with peers in your major to enhance learning and build friendships.',
        confidence: 0.78,
        priority: 'medium',
        actionUrl: '/study-groups',
        category: 'Social Connection',
        impact: 'Medium - Improved collaboration',
        timeToComplete: '1-2 hours',
        icon: Users
      });
    }

    // Wellness recommendations
    if (activity.sleepHours < 7) {
      recs.push({
        id: '3',
        type: 'wellness',
        title: 'Improve Sleep Schedule',
        description: 'Your current sleep pattern may affect academic performance. Aim for 7-9 hours nightly.',
        confidence: 0.92,
        priority: 'high',
        category: 'Health & Wellness',
        impact: 'High - Better focus and energy',
        timeToComplete: 'Ongoing',
        icon: Heart
      });
    }

    // Career recommendations
    if (profile.careerAspirations.length > 0) {
      recs.push({
        id: '4',
        type: 'career',
        title: 'Attend Career Workshop',
        description: `Based on your interest in ${profile.careerAspirations[0]}, attend our upcoming career development workshop.`,
        confidence: 0.81,
        priority: 'medium',
        actionUrl: '/career-hub',
        category: 'Career Development',
        impact: 'Medium - Skill development',
        timeToComplete: '2 hours',
        icon: Briefcase
      });
    }

    // Personalized study recommendations
    if (profile.major === 'Computer Science') {
      recs.push({
        id: '5',
        type: 'study',
        title: 'Practice Coding Problems',
        description: 'Enhance your programming skills with daily coding challenges.',
        confidence: 0.88,
        priority: 'medium',
        category: 'Skill Development',
        impact: 'High - Technical proficiency',
        timeToComplete: '30 minutes daily',
        icon: BookOpen
      });
    }

    // Housing recommendations for new students
    if (activity.daysOnCampus < 30) {
      recs.push({
        id: '6',
        type: 'housing',
        title: 'Connect with Roommates',
        description: 'Build relationships with your roommates for a better living experience.',
        confidence: 0.75,
        priority: 'medium',
        actionUrl: '/roommate-finder',
        category: 'Living Experience',
        impact: 'Medium - Better environment',
        timeToComplete: '1 hour',
        icon: Users
      });
    }

    return recs.sort((a, b) => b.confidence - a.confidence);
  };

  useEffect(() => {
    setIsLoading(true);
    // Simulate AI processing time
    setTimeout(() => {
      const generatedRecs = generateRecommendations(userProfile, userActivity);
      setRecommendations(generatedRecs);
      setIsLoading(false);
    }, 1500);
  }, [userProfile, userActivity]);

  const getPriorityColor = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const getTypeColor = (type: Recommendation['type']) => {
    switch (type) {
      case 'study':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'social':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'wellness':
        return 'text-pink-600 bg-pink-100 dark:bg-pink-900/30';
      case 'career':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'housing':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.type === selectedCategory);

  const categories = ['all', 'study', 'social', 'wellness', 'career', 'housing'];

  if (isLoading) {
    return (
      <Card className="border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
            <Brain className="mr-2 h-5 w-5 animate-pulse" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Brain className="h-8 w-8 text-blue-600 animate-pulse mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Analyzing your data and generating personalized recommendations...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
            <Brain className="mr-2 h-5 w-5" />
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {recommendations.length}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Recommendations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.round(recommendations.reduce((sum, rec) => sum + rec.confidence, 0) / recommendations.length * 100)}%
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Average Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {recommendations.filter(rec => rec.priority === 'high').length}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">High Priority</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        {filteredRecommendations.length === 0 ? (
          <Card className="text-center py-8">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No recommendations found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Great job! You're on track with all your goals.
            </p>
          </Card>
        ) : (
          filteredRecommendations.map((recommendation) => (
            <Card key={recommendation.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(recommendation.type)}`}>
                      <recommendation.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {recommendation.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {recommendation.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(recommendation.priority)}>
                      {recommendation.priority}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                      {Math.round(recommendation.confidence * 100)}% confidence
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {recommendation.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Impact</p>
                    <p className="text-sm text-gray-900 dark:text-white">{recommendation.impact}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Time Required</p>
                    <p className="text-sm text-gray-900 dark:text-white">{recommendation.timeToComplete}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">AI Confidence</p>
                    <Progress value={recommendation.confidence * 100} className="h-2 mt-1" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => onApplyRecommendation(recommendation)}
                    className="flex-1"
                  >
                    Apply Recommendation
                  </Button>
                  {recommendation.actionUrl && (
                    <Button variant="outline" onClick={() => window.location.href = recommendation.actionUrl!}>
                      Learn More
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 