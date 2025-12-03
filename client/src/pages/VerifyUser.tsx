import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, User, Building, Mail, Calendar, AlertTriangle, ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { useBackNavigation } from "../hooks/use-back-navigation";
import { getApiHost } from "@/services/api";

interface VerificationRequest {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    studentId: string;
    email: string;
    userType: 'student' | 'faculty';
    dormBuilding: string;
    roomNumber: string;
    program: string;
    username: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  verifiedAt?: Date;
  verifiedBy?: string;
}

const VerifyUser: React.FC = () => {
  const [, setLocation] = useLocation();
  const [verification, setVerification] = useState<VerificationRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { goBack } = useBackNavigation();

  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const requestId = urlParams.get('id');

  useEffect(() => {
    if (requestId) {
      fetchVerificationStatus(requestId);
    } else {
      setError('No verification request ID provided');
      setLoading(false);
    }
  }, [requestId]);

  const fetchVerificationStatus = async (id: string) => {
    try {
      const response = await fetch(`http://${getApiHost()}:3000/api/verification/status/${id}`);
      const data = await response.json();

      if (data.success) {
        setVerification(data.verification);
      } else {
        setError(data.message || 'Failed to fetch verification status');
      }
    } catch (error) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (action: 'approve' | 'reject') => {
    if (!verification || !requestId) return;

    setProcessing(true);
    try {
      const response = await fetch(`http://${getApiHost()}:3000/api/verification/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId,
          action,
          verifiedBy: 'Housing Office'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setVerification(data.verification);
        toast({
          title: `User ${action === 'approve' ? 'Approved' : 'Rejected'}! ✅`,
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
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading verification request...</p>
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
            <Button onClick={() => setLocation('/housing')}>
              Return to Housing
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!verification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <p>Verification request not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isProcessed = verification.status !== 'pending';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      {/* Back Navigation */}
      <div className="max-w-2xl mx-auto mb-6">
        <button 
          onClick={goBack}
          className="flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back</span>
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-blue-600 shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-blue-800 to-purple-800 dark:from-blue-600 dark:to-purple-600 text-white">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <User className="h-8 w-8" />
                </div>
              </div>
              <CardTitle className="text-2xl">Campus Social Hub</CardTitle>
              <p className="text-blue-100">User Verification Request</p>
            </CardHeader>

            <CardContent className="p-6">
              {/* Status Badge */}
              <div className="flex justify-center mb-6">
                {verification.status === 'pending' && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    <Clock className="h-4 w-4 mr-2" />
                    Pending Verification
                  </Badge>
                )}
                {verification.status === 'approved' && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approved
                  </Badge>
                )}
                {verification.status === 'rejected' && (
                  <Badge className="bg-red-100 text-red-800 border-red-200">
                    <XCircle className="h-4 w-4 mr-2" />
                    Rejected
                  </Badge>
                )}
              </div>

              {/* User Information */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  User Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <p className="text-gray-900">{verification.user.firstName} {verification.user.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Student ID</label>
                    <p className="text-gray-900">{verification.user.studentId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900 flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {verification.user.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">User Type</label>
                    <p className="text-gray-900">
                      <Badge variant="outline" className="capitalize">
                        {verification.user.userType}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Dorm</label>
                    <p className="text-gray-900 flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {verification.user.dormBuilding} Room {verification.user.roomNumber}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Program</label>
                    <p className="text-gray-900">{verification.user.program}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Username</label>
                    <p className="text-gray-900">{verification.user.username}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Requested</label>
                    <p className="text-gray-900 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(verification.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verification Actions */}
              {!isProcessed && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Verification Required
                  </h3>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-4">
                    Please review the user information above and click one of the buttons below to approve or reject this registration.
                  </p>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => handleVerification('approve')}
                      disabled={processing}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {processing ? 'Processing...' : 'Approve User'}
                    </Button>
                    <Button
                      onClick={() => handleVerification('reject')}
                      disabled={processing}
                      variant="destructive"
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      {processing ? 'Processing...' : 'Reject User'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Verification Result */}
              {isProcessed && (
                <div className={`border rounded-lg p-4 mb-6 ${
                  verification.status === 'approved' 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' 
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
                }`}>
                  <h3 className={`font-semibold mb-2 ${
                    verification.status === 'approved' 
                      ? 'text-green-800 dark:text-green-200' 
                      : 'text-red-800 dark:text-red-200'
                  }`}>
                    {verification.status === 'approved' ? 'User Approved' : 'User Rejected'}
                  </h3>
                  <p className={`text-sm ${
                    verification.status === 'approved' 
                      ? 'text-green-700 dark:text-green-300' 
                      : 'text-red-700 dark:text-red-300'
                  }`}>
                    This user has been {verification.status} by {verification.verifiedBy} on{' '}
                    {verification.verifiedAt ? new Date(verification.verifiedAt).toLocaleString() : 'Unknown date'}.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={() => setLocation('/housing')}
                  variant="outline"
                  className="flex-1"
                >
                  Return to Housing
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

export default VerifyUser; 