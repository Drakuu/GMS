'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

export function AddClassForm({ open, onOpenChange, onSubmit }) {
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

  const handleSubmit = () => {
    onSubmit(newClass);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
          <DialogDescription>
            Fill in the details for the new fitness class
          </DialogDescription>
        </DialogHeader>

        {/* Image Upload Section */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">Class image</label>
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
                  <Upload className="w-4 h-4 mx-auto" />
                  <span className="text-xs mt-2">Upload</span>
                </div>
              )}
            </div>
          </label>
          <input
            id="classImageUpload"
            type="file"
            accept="image/*"
            className="hidden"
          />
          <p className="text-xs mt-2">Recommended size: 500x500 pixels</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Class Name</Label>
            <Input
              value={newClass.name}
              onChange={(e) =>
                setNewClass({ ...newClass, name: e.target.value })
              }
              placeholder="Enter class name"
            />
          </div>

          <div className="space-y-2">
            <Label>Instructor Name</Label>
            <Input
              value={newClass.instructor}
              onChange={(e) =>
                setNewClass({ ...newClass, instructor: e.target.value })
              }
              placeholder="Enter instructor name"
            />
          </div>

          <div className="space-y-2">
            <Label>Time</Label>
            <Input
              value={newClass.time}
              onChange={(e) =>
                setNewClass({ ...newClass, time: e.target.value })
              }
              placeholder="Enter class time"
            />
          </div>

          <div className="space-y-2">
            <Label>Duration</Label>
            <Input
              value={newClass.duration}
              onChange={(e) =>
                setNewClass({ ...newClass, duration: e.target.value })
              }
              placeholder="Enter duration (e.g., 60 mins)"
            />
          </div>

          <div className="space-y-2">
            <Label>Difficulty</Label>
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
            <Label>Capacity</Label>
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
            <Label>Category</Label>
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
            <Label>Location</Label>
            <Input
              value={newClass.location}
              onChange={(e) =>
                setNewClass({ ...newClass, location: e.target.value })
              }
              placeholder="Enter class location"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label>Description</Label>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Class</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
