'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export const StatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <Card className="border-l-4 border-l-primary">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <CardHeader className="text-2xl font-bold">{value}</CardHeader>
          </div>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
      </div>
    </Card>
  );
};
