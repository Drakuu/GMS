'use client';

import { useState } from 'react';
import {
  Search,
  Plus,
  Dumbbell,
  Activity,
  Settings,
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  X,
} from 'lucide-react';

const equipmentData = [
  {
    id: 1,
    name: 'Treadmill Pro X1',
    category: 'Cardio',
    status: 'Active',
    location: 'Cardio Zone A',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-02-15',
    condition: 'Excellent',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQmYqahWAlX7ZaelgCMYtipYfakk4hTrmoA&s',
  },
  {
    id: 2,
    name: 'Olympic Barbell Set',
    category: 'Strength',
    status: 'Active',
    location: 'Free Weights',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-03-10',
    condition: 'Good',
    image: '/placeholder-1gin5.png',
  },

  {
    id: 3,
    name: 'Leg Press Machine',
    category: 'Strength',
    status: 'Maintenance',
    location: 'Strength Zone B',
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-01-25',
    condition: 'Under Repair',
    image: '/placeholder-16c8z.png',
  },
  {
    id: 4,
    name: 'Elliptical Trainer',
    category: 'Cardio',
    status: 'Active',
    location: 'Cardio Zone B',
    lastMaintenance: '2024-01-12',
    nextMaintenance: '2024-02-12',
    condition: 'Good',
    image: '/elliptical-trainer.png',
  },
  {
    id: 5,
    name: 'Cable Crossover',
    category: 'Strength',
    status: 'Active',
    location: 'Functional Area',
    lastMaintenance: '2024-01-18',
    nextMaintenance: '2024-02-18',
    condition: 'Excellent',
    image: '/placeholder-q23f7.png',
  },
  {
    id: 6,
    name: 'Rowing Machine',
    category: 'Cardio',
    status: 'Inactive',
    location: 'Storage',
    lastMaintenance: '2023-12-15',
    nextMaintenance: '2024-01-30',
    condition: 'Needs Repair',
    image: '/indoor-rowing.png',
  },
];

const categories = ['All', 'Cardio', 'Strength', 'Functional', 'Accessories'];
const statusOptions = ['Active', 'Maintenance', 'Inactive'];
const conditionOptions = ['Excellent', 'Good', 'Needs Repair'];

export default function EquipmentPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    description: '',
    status: 'Active',
    condition: 'Good',
    lastMaintenance: '',
    nextMaintenance: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to an API
    console.log('Form submitted:', formData);
    // For demo purposes, we'll just close the dialog
    setIsAddDialogOpen(false);
    // Reset form
    setFormData({
      name: '',
      category: '',
      location: '',
      description: '',
      status: 'Active',
      condition: 'Good',
      lastMaintenance: '',
      nextMaintenance: '',
    });
  };

  const filteredEquipment = equipmentData.filter((equipment) => {
    const matchesSearch =
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || equipment.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredEquipment.length / itemsPerPage);
  const paginatedEquipment = filteredEquipment.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-4 w-4" />;
      case 'Maintenance':
        return <Clock className="h-4 w-4" />;
      case 'Inactive':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const stats = [
    {
      title: 'Total Equipment',
      value: equipmentData.length,
      icon: <Dumbbell className="h-6 w-6" />,
      color: 'bg-red-500',
    },
    {
      title: 'Active',
      value: equipmentData.filter((e) => e.status === 'Active').length,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'bg-green-500',
    },
    {
      title: 'Under Maintenance',
      value: equipmentData.filter((e) => e.status === 'Maintenance').length,
      icon: <Settings className="h-6 w-6" />,
      color: 'bg-yellow-500',
    },
    {
      title: 'Inactive',
      value: equipmentData.filter((e) => e.status === 'Inactive').length,
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'bg-red-600',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white ">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Equipment Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and monitor your gym equipment
              </p>
            </div>
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Equipment
            </button>
          </div>
        </div>
      </div>

      {/* Add Equipment Modal */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Equipment</h2>
              <button
                onClick={() => setIsAddDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Equipment Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter equipment name"
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select category</option>
                  {categories
                    .filter((cat) => cat !== 'All')
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Equipment location"
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
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="condition"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Condition
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {conditionOptions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Equipment description"
                  rows="3"
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Add Equipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-full mx-auto px-3 sm:px-6 lg:px-8 py-3">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border-l-4 border-red-600 "
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg text-white`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 ">
          <div className="border-b border-gray-200 mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Trainer Directory
            </h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              Search and filter through your gym trainers
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4  mb-6 ">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search equipment by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <Filter className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-sm font-medium text-gray-600">
                  Filter:
                </span>
              </div>
              <div className="inline-flex rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-gray-50">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      index === 0 ? '' : 'border-l border-gray-200'
                    } ${
                      selectedCategory === category
                        ? 'bg-red-600 text-white shadow-inner'
                        : 'bg-white hover:bg-gray-100 text-gray-700'
                    }`}
                    aria-current={
                      selectedCategory === category ? 'page' : undefined
                    }
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Equipment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedEquipment.map((equipment) => (
              <div
                key={equipment.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={equipment.image || '/placeholder.svg'}
                    alt={equipment.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`${getStatusColor(
                        equipment.status
                      )} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 border`}
                    >
                      {getStatusIcon(equipment.status)}
                      {equipment.status}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {equipment.name}
                      </h3>
                      <span className="mt-1 text-red-600 border border-red-200 px-2 py-1 rounded-full text-xs">
                        {equipment.category}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-red-500" />
                      {equipment.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Activity className="h-4 w-4 mr-2 text-red-500" />
                      Condition: {equipment.condition}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-red-500" />
                      Next Maintenance: {equipment.nextMaintenance}
                    </div>
                    <div className="flex gap-2 pt-3">
                      <button className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm flex items-center justify-center">
                        <Settings className="h-4 w-4 mr-1" />
                        Maintain
                      </button>
                      <button className="flex-1 px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {filteredEquipment.length > itemsPerPage && (
            <div className="flex justify-center mt-8">
              <div className="flex gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className={`px-3 py-1 border border-gray-300 rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-100 cursor-not-allowed'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 border border-gray-300 rounded-md ${
                      currentPage === index + 1
                        ? 'bg-red-600 text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className={`px-3 py-1 border border-gray-300 rounded-md ${
                    currentPage === totalPages
                      ? 'bg-gray-100 cursor-not-allowed'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No equipment found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
