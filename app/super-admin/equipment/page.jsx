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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    console.log('Form submitted:', formData);
    setIsAddDialogOpen(false);
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

  const totalPages = Math.ceil(filteredEquipment.length / itemsPerPage);
  const paginatedEquipment = filteredEquipment.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <Badge variant="success">{status}</Badge>;
      case 'Maintenance':
        return <Badge variant="warning">{status}</Badge>;
      case 'Inactive':
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const stats = [
    {
      title: 'Total Equipment',
      value: equipmentData.length,
      icon: Dumbbell,
      color: 'text-red-600',
    },
    {
      title: 'Active',
      value: equipmentData.filter((e) => e.status === 'Active').length,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      title: 'Under Maintenance',
      value: equipmentData.filter((e) => e.status === 'Maintenance').length,
      icon: Settings,
      color: 'text-yellow-600',
    },
    {
      title: 'Inactive',
      value: equipmentData.filter((e) => e.status === 'Inactive').length,
      icon: AlertTriangle,
      color: 'text-red-600',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white">
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
            <Button variant={"creative" } onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Equipment
            </Button>
          </div>
        </div>
      </div>

      {/* Add Equipment Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Add New Equipment</DialogTitle>
            <DialogDescription>Fill in the equipment details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Equipment Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter equipment name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  name="category"
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((cat) => cat !== 'All')
                      .map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Equipment location"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Condition</label>
                <Select
                  name="condition"
                  value={formData.condition}
                  onValueChange={(value) =>
                    setFormData({ ...formData, condition: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditionOptions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Equipment description"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Equipment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="max-w-full mx-auto px-3 sm:px-6 lg:px-8 py-3">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-l-4 border-l-red-500">
              
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
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <Card>
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">
              Equipment Directory
            </h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              Search and filter through your gym equipment
            </p>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search equipment by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm font-medium text-gray-600">
                    Filter:
                  </span>
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Equipment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedEquipment.map((equipment) => (
                <Card
                  key={equipment.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarImage
                        src={equipment.image || '/placeholder.svg'}
                      />
                      <AvatarFallback>
                        {equipment.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute top-4 right-4">
                      {getStatusBadge(equipment.status)}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {equipment.name}
                        </h3>
                        <Badge variant="outline" className="mt-1">
                          {equipment.category}
                        </Badge>
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
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="h-4 w-4 mr-1" />
                          Maintain
                        </Button>
                        <Button size="sm" className="flex-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {filteredEquipment.length > itemsPerPage && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <Button
                      key={index}
                      variant={
                        currentPage === index + 1 ? 'default' : 'outline'
                      }
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

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
        </Card>
      </div>
    </div>
  );
}