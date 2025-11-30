import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Calendar, 
  MapPin, 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  MoreHorizontal,
  Send,
  Image,
  Video,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Trophy,
  Star,
  TrendingUp,
  Award,
  ThumbsUp,
  MessageCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: 'student' | 'faculty';
  dormBuilding: string;
  roomNumber: string;
  program: string;
  username: string;
  isVerified: boolean;
  avatar?: string;
  rank: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  points: number;
  loginStreak: number;
  postsCount: number;
}

interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
  likes: number;
}

interface Post {
  id: string;
  type: 'text' | 'image' | 'video' | 'poll' | 'event' | 'alert' | 'vote';
  content: string;
  author: User;
  category: string;
  hashtags: string[];
  emoji?: string;
  pollOptions?: { text: string; votes: number; voters: string[] }[];
  eventDetails?: {
    date: string;
    time: string;
    location: string;
    description: string;
  };
  image?: string;
  video?: string;
  likes: number;
  comments: Comment[];
  shares: number;
  createdAt: Date;
  isLiked: boolean;
  isShared: boolean;
  isVoted?: boolean;
  voteOption?: string;
}

const CampusSocialHub: React.FC = () => {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showRankings, setShowRankings] = useState(false);
  const [commentText, setCommentText] = useState('');

  // Demo user data with ranking system
  const demoUser: User = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@hocking.edu',
    userType: 'student',
    dormBuilding: 'East Hall',
    roomNumber: '205',
    program: 'Computer Science',
    username: 'johndoe2024',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rank: 'Gold',
    points: 1250,
    loginStreak: 7,
    postsCount: 23
  };

  const topUsers: User[] = [
    { ...demoUser, firstName: 'Sarah', lastName: 'Wilson', username: 'sarahw', rank: 'Diamond', points: 2100, loginStreak: 15, postsCount: 45 },
    { ...demoUser, firstName: 'Mike', lastName: 'Chen', username: 'mikechen', rank: 'Platinum', points: 1800, loginStreak: 12, postsCount: 38 },
    { ...demoUser, firstName: 'Emma', lastName: 'Davis', username: 'emmad', rank: 'Gold', points: 1250, loginStreak: 7, postsCount: 23 },
    { ...demoUser, firstName: 'Alex', lastName: 'Johnson', username: 'alexj', rank: 'Silver', points: 850, loginStreak: 5, postsCount: 15 },
    { ...demoUser, firstName: 'Taylor', lastName: 'Brown', username: 'taylorb', rank: 'Bronze', points: 450, loginStreak: 3, postsCount: 8 }
  ];

  useEffect(() => {
    // Load user data from localStorage or create demo user
    const savedUser = localStorage.getItem('campusSocialHubUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    } else {
      setCurrentUser(demoUser);
      localStorage.setItem('campusSocialHubUser', JSON.stringify(demoUser));
    }

    // Load demo posts
    loadDemoPosts();
    setIsLoading(false);
  }, []);

  const loadDemoPosts = () => {
    const demoPosts: Post[] = [
      {
        id: '1',
        type: 'vote',
        content: '🎬 Movie Night Vote! Which movie should we watch this Friday? Vote below! #movienight #campuslife',
        author: { ...demoUser, firstName: 'Campus', lastName: 'Activities', username: 'campusactivities' },
        category: 'events',
        hashtags: ['movienight', 'campuslife', 'vote'],
        emoji: '🎬',
        pollOptions: [
          { text: 'Avengers: Endgame 🦸‍♂️', votes: 45, voters: [] },
          { text: 'The Lion King 🦁', votes: 32, voters: [] },
          { text: 'Jurassic Park 🦖', votes: 28, voters: [] },
          { text: 'Frozen ❄️', votes: 15, voters: [] }
        ],
        likes: 89,
        comments: [
          {
            id: 'c1',
            author: { ...demoUser, firstName: 'Sarah', lastName: 'Wilson', username: 'sarahw' },
            content: 'Avengers all the way! 🦸‍♂️',
            createdAt: new Date(Date.now() - 1000 * 60 * 30),
            likes: 12
          },
          {
            id: 'c2',
            author: { ...demoUser, firstName: 'Mike', lastName: 'Chen', username: 'mikechen' },
            content: 'Jurassic Park is a classic! 🦖',
            createdAt: new Date(Date.now() - 1000 * 60 * 25),
            likes: 8
          }
        ],
        shares: 15,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isLiked: true,
        isShared: false,
        isVoted: false
      },
      {
        id: '2',
        type: 'image',
        content: '🎨 Door decoration contest is heating up! Check out my Harry Potter themed door! #doorcontest #harrypotter #dormlife',
        author: { ...demoUser, firstName: 'Emma', lastName: 'Davis', username: 'emmad' },
        category: 'housing',
        hashtags: ['doorcontest', 'harrypotter', 'dormlife'],
        emoji: '🎨',
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop',
        likes: 156,
        comments: [
          {
            id: 'c3',
            author: { ...demoUser, firstName: 'Alex', lastName: 'Johnson', username: 'alexj' },
            content: 'This is amazing! How did you do the floating candles? ✨',
            createdAt: new Date(Date.now() - 1000 * 60 * 45),
            likes: 5
          }
        ],
        shares: 23,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
        isLiked: false,
        isShared: true
      },
      {
        id: '3',
        type: 'event',
        content: '🏈 Hocking Hawks vs. Rival College - Homecoming Game! 🏈\n\nJoin us for the biggest game of the season!',
        author: { ...demoUser, firstName: 'Athletics', lastName: 'Department', username: 'hockingathletics' },
        category: 'sports',
        hashtags: ['football', 'homecoming', 'hawks'],
        eventDetails: {
          date: '2024-10-15',
          time: '7:00 PM',
          location: 'Hocking College Stadium',
          description: 'Homecoming football game with pre-game tailgate party starting at 4 PM'
        },
        likes: 234,
        comments: [
          {
            id: 'c4',
            author: { ...demoUser, firstName: 'Taylor', lastName: 'Brown', username: 'taylorb' },
            content: 'Can\'t wait! Go Hawks! 🦅',
            createdAt: new Date(Date.now() - 1000 * 60 * 60),
            likes: 18
          }
        ],
        shares: 67,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
        isLiked: true,
        isShared: false
      },
      {
        id: '4',
        type: 'alert',
        content: '📚 HOCKING LEARNING DAY & CAREER DAY 📚\n\nMark your calendars! This Friday is our annual Learning Day and Career Fair. Over 50 employers will be on campus!',
        author: { ...demoUser, firstName: 'Hocking', lastName: 'College', username: 'hockingcollege' },
        category: 'alerts',
        hashtags: ['learningday', 'careerday', 'hockingcollege'],
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
        likes: 189,
        comments: [
          {
            id: 'c5',
            author: { ...demoUser, firstName: 'Sarah', lastName: 'Wilson', username: 'sarahw' },
            content: 'I\'m so excited! I have 3 interviews scheduled! 🎉',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
            likes: 12
          }
        ],
        shares: 45,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
        isLiked: false,
        isShared: true
      },
      {
        id: '5',
        type: 'video',
        content: '🎵 Campus Band Practice - Check out our new song! 🎵 #campusband #music #practice',
        author: { ...demoUser, firstName: 'Campus', lastName: 'Band', username: 'campusband' },
        category: 'activities',
        hashtags: ['campusband', 'music', 'practice'],
        emoji: '🎵',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        likes: 78,
        comments: [
          {
            id: 'c6',
            author: { ...demoUser, firstName: 'Mike', lastName: 'Chen', username: 'mikechen' },
            content: 'Sounds amazing! When\'s the next concert? 🎤',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
            likes: 6
          }
        ],
        shares: 12,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10),
        isLiked: true,
        isShared: false
      },
      {
        id: '6',
        type: 'vote',
        content: '🎉 Event Planning Vote! What should we do for Spring Break? 🌸 #springbreak #vote #campuslife',
        author: { ...demoUser, firstName: 'Student', lastName: 'Council', username: 'studentcouncil' },
        category: 'events',
        hashtags: ['springbreak', 'vote', 'campuslife'],
        emoji: '🎉',
        pollOptions: [
          { text: 'Beach Trip 🏖️', votes: 67, voters: [] },
          { text: 'Mountain Hiking 🏔️', votes: 34, voters: [] },
          { text: 'City Tour 🏙️', votes: 28, voters: [] },
          { text: 'Stay on Campus 📚', votes: 12, voters: [] }
        ],
        likes: 145,
        comments: [
          {
            id: 'c7',
            author: { ...demoUser, firstName: 'Emma', lastName: 'Davis', username: 'emmad' },
            content: 'Beach trip would be perfect! 🏖️',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1),
            likes: 15
          }
        ],
        shares: 34,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
        isLiked: false,
        isShared: false,
        isVoted: false
      },
      {
        id: '7',
        type: 'text',
        content: '🏠 Living on campus has been such an amazing experience! Just finished my first month and I love the community here. The dining hall food is actually pretty good, and I\'ve made so many friends in my dorm. Late night study sessions in the common room are the best! 📚✨ #campuslife #dormlife #hockingcollege #newstudent',
        author: { ...demoUser, firstName: 'Jessica', lastName: 'Martinez', username: 'jessmartinez', rank: 'Silver', points: 750, loginStreak: 4, postsCount: 12 },
        category: 'housing',
        hashtags: ['campuslife', 'dormlife', 'hockingcollege', 'newstudent'],
        emoji: '🏠',
        image: 'https://images.unsplash.com/photo-1523240797358-0c6d0c4b0e1c?w=600&h=400&fit=crop',
        likes: 89,
        comments: [
          {
            id: 'c8',
            author: { ...demoUser, firstName: 'Sarah', lastName: 'Wilson', username: 'sarahw' },
            content: 'Welcome to the Hocking family! 🎉 The community here is really special',
            createdAt: new Date(Date.now() - 1000 * 60 * 45),
            likes: 8
          },
          {
            id: 'c9',
            author: { ...demoUser, firstName: 'Mike', lastName: 'Chen', username: 'mikechen' },
            content: 'Wait until you try the weekend brunch! 🍳',
            createdAt: new Date(Date.now() - 1000 * 60 * 30),
            likes: 5
          }
        ],
        shares: 12,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 14),
        isLiked: true,
        isShared: false
      },
      {
        id: '8',
        type: 'text',
        content: '🚗 Commuter life update! The new commuter lounge is absolutely amazing! 🏢 Perfect place to study between classes, grab coffee, and meet other commuter students. The free WiFi is super fast and there\'s even a quiet room for when I need to focus. Thanks Hocking for thinking of us commuters! ☕📖 #commuterlife #studylounge #hockingcollege #commuterstudent',
        author: { ...demoUser, firstName: 'David', lastName: 'Thompson', username: 'davidthompson', rank: 'Bronze', points: 320, loginStreak: 2, postsCount: 6 },
        category: 'academic',
        hashtags: ['commuterlife', 'studylounge', 'hockingcollege', 'commuterstudent'],
        emoji: '🚗',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
        likes: 67,
        comments: [
          {
            id: 'c10',
            author: { ...demoUser, firstName: 'Alex', lastName: 'Johnson', username: 'alexj' },
            content: 'I love the commuter lounge too! The coffee machine is a lifesaver ☕',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
            likes: 4
          },
          {
            id: 'c11',
            author: { ...demoUser, firstName: 'Emma', lastName: 'Davis', username: 'emmad' },
            content: 'As a residential student, I\'m jealous! 😄 The lounge looks so nice',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1),
            likes: 3
          }
        ],
        shares: 8,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 16),
        isLiked: false,
        isShared: true
      }
    ];

    setPosts(demoPosts);
  };

  const handleCreatePost = () => {
    if (!newPost.trim() || !currentUser) return;

    const post: Post = {
      id: Date.now().toString(),
      type: 'text',
      content: newPost,
      author: currentUser,
      category: selectedCategory,
      hashtags: newPost.match(/#\w+/g)?.map(tag => tag.slice(1)) || [],
      likes: 0,
      comments: [],
      shares: 0,
      createdAt: new Date(),
      isLiked: false,
      isShared: false
    };

    setPosts(prev => [post, ...prev]);
    setNewPost('');
    setShowCreatePost(false);
    
    // Award points for posting
    if (currentUser) {
      const updatedUser = { ...currentUser, points: currentUser.points + 10, postsCount: currentUser.postsCount + 1 };
      setCurrentUser(updatedUser);
      localStorage.setItem('campusSocialHubUser', JSON.stringify(updatedUser));
    }
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSharePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isShared: !post.isShared, shares: post.isShared ? post.shares - 1 : post.shares + 1 }
        : post
    ));
  };

  const handleVote = (postId: string, optionIndex: number) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId && post.pollOptions) {
        const updatedOptions = post.pollOptions.map((option, index) => {
          if (index === optionIndex) {
            return { ...option, votes: option.votes + 1, voters: [...option.voters, currentUser?.id || ''] };
          }
          return option;
        });
        return { ...post, pollOptions: updatedOptions, isVoted: true, voteOption: post.pollOptions[optionIndex].text };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim() || !currentUser) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: currentUser,
      content: commentText,
      createdAt: new Date(),
      likes: 0
    };

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));

    setCommentText('');
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'poll': return <FileText className="h-4 w-4" />;
      case 'vote': return <ThumbsUp className="h-4 w-4" />;
      case 'event': return <Calendar className="h-4 w-4" />;
      case 'alert': return <AlertTriangle className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'alert': return 'bg-red-100 text-red-800 border-red-200';
      case 'event': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'vote': return 'bg-green-100 text-green-800 border-green-200';
      case 'poll': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRankIcon = (rank: string) => {
    switch (rank) {
      case 'Diamond': return <Trophy className="h-4 w-4 text-purple-500" />;
      case 'Platinum': return <Award className="h-4 w-4 text-blue-500" />;
      case 'Gold': return <Star className="h-4 w-4 text-yellow-500" />;
      case 'Silver': return <TrendingUp className="h-4 w-4 text-gray-400" />;
      case 'Bronze': return <ThumbsUp className="h-4 w-4 text-orange-500" />;
      default: return <Star className="h-4 w-4 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-red-600">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              You need to be a verified student or faculty member to access the Campus Social Hub.
            </p>
            <Button onClick={() => setLocation('/housing')}>
              Return to Housing
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 dark:bg-popover">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setLocation('/housing')}
                className="flex items-center text-primary hover:text-primary-dark transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span>Back to Housing</span>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Campus Social Hub</h1>
                <p className="text-gray-600">Connect with your campus community</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="h-4 w-4 mr-1" />
                Verified User
              </Badge>
              <Button onClick={() => setShowRankings(true)} variant="outline">
                <Trophy className="h-4 w-4 mr-2" />
                Rankings
              </Button>
              <Button onClick={() => setShowCreatePost(true)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* User Stats Card */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                {currentUser.firstName[0]}{currentUser.lastName[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">
                    {currentUser.firstName} {currentUser.lastName}
                  </span>
                  {getRankIcon(currentUser.rank)}
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    {currentUser.rank}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">
                  {currentUser.points} points • {currentUser.loginStreak} day streak • {currentUser.postsCount} posts
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{currentUser.points}</div>
              <div className="text-sm text-gray-500">Total Points</div>
            </div>
          </div>
        </div>

        {/* Rankings Modal */}
        {showRankings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowRankings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">🏆 Campus Rankings</h3>
                <button onClick={() => setShowRankings(false)}>
                  <XCircle className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-3">
                {topUsers.map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{user.firstName} {user.lastName}</span>
                          {getRankIcon(user.rank)}
                        </div>
                        <div className="text-sm text-gray-500">@{user.username}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{user.points}</div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">How to earn points:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Daily login: +5 points</li>
                  <li>• Create a post: +10 points</li>
                  <li>• Like a post: +1 point</li>
                  <li>• Comment on a post: +3 points</li>
                  <li>• Share a post: +2 points</li>
                  <li>• Vote in polls: +2 points</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Create Post Modal */}
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowCreatePost(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Create a Post</h3>
                <button onClick={() => setShowCreatePost(false)}>
                  <XCircle className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">General</option>
                    <option value="academic">Academic</option>
                    <option value="events">Events</option>
                    <option value="housing">Housing</option>
                    <option value="sports">Sports</option>
                    <option value="alerts">Alerts</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Post
                  </label>
                  <Textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What's on your mind? Use emojis! 😊"
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Image className="h-4 w-4 mr-1" />
                    Photo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4 mr-1" />
                    Video
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Event
                  </Button>
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Poll
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleCreatePost}
                    disabled={!newPost.trim()}
                    className="flex-1"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreatePost(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md border border-gray-200"
            >
              {/* Post Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {post.author.firstName[0]}{post.author.lastName[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {post.author.firstName} {post.author.lastName}
                        </span>
                        {post.author.isVerified && (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {getRankIcon(post.author.rank)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>@{post.author.username}</span>
                        <span>•</span>
                        <span>{post.createdAt.toLocaleString()}</span>
                        <span>•</span>
                        <Badge className={`${getPostTypeColor(post.type)} text-xs`}>
                          {getPostTypeIcon(post.type)}
                          <span className="ml-1">{post.type.toUpperCase()}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <p className="text-gray-900 mb-4 text-lg">{post.content}</p>
                
                {/* Image */}
                {post.image && (
                  <div className="mb-4">
                    <img 
                      src={post.image} 
                      alt="Post content" 
                      className="w-full rounded-lg"
                    />
                  </div>
                )}

                {/* Video */}
                {post.video && (
                  <div className="mb-4">
                    <video 
                      controls 
                      className="w-full rounded-lg"
                      poster="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop"
                    >
                      <source src={post.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                
                {post.eventDetails && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Event Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span>{post.eventDetails.date} at {post.eventDetails.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span>{post.eventDetails.location}</span>
                      </div>
                      <p className="text-blue-800">{post.eventDetails.description}</p>
                    </div>
                  </div>
                )}

                {/* Poll Options */}
                {post.pollOptions && (
                  <div className="space-y-2 mb-4">
                    {post.pollOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleVote(post.id, index)}
                        disabled={post.isVoted}
                        className={`w-full p-3 text-left rounded-lg border transition ${
                          post.isVoted && post.voteOption === option.text
                            ? 'bg-green-100 border-green-300 text-green-800'
                            : post.isVoted
                            ? 'bg-gray-100 border-gray-300 text-gray-600'
                            : 'bg-white border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option.text}</span>
                          <span className="font-semibold">{option.votes} votes</span>
                        </div>
                        {post.isVoted && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full transition-all"
                                style={{ width: `${(option.votes / Math.max(...post.pollOptions!.map(o => o.votes))) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {post.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.hashtags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Comments */}
              {post.comments.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                  <div className="space-y-3">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                          {comment.author.firstName[0]}{comment.author.lastName[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">{comment.author.firstName} {comment.author.lastName}</span>
                            <span className="text-xs text-gray-500">@{comment.author.username}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{comment.createdAt.toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-gray-900">{comment.content}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <button className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {comment.likes}
                            </button>
                            <button className="text-xs text-gray-500 hover:text-blue-500 flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Comment */}
              <div className="px-4 py-3 border-t border-gray-100">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                    {currentUser.firstName[0]}{currentUser.lastName[0]}
                  </div>
                  <div className="flex-1">
                    <Textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="min-h-[60px] resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleAddComment(post.id)}
                        disabled={!commentText.trim()}
                      >
                        <Send className="h-3 w-3 mr-1" />
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Actions */}
              <div className="px-4 py-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className={`flex items-center gap-2 text-sm transition ${
                        post.isLiked 
                          ? 'text-red-500' 
                          : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments.length}</span>
                    </button>
                    
                    <button
                      onClick={() => handleSharePost(post.id)}
                      className={`flex items-center gap-2 text-sm transition ${
                        post.isShared 
                          ? 'text-green-500' 
                          : 'text-gray-500 hover:text-green-500'
                      }`}
                    >
                      <Share2 className={`h-4 w-4 ${post.isShared ? 'fill-current' : ''}`} />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            About Campus Social Hub
          </h3>
          <p className="text-blue-800 text-sm leading-relaxed">
            The Campus Social Hub is more than a feed, it's a real-time digital community space that will improve communication,
            foster connections, and create a vibrant campus culture. Share your experiences, discover events, and stay connected
            with your fellow students and faculty members. Earn points and climb the rankings by being active in the community!
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-blue-700">
            <Users className="h-4 w-4" />
            <span>1,247 active members</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusSocialHub; 