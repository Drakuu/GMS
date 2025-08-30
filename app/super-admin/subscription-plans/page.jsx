// app/super-admin/subscription-plans/page.jsx
'use client';

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchSubscriptionPlans, setFilters, resetFilters } from '@/store/slices/subscriptionPlanSlice';
import {
  selectSubscriptionPlans,
  selectPlanLoading,
  selectPlanPagination,
  selectPlanFilters,
} from '@/store/selectors/subscriptionPlanSelectors';
import SubscriptionHeader from './components/SubscriptionHeader';
import SubscriptionFilters from './components/SubscriptionFilters';
import SubscriptionList from './components/SubscriptionList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Loading from '@/app/loading';

export default function SubscriptionPlansPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const plans = useSelector(selectSubscriptionPlans);
  const loading = useSelector(selectPlanLoading);
  const pagination = useSelector(selectPlanPagination);
  const { page, limit, q, status } = useSelector(selectPlanFilters);

  const last = useRef(null);
  useEffect(() => {
    const next = { page, limit, q, status };
    const prev = last.current;
    const same =
      prev &&
      prev.page === page &&
      prev.limit === limit &&
      prev.q === q &&
      prev.status === status;

    if (!same) {
      last.current = next;
      dispatch(fetchSubscriptionPlans(next));
    }
  }, [dispatch, page, limit, q, status]);

  const handleSearch = (term) => {
    if (term === q) return;                    // ✅ avoid no-op churn
    dispatch(setFilters({ q: term, page: 1 }));
  };

  const handleFilterChange = (next) => {
    const payload = {
      ...next,
      page: 1,
      // normalize types in case UI sends strings
      limit: next.limit != null ? Number(next.limit) : undefined,
    };
    dispatch(setFilters(payload));
  };

  const handlePageChange = (p) => {
    const n = Number(p);
    if (n === page) return;                    // ✅ avoid no-op churn
    dispatch(setFilters({ page: n }));
  };

  const handleCreateNew = () => router.push('/subscription-plans/create');
  const handleViewDetails = (id) => router.push(`/subscription-plans/${id}`);

  const hasPlans = Array.isArray(plans) && plans.length > 0;
  if (loading && !hasPlans) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <SubscriptionHeader
        title="Subscription Plans"
        description="Manage your subscription plans and pricing tiers"
      />

      <div className="flex justify-between items-center mb-6">
        <SubscriptionFilters
          searchTerm={q}
          onSearch={handleSearch}
          filters={{ page, limit, q, status }}
          onFilterChange={handleFilterChange}
          onResetFilters={() => dispatch(resetFilters())}
        />
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} /> Create New Plan
        </Button>
      </div>

      <SubscriptionList
        plans={plans ?? []}
        loading={loading}
        onViewDetails={handleViewDetails}
        pagination={pagination ?? { page: 1, pages: 1 }}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
