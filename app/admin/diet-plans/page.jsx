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
  Utensils,
  Users,
} from 'lucide-react';

const mealTypes = [
  'Breakfast',
  'Morning Snack',
  'Lunch',
  'Afternoon Snack',
  'Dinner',
  'Evening Snack',
];
const commonFoods = [
  'Oats',
  'Eggs',
  'Chicken Breast',
  'Salmon',
  'Brown Rice',
  'Quinoa',
  'Sweet Potato',
  'Broccoli',
  'Spinach',
  'Avocado',
  'Greek Yogurt',
  'Almonds',
  'Protein Shake',
  'Whole Wheat Bread',
  'Turkey',
  'Tuna',
  'Cottage Cheese',
  'Berries',
  'Banana',
  'Peanut Butter',
];

// Sample data
const samplePlans = [
  {
    planId: 'DP001',
    memberId: 'M001',
    trainerId: 'T001',
    dailyMealPlan: {
      Breakfast: 'Oats with berries and almonds',
      'Morning Snack': 'Greek yogurt with banana',
      Lunch: 'Grilled chicken with brown rice and broccoli',
      'Afternoon Snack': 'Protein shake',
      Dinner: 'Salmon with quinoa and spinach',
    },
    calories: 2200,
    macros: { carbs: 40, protein: 35, fat: 25 },
    notes: 'High protein diet for muscle gain',
    memberName: 'John Smith',
    trainerName: 'Mike Johnson',
    createdAt: '2024-01-15',
  },
  {
    planId: 'DP002',
    trainerId: 'T002',
    dailyMealPlan: {
      Breakfast: 'Scrambled eggs with whole wheat toast',
      Lunch: 'Turkey wrap with sweet potato fries',
      Dinner: 'Grilled fish with roasted vegetables',
    },
    calories: 1800,
    macros: { carbs: 35, protein: 30, fat: 35 },
    notes: 'Balanced diet for weight maintenance',
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

export default function DietPlanPage() {
  const [plans, setPlans] = useState(samplePlans);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);

  const [formData, setFormData] = useState({
    planId: '',
    trainerId: '',
    dailyMealPlan: {},
    calories: '',
    macros: { carbs: 40, protein: 30, fat: 30 },
    notes: '',
  });

  const handleCreatePlan = () => {
    const newPlan = {
      ...formData,
      planId: `DP${String(plans.length + 1).padStart(3, '0')}`,
      trainerName:
        trainers.find((t) => t.id === formData.trainerId)?.name || '',
      createdAt: new Date().toISOString().split('T')[0],
      calories: Number(formData.calories),
      macros: {
        carbs: Number(formData.macros.carbs),
        protein: Number(formData.macros.protein),
        fat: Number(formData.macros.fat),
      },
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
            calories: Number(editingPlan.calories),
            macros: {
              carbs: Number(editingPlan.macros.carbs),
              protein: Number(editingPlan.macros.protein),
              fat: Number(editingPlan.macros.fat),
            },
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
      dailyMealPlan: {},
      calories: '',
      macros: { carbs: 40, protein: 30, fat: 30 },
      notes: '',
    });
  };

  const updateMealPlan = (mealType, value, isEditing = false) => {
    if (isEditing && editingPlan) {
      setEditingPlan({
        ...editingPlan,
        dailyMealPlan: {
          ...editingPlan.dailyMealPlan,
          [mealType]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        dailyMealPlan: {
          ...formData.dailyMealPlan,
          [mealType]: value,
        },
      });
    }
  };

  const removeMeal = (mealType, isEditing = false) => {
    if (isEditing && editingPlan) {
      const newMealPlan = { ...editingPlan.dailyMealPlan };
      delete newMealPlan[mealType];
      setEditingPlan({
        ...editingPlan,
        dailyMealPlan: newMealPlan,
      });
    } else {
      const newMealPlan = { ...formData.dailyMealPlan };
      delete newMealPlan[mealType];
      setFormData({
        ...formData,
        dailyMealPlan: newMealPlan,
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Diet Plans</h1>
          <p className="text-muted-foreground">
            Manage and assign nutrition plans for gym members
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
              <DialogTitle>Create New Diet Plan</DialogTitle>
              <DialogDescription>
                Design a comprehensive nutrition plan with meal-by-meal
                breakdown
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
                <Label>Daily Meal Plan</Label>
                <div className="grid gap-4">
                  {mealTypes.map((mealType) => (
                    <Card key={mealType}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{mealType}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {formData.dailyMealPlan[mealType] ? (
                          <div className="flex items-center gap-2">
                            <p className="flex-1">
                              {formData.dailyMealPlan[mealType]}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMeal(mealType)}
                              className="text-destructive"
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Select
                              onValueChange={(value) =>
                                updateMealPlan(mealType, value)
                              }
                            >
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Select food item" />
                              </SelectTrigger>
                              <SelectContent>
                                {commonFoods.map((food) => (
                                  <SelectItem key={food} value={food}>
                                    {food}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Input
                              placeholder="Or enter custom"
                              onBlur={(e) =>
                                e.target.value &&
                                updateMealPlan(mealType, e.target.value)
                              }
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calories">Daily Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    placeholder="e.g. 2000"
                    value={formData.calories}
                    onChange={(e) =>
                      setFormData({ ...formData, calories: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carbs">Carbs (%)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    placeholder="40"
                    value={formData.macros.carbs}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        macros: { ...formData.macros, carbs: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protein">Protein (%)</Label>
                  <Input
                    id="protein"
                    type="number"
                    placeholder="30"
                    value={formData.macros.protein}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        macros: { ...formData.macros, protein: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fat">Fat (%)</Label>
                  <Input
                    id="fat"
                    type="number"
                    placeholder="30"
                    value={formData.macros.fat}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        macros: { ...formData.macros, fat: e.target.value },
                      })
                    }
                  />
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
                        <Utensils className="h-5 w-5" />
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
                                Select a member to assign this diet plan to
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
                            <DialogTitle>Edit Diet Plan</DialogTitle>
                            <DialogDescription>
                              Modify the diet plan details
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
                                <Label>Daily Meal Plan</Label>
                                <div className="grid gap-4">
                                  {mealTypes.map((mealType) => (
                                    <Card key={mealType}>
                                      <CardHeader className="pb-3">
                                        <CardTitle className="text-lg">
                                          {mealType}
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        {editingPlan.dailyMealPlan[mealType] ? (
                                          <div className="flex items-center gap-2">
                                            <p className="flex-1">
                                              {
                                                editingPlan.dailyMealPlan[
                                                  mealType
                                                ]
                                              }
                                            </p>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() =>
                                                removeMeal(mealType, true)
                                              }
                                              className="text-destructive"
                                            >
                                              Remove
                                            </Button>
                                          </div>
                                        ) : (
                                          <div className="flex gap-2">
                                            <Select
                                              onValueChange={(value) =>
                                                updateMealPlan(
                                                  mealType,
                                                  value,
                                                  true
                                                )
                                              }
                                            >
                                              <SelectTrigger className="flex-1">
                                                <SelectValue placeholder="Select food item" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                {commonFoods.map((food) => (
                                                  <SelectItem
                                                    key={food}
                                                    value={food}
                                                  >
                                                    {food}
                                                  </SelectItem>
                                                ))}
                                              </SelectContent>
                                            </Select>
                                            <Input
                                              placeholder="Or enter custom"
                                              onBlur={(e) =>
                                                e.target.value &&
                                                updateMealPlan(
                                                  mealType,
                                                  e.target.value,
                                                  true
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="calories">
                                    Daily Calories
                                  </Label>
                                  <Input
                                    id="calories"
                                    type="number"
                                    placeholder="e.g. 2000"
                                    value={editingPlan.calories}
                                    onChange={(e) =>
                                      setEditingPlan({
                                        ...editingPlan,
                                        calories: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="carbs">Carbs (%)</Label>
                                  <Input
                                    id="carbs"
                                    type="number"
                                    placeholder="40"
                                    value={editingPlan.macros.carbs}
                                    onChange={(e) =>
                                      setEditingPlan({
                                        ...editingPlan,
                                        macros: {
                                          ...editingPlan.macros,
                                          carbs: e.target.value,
                                        },
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="protein">Protein (%)</Label>
                                  <Input
                                    id="protein"
                                    type="number"
                                    placeholder="30"
                                    value={editingPlan.macros.protein}
                                    onChange={(e) =>
                                      setEditingPlan({
                                        ...editingPlan,
                                        macros: {
                                          ...editingPlan.macros,
                                          protein: e.target.value,
                                        },
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="fat">Fat (%)</Label>
                                  <Input
                                    id="fat"
                                    type="number"
                                    placeholder="30"
                                    value={editingPlan.macros.fat}
                                    onChange={(e) =>
                                      setEditingPlan({
                                        ...editingPlan,
                                        macros: {
                                          ...editingPlan.macros,
                                          fat: e.target.value,
                                        },
                                      })
                                    }
                                  />
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">
                          Nutritional Targets
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Calories
                            </p>
                            <p className="font-medium">{plan.calories} kcal</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Macros
                            </p>
                            <p className="font-medium">
                              {plan.macros.carbs}C / {plan.macros.protein}P /{' '}
                              {plan.macros.fat}F
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Meal Plan</h4>
                        <div className="space-y-2">
                          {Object.entries(plan.dailyMealPlan).map(
                            ([mealType, food]) => (
                              <div key={mealType} className="flex">
                                <p className="text-sm text-muted-foreground w-32">
                                  {mealType}
                                </p>
                                <p className="text-sm flex-1">{food}</p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">
                          Nutritional Targets
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Calories
                            </p>
                            <p className="font-medium">{plan.calories} kcal</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Macros
                            </p>
                            <p className="font-medium">
                              {plan.macros.carbs}C / {plan.macros.protein}P /{' '}
                              {plan.macros.fat}F
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Meal Plan</h4>
                        <div className="space-y-2">
                          {Object.entries(plan.dailyMealPlan).map(
                            ([mealType, food]) => (
                              <div key={mealType} className="flex">
                                <p className="text-sm text-muted-foreground w-32">
                                  {mealType}
                                </p>
                                <p className="text-sm flex-1">{food}</p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
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
                              Select a member to assign this diet plan to
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">
                          Nutritional Targets
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Calories
                            </p>
                            <p className="font-medium">{plan.calories} kcal</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Macros
                            </p>
                            <p className="font-medium">
                              {plan.macros.carbs}C / {plan.macros.protein}P /{' '}
                              {plan.macros.fat}F
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Meal Plan</h4>
                        <div className="space-y-2">
                          {Object.entries(plan.dailyMealPlan).map(
                            ([mealType, food]) => (
                              <div key={mealType} className="flex">
                                <p className="text-sm text-muted-foreground w-32">
                                  {mealType}
                                </p>
                                <p className="text-sm flex-1">{food}</p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
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
