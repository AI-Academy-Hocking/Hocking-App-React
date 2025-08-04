import { useLocation } from 'wouter';

export const useBackNavigation = () => {
  const [, setLocation] = useLocation();

  const goBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback to home page if no history
      setLocation('/');
    }
  };

  return { goBack };
}; 