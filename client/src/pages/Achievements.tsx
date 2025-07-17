import React, { useState } from 'react';
import { BadgeSystem, BadgeData } from '@/components/achievements/BadgeSystem';
import { Award, Star, Trophy, Target, Users, BookOpen, Home, Heart } from 'lucide-react';

// Mock data - in real app, this would come from API
const mockBadges: BadgeData[] = [
  {
    id: '1',
    name: 'Week Warrior',
    description: 'Complete your first week of classes',
    category: 'academic',
    icon: Award,
    criteria: ['Attend 5 classes', 'Complete first assignment'],
    unlocked: true,
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    rarity: 'common'
  },
  {
    id: '2',
    name: 'Social Butterfly',
    description: 'Join 3 study groups or clubs',
    category: 'social',
    icon: Users,
    criteria: ['Join 3 groups', 'Attend 5 meetings'],
    unlocked: false,
    progress: 2,
    maxProgress: 3,
    rarity: 'rare'
  },
  {
    id: '3',
    name: 'Housing Hero',
    description: 'Complete all housing requirements',
    category: 'housing',
    icon: Home,
    criteria: ['Submit application', 'Complete orientation', 'Move in'],
    unlocked: true,
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    rarity: 'epic'
  },
  {
    id: '4',
    name: 'Wellness Champion',
    description: 'Maintain wellness streak for 30 days',
    category: 'wellness',
    icon: Heart,
    criteria: ['Log wellness activities', '30 day streak'],
    unlocked: false,
    progress: 15,
    maxProgress: 30,
    rarity: 'legendary'
  },
  {
    id: '5',
    name: 'Study Master',
    description: 'Complete 50 study sessions',
    category: 'academic',
    icon: BookOpen,
    criteria: ['Complete 50 sessions', 'Maintain 80% completion rate'],
    unlocked: false,
    progress: 35,
    maxProgress: 50,
    rarity: 'rare'
  },
  {
    id: '6',
    name: 'Career Explorer',
    description: 'Attend 5 career events',
    category: 'career',
    icon: Target,
    criteria: ['Attend career fair', 'Join 3 networking events', 'Complete resume workshop'],
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    rarity: 'epic'
  },
  {
    id: '7',
    name: 'Perfect Attendance',
    description: 'Attend all classes for a full semester',
    category: 'academic',
    icon: Star,
    criteria: ['No absences', 'Complete semester'],
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: 'legendary'
  },
  {
    id: '8',
    name: 'Community Leader',
    description: 'Organize 3 campus events',
    category: 'social',
    icon: Users,
    criteria: ['Organize events', 'Get 20+ attendees'],
    unlocked: false,
    progress: 1,
    maxProgress: 3,
    rarity: 'epic'
  },
  {
    id: '9',
    name: 'Fitness Fanatic',
    description: 'Exercise for 30 days straight',
    category: 'wellness',
    icon: Heart,
    criteria: ['30 day exercise streak', 'Log all activities'],
    unlocked: false,
    progress: 12,
    maxProgress: 30,
    rarity: 'rare'
  },
  {
    id: '10',
    name: 'Academic Excellence',
    description: 'Maintain 4.0 GPA for a semester',
    category: 'academic',
    icon: Trophy,
    criteria: ['4.0 GPA', 'Complete semester'],
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: 'legendary'
  },
  {
    id: '11',
    name: 'Roommate Matchmaker',
    description: 'Successfully match 5 roommates',
    category: 'housing',
    icon: Home,
    criteria: ['Match 5 pairs', 'Both parties satisfied'],
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    rarity: 'rare'
  },
  {
    id: '12',
    name: 'Study Group Founder',
    description: 'Create and maintain a study group',
    category: 'social',
    icon: Users,
    criteria: ['Create group', 'Maintain 5+ members', 'Hold 10+ sessions'],
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: 'epic'
  }
];

export default function Achievements() {
  const [badges, setBadges] = useState(mockBadges);

  const handleBadgeClick = (badge: BadgeData) => {
    // In real app, this might show a detailed view or trigger an action
    console.log('Badge clicked:', badge);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BadgeSystem 
        badges={badges}
        onBadgeClick={handleBadgeClick}
      />
    </div>
  );
} 