const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Analytics API
  async recordStudySession(data: {
    userId: string;
    subject: string;
    duration: number;
    date: string;
    goals: string[];
    completedGoals: string[];
    notes?: string;
  }) {
    return this.request('/analytics/study-session', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async recordWellnessActivity(data: {
    userId: string;
    type: 'sleep' | 'exercise' | 'nutrition' | 'social' | 'mindfulness';
    value: number;
    date: string;
    notes?: string;
  }) {
    return this.request('/analytics/wellness-activity', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async recordSocialActivity(data: {
    userId: string;
    type: 'event' | 'study_group' | 'message' | 'connection';
    activityId: string;
    date: string;
    metadata?: Record<string, any>;
  }) {
    return this.request('/analytics/social-activity', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async recordCareerActivity(data: {
    userId: string;
    type: 'application' | 'interview' | 'skill' | 'networking';
    title: string;
    date: string;
    status?: string;
    metadata?: Record<string, any>;
  }) {
    return this.request('/analytics/career-activity', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUserAnalytics(userId: string, timeRange: 'week' | 'month' | 'semester' = 'week') {
    return this.request(`/analytics/user/${userId}?timeRange=${timeRange}`);
  }

  async getRecommendations(userId: string) {
    return this.request(`/analytics/recommendations/${userId}`);
  }

  // Achievements API
  async getAchievements() {
    return this.request('/achievements');
  }

  async getUserAchievements(userId: string) {
    return this.request(`/achievements/user/${userId}`);
  }

  async updateAchievementProgress(data: {
    userId: string;
    achievementId: string;
    progress: number;
    metadata?: Record<string, any>;
  }) {
    return this.request('/achievements/progress', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getLeaderboard() {
    return this.request('/achievements/leaderboard');
  }

  async getAchievementStats(userId: string) {
    return this.request(`/achievements/stats/${userId}`);
  }

  async updateBulkProgress(data: {
    userId: string;
    activities: Array<{
      type: string;
      value: number;
    }>;
  }) {
    return this.request('/achievements/bulk-progress', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Social API - Study Groups
  async getStudyGroups(params?: {
    subject?: string;
    difficulty?: string;
    search?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.subject) queryParams.append('subject', params.subject);
    if (params?.difficulty) queryParams.append('difficulty', params.difficulty);
    if (params?.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    return this.request(`/social/study-groups${queryString ? `?${queryString}` : ''}`);
  }

  async createStudyGroup(data: {
    name: string;
    subject: string;
    description: string;
    maxMembers: number;
    meetingTime: string;
    meetingDays: string[];
    location: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    tags: string[];
    createdBy: string;
  }) {
    return this.request('/social/study-groups', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async joinStudyGroup(groupId: string, userId: string) {
    return this.request(`/social/study-groups/${groupId}/join`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  async rateStudyGroup(groupId: string, userId: string, rating: number) {
    return this.request(`/social/study-groups/${groupId}/rate`, {
      method: 'POST',
      body: JSON.stringify({ userId, rating }),
    });
  }

  // Social API - Events
  async getEvents(params?: {
    category?: string;
    date?: string;
    search?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.date) queryParams.append('date', params.date);
    if (params?.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    return this.request(`/social/events${queryString ? `?${queryString}` : ''}`);
  }

  async createEvent(data: {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    maxAttendees?: number;
    category: 'academic' | 'social' | 'housing' | 'career' | 'wellness' | 'sports';
    tags: string[];
    organizer: string;
    isFree: boolean;
    price?: number;
  }) {
    return this.request('/social/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async attendEvent(eventId: string, userId: string) {
    return this.request(`/social/events/${eventId}/attend`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  async likeEvent(eventId: string, userId: string) {
    return this.request(`/social/events/${eventId}/like`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  // Social API - Networking
  async getConnections(userId: string) {
    return this.request(`/social/connections/${userId}`);
  }

  async createConnection(userId: string, targetUserId: string) {
    return this.request('/social/connections', {
      method: 'POST',
      body: JSON.stringify({ userId, targetUserId }),
    });
  }

  // Social API - Messaging
  async getMessages(userId: string, conversationId?: string) {
    const queryParams = conversationId ? `?conversationId=${conversationId}` : '';
    return this.request(`/social/messages/${userId}${queryParams}`);
  }

  async sendMessage(data: {
    senderId: string;
    receiverId: string;
    content: string;
    type?: 'text' | 'image' | 'file';
  }) {
    return this.request('/social/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Social API - Roommate Finder
  async getRoommates(params?: {
    year?: string;
    dorm?: string;
    sleepSchedule?: string;
    studyHabits?: string;
    minCompatibility?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.year) queryParams.append('year', params.year);
    if (params?.dorm) queryParams.append('dorm', params.dorm);
    if (params?.sleepSchedule) queryParams.append('sleepSchedule', params.sleepSchedule);
    if (params?.studyHabits) queryParams.append('studyHabits', params.studyHabits);
    if (params?.minCompatibility) queryParams.append('minCompatibility', params.minCompatibility.toString());

    const queryString = queryParams.toString();
    return this.request(`/social/roommates${queryString ? `?${queryString}` : ''}`);
  }

  // Utility methods
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
export default apiService; 