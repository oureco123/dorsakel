import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

export interface AuthRequest extends Request {
  user?: any;
}



export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const user = await AuthService.getUserFromToken(token);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'SUPER_ADMIN') {
    return res.status(403).json({ 
      error: 'Access denied. Admin rights required.',
      requiredRole: ['ADMIN', 'SUPER_ADMIN'],
      userRole: req.user?.role 
    });
  }
  next();
};


export const subscriptionMiddleware = (requiredLevel: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userSubscription = req.user?.subscriptionType || 'FREE';
    
    const subscriptionHierarchy: { [key: string]: string[] } = {
      'FREE': ['FREE'],
      'PRO': ['FREE', 'PRO'],
      'PREMIUM': ['FREE', 'PRO', 'PREMIUM']
    };

    if (!subscriptionHierarchy[userSubscription]?.includes(requiredLevel)) {
      return res.status(403).json({ 
        error: 'Subscription upgrade required',
        requiredLevel,
        currentLevel: userSubscription
      });
    }

    next();
  };
};