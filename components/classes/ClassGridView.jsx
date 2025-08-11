'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Users, Star, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ClassGridView({
  role,
  classes,
  onBookClass,
  getDifficultyBadge,
  getCategoryBadge,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.map((cls) => (
        <Card
          key={cls.id}
          className="hover:shadow-lg transition-shadow flex flex-col"
        >
          <div className="relative h-52 ">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  cls.classImage || cls.instructorImage
                })`,
              }}
            />
            <div className="absolute inset-0 bg-black/30 flex items-end p-4">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 border-2 border-white mr-3">
                  <AvatarImage src={cls.instructorImage} />
                  <AvatarFallback>{cls.instructor.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">{cls.instructor}</p>
                  <p className="text-red-200 text-sm">{cls.location}</p>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 flex items-center bg-white/90 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
              <span className="text-sm font-medium">{cls.rating}</span>
            </div>
          </div>

          <div className="flex flex-col p-6 flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold truncate">{cls.name}</h3>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {getCategoryBadge(cls.category)}
              {getDifficultyBadge(cls.difficulty)}
            </div>

            <p className="text-sm mb-4 h-16 overflow-hidden overflow-ellipsis">
              {cls.description.length > 200
                ? cls.description.slice(0, 200) + '...'
                : cls.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-primary mr-2" />
                <span className="text-xs">{cls.time}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 text-primary mr-2" />
                <span className="text-xs">
                  {cls.enrolled}/{cls.capacity} spots
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              {role != 'user' ? (
                <>
                  <Button onClick={() => onBookClass(cls)} className="flex-1">
                    Edit class
                  </Button>
                  <Button className="flex-1">Cancel class</Button>
                </>
              ) : (
                <Button className="flex-1">Schedule class</Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
