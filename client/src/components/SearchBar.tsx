import { useState, useRef, useEffect } from 'react';
import { Search, X, ExternalLink, FileText, Briefcase, Users, BookOpen, Wrench, Calendar } from 'lucide-react';
import { useSearch, type SearchableItem } from '@/hooks/use-search';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/auth';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

const categoryIcons = {
  pages: FileText,
  tools: Wrench,
  events: Calendar,
  resources: BookOpen,
  contacts: Users,
  programs: Briefcase
};

export function SearchBar({ className = '', placeholder = 'Search...' }: SearchBarProps) {
  const { searchQuery, setSearchQuery, searchResults, clearSearch } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setIsOpen(false);
    }
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || searchResults.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handleResultClick(searchResults[selectedIndex]);
        } else if (searchResults.length > 0) {
          // If no item is selected, click the first result
          handleResultClick(searchResults[0]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      case 'Tab':
        // Close dropdown when tabbing out
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleResultClick = (result: SearchableItem) => {
    console.log('Search result clicked:', result);
    console.log('User authenticated:', isAuthenticated);
    
    if (result.url.startsWith('http')) {
      window.open(result.url, '_blank', 'noopener,noreferrer');
    } else {
      console.log('Navigating to:', result.url);
      setLocation(result.url);
    }
    setIsOpen(false);
    setSelectedIndex(-1);
    clearSearch();
    
    // Dispatch a custom event to notify the header that search should be closed
    window.dispatchEvent(new CustomEvent('searchResultClicked'));
  };

  const getCategoryIcon = (category: string) => {
    const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || FileText;
    return <IconComponent className="h-4 w-4" />;
  };

  const handleInputFocus = () => {
    if (searchQuery && searchResults.length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Search input changed:', e.target.value);
    setSearchQuery(e.target.value);
    if (e.target.value) {
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="w-full pl-8 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          style={{ minWidth: 0, width: '100%', maxWidth: 'none' }}
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            tabIndex={-1}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <AnimatePresence>
        {isOpen && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
          >
            <div className="py-1">
              {searchResults.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className={`px-3 py-2 cursor-pointer transition-colors text-sm ${
                    index === selectedIndex
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleResultClick(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(result.category)}
                    <span className={`truncate font-medium ${
                      index === selectedIndex 
                        ? 'text-blue-900 dark:text-blue-100' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {result.title}
                    </span>
                    {result.url.startsWith('http') && (
                      <ExternalLink className="h-3 w-3 text-gray-400" />
                    )}
                  </div>
                  {result.description && (
                    <p className={`text-xs mt-0.5 line-clamp-1 ${
                      index === selectedIndex 
                        ? 'text-blue-700 dark:text-blue-300' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {result.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && searchQuery && searchResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-3 text-center text-xs text-gray-600 dark:text-gray-400"
          >
            No results found
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 