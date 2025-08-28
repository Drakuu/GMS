'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  CreditCard,
  DollarSign,
  Download,
  Eye,
  Filter,
  Plus,
  Search,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
} from 'lucide-react';

export default function BillingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const memberInfo = {
    name: 'John Smith',
    memberId: 'GM001234',
    membershipType: 'Premium Annual',
    joinDate: 'Jan 15, 2024',
    avatar: '/gym-member-avatar.png',
  };

  const billingStats = [
    {
      title: 'Current Balance',
      value: '$0.00',
      icon: DollarSign,
      status: 'paid',
    },
    {
      title: 'Outstanding Dues',
      value: '$89.99',
      icon: AlertCircle,
      status: 'overdue',
    },
    {
      title: 'Next Payment',
      value: 'Dec 15, 2024',
      icon: Calendar,
      status: 'upcoming',
    },
    {
      title: 'Total Paid',
      value: '$1,299.88',
      icon: CheckCircle,
      status: 'success',
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/26',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8888',
      expiry: '09/25',
      isDefault: false,
    },
  ];

  const transactions = [
    {
      id: 'INV-001',
      date: 'Nov 15, 2024',
      description: 'Premium Monthly Membership',
      amount: '$89.99',
      status: 'paid',
      method: 'Visa •••• 4242',
    },
    {
      id: 'INV-002',
      date: 'Oct 15, 2024',
      description: 'Premium Monthly Membership',
      amount: '$89.99',
      status: 'paid',
      method: 'Visa •••• 4242',
    },
    {
      id: 'INV-003',
      date: 'Sep 15, 2024',
      description: 'Personal Training Session (5x)',
      amount: '$250.00',
      status: 'paid',
      method: 'Mastercard •••• 8888',
    },
    {
      id: 'INV-004',
      date: 'Sep 15, 2024',
      description: 'Premium Monthly Membership',
      amount: '$89.99',
      status: 'paid',
      method: 'Visa •••• 4242',
    },
  ];

  const upcomingPayments = [
    {
      id: 1,
      description: 'Premium Monthly Membership',
      amount: '$89.99',
      dueDate: 'Dec 15, 2024',
      status: 'upcoming',
    },
    {
      id: 2,
      description: 'Locker Rental',
      amount: '$25.00',
      dueDate: 'Jan 1, 2025',
      status: 'upcoming',
    },
  ];



    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'paid':
          return <Badge variant={'active'}>Active</Badge>;
        case 'overdue':
          return <Badge variant={'pending'}>On Leave</Badge>;
        case 'upcoming':
          return <Badge variant={'inactive'}>Inactive</Badge>;
        default:
          return <Badge variant={'default'}>{status}</Badge>;
      }
    };

  const getStatusIcon = () => {
    switch (status) {
      case 'paid':
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4" />;
      case 'upcoming':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className=" ">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-3xl font-bold ">Billing & Payments</h1>
              <p className=" mt-1">Manage and monitor your gym equipment</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Make Payment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Member Info Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarImage
                    src={memberInfo.avatar || '/placeholder.svg'}
                    alt={memberInfo.name}
                  />
                  <AvatarFallback className="text-primary">
                    {memberInfo.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold ">{memberInfo.name}</h2>
                  <p className="text-sm ">Member ID: {memberInfo.memberId}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-muted text-primary border-primary mb-2">
                  {memberInfo.membershipType}
                </Badge>
                <p className="text-sm ">Member since {memberInfo.joinDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {billingStats.map((stat, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium ">{stat.title}</p>
                    <p className="text-2xl font-bold  mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full `}>
                    <stat.icon
                      className={`h-6 w-6 ${
                        stat.status === 'overdue'
                          ? 'text-red-600'
                          : stat.status === 'success'
                          ? 'text-green-600'
                          : stat.status === 'upcoming'
                          ? 'text-blue-600'
                          : ''
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Transactions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                      View and manage your payment history
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                      <Input
                        placeholder="Search transactions..."
                        className="pl-10 w-64"
                      />
                    </div>
                    {/* <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button> */}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border  rounded-lg "
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2  rounded-full">
                          <CreditCard className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium ">
                            {transaction.description}
                          </p>
                          <p className="text-sm ">
                            {transaction.date} • {transaction.method}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="font-semibold ">{transaction.amount}</p>
                          <Badge className={getStatusColor(transaction.status)}>
                            {getStatusIcon(transaction.status)}
                            <span className="ml-1 capitalize">
                              {transaction.status}
                            </span>
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Payment Methods
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded">
                        <CreditCard className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium ">
                          {method.type} •••• {method.last4}
                        </p>
                        <p className="text-sm ">Expires {method.expiry}</p>
                      </div>
                    </div>
                    {method.isDefault && (
                      <Badge className="bg-primary">Default</Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Payments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Payments</CardTitle>
                <CardDescription>Your scheduled payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingPayments.map((payment) => (
                  <div key={payment.id} className="p-3 border  rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium ">{payment.amount}</p>
                      <Badge className={getStatusColor(payment.status)}>
                        {getStatusIcon(payment.status)}
                        <span className="ml-1 capitalize">
                          {payment.status}
                        </span>
                      </Badge>
                    </div>
                    <p className="text-sm  mb-1">{payment.description}</p>
                    <p className="text-xs ">Due: {payment.dueDate}</p>
                  </div>
                ))}
                <Button className="w-full ">Pay All Outstanding</Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2 text-primary" />
                  Download Receipt
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2 text-primary" />
                  Update Billing Info
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  Schedule Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
