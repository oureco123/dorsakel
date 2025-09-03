import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AdminService {
  static async getDashboardStats() {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total users
    const totalUsers = await prisma.user.count();

    // New registrations
    const registrations24h = await prisma.user.count({
      where: { createdAt: { gte: yesterday } }
    });

    const registrations7d = await prisma.user.count({
      where: { createdAt: { gte: sevenDaysAgo } }
    });

    const registrations30d = await prisma.user.count({
      where: { createdAt: { gte: thirtyDaysAgo } }
    });

    // Pro users
    const proUsers = await prisma.user.count({
      where: {
        subscriptionType: { in: ['PRO', 'PREMIUM'] }
      }
    });

    // Monthly revenue - check if you have paymentHistory table
    let monthlyRevenue = 0;
    try {
      const revenue = await prisma.paymentHistory.aggregate({
        where: {
          createdAt: { gte: startOfMonth },
          status: 'COMPLETED'
        },
        _sum: { amount: true }
      });
      monthlyRevenue = revenue._sum.amount || 0;
    } catch (error) {
      console.log('PaymentHistory table not found, using mock data');
    }

    return {
      totalUsers,
      registrations: {
        last24h: registrations24h,
        last7d: registrations7d,
        last30d: registrations30d
      },
      proUsers,
      monthlyRevenue,
      monthlyRevenueData: [], // Empty for now
      userGrowthData: [],     // Empty for now
      subscriptionStats: [
        { type: 'FREE', count: totalUsers - proUsers },
        { type: 'PRO', count: proUsers }
      ]
    };
  }

  static async getUserList(page: number = 1, limit: number = 20, search?: string) {
    const skip = (page - 1) * limit;

    const where = search ? {
      OR: [
        { email: { contains: search, mode: 'insensitive' as const } },
        { profile: { firstName: { contains: search, mode: 'insensitive' as const } } },
        { profile: { lastName: { contains: search, mode: 'insensitive' as const } } }
      ]
    } : {};

    const users = await prisma.user.findMany({
      where,
      include: { profile: true },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.user.count({ where });

    return {
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }
}