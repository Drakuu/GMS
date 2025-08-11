'use client';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Mail, Phone, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MemberBadge } from './MemberBadge';
import { CategoryBadge } from './MemberBadge';

export const MembersTable = ({ members }) => {
  return (
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
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              <div className="flex items-center">
                <div className="">
                  <div className="text-sm font-medium">{member.name}</div>
                  <div className="text-sm">ID: #{member.id}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-3 h-3 text-primary" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-3 h-3 text-primary" />
                  <span>{member.phone}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <CategoryBadge membership={member.membershipType} />
            </TableCell>
            <TableCell>
              <MemberBadge status={member.status} />
            </TableCell>
            <TableCell className="text-sm">
              {new Date(member.joinDate).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-sm">
              {new Date(member.lastVisit).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end">
                <Button variant="ghost" size="icon">
                  <Edit className="w-4 h-4 text-primary" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4 text-primary" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
