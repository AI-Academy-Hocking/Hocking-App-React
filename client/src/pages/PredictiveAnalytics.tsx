import React, { useState, useEffect } from 'react';
import { PredictiveAnalytics } from '@/components/ai/PredictiveAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface HistoricalData {
  grades: Array<{
    subject: string;
    grade: number;
    date: Date;
  }>;
  attendance: Array<{
    date: Date;
    present: boolean;
    subject: string;
  }>;
  assignments: Array<{
    title: string;
    dueDate: Date;
    submittedDate?: Date;
    grade?: number;
    subject: string;
  }>;
  studySessions: Array<{
    date: Date;
    duration: number;
    subject: string;
    effectiveness: number;
  }>;
}

export default function PredictiveAnalyticsPage() {
  const [userId] = useState('user123'); // In real app, get from auth
  const [historicalData, setHistoricalData] = useState<HistoricalData>({
    grades: [],
    attendance: [],
    assignments: [],
    studySessions: []
  });
  const [interventions, setInterventions] = useState<string[]>([]);

  // Mock historical data
  useEffect(() => {
    const mockData: HistoricalData = {
      grades: [
        { subject: 'Mathematics', grade: 85, date: new Date('2024-01-15') },
        { subject: 'Mathematics', grade: 88, date: new Date('2024-01-10') },
        { subject: 'Mathematics', grade: 82, date: new Date('2024-01-05') },
        { subject: 'Computer Science', grade: 92, date: new Date('2024-01-14') },
        { subject: 'Computer Science', grade: 89, date: new Date('2024-01-09') },
        { subject: 'History', grade: 78, date: new Date('2024-01-12') },
        { subject: 'History', grade: 75, date: new Date('2024-01-07') },
      ],
      attendance: [
        { date: new Date('2024-01-15'), present: true, subject: 'Mathematics' },
        { date: new Date('2024-01-14'), present: true, subject: 'Computer Science' },
        { date: new Date('2024-01-13'), present: false, subject: 'History' },
        { date: new Date('2024-01-12'), present: true, subject: 'History' },
        { date: new Date('2024-01-11'), present: true, subject: 'Mathematics' },
        { date: new Date('2024-01-10'), present: true, subject: 'Computer Science' },
      ],
      assignments: [
        { title: 'Calculus Problem Set 3', dueDate: new Date('2024-01-20'), submittedDate: new Date('2024-01-18'), grade: 88, subject: 'Mathematics' },
        { title: 'Programming Project', dueDate: new Date('2024-01-25'), subject: 'Computer Science' },
        { title: 'History Essay', dueDate: new Date('2024-01-22'), subject: 'History' },
        { title: 'Calculus Quiz', dueDate: new Date('2024-01-15'), submittedDate: new Date('2024-01-15'), grade: 85, subject: 'Mathematics' },
      ],
      studySessions: [
        { date: new Date('2024-01-15'), duration: 90, subject: 'Mathematics', effectiveness: 85 },
        { date: new Date('2024-01-14'), duration: 120, subject: 'Computer Science', effectiveness: 92 },
        { date: new Date('2024-01-13'), duration: 60, subject: 'History', effectiveness: 78 },
        { date: new Date('2024-01-12'), duration: 75, subject: 'Mathematics', effectiveness: 82 },
        { date: new Date('2024-01-11'), duration: 100, subject: 'Computer Science', effectiveness: 89 },
      ]
    };

    setHistoricalData(mockData);
  }, []);

  const handleInterventionTriggered = (intervention: string) => {
    setInterventions(prev => [...prev, intervention]);
    console.log('Intervention triggered:', intervention);
  };

  // Calculate summary statistics
  const averageGrade = historicalData.grades.length > 0 
    ? Math.round(historicalData.grades.reduce((sum, g) => sum + g.grade, 0) / historicalData.grades.length)
    : 0;

  const attendanceRate = historicalData.attendance.length > 0
    ? Math.round((historicalData.attendance.filter(a => a.present).length / historicalData.attendance.length) * 100)
    : 0;

  const assignmentCompletionRate = historicalData.assignments.length > 0
    ? Math.round((historicalData.assignments.filter(a => a.submittedDate).length / historicalData.assignments.length) * 100)
    : 0;

  const averageStudyEffectiveness = historicalData.studySessions.length > 0
    ? Math.round(historicalData.studySessions.reduce((sum, s) => sum + s.effectiveness, 0) / historicalData.studySessions.length)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Predictive Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          AI-powered insights and predictions for your academic success
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Average Grade</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {averageGrade}%
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {attendanceRate}%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Assignment Completion</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {assignmentCompletionRate}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Study Effectiveness</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {averageStudyEffectiveness}%
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Interventions */}
      {interventions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Interventions
          </h2>
          <div className="space-y-3">
            {interventions.slice(-3).map((intervention, index) => (
              <Alert key={index}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Intervention Applied:</strong> {intervention}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </div>
      )}

      {/* Predictive Analytics Component */}
      <PredictiveAnalytics
        userId={userId}
        historicalData={historicalData}
        onInterventionTriggered={handleInterventionTriggered}
      />

      {/* Data Summary */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Data Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Grade Trends by Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Mathematics', 'Computer Science', 'History'].map(subject => {
                  const subjectGrades = historicalData.grades.filter(g => g.subject === subject);
                  const avgGrade = subjectGrades.length > 0 
                    ? Math.round(subjectGrades.reduce((sum, g) => sum + g.grade, 0) / subjectGrades.length)
                    : 0;
                  
                  return (
                    <div key={subject}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{subject}</span>
                        <span>{avgGrade}%</span>
                      </div>
                      <Progress value={avgGrade} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Session Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Total Sessions</span>
                    <span>{historicalData.studySessions.length}</span>
                  </div>
                  <Progress value={(historicalData.studySessions.length / 20) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Average Duration</span>
                    <span>{Math.round(historicalData.studySessions.reduce((sum, s) => sum + s.duration, 0) / historicalData.studySessions.length)} min</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Effectiveness Trend</span>
                    <span>{averageStudyEffectiveness}%</span>
                  </div>
                  <Progress value={averageStudyEffectiveness} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 