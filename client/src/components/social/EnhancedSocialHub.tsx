import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Clock, 
  BookOpen, 
  Heart, 
  MessageCircle, 
  Share2, 
  Plus, 
  Search, 
  Filter,
  Star,
  Trophy,
  Camera,
  Video,
  Smile,
  Send,
  MoreHorizontal,
  UserPlus,
  CheckCircle,
  X,
  Bell,
  TrendingUp,
  Users2,
  GraduationCap,
  Coffee,
  Music,
  Gamepad2,
  Palette,
  Code,
  Globe,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  description: string;
  members: number;
  maxMembers: number;
  meetingTime: string;
  location: string;
  tags: string[];
  createdBy: {
    name: string;
    avatar: string;
    level: number;
  };
  isJoined: boolean;
}

interface CampusEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  category: string;
  image: string;
  isRSVPd: boolean;
  organizer: {
    name: string;
    avatar: string;
  };
}

interface CampusStory {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: number;
  };
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

interface CommunityChallenge {
  id: string;
  title: string;
  description: string;
  theme: string;
  participants: number;
  endDate: string;
  reward: string;
  isParticipating: boolean;
}

const studyGroups: StudyGroup[] = [
  {
    id: '1',
    name: 'Math Study Squad',
    subject: 'Calculus',
    description: 'Weekly study sessions for Calculus 101. All skill levels welcome!',
    members: 8,
    maxMembers: 12,
    meetingTime: 'Every Tuesday, 6:00 PM',
    location: 'Library Study Room A',
    tags: ['Math', 'Calculus', 'Study Group'],
    createdBy: {
      name: 'Sarah Chen',
      avatar: '/api/placeholder/40/40',
      level: 12
    },
    isJoined: false
  },
  {
    id: '2',
    name: 'Programming Partners',
    subject: 'Computer Science',
    description: 'Code together, learn together! Working on Python and JavaScript projects.',
    members: 5,
    maxMembers: 8,
    meetingTime: 'Every Thursday, 7:00 PM',
    location: 'Computer Lab 3',
    tags: ['Programming', 'Python', 'JavaScript'],
    createdBy: {
      name: 'Alex Rodriguez',
      avatar: '/api/placeholder/40/40',
      level: 15
    },
    isJoined: true
  },
  {
    id: '3',
    name: 'Literature Circle',
    subject: 'English',
    description: 'Discussing classic literature and improving writing skills.',
    members: 6,
    maxMembers: 10,
    meetingTime: 'Every Friday, 5:00 PM',
    location: 'Student Center Lounge',
    tags: ['English', 'Literature', 'Writing'],
    createdBy: {
      name: 'Emma Wilson',
      avatar: '/api/placeholder/40/40',
      level: 9
    },
    isJoined: false
  }
];

const campusEvents: CampusEvent[] = [
  {
    id: '1',
    title: 'Spring Campus Festival',
    description: 'Join us for a day of music, food, and fun! Live bands, food trucks, and activities for everyone.',
    date: '2024-04-15',
    time: '12:00 PM - 8:00 PM',
    location: 'Main Campus Green',
    attendees: 45,
    maxAttendees: 100,
    category: 'Festival',
    image: '/api/placeholder/300/200',
    isRSVPd: false,
    organizer: {
      name: 'Student Activities Board',
      avatar: '/api/placeholder/40/40'
    }
  },
  {
    id: '2',
    title: 'Career Fair 2024',
    description: 'Connect with top employers and discover internship opportunities.',
    date: '2024-04-20',
    time: '10:00 AM - 4:00 PM',
    location: 'Student Center Ballroom',
    attendees: 78,
    maxAttendees: 150,
    category: 'Career',
    image: '/api/placeholder/300/200',
    isRSVPd: true,
    organizer: {
      name: 'Career Services',
      avatar: '/api/placeholder/40/40'
    }
  },
  {
    id: '3',
    title: 'Movie Night: Outdoor Cinema',
    description: 'Watch a classic movie under the stars! Bring blankets and snacks.',
    date: '2024-04-18',
    time: '8:00 PM - 10:30 PM',
    location: 'Campus Amphitheater',
    attendees: 32,
    maxAttendees: 80,
    category: 'Entertainment',
    image: '/api/placeholder/300/200',
    isRSVPd: false,
    organizer: {
      name: 'Film Club',
      avatar: '/api/placeholder/40/40'
    }
  }
];

const campusStories: CampusStory[] = [
  {
    id: '1',
    user: {
      name: 'Mike Johnson',
      avatar: '/api/placeholder/40/40',
      level: 7
    },
    content: 'Just finished my final presentation! Feeling accomplished 🎉',
    media: {
      type: 'image',
      url: '/api/placeholder/300/200'
    },
    likes: 24,
    comments: 8,
    timestamp: '2 hours ago',
    isLiked: false
  },
  {
    id: '2',
    user: {
      name: 'Lisa Park',
      avatar: '/api/placeholder/40/40',
      level: 11
    },
    content: 'Beautiful sunset from the library window. Perfect study vibes ✨',
    media: {
      type: 'image',
      url: '/api/placeholder/300/200'
    },
    likes: 18,
    comments: 5,
    timestamp: '4 hours ago',
    isLiked: true
  },
  {
    id: '3',
    user: {
      name: 'David Kim',
      avatar: '/api/placeholder/40/40',
      level: 5
    },
    content: 'Study group session was amazing! Thanks everyone for the help with calculus 📚',
    likes: 12,
    comments: 3,
    timestamp: '6 hours ago',
    isLiked: false
  }
];

const communityChallenges: CommunityChallenge[] = [
  {
    id: '1',
    title: 'April Wellness Challenge',
    description: 'Complete 30 days of wellness activities and earn exclusive rewards!',
    theme: 'Wellness',
    participants: 156,
    endDate: '2024-04-30',
    reward: 'Wellness Champion Badge + 500 XP',
    isParticipating: true
  },
  {
    id: '2',
    title: 'Study Streak Challenge',
    description: 'Maintain a 7-day study streak and unlock special study resources.',
    theme: 'Academic',
    participants: 89,
    endDate: '2024-04-25',
    reward: 'Study Master Badge + 300 XP',
    isParticipating: false
  },
  {
    id: '3',
    title: 'Community Service Month',
    description: 'Participate in community service activities and make a difference!',
    theme: 'Service',
    participants: 67,
    endDate: '2024-04-30',
    reward: 'Community Hero Badge + 400 XP',
    isParticipating: false
  }
];

export default function EnhancedSocialHub() {
  const [activeTab, setActiveTab] = useState<'groups' | 'events' | 'stories' | 'challenges'>('groups');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [newStoryContent, setNewStoryContent] = useState('');
  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'All', icon: <Globe className="h-4 w-4" /> },
    { id: 'academic', name: 'Academic', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'social', name: 'Social', icon: <Users className="h-4 w-4" /> },
    { id: 'career', name: 'Career', icon: <GraduationCap className="h-4 w-4" /> },
    { id: 'entertainment', name: 'Entertainment', icon: <Music className="h-4 w-4" /> },
    { id: 'wellness', name: 'Wellness', icon: <Heart className="h-4 w-4" /> }
  ];

  const joinStudyGroup = (groupId: string) => {
    toast({
      title: "Joined Study Group! 📚",
      description: "You've successfully joined the study group. Check your notifications for meeting details.",
    });
  };

  const rsvpToEvent = (eventId: string) => {
    toast({
      title: "RSVP Confirmed! ✅",
      description: "You're all set for the event. We'll send you a reminder closer to the date.",
    });
  };

  const likeStory = (storyId: string) => {
    toast({
      title: "Story Liked! ❤️",
      description: "Thanks for showing support to your fellow students!",
    });
  };

  const joinChallenge = (challengeId: string) => {
    toast({
      title: "Challenge Accepted! 🏆",
      description: "You're now participating in the challenge. Good luck!",
    });
  };

  const createStory = () => {
    if (newStoryContent.trim()) {
      toast({
        title: "Story Posted! 📱",
        description: "Your campus story has been shared with the community.",
      });
      setNewStoryContent('');
      setShowCreateStory(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'groups':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Study Groups</h2>
              <Button onClick={() => setShowCreateGroup(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Group
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyGroups.map((group) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <Badge variant={group.isJoined ? "default" : "secondary"}>
                          {group.isJoined ? 'Joined' : 'Open'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{group.subject}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-700">{group.description}</p>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {group.meetingTime}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {group.location}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={group.createdBy.avatar} />
                            <AvatarFallback className="text-xs">
                              {group.createdBy.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">{group.createdBy.name}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {group.members}/{group.maxMembers} members
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {group.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button 
                        onClick={() => joinStudyGroup(group.id)}
                        className="w-full"
                        variant={group.isJoined ? "outline" : "default"}
                      >
                        {group.isJoined ? 'Leave Group' : 'Join Group'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Campus Events</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campusEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2">
                        {event.category}
                      </Badge>
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {event.date} at {event.time}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={event.organizer.avatar} />
                            <AvatarFallback className="text-xs">
                              {event.organizer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">{event.organizer.name}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {event.attendees}/{event.maxAttendees} attending
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => rsvpToEvent(event.id)}
                        className="w-full"
                        variant={event.isRSVPd ? "outline" : "default"}
                      >
                        {event.isRSVPd ? 'Cancel RSVP' : 'RSVP'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'stories':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Campus Stories</h2>
              <Button onClick={() => setShowCreateStory(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Share Story
              </Button>
            </div>
            
            <div className="space-y-6">
              {campusStories.map((story) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={story.user.avatar} />
                            <AvatarFallback>
                              {story.user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{story.user.name}</div>
                            <div className="text-sm text-gray-600">Level {story.user.level} • {story.timestamp}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-800">{story.content}</p>
                      
                      {story.media && (
                        <div className="rounded-lg overflow-hidden">
                          {story.media.type === 'image' ? (
                            <img 
                              src={story.media.url} 
                              alt="Story content"
                              className="w-full h-64 object-cover"
                            />
                          ) : (
                            <video 
                              src={story.media.url} 
                              controls
                              className="w-full h-64 object-cover"
                            />
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => likeStory(story.id)}
                            className={`flex items-center gap-2 ${story.isLiked ? 'text-red-500' : ''}`}
                          >
                            <Heart className={`h-4 w-4 ${story.isLiked ? 'fill-current' : ''}`} />
                            {story.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            {story.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'challenges':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Community Challenges</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityChallenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        <Badge variant={challenge.isParticipating ? "default" : "secondary"}>
                          {challenge.isParticipating ? 'Participating' : 'Join'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{challenge.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Trophy className="h-4 w-4" />
                        {challenge.theme}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        {challenge.participants} participants
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        Ends {challenge.endDate}
                      </div>
                      
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="text-sm font-medium text-yellow-800">Reward:</div>
                        <div className="text-sm text-yellow-700">{challenge.reward}</div>
                      </div>
                      
                      <Button 
                        onClick={() => joinChallenge(challenge.id)}
                        className="w-full"
                        variant={challenge.isParticipating ? "outline" : "default"}
                      >
                        {challenge.isParticipating ? 'Leave Challenge' : 'Join Challenge'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Social Hub</h1>
        <p className="text-gray-600 dark:text-gray-300">Connect with fellow students, join study groups, and stay updated with campus life</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search groups, events, or stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'groups', name: 'Study Groups', icon: <Users className="h-4 w-4" /> },
          { id: 'events', name: 'Events', icon: <Calendar className="h-4 w-4" /> },
          { id: 'stories', name: 'Stories', icon: <Camera className="h-4 w-4" /> },
          { id: 'challenges', name: 'Challenges', icon: <Trophy className="h-4 w-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Create Story Modal */}
      <AnimatePresence>
        {showCreateStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Share Your Story</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateStory(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <Textarea
                  placeholder="What's happening on campus today?"
                  value={newStoryContent}
                  onChange={(e) => setNewStoryContent(e.target.value)}
                  rows={4}
                />
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Photo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4 mr-2" />
                    Video
                  </Button>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateStory(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={createStory}>
                    <Send className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 