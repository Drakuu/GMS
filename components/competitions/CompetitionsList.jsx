import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Eye,
  Edit,
  Trash2,
  Trophy,
} from 'lucide-react';
import Image from 'next/image';

export function CompetitionsList({ competitions, getStatusBadge }) {
  return (
    <div className="space-y-4">
      {competitions.map((competition) => (
        <Card key={competition.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-48 h-32 md:h-auto relative">
                <Avatar className="w-full h-full rounded-none">
                  <AvatarImage
                    src={competition.image || '/placeholder.svg'}
                    alt={competition.title}
                    className="object-cover w-full h-full" // Add these classes
                  />
                  <AvatarFallback>{competition.title.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {competition.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {competition.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(competition.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-4">
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
                        <Trophy className="h-4 w-4 text-primary" />
                        <span>{competition.prize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>
                          {competition.participants}/
                          {competition.maxParticipants}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {competition.organizer
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">
                            {competition.organizer}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Organizer
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Seats Remaining</span>
                        <span>
                          {Math.round(
                            (competition.participants /
                              competition.maxParticipants) *
                              100
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (competition.participants /
                            competition.maxParticipants) *
                          100
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
