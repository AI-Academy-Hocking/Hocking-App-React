import { useState } from 'react';
import { Search, Users, BookOpen, MapPin, Clock, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  description: string;
  members: number;
  maxMembers: number;
  meetingTime: string;
  meetingDays: string[];
  location: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  rating: number;
  isActive: boolean;
}

interface StudyGroupFinderProps {
  groups: StudyGroup[];
  onJoinGroup: (groupId: string) => void;
  onCreateGroup: () => void;
}

export function StudyGroupFinder({ groups, onJoinGroup, onCreateGroup }: StudyGroupFinderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');

  const subjects = ['all', 'Mathematics', 'Science', 'English', 'History', 'Computer Science', 'Business', 'Arts'];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];
  const timeSlots = ['all', 'morning', 'afternoon', 'evening', 'weekend'];

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || group.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || group.difficulty === selectedDifficulty;
    const matchesTime = selectedTime === 'all' || group.meetingTime.includes(selectedTime);
    
    return matchesSearch && matchesSubject && matchesDifficulty && matchesTime;
  });

  const getDifficultyColor = (difficulty: StudyGroup['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Find Study Groups
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Connect with classmates and improve your academic performance
          </p>
        </div>
        <Button onClick={onCreateGroup} className="bg-blue-600 hover:bg-blue-700">
          <Users className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="text-blue-800 dark:text-blue-200">Search & Filters</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map(time => (
                  <SelectItem key={time} value={time}>
                    {time === 'all' ? 'Any Time' : time.charAt(0).toUpperCase() + time.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Available Groups ({filteredGroups.length})
          </h3>
        </div>

        {filteredGroups.length === 0 ? (
          <Card className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No study groups found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search criteria or create a new group
            </p>
            <Button onClick={onCreateGroup} variant="outline">
              Create Study Group
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {group.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {group.subject}
                      </p>
                    </div>
                    <Badge className={getDifficultyColor(group.difficulty)}>
                      {group.difficulty}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {group.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Users className="h-3 w-3" />
                      <span>{group.members}/{group.maxMembers} members</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{group.meetingTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="h-3 w-3" />
                      <span>{group.meetingDays.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <MapPin className="h-3 w-3" />
                      <span>{group.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Star className="h-3 w-3" />
                      <span>{group.rating.toFixed(1)} rating</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {group.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    onClick={() => onJoinGroup(group.id)}
                    disabled={group.members >= group.maxMembers}
                    className="w-full"
                    variant={group.members >= group.maxMembers ? "outline" : "default"}
                  >
                    {group.members >= group.maxMembers ? 'Full' : 'Join Group'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 