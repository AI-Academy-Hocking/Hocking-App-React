import React, { useState, useEffect } from 'react';
import { AIStudyAssistant } from '@/components/ai/AIStudyAssistant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface StudySession {
  id: string;
  subject: string;
  topic: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  performance: number;
  notes: string;
  timestamp: Date;
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

export default function AIStudyAssistantPage() {
  const [userId] = useState('user123'); // In real app, get from auth
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const mockSessions: StudySession[] = [
      {
        id: '1',
        subject: 'Mathematics',
        topic: 'Calculus Derivatives',
        duration: 90,
        difficulty: 'medium',
        performance: 85,
        notes: 'Good understanding of basic derivatives, need more practice with chain rule',
        timestamp: new Date('2024-01-15T14:00:00')
      },
      {
        id: '2',
        subject: 'Computer Science',
        topic: 'Data Structures',
        duration: 120,
        difficulty: 'hard',
        performance: 78,
        notes: 'Struggling with binary trees, need to review recursion',
        timestamp: new Date('2024-01-14T16:00:00')
      },
      {
        id: '3',
        subject: 'History',
        topic: 'World War II',
        duration: 60,
        difficulty: 'easy',
        performance: 92,
        notes: 'Excellent understanding of key events and dates',
        timestamp: new Date('2024-01-13T10:00:00')
      }
    ];

    const mockPaths: LearningPath[] = [
      {
        subject: 'Mathematics',
        topics: [
          {
            name: 'Calculus Fundamentals',
            difficulty: 'beginner',
            estimatedTime: 120,
            prerequisites: [],
            resources: ['Khan Academy', 'Calculus Textbook'],
            completed: true
          },
          {
            name: 'Derivatives and Applications',
            difficulty: 'intermediate',
            estimatedTime: 180,
            prerequisites: ['Calculus Fundamentals'],
            resources: ['MIT OpenCourseWare', 'Practice Problems'],
            completed: false
          }
        ],
        progress: 50,
        nextTopic: 'Derivatives and Applications'
      }
    ];

    setStudySessions(mockSessions);
    setLearningPaths(mockPaths);
  }, []);

  const handleGenerateRecommendation = () => {
    console.log('Generating new AI recommendation...');
  };

  const handleUpdateLearningPath = (path: LearningPath) => {
    setLearningPaths(prev => 
      prev.map(p => p.subject === path.subject ? path : p)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI Study Assistant
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your personalized AI tutor powered by machine learning
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Study Sessions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {studySessions.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">📚</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Average Performance</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(studySessions.reduce((sum, session) => sum + session.performance, 0) / studySessions.length)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">📈</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Learning Paths</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {learningPaths.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">🎯</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Study Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(studySessions.reduce((sum, session) => sum + session.duration, 0) / 60)}h
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">⏱️</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Study Assistant Component */}
      <AIStudyAssistant
        userId={userId}
        studySessions={studySessions}
        onGenerateRecommendation={handleGenerateRecommendation}
        onUpdateLearningPath={handleUpdateLearningPath}
      />

      {/* Recent Study Sessions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Study Sessions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studySessions.slice(0, 6).map((session) => (
            <Card key={session.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{session.subject}</span>
                  <Badge className={
                    session.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    session.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {session.difficulty}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Topic</p>
                    <p className="font-medium text-gray-900 dark:text-white">{session.topic}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Duration</span>
                    <span className="text-sm font-medium">{session.duration} min</span>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Performance</span>
                      <span>{session.performance}%</span>
                    </div>
                    <Progress value={session.performance} className="h-2" />
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Notes</p>
                    <p className="text-sm text-gray-900 dark:text-white">{session.notes}</p>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {session.timestamp.toLocaleDateString()} at {session.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 