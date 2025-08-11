'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Users, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ClassTableView({
  classes,
  onBookClass,
  getDifficultyBadge,
  getCategoryBadge,
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Instructor</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Spots</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((cls) => (
            <TableRow key={cls.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={cls.instructorImage} />
                    <AvatarFallback>{cls.instructor.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {cls.instructor}
                </div>
              </TableCell>
              <TableCell className="font-medium">{cls.name}</TableCell>
              <TableCell>{cls.time}</TableCell>
              <TableCell>{cls.duration}</TableCell>
              <TableCell>{getCategoryBadge(cls.category)}</TableCell>
              <TableCell>{getDifficultyBadge(cls.difficulty)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {cls.enrolled}/{cls.capacity}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  {cls.rating}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onBookClass(cls)}
                  >
                    Book
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
