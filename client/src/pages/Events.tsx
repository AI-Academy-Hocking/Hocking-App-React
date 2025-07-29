import { useState } from 'react';

// Mock data - in real app, this would come from API
const mockEvents = [
  {
    id: '1',
    title: 'Campus Welcome Party',
    description: 'Join us for a fun evening of music, food, and games to welcome new students!',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow
    time: '6:00 PM',
    location: 'Student Center Plaza',
    attendees: 45,
    maxAttendees: 100,
    category: 'social' as const,
    tags: ['Welcome', 'Music', 'Food'],
    isFree: true,
    organizer: 'Student Activities Board',
    isLiked: false,
    isAttending: false
  },
  {
    id: '2',
    title: 'Career Fair 2024',
    description: 'Meet with top employers and explore internship and job opportunities',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Next week
    time: '10:00 AM',
    location: 'Main Gymnasium',
    attendees: 120,
    maxAttendees: 200,
    category: 'career' as const,
    tags: ['Career', 'Jobs', 'Networking'],
    isFree: true,
    organizer: 'Career Services',
    isLiked: true,
    isAttending: false
  },
  {
    id: '3',
    title: 'Study Skills Workshop',
    description: 'Learn effective study techniques and time management strategies',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // Day after tomorrow
    time: '2:00 PM',
    location: 'Library Conference Room',
    attendees: 25,
    maxAttendees: 30,
    category: 'academic' as const,
    tags: ['Study Skills', 'Workshop', 'Academic'],
    isFree: true,
    organizer: 'Academic Success Center',
    isLiked: false,
    isAttending: true
  },
  {
    id: '4',
    title: 'Housing Social Mixer',
    description: 'Meet your neighbors and make new friends in your dorm community',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
    time: '7:00 PM',
    location: 'Common Room - East Hall',
    attendees: 18,
    maxAttendees: 25,
    category: 'housing' as const,
    tags: ['Social', 'Housing', 'Community'],
    isFree: true,
    organizer: 'Residence Life',
    isLiked: false,
    isAttending: false
  },
  {
    id: '5',
    title: 'Yoga & Wellness Session',
    description: 'Relax and rejuvenate with guided yoga and meditation',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4), // 4 days from now
    time: '5:00 PM',
    location: 'Wellness Center',
    attendees: 15,
    maxAttendees: 20,
    category: 'wellness' as const,
    tags: ['Yoga', 'Wellness', 'Meditation'],
    isFree: true,
    organizer: 'Wellness Center',
    isLiked: true,
    isAttending: false
  },
  {
    id: '6',
    title: 'Basketball Tournament',
    description: 'Intramural basketball tournament - sign up your team!',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
    time: '1:00 PM',
    location: 'Recreation Center',
    attendees: 32,
    maxAttendees: 40,
    category: 'sports' as const,
    tags: ['Basketball', 'Sports', 'Tournament'],
    isFree: true,
    organizer: 'Recreation Department',
    isLiked: false,
    isAttending: false
  }
];

export default function Events() {
  const [events, setEvents] = useState(mockEvents);

  const handleAttendEvent = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isAttending: !event.isAttending, attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1 }
        : event
    ));
    // In real app, this would make an API call
    console.log('Attend event:', eventId);
  };

  const handleLikeEvent = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isLiked: !event.isLiked }
        : event
    ));
    // In real app, this would make an API call
    console.log('Like event:', eventId);
  };



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Campus Events
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover and join exciting events happening on campus
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {event.description}
                </p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Date:</span>
                <span className="ml-2">{event.date.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Time:</span>
                <span className="ml-2">{event.time}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Location:</span>
                <span className="ml-2">{event.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Organizer:</span>
                <span className="ml-2">{event.organizer}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {event.attendees}/{event.maxAttendees} attending
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLikeEvent(event.id)}
                  className={`px-3 py-1 rounded text-sm ${
                    event.isLiked 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {event.isLiked ? 'Liked' : 'Like'}
                </button>
                <button
                  onClick={() => handleAttendEvent(event.id)}
                  className={`px-3 py-1 rounded text-sm ${
                    event.isAttending 
                      ? 'bg-green-500 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {event.isAttending ? 'Attending' : 'Attend'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 