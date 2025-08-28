'use client';

import { Badge } from '@/components/ui/badge';

export const MemberBadge = ({ status }) => {
  switch (status.toLowerCase()) {
    case 'active':
      return <Badge variant="active">{status}</Badge>;
    case 'expired':
      return <Badge variant="pending">{status}</Badge>;
    case 'suspended':
      return <Badge variant="inactive">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};



export const CategoryBadge = ({ membership }) => {
  switch (membership.toLowerCase()) {
    case 'premium':
      return <Badge variant="catagoryC">Premium</Badge>;
    case 'standard':
      return <Badge variant="catagoryB">Standard</Badge>;
    case 'basic':
      return <Badge variant="catagoryD">Basic</Badge>;
    default:
      return <Badge variant="catagoryF">{membership}</Badge>;
  }
};