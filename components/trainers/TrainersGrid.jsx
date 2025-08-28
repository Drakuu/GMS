'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Calendar, Users, Mail, Phone } from 'lucide-react';

export const TrainersGrid = ({ trainers, getStatusBadge ,role}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainers.map((trainer) => (
        <Card
          key={trainer.id}
          className="hover:shadow-lg transition-shadow rounded-lg overflow-hidden flex flex-col"
        >
          <div className="relative">
            <div className="h-52 w-[120%] -ml-[10%] bg-gray-200 overflow-hidden">
              <Avatar className="w-full h-full rounded-none">
                <AvatarImage
                  src={trainer.image || '/placeholder.svg'}
                  alt={trainer.name}
                  className="object-cover w-full h-full" // Add these classes
                />
                <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant={'active'}>
                <Star className="w-3 h-3 mr-1 fill-current" />
                {trainer.rating}
              </Badge>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold truncate">{trainer.name}</h3>
                <p className="text-primary text-xs font-medium truncate">
                  {trainer.specialization}
                </p>
              </div>
              {getStatusBadge(trainer.status)}
            </div>

            <p className="text-sm mt-3 mb-4 truncate">{trainer.bio}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {trainer.certifications.map((cert, index) => (
                <Badge key={index} variant="outline">
                  {cert}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{trainer.experience}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>{trainer.clients} clients</span>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="truncate">{trainer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>{trainer.phone}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button className="flex-1">Schedule</Button>
            { role !="user" && <Button variant="outline" className="flex-1">
                Edit
              </Button>}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
