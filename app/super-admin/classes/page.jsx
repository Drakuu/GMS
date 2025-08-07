'use client';

import { act, useState } from 'react';
import {
  Search,
  Plus,
  Star,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Heart,
  X,
  Calendar,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';

const classes = [
  {
    id: 1,
    name: 'High-Intensity Interval Training',
    instructor: 'Sarah Johnson',
    instructorImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    classImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    time: '6:00 AM - 7:00 AM',
    duration: '60 min',
    difficulty: 'Advanced',
    capacity: 20,
    enrolled: 18,
    rating: 4.8,
    category: 'Cardio',
    description:
      'Burn calories and build endurance with this high-energy workout combining cardio and strength training.',
    location: 'Studio A',
    price: '$25',
  },
  {
    id: 2,
    name: 'Power Yoga Flow',
    instructor: 'Emily Chen',
    instructorImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    classImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597',
    time: '7:30 AM - 8:30 AM',
    duration: '60 min',
    difficulty: 'Intermediate',
    capacity: 15,
    enrolled: 12,
    rating: 4.9,
    category: 'Yoga',
    description:
      'Strengthen and stretch your body with this dynamic yoga sequence designed to build heat and flexibility.',
    location: 'Studio B',
    price: '$20',
  },
  {
    id: 3,
    name: 'Strength & Conditioning',
    instructor: 'Mike Rodriguez',
    instructorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    classImage: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb',
    time: '5:00 PM - 6:00 PM',
    duration: '60 min',
    difficulty: 'Intermediate',
    capacity: 18,
    enrolled: 15,
    rating: 4.7,
    category: 'Strength',
    description:
      'Build lean muscle and improve overall fitness with compound movements and functional training.',
    location: 'Main Floor',
    price: '$30',
  },
  {
    id: 4,
    name: 'Zumba Dance Party',
    instructor: 'Lisa Park',
    instructorImage: 'https://randomuser.me/api/portraits/women/65.jpg',
    classImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a',
    time: '6:30 PM - 7:30 PM',
    duration: '60 min',
    difficulty: 'Beginner',
    capacity: 25,
    enrolled: 22,
    rating: 4.8,
    category: 'Dance',
    description:
      'High-energy dance workout that combines Latin rhythms with cardiovascular exercise.',
    location: 'Studio A',
    price: '$15',
  },
  {
    id: 5,
    name: 'Spin & Sculpt',
    instructor: 'James Wilson',
    instructorImage: 'https://randomuser.me/api/portraits/men/75.jpg',
    classImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b',
    time: '7:00 AM - 7:45 AM',
    duration: '45 min',
    difficulty: 'Advanced',
    capacity: 12,
    enrolled: 12,
    rating: 4.9,
    category: 'Cardio',
    description:
      'Indoor cycling class with upper body strength segments for a full-body workout.',
    location: 'Spin Studio',
    price: '$28',
  },
  {
    id: 6,
    name: 'Pilates Reformer',
    instructor: 'Maria Garcia',
    instructorImage: 'https://randomuser.me/api/portraits/women/63.jpg',
    classImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f',
    time: '9:00 AM - 10:00 AM',
    duration: '60 min',
    difficulty: 'Intermediate',
    capacity: 8,
    enrolled: 6,
    rating: 5.0,
    category: 'Pilates',
    description:
      'Low-impact workout that strengthens core muscles while improving flexibility and posture.',
    location: 'Pilates Studio',
    price: '$35',
  },
];

const stats = [
  {
    title: 'Total Classes',
    value: classes.length.toString(),
    icon: Dumbbell,
    color: 'text-red-600',
  },
  {
    title: 'Average Rating',
    value: (
      classes.reduce((acc, cls) => acc + cls.rating, 0) / classes.length
    ).toFixed(1),
    icon: Star,
    color: 'text-yellow-600',
  },
  {
    title: 'Upcoming Today',
    value: classes
      .filter((cls) => cls.time.includes('AM') || cls.time.includes('PM'))
      .length.toString(),
    icon: Calendar,
    color: 'text-blue-600',
  },
  {
    title: 'Total Capacity',
    value: classes.reduce((acc, cls) => acc + cls.capacity, 0).toString(),
    icon: Users,
    color: 'text-green-600',
  },
];

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeMode, setActiveMode] = useState('list');
  const [newClass, setNewClass] = useState({
    name: '',
    instructor: '',
    instructorImage: '',
    classImage: '',
    time: '',
    duration: '',
    difficulty: 'Intermediate',
    capacity: 0,
    enrolled: 0,
    rating: 0,
    category: 'Cardio',
    description: '',
    location: '',
    price: '',
  });
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'credit',
  });

  const classesPerPage = 6;

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || cls.category.toLowerCase() === categoryFilter;
    const matchesDifficulty =
      difficultyFilter === 'all' ||
      cls.difficulty.toLowerCase() === difficultyFilter;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Get current classes for pagination
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = filteredClasses.slice(
    indexOfFirstClass,
    indexOfLastClass
  );
  const totalPages = Math.ceil(filteredClasses.length / classesPerPage);

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return <Badge variant={'active'}>Beginner</Badge>;
      case 'intermediate':
        return <Badge variant={'pending'}>Intermediate</Badge>;
      case 'advanced':
        return <Badge variant={'inactive'}>Advanced</Badge>;
      default:
        return <Badge variant={'default'}>{difficulty}</Badge>;
    }
  };

  const getCategoryBadge = (category) => {
    switch (category.toLowerCase()) {
      case 'cardio':
        return <Badge className="bg-amber-100 text-amber-800">Cardio</Badge>;
      case 'yoga':
        return <Badge className="bg-purple-100 text-purple-800">Yoga</Badge>;
      case 'strength':
        return <Badge className="bg-blue-100 text-blue-800">Strength</Badge>;
      case 'dance':
        return <Badge className="bg-pink-100 text-pink-800">Dance</Badge>;
      case 'pilates':
        return <Badge className="bg-teal-100 text-teal-800">Pilates</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{category}</Badge>;
    }
  };

  const categories = [...new Set(classes.map((cls) => cls.category))];
  const difficulties = [...new Set(classes.map((cls) => cls.difficulty))];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddClass = () => {
    // In a real app, you would send this data to your backend
    console.log('Adding new class:', newClass);
    setShowAddClassModal(false);
    setNewClass({
      name: '',
      instructor: '',
      instructorImage: '',
      classImage: '',
      time: '',
      duration: '',
      difficulty: 'Intermediate',
      capacity: 0,
      enrolled: 0,
      rating: 0,
      category: 'Cardio',
      description: '',
      location: '',
      price: '',
    });
  };

  const handleBookClass = () => {
    console.log(
      'Booking class:',
      selectedClass,
      'with details:',
      bookingDetails
    );
    setShowBookingModal(false);
    setBookingDetails({
      name: '',
      email: '',
      phone: '',
      paymentMethod: 'credit',
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Fitness Classes
            </h1>
            <p className="text-gray-600 mt-1">
              Browse and book our professional training sessions
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
              variant={'creative'}
              onClick={() => setShowAddClassModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Class
            </Button>
          </div>
        </div>
        {/* Stats card */}
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

        {/* Filters */}
        <Card>
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">
              Classes Directory
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Search and filter to book classes with your gym trainers
            </p>
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search classes or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {difficulties.map((difficulty, index) => (
                    <SelectItem key={index} value={difficulty.toLowerCase()}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Classes list */}
            {activeMode === 'list' && (
              <>
                {' '}
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
                      {currentClasses.map((cls) => (
                        <TableRow key={cls.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={cls.instructorImage} />
                                <AvatarFallback>
                                  {cls.instructor.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              {cls.instructor}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {cls.name}
                          </TableCell>
                          <TableCell>{cls.time}</TableCell>
                          <TableCell>{cls.duration}</TableCell>
                          <TableCell>
                            {getCategoryBadge(cls.category)}
                          </TableCell>
                          <TableCell>
                            {getDifficultyBadge(cls.difficulty)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-gray-500" />
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
                                onClick={() => {
                                  setSelectedClass(cls);
                                  setShowBookingModal(true);
                                }}
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
              </>
            )}
            {/* Classes Grid */}
            {activeMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentClasses.map((cls) => (
                  <Card
                    key={cls.id}
                    className="hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <div className="relative h-48 bg-gradient-to-r from-red-600 to-red-800">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${
                            cls.classImage || cls.instructorImage
                          })`,
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 border-2 border-white mr-3">
                            <AvatarImage src={cls.instructorImage} />
                            <AvatarFallback>
                              {cls.instructor.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white font-medium">
                              {cls.instructor}
                            </p>
                            <p className="text-red-200 text-sm">
                              {cls.location}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 flex items-center bg-white/90 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm font-medium">
                          {cls.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col p-6 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900 truncate">
                          {cls.name}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {getCategoryBadge(cls.category)}
                        {getDifficultyBadge(cls.difficulty)}
                      </div>

                      <p className="text-gray-600 text-sm mb-4 h-16 overflow-hidden overflow-ellipsis">
                        {cls.description.length > 200
                          ? cls.description.slice(0, 200) + '...'
                          : cls.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-red-600 mr-2" />
                          <span className="text-xs">{cls.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-red-600 mr-2" />
                          <span className="text-xs">
                            {cls.enrolled}/{cls.capacity} spots
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            setSelectedClass(cls);
                            setShowBookingModal(true);
                          }}
                          className="flex-1"
                        >
                          Edit class
                        </Button>
                        <Button className="flex-1">Cancel class</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredClasses.length > 0 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500">
                  Showing{' '}
                  <span className="font-medium">{indexOfFirstClass + 1}</span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastClass, filteredClasses.length)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{filteredClasses.length}</span>{' '}
                  classes
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

            {filteredClasses.length === 0 && (
              <div className="text-center py-12">
                <Dumbbell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">
                  No classes found
                </h3>
                <p className="text-gray-500 mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Add Class Modal */}
      <Dialog open={showAddClassModal} onOpenChange={setShowAddClassModal}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription>
              Fill in the details for the new fitness class
            </DialogDescription>
          </DialogHeader>
          {/* Image Upload Section */}
          <div className="flex flex-col ">
            <label className="text-sm font-medium mb-2">
              Class image
            </label>
            <label htmlFor="classImageUpload" className="cursor-pointer">
              <div className="relative w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {newClass.classImage ? (
                  <img
                    src={newClass.classImage}
                    alt="Class preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <Upload className="w-4 h-4 mx-auto text-gray-400" />
                    <span className="text-xs text-gray-500 mt-2">
                      Upload 
                    </span>
                  </div>
                )}
              </div>
            </label>
            <input
              id="classImageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              // onChange={(e) => {
              //   const file = e.target.files?.[0];
              //   if (file) {
              //     const reader = new FileReader();
              //     reader.onload = (event) => {
              //       setNewClass({...newClass, classImage: event.target?.result as string});
              //     };
              //     reader.readAsDataURL(file);
              //   }
              // }}
            />
            <p className="text-xs text-gray-500 mt-2">
              Recommended size: 500x500 pixels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Class Name</label>
              <Input
                value={newClass.name}
                onChange={(e) =>
                  setNewClass({ ...newClass, name: e.target.value })
                }
                placeholder="Enter class name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Instructor Name</label>
              <Input
                value={newClass.instructor}
                onChange={(e) =>
                  setNewClass({ ...newClass, instructor: e.target.value })
                }
                placeholder="Enter instructor name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time</label>
              <Input
                value={newClass.time}
                onChange={(e) =>
                  setNewClass({ ...newClass, time: e.target.value })
                }
                placeholder="Enter class time"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Input
                value={newClass.duration}
                onChange={(e) =>
                  setNewClass({ ...newClass, duration: e.target.value })
                }
                placeholder="Enter duration (e.g., 60 mins)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select
                value={newClass.difficulty}
                onValueChange={(value) =>
                  setNewClass({ ...newClass, difficulty: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Capacity</label>
              <Input
                type="number"
                value={newClass.capacity}
                onChange={(e) =>
                  setNewClass({
                    ...newClass,
                    capacity: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Enter class capacity"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={newClass.category}
                onValueChange={(value) =>
                  setNewClass({ ...newClass, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardio">Cardio</SelectItem>
                  <SelectItem value="Yoga">Yoga</SelectItem>
                  <SelectItem value="Strength">Strength</SelectItem>
                  <SelectItem value="Dance">Dance</SelectItem>
                  <SelectItem value="Pilates">Pilates</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                value={newClass.location}
                onChange={(e) =>
                  setNewClass({ ...newClass, location: e.target.value })
                }
                placeholder="Enter class location"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={newClass.description}
                onChange={(e) =>
                  setNewClass({ ...newClass, description: e.target.value })
                }
                placeholder="Enter class description"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddClassModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddClass}>Add Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Class</DialogTitle>
            {selectedClass && (
              <DialogDescription className="flex flex-col gap-1">
                <span className="font-medium text-gray-900">
                  {selectedClass.name}
                </span>
                <span className="text-gray-600">
                  {selectedClass.instructor} • {selectedClass.time}
                </span>
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={bookingDetails.name}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, name: e.target.value })
                }
                placeholder="Enter your full name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={bookingDetails.email}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    email: e.target.value,
                  })
                }
                placeholder="Enter your email address"
              />
            </div>

            {/* <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={bookingDetails.phone}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    phone: e.target.value,
                  })
                }
                placeholder="Enter your phone number"
              />
            </div> */}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowBookingModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleBookClass}>Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
