import React, { Suspense, useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { Card, CardContent } from './ui/card';
import { Loader2 } from 'lucide-react';

interface RouteWrapperProps {
  children: React.ReactNode;
  routeName?: string;
}

// Loading component for Suspense fallback
function RouteLoading({ routeName }: { routeName?: string }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-gray-900">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Loading{routeName ? ` ${routeName}` : '...'}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Please wait while the page loads
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Enhanced route wrapper with retry logic
export default function RouteWrapper({ children, routeName }: RouteWrapperProps) {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  // Reset retry count when children change (new route)
  useEffect(() => {
    setRetryCount(0);
    setIsRetrying(false);
  }, [children]);

  const handleRetry = () => {
    setIsRetrying(true);
    setRetryCount(prev => prev + 1);
    
    // Small delay to show retry state
    setTimeout(() => {
      setIsRetrying(false);
    }, 500);
  };

  if (isRetrying) {
    return <RouteLoading routeName={`${routeName} (Retrying...)`} />;
  }

  return (
    <ErrorBoundary
      key={`${routeName}-${retryCount}`} // Force remount on retry
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6">
              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Failed to load {routeName || 'page'}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  The page encountered an error while loading. Please try again.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleRetry}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Retry
                  </button>
                  <button
                    onClick={() => window.history.back()}
                    className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <Suspense fallback={<RouteLoading routeName={routeName} />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
