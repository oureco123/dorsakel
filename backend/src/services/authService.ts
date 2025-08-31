const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  subscriptionType: string;
}

export class AuthService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
  private static readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  static async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateToken(user: AuthUser): string {
    return jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        subscriptionType: user.subscriptionType 
      },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN }
    );
  }

  static verifyToken(token: string): AuthUser | null {
    try {
      return jwt.verify(token, this.JWT_SECRET) as AuthUser;
    } catch {
      return null;
    }
  }

  static async register(email: string, password: string, firstName?: string, lastName?: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const passwordHash = await this.hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        profile: {
          create: {
            firstName: firstName || '',
            lastName: lastName || '',
          }
        },
        statistics: {
          create: {}
        }
      },
      include: {
        profile: true
      }
    });

    const token = this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      subscriptionType: user.subscriptionType
    });

    return { user, token };
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
        subscription: true
      }
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await this.comparePasswords(password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('Account is disabled');
    }

    const token = this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      subscriptionType: user.subscriptionType
    });

    return { user, token };
  }

  static async getUserFromToken(token: string) {
    const decoded = this.verifyToken(token);
    if (!decoded) return null;

    return prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        profile: true,
        subscription: true,
        statistics: true
      }
    });
  }
}