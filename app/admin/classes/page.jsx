'use client';

const classes = [
  {
    id: 1,
    name: 'High-Intensity Interval Training',
    instructor: 'Sarah Johnson',
    instructorImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    classImage:
      'https://web-back.perfectgym.com/sites/default/files/styles/460x/public/equipment%20%286%29.jpg?itok=bC0T32-K',
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

import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';

// Import components
import { StatsCard } from '@/components/classes/StatsCard';
import { ClassTableView } from '@/components/classes/ClassTableView';
import { ClassGridView } from '@/components/classes/ClassGridView';
import { Pagination } from '@/components/classes/Pagination';
import { AddClassForm } from '@/components/classes/AddClassForm';
import { BookingForm } from '@/components/classes/BookingForm';

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeMode, setActiveMode] = useState('grid');
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
  const role = 'admin';

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

  const categories = [...new Set(classes.map((cls) => cls.category))];
  const difficulties = [...new Set(classes.map((cls) => cls.difficulty))];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddClass = () => {
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
            <h1 className="text-3xl font-bold">Fitness Classes</h1>
            <p className="mt-1">
              Browse and book our professional training sessions
            </p>
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
              <Button onClick={() => setShowAddClassModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Class
              </Button>
            )}
          </div>
        </div>

        {/* Stats card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Filters */}
        <Card>
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium">Classes Directory</h3>
            <p className="text-sm mt-1">
              Search and filter to book classes with your gym trainers
            </p>
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
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
              <ClassTableView
                role={role}
                classes={currentClasses}
                onBookClass={(cls) => {
                  setSelectedClass(cls);
                  setShowBookingModal(true);
                }}
                getDifficultyBadge={getDifficultyBadge}
                getCategoryBadge={getCategoryBadge}
              />
            )}

            {/* Classes Grid */}
            {activeMode === 'grid' && (
              <ClassGridView
                role={role}
                classes={currentClasses}
                onBookClass={(cls) => {
                  setSelectedClass(cls);
                  setShowBookingModal(true);
                }}
                getDifficultyBadge={getDifficultyBadge}
                getCategoryBadge={getCategoryBadge}
              />
            )}

            {/* Pagination */}
            {filteredClasses.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                filteredClassesLength={filteredClasses.length}
                indexOfFirstClass={indexOfFirstClass}
                indexOfLastClass={indexOfLastClass}
                onPageChange={paginate}
              />
            )}

            {filteredClasses.length === 0 && (
              <div className="text-center py-12">
                <Dumbbell className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No classes found</h3>
                <p className="mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Add Class Modal */}
      <AddClassForm
        open={showAddClassModal}
        onOpenChange={setShowAddClassModal}
        onSubmit={handleAddClass}
      />

      {/* Booking Modal */}
      <BookingForm
        open={showBookingModal}
        onOpenChange={setShowBookingModal}
        selectedClass={selectedClass}
        onSubmit={handleBookClass}
        bookingDetails={bookingDetails}
        setBookingDetails={setBookingDetails}
      />
    </div>
  );
}
