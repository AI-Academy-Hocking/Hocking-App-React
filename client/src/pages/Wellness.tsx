import React, { useState } from 'react';
import { WellnessTracker } from '@/components/wellness/WellnessTracker';

// Mock data - in real app, this would come from API
const mockActivities = [
  {
    id: '1',
    type: 'sleep' as const,
    name: 'Sleep',
    description: 'Track your sleep hours for better rest',
    target: 8,
    current: 7,
    unit: 'hours',
    icon: () => <span>😴</span>,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    id: '2',
    type: 'exercise' as const,
    name: 'Exercise',
    description: 'Physical activity and workouts',
    target: 30,
    current: 25,
    unit: 'minutes',
    icon: () => <span>💪</span>,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    id: '3',
    type: 'nutrition' as const,
    name: 'Water Intake',
    description: 'Stay hydrated throughout the day',
    target: 8,
    current: 6,
    unit: 'glasses',
    icon: () => <span>💧</span>,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30'
  },
  {
    id: '4',
    type: 'social' as const,
    name: 'Social Time',
    description: 'Connect with friends and family',
    target: 60,
    current: 45,
    unit: 'minutes',
    icon: () => <span>👥</span>,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    id: '5',
    type: 'study' as const,
    name: 'Study Time',
    description: 'Focused academic work',
    target: 120,
    current: 90,
    unit: 'minutes',
    icon: () => <span>📚</span>,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30'
  },
  {
    id: '6',
    type: 'mindfulness' as const,
    name: 'Mindfulness',
    description: 'Meditation and relaxation',
    target: 15,
    current: 10,
    unit: 'minutes',
    icon: () => <span>🧘</span>,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100 dark:bg-pink-900/30'
  }
];

export default function Wellness() {
  const [activities, setActivities] = useState(mockActivities);

  const handleUpdateActivity = (id: string, value: number) => {
    setActivities(prev => prev.map(activity => 
      activity.id === id 
        ? { ...activity, current: Math.max(0, value) }
        : activity
    ));
    // In real app, this would make an API call
    console.log('Update activity:', id, value);
  };

  const handleAddActivity = (activity: any) => {
    const newActivity = {
      ...activity,
      id: Date.now().toString(),
      current: 0
    };
    setActivities(prev => [...prev, newActivity]);
    // In real app, this would make an API call
    console.log('Add activity:', newActivity);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <WellnessTracker
        activities={activities}
        onUpdateActivity={handleUpdateActivity}
        onAddActivity={handleAddActivity}
      />
    </div>
  );
} 