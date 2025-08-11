'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Activity,
  Heart,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Zap,
  Scale,
  Ruler,
  Droplets,
  Plus,
  ChevronRight,
  Clipboard,
  ActivityIcon,
} from 'lucide-react';

export default function HealthTrackingPage() {
  const healthMetrics = [
    {
      title: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      change: '+2%',
      trend: 'up',
      icon: Heart,
      color: 'text-red-500',
    },
    {
      title: 'Weight',
      value: '75.2',
      unit: 'kg',
      change: '-1.5%',
      trend: 'down',
      icon: Scale,
      color: 'text-blue-500',
    },
    {
      title: 'Body Fat',
      value: '18.5',
      unit: '%',
      change: '-0.8%',
      trend: 'down',
      icon: Target,
      color: 'text-green-500',
    },
    {
      title: 'Hydration',
      value: '2.1',
      unit: 'L',
      change: '+15%',
      trend: 'up',
      icon: Droplets,
      color: 'text-cyan-500',
    },
  ];

  const recentWorkouts = [
    {
      date: 'Today',
      type: 'Strength Training',
      duration: '45 min',
      calories: 320,
      intensity: 'High',
    },
    {
      date: 'Yesterday',
      type: 'Cardio',
      duration: '30 min',
      calories: 280,
      intensity: 'Medium',
    },
    {
      date: '2 days ago',
      type: 'HIIT',
      duration: '25 min',
      calories: 350,
      intensity: 'High',
    },
  ];

  const goals = [
    {
      title: 'Weekly Workout Goal',
      current: 4,
      target: 5,
      unit: 'sessions',
    },
    {
      title: 'Weight Loss Goal',
      current: 2.3,
      target: 5,
      unit: 'kg',
    },
    {
      title: 'Daily Steps',
      current: 8500,
      target: 10000,
      unit: 'steps',
    },
  ];

  return (
    <div className="min-h-screenp-6">
      <div className="max-w-full mx-auto space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold ">Health Tracking</h1>
            <p className=" mt-1">
              Monitor your fitness journey and health metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              This Week
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </div>

        {/* Health Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium ">
                    {metric.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-1">
                    <div className="text-2xl font-bold ">{metric.value}</div>
                    <div className="text-sm text-primary">{metric.unit}</div>
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp
                      className={`h-3 w-3 mr-1 ${
                        metric.trend === 'up'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        metric.trend === 'up'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {metric.change} from last week
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Charts */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Progress Overview
                </CardTitle>
                <CardDescription>
                  Your health metrics over the past 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="weight" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="weight">Weight</TabsTrigger>
                    <TabsTrigger value="bodyfat">Body Fat</TabsTrigger>
                    <TabsTrigger value="muscle">Muscle Mass</TabsTrigger>
                  </TabsList>
                  <TabsContent value="weight" className="space-y-4">
                    <div className="h-64 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-2">
                          Weight Progress
                        </div>
                        <div className="text-sm text-primary">
                          Chart visualization would go here
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="bodyfat" className="space-y-4">
                    <div className="h-64 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-2">
                          Body Fat Progress
                        </div>
                        <div className="text-sm text-green-500">
                          Chart visualization would go here
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="muscle" className="space-y-4">
                    <div className="h-64 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-2">
                          Muscle Mass Progress
                        </div>
                        <div className="text-sm text-purple-500">
                          Chart visualization would go here
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Recent Workouts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Recent Workouts
                </CardTitle>
                <CardDescription>Your latest training sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentWorkouts.map((workout, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full flex items-center border border-primary justify-center">
                          <Activity className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium ">{workout.type}</div>
                          <div className="text-sm text-primary">
                            {workout.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center ">
                          <Clock className="h-4 w-4 mr-1" />
                          {workout.duration}
                        </div>
                        <div className="">{workout.calories} cal</div>
                        <Badge
                          variant={
                            workout.intensity === 'High'
                              ? 'active'
                              : workout.intensity === 'Medium'
                              ? 'pending'
                              : 'inactive'
                          }
                        >
                          {workout.intensity}
                        </Badge>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Goals Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Goals Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {goals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium ">{goal.title}</span>
                      <span className="text-muted-foreground">
                        {goal.current}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <Progress
                      value={(goal.current / goal.target) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clipboard className="h-5 w-5 text-primary" />
                  <CardTitle>Today's Summary</CardTitle>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm ">Calories Burned</span>
                  <span className="font-semibold">320 kcal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm ">Active Minutes</span>
                  <span className="font-semibold">45 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm ">Steps Taken</span>
                  <span className="font-semibold">8,500</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm ">Water Intake</span>
                  <span className="font-semibold">2.1 L</span>
                </div>
              </CardContent>
            </Card>

            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ActivityIcon className="h-5 w-5 text-primary" />
                  <CardTitle>Health Profile</CardTitle>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-muted-foreground">
                      Member since 2023
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-primary">Height</div>
                    <div className="font-medium">180 cm</div>
                  </div>
                  <div>
                    <div className="text-primary">Age</div>
                    <div className="font-medium">28 years</div>
                  </div>
                  <div>
                    <div className="text-primary">BMI</div>
                    <div className="font-medium">23.2</div>
                  </div>
                  <div>
                    <div className="text-primary">Goal</div>
                    <div className="font-medium">Weight Loss</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
