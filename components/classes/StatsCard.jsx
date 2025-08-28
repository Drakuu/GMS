'use client';

import { Card } from '@/components/ui/card';

export function StatsCard({ title, value, icon: Icon, color }) {
  return (
    <Card className="border-l-4 border-l-primary shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
      </div>
    </Card>
  );
}
