'use client';

import React from 'react';
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
import { DialogFooter } from '@/components/ui/dialog';
import { useState } from 'react';
export default function AddNewMemberForm() {
  const [memberData, setMemberData] = useState({
    name: '',
    email: '',
    phone: '',
    membership: '',
    notes: '',
  });

  return (
    <div>
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
    </div>
  );
}
