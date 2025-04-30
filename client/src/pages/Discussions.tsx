import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "../lib/auth";
import { getQueryFn, apiRequest } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import {
  MessageSquare,
  Plus,
  PinIcon,
  Calendar,
  UserCircle,
  MessageCircle,
  MessageSquareMore,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Skeleton } from "../components/ui/skeleton";

// Schema for a new discussion
const newDiscussionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.string().default("general"),
});

type NewDiscussionValues = z.infer<typeof newDiscussionSchema>;

// Type definitions for the API responses
interface Author {
  id: number;
  username: string;
  name?: string;
  email?: string;
}

interface Discussion {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  category: string;
  isPinned: boolean;
  author?: Author;
}

interface Comment {
  id: number;
  content: string;
  authorId: number;
  discussionId: number;
  parentId: number | null;
  createdAt: string;
  author?: Author;
  replies?: Comment[];
}

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Helper function to get category display name
const getCategoryDisplayName = (category: string) => {
  const categories = {
    general: "General",
    academic: "Academic",
    social: "Social",
    housing: "Housing",
    campus: "Campus",
    events: "Events",
  };
  return categories[category as keyof typeof categories] || category;
};

// Helper function to get category badge color
const getCategoryColor = (category: string) => {
  const colors = {
    general: "bg-blue-100 text-blue-800",
    academic: "bg-green-100 text-green-800",
    social: "bg-purple-100 text-purple-800",
    housing: "bg-orange-100 text-orange-800",
    campus: "bg-teal-100 text-teal-800",
    events: "bg-pink-100 text-pink-800",
  };
  return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

// Discussion Card Component
function DiscussionCard({ discussion }: { discussion: Discussion }) {
  const [, setLocation] = useLocation();

  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary/20"
      onClick={() => setLocation(`/discussions/${discussion.id}`)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge 
                variant="outline" 
                className={getCategoryColor(discussion.category)}
              >
                {getCategoryDisplayName(discussion.category)}
              </Badge>
              {discussion.isPinned && (
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                  <PinIcon className="h-3 w-3 mr-1" /> Pinned
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg">{discussion.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-neutral-600 line-clamp-2">{discussion.content}</p>
      </CardContent>
      <CardFooter className="pt-2 text-xs text-neutral-500 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserCircle className="h-4 w-4" />
          <span>{discussion.author?.name || discussion.author?.username || "Unknown"} {discussion.author?.isGuest ? "(Guest)" : ""}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300" />
          <Calendar className="h-4 w-4" />
          <span>{formatDate(discussion.createdAt)}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="h-4 w-4" />
          <span>{discussion.commentCount || 0} replies</span>
        </div>
      </CardFooter>
    </Card>
  );
}

// Discussion List Skeleton Loading Component
function DiscussionListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <Card key={item}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <Skeleton className="h-5 w-20 mb-2" />
                <Skeleton className="h-6 w-full max-w-[300px]" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
          <CardFooter className="pt-2">
            <div className="flex items-center gap-2 w-full justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

// New Discussion Form Component
function NewDiscussionForm() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  
  const form = useForm<NewDiscussionValues>({
    resolver: zodResolver(newDiscussionSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "general",
    },
  });
  
  const discussionMutation = useMutation({
    mutationFn: async (values: NewDiscussionValues) => {
      if (!user) throw new Error("You must be logged in to create a discussion");
      
      return apiRequest("/api/discussions", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          authorId: user.id
        })
      });
    },
    onSuccess: () => {
      toast({
        title: "Discussion created!",
        description: "Your discussion has been posted successfully.",
      });
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/discussions"] });
    },
    onError: (error) => {
      toast({
        title: "Error creating discussion",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(data: NewDiscussionValues) {
    discussionMutation.mutate(data);
  }
  
  if (!user) return null;
  
  const categories = [
    { value: "general", label: "General" },
    { value: "academic", label: "Academic" },
    { value: "social", label: "Social" },
    { value: "housing", label: "Housing" },
    { value: "campus", label: "Campus" },
    { value: "events", label: "Events" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Discussion
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Create a New Discussion</DialogTitle>
          <DialogDescription>
            Share your thoughts with the Hocking College community.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a title for your discussion" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your thoughts or question..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      className="w-full p-2 border rounded-md"
                      {...field}
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormDescription>
                    Choose a category that best fits your discussion.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={discussionMutation.isPending}
              >
                {discussionMutation.isPending ? "Posting..." : "Post Discussion"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// Main Discussions Page Component
export default function Discussions() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activityFilter, setActivityFilter] = useState("discussions");
  const { user } = useAuth();
  
  // Query for comments
  const commentsQuery = useQuery({
    queryKey: ["/api/comments"],
    queryFn: getQueryFn<Comment[]>({
      on401: "returnNull",
      url: "/api/comments"
    }),
  });
  
  const discussionsQuery = useQuery({
    queryKey: ["/api/discussions", activeCategory],
    queryFn: getQueryFn<Discussion[]>({
      on401: "returnNull",
      url: activeCategory === "all" 
        ? "/api/discussions" 
        : `/api/discussions?category=${activeCategory}`
    }),
  });
  
  const pinnedDiscussions = discussionsQuery.data?.filter(d => d.isPinned) || [];
  const regularDiscussions = discussionsQuery.data?.filter(d => !d.isPinned) || [];
  
  const categories = [
    { id: "all", label: "All" },
    { id: "general", label: "General" },
    { id: "academic", label: "Academic" },
    { id: "social", label: "Social" },
    { id: "housing", label: "Housing" },
    { id: "campus", label: "Campus" },
    { id: "events", label: "Events" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Student Discussions</h1>
          <p className="text-neutral-500">Connect with other students at Hocking College</p>
          {user?.isGuest && (
            <p className="text-sm text-orange-600 mt-1">
              Sign in with your account to create discussions and participate in conversations
            </p>
          )}
        </div>
        
        {user && !user.isGuest && <NewDiscussionForm />}
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button 
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            className={`rounded-full text-sm ${
              activeCategory === category.id 
                ? "bg-primary text-white" 
                : "bg-neutral-lightest text-neutral-dark"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>
      
      {/* Discussions */}
      <Tabs defaultValue="discussions" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="discussions" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Discussions
          </TabsTrigger>
          <TabsTrigger value="my-activity" className="gap-2" disabled={!user || user.isGuest}>
            <MessageSquareMore className="h-4 w-4" />
            My Activity
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="discussions" className="space-y-6">
          {discussionsQuery.isLoading ? (
            <DiscussionListSkeleton />
          ) : discussionsQuery.isError ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-red-500">Failed to load discussions. Please try again later.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Pinned discussions */}
              {pinnedDiscussions.length > 0 && (
                <>
                  <div className="flex items-center gap-2 text-neutral-600">
                    <PinIcon className="h-4 w-4" />
                    <h2 className="text-base font-medium">Pinned Discussions</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pinnedDiscussions.map((discussion) => (
                      <DiscussionCard key={discussion.id} discussion={discussion} />
                    ))}
                  </div>
                  <Separator />
                </>
              )}
              
              {/* Regular discussions */}
              <div className="flex items-center gap-2 text-neutral-600">
                <MessageSquare className="h-4 w-4" />
                <h2 className="text-base font-medium">All Discussions</h2>
              </div>
              
              {regularDiscussions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {regularDiscussions.map((discussion) => (
                    <DiscussionCard key={discussion.id} discussion={discussion} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center flex flex-col items-center">
                    <MessageSquare className="h-12 w-12 text-neutral-300 mb-4" />
                    <p className="text-lg font-medium text-neutral-600 mb-2">No discussions found</p>
                    <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
                      {activeCategory === "all" 
                        ? "There are no discussions yet. Be the first to start a conversation!"
                        : `There are no discussions in the ${getCategoryDisplayName(activeCategory)} category yet.`}
                    </p>
                    {user && !user.isGuest && (
                      <NewDiscussionForm />
                    )}
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="my-activity">
          {user && (
            <div className="space-y-6">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActivityFilter('discussions')}
                  className={activityFilter === 'discussions' ? 'bg-primary text-white' : ''}
                >
                  My Discussions
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActivityFilter('comments')}
                  className={activityFilter === 'comments' ? 'bg-primary text-white' : ''}
                >
                  My Comments
                </Button>
              </div>

              {activityFilter === 'discussions' && (
                <>
                  {discussionsQuery.data?.filter(d => d.authorId === user.id).length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-neutral-500">You haven't posted any discussions in this session yet.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <>
                      <h3 className="text-lg font-medium">Your Discussions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {discussionsQuery.data?.filter(d => d.authorId === user.id)
                          .map(discussion => (
                            <DiscussionCard key={discussion.id} discussion={discussion} />
                          ))}
                      </div>
                    </>
                  )}
                </>
              )}

              {activityFilter === 'comments' && (
                <>
                  {commentsQuery.data?.filter(c => c.authorId === user.id).length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-neutral-500">You haven't made any comments in this session yet.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <>
                      <h3 className="text-lg font-medium">Your Comments</h3>
                      <div className="space-y-4">
                        {commentsQuery.data?.filter(c => c.authorId === user.id)
                          .map(comment => (
                            <Card key={comment.id}>
                              <CardContent className="py-4">
                                <p className="text-sm text-neutral-600">{comment.content}</p>
                                <p className="text-xs text-neutral-500 mt-2">
                                  Posted in discussion: {comment.discussionTitle}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}