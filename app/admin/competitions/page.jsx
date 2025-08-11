'use client';

const competitions = [
  {
    id: 1,
    title: 'Summer Strength Challenge',
    description: 'Test your maximum strength across the big three lifts',
    category: 'Powerlifting',
    date: '2024-08-15',
    time: '09:00 AM',
    location: 'Main Gym Floor',
    participants: 24,
    maxParticipants: 30,
    prize: '$500',
    status: 'Open',
    image:
      'https://vhx.imgix.net/alloutstudio/assets/b1899e1b-3e06-4624-b78a-5279303c7bca.png?auto=format%2Ccompress&fit=crop&h=720&q=75&w=1280',
    organizer: 'Sarah Johnson',
    registrationDeadline: '2024-08-10',
  },
  {
    id: 2,
    title: 'CrossFit Open Qualifier',
    description: 'Qualify for the regional CrossFit championships',
    category: 'CrossFit',
    date: '2024-08-22',
    time: '10:00 AM',
    location: 'CrossFit Arena',
    participants: 18,
    maxParticipants: 20,
    prize: '$750',
    status: 'Open',
    image:
      'https://www.scienceforsport.com/wp-content/uploads/2019/07/action-athlete-barbell-841130-scaled.jpg',
    organizer: 'Mike Rodriguez',
    registrationDeadline: '2024-08-18',
  },
  {
    id: 3,
    title: 'Bodybuilding Classic',
    description: 'Showcase your physique in multiple categories',
    category: 'Bodybuilding',
    date: '2024-09-05',
    time: '07:00 PM',
    location: 'Main Stage',
    participants: 15,
    maxParticipants: 25,
    prize: '$1000',
    status: 'Upcoming',
    image:
      'https://urskalecinski.com/cdn/shop/articles/Breon-Ansley_d9053a0c-03b3-4b83-9227-80258c626f1c.jpg?v=1751882480',
    organizer: 'David Thompson',
    registrationDeadline: '2024-09-01',
  },
  {
    id: 4,
    title: 'Endurance Challenge',
    description: '5K run followed by strength circuit',
    category: 'Endurance',
    date: '2024-08-28',
    time: '06:00 AM',
    location: 'Outdoor Track',
    participants: 32,
    maxParticipants: 40,
    prize: '$300',
    status: 'Open',
    image:
      'https://images.squarespace-cdn.com/content/v1/551954dfe4b0cc9152288892/1489344954097-5AW5PMFDP7UH3RBQ98KW/IMG_5589.JPG?format=1500w',
    organizer: 'Lisa Park',
    registrationDeadline: '2024-08-25',
  },
  {
    id: 5,
    title: 'Powerlifting Meet',
    description: 'Official powerlifting competition with certified judges',
    category: 'Powerlifting',
    date: '2024-09-12',
    time: '08:00 AM',
    location: 'Competition Hall',
    participants: 8,
    maxParticipants: 15,
    prize: '$800',
    status: 'Closed',
    image:
      'https://cdn.muscleandstrength.com/sites/default/files/field/feature-wide-image/workout/toughest-gym-challenge-wide.jpg',
    organizer: 'James Wilson',
    registrationDeadline: '2024-09-08',
  },
  {
    id: 6,
    title: 'Team CrossFit Challenge',
    description: 'Team-based CrossFit competition for groups of 4',
    category: 'CrossFit',
    date: '2024-09-20',
    time: '11:00 AM',
    location: 'CrossFit Arena',
    participants: 16,
    maxParticipants: 24,
    prize: '$1200',
    status: 'Open',
    image:
      'https://cdn.i-scmp.com/sites/default/files/styles/1020x680/public/images/methode/2017/06/17/beaa3316-524e-11e7-b896-7f2d3a4d650b_1280x720_141332.jpg?itok=xmYGUd3x',
    organizer: 'Alex Turner',
    registrationDeadline: '2024-09-15',
  },
];

import { useState } from 'react';
import {
  Search,
  Plus,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Calendar,
  Clock,
  MapPin,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatsCards } from '@/components/competitions/StatsCards';
import { CompetitionsList } from '@/components/competitions/CompetitionsList';
import { CompetitionsGrid } from '@/components/competitions/CompetitionsGrid';
import { AddCompetitionForm } from '@/components/competitions/AddCompetitionForm';

export default function CompetitionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddCompetitionOpen, setIsAddCompetitionOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMode, setActiveMode] = useState('list');
  const competitionsPerPage = 6;

  const filteredCompetitions = competitions.filter((competition) => {
    const matchesSearch =
      competition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      competition.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      competition.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      competition.status.toLowerCase() === statusFilter;
    const matchesCategory =
      categoryFilter === 'all' ||
      competition.category.toLowerCase().includes(categoryFilter);
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const indexOfLastCompetition = currentPage * competitionsPerPage;
  const indexOfFirstCompetition = indexOfLastCompetition - competitionsPerPage;
  const currentCompetitions = filteredCompetitions.slice(
    indexOfFirstCompetition,
    indexOfLastCompetition
  );

  const totalPages = Math.ceil(
    filteredCompetitions.length / competitionsPerPage
  );

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <Badge variant={'active'}>Open</Badge>;
      case 'upcoming':
        return <Badge variant={'pending'}>Upcoming</Badge>;
      case 'closed':
        return <Badge variant={'inactive'}>Closed</Badge>;
      default:
        return <Badge variant={'default'}>{status}</Badge>;
    }
  };

  const categories = [
    ...new Set(competitions.map((competition) => competition.category)),
  ];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddCompetition = (competitionData) => {
    console.log('Adding competition:', competitionData);
    setIsAddCompetitionOpen(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Competitions</h1>
            <p className="mt-1">Manage gym competitions and events</p>
          </div>
          <div className="flex justify-left sm:justify-end gap-2">
            <Button
              className={'bg-muted hover:bg-muted/80 text-primary'}
              onClick={() => setActiveMode('grid')}
            >
              <Grid />
            </Button>
            <Button
              className={'bg-muted hover:bg-muted/80 text-primary'}
              onClick={() => setActiveMode('list')}
            >
              <List />
            </Button>
            <Button onClick={() => setIsAddCompetitionOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Competition
            </Button>
          </div>
        </div>

        <StatsCards competitions={competitions} />

        <Card>
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium">Competition Directory</h3>
            <p className="text-sm mt-1">
              Search and filter through gym competitions
            </p>
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                <Input
                  placeholder="Search competitions by title, category, or organizer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {activeMode === 'list' ? (
              <CompetitionsList
                competitions={currentCompetitions}
                getStatusBadge={getStatusBadge}
              />
            ) : (
              <CompetitionsGrid
                competitions={currentCompetitions}
                getStatusBadge={getStatusBadge}
              />
            )}

            {/* Pagination */}
            {filteredCompetitions.length > 0 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm">
                  Showing{' '}
                  <span className="font-medium">
                    {indexOfFirstCompetition + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(
                      indexOfLastCompetition,
                      filteredCompetitions.length
                    )}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">
                    {filteredCompetitions.length}
                  </span>{' '}
                  competitions
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <Button
                        key={number}
                        variant={currentPage === number ? 'default' : 'outline'}
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </Button>
                    )
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {filteredCompetitions.length === 0 && (
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 mx-auto mb-4" />
                <p>No competitions found matching your criteria.</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <AddCompetitionForm
        open={isAddCompetitionOpen}
        onOpenChange={setIsAddCompetitionOpen}
        onSubmit={handleAddCompetition}
      />
    </div>
  );
}
