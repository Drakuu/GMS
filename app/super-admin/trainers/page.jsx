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
} from 'lucide-react';

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
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200">
            Active
          </span>
        );
      case 'on leave':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            On Leave
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200">
            Inactive
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">
            {status}
          </span>
        );
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

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trainers</h1>
            <p className="text-gray-600 mt-1">
              Manage your gym trainers and their schedules
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsAddTrainerOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Trainer
            </button>

            {/* Add Trainer Dialog */}
            {isAddTrainerOpen && (
              <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Add New Trainer
                      </h3>
                      <button
                        onClick={() => setIsAddTrainerOpen(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Close</span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          placeholder="Sarah Johnson"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="specialization"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Specialization
                        </label>
                        <input
                          type="text"
                          id="specialization"
                          placeholder="Strength Training"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="experience"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Experience
                          </label>
                          <input
                            type="text"
                            id="experience"
                            placeholder="5 years"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Status
                          </label>
                          <select
                            id="status"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          >
                            <option value="active">Active</option>
                            <option value="on leave">On Leave</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="trainer@example.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          placeholder="+1 (555) 123-4567"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="bio"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          rows={3}
                          placeholder="Trainer's bio and qualifications..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        ></textarea>
                      </div>
                      <div>
                        <label
                          htmlFor="certifications"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Certifications (comma separated)
                        </label>
                        <input
                          type="text"
                          id="certifications"
                          placeholder="NASM-CPT, CSCS, etc."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsAddTrainerOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddTrainerOpen(false)}
                        className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Add Trainer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow border-l-4 border-l-red-500 overflow-hidden"
            >
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
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Trainer Directory
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Search and filter through your gym trainers
            </p>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search trainers by name or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-[180px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="on leave">On Leave</option>
                <option value="inactive">Inactive</option>
              </select>
              <select
                value={specializationFilter}
                onChange={(e) => setSpecializationFilter(e.target.value)}
                className="w-full sm:w-[180px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Specializations</option>
                {specializations.map((spec, index) => (
                  <option key={index} value={spec.toLowerCase()}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Trainers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentTrainers.map((trainer) => (
                <div
                  key={trainer.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={trainer.image || '/placeholder.svg'}
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {trainer.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {trainer.name}
                        </h3>
                        <p className="text-red-600 font-medium">
                          {trainer.specialization}
                        </p>
                      </div>
                      {getStatusBadge(trainer.status)}
                    </div>

                    <p className="text-gray-600 text-sm mt-3 mb-4">
                      {trainer.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {trainer.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>

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

                    <div className="flex gap-2 pt-4">
                      <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                        Schedule
                      </button>
                      <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium rounded-md">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md border ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-3 py-1 rounded-md border ${
                          currentPage === number
                            ? 'bg-red-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md border ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
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
        </div>
      </div>
    </div>
  );
}
