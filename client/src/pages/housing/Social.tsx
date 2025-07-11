import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, 
  Send, Image, Video, AlertTriangle, Calendar, 
  Users, TrendingUp, Filter, Plus, Clock,
  User, Building, Smile, Camera,
  Bell, Settings, Sparkles, CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface User {
  firstName: string;
  lastName: string;
  studentId: string;
  email: string;
  dormBuilding: string;
  roomNumber: string;
  program: string;
  username: string;
  isAuthenticated: boolean;
  isVerified: boolean;
  userType: 'student' | 'faculty';
}

interface Post {
  id: string;
  type: 'text' | 'image' | 'video' | 'poll' | 'event' | 'alert';
  content: string;
  author: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  isPinned: boolean;
  category: string;
  image?: string;
  video?: string;
  pollOptions?: string[];
  pollVotes?: number[];
  pollVoters?: string[]; // Track who voted for what
  eventDetails?: {
    date: string;
    time: string;
    location: string;
    description: string;
  };
  hashtags: string[];
  emoji?: string;
}

const CampusSocialHub: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(true);
  const [showVerification, setShowVerification] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postType, setPostType] = useState<'text' | 'image' | 'video' | 'poll' | 'event'>('text');
  const [hashtags, setHashtags] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');

  // Check for existing login on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('campusSocialHubUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      if (userData.isVerified) {
        setUser(userData);
        setShowAuth(false);
      } else {
        setShowVerification(true);
      }
    }
  }, []);

  // Sample posts data with enhanced poll functionality
  const samplePosts: Post[] = [
    {
      id: '1',
      type: 'alert',
      content: 'Heads up, Hawks! Water will be shut off in North Hall for repairs this Friday from 10AM–2PM.',
      author: 'Housing Office',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 34,
      comments: 12,
      shares: 5,
      isLiked: false,
      isSaved: false,
      isPinned: true,
      category: 'alerts',
      hashtags: ['#maintenance', '#northhall', '#water']
    },
    {
      id: '2',
      type: 'event',
      content: 'Karaoke Night @ The Student Center! Come sing your favorite hits & win prizes! Free Pizza | Raffle Drawings',
      author: 'Student Center',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      likes: 98,
      comments: 24,
      shares: 15,
      isLiked: false,
      isSaved: false,
      isPinned: false,
      category: 'events',
      eventDetails: {
        date: 'Thursday',
        time: '7PM',
        location: 'Student Center',
        description: 'Karaoke Night with prizes and free pizza!'
      },
      hashtags: ['#karaoke', '#studentcenter', '#fun']
    },
    {
      id: '3',
      type: 'text',
      content: 'Use the ChatGPT to set up a study guide. Study 25 mins, break for 5. Comment your go-to study hack below!',
      author: 'CA Jodian',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      likes: 60,
      comments: 18,
      shares: 8,
      isLiked: false,
      isSaved: false,
      isPinned: false,
      category: 'wellness',
      hashtags: ['#studytips', '#finals', '#chatgpt'],
      emoji: '📚'
    },
    {
      id: '4',
      type: 'image',
      content: 'Weekend Recap: Bonfire Highlights - What a night! Catch the best moments from Saturday\'s Bonfire',
      author: 'Campus Life',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      likes: 115,
      comments: 20,
      shares: 12,
      isLiked: false,
      isSaved: false,
      isPinned: false,
      category: 'student-life',
      image: '/api/placeholder/400/300',
      hashtags: ['#bonfire', '#weekend', '#highlights']
    },
    {
      id: '5',
      type: 'poll',
      content: 'Vote for the Next Movie Night Feature! Vote ends Friday @ 4PM',
      author: 'Campus Life Team',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 42,
      comments: 8,
      shares: 3,
      isLiked: false,
      isSaved: false,
      isPinned: false,
      category: 'events',
      pollOptions: ['Barbie', 'Oppenheimer', 'Spider-Verse'],
      pollVotes: [15, 12, 15],
      pollVoters: [],
      hashtags: ['#movienight', '#vote', '#campuslife']
    },
    {
      id: '6',
      type: 'poll',
      content: 'What\'s your favorite campus dining option?',
      author: 'Campus Life Team',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      likes: 28,
      comments: 5,
      shares: 2,
      isLiked: false,
      isSaved: false,
      isPinned: false,
      category: 'student-life',
      pollOptions: ['Student Center Cafe', 'Dining Hall', 'Food Trucks', 'Off-campus'],
      pollVotes: [8, 12, 6, 2],
      pollVoters: [],
      hashtags: ['#dining', '#campuslife', '#food']
    }
  ];

  useEffect(() => {
    setPosts(samplePosts);
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const userData: User = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      studentId: formData.get('studentId') as string,
      email: formData.get('email') as string,
      dormBuilding: formData.get('dormBuilding') as string,
      roomNumber: formData.get('roomNumber') as string,
      program: formData.get('program') as string,
      username: formData.get('username') as string,
      userType: formData.get('userType') as 'student' | 'faculty',
      isAuthenticated: false,
      isVerified: false
    };

    setShowAuth(false);
    setShowVerification(true);

    // Send verification request to housing office
    const verificationEmail = {
      to: 'housing@hocking.edu',
      subject: 'Campus Social Hub - New User Verification Request',
      body: `
        New user registration requiring verification:
        
        Name: ${userData.firstName} ${userData.lastName}
        Student ID: ${userData.studentId}
        Email: ${userData.email}
        User Type: ${userData.userType}
        Dorm: ${userData.dormBuilding} Room ${userData.roomNumber}
        Program: ${userData.program}
        Username: ${userData.username}
        
        Please verify this email address and click APPROVE or REJECT.
        Only verified students and faculty should be granted access.
      `
    };

    console.log('Sending verification request:', verificationEmail);
    toast({
      title: "Registration Submitted! 📧",
      description: "Your registration has been sent to the housing office for verification. You'll receive an email notification once approved.",
    });
  };

  const handleLogout = () => {
    setUser(null);
    setShowAuth(true);
    setShowVerification(false);
    localStorage.removeItem('campusSocialHubUser');
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleSave = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  const handleVote = (postId: string, optionIndex: number) => {
    if (!user) return;

    setPosts(posts.map(post => {
      if (post.id === postId && post.type === 'poll') {
        const currentVotes = [...(post.pollVotes || [])];
        const currentVoters = [...(post.pollVoters || [])];
        
        // Check if user already voted
        const userVoteIndex = currentVoters.indexOf(user.email);
        
        if (userVoteIndex !== -1) {
          // User already voted, remove their previous vote
          const previousVote = parseInt(currentVoters[userVoteIndex + 1] || '0');
          currentVotes[previousVote] = Math.max(0, currentVotes[previousVote] - 1);
          currentVoters.splice(userVoteIndex, 2); // Remove user and their vote
        }
        
        // Add new vote
        currentVotes[optionIndex] = (currentVotes[optionIndex] || 0) + 1;
        currentVoters.push(user.email, optionIndex.toString());
        
        return {
          ...post,
          pollVotes: currentVotes,
          pollVoters: currentVoters
        };
      }
      return post;
    }));

    toast({
      title: "Vote Cast! 🗳️",
      description: "Your vote has been recorded and the results updated.",
    });
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      type: postType,
      content: newPost,
      author: user?.firstName || 'Anonymous',
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isSaved: false,
      isPinned: false,
      category: selectedCategory,
      hashtags: hashtags.split(' ').filter(tag => tag.startsWith('#')),
      emoji: selectedEmoji
    };

    // Send to housing office for approval
    const approvalEmail = {
      to: 'housing@hocking.edu',
      subject: 'Campus Social Hub Post Approval Request',
      body: `
        New post awaiting approval:
        Author: ${post.author}
        Content: ${post.content}
        Category: ${post.category}
        Type: ${post.type}
        Hashtags: ${post.hashtags.join(', ')}
        
        Click YES to approve or NO to reject
      `
    };

    console.log('Sending approval request:', approvalEmail);
    
    setNewPost('');
    setHashtags('');
    setSelectedEmoji('');
    setShowCreatePost(false);
    
    toast({
      title: "Post Submitted for Approval 📝",
      description: "Your post has been sent to the housing office for review. You'll be notified when it's approved!",
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const getVotePercentage = (votes: number, totalVotes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  const getUserVote = (post: Post) => {
    if (!user || !post.pollVoters) return -1;
    const userIndex = post.pollVoters.indexOf(user.email);
    if (userIndex === -1) return -1;
    return parseInt(post.pollVoters[userIndex + 1] || '-1');
  };

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="border-2 border-blue-600 shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <Users className="h-8 w-8" />
                </div>
              </div>
              <CardTitle className="text-2xl">Campus Social Hub</CardTitle>
              <p className="text-blue-100">Join the community!</p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">First Name *</label>
                    <Input name="firstName" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Name *</label>
                    <Input name="lastName" required />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Student ID Number *</label>
                  <Input name="studentId" required />
                </div>
                
                <div>
                  <label className="text-sm font-medium">School Email *</label>
                  <Input name="email" type="email" required />
                </div>

                <div>
                  <label className="text-sm font-medium">User Type *</label>
                  <Select name="userType" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Dorm Building *</label>
                    <Select name="dormBuilding" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select building" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="North">North</SelectItem>
                        <SelectItem value="Downhour">Downhour</SelectItem>
                        <SelectItem value="Hocking Heights">Hocking Heights</SelectItem>
                        <SelectItem value="Summit">Summit</SelectItem>
                        <SelectItem value="Sycamore">Sycamore</SelectItem>
                        <SelectItem value="International Housing">International Housing</SelectItem>
                        <SelectItem value="Opportunity House">Opportunity House</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Room Number *</label>
                    <Input name="roomNumber" required />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Program of Study *</label>
                  <Input name="program" required />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Username *</label>
                  <Input name="username" required />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Password *</label>
                  <Input name="password" type="password" required />
                </div>
                
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Submit for Verification
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (showVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="border-2 border-yellow-600 shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <CheckCircle className="h-8 w-8" />
                </div>
              </div>
              <CardTitle className="text-2xl">Verification Pending</CardTitle>
              <p className="text-yellow-100">Your account is being reviewed</p>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-yellow-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Your registration has been submitted to the housing office for verification. 
                  You'll receive an email notification once your account is approved.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Note:</strong> Only verified students and faculty members can access the Campus Social Hub.
                  </p>
                </div>
                <Button 
                  onClick={() => setShowAuth(true)}
                  variant="outline"
                  className="w-full"
                >
                  Back to Registration
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/housing">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Campus Social Hub</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Where Campus Life Comes to Life!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Welcome, {user?.firstName}!</span>
                <Badge variant="outline" className="text-xs">
                  {user?.userType}
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="border-2 border-gradient-to-r from-blue-600 to-purple-600 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome to the Campus Social Hub! 🎉
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This is your scrollable space to catch events, updates, alerts, giveaways, photos, and all the fun stuff happening on campus.
              </p>
              <div className="flex justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Get connected
                </span>
                <span className="flex items-center gap-1">
                  <Bell className="h-4 w-4" />
                  Stay updated
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  Never miss a moment
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trending Banner */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Card className="border-2 border-orange-600 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <span className="font-semibold text-orange-800 dark:text-orange-200">Trending on Campus</span>
                <Badge variant="secondary" className="ml-auto">Live</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Create Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="border-2 border-green-600">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.firstName?.charAt(0) || 'U'}
                </div>
                <div className="flex-1">
                  <Textarea
                    placeholder="What's happening on campus? Share your thoughts, events, or updates..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCreatePost(true)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Create Post
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Image className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      onClick={handleCreatePost}
                      disabled={!newPost.trim()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'events', 'alerts', 'wellness', 'student-life', 'reminders'].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                <Filter className="h-3 w-3 mr-1" />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Posts Feed */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className={`border-2 transition-all duration-300 hover:shadow-lg ${
                  post.isPinned 
                    ? 'border-red-600 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}>
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {post.author}
                            {post.isPinned && (
                              <Badge variant="destructive" className="ml-2">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Pinned
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            {formatTimeAgo(post.timestamp)}
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      {post.emoji && (
                        <span className="text-2xl mr-2">{post.emoji}</span>
                      )}
                      <p className="text-gray-900 dark:text-white mb-3">{post.content}</p>
                      
                      {/* Event Details */}
                      {post.type === 'event' && post.eventDetails && (
                        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              <span className="font-semibold text-blue-800 dark:text-blue-200">
                                {post.eventDetails.date} at {post.eventDetails.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <Building className="h-4 w-4 text-blue-600" />
                              <span className="text-blue-700 dark:text-blue-300">
                                {post.eventDetails.location}
                              </span>
                            </div>
                            <p className="text-blue-700 dark:text-blue-300 text-sm">
                              {post.eventDetails.description}
                            </p>
                          </CardContent>
                        </Card>
                      )}

                      {/* Enhanced Poll with Live Voting */}
                      {post.type === 'poll' && post.pollOptions && (
                        <div className="space-y-3">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Total votes: {post.pollVotes?.reduce((a, b) => a + b, 0) || 0}
                          </div>
                          {post.pollOptions.map((option, idx) => {
                            const votes = post.pollVotes?.[idx] || 0;
                            const totalVotes = post.pollVotes?.reduce((a, b) => a + b, 0) || 0;
                            const percentage = getVotePercentage(votes, totalVotes);
                            const userVote = getUserVote(post);
                            const isUserVote = userVote === idx;
                            
                            return (
                              <div 
                                key={idx} 
                                className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                  isUserVote 
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                                }`}
                                onClick={() => handleVote(post.id, idx)}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                      isUserVote 
                                        ? 'border-blue-500 bg-blue-500' 
                                        : 'border-gray-400'
                                    }`}>
                                      {isUserVote && <CheckCircle className="h-3 w-3 text-white" />}
                                    </div>
                                    <span className="font-medium">{option}</span>
                                  </div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {votes} votes ({percentage}%)
                                  </div>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Image */}
                      {post.image && (
                        <div className="mt-3">
                          <img 
                            src={post.image} 
                            alt="Post content" 
                            className="w-full rounded-lg"
                          />
                        </div>
                      )}

                      {/* Hashtags */}
                      {post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {post.hashtags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1 ${
                            post.isLiked ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Share2 className="h-4 w-4" />
                          {post.shares}
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSave(post.id)}
                        className={`flex items-center gap-1 ${
                          post.isSaved ? 'text-yellow-600' : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        <Bookmark className={`h-4 w-4 ${post.isSaved ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Create Post Dialog */}
        <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Post
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Tabs value={postType} onValueChange={(value) => setPostType(value as any)}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                  <TabsTrigger value="poll">Poll</TabsTrigger>
                  <TabsTrigger value="event">Event</TabsTrigger>
                </TabsList>
                
                <TabsContent value="text" className="space-y-4">
                  <Textarea
                    placeholder="Write your post content..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[120px]"
                  />
                </TabsContent>
                
                <TabsContent value="image" className="space-y-4">
                  <Textarea
                    placeholder="Write your post content..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">Click to upload image</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="video" className="space-y-4">
                  <Textarea
                    placeholder="Write your post content..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Video className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">Click to upload video (max 60 seconds)</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="poll" className="space-y-4">
                  <Textarea
                    placeholder="Ask your question..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="space-y-2">
                    <Input placeholder="Option 1" />
                    <Input placeholder="Option 2" />
                    <Input placeholder="Option 3" />
                    <Input placeholder="Option 4" />
                  </div>
                </TabsContent>
                
                <TabsContent value="event" className="space-y-4">
                  <Textarea
                    placeholder="Event description..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Date" type="date" />
                    <Input placeholder="Time" type="time" />
                  </div>
                  <Input placeholder="Location" />
                </TabsContent>
              </Tabs>
              
              <div className="space-y-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="alerts">Alerts</SelectItem>
                    <SelectItem value="wellness">Wellness & Tips</SelectItem>
                    <SelectItem value="student-life">Student Life</SelectItem>
                    <SelectItem value="reminders">Reminders</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input
                  placeholder="Hashtags (e.g., #campus #fun #events)"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                />
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Add emoji:</span>
                  {['🎉', '📚', '🎵', '🍕', '🔥', '💡', '🎮', '🏠'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`text-xl p-1 rounded ${
                        selectedEmoji === emoji ? 'bg-blue-100 dark:bg-blue-900' : ''
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Submit for Approval
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Footer Note */}
      <div className="bg-white dark:bg-gray-800 border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            The Campus Social Hub is more than a feed, it's a real-time digital community space that will improve communication, 
            student engagement, and help Hocking College feel more connected and fun. Let's make the app a place students want to check every day.
          </p>
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
            <p>Maintenance Contact: Housing Office / App Admin</p>
            <p>Email: <a href="mailto:housing@hocking.edu" className="text-blue-600 hover:underline">Housing@hocking.edu</a> | Secondary: <a href="mailto:kennedyj1@hocking.edu" className="text-blue-600 hover:underline">kennedyj1@hocking.edu</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusSocialHub; 