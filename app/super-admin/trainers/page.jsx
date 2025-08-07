'use client';

import { useState } from 'react';
import {
  Search,
  Plus,
  TrendingUp,
  Edit,
  Eye,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  Award,
  X,
  Grid,
  List,
  Upload,
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
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const trainers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    specialization: 'Strength Training',
    experience: '8 years',
    rating: 4.9,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQmYqahWAlX7ZaelgCMYtipYfakk4hTrmoA&s',
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
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHeMYouF_PJaol_YZuvlp-Zz01ga_up80N0g&s',
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
    image: '/professional-female-yoga-instructor.png',
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
    image: '/placeholder-9sfll.png',
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
    image: '/female-fitness-trainer-weight-loss.png',
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
    image: '/placeholder-gza70.png',
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

export default function TrainersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [isAddTrainerOpen, setIsAddTrainerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMode, setActiveMode] = useState('list');
  const [trainerData, setTrainerData] = useState({
    name: '',
    specialization: '',
    experience: '',
    status: '',
    email: '',
    phone: '',
    bio: '',
    certifications: '',
  });

  const trainersPerPage = 6;

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

  // Get current trainers for pagination
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

  const stats = [
    {
      title: 'Total Trainers',
      value: trainers.length.toString(),
      icon: Users,
      color: 'text-red-600',
    },
    {
      title: 'Active Trainers',
      value: trainers.filter((t) => t.status === 'Active').length.toString(),
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Average Rating',
      value: (
        trainers.reduce((acc, t) => acc + t.rating, 0) / trainers.length
      ).toFixed(1),
      icon: Star,
      color: 'text-yellow-600',
    },
    {
      title: 'Certifications',
      value: trainers
        .reduce((acc, t) => acc + t.certifications.length, 0)
        .toString(),
      icon: Award,
      color: 'text-blue-600',
    },
  ];

  const specializations = [
    ...new Set(trainers.map((trainer) => trainer.specialization)),
  ];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Handle input changes and update state
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTrainerData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle select changes
  const handleSelectChange = (value) => {
    setTrainerData((prevData) => ({
      ...prevData,
      status: value,
    }));
  };

  // Submit function
  const handleSubmit = () => {
    // Handle form submission here
    console.log(trainerData);
    setIsAddTrainerOpen(false); // Close dialog after submitting
  };
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trainers</h1>
            <p className="text-gray-600 mt-1">
              Manage your gym trainers and their schedules
            </p>
          </div>
          <div className=" flex justify-left sm:justify-end gap-2">
            <Button onClick={() => setActiveMode('grid')}>
              <Grid />
            </Button>
            <Button onClick={() => setActiveMode('list')}>
              <List />
            </Button>
            <Button
              variant="creative"
              onClick={() => setIsAddTrainerOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Trainer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-l-4 border-l-red-500">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters, search, table and grid*/}
        <Card>
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">
              Trainer Directory
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Search and filter through your gym trainers
            </p>
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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

            {/* Trainers List */}
            {activeMode === 'list' && (
              <>
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
                        <TableHead className="text-right w-[100px]">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTrainers.map((trainer) => (
                        <TableRow key={trainer.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={
                                    trainer.image || '/placeholder-trainer.svg'
                                  }
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
                                <div className="font-medium">
                                  {trainer.name}
                                </div>
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
                          <TableCell>
                            {getStatusBadge(trainer.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredTrainers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No trainers found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}

            {/* Trainers Grid */}
            {activeMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTrainers.map((trainer) => (
                  <Card
                    key={trainer.id}
                    className="hover:shadow-lg transition-shadow rounded-lg overflow-hidden flex flex-col"
                  >
                    <div className="relative">
                      {/* Avatar Section */}
                      <div className="h-48 bg-gray-200 overflow-hidden">
                        <Avatar className="w-full h-full rounded-none">
                          <AvatarImage
                            src={trainer.image || '/placeholder.svg'}
                            alt={trainer.name}
                          />
                          <AvatarFallback>
                            {trainer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      {/* Badge for Rating */}
                      <div className="absolute top-4 right-4">
                        <Badge variant={'pending'}>
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          {trainer.rating}
                        </Badge>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 truncate">
                            {trainer.name}
                          </h3>
                          <p className="text-red-600 text-xs font-medium truncate">
                            {trainer.specialization}
                          </p>
                        </div>
                        {getStatusBadge(trainer.status)}
                      </div>

                      {/* Bio (with truncation for longer text) */}
                      <p className="text-gray-600 text-sm mt-3 mb-4 truncate">
                        {trainer.bio}
                      </p>

                      {/* Certifications */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {trainer.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline">
                            {cert}
                          </Badge>
                        ))}
                      </div>

                      {/* Experience & Clients */}
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-red-600" />
                          <span>{trainer.experience}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-red-600" />
                          <span>{trainer.clients} clients</span>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 pt-4 border-t text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-red-600" />
                          <span className="truncate">{trainer.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-red-600" />
                          <span>{trainer.phone}</span>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 pt-4">
                        <Button className="flex-1">Schedule</Button>
                        <Button variant="outline" className="flex-1">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredTrainers.length > 0 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500">
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
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No trainers found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Add Trainer Dialog */}
      <Dialog open={isAddTrainerOpen} onOpenChange={setIsAddTrainerOpen}>
        <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Add New Trainer</DialogTitle>
            <DialogDescription>
              Fill in the details for the new trainer
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Trainer image</label>
            <label htmlFor="classImageUpload" className="cursor-pointer">
              <div className="relative w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {trainerData.image ? (
                  <img
                    src={trainerData.image}
                    alt="Class preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <Upload className="w-4 h-4 mx-auto text-gray-400" />
                    <span className="text-xs text-gray-500 mt-2">Upload</span>
                  </div>
                )}
              </div>
            </label>
            <input
              id="classImageUpload"
              type="file"
              accept="image/*"
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-2">
              Recommended size: 500x500 pixels
            </p>
          </div>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                placeholder="Sarah Johnson"
                value={trainerData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="specialization" className="text-sm font-medium">
                Specialization
              </label>
              <Input
                id="specialization"
                placeholder="Strength Training"
                value={trainerData.specialization}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="experience" className="text-sm font-medium">
                  Experience
                </label>
                <Input
                  id="experience"
                  placeholder="5 years"
                  value={trainerData.experience}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select
                  value={trainerData.status}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on leave">On Leave</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="trainer@example.com"
                value={trainerData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={trainerData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="bio" className="text-sm font-medium">
                Bio
              </label>
              <Textarea
                id="bio"
                placeholder="Trainer's bio and qualifications..."
                value={trainerData.bio}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="certifications" className="text-sm font-medium">
                Certifications (comma separated)
              </label>
              <Input
                id="certifications"
                placeholder="NASM-CPT, CSCS, etc."
                value={trainerData.certifications}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddTrainerOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Add Trainer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
