import { useState } from 'react';
import { StudyPlanner as StudyPlannerComponent } from '@/components/study/StudyPlanner';

// Mock data - in real app, this would come from API
const mockSessions = [
  {
    id: '1',
    subject: 'Mathematics',
    topic: 'Calculus Chapter 3 - Derivatives',
    description: 'Review derivative rules and practice problems',
    date: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
    startTime: '14:00',
    endTime: '15:30',
    duration: 90,
    priority: 'high' as const,
    status: 'planned' as const,
    notes: 'Focus on chain rule and implicit differentiation',
    goals: ['Complete practice problems 1-10', 'Review chain rule examples', 'Watch Khan Academy video'],
    completedGoals: ['Watch Khan Academy video']
  },
  {
    id: '2',
    subject: 'Computer Science',
    topic: 'Data Structures - Linked Lists',
    description: 'Implement linked list operations in Python',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow
    startTime: '10:00',
    endTime: '11:30',
    duration: 90,
    priority: 'medium' as const,
    status: 'planned' as const,
    notes: 'Work on assignment due next week',
    goals: ['Implement Node class', 'Create LinkedList class', 'Test insert and delete methods'],
    completedGoals: []
  },
  {
    id: '3',
    subject: 'English',
    topic: 'Essay Writing - Research Paper',
    description: 'Work on research paper outline and thesis statement',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // Day after tomorrow
    startTime: '16:00',
    endTime: '17:00',
    duration: 60,
    priority: 'medium' as const,
    status: 'planned' as const,
    notes: 'Focus on developing strong thesis and organizing main points',
    goals: ['Write thesis statement', 'Create outline', 'Find 3 additional sources'],
    completedGoals: ['Find 3 additional sources']
  },
  {
    id: '4',
    subject: 'History',
    topic: 'World War II - Causes and Effects',
    description: 'Read assigned chapters and prepare for discussion',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    startTime: '09:00',
    endTime: '10:00',
    duration: 60,
    priority: 'low' as const,
    status: 'completed' as const,
    notes: 'Good discussion in class today',
    goals: ['Read chapters 15-16', 'Take notes on key events', 'Prepare discussion questions'],
    completedGoals: ['Read chapters 15-16', 'Take notes on key events', 'Prepare discussion questions']
  }
];

export default function StudyPlanner() {
  const [sessions, setSessions] = useState(mockSessions);

  const handleAddSession = (session: any) => {
    const newSession = {
      ...session,
      id: Date.now().toString(),
      status: 'planned' as const,
      completedGoals: []
    };
    setSessions(prev => [...prev, newSession]);
    // In real app, this would make an API call
    console.log('Add session:', newSession);
  };

  const handleUpdateSession = (id: string, updates: any) => {
    setSessions(prev => prev.map(session => 
      session.id === id 
        ? { ...session, ...updates }
        : session
    ));
    // In real app, this would make an API call
    console.log('Update session:', id, updates);
  };

  const handleDeleteSession = (id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id));
    // In real app, this would make an API call
    console.log('Delete session:', id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <StudyPlannerComponent
        sessions={sessions}
        onAddSession={handleAddSession}
        onUpdateSession={handleUpdateSession}
        onDeleteSession={handleDeleteSession}
      />
    </div>
  );
} 