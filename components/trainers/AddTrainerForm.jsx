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
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';

export const AddTrainerForm = ({ open, onOpenChange, onSubmit }) => {
  const [trainerData, setTrainerData] = useState({
    name: '',
    specialization: '',
    experience: '',
    status: '',
    email: '',
    phone: '',
    bio: '',
    certifications: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTrainerData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setTrainerData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = () => {
    onSubmit(trainerData);
    setTrainerData({
      name: '',
      specialization: '',
      experience: '',
      status: '',
      email: '',
      phone: '',
      bio: '',
      certifications: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Add New Trainer</DialogTitle>
          <DialogDescription>
            Fill in the details for the new trainer
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">Trainer image</label>
          <label htmlFor="classImageUpload" className="cursor-pointer">
            <div className="relative w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
              {trainerData.image ? (
                <img
                  src={trainerData.image}
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

        <div className="grid gap-4 py-4">{/* Form fields */}</div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Add Trainer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
