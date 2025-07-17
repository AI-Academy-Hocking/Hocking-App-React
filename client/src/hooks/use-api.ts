import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '@/services/api';

// Analytics hooks
export function useUserAnalytics(userId: string, timeRange: 'week' | 'month' | 'semester' = 'week') {
  return useQuery({
    queryKey: ['analytics', userId, timeRange],
    queryFn: () => apiService.getUserAnalytics(userId, timeRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!userId,
  });
}

export function useRecommendations(userId: string) {
  return useQuery({
    queryKey: ['recommendations', userId],
    queryFn: () => apiService.getRecommendations(userId),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!userId,
  });
}

export function useRecordStudySession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.recordStudySession,
    onSuccess: (data, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['analytics', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['recommendations', variables.userId] });
    },
  });
}

export function useRecordWellnessActivity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.recordWellnessActivity,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['analytics', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['recommendations', variables.userId] });
    },
  });
}

export function useRecordSocialActivity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.recordSocialActivity,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['analytics', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['recommendations', variables.userId] });
    },
  });
}

export function useRecordCareerActivity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.recordCareerActivity,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['analytics', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['recommendations', variables.userId] });
    },
  });
}

// Achievements hooks
export function useAchievements() {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: apiService.getAchievements,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

export function useUserAchievements(userId: string) {
  return useQuery({
    queryKey: ['user-achievements', userId],
    queryFn: () => apiService.getUserAchievements(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!userId,
  });
}

export function useUpdateAchievementProgress() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.updateAchievementProgress,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user-achievements', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['achievement-stats', variables.userId] });
    },
  });
}

export function useAchievementStats(userId: string) {
  return useQuery({
    queryKey: ['achievement-stats', userId],
    queryFn: () => apiService.getAchievementStats(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!userId,
  });
}

export function useLeaderboard() {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: apiService.getLeaderboard,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useUpdateBulkProgress() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.updateBulkProgress,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user-achievements', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['achievement-stats', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    },
  });
}

// Study Groups hooks
export function useStudyGroups(params?: {
  subject?: string;
  difficulty?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ['study-groups', params],
    queryFn: () => apiService.getStudyGroups(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useCreateStudyGroup() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.createStudyGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-groups'] });
    },
  });
}

export function useJoinStudyGroup() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ groupId, userId }: { groupId: string; userId: string }) =>
      apiService.joinStudyGroup(groupId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-groups'] });
    },
  });
}

export function useRateStudyGroup() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ groupId, userId, rating }: { groupId: string; userId: string; rating: number }) =>
      apiService.rateStudyGroup(groupId, userId, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-groups'] });
    },
  });
}

// Events hooks
export function useEvents(params?: {
  category?: string;
  date?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ['events', params],
    queryFn: () => apiService.getEvents(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

export function useAttendEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ eventId, userId }: { eventId: string; userId: string }) =>
      apiService.attendEvent(eventId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

export function useLikeEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ eventId, userId }: { eventId: string; userId: string }) =>
      apiService.likeEvent(eventId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

// Networking hooks
export function useConnections(userId: string) {
  return useQuery({
    queryKey: ['connections', userId],
    queryFn: () => apiService.getConnections(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!userId,
  });
}

export function useCreateConnection() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, targetUserId }: { userId: string; targetUserId: string }) =>
      apiService.createConnection(userId, targetUserId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['connections', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['connections', variables.targetUserId] });
    },
  });
}

// Messaging hooks
export function useMessages(userId: string, conversationId?: string) {
  return useQuery({
    queryKey: ['messages', userId, conversationId],
    queryFn: () => apiService.getMessages(userId, conversationId),
    staleTime: 1 * 60 * 1000, // 1 minute
    enabled: !!userId,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.sendMessage,
    onSuccess: (data, variables) => {
      const conversationId = [variables.senderId, variables.receiverId].sort().join('-');
      queryClient.invalidateQueries({ queryKey: ['messages', variables.senderId, conversationId] });
      queryClient.invalidateQueries({ queryKey: ['messages', variables.receiverId, conversationId] });
    },
  });
}

// Roommate Finder hooks
export function useRoommates(params?: {
  year?: string;
  dorm?: string;
  sleepSchedule?: string;
  studyHabits?: string;
  minCompatibility?: number;
}) {
  return useQuery({
    queryKey: ['roommates', params],
    queryFn: () => apiService.getRoommates(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Custom hook for real-time updates (WebSocket simulation)
export function useRealtimeUpdates(userId: string) {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    if (!userId) return;
    
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      // Refresh key queries
      queryClient.invalidateQueries({ queryKey: ['messages', userId] });
      queryClient.invalidateQueries({ queryKey: ['analytics', userId] });
      queryClient.invalidateQueries({ queryKey: ['recommendations', userId] });
    }, 30000);
    
    return () => clearInterval(interval);
  }, [userId, queryClient]);
}

// Custom hook for offline support
export function useOfflineSupport() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return isOnline;
}

// Custom hook for optimistic updates
export function useOptimisticUpdate<T>(
  queryKey: string[],
  updateFn: (oldData: T) => T
) {
  const queryClient = useQueryClient();
  
  return useCallback(() => {
    queryClient.setQueryData(queryKey, updateFn);
  }, [queryClient, queryKey, updateFn]);
} 