import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Activity, Calendar, Clock, Settings } from 'lucide-react';

export const EquipmentListView = ({
  role,
  equipment,
  getStatusBadge,
  getCategoryBadge,
}) => (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Equipment</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Last Maintenance</TableHead>
          <TableHead>Next Maintenance</TableHead>
          {role != 'user' && (
            <TableHead className="text-right">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {equipment.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={item.image} />
                  <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{item.name}</span>
              </div>
            </TableCell>
            <TableCell>{getCategoryBadge(item.category)}</TableCell>
            <TableCell>{getStatusBadge(item.status)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <MapPin className="text-primary w-4 h-4" />
                {item.location}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Activity className="text-primary w-4 h-4" />
                {item.condition}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-primary" />
                {item.lastMaintenance}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Clock className="text-primary w-4 h-4" />
                {item.nextMaintenance}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                {role != 'user' && (
                   <Button variant="ghost" size="sm">
                    <Settings className="text-primary w-4 h-4 mr-1" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
