'use client';

import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  Edit,
  Trash2,
  UserPlus,
  Calendar,
  Dumbbell,
  Users,
} from 'lucide-react';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const muscleGroups = [
  'Chest',
  'Back',
  'Shoulders',
  'Arms',
  'Biceps',
  'Triceps',
  'Legs',
  'Glutes',
  'Core',
  'Cardio',
  'Full Body',
];

// Sample data
const samplePlans = [
  {
    planId: 'WP001',
    memberId: 'M001',
    trainerId: 'T001',
    weekDayWisePlan: {
      Monday: ['Chest', 'Triceps'],
      Tuesday: ['Back', 'Biceps'],
      Wednesday: ['Legs'],
      Thursday: ['Shoulders', 'Core'],
      Friday: ['Arms'],
      Saturday: ['Cardio'],
      Sunday: [],
    },
    notes: 'Beginner level workout plan focusing on compound movements',
    memberName: 'John Smith',
    trainerName: 'Mike Johnson',
    createdAt: '2024-01-15',
  },
  {
    planId: 'WP002',
    trainerId: 'T002',
    weekDayWisePlan: {
      Monday: ['Full Body'],
      Wednesday: ['Full Body'],
      Friday: ['Full Body'],
    },
    notes: '3-day full body routine for intermediate level',
    trainerName: 'Sarah Wilson',
    createdAt: '2024-01-16',
  },
];

const members = [
  { id: 'M001', name: 'John Smith' },
  { id: 'M002', name: 'Jane Doe' },
  { id: 'M003', name: 'Bob Wilson' },
];

const trainers = [
  { id: 'T001', name: 'Mike Johnson' },
  { id: 'T002', name: 'Sarah Wilson' },
  { id: 'T003', name: 'David Brown' },
];

export default function WorkoutPlanPage() {
  const [plans, setPlans] = useState(samplePlans);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);

  const [formData, setFormData] = useState({
    planId: '',
    trainerId: '',
    weekDayWisePlan: {},
    notes: '',
  });

  const handleCreatePlan = () => {
    const newPlan = {
      ...formData,
      planId: `WP${String(plans.length + 1).padStart(3, '0')}`,
      trainerName:
        trainers.find((t) => t.id === formData.trainerId)?.name || '',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPlans([...plans, newPlan]);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleUpdatePlan = () => {
    if (!editingPlan) return;
    const updatedPlans = plans.map((plan) =>
      plan.planId === editingPlan.planId
        ? {
            ...editingPlan,
            trainerName:
              trainers.find((t) => t.id === editingPlan.trainerId)?.name || '',
          }
        : plan
    );
    setPlans(updatedPlans);
    setEditingPlan(null);
  };

  const handleDeletePlan = (planId) => {
    setPlans(plans.filter((plan) => plan.planId !== planId));
  };

  const handleAssignToMember = (planId, memberId) => {
    const updatedPlans = plans.map((plan) =>
      plan.planId === planId
        ? {
            ...plan,
            memberId,
            memberName: members.find((m) => m.id === memberId)?.name || '',
          }
        : plan
    );
    setPlans(updatedPlans);
    setIsAssignDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      planId: '',
      trainerId: '',
      weekDayWisePlan: {},
      notes: '',
    });
  };

  const addMuscleGroupToDay = (day, muscleGroup, isEditing = false) => {
    if (isEditing && editingPlan) {
      const currentGroups = editingPlan.weekDayWisePlan[day] || [];
      if (!currentGroups.includes(muscleGroup)) {
        setEditingPlan({
          ...editingPlan,
          weekDayWisePlan: {
            ...editingPlan.weekDayWisePlan,
            [day]: [...currentGroups, muscleGroup],
          },
        });
      }
    } else {
      const currentGroups = formData.weekDayWisePlan[day] || [];
      if (!currentGroups.includes(muscleGroup)) {
        setFormData({
          ...formData,
          weekDayWisePlan: {
            ...formData.weekDayWisePlan,
            [day]: [...currentGroups, muscleGroup],
          },
        });
      }
    }
  };

  const removeMuscleGroupFromDay = (day, muscleGroup, isEditing = false) => {
    if (isEditing && editingPlan) {
      const currentGroups = editingPlan.weekDayWisePlan[day] || [];
      setEditingPlan({
        ...editingPlan,
        weekDayWisePlan: {
          ...editingPlan.weekDayWisePlan,
          [day]: currentGroups.filter((group) => group !== muscleGroup),
        },
      });
    } else {
      const currentGroups = formData.weekDayWisePlan[day] || [];
      setFormData({
        ...formData,
        weekDayWisePlan: {
          ...formData.weekDayWisePlan,
          [day]: currentGroups.filter((group) => group !== muscleGroup),
        },
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workout Plans</h1>
          <p className="text-muted-foreground">
            Manage and assign workout plans for gym members
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Create Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Workout Plan</DialogTitle>
              <DialogDescription>
                Design a comprehensive workout plan with day-wise muscle group
                targeting
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trainer">Trainer</Label>
                  <Select
                    value={formData.trainerId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, trainerId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainers.map((trainer) => (
                        <SelectItem key={trainer.id} value={trainer.id}>
                          {trainer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Weekly Workout Schedule</Label>
                <div className="grid gap-4">
                  {daysOfWeek.map((day) => (
                    <Card key={day}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{day}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(formData.weekDayWisePlan[day] || []).map(
                            (group) => (
                              <Badge
                                key={group}
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() =>
                                  removeMuscleGroupFromDay(day, group)
                                }
                              >
                                {group} ×
                              </Badge>
                            )
                          )}
                        </div>
                        <Select
                          onValueChange={(value) =>
                            addMuscleGroupToDay(day, value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Add muscle group" />
                          </SelectTrigger>
                          <SelectContent>
                            {muscleGroups.map((group) => (
                              <SelectItem key={group} value={group}>
                                {group}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional notes or instructions..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreatePlan}>Create Plan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all-plans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-plans">All Plans</TabsTrigger>
          <TabsTrigger value="assigned">Assigned Plans</TabsTrigger>
          <TabsTrigger value="unassigned">Unassigned Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="all-plans" className="space-y-4">
          <div className="grid gap-4">
            {plans.map((plan) => (
              <Card key={plan.planId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Dumbbell className="h-5 w-5" />
                        Plan {plan.planId}
                        {plan.memberId && (
                          <Badge variant="outline">Assigned</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        Trainer: {plan.trainerName} | Created: {plan.createdAt}
                        {plan.memberName && ` | Member: ${plan.memberName}`}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {!plan.memberId && (
                        <Dialog
                          open={isAssignDialogOpen}
                          onOpenChange={setIsAssignDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPlan(plan)}
                            >
                              <UserPlus className="h-4 w-4 mr-1" />
                              Assign
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Assign Plan to Member</DialogTitle>
                              <DialogDescription>
                                Select a member to assign this workout plan to
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Select
                                onValueChange={(memberId) =>
                                  selectedPlan &&
                                  handleAssignToMember(
                                    selectedPlan.planId,
                                    memberId
                                  )
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select member" />
                                </SelectTrigger>
                                <SelectContent>
                                  {members.map((member) => (
                                    <SelectItem
                                      key={member.id}
                                      value={member.id}
                                    >
                                      {member.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingPlan({ ...plan })}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Workout Plan</DialogTitle>
                            <DialogDescription>
                              Modify the workout plan details
                            </DialogDescription>
                          </DialogHeader>
                          {editingPlan && (
                            <div className="grid gap-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Plan ID</Label>
                                  <Input value={editingPlan.planId} disabled />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="trainer">Trainer</Label>
                                  <Select
                                    value={editingPlan.trainerId}
                                    onValueChange={(value) =>
                                      setEditingPlan({
                                        ...editingPlan,
                                        trainerId: value,
                                      })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select trainer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {trainers.map((trainer) => (
                                        <SelectItem
                                          key={trainer.id}
                                          value={trainer.id}
                                        >
                                          {trainer.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <Label>Weekly Workout Schedule</Label>
                                <div className="grid gap-4">
                                  {daysOfWeek.map((day) => (
                                    <Card key={day}>
                                      <CardHeader className="pb-3">
                                        <CardTitle className="text-lg">
                                          {day}
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                          {(
                                            editingPlan.weekDayWisePlan[day] ||
                                            []
                                          ).map((group) => (
                                            <Badge
                                              key={group}
                                              variant="secondary"
                                              className="cursor-pointer"
                                              onClick={() =>
                                                removeMuscleGroupFromDay(
                                                  day,
                                                  group,
                                                  true
                                                )
                                              }
                                            >
                                              {group} ×
                                            </Badge>
                                          ))}
                                        </div>
                                        <Select
                                          onValueChange={(value) =>
                                            addMuscleGroupToDay(
                                              day,
                                              value,
                                              true
                                            )
                                          }
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Add muscle group" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {muscleGroups.map((group) => (
                                              <SelectItem
                                                key={group}
                                                value={group}
                                              >
                                                {group}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                  id="notes"
                                  placeholder="Add any additional notes or instructions..."
                                  value={editingPlan.notes}
                                  onChange={(e) =>
                                    setEditingPlan({
                                      ...editingPlan,
                                      notes: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setEditingPlan(null)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleUpdatePlan}>
                              Update Plan
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePlan(plan.planId)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-7 gap-2">
                      {daysOfWeek.map((day) => (
                        <div key={day} className="space-y-2">
                          <h4 className="font-medium text-sm">
                            {day.slice(0, 3)}
                          </h4>
                          <div className="space-y-1">
                            {(plan.weekDayWisePlan[day] || []).map((group) => (
                              <Badge
                                key={group}
                                variant="outline"
                                className="text-xs"
                              >
                                {group}
                              </Badge>
                            ))}
                            {(!plan.weekDayWisePlan[day] ||
                              plan.weekDayWisePlan[day].length === 0) && (
                              <Badge variant="secondary" className="text-xs">
                                Rest
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {plan.notes && (
                      <div className="pt-2 border-t">
                        <p className="text-sm text-muted-foreground">
                          {plan.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assigned" className="space-y-4">
          <div className="grid gap-4">
            {plans
              .filter((plan) => plan.memberId)
              .map((plan) => (
                <Card key={plan.planId}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          Plan {plan.planId} - {plan.memberName}
                        </CardTitle>
                        <CardDescription>
                          Trainer: {plan.trainerName} | Created:{' '}
                          {plan.createdAt}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2">
                      {daysOfWeek.map((day) => (
                        <div key={day} className="space-y-2">
                          <h4 className="font-medium text-sm">
                            {day.slice(0, 3)}
                          </h4>
                          <div className="space-y-1">
                            {(plan.weekDayWisePlan[day] || []).map((group) => (
                              <Badge
                                key={group}
                                variant="outline"
                                className="text-xs"
                              >
                                {group}
                              </Badge>
                            ))}
                            {(!plan.weekDayWisePlan[day] ||
                              plan.weekDayWisePlan[day].length === 0) && (
                              <Badge variant="secondary" className="text-xs">
                                Rest
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="unassigned" className="space-y-4">
          <div className="grid gap-4">
            {plans
              .filter((plan) => !plan.memberId)
              .map((plan) => (
                <Card key={plan.planId}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Plan {plan.planId}
                          <Badge variant="outline">Available</Badge>
                        </CardTitle>
                        <CardDescription>
                          Trainer: {plan.trainerName} | Created:{' '}
                          {plan.createdAt}
                        </CardDescription>
                      </div>
                      <Dialog
                        open={isAssignDialogOpen}
                        onOpenChange={setIsAssignDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button onClick={() => setSelectedPlan(plan)}>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Assign to Member
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign Plan to Member</DialogTitle>
                            <DialogDescription>
                              Select a member to assign this workout plan to
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Select
                              onValueChange={(memberId) =>
                                selectedPlan &&
                                handleAssignToMember(
                                  selectedPlan.planId,
                                  memberId
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select member" />
                              </SelectTrigger>
                              <SelectContent>
                                {members.map((member) => (
                                  <SelectItem key={member.id} value={member.id}>
                                    {member.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2">
                      {daysOfWeek.map((day) => (
                        <div key={day} className="space-y-2">
                          <h4 className="font-medium text-sm">
                            {day.slice(0, 3)}
                          </h4>
                          <div className="space-y-1">
                            {(plan.weekDayWisePlan[day] || []).map((group) => (
                              <Badge
                                key={group}
                                variant="outline"
                                className="text-xs"
                              >
                                {group}
                              </Badge>
                            ))}
                            {(!plan.weekDayWisePlan[day] ||
                              plan.weekDayWisePlan[day].length === 0) && (
                              <Badge variant="secondary" className="text-xs">
                                Rest
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
