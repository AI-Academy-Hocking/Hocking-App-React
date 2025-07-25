export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'event' | 'academic' | 'custom' | 'system';
  priority: 'low' | 'medium' | 'high';
  timestamp: Date;
  read: boolean;
  eventId?: string;
  eventDate?: Date;
  actionUrl?: string;
}

export interface NotificationSettings {
  eventNotifications: boolean;
  academicNotifications: boolean;
  customNotifications: boolean;
  systemNotifications: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  reminderTime: number; // minutes before event
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  targetAudience: 'all' | 'students' | 'faculty' | 'staff';
  priority: 'low' | 'medium' | 'high';
  scheduledFor?: Date;
  sentAt?: Date;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
} 