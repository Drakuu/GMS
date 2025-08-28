import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Users, Calendar, DollarSign } from 'lucide-react';

export function StatsCards({ competitions }) {
  const totalCompetitions = competitions.length;
  const openCompetitions = competitions.filter(
    (c) => c.status === 'Open'
  ).length;
  const totalParticipants = competitions.reduce(
    (sum, c) => sum + c.participants,
    0
  );
  const totalPrizePool = competitions.reduce((sum, c) => {
    const prize = parseInt(c.prize.replace('$', '').replace(',', ''));
    return sum + prize;
  }, 0);

  const stats = [
    {
      title: 'Total Competitions',
      value: totalCompetitions,
      icon: Trophy,
      description: 'Active competitions',
      color: 'text-blue-500',
    },
    {
      title: 'Open Registrations',
      value: openCompetitions,
      icon: Calendar,
      description: 'Currently accepting entries',
      color: 'text-amber-500',
    },
    {
      title: 'Total Participants',
      value: totalParticipants,
      icon: Users,
      description: 'Registered competitors',
      color: 'text-red-500',
    },
    {
      title: 'Prize Pool',
      value: `$${totalPrizePool.toLocaleString()}`,
      icon: DollarSign,
      description: 'Total rewards available',
      color: 'text-green-500',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 border-l-4 border-l-primary">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5  ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-primary">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
