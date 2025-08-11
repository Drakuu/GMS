import { Card } from '@/components/ui/card';

export const StatCard = ({ title, value, icon: Icon, color }) => (
  <Card className="border-l-4 border-l-primary">
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <Icon className={`h-8 w-8 ${color}`} />
      </div>
    </div>
  </Card>
);
