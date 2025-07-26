import { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Heart, Share2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  attendees: number;
  maxAttendees?: number;
  category: 'academic' | 'social' | 'housing' | 'career' | 'wellness' | 'sports';
  tags: string[];
  isFree: boolean;
  price?: number;
  organizer: string;
  image?: string;
  isLiked: boolean;
  isAttending: boolean;
}

interface EventDiscoveryProps {
  events: Event[];
  onAttendEvent: (eventId: string) => void;
  onLikeEvent: (eventId: string) => void;
  onShareEvent: (eventId: string) => void;
}

export function EventDiscovery({ events, onAttendEvent, onLikeEvent, onShareEvent }: EventDiscoveryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['all', 'academic', 'social', 'housing', 'career', 'wellness', 'sports'];
  const dateFilters = ['all', 'today', 'tomorrow', 'this-week', 'this-month'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesDate = selectedDate === 'all' || matchesDateFilter(event.date, selectedDate);
    const matchesPrice = !showFreeOnly || event.isFree;
    
    return matchesSearch && matchesCategory && matchesDate && matchesPrice;
  });

  const matchesDateFilter = (eventDate: Date, filter: string) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    switch (filter) {
      case 'today':
        return eventDate.toDateString() === today.toDateString();
      case 'tomorrow':
        return eventDate.toDateString() === tomorrow.toDateString();
      case 'this-week':
        const weekFromNow = new Date(today);
        weekFromNow.setDate(weekFromNow.getDate() + 7);
        return eventDate >= today && eventDate <= weekFromNow;
      case 'this-month':
        return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
      default:
        return true;
    }
  };

  const getCategoryColor = (category: Event['category']) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'social':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'housing':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200';
      case 'career':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      case 'wellness':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200';
      case 'sports':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Discover Events
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Find exciting events happening on campus
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
            <Filter className="mr-2 h-4 w-4" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger>
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                {dateFilters.map(date => (
                  <SelectItem key={date} value={date}>
                    {date === 'all' ? 'Any Date' : 
                     date === 'today' ? 'Today' :
                     date === 'tomorrow' ? 'Tomorrow' :
                     date === 'this-week' ? 'This Week' : 'This Month'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="free-only"
                checked={showFreeOnly}
                onCheckedChange={(checked) => setShowFreeOnly(checked as boolean)}
              />
              <label htmlFor="free-only" className="text-sm text-gray-700 dark:text-gray-300">
                Free only
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Events ({filteredEvents.length})
          </h3>
        </div>

        {filteredEvents.length === 0 ? (
          <Card className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No events found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria
            </p>
          </Card>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'space-y-4'
          }>
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                {event.image && (
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                )}
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        by {event.organizer}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                      {event.isFree ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                          Free
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                          ${event.price}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Users className="h-3 w-3" />
                      <span>
                        {event.attendees}
                        {event.maxAttendees && ` / ${event.maxAttendees}`} attending
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => onAttendEvent(event.id)}
                      disabled={Boolean(event.isAttending || (event.maxAttendees && event.attendees >= event.maxAttendees))}
                      className="flex-1"
                      variant={event.isAttending ? "outline" : "default"}
                    >
                      {event.isAttending ? 'Attending' : 
                       event.maxAttendees && event.attendees >= event.maxAttendees ? 'Full' : 'Attend'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onLikeEvent(event.id)}
                      className={event.isLiked ? 'text-red-600 border-red-600' : ''}
                    >
                      <Heart className={`h-4 w-4 ${event.isLiked ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onShareEvent(event.id)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 