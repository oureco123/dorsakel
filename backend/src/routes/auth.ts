import express, { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { authMiddleware, AuthRequest } from '../middleware/auth';

// Use require for express-validator to avoid import issues
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Register endpoint
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').optional().isString().trim(),
  body('lastName').optional().isString().trim()
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName } = req.body;
    const result = await AuthService.register(email, password, firstName, lastName);

    res.status(201).json({
      message: 'User registered successfully',
      token: result.token,
      user: {
        id: result.user.id,
        email: result.user.email,
        role: result.user.role,
        subscriptionType: result.user.subscriptionType,
        profile: result.user.profile
      }
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Login endpoint
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const result = await AuthService.login(email, password);

    res.json({
      message: 'Login successful',
      token: result.token,
      user: {
        id: result.user.id,
        email: result.user.email,
        role: result.user.role,
        subscriptionType: result.user.subscriptionType,
        profile: result.user.profile,
        subscription: result.user.subscription
      }
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

// Get current user
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
      subscriptionType: req.user.subscriptionType,
      profile: req.user.profile,
      subscription: req.user.subscription,
      statistics: req.user.statistics
    }
  });
});

// Logout
router.post('/logout', authMiddleware, async (req: AuthRequest, res: Response) => {
  console.log(`User ${req.user.email} logged out at ${new Date()}`);
  res.json({ message: 'Logged out successfully' });
});

export = router;