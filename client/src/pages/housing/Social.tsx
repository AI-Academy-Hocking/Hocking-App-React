import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageSquare, Image, Heart, Share2, MoreHorizontal, Smile } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  media?: {
    type: "image" | "video";
    url: string;
  };
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  location?: string;
  tags: string[];
}

const posts: Post[] = [
  {
    id: "1",
    author: {
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      role: "Resident"
    },
    content: "Just moved into North Hall! The view from my window is amazing! 🌅 #NewHome #CampusLife",
    media: {
      type: "image",
      url: "/posts/sunset-view.jpg"
    },
    likes: 124,
    comments: 23,
    shares: 5,
    timestamp: "2 hours ago",
    location: "North Hall",
    tags: ["NewHome", "CampusLife"]
  },
  {
    id: "2",
    author: {
      name: "Mike Chen",
      avatar: "/avatars/mike.jpg",
      role: "RA"
    },
    content: "Join us for tonight's movie night in the common room! We'll be showing 'The Social Network' 🎬 #MovieNight #Community",
    likes: 89,
    comments: 15,
    shares: 8,
    timestamp: "4 hours ago",
    location: "Summit Hall",
    tags: ["MovieNight", "Community"]
  },
  {
    id: "3",
    author: {
      name: "Emma Davis",
      avatar: "/avatars/emma.jpg",
      role: "Resident"
    },
    content: "Check out my room transformation! Before and after pics 📸 #RoomDecor #DormLife",
    media: {
      type: "image",
      url: "/posts/room-makeover.jpg"
    },
    likes: 256,
    comments: 42,
    shares: 12,
    timestamp: "1 day ago",
    location: "Sycamore Hall",
    tags: ["RoomDecor", "DormLife"]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Social() {
  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-3 bg-primary/10 rounded-full relative">
          <MessageSquare className="h-8 w-8 text-primary" />
          <Image className="h-4 w-4 absolute -bottom-1 -right-1 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Campus Social Hub</h1>
          <p className="text-muted-foreground">Share your campus life experiences</p>
        </div>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Create Post Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src="/avatars/default.jpg" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <Textarea 
                  placeholder="Share your campus life moments..."
                  className="min-h-[100px]"
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Image className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Smile className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button>Post</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={item}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{post.author.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {post.author.role} • {post.timestamp}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">{post.content}</p>
                    {post.media && (
                      <div className="rounded-lg overflow-hidden">
                        <img 
                          src={post.media.url} 
                          alt="Post media" 
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                    {post.location && (
                      <div className="text-sm text-muted-foreground">
                        📍 {post.location}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <Button variant="ghost" size="icon" className="gap-2">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="icon" className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="icon" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        {post.shares}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 