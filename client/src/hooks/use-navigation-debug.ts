import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function useNavigationDebug() {
  const [location] = useLocation();

  useEffect(() => {
    console.log(`🧭 Navigation: ${location}`);
    
    // Log performance timing for debugging slow page loads
    const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (timing) {
      console.log(`⏱️ Page load timing:`, {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart,
        loadComplete: timing.loadEventEnd - timing.loadEventStart,
        total: timing.loadEventEnd - timing.startTime
      });
    }
  }, [location]);

  return { location };
}
