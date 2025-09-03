import express, { Request, Response } from 'express';
import { authMiddleware, adminMiddleware, AuthRequest } from '../middleware/auth';
import { AdminService } from '../services/adminService';

const router = express.Router();

// Apply middleware
router.use(authMiddleware);
router.use(adminMiddleware);

// Dashboard statistics
router.get('/dashboard/stats', async (req: AuthRequest, res: Response) => {
  try {
    const stats = await AdminService.getDashboardStats();
    res.json(stats);
  } catch (error: any) {
    console.error('Admin stats error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user list
router.get('/users', async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string;

    const result = await AdminService.getUserList(page, limit, search);
    res.json(result);
  } catch (error: any) {
    console.error('Admin users error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;