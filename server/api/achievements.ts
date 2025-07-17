import express from 'express';
import { z } from 'zod';

const router = express.Router();

// Achievement definitions
const ACHIEVEMENTS = [
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Complete your first week of classes',
    category: 'academic',
    criteria: [
      { type: 'attendance', value: 5, description: 'Attend 5 classes' },
      { type: 'assignment', value: 1, description: 'Complete first assignment' }
    ],
    rarity: 'common',
    icon: 'award',
    points: 10
  },
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Join 3 study groups or clubs',
    category: 'social',
    criteria: [
      { type: 'study_groups', value: 3, description: 'Join 3 groups' },
      { type: 'meetings', value: 5, description: 'Attend 5 meetings' }
    ],
    rarity: 'rare',
    icon: 'users',
    points: 25
  },
  {
    id: 'housing_hero',
    name: 'Housing Hero',
    description: 'Complete all housing requirements',
    category: 'housing',
    criteria: [
      { type: 'application', value: 1, description: 'Submit application' },
      { type: 'orientation', value: 1, description: 'Complete orientation' },
      { type: 'move_in', value: 1, description: 'Move in' }
    ],
    rarity: 'epic',
    icon: 'home',
    points: 50
  },
  {
    id: 'wellness_champion',
    name: 'Wellness Champion',
    description: 'Maintain wellness streak for 30 days',
    category: 'wellness',
    criteria: [
      { type: 'wellness_streak', value: 30, description: '30 day streak' }
    ],
    rarity: 'legendary',
    icon: 'heart',
    points: 100
  },
  {
    id: 'study_master',
    name: 'Study Master',
    description: 'Complete 50 study sessions',
    category: 'academic',
    criteria: [
      { type: 'study_sessions', value: 50, description: 'Complete 50 sessions' },
      { type: 'completion_rate', value: 80, description: 'Maintain 80% completion rate' }
    ],
    rarity: 'rare',
    icon: 'book-open',
    points: 75
  },
  {
    id: 'career_explorer',
    name: 'Career Explorer',
    description: 'Attend 5 career events',
    category: 'career',
    criteria: [
      { type: 'career_events', value: 5, description: 'Attend 5 events' }
    ],
    rarity: 'epic',
    icon: 'target',
    points: 60
  },
  {
    id: 'perfect_attendance',
    name: 'Perfect Attendance',
    description: 'Attend all classes for a full semester',
    category: 'academic',
    criteria: [
      { type: 'attendance_rate', value: 100, description: '100% attendance' },
      { type: 'semester_complete', value: 1, description: 'Complete semester' }
    ],
    rarity: 'legendary',
    icon: 'star',
    points: 150
  },
  {
    id: 'community_leader',
    name: 'Community Leader',
    description: 'Organize 3 campus events',
    category: 'social',
    criteria: [
      { type: 'events_organized', value: 3, description: 'Organize 3 events' },
      { type: 'attendees', value: 20, description: 'Get 20+ attendees' }
    ],
    rarity: 'epic',
    icon: 'users',
    points: 80
  },
  {
    id: 'fitness_fanatic',
    name: 'Fitness Fanatic',
    description: 'Exercise for 30 days straight',
    category: 'wellness',
    criteria: [
      { type: 'exercise_streak', value: 30, description: '30 day exercise streak' }
    ],
    rarity: 'rare',
    icon: 'heart',
    points: 40
  },
  {
    id: 'academic_excellence',
    name: 'Academic Excellence',
    description: 'Maintain 4.0 GPA for a semester',
    category: 'academic',
    criteria: [
      { type: 'gpa', value: 4.0, description: '4.0 GPA' },
      { type: 'semester_complete', value: 1, description: 'Complete semester' }
    ],
    rarity: 'legendary',
    icon: 'trophy',
    points: 200
  }
];

// User achievement data storage
const userAchievements = new Map();

// Schema for progress updates
const ProgressUpdateSchema = z.object({
  userId: z.string(),
  achievementId: z.string(),
  progress: z.number(),
  metadata: z.record(z.any()).optional(),
});

// GET /api/achievements
router.get('/', async (req, res) => {
  try {
    res.json(ACHIEVEMENTS);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve achievements' });
  }
});

// GET /api/achievements/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = userAchievements.get(userId) || { unlocked: [], progress: {} };
    
    // Map achievements with user progress
    const achievementsWithProgress = ACHIEVEMENTS.map(achievement => {
      const userProgress = userData.progress[achievement.id] || 0;
      const isUnlocked = userData.unlocked.includes(achievement.id);
      
      return {
        ...achievement,
        unlocked: isUnlocked,
        progress: userProgress,
        maxProgress: Math.max(...achievement.criteria.map(c => c.value)),
        unlockedAt: isUnlocked ? userData.unlockedDates?.[achievement.id] : undefined,
      };
    });
    
    res.json(achievementsWithProgress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user achievements' });
  }
});

// POST /api/achievements/progress
router.post('/progress', async (req, res) => {
  try {
    const data = ProgressUpdateSchema.parse(req.body);
    
    if (!userAchievements.has(data.userId)) {
      userAchievements.set(data.userId, {
        unlocked: [],
        progress: {},
        unlockedDates: {},
        totalPoints: 0,
      });
    }
    
    const userData = userAchievements.get(data.userId);
    const achievement = ACHIEVEMENTS.find(a => a.id === data.achievementId);
    
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    
    // Update progress
    userData.progress[data.achievementId] = data.progress;
    
    // Check if achievement should be unlocked
    const shouldUnlock = achievement.criteria.every(criterion => {
      const currentProgress = userData.progress[data.achievementId] || 0;
      return currentProgress >= criterion.value;
    });
    
    if (shouldUnlock && !userData.unlocked.includes(data.achievementId)) {
      userData.unlocked.push(data.achievementId);
      userData.unlockedDates[data.achievementId] = new Date().toISOString();
      userData.totalPoints += achievement.points;
      
      // In a real app, you might want to send notifications here
      console.log(`Achievement unlocked: ${achievement.name} for user ${data.userId}`);
    }
    
    res.json({ 
      success: true, 
      unlocked: shouldUnlock && !userData.unlocked.includes(data.achievementId),
      totalPoints: userData.totalPoints,
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data format' });
  }
});

// GET /api/achievements/leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = Array.from(userAchievements.entries())
      .map(([userId, data]) => ({
        userId,
        totalPoints: data.totalPoints || 0,
        unlockedCount: data.unlocked?.length || 0,
        achievements: data.unlocked || [],
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 10);
    
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve leaderboard' });
  }
});

// GET /api/achievements/stats/:userId
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = userAchievements.get(userId) || { unlocked: [], progress: {} };
    
    const stats = {
      totalAchievements: ACHIEVEMENTS.length,
      unlockedCount: userData.unlocked?.length || 0,
      totalPoints: userData.totalPoints || 0,
      completionRate: Math.round(((userData.unlocked?.length || 0) / ACHIEVEMENTS.length) * 100),
      rarityBreakdown: {
                common: userData.unlocked?.filter((id: string) =>
          ACHIEVEMENTS.find(a => a.id === id)?.rarity === 'common'
        ).length || 0,
        rare: userData.unlocked?.filter((id: string) =>
          ACHIEVEMENTS.find(a => a.id === id)?.rarity === 'rare'
        ).length || 0,
        epic: userData.unlocked?.filter((id: string) =>
          ACHIEVEMENTS.find(a => a.id === id)?.rarity === 'epic'
        ).length || 0,
        legendary: userData.unlocked?.filter((id: string) =>
          ACHIEVEMENTS.find(a => a.id === id)?.rarity === 'legendary'
        ).length || 0,
      },
      categoryBreakdown: {
        academic: userData.unlocked?.filter((id: string) =>
          ACHIEVEMENTS.find(a => a.id === id)?.category === 'academic'
        ).length || 0,
        social: userData.unlocked?.filter((id: string) =>
          ACHIEVEMENTS.find(a => a.id === id)?.category === 'social'
        ).length || 0,
        wellness: userData.unlocked?.filter((id: string) =>
          ACHIEVEMENTS.find(a => a.id === id)?.category === 'wellness'
        ).length || 0,
        career: userData.unlocked?.filter((id: string) =>
          ACHIEVEMENTS.find(a => a.id === id)?.category === 'career'
        ).length || 0,
        housing: userData.unlocked?.filter((id: string) =>
          ACHIEVEMENTS.find(a => a.id === id)?.category === 'housing'
        ).length || 0,
      },
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve achievement stats' });
  }
});

// POST /api/achievements/bulk-progress
router.post('/bulk-progress', async (req, res) => {
  try {
    const { userId, activities } = req.body;
    
    if (!userAchievements.has(userId)) {
      userAchievements.set(userId, {
        unlocked: [],
        progress: {},
        unlockedDates: {},
        totalPoints: 0,
      });
    }
    
    const userData = userAchievements.get(userId);
    const newlyUnlocked = [];
    
    // Process each activity and update relevant achievements
    for (const activity of activities) {
      for (const achievement of ACHIEVEMENTS) {
        for (const criterion of achievement.criteria) {
          if (criterion.type === activity.type) {
            const currentProgress = userData.progress[achievement.id] || 0;
            const newProgress = Math.min(currentProgress + activity.value, criterion.value);
            
            userData.progress[achievement.id] = newProgress;
            
            // Check if achievement should be unlocked
            const shouldUnlock = achievement.criteria.every(c => {
              const progress = userData.progress[achievement.id] || 0;
              return progress >= c.value;
            });
            
            if (shouldUnlock && !userData.unlocked.includes(achievement.id)) {
              userData.unlocked.push(achievement.id);
              userData.unlockedDates[achievement.id] = new Date().toISOString();
              userData.totalPoints += achievement.points;
              newlyUnlocked.push(achievement);
            }
          }
        }
      }
    }
    
    res.json({
      success: true,
      newlyUnlocked,
      totalPoints: userData.totalPoints,
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data format' });
  }
});

export default router; 