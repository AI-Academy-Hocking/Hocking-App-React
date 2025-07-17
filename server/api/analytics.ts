import express from 'express';
import { z } from 'zod';

const router = express.Router();

// Data validation schemas
const StudySessionSchema = z.object({
  userId: z.string(),
  subject: z.string(),
  duration: z.number(),
  date: z.string(),
  goals: z.array(z.string()),
  completedGoals: z.array(z.string()),
  notes: z.string().optional(),
});

const WellnessActivitySchema = z.object({
  userId: z.string(),
  type: z.enum(['sleep', 'exercise', 'nutrition', 'social', 'mindfulness']),
  value: z.number(),
  date: z.string(),
  notes: z.string().optional(),
});

const SocialActivitySchema = z.object({
  userId: z.string(),
  type: z.enum(['event', 'study_group', 'message', 'connection']),
  activityId: z.string(),
  date: z.string(),
  metadata: z.record(z.any()).optional(),
});

const CareerActivitySchema = z.object({
  userId: z.string(),
  type: z.enum(['application', 'interview', 'skill', 'networking']),
  title: z.string(),
  date: z.string(),
  status: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

// Analytics data storage (in production, this would be a database)
const analyticsData = new Map();

// POST /api/analytics/study-session
router.post('/study-session', async (req, res) => {
  try {
    const data = StudySessionSchema.parse(req.body);
    
    // Store study session data
    if (!analyticsData.has(data.userId)) {
      analyticsData.set(data.userId, {
        studySessions: [],
        wellnessActivities: [],
        socialActivities: [],
        careerActivities: [],
      });
    }
    
    const userData = analyticsData.get(data.userId);
    userData.studySessions.push({
      ...data,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    });
    
    res.json({ success: true, message: 'Study session recorded' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data format' });
  }
});

// POST /api/analytics/wellness-activity
router.post('/wellness-activity', async (req, res) => {
  try {
    const data = WellnessActivitySchema.parse(req.body);
    
    if (!analyticsData.has(data.userId)) {
      analyticsData.set(data.userId, {
        studySessions: [],
        wellnessActivities: [],
        socialActivities: [],
        careerActivities: [],
      });
    }
    
    const userData = analyticsData.get(data.userId);
    userData.wellnessActivities.push({
      ...data,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    });
    
    res.json({ success: true, message: 'Wellness activity recorded' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data format' });
  }
});

// POST /api/analytics/social-activity
router.post('/social-activity', async (req, res) => {
  try {
    const data = SocialActivitySchema.parse(req.body);
    
    if (!analyticsData.has(data.userId)) {
      analyticsData.set(data.userId, {
        studySessions: [],
        wellnessActivities: [],
        socialActivities: [],
        careerActivities: [],
      });
    }
    
    const userData = analyticsData.get(data.userId);
    userData.socialActivities.push({
      ...data,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    });
    
    res.json({ success: true, message: 'Social activity recorded' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data format' });
  }
});

// POST /api/analytics/career-activity
router.post('/career-activity', async (req, res) => {
  try {
    const data = CareerActivitySchema.parse(req.body);
    
    if (!analyticsData.has(data.userId)) {
      analyticsData.set(data.userId, {
        studySessions: [],
        wellnessActivities: [],
        socialActivities: [],
        careerActivities: [],
      });
    }
    
    const userData = analyticsData.get(data.userId);
    userData.careerActivities.push({
      ...data,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    });
    
    res.json({ success: true, message: 'Career activity recorded' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data format' });
  }
});

// GET /api/analytics/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { timeRange = 'week' } = req.query;
    
    const userData = analyticsData.get(userId);
    if (!userData) {
      return res.json({
        studyHours: { daily: [], weekly: [], monthly: [] },
        wellnessScores: { sleep: [], exercise: [], social: [], nutrition: [] },
        socialEngagement: { eventsAttended: 0, studyGroupsJoined: 0, connectionsMade: 0, messagesSent: 0 },
        academicProgress: { assignmentsCompleted: 0, averageGrade: 0, studySessions: 0, attendanceRate: 0 },
        careerMetrics: { applicationsSubmitted: 0, interviewsScheduled: 0, skillsDeveloped: 0, networkingEvents: 0 },
      });
    }
    
    // Calculate analytics based on time range
    const now = new Date();
    const timeRangeMs = timeRange === 'week' ? 7 * 24 * 60 * 60 * 1000 : 
                       timeRange === 'month' ? 30 * 24 * 60 * 60 * 1000 : 
                       90 * 24 * 60 * 60 * 1000;
    
    const filteredStudySessions = userData.studySessions.filter(
      (session: any) => now.getTime() - new Date(session.timestamp).getTime() <= timeRangeMs
    );
    
    const filteredWellness = userData.wellnessActivities.filter(
      (activity: any) => now.getTime() - new Date(activity.timestamp).getTime() <= timeRangeMs
    );
    
    const filteredSocial = userData.socialActivities.filter(
      (activity: any) => now.getTime() - new Date(activity.timestamp).getTime() <= timeRangeMs
    );
    
    const filteredCareer = userData.careerActivities.filter(
      (activity: any) => now.getTime() - new Date(activity.timestamp).getTime() <= timeRangeMs
    );
    
    // Calculate study hours
    const studyHours = {
      daily: Array(7).fill(0),
      weekly: [filteredStudySessions.reduce((sum: number, session: any) => sum + session.duration, 0) / 60],
      monthly: [filteredStudySessions.reduce((sum: number, session: any) => sum + session.duration, 0) / 60],
    };
    
    // Calculate wellness scores
    const wellnessScores = {
      sleep: filteredWellness.filter((a: any) => a.type === 'sleep').map((a: any) => a.value),
      exercise: filteredWellness.filter((a: any) => a.type === 'exercise').map((a: any) => a.value),
      social: filteredWellness.filter((a: any) => a.type === 'social').map((a: any) => a.value),
      nutrition: filteredWellness.filter((a: any) => a.type === 'nutrition').map((a: any) => a.value),
    };
    
    // Calculate social engagement
    const socialEngagement = {
      eventsAttended: filteredSocial.filter((a: any) => a.type === 'event').length,
      studyGroupsJoined: filteredSocial.filter((a: any) => a.type === 'study_group').length,
      connectionsMade: filteredSocial.filter((a: any) => a.type === 'connection').length,
      messagesSent: filteredSocial.filter((a: any) => a.type === 'message').length,
    };
    
    // Calculate academic progress
    const academicProgress = {
      assignmentsCompleted: filteredStudySessions.filter((s: any) => s.completedGoals.length > 0).length,
      averageGrade: 85, // Mock data
      studySessions: filteredStudySessions.length,
      attendanceRate: 92, // Mock data
    };
    
    // Calculate career metrics
    const careerMetrics = {
      applicationsSubmitted: filteredCareer.filter((a: any) => a.type === 'application').length,
      interviewsScheduled: filteredCareer.filter((a: any) => a.type === 'interview').length,
      skillsDeveloped: filteredCareer.filter((a: any) => a.type === 'skill').length,
      networkingEvents: filteredCareer.filter((a: any) => a.type === 'networking').length,
    };
    
    res.json({
      studyHours,
      wellnessScores,
      socialEngagement,
      academicProgress,
      careerMetrics,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve analytics' });
  }
});

// GET /api/analytics/recommendations/:userId
router.get('/recommendations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = analyticsData.get(userId);
    
    if (!userData) {
      return res.json([]);
    }
    
    // Generate AI-powered recommendations
    const recommendations = [];
    
    // Study recommendations
    const totalStudyHours = userData.studySessions.reduce((sum: number, session: any) => sum + session.duration, 0) / 60;
    if (totalStudyHours < 20) {
      recommendations.push({
        id: '1',
        type: 'study',
        title: 'Increase Study Time',
        description: `You've studied ${totalStudyHours.toFixed(1)} hours this week. Consider increasing to 20+ hours for better performance.`,
        confidence: 0.85,
        priority: 'high',
        category: 'Academic Performance',
        impact: 'High - Direct impact on grades',
        timeToComplete: 'Ongoing',
      });
    }
    
    // Wellness recommendations
    const sleepActivities = userData.wellnessActivities.filter((a: any) => a.type === 'sleep');
    if (sleepActivities.length > 0) {
      const avgSleep = sleepActivities.reduce((sum: number, a: any) => sum + a.value, 0) / sleepActivities.length;
      if (avgSleep < 7) {
        recommendations.push({
          id: '2',
          type: 'wellness',
          title: 'Improve Sleep Schedule',
          description: `Your average sleep is ${avgSleep.toFixed(1)} hours. Aim for 7-9 hours for better focus.`,
          confidence: 0.92,
          priority: 'high',
          category: 'Health & Wellness',
          impact: 'High - Better focus and energy',
          timeToComplete: 'Ongoing',
        });
      }
    }
    
    // Social recommendations
    const socialActivities = userData.socialActivities.filter((a: any) => a.type === 'event');
    if (socialActivities.length < 2) {
      recommendations.push({
        id: '3',
        type: 'social',
        title: 'Attend More Events',
        description: 'You\'ve attended few social events. Consider joining campus activities to build connections.',
        confidence: 0.78,
        priority: 'medium',
        category: 'Social Connection',
        impact: 'Medium - Improved collaboration',
        timeToComplete: '1-2 hours',
      });
    }
    
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

export default router; 