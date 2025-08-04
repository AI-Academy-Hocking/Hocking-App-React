import { useState, useMemo } from 'react';

// Define searchable content types
export interface SearchableItem {
  id: string;
  title: string;
  description?: string;
  content?: string;
  category: string;
  url: string;
  tags?: string[];
}

// Define search categories
export const SEARCH_CATEGORIES = {
  PAGES: 'pages',
  TOOLS: 'tools',
  EVENTS: 'events',
  RESOURCES: 'resources',
  CONTACTS: 'contacts',
  PROGRAMS: 'programs'
} as const;

// Searchable content database
const searchableContent: SearchableItem[] = [
  // Pages
  {
    id: 'financial-aid',
    title: 'Financial Aid',
    description: 'View and manage your financial aid, apply for FAFSA, track status, and access forms',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/financial-aid',
    tags: ['money', 'grants', 'loans', 'scholarships', 'fafsa', 'billing', 'payment', 'financial']
  },
  {
    id: 'career-university-center',
    title: 'Career & University Center',
    description: 'Career coaching, job search, resume help, transfer support, and professional development',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/career-university-center',
    tags: ['career', 'jobs', 'resume', 'interview', 'transfer', 'employment', 'work', 'professional']
  },
  {
    id: 'campus-health',
    title: 'Campus Health & Wellness',
    description: 'Medical care, counseling services, mental health support, and wellness resources',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/campus-health',
    tags: ['health', 'medical', 'counseling', 'wellness', 'doctor', 'therapy', 'mental health', 'clinic']
  },
  {
    id: 'housing',
    title: 'Housing',
    description: 'Dormitories, amenities, meal plans, roommates, and housing application process',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/housing',
    tags: ['dorm', 'room', 'meal plan', 'roommate', 'housing', 'residence', 'living', 'accommodation']
  },
  {
    id: 'dining-hall',
    title: 'Dining Hall',
    description: 'Meal plans, dining locations, hours, menus, and food services',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/dining',
    tags: ['food', 'dining', 'meal', 'cafeteria', 'restaurant', 'eat', 'nutrition']
  },
  {
    id: 'maps',
    title: 'Maps & Directions',
    description: 'Campus maps, building locations, directions, and navigation',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/maps',
    tags: ['map', 'location', 'directions', 'building', 'campus', 'navigation', 'where']
  },
  {
    id: 'calendar',
    title: 'Calendar',
    description: 'Academic calendar, events, important dates, and scheduling',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/calendar',
    tags: ['events', 'dates', 'schedule', 'academic calendar', 'important dates', 'deadlines']
  },
  {
    id: 'student-tools',
    title: 'Student Tools',
    description: 'Access to all student resources, tools, and services',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/tools',
    tags: ['tools', 'resources', 'services', 'student portal', 'self-service', 'utilities']
  },
  {
    id: 'library',
    title: 'Library Resources',
    description: 'Books, databases, research tools, study spaces, and academic support',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/library',
    tags: ['books', 'research', 'study', 'database', 'academic', 'library', 'reading']
  },
  {
    id: 'tutoring',
    title: 'Tutoring',
    description: 'Academic support, tutoring services, study help, and learning resources',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/tutoring',
    tags: ['tutoring', 'study', 'academic help', 'learning', 'support', 'homework']
  },
  {
    id: 'athletics',
    title: 'Athletics',
    description: 'Sports teams, fitness facilities, intramurals, and athletic programs',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/athletics',
    tags: ['sports', 'fitness', 'athletics', 'teams', 'gym', 'exercise', 'basketball', 'soccer']
  },
  {
    id: 'recreation',
    title: 'Recreation',
    description: 'Recreational activities, outdoor adventures, and leisure programs',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/recreation',
    tags: ['recreation', 'outdoor', 'activities', 'leisure', 'fun', 'adventure', 'hiking']
  },
  {
    id: 'graduation',
    title: 'Graduation',
    description: 'Graduation requirements, ceremony information, and degree completion',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/graduation',
    tags: ['graduation', 'degree', 'ceremony', 'commencement', 'diploma', 'graduate']
  },
  {
    id: 'billing',
    title: 'Billing',
    description: 'Tuition, fees, payment plans, and billing information',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/billing',
    tags: ['billing', 'payment', 'tuition', 'fees', 'money', 'cost', 'account']
  },
  {
    id: 'scholarships',
    title: 'Scholarships',
    description: 'Available scholarships, application process, and financial assistance',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/scholarships',
    tags: ['scholarships', 'grants', 'money', 'financial aid', 'awards', 'funding']
  },
  {
    id: 'campus-safety',
    title: 'Campus Safety',
    description: 'Security services, emergency contacts, and safety information',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/safety',
    tags: ['safety', 'security', 'emergency', 'police', 'protection', 'crime']
  },
  {
    id: 'academic-success-center',
    title: 'Academic Success Center',
    description: 'Academic support, study skills, and success resources',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/academic-success-center',
    tags: ['academic', 'success', 'study', 'learning', 'support', 'achievement']
  },
  {
    id: 'student-organizations',
    title: 'Student Organizations',
    description: 'Clubs, groups, and student activities on campus',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/student-organizations',
    tags: ['clubs', 'organizations', 'groups', 'activities', 'student life', 'involvement']
  },
  {
    id: 'online-learning',
    title: 'Online Learning',
    description: 'Distance education, online courses, and virtual learning resources',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/online-learning',
    tags: ['online', 'distance', 'virtual', 'remote', 'learning', 'courses']
  },
  {
    id: 'testing-center',
    title: 'Testing Center',
    description: 'Exam scheduling, testing accommodations, and assessment services',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/testing-center',
    tags: ['testing', 'exams', 'assessment', 'accommodations', 'proctoring']
  },
  {
    id: 'trio-services',
    title: 'TRIO Services',
    description: 'Support services for first-generation and low-income students',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/trio-services',
    tags: ['trio', 'first-generation', 'low-income', 'support', 'services']
  },
  {
    id: 'learning-labs',
    title: 'Learning Labs',
    description: 'Computer labs, study spaces, and technology resources',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/learning-labs',
    tags: ['labs', 'computers', 'technology', 'study spaces', 'equipment']
  },
  {
    id: 'accessibility-resources',
    title: 'Accessibility Resources',
    description: 'Disability services, accommodations, and accessibility support',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/accessibility-resources',
    tags: ['accessibility', 'disability', 'accommodations', 'ada', 'support']
  },
  {
    id: 'international-students',
    title: 'International Students',
    description: 'Services and resources for international students',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/international-students',
    tags: ['international', 'foreign', 'visa', 'immigration', 'global']
  },
  {
    id: 'canine-facility',
    title: 'Canine Facility',
    description: 'Dog training programs and canine education resources',
    category: SEARCH_CATEGORIES.PAGES,
    url: '/canine-facility',
    tags: ['canine', 'dogs', 'training', 'veterinary', 'animals', 'pets']
  },

  // Tools
  {
    id: 'course-schedule',
    title: 'Course Schedule',
    description: 'View your current class schedule and course information',
    category: SEARCH_CATEGORIES.TOOLS,
    url: '/tools',
    tags: ['classes', 'schedule', 'courses', 'registration', 'academic']
  },
  {
    id: 'grades',
    title: 'Grades',
    description: 'Check your academic performance and grade reports',
    category: SEARCH_CATEGORIES.TOOLS,
    url: '/tools',
    tags: ['grades', 'academic', 'performance', 'transcript', 'gpa']
  },
  {
    id: 'advising',
    title: 'Advising',
    description: 'Connect with your academic advisor for guidance and support',
    category: SEARCH_CATEGORIES.TOOLS,
    url: '/tools',
    tags: ['advising', 'advisor', 'academic', 'guidance', 'support']
  },

  // Contacts
  {
    id: 'career-center-contact',
    title: 'Career & University Center',
    description: 'Contact the Career Center for job search and career planning help',
    category: SEARCH_CATEGORIES.CONTACTS,
    url: '/career-university-center',
    tags: ['career', 'jobs', 'contact', 'help', 'support']
  },
  {
    id: 'hr-contact',
    title: 'Human Resources',
    description: 'Contact HR for employment questions and student job opportunities',
    category: SEARCH_CATEGORIES.CONTACTS,
    url: '/career-university-center',
    tags: ['hr', 'employment', 'jobs', 'work', 'contact']
  },
  {
    id: 'health-center-contact',
    title: 'Health Center',
    description: 'Contact the Health Center for medical and counseling services',
    category: SEARCH_CATEGORIES.CONTACTS,
    url: '/campus-health',
    tags: ['health', 'medical', 'counseling', 'contact', 'help']
  },

  // Resources
  {
    id: 'fafsa',
    title: 'FAFSA Application',
    description: 'Free Application for Federal Student Aid - apply for financial aid',
    category: SEARCH_CATEGORIES.RESOURCES,
    url: 'https://studentaid.gov/h/apply-for-aid/fafsa',
    tags: ['fafsa', 'financial aid', 'grants', 'loans', 'money']
  },
  {
    id: 'job-board',
    title: 'Job Board',
    description: 'Search for on-campus and off-campus job opportunities',
    category: SEARCH_CATEGORIES.RESOURCES,
    url: 'https://www.hocking.edu/studentjobs',
    tags: ['jobs', 'employment', 'work', 'career', 'opportunities']
  },
  {
    id: 'career-closet',
    title: 'Career Closet',
    description: 'Free professional attire for interviews and job fairs',
    category: SEARCH_CATEGORIES.RESOURCES,
    url: '/career-university-center',
    tags: ['clothing', 'interview', 'professional', 'free', 'attire']
  }
];

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    const words = query.split(' ').filter(word => word.length > 0);

    return searchableContent
      .filter(item => {
        // Filter by category if selected
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }

        // Search in title, description, content, and tags
        const searchableText = [
          item.title.toLowerCase(),
          item.description?.toLowerCase() || '',
          item.content?.toLowerCase() || '',
          ...(item.tags?.map(tag => tag.toLowerCase()) || [])
        ].join(' ');

        // Check if all search words are found (partial matches allowed)
        return words.every(word => searchableText.includes(word));
      })
      .sort((a, b) => {
        const query = searchQuery.toLowerCase();
        
        // Calculate relevance scores
        const getScore = (item: SearchableItem) => {
          let score = 0;
          const title = item.title.toLowerCase();
          const description = item.description?.toLowerCase() || '';
          const tags = item.tags?.map(tag => tag.toLowerCase()) || [];
          
          // Exact title match gets highest score
          if (title === query) score += 100;
          // Title starts with query
          else if (title.startsWith(query)) score += 50;
          // Title contains query
          else if (title.includes(query)) score += 30;
          
          // Description contains query
          if (description.includes(query)) score += 10;
          
          // Tags contain query
          if (tags.some(tag => tag.includes(query))) score += 15;
          
          // Partial word matches
          const words = query.split(' ');
          words.forEach(word => {
            if (title.includes(word)) score += 5;
            if (description.includes(word)) score += 2;
            if (tags.some(tag => tag.includes(word))) score += 3;
          });
          
          return score;
        };
        
        const scoreA = getScore(a);
        const scoreB = getScore(b);
        
        // Sort by score (highest first), then alphabetically
        if (scoreA !== scoreB) {
          return scoreB - scoreA;
        }
        
        return a.title.localeCompare(b.title);
      });
  }, [searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    const categoryCounts = searchResults.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count,
      label: getCategoryLabel(category)
    }));
  }, [searchResults]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    searchResults,
    categories,
    clearSearch: () => setSearchQuery('')
  };
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    [SEARCH_CATEGORIES.PAGES]: 'Pages',
    [SEARCH_CATEGORIES.TOOLS]: 'Tools',
    [SEARCH_CATEGORIES.EVENTS]: 'Events',
    [SEARCH_CATEGORIES.RESOURCES]: 'Resources',
    [SEARCH_CATEGORIES.CONTACTS]: 'Contacts',
    [SEARCH_CATEGORIES.PROGRAMS]: 'Programs'
  };
  return labels[category] || category;
} 