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
  Grid,
  List,
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
} from '@/components/ui/dialog';
import { StatCard } from '@/components/equipment/StatCard';
import { EquipmentListView } from '@/components/equipment/EquipmentListView';
import { EquipmentGridView } from '@/components/equipment/EquipmentGridView';
import { AddEquipmentForm } from '@/components/equipment/AddEquipmentForm';

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
      'https://atlantisstrength.com/app/uploads/2022/02/gym-equipment-scaled-1920x1080.jpg',
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
    image:
      'https://cdn.shopify.com/s/files/1/0430/6533/files/OzQvwVeWEiOYq8VxemYHLNGyA2Sx3OJ91614347671.jpg?v=1614787195',
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
    image: 'https://webuygymequipment.com/assets/img/gym-equipment-2.webp',
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
    image:
      'https://akfit.com/cdn/shop/articles/107194-exercise-equipmentg1.png?v=1694789703',
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
    image:
      'https://dynamofitness.com.au/cdn/shop/files/qrwefds_c7c5f059-56c6-41fe-a027-dff9f980cfec_1400x.jpg?v=1713924204',
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
    image:
      'https://img.freepik.com/free-photo/top-view-perfectly-ordered-fitness-items_23-2150321809.jpg?semt=ais_hybrid&w=740&q=80',
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
  const [activeMode, setActiveMode] = useState('list');
  const itemsPerPage = 6;
  const role = 'admin';

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

  const handleSelectChange = (name, value) => {
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
        return <Badge variant="active">{status}</Badge>;
      case 'Maintenance':
        return <Badge variant="pending">{status}</Badge>;
      case 'Inactive':
        return <Badge variant="inactive">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getCategoryBadge = (category) => {
    switch (category.toLowerCase()) {
      case 'cardio':
        return <Badge variant={'catagoryA'}>Cardio</Badge>;
      case 'yoga':
        return <Badge variant={'catagoryB'}>Yoga</Badge>;
      case 'strength':
        return <Badge variant={'catagoryC'}>Strength</Badge>;
      case 'dance':
        return <Badge variant={'catagoryD'}>Dance</Badge>;
      case 'pilates':
        return <Badge variant={'catagoryE'}>Pilates</Badge>;
      default:
        return <Badge variant={'catagoryF'}>{category}</Badge>;
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
      <div>
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold">Equipment Management</h1>
              <p className="mt-1">Manage and monitor your gym equipment</p>
            </div>
            <div className="flex justify-left sm:justify-end gap-2">
              <Button
                className={'text-primary bg-muted hover:bg-muted/80'}
                onClick={() => setActiveMode('grid')}
              >
                <Grid />
              </Button>
              <Button
                className={'text-primary bg-muted hover:bg-muted/80'}
                onClick={() => setActiveMode('list')}
              >
                <List />
              </Button>
              {role != 'user' && (
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Equipment
                </Button>
              )}
            </div>
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
          <AddEquipmentForm
            formData={formData}
            categories={categories}
            statusOptions={statusOptions}
            conditionOptions={conditionOptions}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            onSubmit={handleSubmit}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <div className="max-w-full mx-auto px-3 sm:px-6 lg:px-8 py-3">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Search and Filter */}
        <Card>
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium">Equipment Directory</h3>
            <p className="text-sm mt-1">
              Search and filter through your gym equipment
            </p>
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                <Input
                  placeholder="Search equipment by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Filter:</span>
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

            {/* Equipment list or grid view */}
            {activeMode === 'list' ? (
              <EquipmentListView
                role={role}
                equipment={paginatedEquipment}
                getStatusBadge={getStatusBadge}
                getCategoryBadge={getCategoryBadge}
              />
            ) : (
              <EquipmentGridView
                role={role}
                equipment={paginatedEquipment}
                getStatusBadge={getStatusBadge}
              />
            )}

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
                <Dumbbell className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No equipment found</h3>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
