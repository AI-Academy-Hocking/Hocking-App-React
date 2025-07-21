import { useState } from 'react';
import { Users, MapPin, Clock, MessageCircle, Heart, Filter, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Roommate {
  id: string;
  name: string;
  avatar?: string;
  age: number;
  major: string;
  year: 'freshman' | 'sophomore' | 'junior' | 'senior';
  dormPreference: string;
  budget: string;
  lifestyle: {
    sleepSchedule: 'early' | 'late' | 'flexible';
    studyHabits: 'quiet' | 'music' | 'flexible';
    cleanliness: 'very-clean' | 'clean' | 'moderate' | 'flexible';
    socialLevel: 'very-social' | 'social' | 'moderate' | 'quiet';
  };
  interests: string[];
  compatibility: number;
  isLiked: boolean;
  isMatched: boolean;
  lastActive: Date;
  bio: string;
}

interface RoommateFinderProps {
  roommates: Roommate[];
  onLikeRoommate: (roommateId: string) => void;
  onMessageRoommate: (roommateId: string) => void;
  onMatchRoommate: (roommateId: string) => void;
}

export function RoommateFinder({ 
  roommates, 
  onLikeRoommate, 
  onMessageRoommate, 
  onMatchRoommate 
}: RoommateFinderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedDorm, setSelectedDorm] = useState('all');
  const [selectedSleepSchedule, setSelectedSleepSchedule] = useState('all');
  const [selectedStudyHabits, setSelectedStudyHabits] = useState('all');
  const [minCompatibility, setMinCompatibility] = useState(70);

  const years = ['all', 'freshman', 'sophomore', 'junior', 'senior'];
  const dorms = ['all', 'East Hall', 'West Hall', 'North Hall', 'South Hall', 'University Apartments'];
  const sleepSchedules = ['all', 'early', 'late', 'flexible'];
  const studyHabits = ['all', 'quiet', 'music', 'flexible'];

  const filteredRoommates = roommates.filter(roommate => {
    const matchesSearch = roommate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roommate.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roommate.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === 'all' || roommate.year === selectedYear;
    const matchesDorm = selectedDorm === 'all' || roommate.dormPreference === selectedDorm;
    const matchesSleep = selectedSleepSchedule === 'all' || roommate.lifestyle.sleepSchedule === selectedSleepSchedule;
    const matchesStudy = selectedStudyHabits === 'all' || roommate.lifestyle.studyHabits === selectedStudyHabits;
    const matchesCompatibility = roommate.compatibility >= minCompatibility;
    
    return matchesSearch && matchesYear && matchesDorm && matchesSleep && matchesStudy && matchesCompatibility;
  });

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-200';
    if (score >= 80) return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-200';
    return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-200';
  };

  const getLifestyleIcon = (type: keyof Roommate['lifestyle'], value: string) => {
    switch (type) {
      case 'sleepSchedule':
        return value === 'early' ? '🌅' : value === 'late' ? '🌙' : '⏰';
      case 'studyHabits':
        return value === 'quiet' ? '🤫' : value === 'music' ? '🎵' : '📚';
      case 'cleanliness':
        return value === 'very-clean' ? '✨' : value === 'clean' ? '🧹' : value === 'moderate' ? '📦' : '🤷';
      case 'socialLevel':
        return value === 'very-social' ? '🎉' : value === 'social' ? '👥' : value === 'moderate' ? '👋' : '🤐';
      default:
        return '❓';
    }
  };

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Find Your Perfect Roommate
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Connect with compatible roommates based on your preferences
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Users className="mr-2 h-4 w-4" />
          My Profile
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-2 border-purple-600">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
          <CardTitle className="flex items-center text-purple-800 dark:text-purple-200">
            <Filter className="mr-2 h-4 w-4" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              placeholder="Search by name, major, or interests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year}>
                    {year === 'all' ? 'All Years' : year.charAt(0).toUpperCase() + year.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDorm} onValueChange={setSelectedDorm}>
              <SelectTrigger>
                <SelectValue placeholder="Dorm Preference" />
              </SelectTrigger>
              <SelectContent>
                {dorms.map(dorm => (
                  <SelectItem key={dorm} value={dorm}>
                    {dorm === 'all' ? 'All Dorms' : dorm}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSleepSchedule} onValueChange={setSelectedSleepSchedule}>
              <SelectTrigger>
                <SelectValue placeholder="Sleep Schedule" />
              </SelectTrigger>
              <SelectContent>
                {sleepSchedules.map(schedule => (
                  <SelectItem key={schedule} value={schedule}>
                    {schedule === 'all' ? 'Any Schedule' : 
                     schedule === 'early' ? 'Early Bird' :
                     schedule === 'late' ? 'Night Owl' : 'Flexible'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStudyHabits} onValueChange={setSelectedStudyHabits}>
              <SelectTrigger>
                <SelectValue placeholder="Study Habits" />
              </SelectTrigger>
              <SelectContent>
                {studyHabits.map(habit => (
                  <SelectItem key={habit} value={habit}>
                    {habit === 'all' ? 'Any Habits' : 
                     habit === 'quiet' ? 'Quiet Study' :
                     habit === 'music' ? 'Music OK' : 'Flexible'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Min Compatibility: {minCompatibility}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={minCompatibility}
                onChange={(e) => setMinCompatibility(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Compatible Roommates ({filteredRoommates.length})
          </h3>
        </div>

        {filteredRoommates.length === 0 ? (
          <Card className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No compatible roommates found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRoommates.map((roommate) => (
              <Card key={roommate.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={roommate.avatar} />
                        <AvatarFallback>{roommate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {roommate.name}, {roommate.age}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {roommate.major} • {roommate.year}
                        </p>
                      </div>
                    </div>
                    <Badge className={getCompatibilityColor(roommate.compatibility)}>
                      {roommate.compatibility}% Match
                    </Badge>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {roommate.bio}
                  </p>

                  {/* Lifestyle */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs">
                      <span>{getLifestyleIcon('sleepSchedule', roommate.lifestyle.sleepSchedule)}</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {roommate.lifestyle.sleepSchedule === 'early' ? 'Early Bird' :
                         roommate.lifestyle.sleepSchedule === 'late' ? 'Night Owl' : 'Flexible'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span>{getLifestyleIcon('studyHabits', roommate.lifestyle.studyHabits)}</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {roommate.lifestyle.studyHabits === 'quiet' ? 'Quiet Study' :
                         roommate.lifestyle.studyHabits === 'music' ? 'Music OK' : 'Flexible'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span>{getLifestyleIcon('cleanliness', roommate.lifestyle.cleanliness)}</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {roommate.lifestyle.cleanliness === 'very-clean' ? 'Very Clean' :
                         roommate.lifestyle.cleanliness === 'clean' ? 'Clean' :
                         roommate.lifestyle.cleanliness === 'moderate' ? 'Moderate' : 'Flexible'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span>{getLifestyleIcon('socialLevel', roommate.lifestyle.socialLevel)}</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {roommate.lifestyle.socialLevel === 'very-social' ? 'Very Social' :
                         roommate.lifestyle.socialLevel === 'social' ? 'Social' :
                         roommate.lifestyle.socialLevel === 'moderate' ? 'Moderate' : 'Quiet'}
                      </span>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Prefers: {roommate.dormPreference}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-600 dark:text-gray-400">
                        Budget: {roommate.budget}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Active {formatLastActive(roommate.lastActive)}
                      </span>
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {roommate.interests.slice(0, 3).map((interest, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                    {roommate.interests.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{roommate.interests.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onMessageRoommate(roommate.id)}
                      className="flex-1"
                      variant="outline"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <Button
                      onClick={() => onLikeRoommate(roommate.id)}
                      variant={roommate.isLiked ? "default" : "outline"}
                      className={roommate.isLiked ? 'bg-red-600 hover:bg-red-700' : ''}
                    >
                      <Heart className={`h-4 w-4 ${roommate.isLiked ? 'fill-current' : ''}`} />
                    </Button>
                    {roommate.compatibility >= 90 && (
                      <Button
                        onClick={() => onMatchRoommate(roommate.id)}
                        variant={roommate.isMatched ? "default" : "outline"}
                        className={roommate.isMatched ? 'bg-green-600 hover:bg-green-700' : ''}
                      >
                        <Star className={`h-4 w-4 ${roommate.isMatched ? 'fill-current' : ''}`} />
                      </Button>
                    )}
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