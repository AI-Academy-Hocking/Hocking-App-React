import { Express, Request, Response, NextFunction } from 'express';

// Simple rate limiting implementation (no external dependency)
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export function rateLimit(windowMs: number, max: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || 'unknown';
    const now = Date.now();
    
    // Clean up old entries
    if (store[key] && store[key].resetTime < now) {
      delete store[key];
    }
    
    // Initialize or increment
    if (!store[key]) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs
      };
    } else {
      store[key].count++;
    }
    
    // Check limit
    if (store[key].count > max) {
      return res.status(429).json({
        error: 'Too many requests, please try again later.'
      });
    }
    
    next();
  };
}

// Basic security headers middleware
export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Remove X-Powered-By header
  res.removeHeader('X-Powered-By');
  
  next();
}

export function setupSecurity(app: Express) {
  // Apply security headers to all routes
  app.use(securityHeaders);
  
  // Rate limiting for API routes (100 requests per 15 minutes)
  app.use('/api/', rateLimit(15 * 60 * 1000, 100));
  
  // Stricter rate limiting for auth endpoints (5 requests per 15 minutes)
  app.use('/api/auth/', rateLimit(15 * 60 * 1000, 5));
  app.use('/api/verification/', rateLimit(15 * 60 * 1000, 10));
}

