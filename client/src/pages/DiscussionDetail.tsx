import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form";
import { Textarea } from "../components/ui/textarea";
import {
  ArrowLeft,
  MessageSquare,
  Calendar,
  UserCircle,
  Send,
  Reply,
  Loader2,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Skeleton } from "../components/ui/skeleton";

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

// Schema for a new comment
const newCommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
  authorId: z.number(),
  discussionId: z.number(),
  parentId: z.number().nullable().optional(),
});

type NewCommentValues = z.infer<typeof newCommentSchema>;

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

// Helper function to get initials from a name or username
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

// Comment Component
function CommentCard({ comment, level = 0 }: { comment: Comment; level?: number }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isReplying, setIsReplying] = useState(false);
  
  // Form for replying to a comment
  const form = useForm<NewCommentValues>({
    resolver: zodResolver(newCommentSchema),
    defaultValues: {
      content: "",
      authorId: user?.id || 0,
      discussionId: comment.discussionId,
      parentId: comment.id,
    },
  });
  
  const replyMutation = useMutation({
    mutationFn: async (values: NewCommentValues) => {
      if (!user) throw new Error("You must be logged in to reply");
      
      return apiRequest(`/api/discussions/${values.discussionId}/comments`, {
        method: "POST",
        body: JSON.stringify(values)
      });
    },
    onSuccess: () => {
      toast({
        title: "Reply posted!",
        description: "Your reply has been added successfully.",
      });
      form.reset();
      setIsReplying(false);
      queryClient.invalidateQueries({ queryKey: [`/api/discussions/${comment.discussionId}/comments`] });
    },
    onError: (error) => {
      toast({
        title: "Error posting reply",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(data: NewCommentValues) {
    replyMutation.mutate(data);
  }
  
  return (
    <div className={`pl-${level * 4} mt-4`}>
      <div className="flex gap-4">
        <div>
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              {getInitials(comment.author?.name || comment.author?.username || "U")}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1">
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">
                {comment.author?.name || comment.author?.username}
                {comment.author?.isGuest ? " (Guest)" : ""}
              </span>
              <span className="text-xs text-neutral-500">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>
          
          {user && !user.isGuest && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-1 text-neutral-500 hover:text-neutral-700"
              onClick={() => setIsReplying(!isReplying)}
            >
              <Reply className="h-4 w-4 mr-1" />
              Reply
            </Button>
          )}
          
          {isReplying && (
            <div className="mt-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Write your reply..." 
                            className="min-h-[80px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsReplying(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      size="sm"
                      disabled={replyMutation.isPending}
                    >
                      {replyMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-1" />
                          Post Reply
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
      </div>
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="border-l-2 border-neutral-200 ml-5 pl-5 mt-4">
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// Skeleton Loading Components
function DiscussionDetailSkeleton() {
  return (
    <div>
      <div className="mb-4">
        <Skeleton className="h-8 w-96 mb-2" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="h-24 w-full mb-2" />
        <div className="flex items-center gap-2 mt-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      <Separator className="my-6" />
      <Skeleton className="h-6 w-40 mb-4" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="mb-6">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-20 w-full rounded-lg mb-1" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// New Comment Form Component
function NewCommentForm({ discussionId }: { discussionId: number }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const form = useForm<NewCommentValues>({
    resolver: zodResolver(newCommentSchema),
    defaultValues: {
      content: "",
      authorId: user?.id || 0,
      discussionId: discussionId,
      parentId: null,
    },
  });
  
  const commentMutation = useMutation({
    mutationFn: async (values: NewCommentValues) => {
      if (!user) throw new Error("You must be logged in to comment");
      
      return apiRequest(`/api/discussions/${discussionId}/comments`, {
        method: "POST",
        body: JSON.stringify(values)
      });
    },
    onSuccess: () => {
      toast({
        title: "Comment posted!",
        description: "Your comment has been added successfully.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: [`/api/discussions/${discussionId}/comments`] });
    },
    onError: (error) => {
      toast({
        title: "Error posting comment",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(data: NewCommentValues) {
    commentMutation.mutate(data);
  }
  
  if (!user || user.isGuest) return null;
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-base">Add a Comment</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your thoughts..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={commentMutation.isPending}
              >
                {commentMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Post Comment
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// Main Discussion Detail Component
export default function DiscussionDetail({ params }: { params: { id: string } }) {
  const discussionId = parseInt(params.id);
  const [, setLocation] = useLocation();
  
  // Fetch discussion data
  const discussionQuery = useQuery({
    queryKey: [`/api/discussions/${discussionId}`],
    queryFn: getQueryFn<Discussion>({
      on401: "returnNull",
      url: `/api/discussions/${discussionId}`
    }),
  });
  
  // Fetch comments for the discussion
  const commentsQuery = useQuery({
    queryKey: [`/api/discussions/${discussionId}/comments`],
    queryFn: getQueryFn<Comment[]>({
      on401: "returnNull",
      url: `/api/discussions/${discussionId}/comments`
    }),
    enabled: !!discussionId,
  });
  
  // Handle invalid ID or not found
  if (!discussionId || (discussionQuery.isError && !discussionQuery.isPending)) {
    return (
      <div className="py-12 text-center">
        <p className="text-xl font-medium mb-4">Discussion not found</p>
        <p className="text-neutral-500 mb-6">The discussion you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => setLocation("/discussions")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Discussions
        </Button>
      </div>
    );
  }
  
  // Display loading state
  if (discussionQuery.isLoading) {
    return <DiscussionDetailSkeleton />;
  }
  
  const discussion = discussionQuery.data;
  
  if (!discussion) {
    return (
      <div className="py-12 text-center">
        <p className="text-xl font-medium mb-4">Discussion not found</p>
        <p className="text-neutral-500 mb-6">The discussion you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => setLocation("/discussions")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Discussions
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      {/* Header with back button */}
      <div className="mb-6">
        <Link href="/discussions">
          <Button variant="ghost" className="p-0 hover:bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Discussions
          </Button>
        </Link>
      </div>
      
      {/* Discussion card */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge 
              variant="outline" 
              className={getCategoryColor(discussion.category)}
            >
              {getCategoryDisplayName(discussion.category)}
            </Badge>
          </div>
          <CardTitle className="text-xl">{discussion.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-700 whitespace-pre-line">{discussion.content}</p>
        </CardContent>
        <CardFooter className="text-sm text-neutral-500 border-t pt-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Avatar className="h-6 w-6">
              <AvatarFallback>
                {getInitials(discussion.author?.name || discussion.author?.username || "U")}
              </AvatarFallback>
            </Avatar>
            <span>{discussion.author?.name || discussion.author?.username}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <Calendar className="h-4 w-4" />
            <span>{formatDate(discussion.createdAt)}</span>
          </div>
        </CardFooter>
      </Card>
      
      {/* Comments section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Comments</h2>
          <span className="text-neutral-500 text-sm">
            {commentsQuery.data?.length || 0} 
            {(commentsQuery.data?.length || 0) === 1 ? " comment" : " comments"}
          </span>
        </div>
        
        {commentsQuery.isLoading ? (
          <div className="py-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-neutral-400" />
            <p className="text-neutral-500">Loading comments...</p>
          </div>
        ) : commentsQuery.isError ? (
          <div className="py-8 text-center">
            <p className="text-red-500">Failed to load comments. Please try again later.</p>
          </div>
        ) : commentsQuery.data?.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-neutral-500 mb-4">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {commentsQuery.data?.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        )}
        
        {/* New comment form */}
        <NewCommentForm discussionId={discussionId} />
      </div>
    </div>
  );
}