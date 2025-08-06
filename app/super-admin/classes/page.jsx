'use client';

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
} from 'lucide-react';

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

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
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
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Beginner
          </span>
        );
      case 'intermediate':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Intermediate
          </span>
        );
      case 'advanced':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Advanced
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {difficulty}
          </span>
        );
    }
  };

  const getCategoryBadge = (category) => {
    switch (category.toLowerCase()) {
      case 'cardio':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Cardio
          </span>
        );
      case 'yoga':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Yoga
          </span>
        );
      case 'strength':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Strength
          </span>
        );
      case 'dance':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
            Dance
          </span>
        );
      case 'pilates':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
            Pilates
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {category}
          </span>
        );
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
    // In a real app, you would send this data to your backend
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
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddClassModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Class
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Classes Directory
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Search and filter to book classes with your gym trainers
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 my-6 mx-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search classes or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-[180px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full sm:w-[180px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Levels</option>
              {difficulties.map((difficulty, index) => (
                <option key={index} value={difficulty.toLowerCase()}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-3 pr-3">
            {currentClasses.map((cls) => (
              <div
                key={cls.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Class Image */}
                <div
                  className="relative h-48 bg-gradient-to-r from-red-600 to-red-800"
                  style={{
                    backgroundImage: `url(${
                      cls.classImage || cls.instructorImage
                    })`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0  flex items-end p-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden mr-3">
                        <img
                          src={cls.instructorImage}
                          alt={cls.instructor}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {cls.instructor}
                        </p>
                        <p className="text-red-200 text-sm">{cls.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="text-sm font-medium">{cls.rating}</span>
                  </div>
                </div>

                {/* Class Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {cls.name}
                    </h3>
                    <span className="text-red-600 font-bold">{cls.price}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {getCategoryBadge(cls.category)}
                    {getDifficultyBadge(cls.difficulty)}
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {cls.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-red-600 mr-2" />
                      <span>{cls.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-red-600 mr-2" />
                      <span>
                        {cls.enrolled}/{cls.capacity} spots
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedClass(cls);
                        setShowBookingModal(true);
                      }}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                    >
                      Book Now
                    </button>
                    <button className="p-2 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-md">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {filteredClasses.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Showing{' '}
                <span className="font-medium">{indexOfFirstClass + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastClass, filteredClasses.length)}
                </span>{' '}
                of <span className="font-medium">{filteredClasses.length}</span>{' '}
                classes
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
        </div>

        {filteredClasses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
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

      {/* Add Class Modal */}
      {showAddClassModal && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Add New Class
                </h2>
                <button
                  onClick={() => setShowAddClassModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class Name
                  </label>
                  <input
                    type="text"
                    value={newClass.name}
                    onChange={(e) =>
                      setNewClass({ ...newClass, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter class name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instructor
                  </label>
                  <input
                    type="text"
                    value={newClass.instructor}
                    onChange={(e) =>
                      setNewClass({ ...newClass, instructor: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter instructor name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instructor Image URL
                  </label>
                  <input
                    type="text"
                    value={newClass.instructorImage}
                    onChange={(e) =>
                      setNewClass({
                        ...newClass,
                        instructorImage: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter instructor image URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class Image URL
                  </label>
                  <input
                    type="text"
                    value={newClass.classImage}
                    onChange={(e) =>
                      setNewClass({ ...newClass, classImage: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter class image URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    value={newClass.time}
                    onChange={(e) =>
                      setNewClass({ ...newClass, time: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter class time"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newClass.duration}
                    onChange={(e) =>
                      setNewClass({ ...newClass, duration: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter duration (e.g., 60 mins)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={newClass.difficulty}
                    onChange={(e) =>
                      setNewClass({ ...newClass, difficulty: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={newClass.capacity}
                    onChange={(e) =>
                      setNewClass({
                        ...newClass,
                        capacity: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter class capacity"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newClass.category}
                    onChange={(e) =>
                      setNewClass({ ...newClass, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="Cardio">Cardio</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Strength">Strength</option>
                    <option value="Dance">Dance</option>
                    <option value="Pilates">Pilates</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newClass.location}
                    onChange={(e) =>
                      setNewClass({ ...newClass, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter class location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    value={newClass.price}
                    onChange={(e) =>
                      setNewClass({ ...newClass, price: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter price"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newClass.description}
                    onChange={(e) =>
                      setNewClass({ ...newClass, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter class description"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowAddClassModal(false)}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddClass}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Add Class
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedClass && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Book Class</h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedClass.name}
                </h3>
                <p className="text-gray-600">
                  {selectedClass.instructor} • {selectedClass.time}
                </p>
                <p className="text-red-600 font-bold mt-1">
                  {selectedClass.price}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={bookingDetails.name}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={bookingDetails.email}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={bookingDetails.phone}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={bookingDetails.paymentMethod}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash">Cash</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookClass}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
