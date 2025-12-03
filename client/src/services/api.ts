// Detect the appropriate API host based on environment
export const getApiHost = () => {
  // Production URL (set in .env or environment)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '').replace(/^https?:\/\//, '');
  }
  
  // Check if running on Android (Capacitor)
  const isAndroid = typeof navigator !== 'undefined' && 
    /android/i.test(navigator.userAgent);
  
  // Android emulator uses 10.0.2.2 to reach host's localhost
  return isAndroid ? '10.0.2.2' : 'localhost';
};

export const getApiBaseUrl = () => {
  // Check if we have a production environment variable set
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Check if we're on a deployed site (not localhost)
  if (typeof window !== 'undefined' && 
      !window.location.hostname.includes('localhost') &&
      !window.location.hostname.includes('10.0.2.2')) {
    // Use relative URL on deployed sites (same origin)
    return '/api';
  }
  
  // Local development
  const host = getApiHost();
  return `http://${host}:3000/api`;
};

const API_BASE_URL = getApiBaseUrl();

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