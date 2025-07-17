import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GripVertical, X } from 'lucide-react';
import { motion } from 'framer-motion';

export interface WidgetConfig {
  id: string;
  type: 'stats' | 'activity' | 'events' | 'weather' | 'achievements' | 'study' | 'wellness';
  title: string;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
  enabled: boolean;
  config?: Record<string, any>;
}

interface DashboardWidgetProps {
  config: WidgetConfig;
  onRemove: (id: string) => void;
  onConfigChange: (id: string, config: Partial<WidgetConfig>) => void;
  children: React.ReactNode;
}

export function DashboardWidget({ config, onRemove, onConfigChange, children }: DashboardWidgetProps) {
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-2 row-span-1',
    large: 'col-span-2 row-span-2'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`${sizeClasses[config.size]} relative`}
    >
      <Card className="h-full border-2 border-blue-600 hover:border-blue-700 transition-all duration-300">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-blue-600 cursor-move" />
              <CardTitle className="text-sm text-blue-800 dark:text-blue-200">
                {config.title}
              </CardTitle>
            </div>
            <button
              onClick={() => onRemove(config.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
} 