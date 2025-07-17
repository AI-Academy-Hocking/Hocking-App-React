import React, { useState, useEffect } from 'react';
import { Brain, BookOpen, Target, TrendingUp, MessageSquare, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StudySession {
  id: string;
  subject: string;
  topic: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  performance: number; // 0-100
  notes: string;
  timestamp: Date;
}

interface AIRecommendation {
  id: string;
  type: 'study_method' | 'time_management' | 'resource' | 'practice' | 'review';
  title: string;
  description: string;
  confidence: number;
  reasoning: string;
  actionItems: string[];
  estimatedImpact: 'low' | 'medium' | 'high';
}

interface LearningPath {
  subject: string;
  topics: Array<{
    name: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number;
    prerequisites: string[];
    resources: string[];
    completed: boolean;
  }>;
  progress: number;
  nextTopic: string;
}

interface AIStudyAssistantProps {
  userId: string;
  studySessions: StudySession[];
  onGenerateRecommendation: () => void;
  onUpdateLearningPath: (path: LearningPath) => void;
}

export function AIStudyAssistant({ 
  userId, 
  studySessions, 
  onGenerateRecommendation, 
  onUpdateLearningPath 
}: AIStudyAssistantProps) {
  const [currentTab, setCurrentTab] = useState('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'ai'; content: string; timestamp: Date }>>([]);

  // Analyze study patterns and generate AI insights
  const analyzeStudyPatterns = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const patterns = {
      bestTime: '2:00 PM - 4:00 PM',
      preferredDuration: 90,
      strongestSubject: 'Mathematics',
      weakestSubject: 'History',
      studyStyle: 'Visual learner',
      attentionSpan: 45,
    };
    
    const aiRecommendations: AIRecommendation[] = [
      {
        id: '1',
        type: 'study_method',
        title: 'Implement Pomodoro Technique',
        description: 'Your attention span analysis shows you work best in 45-minute focused sessions.',
        confidence: 0.89,
        reasoning: 'Based on your study session data, you show higher performance in sessions under 50 minutes.',
        actionItems: [
          'Set timer for 45-minute work sessions',
          'Take 15-minute breaks between sessions',
          'Use visual timers for better focus'
        ],
        estimatedImpact: 'high'
      },
      {
        id: '2',
        type: 'time_management',
        title: 'Optimize Study Schedule',
        description: 'Schedule study sessions during your peak performance hours (2:00 PM - 4:00 PM).',
        confidence: 0.76,
        reasoning: 'Analysis of your performance data shows 23% better results during afternoon sessions.',
        actionItems: [
          'Move important study sessions to afternoon',
          'Reserve morning for lighter tasks',
          'Avoid late-night study sessions'
        ],
        estimatedImpact: 'medium'
      },
      {
        id: '3',
        type: 'resource',
        title: 'Add Visual Learning Resources',
        description: 'Your learning style analysis indicates you benefit from visual aids.',
        confidence: 0.82,
        reasoning: 'Performance improves by 34% when visual elements are included in study materials.',
        actionItems: [
          'Use mind maps for complex topics',
          'Watch educational videos',
          'Create visual summaries'
        ],
        estimatedImpact: 'high'
      }
    ];
    
    setRecommendations(aiRecommendations);
    setIsAnalyzing(false);
  };

  // Generate personalized learning paths
  const generateLearningPaths = () => {
    const paths: LearningPath[] = [
      {
        subject: 'Mathematics',
        topics: [
          {
            name: 'Calculus Fundamentals',
            difficulty: 'beginner',
            estimatedTime: 120,
            prerequisites: [],
            resources: ['Khan Academy', 'Calculus Textbook', 'Practice Problems'],
            completed: false
          },
          {
            name: 'Derivatives and Applications',
            difficulty: 'intermediate',
            estimatedTime: 180,
            prerequisites: ['Calculus Fundamentals'],
            resources: ['MIT OpenCourseWare', 'Derivative Calculator'],
            completed: false
          },
          {
            name: 'Integration Techniques',
            difficulty: 'advanced',
            estimatedTime: 240,
            prerequisites: ['Derivatives and Applications'],
            resources: ['Advanced Calculus Book', 'Integration Practice'],
            completed: false
          }
        ],
        progress: 35,
        nextTopic: 'Derivatives and Applications'
      },
      {
        subject: 'Computer Science',
        topics: [
          {
            name: 'Programming Basics',
            difficulty: 'beginner',
            estimatedTime: 90,
            prerequisites: [],
            resources: ['Codecademy', 'Python Documentation'],
            completed: true
          },
          {
            name: 'Data Structures',
            difficulty: 'intermediate',
            estimatedTime: 150,
            prerequisites: ['Programming Basics'],
            resources: ['LeetCode', 'Data Structures Book'],
            completed: false
          }
        ],
        progress: 60,
        nextTopic: 'Data Structures'
      }
    ];
    
    setLearningPaths(paths);
  };

  // AI Chat functionality
  const sendMessage = async () => {
    if (!chatMessage.trim()) return;
    
    const userMessage = { role: 'user' as const, content: chatMessage, timestamp: new Date() };
    setChatHistory(prev => [...prev, userMessage]);
    setChatMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(chatMessage);
      const aiMessage = { role: 'ai' as const, content: aiResponse, timestamp: new Date() };
      setChatHistory(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const generateAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('study') && lowerMessage.includes('help')) {
      return "I can help you optimize your study routine! Based on your data, I recommend studying in 45-minute sessions during 2-4 PM. Would you like me to create a personalized study schedule?";
    }
    
    if (lowerMessage.includes('math') || lowerMessage.includes('calculus')) {
      return "I see you're working on calculus. Your performance in derivatives is strong, but integration needs more practice. I recommend spending 30 minutes daily on integration problems.";
    }
    
    if (lowerMessage.includes('schedule') || lowerMessage.includes('time')) {
      return "Your optimal study times are 2-4 PM and 7-9 PM. I suggest scheduling your most challenging subjects during these peak hours for maximum effectiveness.";
    }
    
    return "I'm here to help with your studies! You can ask me about study strategies, time management, specific subjects, or request personalized recommendations.";
  };

  useEffect(() => {
    analyzeStudyPatterns();
    generateLearningPaths();
  }, [studySessions]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-purple-600">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
          <CardTitle className="flex items-center text-purple-800 dark:text-purple-200">
            <Brain className="mr-2 h-5 w-5" />
            AI Study Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-purple-700 dark:text-purple-300">
            Your personalized AI tutor that analyzes your study patterns and provides intelligent recommendations.
          </p>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recommendations">AI Insights</TabsTrigger>
          <TabsTrigger value="learning-paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Study Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Study Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isAnalyzing ? (
                  <div className="text-center py-8">
                    <Brain className="h-8 w-8 animate-pulse mx-auto mb-2 text-purple-600" />
                    <p className="text-sm text-gray-600">Analyzing your study patterns...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Best Study Time</span>
                      <Badge className="bg-green-100 text-green-800">2:00 PM - 4:00 PM</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Optimal Session Length</span>
                      <Badge className="bg-blue-100 text-blue-800">45 minutes</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Learning Style</span>
                      <Badge className="bg-purple-100 text-purple-800">Visual</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Strongest Subject</span>
                      <Badge className="bg-green-100 text-green-800">Mathematics</Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Progress Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Progress</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Study Consistency</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Goal Achievement</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="space-y-4">
            {recommendations.map((recommendation) => (
              <Card key={recommendation.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {recommendation.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {recommendation.description}
                        </p>
                      </div>
                    </div>
                    <Badge className={`${
                      recommendation.estimatedImpact === 'high' ? 'bg-red-100 text-red-800' :
                      recommendation.estimatedImpact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {recommendation.estimatedImpact} impact
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <strong>AI Reasoning:</strong> {recommendation.reasoning}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Confidence:</span>
                      <Progress value={recommendation.confidence * 100} className="h-1 flex-1" />
                      <span className="text-xs text-gray-500">{Math.round(recommendation.confidence * 100)}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Action Items:</p>
                    <ul className="space-y-1">
                      {recommendation.actionItems.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                    Apply Recommendation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="learning-paths" className="space-y-6">
          <div className="space-y-4">
            {learningPaths.map((path) => (
              <Card key={path.subject} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{path.subject}</span>
                    <Badge className="bg-blue-100 text-blue-800">
                      {path.progress}% Complete
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={path.progress} className="h-2" />
                    
                    <div className="space-y-3">
                      {path.topics.map((topic, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {topic.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {topic.estimatedTime} minutes • {topic.difficulty}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={
                              topic.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }>
                              {topic.completed ? 'Completed' : 'Pending'}
                            </Badge>
                            {!topic.completed && path.nextTopic === topic.name && (
                              <Badge className="bg-purple-100 text-purple-800">Next</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Continue Learning Path
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                AI Study Assistant Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Chat History */}
                <div className="h-64 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2" />
                      <p>Start a conversation with your AI study assistant!</p>
                    </div>
                  ) : (
                    chatHistory.map((message, index) => (
                      <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs p-3 rounded-lg ${
                          message.role === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                {/* Chat Input */}
                <div className="flex gap-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Ask me about study strategies, time management, or specific subjects..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage} className="bg-purple-600 hover:bg-purple-700">
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 