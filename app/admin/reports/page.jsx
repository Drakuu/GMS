'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from 'recharts';
import {
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChartIcon,
  FileText,
  Clock,
  Target,
  Award,
} from 'lucide-react';

// Sample data
const membershipData = [
  { month: 'Jan', active: 245, new: 32, cancelled: 8 },
  { month: 'Feb', active: 269, new: 28, cancelled: 4 },
  { month: 'Mar', active: 287, new: 35, cancelled: 17 },
  { month: 'Apr', active: 305, new: 41, cancelled: 23 },
  { month: 'May', active: 323, new: 38, cancelled: 20 },
  { month: 'Jun', active: 341, new: 45, cancelled: 27 },
];

const revenueData = [
  { month: 'Jan', revenue: 28400, expenses: 18200 },
  { month: 'Feb', revenue: 31200, expenses: 19100 },
  { month: 'Mar', revenue: 33800, expenses: 20300 },
  { month: 'Apr', revenue: 36500, expenses: 21800 },
  { month: 'May', revenue: 38900, expenses: 22400 },
  { month: 'Jun', revenue: 41200, expenses: 23600 },
];

const membershipTypes = [
  { name: 'Premium', value: 145, color: '#8b5cf6' },
  { name: 'Standard', value: 128, color: '#E11D48' },
  { name: 'Basic', value: 68, color: '#10b981' },
];

const attendanceData = [
  { day: 'Mon', morning: 45, afternoon: 32, evening: 78 },
  { day: 'Tue', morning: 52, afternoon: 28, evening: 85 },
  { day: 'Wed', morning: 48, afternoon: 35, evening: 72 },
  { day: 'Thu', morning: 61, afternoon: 42, evening: 91 },
  { day: 'Fri', morning: 55, afternoon: 38, evening: 95 },
  { day: 'Sat', morning: 72, afternoon: 65, evening: 58 },
  { day: 'Sun', morning: 38, afternoon: 45, evening: 42 },
];

const topMembers = [
  { name: 'Sarah Johnson', visits: 28, type: 'Premium', status: 'Active' },
  { name: 'Mike Chen', visits: 26, type: 'Standard', status: 'Active' },
  { name: 'Emily Davis', visits: 24, type: 'Premium', status: 'Active' },
  { name: 'James Wilson', visits: 22, type: 'Basic', status: 'Active' },
  { name: 'Lisa Brown', visits: 21, type: 'Standard', status: 'Active' },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [reportType, setReportType] = useState('overview');

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold ">Reports & Analytics</h1>
            <p className=" mt-1">
              Track your gym's performance and member insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium ">
                Total Members
              </CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold ">341</div>
              <p className="text-xs text-primary flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium ">
                Monthly Revenue
              </CardTitle>
              <DollarSign className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold ">$41,200</div>
              <p className="text-xs text-primary flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.3% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium ">
                Avg Daily Visits
              </CardTitle>
              <Clock className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold ">156</div>
              <p className="text-xs text-primary flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium ">
                Retention Rate
              </CardTitle>
              <Target className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold ">94.2%</div>
              <p className="text-xs text-primary flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="membership" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Membership
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Attendance
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="flex items-center gap-2"
            >
              <Award className="h-4 w-4" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Membership Growth</CardTitle>
                  <CardDescription>
                    Active members over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={membershipData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="active"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Membership Distribution</CardTitle>
                  <CardDescription>
                    Current membership types breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={membershipTypes}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {membershipTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-4">
                    {membershipTypes.map((type, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: type.color }}
                        ></div>
                        <span className="text-sm ">
                          {type.name} ({type.value})
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Attendance Pattern</CardTitle>
                <CardDescription>
                  Average daily attendance by time slots
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="morning"
                      fill="#E11D48"
                      name="Morning (6-12)"
                    />
                    <Bar
                      dataKey="afternoon"
                      fill="#10b981"
                      name="Afternoon (12-18)"
                    />
                    <Bar
                      dataKey="evening"
                      fill="#8b5cf6"
                      name="Evening (18-22)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="membership" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Member Acquisition</CardTitle>
                  <CardDescription>
                    New vs cancelled memberships
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={membershipData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="new" fill="#10b981" name="New Members" />
                      <Bar
                        dataKey="cancelled"
                        fill="#FFBF00"
                        name="Cancelled"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Active Members</CardTitle>
                  <CardDescription>
                    Most frequent gym visitors this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Visits</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topMembers.map((member, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {member.name}
                          </TableCell>
                          <TableCell>{member.visits}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                member.type === 'Premium'
                                  ? 'default'
                                  : member.type === 'Standard'
                                  ? 'secondary'
                                  : 'outline'
                              }
                            >
                              {member.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="text-green-600 border-green-600"
                            >
                              {member.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
                <CardDescription>Monthly financial performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, '']}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="#FFBF00"
                      strokeWidth={3}
                      name="Expenses"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Net Profit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    $17,600
                  </div>
                  <p className="text-sm  mt-1">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profit Margin</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">42.7%</div>
                  <p className="text-sm  mt-1">Above industry avg</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Revenue Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    +12.3%
                  </div>
                  <p className="text-sm  mt-1">Month over month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Attendance Trends</CardTitle>
                <CardDescription>
                  Peak hours and capacity utilization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="morning"
                      stackId="1"
                      stroke="#E11D48"
                      fill="#E11D48"
                    />
                    <Area
                      type="monotone"
                      dataKey="afternoon"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                    />
                    <Area
                      type="monotone"
                      dataKey="evening"
                      stackId="1"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Member Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">4.8/5</div>
                  <p className="text-sm  mt-1">Based on 127 reviews</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Equipment Utilization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">78%</div>
                  <p className="text-sm  mt-1">Average daily usage</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Class Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">85%</div>
                  <p className="text-sm text-gray-600 mt-1">
                    Average fill rate
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Staff Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">92%</div>
                  <p className="text-sm text-gray-600 mt-1">
                    Performance score
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
