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
import {
  Plus,
  Search,
  Mail,
  Phone,
  Eye,
  Edit,
  Trash2,
  Users,
  TrendingUp,
  Calendar,
  Clock,
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
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [membershipFilter, setMembershipFilter] = useState('all');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

    const [memberData, setMemberData] = useState({
      name: '',
      email: '',
      phone: '',
      membership: '',
      notes: '',
    });

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

  const getBadge = (value, type) => {
    const colors = {
      active: 'green',
      expired: 'red',
      suspended: 'yellow',
      premium: 'purple',
      standard: 'blue',
      basic: 'gray',
    };
    const color = colors[value.toLowerCase()] || 'gray';
    return (
      <Badge
        className={`bg-${color}-100 text-${color}-800 hover:bg-${color}-200`}
      >
        {value}
      </Badge>
    );
  };

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
      console.log('Member Data:', memberData);
      // Here you would typically add your API call or form submission logic

      // Reset form and close dialog
      setMemberData({
        name: '',
        email: '',
        phone: '',
        membership: '',
        notes: '',
      });
      setIsAddMemberOpen(false);
    };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Members</h1>
            <p className="text-gray-600 mt-1">
              Manage your gym members and memberships
            </p>
          </div>
          <Button variant="creative" onClick={() => setIsAddMemberOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>

          {/* Add Member Dialog */}
          <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new member.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={memberData.name}
                      onChange={(e) =>
                        setMemberData({ ...memberData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={memberData.email}
                      onChange={(e) =>
                        setMemberData({ ...memberData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={memberData.phone}
                      onChange={(e) =>
                        setMemberData({ ...memberData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="membership" className="text-sm font-medium">
                      Membership
                    </label>
                    <Select
                      value={memberData.membership}
                      onValueChange={(value) =>
                        setMemberData({ ...memberData, membership: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select membership type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="notes" className="text-sm font-medium">
                      Notes
                    </label>
                    <Textarea
                      id="notes"
                      placeholder="Additional notes..."
                      value={memberData.notes}
                      onChange={(e) =>
                        setMemberData({ ...memberData, notes: e.target.value })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddMemberOpen(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Member</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-l-4 border-l-red-500">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <CardHeader className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </CardHeader>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card>
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">
              Member Directory
            </h3>
            <p className="text-sm text-gray-500 mt-1">
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

            {/* Members Table */}
            <div className="rounded-md border overflow-hidden px-2 mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Membership</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="">
                            <div className="text-sm font-medium text-gray-900">
                              {member.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: #{member.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">
                              {member.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">
                              {member.phone}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getBadge(member.membershipType)}</TableCell>
                      <TableCell>{getBadge(member.status)}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(member.joinDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(member.lastVisit).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No members found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
