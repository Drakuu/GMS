import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Activity, Calendar, Settings } from 'lucide-react';

export const EquipmentGridView = ({ role, equipment, getStatusBadge }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {equipment.map((item) => (
      <Card key={item.id} className="hover:shadow-md transition-shadow">
        <div className="aspect-video relative overflow-hidden">
          <Avatar className="w-full h-full rounded-none">
            <AvatarImage src={item.image || '/placeholder.svg'} />
            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute top-4 right-4">
            {getStatusBadge(item.status)}
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <Badge variant="outline" className="mt-1">
                {item.category}
              </Badge>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              {item.location}
            </div>
            <div className="flex items-center text-sm">
              <Activity className="h-4 w-4 mr-2 text-primary" />
              Condition: {item.condition}
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="text-primary h-4 w-4 mr-2" />
              Next Maintenance: {item.nextMaintenance}
            </div>
            <div className="flex gap-2 pt-3">
              {role != 'user' && (
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="h-4 w-4 mr-1 text-primary" />
                  Maintain
                </Button>
              )}
              <Button size="sm" className="flex-1">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </Card>
    ))}
  </div>
);
