import rateLimit from 'express-rate-limit';

export const adminRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many admin requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
});