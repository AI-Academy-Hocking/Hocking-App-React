import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, PieChart, Activity, Target, Calendar, Users, Award, BookOpen, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface AnalyticsData {
  studyHours: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  };
  wellnessScores: {
    sleep: number[];
    exercise: number[];
    social: number[];
    nutrition: number[];
  };
  socialEngagement: {
    eventsAttended: number;
    studyGroupsJoined: number;
    connectionsMade: number;
    messagesSent: number;
  };
  academicProgress: {
    assignmentsCompleted: number;
    averageGrade: number;
    studySessions: number;
    attendanceRate: number;
  };
  careerMetrics: {
    applicationsSubmitted: number;
    interviewsScheduled: number;
    skillsDeveloped: number;
    networkingEvents: number;
  };
}

interface AdvancedAnalyticsProps {
  data: AnalyticsData;
  timeRange: 'week' | 'month' | 'semester';
}

export function AdvancedAnalytics({ data, timeRange }: AdvancedAnalyticsProps) {
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);

  const metrics = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'academic', label: 'Academic', icon: Target },
    { id: 'wellness', label: 'Wellness', icon: TrendingUp },
    { id: 'social', label: 'Social', icon: Users },
    { id: 'career', label: 'Career', icon: Award }
  ];

  const calculateTrend = (values: number[]): { direction: 'up' | 'down' | 'stable'; percentage: number } => {
    if (values.length < 2) return { direction: 'stable', percentage: 0 };
    
    const recent = values.slice(-7).reduce((a, b) => a + b, 0);
    const previous = values.slice(-14, -7).reduce((a, b) => a + b, 0);
    
    if (previous === 0) return { direction: 'stable', percentage: 0 };
    
    const change = ((recent - previous) / previous) * 100;
    
    if (change > 5) return { direction: 'up', percentage: Math.abs(change) };
    if (change < -5) return { direction: 'down', percentage: Math.abs(change) };
    return { direction: 'stable', percentage: Math.abs(change) };
  };

  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Study Hours</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.studyHours.weekly.reduce((a, b) => a + b, 0)}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {getTrendIcon(calculateTrend(data.studyHours.daily).direction)}
                <span className={`text-xs ${getTrendColor(calculateTrend(data.studyHours.daily).direction)}`}>
                  {calculateTrend(data.studyHours.daily).percentage.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Wellness Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round((data.wellnessScores.sleep.slice(-1)[0] + 
                            data.wellnessScores.exercise.slice(-1)[0] + 
                            data.wellnessScores.social.slice(-1)[0] + 
                            data.wellnessScores.nutrition.slice(-1)[0]) / 4)}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-green-600">Good</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Social Events</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.socialEngagement.eventsAttended}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-blue-600">This month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Career Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.careerMetrics.applicationsSubmitted}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-orange-600">Applications</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAcademicAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Academic Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Average Grade</span>
                  <span>{data.academicProgress.averageGrade}%</span>
                </div>
                <Progress value={data.academicProgress.averageGrade} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Attendance Rate</span>
                  <span>{data.academicProgress.attendanceRate}%</span>
                </div>
                <Progress value={data.academicProgress.attendanceRate} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{data.academicProgress.assignmentsCompleted}</p>
                  <p className="text-xs text-gray-600">Assignments</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{data.academicProgress.studySessions}</p>
                  <p className="text-xs text-gray-600">Study Sessions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Study Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Daily Study Hours</p>
                <div className="flex items-end gap-1 h-20">
                  {data.studyHours.daily.slice(-7).map((hours, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-blue-200 dark:bg-blue-800 rounded-t"
                      style={{ height: `${(hours / Math.max(...data.studyHours.daily.slice(-7))) * 100}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderWellnessAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-5 w-5" />
              Wellness Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(data.wellnessScores).map(([category, scores]) => (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{category}</span>
                    <span>{scores.slice(-1)[0]}/10</span>
                  </div>
                  <Progress value={scores.slice(-1)[0] * 10} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Wellness Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(data.wellnessScores).map(([category, scores]) => {
                const trend = calculateTrend(scores);
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{category}</span>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(trend.direction)}
                      <span className={`text-xs ${getTrendColor(trend.direction)}`}>
                        {trend.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSocialAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Social Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{data.socialEngagement.eventsAttended}</p>
                <p className="text-sm text-gray-600">Events Attended</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{data.socialEngagement.studyGroupsJoined}</p>
                <p className="text-sm text-gray-600">Study Groups</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{data.socialEngagement.connectionsMade}</p>
                <p className="text-sm text-gray-600">Connections</p>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{data.socialEngagement.messagesSent}</p>
                <p className="text-sm text-gray-600">Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5" />
              Activity Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Events</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">40%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Study Groups</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">35%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Networking</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">25%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCareerAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5" />
              Career Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Applications Submitted</span>
                  <span>{data.careerMetrics.applicationsSubmitted}</span>
                </div>
                <Progress value={(data.careerMetrics.applicationsSubmitted / 20) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Interviews Scheduled</span>
                  <span>{data.careerMetrics.interviewsScheduled}</span>
                </div>
                <Progress value={(data.careerMetrics.interviewsScheduled / 10) * 100} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{data.careerMetrics.skillsDeveloped}</p>
                  <p className="text-xs text-gray-600">Skills</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{data.careerMetrics.networkingEvents}</p>
                  <p className="text-xs text-gray-600">Events</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Career Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Resume Updated</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Career Fair Attended</p>
                  <p className="text-xs text-gray-500">1 week ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Interview Scheduled</p>
                  <p className="text-xs text-gray-500">2 weeks ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Advanced Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Deep insights into your academic and personal development
          </p>
        </div>
        <Select value={selectedTimeRange} onValueChange={(value: any) => setSelectedTimeRange(value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="semester">Semester</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Metric Selector */}
      <div className="flex flex-wrap gap-2">
        {metrics.map((metric) => (
          <button
            key={metric.id}
            onClick={() => setSelectedMetric(metric.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedMetric === metric.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {metric.label}
          </button>
        ))}
      </div>

      {/* Analytics Content */}
      {selectedMetric === 'overview' && renderOverview()}
      {selectedMetric === 'academic' && renderAcademicAnalytics()}
      {selectedMetric === 'wellness' && renderWellnessAnalytics()}
      {selectedMetric === 'social' && renderSocialAnalytics()}
      {selectedMetric === 'career' && renderCareerAnalytics()}
    </div>
  );
} 