import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Clock, FileText, Image, Video, BarChart3, Calendar, AlertTriangle, User, Mail, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { useBackNavigation } from "../hooks/use-back-navigation";

interface PostSubmission {
  id: string;
  type: 'text' | 'image' | 'video' | 'poll' | 'event' | 'alert';
  content: string;
  author: {
    firstName: string;
    lastName: string;
    email: string;
    userType: 'student' | 'faculty';
  };
  category: string;
  hashtags: string[];
  emoji?: string;
  pollOptions?: string[];
  eventDetails?: {
    date: string;
    time: string;
    location: string;
    description: string;
  };
  image?: string;
  video?: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  reviewedAt?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
}

const VerifyPost: React.FC = () => {
  const [, setLocation] = useLocation();
  const [post, setPost] = useState<PostSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionForm, setShowRejectionForm] = useState(false);
  const { goBack } = useBackNavigation();

  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  const action = urlParams.get('action');

  useEffect(() => {
    if (postId) {
      fetchPostStatus(postId);
    } else {
      setError('No post ID provided');
      setLoading(false);
    }
  }, [postId]);

  const fetchPostStatus = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/status/${id}`);
      const data = await response.json();

      if (data.success) {
        setPost(data.post);
      } else {
        setError(data.message || 'Failed to fetch post status');
      }
    } catch (error) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (action: 'approve' | 'reject') => {
    if (!post || !postId) return;

    if (action === 'reject' && !rejectionReason.trim()) {
      toast({
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejecting this post.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    try {
      const response = await fetch('http://localhost:3000/api/posts/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          action,
          reviewedBy: 'Housing Office',
          rejectionReason: action === 'reject' ? rejectionReason : undefined
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPost(data.post);
        toast({
          title: `Post ${action === 'approve' ? 'Approved' : 'Rejected'}! ✅`,
          description: data.message,
        });
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process verification",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
      setShowRejectionForm(false);
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="h-5 w-5" />;
      case 'image': return <Image className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      case 'poll': return <BarChart3 className="h-5 w-5" />;
      case 'event': return <Calendar className="h-5 w-5" />;
      case 'alert': return <AlertTriangle className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'alert': return 'bg-red-100 text-red-800 border-red-200';
      case 'event': return 'bg-green-100 text-green-800 border-green-200';
      case 'poll': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading post details...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => setLocation('/housing/social')}>
              Return to Social Hub
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <p>Post not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isProcessed = post.status !== 'pending';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto mb-6">
        <button 
          onClick={goBack}
          className="flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-blue-600 shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <FileText className="h-8 w-8" />
                </div>
              </div>
              <CardTitle className="text-2xl">Campus Social Hub</CardTitle>
              <p className="text-blue-100">Post Verification Request</p>
            </CardHeader>

            <CardContent className="p-6">
              {/* Status Badge */}
              <div className="flex justify-center mb-6">
                {post.status === 'pending' && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    <Clock className="h-4 w-4 mr-2" />
                    Pending Review
                  </Badge>
                )}
                {post.status === 'approved' && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approved
                  </Badge>
                )}
                {post.status === 'rejected' && (
                  <Badge className="bg-red-100 text-red-800 border-red-200">
                    <XCircle className="h-4 w-4 mr-2" />
                    Rejected
                  </Badge>
                )}
              </div>

              {/* Post Content */}
              <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Badge className={`${getPostTypeColor(post.type)}`}>
                      {getPostTypeIcon(post.type)}
                      <span className="ml-1">{post.type.toUpperCase()}</span>
                    </Badge>
                    <div>
                      <div className="font-semibold">{post.author.firstName} {post.author.lastName}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <User className="h-3 w-3" />
                        {post.author.userType}
                        <Mail className="h-3 w-3" />
                        {post.author.email}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 inline mr-1" />
                    {new Date(post.submittedAt).toLocaleString()}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Post Content:</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-gray-800 leading-relaxed">{post.content}</p>
                    {post.emoji && (
                      <div className="text-2xl mt-2">{post.emoji}</div>
                    )}
                  </div>
                </div>

                {post.pollOptions && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Poll Options:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {post.pollOptions.map((option, index) => (
                        <div key={index} className="mb-2">
                          {index + 1}. {option}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {post.eventDetails && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Event Details:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div><strong>Date:</strong> {post.eventDetails.date}</div>
                      <div><strong>Time:</strong> {post.eventDetails.time}</div>
                      <div><strong>Location:</strong> {post.eventDetails.location}</div>
                      <div><strong>Description:</strong> {post.eventDetails.description}</div>
                    </div>
                  </div>
                )}

                {post.hashtags.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Hashtags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {post.hashtags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-500">
                  <strong>Category:</strong> {post.category} • <strong>Post ID:</strong> {post.id}
                </div>
              </div>

              {/* Verification Actions */}
              {!isProcessed && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Review Required
                  </h3>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-4">
                    Please review the post content above and approve or reject the publication.
                  </p>
                  
                  {showRejectionForm && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Rejection:
                      </label>
                      <Textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Please provide a reason for rejecting this post..."
                        className="mb-3"
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    <Button
                      onClick={() => handleVerification('approve')}
                      disabled={processing}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {processing ? 'Processing...' : 'Approve Post'}
                    </Button>
                    {!showRejectionForm ? (
                      <Button
                        onClick={() => setShowRejectionForm(true)}
                        disabled={processing}
                        variant="outline"
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject Post
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleVerification('reject')}
                        disabled={processing}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        {processing ? 'Processing...' : 'Confirm Rejection'}
                      </Button>
                    )}
                  </div>
                  
                  {showRejectionForm && (
                    <Button
                      onClick={() => {
                        setShowRejectionForm(false);
                        setRejectionReason('');
                      }}
                      variant="ghost"
                      className="mt-2"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              )}

              {/* Verification Result */}
              {isProcessed && (
                <div className={`border rounded-lg p-4 mb-6 ${
                  post.status === 'approved' 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' 
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
                }`}>
                  <h3 className={`font-semibold mb-2 ${
                    post.status === 'approved' 
                      ? 'text-green-800 dark:text-green-200' 
                      : 'text-red-800 dark:text-red-200'
                  }`}>
                    {post.status === 'approved' ? 'Post Approved' : 'Post Rejected'}
                  </h3>
                  <p className={`text-sm ${
                    post.status === 'approved' 
                      ? 'text-green-700 dark:text-green-300' 
                      : 'text-red-700 dark:text-red-300'
                  }`}>
                    This post has been {post.status} by {post.reviewedBy} on{' '}
                    {post.reviewedAt ? new Date(post.reviewedAt).toLocaleString() : 'Unknown date'}.
                    {post.rejectionReason && (
                      <div className="mt-2">
                        <strong>Reason:</strong> {post.rejectionReason}
                      </div>
                    )}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={() => setLocation('/housing/social')}
                  variant="outline"
                  className="flex-1"
                >
                  Return to Social Hub
                </Button>
                {!isProcessed && (
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="flex-1"
                  >
                    Refresh Status
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyPost; 