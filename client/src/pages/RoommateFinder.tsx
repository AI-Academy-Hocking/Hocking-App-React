import { useState } from 'react';
import { RoommateFinder as RoommateFinderComponent } from '@/components/housing/RoommateFinder';

// Mock data - in real app, this would come from API
const mockRoommates = [
  {
    id: '1',
    name: 'Alex Johnson',
    age: 19,
    major: 'Computer Science',
    year: 'sophomore' as const,
    dormPreference: 'East Hall',
    budget: '$800-1000/month',
    lifestyle: {
      sleepSchedule: 'early' as const,
      studyHabits: 'quiet' as const,
      cleanliness: 'very-clean' as const,
      socialLevel: 'moderate' as const
    },
    interests: ['Programming', 'Gaming', 'Music'],
    compatibility: 95,
    isLiked: false,
    isMatched: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 30),
    bio: 'Looking for a quiet roommate who values cleanliness and study time. I\'m usually up early and like to keep things organized.'
  },
  {
    id: '2',
    name: 'Jordan Smith',
    age: 20,
    major: 'Business Administration',
    year: 'junior' as const,
    dormPreference: 'West Hall',
    budget: '$700-900/month',
    lifestyle: {
      sleepSchedule: 'flexible' as const,
      studyHabits: 'music' as const,
      cleanliness: 'clean' as const,
      socialLevel: 'social' as const
    },
    interests: ['Business', 'Networking', 'Sports'],
    compatibility: 87,
    isLiked: true,
    isMatched: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2),
    bio: 'Outgoing business student who loves meeting new people. I study with music on and enjoy hosting small gatherings.'
  },
  {
    id: '3',
    name: 'Taylor Wilson',
    age: 18,
    major: 'Psychology',
    year: 'freshman' as const,
    dormPreference: 'North Hall',
    budget: '$600-800/month',
    lifestyle: {
      sleepSchedule: 'late' as const,
      studyHabits: 'flexible' as const,
      cleanliness: 'moderate' as const,
      socialLevel: 'quiet' as const
    },
    interests: ['Psychology', 'Reading', 'Art'],
    compatibility: 72,
    isLiked: false,
    isMatched: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24),
    bio: 'Quiet psychology major who enjoys reading and art. I\'m a night owl and prefer a calm environment.'
  },
  {
    id: '4',
    name: 'Casey Brown',
    age: 21,
    major: 'Engineering',
    year: 'senior' as const,
    dormPreference: 'University Apartments',
    budget: '$900-1200/month',
    lifestyle: {
      sleepSchedule: 'early' as const,
      studyHabits: 'quiet' as const,
      cleanliness: 'very-clean' as const,
      socialLevel: 'moderate' as const
    },
    interests: ['Engineering', 'Robotics', 'Fitness'],
    compatibility: 89,
    isLiked: false,
    isMatched: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 12),
    bio: 'Engineering senior focused on academics and fitness. I need a clean, quiet space to study and work on projects.'
  },
  {
    id: '5',
    name: 'Riley Davis',
    age: 19,
    major: 'Communications',
    year: 'sophomore' as const,
    dormPreference: 'South Hall',
    budget: '$700-900/month',
    lifestyle: {
      sleepSchedule: 'flexible' as const,
      studyHabits: 'music' as const,
      cleanliness: 'clean' as const,
      socialLevel: 'very-social' as const
    },
    interests: ['Communications', 'Social Media', 'Photography'],
    compatibility: 68,
    isLiked: false,
    isMatched: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 6),
    bio: 'Extroverted communications major who loves social media and photography. I enjoy hosting friends and being active.'
  }
];

export default function RoommateFinder() {
  const [roommates, setRoommates] = useState(mockRoommates);

  const handleLikeRoommate = (roommateId: string) => {
    setRoommates(prev => prev.map(roommate => 
      roommate.id === roommateId 
        ? { ...roommate, isLiked: !roommate.isLiked }
        : roommate
    ));
    // In real app, this would make an API call
    console.log('Like roommate:', roommateId);
  };

  const handleMessageRoommate = (roommateId: string) => {
    // In real app, this would open messaging interface
    console.log('Message roommate:', roommateId);
  };

  const handleMatchRoommate = (roommateId: string) => {
    setRoommates(prev => prev.map(roommate => 
      roommate.id === roommateId 
        ? { ...roommate, isMatched: !roommate.isMatched }
        : roommate
    ));
    // In real app, this would make an API call
    console.log('Match roommate:', roommateId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <RoommateFinderComponent
        roommates={roommates}
        onLikeRoommate={handleLikeRoommate}
        onMessageRoommate={handleMessageRoommate}
        onMatchRoommate={handleMatchRoommate}
      />
    </div>
  );
} 