'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, Edit, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TrainersList = ({ trainers, getStatusBadge, role }) => {
  return (
    <div className="rounded-md border overflow-hidden px-2 mb-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Trainer</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Certifications</TableHead>
            <TableHead>Clients</TableHead>
            <TableHead>Status</TableHead>
          {role!="user" &&  <TableHead className="text-right w-[100px]">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {trainers.map((trainer) => (
            <TableRow key={trainer.id}>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={trainer.image || '/placeholder-trainer.svg'}
                      alt={trainer.name}
                    />
                    <AvatarFallback className="bg-gray-200">
                      {trainer.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{trainer.name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      {trainer.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      {trainer.phone}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {trainer.specialization}
              </TableCell>
              <TableCell>{trainer.experience}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{trainer.rating}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                  {trainer.certifications.map((cert, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs whitespace-nowrap"
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{trainer.clients}</TableCell>
              <TableCell>{getStatusBadge(trainer.status)}</TableCell>
             {role!="user" && <TableCell>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4 text-primary" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4 text-primary" />
                  </Button>
                </div>
              </TableCell>}
            </TableRow>
          ))}
          {trainers.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No trainers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
