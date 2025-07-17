import React from 'react';
import { Award, Star, Trophy, Target, Users, BookOpen, Home, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface BadgeData {
  id: string;
  name: string;
  description: string;
  category: 'academic' | 'social' | 'housing' | 'wellness' | 'career' | 'general';
  icon: React.ComponentType<any>;
  criteria: string[];
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface BadgeSystemProps {
  badges: BadgeData[];
  onBadgeClick?: (badge: BadgeData) => void;
}

export function BadgeSystem({ badges, onBadgeClick }: BadgeSystemProps) {
  const getCategoryIcon = (category: BadgeData['category']) => {
    switch (category) {
      case 'academic':
        return BookOpen;
      case 'social':
        return Users;
      case 'housing':
        return Home;
      case 'wellness':
        return Heart;
      case 'career':
        return Target;
      default:
        return Award;
    }
  };

  const getRarityColor = (rarity: BadgeData['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300 bg-gray-50 dark:bg-gray-800';
      case 'rare':
        return 'border-blue-300 bg-blue-50 dark:bg-blue-900/20';
      case 'epic':
        return 'border-purple-300 bg-purple-50 dark:bg-purple-900/20';
      case 'legendary':
        return 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'border-gray-300 bg-gray-50 dark:bg-gray-800';
    }
  };

  const getRarityBadge = (rarity: BadgeData['rarity']) => {
    switch (rarity) {
      case 'common':
        return <Badge className="bg-gray-500 text-white text-xs">Common</Badge>;
      case 'rare':
        return <Badge className="bg-blue-500 text-white text-xs">Rare</Badge>;
      case 'epic':
        return <Badge className="bg-purple-500 text-white text-xs">Epic</Badge>;
      case 'legendary':
        return <Badge className="bg-yellow-500 text-white text-xs">Legendary</Badge>;
      default:
        return null;
    }
  };

  const categories = ['all', 'academic', 'social', 'housing', 'wellness', 'career', 'general'] as const;
  const [selectedCategory, setSelectedCategory] = React.useState<typeof categories[number]>('all');

  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === selectedCategory);

  const unlockedCount = badges.filter(badge => badge.unlocked).length;
  const totalCount = badges.length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <Card className="border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-xl text-blue-800 dark:text-blue-200">
            <Trophy className="mr-3 h-6 w-6" />
            Achievement Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {unlockedCount}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Unlocked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {totalCount}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.round((unlockedCount / totalCount) * 100)}%
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Complete</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {badges.filter(b => b.rarity === 'legendary' && b.unlocked).length}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Legendary</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map((badge) => (
          <Card
            key={badge.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              badge.unlocked 
                ? getRarityColor(badge.rarity)
                : 'border-gray-200 dark:border-gray-700 opacity-60'
            }`}
            onClick={() => onBadgeClick?.(badge)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  badge.unlocked 
                    ? 'bg-blue-100 dark:bg-blue-900/30' 
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  <badge.icon className={`h-6 w-6 ${
                    badge.unlocked 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-400'
                  }`} />
                </div>
                {getRarityBadge(badge.rarity)}
              </div>
              
              <h3 className={`font-semibold mb-2 ${
                badge.unlocked 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {badge.name}
              </h3>
              
              <p className={`text-sm mb-3 ${
                badge.unlocked 
                  ? 'text-gray-600 dark:text-gray-300' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}>
                {badge.description}
              </p>

              {badge.progress !== undefined && badge.maxProgress && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{badge.progress}/{badge.maxProgress}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {badge.unlocked && badge.unlockedAt && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Unlocked: {badge.unlockedAt.toLocaleDateString()}
                </p>
              )}

              {!badge.unlocked && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Requirements:</p>
                  {badge.criteria.map((criterion, index) => (
                    <p key={index} className="text-xs text-gray-400 dark:text-gray-500">
                      • {criterion}
                    </p>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 