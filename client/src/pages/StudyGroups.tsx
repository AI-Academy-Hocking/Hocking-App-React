import { useState } from 'react';
import { StudyGroupFinder } from '@/components/social/StudyGroupFinder';

// Mock data - in real app, this would come from API
const mockGroups = [
  {
    id: '1',
    name: 'Advanced Math Study Group',
    subject: 'Mathematics',
    description: 'Weekly study sessions for advanced calculus and linear algebra',
    members: 8,
    maxMembers: 12,
    meetingTime: '2:00 PM',
    meetingDays: ['Monday', 'Wednesday'],
    location: 'Library Study Room 3',
    difficulty: 'advanced' as const,
    tags: ['Calculus', 'Linear Algebra', 'Advanced'],
    rating: 4.8,
    isActive: true
  },
  {
    id: '2',
    name: 'Computer Science Beginners',
    subject: 'Computer Science',
    description: 'Introduction to programming concepts and problem solving',
    members: 15,
    maxMembers: 20,
    meetingTime: '4:00 PM',
    meetingDays: ['Tuesday', 'Thursday'],
    location: 'Computer Lab 2',
    difficulty: 'beginner' as const,
    tags: ['Programming', 'Python', 'Beginner'],
    rating: 4.5,
    isActive: true
  },
  {
    id: '3',
    name: 'Business Strategy Group',
    subject: 'Business',
    description: 'Case studies and business strategy discussions',
    members: 6,
    maxMembers: 10,
    meetingTime: '6:00 PM',
    meetingDays: ['Friday'],
    location: 'Business Building Room 105',
    difficulty: 'intermediate' as const,
    tags: ['Strategy', 'Case Studies', 'Business'],
    rating: 4.9,
    isActive: true
  },
  {
    id: '4',
    name: 'English Literature Circle',
    subject: 'English',
    description: 'Reading and discussing classic literature',
    members: 12,
    maxMembers: 15,
    meetingTime: '3:00 PM',
    meetingDays: ['Monday', 'Friday'],
    location: 'Library Quiet Room',
    difficulty: 'intermediate' as const,
    tags: ['Literature', 'Reading', 'Discussion'],
    rating: 4.7,
    isActive: true
  }
];

export default function StudyGroups() {
  const [groups, setGroups] = useState(mockGroups);

  const handleJoinGroup = (groupId: string) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, members: group.members + 1 }
        : group
    ));
    // In real app, this would make an API call
    console.log('Joined group:', groupId);
  };

  const handleCreateGroup = () => {
    // In real app, this would open a form or navigate to create group page
    console.log('Create new study group');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <StudyGroupFinder
        groups={groups}
        onJoinGroup={handleJoinGroup}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
} 