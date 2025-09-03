// backend/src/middleware/auditLog.ts
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './auth'; // Import from your auth middleware
export const auditLogger = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const originalSend = res.send;
    
    res.send = function(body) {
      // Log admin actions
      if (req.user && req.method !== 'GET') {
        console.log(`ADMIN ACTION: ${req.user.email} ${req.method} ${req.path}`, {
          userId: req.user.id,
          userAgent: req.get('User-Agent'),
          ip: req.ip,
          timestamp: new Date().toISOString()
        });
      }
      return originalSend.call(this, body);
    };
    
    next();
  };