'use client';

import { Card } from '@/components/ui/card';
import { Users, TrendingUp, Star, Award } from 'lucide-react';

export const StatsCards = ({ trainers }) => {
  const stats = [
    {
      title: 'Total Trainers',
      value: trainers.length.toString(),
      icon: Users,
      color: 'text-red-600',
    },
    {
      title: 'Active Trainers',
      value: trainers.filter((t) => t.status === 'Active').length.toString(),
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Average Rating',
      value: (
        trainers.reduce((acc, t) => acc + t.rating, 0) / trainers.length
      ).toFixed(1),
      icon: Star,
      color: 'text-yellow-600',
    },
    {
      title: 'Certifications',
      value: trainers
        .reduce((acc, t) => acc + t.certifications.length, 0)
        .toString(),
      icon: Award,
      color: 'text-blue-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-l-4 border-l-primary shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
