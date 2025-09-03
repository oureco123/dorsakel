"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  Crown, 
  Euro, 
  TrendingUp, 
  Calendar,
  Search,
  Filter,
  Download,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Shield
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart as RechartsPieChart, Cell, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Types
interface DashboardStats {
  totalUsers: number;
  registrations: {
    last24h: number;
    last7d: number;
    last30d: number;
  };
  proUsers: number;
  monthlyRevenue: number;
  monthlyRevenueData: Array<{ month: string; revenue: number }>;
  userGrowthData: Array<{ date: string; newUsers: number }>;
  subscriptionStats: Array<{ type: string; count: number }>;
}

interface User {
  id: string;
  email: string;
  subscriptionType: 'FREE' | 'PRO' | 'PREMIUM';
  isActive: boolean;
  createdAt: string;
  profile: {
    firstName: string;
    lastName: string;
  };
}
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://dorsakel.com/api/admin' 
  : 'http://localhost:5005/admin';
// Admin Authentication Hook
const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin - integrate with your auth system
    const checkAdminAuth = async () => {
      try {
        const token = localStorage.getItem('dorsakel_token');
        if (!token) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE.replace('/admin', '')}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.user.role === 'ADMIN' || data.user.role === 'SUPER_ADMIN');
        }
      } catch (error) {
        console.error('Admin auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAuth();
  }, []);

  return { isAdmin, loading };
};

// Dashboard Stats Cards Component
const StatsCards = ({ stats }: { stats: DashboardStats }) => {
  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      change: `+${stats.registrations.last30d} this month`,
      changeType: "positive",
      color: "blue"
    },
    {
      title: "New Registrations (24h)",
      value: stats.registrations.last24h.toString(),
      icon: UserPlus,
      change: `${stats.registrations.last7d} this week`,
      changeType: stats.registrations.last24h > 0 ? "positive" : "neutral",
      color: "green"
    },
    {
      title: "Pro Users",
      value: stats.proUsers.toLocaleString(),
      icon: Crown,
      change: `${((stats.proUsers / stats.totalUsers) * 100).toFixed(1)}% conversion`,
      changeType: "neutral" as const,
      color: "purple"
    },
    {
      title: "Monthly Revenue",
      value: `€${stats.monthlyRevenue.toFixed(2)}`,
      icon: Euro,
      change: "+12% from last month",
      changeType: "positive" as const,
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500",
      green: "bg-green-500", 
      purple: "bg-purple-500",
      orange: "bg-orange-500"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                <p className={`text-sm flex items-center gap-1 ${
                  card.changeType === 'positive' ? 'text-green-600' : 
                  card.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {card.changeType === 'positive' && <TrendingUp className="w-4 h-4" />}
                  {card.change}
                </p>
              </div>
              <div className={`w-12 h-12 ${getColorClasses(card.color)} rounded-lg flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Charts Component
const ChartsSection = ({ stats }: { stats: DashboardStats }) => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
      {/* User Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            User Growth (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stats.userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                formatter={(value) => [value, 'New Users']}
              />
              <Area 
                type="monotone" 
                dataKey="newUsers" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Subscription Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Subscription Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={stats.subscriptionStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, count }) => `${type}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {stats.subscriptionStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

// Revenue Chart Component
const RevenueChart = ({ data }: { data: Array<{ month: string; revenue: number }> }) => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <BarChart3 className="w-5 h-5" />
        Monthly Revenue Trend
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tickFormatter={(month) => new Date(month + '-01').toLocaleDateString('en-US', { month: 'short' })}
          />
          <YAxis tickFormatter={(value) => `€${value}`} />
          <Tooltip 
            labelFormatter={(month) => new Date(month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            formatter={(value) => [`€${value}`, 'Revenue']}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#10B981" 
            strokeWidth={3}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

// User Management Component
const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const token = localStorage.getItem('dorsakel_token');
      const response = await fetch(`${API_BASE}/users?page=${page}&search=${search}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, searchTerm);
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchUsers(1, searchTerm);
  };

  const getSubscriptionBadge = (subscription: string) => {
    const variants = {
      FREE: 'secondary' as const,
      PRO: 'default' as const, 
      PREMIUM: 'default' as const  // Change from 'destructive' to 'default'
    };
    return variants[subscription as keyof typeof variants] || 'secondary' as const;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            User Management
          </span>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardTitle>
        <CardDescription>
          Manage user accounts and subscriptions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search users by email or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">User</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Subscription</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Joined</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        {user.profile.firstName} {user.profile.lastName}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{user.email}</td>
                    <td className="py-4 px-4">
                      <Badge variant={getSubscriptionBadge(user.subscriptionType)}>
                        {user.subscriptionType}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={user.isActive ? 'default' : 'secondary'}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('dorsakel_token');
        const response = await fetch(`${API_BASE}/dashboard/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600">Manage your dental learning platform</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-100 text-blue-800">Admin Access</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {stats && (
          <>
            <StatsCards stats={stats} />
            <ChartsSection stats={stats} />
            <RevenueChart data={stats.monthlyRevenueData} />
            <UserManagement />
          </>
        )}
      </div>
    </div>
  );
};

// Admin Auth Wrapper
const AdminPanel = () => {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Checking admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-6">You don't have permission to access the admin panel.</p>
            <Button onClick={() => window.location.href = '/'}>
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <AdminDashboard />;
};

export default AdminPanel;