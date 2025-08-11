'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
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
    {
      day: 'Monday',
      yoga: 25,
      cardio: 35,
      strength: 40,
      hiit: 20,
      total: 120,
    },
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
    {
      day: 'Friday',
      yoga: 35,
      cardio: 45,
      strength: 48,
      hiit: 30,
      total: 158,
    },
    {
      day: 'Saturday',
      yoga: 40,
      cardio: 50,
      strength: 35,
      hiit: 35,
      total: 160,
    },
    {
      day: 'Sunday',
      yoga: 38,
      cardio: 30,
      strength: 25,
      hiit: 15,
      total: 108,
    },
  ];

  const membershipTypeData = [
    { name: 'Elite', value: 35, color: '#f59e0b', count: 68 },
    { name: 'Premium', value: 40, color: '#EF4444', count: 78 },
    { name: 'Standard', value: 25, color: '#F87171', count: 49 },
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className=" border border-primary rounded-lg p-4 shadow-2xl backdrop-blur-sm">
          <p className="text-primary font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className=" text-sm" style={{ color: entry.color }}>
              <span className="capitalize">{entry.dataKey}:</span> {entry.value}{' '}
              attendees
            </p>
          ))}
          <div className="border-t border-primary mt-2 pt-2">
            <p className="text-primary font-medium">
              Total: {payload.reduce((sum, entry) => sum + entry.value, 0)}{' '}
              attendees
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-full mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between rounded-2xl p-6 backdrop-blur-sm">
          <div>
            <h1 className="text-4xl font-bold  flex items-center gap-4">
              <div className="p-3  rounded-xl">
                <Dumbbell className="h-8 w-8 text-primary" />
              </div>
              <span className="">CLICK FITNESS</span>
            </h1>
            <p className=" mt-2 text-lg">Professional Gym Management System</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-muted text-primary px-4 py-2">
              <Activity className="h-4 w-4 mr-2" />
              System Online
            </Badge>
            <Button>
              <UserPlus className="h-5 w-5 mr-2" />
              Add Member
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-primary shadow-xs shadow-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium ">
                Total Members
              </CardTitle>
              <div className="p-2 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold  mb-2">1,234</div>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-primary mr-1" />
                <span className="text-primary font-medium">+12%</span>
                <span className="text-muted-foreground ml-1">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className=" border-l-4 border-l-primary shadow-xs shadow-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium ">
                Monthly Revenue
              </CardTitle>
              <div className="p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold  mb-2">$24,400</div>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-primary mr-1" />
                <span className="text-primary font-medium">+8%</span>
                <span className="text-muted-foreground ml-1">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className=" shadow-xs shadow-primary/10 border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium ">
                Active Classes
              </CardTitle>
              <div className="p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold  mb-2">28</div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 text-primary mr-1" />
                <span className="text-primary font-medium">15</span>
                <span className="text-muted-foreground ml-1">
                  scheduled today
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary shadow-xs shadow-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium ">
                Equipment Status
              </CardTitle>
              <div className="p-2  rounded-lg">
                <Target className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold  mb-2">94%</div>
              <div className="flex items-center text-sm">
                <Zap className="h-4 w-4 text-primary mr-1" />
                <span className="text-primary font-medium">Operational</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section - Improved Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Class Attendance - Now More Compact */}
          <Card className="lg:col-span-2 shadow-2xl shadow-primary/10">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold  mb-1">
                    Weekly Class Attendance
                  </CardTitle>
                  <CardDescription className="">
                    Class participation breakdown
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className=" px-2 py-1 text-xs">Peak: Sat</Badge>
                  <Badge className="bg-muted text-primary  px-2 py-1 text-xs">
                    Avg: 136
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
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
                      <stop
                        offset="0%"
                        stopColor="#b45309
"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="100%"
                        stopColor="#b45309
"
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
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#f59e0b"
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
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#fbbf24"
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
                      <stop
                        offset="0%"
                        stopColor="#fde68a
"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="100%"
                        stopColor="#fde68a
"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="day"
                    stroke="#f59e0b"
                    fontSize={11}
                    fontWeight={500}
                    tick={{ fill: '#f59e0b' }}
                    tickFormatter={(value) => value.slice(0, 3)} // Show only first 3 letters
                  />
                  <YAxis
                    stroke="#f59e0b"
                    fontSize={11}
                    fontWeight={500}
                    tick={{ fill: '#f59e0b' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: '10px' }}
                    iconType="rect"
                    formatter={(value) => (
                      <span className=" capitalize font-medium text-sm">
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
              <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-primary/20">
                {[
                  { name: 'Yoga', total: 228, color: '#b45309', trend: '+5%' },
                  {
                    name: 'Cardio',
                    total: 280,
                    color: '#f59e0b',
                    trend: '+12%',
                  },
                  {
                    name: 'Strength',
                    total: 273,
                    color: '#f59e0b',
                    trend: '+8%',
                  },
                  { name: 'HIIT', total: 175, color: '#fde68a', trend: '+15%' },
                ].map((classType, index) => (
                  <div
                    key={index}
                    className=" rounded-lg p-3 border border-primary/10 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: classType.color }}
                      />
                      <h4 className="font-medium  text-sm">{classType.name}</h4>
                    </div>
                    <div className="text-lg font-bold ">{classType.total}</div>
                    <div className="text-xs text-primary font-medium">
                      {classType.trend}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Class Schedule - New Addition */}
          <Card className="border shadow-xl shadow-primary/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold ">
                Today's Schedule
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Upcoming classes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
                    className="flex items-center justify-between p-3 rounded-lg border "
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-primary font-bold text-sm bg-muted px-2 py-1 rounded">
                        {schedule.time}
                      </div>
                      <div>
                        <p className=" font-medium text-sm">{schedule.class}</p>
                        <p className="text-muted-foreground text-xs">
                          {schedule.instructor}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-muted text-primary text-xs">
                      {schedule.spots} spots
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue and Member Growth */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Member Growth Chart */}
          <Card className="border shadow-xs shadow-primary/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold ">
                Member Growth
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Monthly member acquisition trends
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#f59e0b"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f59e0b"
                    opacity={0.3}
                  />
                  <XAxis dataKey="month" stroke="#f59e0b" />
                  <YAxis stroke="#f59e0b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#000000',
                      border: '1px solid #f59e0b',
                      borderRadius: '12px',
                      color: '#f59e0b',
                    }}
                  />
                  <Bar
                    dataKey="members"
                    fill="url(#memberGradient)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Trend */}
          <Card className="shadow-xs shadow-primary/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold ">
                Revenue Trend
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Monthly revenue growth
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop
                        offset="100%"
                        stopColor="#f59e0b"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.3}
                  />
                  <XAxis dataKey="month" stroke="#f59e0b" />
                  <YAxis stroke="#f59e0b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#000000',
                      border: '1px solid #f59e0b',
                      borderRadius: '12px',
                      color: '#FFFFFF',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#000000' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Membership Distribution and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Members Table */}
          <Card className="lg:col-span-2  shadow-xs shadow-primary/10 ">
            <CardHeader>
              <CardTitle className="text-xl font-bold ">
                Recent Members
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Latest member registrations and their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 rounded-xl  transition-all duration-300 border"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-primary/30">
                        <AvatarFallback className="text-primary font-bold">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-lg">{member.name}</p>
                        <p className="text-primary">{member.email}</p>
                        <p className="text-gray-400 text-sm">
                          {member.joinDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          member.status === 'Active'
                            ? 'active'
                            : member.status === 'Pending'
                            ? 'pending'
                            : member.status === 'Inactive'
                            ? 'inactive'
                            : 'default'
                        }
                        className="mb-2"
                      >
                        {member.status}
                      </Badge>
                      <p className="text-primary text-sm font-medium">
                        {member.plan}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Membership Distribution */}
          <Card className=" shadow-xs shadow-primary/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold ">
                Membership Plans
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Distribution of membership types
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                      backgroundColor: '#000000',
                      border: '1px solid #f59e0b',
                      borderRadius: '12px',
                      color: '#FFFFFF',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-3">
                {membershipTypeData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{item.value}%</span>
                      <p className="text-primary text-sm">
                        {item.count} members
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <Card className=" shadow-xs shadow-primary/10">
          <CardHeader>
            <CardTitle className="text-xl font-bold ">
              Recent Activity
            </CardTitle>
            <CardDescription className="text-primary">
              Latest gym activities and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {recentActivities.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex flex-col items-center p-4 rounded-xl transition-all duration-300"
                  >
                    <div
                      className={`p-3 rounded-full mb-3 ${
                        activity.type === 'member_join'
                          ? 'bg-blue-600/20 text-blue-400'
                          : activity.type === 'payment'
                          ? 'bg-green-600/20 text-green-400'
                          : activity.type === 'class'
                          ? 'bg-purple-600/20 text-purple-400'
                          : activity.type === 'achievement'
                          ? 'bg-yellow-600/20 text-yellow-400'
                          : 'bg-red-600/20 text-red-400'
                      }`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm  font-medium mb-1">
                        {activity.user}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        {activity.action}
                      </p>
                      <p className="text-xs text-primary">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Equipment Status */}
        <Card className=" shadow-xs shadow-primary/10">
          <CardHeader>
            <CardTitle className="text-xl font-bold ">
              Equipment Status
            </CardTitle>
            <CardDescription className="text-primary">
              Current status of gym equipment and maintenance schedule
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div key={index} className="p-6 rounded-xl border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{equipment.icon}</span>
                      <h4 className="font-semibold ">{equipment.name}</h4>
                    </div>
                    <Badge className="bg-muted text-primary px-4 py-2">
                      {equipment.working}/{equipment.total}
                    </Badge>
                  </div>
                  <Progress
                    value={(equipment.working / equipment.total) * 100}
                    className="h-3 mb-3"
                  />
                  <p className="text-sm text-muted-foreground">
                    {equipment.maintenance} in maintenance
                  </p>
                  <p className="text-sm text-primary font-medium">
                    {Math.round((equipment.working / equipment.total) * 100)}%
                    operational
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
