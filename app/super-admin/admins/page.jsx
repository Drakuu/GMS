'use client';

// Mock data for gym members
const members = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    membershipType: 'Premium',
    status: 'Active',
    joinDate: '2024-01-15',
    lastVisit: '2024-12-20',
    avatar: '/thoughtful-man.png',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 987-6543',
    membershipType: 'Basic',
    status: 'Active',
    joinDate: '2024-02-20',
    lastVisit: '2024-12-19',
    avatar: '/diverse-woman-portrait.png',
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.wilson@email.com',
    phone: '+1 (555) 456-7890',
    membershipType: 'Premium',
    status: 'Expired',
    joinDate: '2023-11-10',
    lastVisit: '2024-11-30',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQmYqahWAlX7ZaelgCMYtipYfakk4hTrmoA&s',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 321-0987',
    membershipType: 'Standard',
    status: 'Active',
    joinDate: '2024-03-05',
    lastVisit: '2024-12-21',
    avatar: '/diverse-woman-portrait.png',
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+1 (555) 654-3210',
    membershipType: 'Basic',
    status: 'Suspended',
    joinDate: '2024-01-30',
    lastVisit: '2024-12-10',
    avatar: '/thoughtful-man.png',
  },
];


import { useMemo, useState } from 'react';
import { Plus, Search, Users, TrendingUp, Calendar, Clock } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { StatsCard } from '@/components/members/StatsCard';
import { MembersTable } from '@/components/members/MembersTable';
import AddNewMemberForm from '@/components/members/AddNewMemberForm';

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [membershipFilter, setMembershipFilter] = useState('all');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || member.status.toLowerCase() === statusFilter;
      const matchesMembership =
        membershipFilter === 'all' ||
        member.membershipType.toLowerCase() === membershipFilter;

      return matchesSearch && matchesStatus && matchesMembership;
    });
  }, [searchTerm, statusFilter, membershipFilter, members]);

  const stats = [
    {
      title: 'Total Members',
      value: members.length.toString(),
      icon: Users,
      color: 'text-red-600',
    },
    {
      title: 'Active Members',
      value: members.filter((m) => m.status === 'Active').length.toString(),
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'New This Month',
      value: '12',
      icon: Calendar,
      color: 'text-blue-600',
    },
    {
      title: 'Expired',
      value: members.filter((m) => m.status === 'Expired').length.toString(),
      icon: Clock,
      color: 'text-orange-600',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAddMemberOpen(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Members</h1>
            <p className="mt-1">Manage your gym members and memberships</p>
          </div>
          <Button onClick={() => setIsAddMemberOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>

          <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new member.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <AddNewMemberForm />
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
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

        {/* Main Card */}
        <Card>
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium">Member Directory</h3>
            <p className="text-sm mt-1">
              Search and filter through your gym members
            </p>
          </div>
          <div className="px-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search members by name or email..."
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
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={membershipFilter}
                onValueChange={setMembershipFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Memberships" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Memberships</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border overflow-hidden px-2 mb-6">
              <MembersTable members={filteredMembers} />
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p>No members found matching your criteria.</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
