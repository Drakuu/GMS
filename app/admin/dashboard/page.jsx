'use client';

import React from 'react';
import {
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Dumbbell,
  Target,
  Activity,
  UserPlus,
  CreditCard,
  AlertCircle,
  Clock,
  Award,
  Zap,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export default function GymDashboard() {
  // Sample data for charts
  const memberGrowthData = [
    { month: 'Jan', members: 120, revenue: 15000 },
    { month: 'Feb', members: 135, revenue: 16800 },
    { month: 'Mar', members: 148, revenue: 18500 },
    { month: 'Apr', members: 162, revenue: 20200 },
    { month: 'May', members: 178, revenue: 22300 },
    { month: 'Jun', members: 195, revenue: 24400 },
  ];

  const classAttendanceData = [
    { day: 'Monday', yoga: 25, cardio: 35, strength: 40, hiit: 20, total: 120 },
    {
      day: 'Tuesday',
      yoga: 30,
      cardio: 42,
      strength: 38,
      hiit: 25,
      total: 135,
    },
    {
      day: 'Wednesday',
      yoga: 28,
      cardio: 38,
      strength: 45,
      hiit: 22,
      total: 133,
    },
    {
      day: 'Thursday',
      yoga: 32,
      cardio: 40,
      strength: 42,
      hiit: 28,
      total: 142,
    },
    { day: 'Friday', yoga: 35, cardio: 45, strength: 48, hiit: 30, total: 158 },
    {
      day: 'Saturday',
      yoga: 40,
      cardio: 50,
      strength: 35,
      hiit: 35,
      total: 160,
    },
    { day: 'Sunday', yoga: 38, cardio: 30, strength: 25, hiit: 15, total: 108 },
  ];

  const membershipTypeData = [
    { name: 'Elite', value: 35, color: '#FA8072', count: 68 },
    { name: 'Premium', value: 40, color: '#B22222', count: 78 },
    { name: 'Standard', value: 25, color: '#DC143C', count: 49 },
  ];

  const recentMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      joinDate: '2024-01-15',
      plan: 'Elite',
      status: 'Active',
      avatar: 'SJ',
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      joinDate: '2024-01-14',
      plan: 'Premium',
      status: 'Active',
      avatar: 'MC',
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.d@email.com',
      joinDate: '2024-01-13',
      plan: 'Elite',
      status: 'Pending',
      avatar: 'ED',
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james.w@email.com',
      joinDate: '2024-01-12',
      plan: 'Standard',
      status: 'Active',
      avatar: 'JW',
    },
    {
      id: 5,
      name: 'Lisa Brown',
      email: 'lisa.b@email.com',
      joinDate: '2024-01-11',
      plan: 'Premium',
      status: 'Active',
      avatar: 'LB',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'member_join',
      user: 'Sarah Johnson',
      action: 'joined Elite plan',
      time: '2 hours ago',
      icon: UserPlus,
    },
    {
      id: 2,
      type: 'payment',
      user: 'Mike Chen',
      action: 'payment received $149',
      time: '4 hours ago',
      icon: CreditCard,
    },
    {
      id: 3,
      type: 'class',
      user: 'Emma Davis',
      action: 'booked HIIT class',
      time: '6 hours ago',
      icon: Calendar,
    },
    {
      id: 4,
      type: 'achievement',
      user: 'James Wilson',
      action: 'completed 30-day challenge',
      time: '8 hours ago',
      icon: Award,
    },
    {
      id: 5,
      type: 'alert',
      user: 'System',
      action: 'Equipment maintenance scheduled',
      time: '12 hours ago',
      icon: AlertCircle,
    },
  ];

  function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-red-200 rounded-lg p-4 shadow-xl">
          <p className="text-red-600 font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="text-gray-800 text-sm"
              style={{ color: entry.color }}
            >
              <span className="capitalize">{entry.dataKey}:</span> {entry.value}{' '}
              attendees
            </p>
          ))}
          <div className="border-t border-red-200 mt-2 pt-2">
            <p className="text-red-500 font-medium">
              Total: {payload.reduce((sum, entry) => sum + entry.value, 0)}{' '}
              attendees
            </p>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-full mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-red-50 to-white border border-red-200 rounded-2xl p-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-4">
              <div className="p-3 bg-red-600 rounded-xl">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Welcome to Click Fitness
              </span>
            </h1>
            <p className="text-red-600/80 mt-2 text-lg">
              Professional Gym Management System
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center rounded-full bg-green-100 text-green-800 border-green-200 px-4 py-2 text-sm font-medium">
              <Activity className="h-4 w-4 mr-2" />
              System Online
            </span>
            <button className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 font-semibold shadow-lg shadow-red-500/25">
              <UserPlus className="h-5 w-5 mr-2" />
              Add Member
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Metric Card 1 */}
          <div className="rounded-xl border border-red-200 bg-white p-6 shadow">
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-sm font-medium text-red-600">
                Total Members
              </h3>
              <div className="p-2 bg-red-100 rounded-lg">
                <Users className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1,234</div>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">+12%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          </div>

          {/* Metric Card 2 */}
          <div className="rounded-xl border border-red-200 bg-white p-6 shadow">
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-sm font-medium text-red-600">
                Monthly Revenue
              </h3>
              <div className="p-2 bg-red-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                $24,400
              </div>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">+8%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          </div>

          {/* Metric Card 3 */}
          <div className="rounded-xl border border-red-200 bg-white p-6 shadow">
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-sm font-medium text-red-600">
                Active Classes
              </h3>
              <div className="p-2 bg-red-100 rounded-lg">
                <Calendar className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">28</div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-600 font-medium">15</span>
                <span className="text-gray-500 ml-1">scheduled today</span>
              </div>
            </div>
          </div>

          {/* Metric Card 4 */}
          <div className="rounded-xl border border-red-200 bg-white p-6 shadow">
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-sm font-medium text-red-600">
                Equipment Status
              </h3>
              <div className="p-2 bg-red-100 rounded-lg">
                <Target className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">94%</div>
              <div className="flex items-center text-sm">
                <Zap className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Class Attendance */}
          <div className="lg:col-span-2 rounded-xl border border-red-200 bg-white p-6 shadow">
            <div className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Weekly Class Attendance
                  </h2>
                  <p className="text-red-600/80">
                    Class participation breakdown
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-red-100 text-red-800 border-red-200 px-2 py-1 text-xs">
                    Peak: Sat
                  </span>
                  <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-800 border-gray-200 px-2 py-1 text-xs">
                    Avg: 136
                  </span>
                </div>
              </div>
            </div>
            <div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={classAttendanceData}
                  margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                >
                  <defs>
                    <linearGradient
                      id="yogaGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#E34234" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#E34234"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                    <linearGradient
                      id="cardioGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#B22222" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#B22222"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                    <linearGradient
                      id="strengthGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#DC143C" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#DC143C"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                    <linearGradient
                      id="hiitGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#D2042D" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#D2042D"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="day"
                    stroke="#D2042D"
                    fontSize={11}
                    fontWeight={500}
                    tick={{ fill: '#D2042D' }}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    stroke="#D2042D"
                    fontSize={11}
                    fontWeight={500}
                    tick={{ fill: '#D2042D' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: '10px' }}
                    iconType="rect"
                    formatter={(value) => (
                      <span className="text-gray-800 capitalize font-medium text-sm">
                        {value}
                      </span>
                    )}
                  />
                  <Bar
                    dataKey="yoga"
                    stackId="a"
                    fill="url(#yogaGradient)"
                    name="Yoga"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="cardio"
                    stackId="a"
                    fill="url(#cardioGradient)"
                    name="Cardio"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="strength"
                    stackId="a"
                    fill="url(#strengthGradient)"
                    name="Strength"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="hiit"
                    stackId="a"
                    fill="url(#hiitGradient)"
                    name="HIIT"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>

              {/* Compact Class Summary */}
              <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-red-200">
                {[
                  { name: 'Yoga', total: 228, color: '#3b82f6', trend: '+5%' },
                  {
                    name: 'Cardio',
                    total: 280,
                    color: '#6366f1',
                    trend: '+12%',
                  },
                  {
                    name: 'Strength',
                    total: 273,
                    color: '#8b5cf6',
                    trend: '+8%',
                  },
                  { name: 'HIIT', total: 175, color: '#a855f7', trend: '+15%' },
                ].map((classType, index) => (
                  <div
                    key={index}
                    className="bg-red-50 rounded-lg p-3 border border-red-200 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: classType.color }}
                      />
                      <h4 className="font-medium text-gray-800 text-sm">
                        {classType.name}
                      </h4>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {classType.total}
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      {classType.trend}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Class Schedule */}
          <div className="rounded-xl border border-red-200 bg-white p-6 shadow">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Today's Schedule
              </h2>
              <p className="text-red-600/80">Upcoming classes</p>
            </div>
            <div className="space-y-3 mt-4">
              {[
                {
                  time: '09:00',
                  class: 'Morning Yoga',
                  instructor: 'Sarah',
                  spots: 5,
                },
                {
                  time: '10:30',
                  class: 'HIIT Training',
                  instructor: 'Mike',
                  spots: 3,
                },
                {
                  time: '12:00',
                  class: 'Strength Training',
                  instructor: 'Emma',
                  spots: 8,
                },
                {
                  time: '14:00',
                  class: 'Cardio Blast',
                  instructor: 'James',
                  spots: 2,
                },
                {
                  time: '16:30',
                  class: 'Evening Yoga',
                  instructor: 'Lisa',
                  spots: 6,
                },
                {
                  time: '18:00',
                  class: 'CrossFit',
                  instructor: 'David',
                  spots: 4,
                },
              ].map((schedule, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-red-600 font-bold text-sm bg-red-100 px-2 py-1 rounded">
                      {schedule.time}
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium text-sm">
                        {schedule.class}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {schedule.instructor}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-100 text-green-800 border-green-200 text-xs px-2.5 py-0.5">
                    {schedule.spots} spots
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue and Member Growth */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Member Growth Chart */}
          <div className="rounded-xl border border-red-200 bg-white p-6 shadow">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Member Growth</h2>
              <p className="text-red-600/80">
                Monthly member acquisition trends
              </p>
            </div>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={memberGrowthData}>
                  <defs>
                    <linearGradient
                      id="memberGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#D2042D" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#D2042D"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    opacity={0.3}
                  />
                  <XAxis dataKey="month" stroke="#D2042D" />
                  <YAxis stroke="#D2042D" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #D2042D',
                      borderRadius: '12px',
                      color: '#111827',
                      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.2)',
                    }}
                  />
                  <Bar
                    dataKey="members"
                    fill="url(#memberGradient)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Trend */}
          <div className="rounded-xl border border-red-200 bg-white p-6 shadow">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Revenue Trend</h2>
              <p className="text-red-600/80">Monthly revenue growth</p>
            </div>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={memberGrowthData}>
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#D2042D" stopOpacity={0.3} />
                      <stop
                        offset="100%"
                        stopColor="#D2042D"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    opacity={0.3}
                  />
                  <XAxis dataKey="month" stroke="#D2042D" />
                  <YAxis stroke="#D2042D" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #D2042D',
                      borderRadius: '12px',
                      color: '#111827',
                      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.2)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#D2042D"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#D2042D"
                    strokeWidth={3}
                    dot={{ fill: '#D2042D', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#6366f1' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Membership Distribution and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Members Table */}
          <div className="lg:col-span-2 rounded-xl border border-red-200 bg-white p-6 shadow">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Recent Members
              </h2>
              <p className="text-red-600/80">
                Latest member registrations and their details
              </p>
            </div>
            <div className="mt-4 space-y-4">
              {recentMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-200 hover:border-red-300 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-red-200">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white font-bold">
                        {member.avatar}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
                        {member.name}
                      </p>
                      <p className="text-red-600/70">{member.email}</p>
                      <p className="text-gray-500 text-sm">{member.joinDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-2 ${
                        member.status === 'Active'
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      }`}
                    >
                      {member.status}
                    </span>
                    <p className="text-red-600 font-medium">{member.plan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Membership Distribution */}
          <div className="rounded-xl border border-red-200 bg-white p-6 shadow">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Membership Plans
              </h2>
              <p className="text-red-600/80">
                Distribution of membership types
              </p>
            </div>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={membershipTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {membershipTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #D2042D',
                      borderRadius: '12px',
                      color: '#111827',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-3">
                {membershipTypeData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-red-50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-800 font-medium">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-900 font-bold">
                        {item.value}%
                      </span>
                      <p className="text-red-600/70 text-sm">
                        {item.count} members
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="rounded-xl border border-red-200 bg-white p-6 shadow">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <p className="text-red-600/80">
              Latest gym activities and notifications
            </p>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {recentActivities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex flex-col items-center p-4 rounded-xl bg-red-50 border border-red-200 hover:border-red-300 transition-all duration-300"
                >
                  <div
                    className={`p-3 rounded-full mb-3 ${
                      activity.type === 'member_join'
                        ? 'bg-red-100 text-red-600'
                        : activity.type === 'payment'
                        ? 'bg-green-100 text-green-600'
                        : activity.type === 'class'
                        ? 'bg-purple-100 text-purple-600'
                        : activity.type === 'achievement'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-800 font-medium mb-1">
                      {activity.user}
                    </p>
                    <p className="text-xs text-gray-600 mb-2">
                      {activity.action}
                    </p>
                    <p className="text-xs text-red-600">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Equipment Status */}
        <div className="rounded-xl border border-red-200 bg-white p-6 shadow">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Equipment Status
            </h2>
            <p className="text-red-600/80">
              Current status of gym equipment and maintenance schedule
            </p>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Treadmills',
                total: 12,
                working: 11,
                maintenance: 1,
                icon: '🏃',
              },
              {
                name: 'Weight Machines',
                total: 20,
                working: 19,
                maintenance: 1,
                icon: '🏋️',
              },
              {
                name: 'Free Weights',
                total: 50,
                working: 48,
                maintenance: 2,
                icon: '💪',
              },
              {
                name: 'Cardio Equipment',
                total: 15,
                working: 14,
                maintenance: 1,
                icon: '❤️',
              },
            ].map((equipment, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-red-50 border border-red-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{equipment.icon}</span>
                    <h4 className="font-semibold text-gray-800">
                      {equipment.name}
                    </h4>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-red-100 text-red-800 border-red-200 px-2.5 py-0.5 text-xs font-medium">
                    {equipment.working}/{equipment.total}
                  </span>
                </div>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full w-full flex-1 bg-gradient-to-r from-red-600 to-red-700 transition-all"
                    style={{
                      transform: `translateX(-${
                        100 - (equipment.working / equipment.total) * 100
                      }%)`,
                    }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {equipment.maintenance} in maintenance
                </p>
                <p className="text-sm text-green-600 font-medium mt-1">
                  {Math.round((equipment.working / equipment.total) * 100)}%
                  operational
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
