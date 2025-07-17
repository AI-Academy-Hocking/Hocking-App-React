import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BookOpen, Target, CheckCircle, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface StudySession {
  id: string;
  subject: string;
  topic: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  priority: 'low' | 'medium' | 'high';
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  notes: string;
  goals: string[];
  completedGoals: string[];
}

interface StudyPlannerProps {
  sessions: StudySession[];
  onAddSession: (session: Omit<StudySession, 'id'>) => void;
  onUpdateSession: (id: string, updates: Partial<StudySession>) => void;
  onDeleteSession: (id: string) => void;
}

export function StudyPlanner({ 
  sessions, 
  onAddSession, 
  onUpdateSession, 
  onDeleteSession 
}: StudyPlannerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingSession, setEditingSession] = useState<StudySession | null>(null);
  const [newSession, setNewSession] = useState({
    subject: '',
    topic: '',
    description: '',
    date: new Date(),
    startTime: '',
    endTime: '',
    duration: 60,
    priority: 'medium' as const,
    notes: '',
    goals: [''] as string[]
  });

  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Computer Science', 'Business', 'Arts'];
  const priorities = ['low', 'medium', 'high'];

  const getPriorityColor = (priority: StudySession['priority']) => {
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

  const getStatusColor = (status: StudySession['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const getSessionsForDate = (date: Date) => {
    return sessions.filter(session => 
      session.date.toDateString() === date.toDateString()
    ).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getWeeklyStats = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    const weekSessions = sessions.filter(session => 
      session.date >= weekStart && session.date <= today
    );
    
    const completed = weekSessions.filter(s => s.status === 'completed').length;
    const total = weekSessions.length;
    const totalHours = weekSessions.reduce((sum, s) => sum + s.duration, 0) / 60;
    
    return { completed, total, totalHours };
  };

  const handleAddSession = () => {
    const session = {
      ...newSession,
      status: 'planned' as const,
      completedGoals: []
    };
    onAddSession(session);
    setNewSession({
      subject: '',
      topic: '',
      description: '',
      date: new Date(),
      startTime: '',
      endTime: '',
      duration: 60,
      priority: 'medium',
      notes: '',
      goals: ['']
    });
    setShowAddDialog(false);
  };

  const handleUpdateSession = () => {
    if (editingSession) {
      onUpdateSession(editingSession.id, editingSession);
      setEditingSession(null);
    }
  };

  const addGoal = () => {
    setNewSession(prev => ({
      ...prev,
      goals: [...prev.goals, '']
    }));
  };

  const removeGoal = (index: number) => {
    setNewSession(prev => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index)
    }));
  };

  const updateGoal = (index: number, value: string) => {
    setNewSession(prev => ({
      ...prev,
      goals: prev.goals.map((goal, i) => i === index ? value : goal)
    }));
  };

  const weeklyStats = getWeeklyStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Study Planner
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Organize your study sessions and track your progress
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Session
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Study Session</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                  <Select value={newSession.subject} onValueChange={(value) => setNewSession(prev => ({ ...prev, subject: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                  <Select value={newSession.priority} onValueChange={(value: any) => setNewSession(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map(priority => (
                        <SelectItem key={priority} value={priority}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Topic</label>
                <Input
                  value={newSession.topic}
                  onChange={(e) => setNewSession(prev => ({ ...prev, topic: e.target.value }))}
                  placeholder="e.g., Calculus Chapter 3"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <Textarea
                  value={newSession.description}
                  onChange={(e) => setNewSession(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="What will you study?"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                  <Input
                    type="date"
                    value={newSession.date.toISOString().split('T')[0]}
                    onChange={(e) => setNewSession(prev => ({ ...prev, date: new Date(e.target.value) }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Time</label>
                  <Input
                    type="time"
                    value={newSession.startTime}
                    onChange={(e) => setNewSession(prev => ({ ...prev, startTime: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration (min)</label>
                  <Input
                    type="number"
                    value={newSession.duration}
                    onChange={(e) => setNewSession(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Study Goals</label>
                <div className="space-y-2">
                  {newSession.goals.map((goal, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={goal}
                        onChange={(e) => updateGoal(index, e.target.value)}
                        placeholder={`Goal ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeGoal(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addGoal}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Goal
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
                <Textarea
                  value={newSession.notes}
                  onChange={(e) => setNewSession(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes..."
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSession}>
                  Add Session
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-blue-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400">Sessions This Week</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {weeklyStats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">Completed</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {weeklyStats.completed}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-400">Study Hours</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {weeklyStats.totalHours.toFixed(1)}h
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Date Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Study Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="w-48"
            />
          </div>
          
          <div className="space-y-3">
            {getSessionsForDate(selectedDate).length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No study sessions scheduled for this date</p>
              </div>
            ) : (
              getSessionsForDate(selectedDate).map((session) => (
                <Card key={session.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {session.topic}
                          </h4>
                          <Badge className={getPriorityColor(session.priority)}>
                            {session.priority}
                          </Badge>
                          <Badge className={getStatusColor(session.status)}>
                            {session.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {session.subject} • {session.startTime} - {session.endTime} ({session.duration} min)
                        </p>
                        {session.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {session.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingSession(session)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onDeleteSession(session.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {session.goals.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Goals:</p>
                        <div className="space-y-1">
                          {session.goals.map((goal, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle 
                                className={`h-4 w-4 ${
                                  session.completedGoals.includes(goal)
                                    ? 'text-green-600 fill-current'
                                    : 'text-gray-400'
                                }`} 
                              />
                              <span className={`text-sm ${
                                session.completedGoals.includes(goal)
                                  ? 'text-gray-500 line-through'
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}>
                                {goal}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {session.notes && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {session.notes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 