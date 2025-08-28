'use client';

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
import { Label } from '@/components/ui/label';

export function BookingForm({
  open,
  onOpenChange,
  selectedClass,
  onSubmit,
  bookingDetails,
  setBookingDetails,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Class</DialogTitle>
          {selectedClass && (
            <DialogDescription className="flex flex-col gap-1">
              <span className="font-medium">{selectedClass.name}</span>
              <span>
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
                setBookingDetails({ ...bookingDetails, email: e.target.value })
              }
              placeholder="Enter your email address"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>Confirm Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
