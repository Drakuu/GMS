'use client';

const trainers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    specialization: 'Strength Training',
    experience: '8 years',
    rating: 4.9,
    image:
      'https://cdn-magazine.nutrabay.com/wp-content/uploads/2023/02/strong-bodybuilder-doing-heavy-weight-exercise-back-machine-1-1067x800.jpg',
    certifications: ['NASM-CPT', 'CSCS'],
    clients: 45,
    email: 'sarah.johnson@gym.com',
    phone: '+1 (555) 123-4567',
    bio: 'Specialized in strength training and powerlifting with over 8 years of experience helping clients achieve their fitness goals.',
    status: 'Active',
  },

  {
    id: 2,
    name: 'Mike Rodriguez',
    specialization: 'CrossFit & HIIT',
    experience: '6 years',
    rating: 4.8,
    image:
      'https://plus.unsplash.com/premium_photo-1664474667047-a20f4e60339a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltJTIwZ3V5fGVufDB8fDB8fHww',
    certifications: ['CrossFit L2', 'ACSM-CPT'],
    clients: 38,
    email: 'mike.rodriguez@gym.com',
    phone: '+1 (555) 234-5678',
    bio: 'CrossFit enthusiast and HIIT specialist focused on functional fitness and athletic performance.',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Emily Chen',
    specialization: 'Yoga & Pilates',
    experience: '10 years',
    rating: 5.0,
    image:
      'https://images.squarespace-cdn.com/content/v1/603a73e7e541b709395810f2/1708102771889-JWMA9KDZCVR0IK73FULA/image-asset.jpeg',
    certifications: ['RYT-500', 'PMA-CPT'],
    clients: 52,
    email: 'emily.chen@gym.com',
    phone: '+1 (555) 345-6789',
    bio: 'Certified yoga instructor and Pilates expert with a focus on mindfulness and body alignment.',
    status: 'On Leave',
  },
  {
    id: 4,
    name: 'David Thompson',
    specialization: 'Bodybuilding',
    experience: '12 years',
    rating: 4.9,
    image:
      'https://www.puregym.com/media/wt0cjh0u/gym-workout-plan-for-gaining-muscle_header.jpg?quality=80',
    certifications: ['IFBB Pro', 'NASM-CPT'],
    clients: 41,
    email: 'david.thompson@gym.com',
    phone: '+1 (555) 456-7890',
    bio: 'Former competitive bodybuilder with extensive knowledge in muscle building and contest preparation.',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Lisa Park',
    specialization: 'Weight Loss',
    experience: '7 years',
    rating: 4.8,
    image:
      'https://explosivewhey.com/cdn/shop/articles/best-workout-routine-for-gym-beginners-135325.png?v=1738755379&width=2048',
    certifications: ['ACE-CPT', 'Nutrition Coach'],
    clients: 48,
    email: 'lisa.park@gym.com',
    phone: '+1 (555) 567-8901',
    bio: 'Weight loss specialist combining fitness training with nutritional guidance for sustainable results.',
    status: 'Active',
  },
  {
    id: 6,
    name: 'James Wilson',
    specialization: 'Sports Performance',
    experience: '9 years',
    rating: 4.9,
    image:
      'https://www.scienceforsport.com/wp-content/uploads/2019/07/action-athlete-barbell-841130-scaled.jpg',
    certifications: ['CSCS', 'USAW-L1'],
    clients: 35,
    email: 'james.wilson@gym.com',
    phone: '+1 (555) 678-9012',
    bio: 'Sports performance coach working with athletes to enhance their competitive edge and prevent injuries.',
    status: 'Inactive',
  },
  {
    id: 7,
    name: 'Alex Turner',
    specialization: 'Functional Training',
    experience: '5 years',
    rating: 4.7,
    image: '/placeholder.svg',
    certifications: ['ACE-CPT', 'FMS'],
    clients: 32,
    email: 'alex.turner@gym.com',
    phone: '+1 (555) 789-0123',
    bio: 'Functional training expert focusing on movement patterns for everyday life activities.',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Maria Garcia',
    specialization: 'Senior Fitness',
    experience: '11 years',
    rating: 4.9,
    image: '/placeholder.svg',
    certifications: ['ACE-SFS', 'NASM-CPT'],
    clients: 56,
    email: 'maria.garcia@gym.com',
    phone: '+1 (555) 890-1234',
    bio: 'Specialist in senior fitness programs that improve mobility, balance and overall health.',
    status: 'Active',
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

import { StatsCards } from '@/components/trainers/StatsCards';
import { TrainersList } from '@/components/trainers/TrainersList';
import { TrainersGrid } from '@/components/trainers/TrainersGrid';
import { AddTrainerForm } from '@/components/trainers/AddTrainerForm';

export default function TrainersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [isAddTrainerOpen, setIsAddTrainerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMode, setActiveMode] = useState('list');
  const trainersPerPage = 6;

  const role = 'user'; // or 'user' based on your application logic

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || trainer.status.toLowerCase() === statusFilter;
    const matchesSpecialization =
      specializationFilter === 'all' ||
      trainer.specialization.toLowerCase().includes(specializationFilter);

    return matchesSearch && matchesStatus && matchesSpecialization;
  });

  const indexOfLastTrainer = currentPage * trainersPerPage;
  const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
  const currentTrainers = filteredTrainers.slice(
    indexOfFirstTrainer,
    indexOfLastTrainer
  );
  const totalPages = Math.ceil(filteredTrainers.length / trainersPerPage);

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge variant={'active'}>Active</Badge>;
      case 'on leave':
        return <Badge variant={'pending'}>On Leave</Badge>;
      case 'inactive':
        return <Badge variant={'inactive'}>Inactive</Badge>;
      default:
        return <Badge variant={'default'}>{status}</Badge>;
    }
  };

  const specializations = [
    ...new Set(trainers.map((trainer) => trainer.specialization)),
  ];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddTrainer = (trainerData) => {
    console.log('Adding trainer:', trainerData);
    setIsAddTrainerOpen(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Trainers</h1>
            <p className="mt-1">Manage your gym trainers and their schedules</p>
          </div>
          <div className="flex justify-left sm:justify-end gap-2">
            <Button
              className={'bg-muted hover:bg-muted/80  text-primary'}
              onClick={() => setActiveMode('grid')}
            >
              <Grid />
            </Button>
            <Button
              className={'bg-muted hover:bg-muted/80  text-primary'}
              onClick={() => setActiveMode('list')}
            >
              <List />
            </Button>
            
          </div>
        </div>

        <StatsCards trainers={trainers} />

        <Card>
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium">Trainer Directory</h3>
            <p className="text-sm mt-1">
              Search and filter through your gym trainers
            </p>
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                <Input
                  placeholder="Search trainers by name or specialization..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on leave">On Leave</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={specializationFilter}
                onValueChange={setSpecializationFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Specializations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  {specializations.map((spec, index) => (
                    <SelectItem key={index} value={spec.toLowerCase()}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {activeMode === 'list' ? (
              <TrainersList
                trainers={currentTrainers}
                getStatusBadge={getStatusBadge}
                role={role}
              />
            ) : (
              <TrainersGrid
                trainers={currentTrainers}
                  getStatusBadge={getStatusBadge}
                role={role}
              />
            )}

            {/* Pagination */}
            {filteredTrainers.length > 0 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm">
                  Showing{' '}
                  <span className="font-medium">{indexOfFirstTrainer + 1}</span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastTrainer, filteredTrainers.length)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{filteredTrainers.length}</span>{' '}
                  trainers
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

            {filteredTrainers.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <p>No trainers found matching your criteria.</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <AddTrainerForm
        open={isAddTrainerOpen}
        onOpenChange={setIsAddTrainerOpen}
        onSubmit={handleAddTrainer}
      />
    </div>
  );
}
