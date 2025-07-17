import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Target, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Prediction {
  id: string;
  type: 'grade' | 'attendance' | 'completion' | 'risk' | 'opportunity';
  subject?: string;
  title: string;
  description: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  timeframe: 'week' | 'month' | 'semester';
  trend: 'improving' | 'declining' | 'stable';
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  lastUpdated: Date;
}

interface TrendAnalysis {
  subject: string;
  currentTrend: 'up' | 'down' | 'stable';
  trendStrength: number; // 0-100
  predictedGrade: number;
  confidence: number;
  factors: string[];
  interventions: string[];
}

interface RiskAssessment {
  category: string;
  riskLevel: 'low' | 'medium' | 'high';
  probability: number;
  impact: 'low' | 'medium' | 'high';
  description: string;
  mitigationStrategies: string[];
}

interface PredictiveAnalyticsProps {
  userId: string;
  historicalData: any;
  onInterventionTriggered: (intervention: string) => void;
}

export function PredictiveAnalytics({ 
  userId, 
  historicalData, 
  onInterventionTriggered 
}: PredictiveAnalyticsProps) {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [trendAnalysis, setTrendAnalysis] = useState<TrendAnalysis[]>([]);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'semester'>('month');
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate predictions based on historical data
  const generatePredictions = async () => {
    setIsGenerating(true);
    
    // Simulate AI prediction processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockPredictions: Prediction[] = [
      {
        id: '1',
        type: 'grade',
        subject: 'Mathematics',
        title: 'Calculus Final Grade Prediction',
        description: 'Based on your current performance and study patterns, your predicted final grade is 87%.',
        currentValue: 82,
        predictedValue: 87,
        confidence: 0.89,
        timeframe: 'semester',
        trend: 'improving',
        riskLevel: 'low',
        recommendations: [
          'Continue current study schedule',
          'Focus on integration problems',
          'Attend office hours for complex topics'
        ],
        lastUpdated: new Date()
      },
      {
        id: '2',
        type: 'risk',
        subject: 'History',
        title: 'Attendance Risk Alert',
        description: 'Your attendance pattern suggests you may miss the next 2 classes if current trend continues.',
        currentValue: 85,
        predictedValue: 78,
        confidence: 0.76,
        timeframe: 'month',
        trend: 'declining',
        riskLevel: 'medium',
        recommendations: [
          'Set multiple alarms for class times',
          'Join a study group for accountability',
          'Schedule classes during your peak energy hours'
        ],
        lastUpdated: new Date()
      },
      {
        id: '3',
        type: 'opportunity',
        subject: 'Computer Science',
        title: 'Excellence Opportunity',
        description: 'You have the potential to achieve an A+ in Programming if you maintain current momentum.',
        currentValue: 88,
        predictedValue: 95,
        confidence: 0.82,
        timeframe: 'semester',
        trend: 'improving',
        riskLevel: 'low',
        recommendations: [
          'Continue daily coding practice',
          'Participate in advanced projects',
          'Mentor other students to reinforce learning'
        ],
        lastUpdated: new Date()
      },
      {
        id: '4',
        type: 'completion',
        title: 'Assignment Completion Forecast',
        description: 'At current pace, you will complete 92% of assignments on time this semester.',
        currentValue: 88,
        predictedValue: 92,
        confidence: 0.91,
        timeframe: 'semester',
        trend: 'improving',
        riskLevel: 'low',
        recommendations: [
          'Maintain current planning system',
          'Start assignments 2 days earlier',
          'Use time-blocking for complex projects'
        ],
        lastUpdated: new Date()
      }
    ];
    
    setPredictions(mockPredictions);
    
    // Generate trend analysis
    const mockTrendAnalysis: TrendAnalysis[] = [
      {
        subject: 'Mathematics',
        currentTrend: 'up',
        trendStrength: 75,
        predictedGrade: 87,
        confidence: 0.89,
        factors: ['Consistent study schedule', 'Regular practice', 'Office hours attendance'],
        interventions: ['Continue current approach', 'Focus on weak areas', 'Seek advanced challenges']
      },
      {
        subject: 'History',
        currentTrend: 'down',
        trendStrength: 45,
        predictedGrade: 78,
        confidence: 0.76,
        factors: ['Declining attendance', 'Late assignment submissions', 'Reduced engagement'],
        interventions: ['Improve attendance', 'Set earlier deadlines', 'Join study groups']
      },
      {
        subject: 'Computer Science',
        currentTrend: 'up',
        trendStrength: 85,
        predictedGrade: 95,
        confidence: 0.82,
        factors: ['Daily practice', 'Project participation', 'Peer collaboration'],
        interventions: ['Maintain momentum', 'Take on leadership roles', 'Explore advanced topics']
      }
    ];
    
    setTrendAnalysis(mockTrendAnalysis);
    
    // Generate risk assessment
    const mockRiskAssessment: RiskAssessment[] = [
      {
        category: 'Academic Performance',
        riskLevel: 'medium',
        probability: 0.35,
        impact: 'high',
        description: 'Risk of falling below 3.0 GPA due to History class performance',
        mitigationStrategies: [
          'Increase study time for History',
          'Seek tutoring support',
          'Improve attendance and participation'
        ]
      },
      {
        category: 'Time Management',
        riskLevel: 'low',
        probability: 0.15,
        impact: 'medium',
        description: 'Risk of missing assignment deadlines',
        mitigationStrategies: [
          'Use calendar reminders',
          'Start assignments earlier',
          'Break large projects into smaller tasks'
        ]
      },
      {
        category: 'Social Engagement',
        riskLevel: 'low',
        probability: 0.10,
        impact: 'low',
        description: 'Risk of reduced social connections',
        mitigationStrategies: [
          'Join more study groups',
          'Attend campus events',
          'Participate in extracurricular activities'
        ]
      }
    ];
    
    setRiskAssessment(mockRiskAssessment);
    setIsGenerating(false);
  };

  useEffect(() => {
    generatePredictions();
  }, [historicalData, selectedTimeframe]);

  const getTrendIcon = (trend: 'improving' | 'declining' | 'stable') => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining':
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default:
        return <TrendingUp className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRiskColor = (riskLevel: 'low' | 'medium' | 'high') => {
    switch (riskLevel) {
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

  const getTypeIcon = (type: Prediction['type']) => {
    switch (type) {
      case 'grade':
        return <Target className="h-4 w-4" />;
      case 'attendance':
        return <Calendar className="h-4 w-4" />;
      case 'completion':
        return <CheckCircle className="h-4 w-4" />;
      case 'risk':
        return <AlertTriangle className="h-4 w-4" />;
      case 'opportunity':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
            <TrendingUp className="mr-2 h-5 w-5" />
            Predictive Analytics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <p className="text-blue-700 dark:text-blue-300">
              AI-powered predictions and trend analysis for your academic success
            </p>
            <Select value={selectedTimeframe} onValueChange={(value: any) => setSelectedTimeframe(value)}>
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
        </CardContent>
      </Card>

      {isGenerating ? (
        <Card>
          <CardContent className="text-center py-12">
            <TrendingUp className="h-12 w-12 animate-pulse mx-auto mb-4 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Generating Predictions
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Analyzing your data and creating personalized predictions...
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Predictions */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI Predictions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {predictions.map((prediction) => (
                <Card key={prediction.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          {getTypeIcon(prediction.type)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {prediction.title}
                          </h4>
                          {prediction.subject && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {prediction.subject}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge className={getRiskColor(prediction.riskLevel)}>
                        {prediction.riskLevel} risk
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {prediction.description}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Current</span>
                        <span className="text-sm font-medium">{prediction.currentValue}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Predicted</span>
                        <span className="text-sm font-medium">{prediction.predictedValue}%</span>
                      </div>
                      <Progress value={prediction.confidence * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Confidence</span>
                        <span>{Math.round(prediction.confidence * 100)}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {getTrendIcon(prediction.trend)}
                      <span className="text-sm capitalize">{prediction.trend}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Recommendations:</p>
                      <ul className="space-y-1">
                        {prediction.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                      onClick={() => onInterventionTriggered(prediction.title)}
                    >
                      Apply Recommendations
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trend Analysis */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Subject Trend Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendAnalysis.map((trend, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{trend.subject}</span>
                      <div className="flex items-center gap-1">
                        {trend.currentTrend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : trend.currentTrend === 'down' ? (
                          <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Predicted Grade</span>
                          <span>{trend.predictedGrade}%</span>
                        </div>
                        <Progress value={trend.predictedGrade} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Trend Strength</span>
                          <span>{trend.trendStrength}%</span>
                        </div>
                        <Progress value={trend.trendStrength} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Confidence</span>
                          <span>{Math.round(trend.confidence * 100)}%</span>
                        </div>
                        <Progress value={trend.confidence * 100} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Factors:</p>
                        <ul className="space-y-1">
                          {trend.factors.map((factor, idx) => (
                            <li key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Risk Assessment</h3>
            <div className="space-y-4">
              {riskAssessment.map((risk, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {risk.category}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {risk.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getRiskColor(risk.riskLevel)}>
                          {risk.riskLevel} risk
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {Math.round(risk.probability * 100)}% probability
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Risk Level</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm capitalize">{risk.riskLevel}</span>
                          <span className="text-sm capitalize">({risk.impact} impact)</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Mitigation Strategies:</p>
                        <ul className="space-y-1">
                          {risk.mitigationStrategies.map((strategy, idx) => (
                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                              {strategy}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700"
                        onClick={() => onInterventionTriggered(`Risk mitigation for ${risk.category}`)}
                      >
                        Implement Mitigation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
} 