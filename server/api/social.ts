import express from 'express';
import { z } from 'zod';

const router = express.Router();

// Data storage (in production, this would be a database)
const studyGroups = new Map();
const events = new Map();
const userConnections = new Map();
const messages = new Map();

// Validation schemas
const StudyGroupSchema = z.object({
  name: z.string(),
  subject: z.string(),
  description: z.string(),
  maxMembers: z.number(),
  meetingTime: z.string(),
  meetingDays: z.array(z.string()),
  location: z.string(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  tags: z.array(z.string()),
  createdBy: z.string(),
});

const EventSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  maxAttendees: z.number().optional(),
  category: z.enum(['academic', 'social', 'housing', 'career', 'wellness', 'sports']),
  tags: z.array(z.string()),
  organizer: z.string(),
  isFree: z.boolean(),
  price: z.number().optional(),
});

const MessageSchema = z.object({
  senderId: z.string(),
  receiverId: z.string(),
  content: z.string(),
  type: z.enum(['text', 'image', 'file']).default('text'),
});

// Study Groups API

// GET /api/social/study-groups
router.get('/study-groups', async (req, res) => {
  try {
    const { subject, difficulty, search } = req.query;
    
    let filteredGroups = Array.from(studyGroups.values());
    
    if (subject && subject !== 'all') {
      filteredGroups = filteredGroups.filter(group => group.subject === subject);
    }
    
    if (difficulty && difficulty !== 'all') {
      filteredGroups = filteredGroups.filter(group => group.difficulty === difficulty);
    }
    
    if (search) {
      const searchLower = search.toString().toLowerCase();
      filteredGroups = filteredGroups.filter(group => 
        group.name.toLowerCase().includes(searchLower) ||
        group.description.toLowerCase().includes(searchLower) ||
        group.subject.toLowerCase().includes(searchLower)
      );
    }
    
    // Add member count and rating to each group
    const groupsWithStats = filteredGroups.map(group => ({
      ...group,
      members: group.members?.length || 0,
      rating: group.ratings ? 
        group.ratings.reduce((sum: number, rating: number) => sum + rating, 0) / group.ratings.length : 
        0,
    }));
    
    res.json(groupsWithStats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve study groups' });
  }
});

// POST /api/social/study-groups
router.post('/study-groups', async (req, res) => {
  try {
    const data = StudyGroupSchema.parse(req.body);
    
    const newGroup = {
      id: Date.now().toString(),
      ...data,
      members: [data.createdBy],
      ratings: [],
      createdAt: new Date().toISOString(),
      isActive: true,
    };
    
    studyGroups.set(newGroup.id, newGroup);
    
    res.json({ success: true, group: newGroup });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data format' });
  }
});

// POST /api/social/study-groups/:groupId/join
router.post('/study-groups/:groupId/join', async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    
    const group = studyGroups.get(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Study group not found' });
    }
    
    if (group.members.includes(userId)) {
      return res.status(400).json({ error: 'Already a member' });
    }
    
    if (group.members.length >= group.maxMembers) {
      return res.status(400).json({ error: 'Group is full' });
    }
    
    group.members.push(userId);
    
    res.json({ success: true, message: 'Joined study group' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to join study group' });
  }
});

// POST /api/social/study-groups/:groupId/rate
router.post('/study-groups/:groupId/rate', async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId, rating } = req.body;
    
    const group = studyGroups.get(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Study group not found' });
    }
    
    if (!group.members.includes(userId)) {
      return res.status(400).json({ error: 'Must be a member to rate' });
    }
    
    if (!group.ratings) {
      group.ratings = [];
    }
    
    group.ratings.push(rating);
    
    res.json({ success: true, message: 'Rating submitted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit rating' });
  }
});

// Events API

// GET /api/social/events
router.get('/events', async (req, res) => {
  try {
    const { category, date, search } = req.query;
    
    let filteredEvents = Array.from(events.values());
    
    if (category && category !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.category === category);
    }
    
    if (date) {
      const targetDate = new Date(date.toString());
      filteredEvents = filteredEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === targetDate.toDateString();
      });
    }
    
    if (search) {
      const searchLower = search.toString().toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.organizer.toLowerCase().includes(searchLower)
      );
    }
    
    // Add attendee count to each event
    const eventsWithStats = filteredEvents.map(event => ({
      ...event,
      attendees: event.attendees?.length || 0,
    }));
    
    res.json(eventsWithStats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});

// POST /api/social/events
router.post('/events', async (req, res) => {
  try {
    const data = EventSchema.parse(req.body);
    
    const newEvent = {
      id: Date.now().toString(),
      ...data,
      attendees: [data.organizer],
      likes: [],
      createdAt: new Date().toISOString(),
    };
    
    events.set(newEvent.id, newEvent);
    
    res.json({ success: true, event: newEvent });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data format' });
  }
});

// POST /api/social/events/:eventId/attend
router.post('/events/:eventId/attend', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;
    
    const event = events.get(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    const isAttending = event.attendees.includes(userId);
    
    if (isAttending) {
      // Remove from attendees
      event.attendees = event.attendees.filter((id: string) => id !== userId);
    } else {
      // Add to attendees
      if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
        return res.status(400).json({ error: 'Event is full' });
      }
      event.attendees.push(userId);
    }
    
    res.json({ 
      success: true, 
      message: isAttending ? 'Removed from event' : 'Added to event',
      isAttending: !isAttending,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update attendance' });
  }
});

// POST /api/social/events/:eventId/like
router.post('/events/:eventId/like', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;
    
    const event = events.get(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    const isLiked = event.likes.includes(userId);
    
    if (isLiked) {
      event.likes = event.likes.filter((id: string) => id !== userId);
    } else {
      event.likes.push(userId);
    }
    
    res.json({ 
      success: true, 
      message: isLiked ? 'Removed like' : 'Added like',
      isLiked: !isLiked,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update like' });
  }
});

// Networking API

// GET /api/social/connections/:userId
router.get('/connections/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userConnectionsList = userConnections.get(userId) || [];
    
    res.json(userConnectionsList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve connections' });
  }
});

// POST /api/social/connections
router.post('/connections', async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;
    
    if (!userConnections.has(userId)) {
      userConnections.set(userId, []);
    }
    
    if (!userConnections.has(targetUserId)) {
      userConnections.set(targetUserId, []);
    }
    
    const userConnectionsList = userConnections.get(userId);
    const targetConnectionsList = userConnections.get(targetUserId);
    
    if (userConnectionsList.includes(targetUserId)) {
      return res.status(400).json({ error: 'Already connected' });
    }
    
    userConnectionsList.push(targetUserId);
    targetConnectionsList.push(userId);
    
    res.json({ success: true, message: 'Connection established' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to establish connection' });
  }
});

// Messaging API

// GET /api/social/messages/:userId
router.get('/messages/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { conversationId } = req.query;
    
    let userMessages = Array.from(messages.values()).filter(
      msg => msg.senderId === userId || msg.receiverId === userId
    );
    
    if (conversationId) {
      userMessages = userMessages.filter(
        msg => msg.conversationId === conversationId
      );
    }
    
    // Group messages by conversation
    const conversations = new Map();
    
    userMessages.forEach(message => {
      const otherUserId = message.senderId === userId ? message.receiverId : message.senderId;
      const conversationKey = [userId, otherUserId].sort().join('-');
      
      if (!conversations.has(conversationKey)) {
        conversations.set(conversationKey, []);
      }
      
      conversations.get(conversationKey).push(message);
    });
    
    const conversationList = Array.from(conversations.entries()).map(([key, messages]) => ({
      conversationId: key,
      messages: messages.sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
    }));
    
    res.json(conversationList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// POST /api/social/messages
router.post('/messages', async (req, res) => {
  try {
    const data = MessageSchema.parse(req.body);
    
    const newMessage = {
      id: Date.now().toString(),
      ...data,
      timestamp: new Date().toISOString(),
      conversationId: [data.senderId, data.receiverId].sort().join('-'),
    };
    
    messages.set(newMessage.id, newMessage);
    
    res.json({ success: true, message: newMessage });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data format' });
  }
});

// Roommate Finder API

// GET /api/social/roommates
router.get('/roommates', async (req, res) => {
  try {
    const { year, dorm, sleepSchedule, studyHabits, minCompatibility } = req.query;
    
    // This would typically query a database of roommate profiles
    // For now, return mock data
    const mockRoommates = [
      {
        id: '1',
        name: 'Alex Johnson',
        age: 19,
        major: 'Computer Science',
        year: 'sophomore',
        dormPreference: 'East Hall',
        budget: '$800-1000/month',
        lifestyle: {
          sleepSchedule: 'early',
          studyHabits: 'quiet',
          cleanliness: 'very-clean',
          socialLevel: 'moderate',
        },
        interests: ['Programming', 'Gaming', 'Music'],
        compatibility: 95,
        lastActive: new Date().toISOString(),
        bio: 'Looking for a quiet roommate who values cleanliness and study time.',
      },
      // Add more mock roommates...
    ];
    
    let filteredRoommates = mockRoommates;
    
    if (year && year !== 'all') {
      filteredRoommates = filteredRoommates.filter(roommate => roommate.year === year);
    }
    
    if (dorm && dorm !== 'all') {
      filteredRoommates = filteredRoommates.filter(roommate => roommate.dormPreference === dorm);
    }
    
    if (sleepSchedule && sleepSchedule !== 'all') {
      filteredRoommates = filteredRoommates.filter(roommate => roommate.lifestyle.sleepSchedule === sleepSchedule);
    }
    
    if (studyHabits && studyHabits !== 'all') {
      filteredRoommates = filteredRoommates.filter(roommate => roommate.lifestyle.studyHabits === studyHabits);
    }
    
    if (minCompatibility) {
      const minComp = parseInt(minCompatibility.toString());
      filteredRoommates = filteredRoommates.filter(roommate => roommate.compatibility >= minComp);
    }
    
    res.json(filteredRoommates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve roommates' });
  }
});

export default router; 