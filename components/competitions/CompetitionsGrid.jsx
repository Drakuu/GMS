import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

export function CompetitionsGrid({ competitions, getStatusBadge }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {competitions.map((competition) => (
        <Card
          key={competition.id}
          className="overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative">
            <div className="h-52 w-[120%] -ml-[10%] bg-gray-200 overflow-hidden">
              <Avatar className="w-full h-full rounded-none">
                <AvatarImage
                  src={competition.image || '/placeholder.svg'}
                  alt={competition.title}
                  className="object-cover w-full h-full" // Add these classes
                />
                <AvatarFallback>{competition.title.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute top-4 right-4">
              {getStatusBadge(competition.status)}
            </div>
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{competition.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {competition.category}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {competition.prize}
                </div>
                <div className="text-sm text-muted-foreground">Prize</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {competition.description}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{competition.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{competition.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{competition.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>
                  {competition.participants}/{competition.maxParticipants}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Seats Remaining</span>
                <span>
                  {Math.round(
                    (competition.participants / competition.maxParticipants) *
                      100
                  )}
                  %
                </span>
              </div>
              <Progress
                value={
                  (competition.participants / competition.maxParticipants) * 100
                }
              />
            </div>

            <div className="text-sm">
              <div className="font-medium">Organizer</div>
              <div className="text-muted-foreground">
                {competition.organizer}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
