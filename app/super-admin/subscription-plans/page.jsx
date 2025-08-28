// app/super-admin/subscription-plans/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  fetchSubscriptionPlans,
  setFilters,
  resetFilters
} from '@/store/slices/subscriptionPlanSlice';
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

const SubscriptionPlansPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const plans = useSelector(selectSubscriptionPlans);
  const loading = useSelector(selectPlanLoading);
  const pagination = useSelector(selectPlanPagination);
  const filters = useSelector(selectPlanFilters);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchSubscriptionPlans(filters));
  }, [dispatch, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    dispatch(setFilters({ q: term, page: 1 }));
  };

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters({ ...newFilters, page: 1 }));
  };

  const handlePageChange = (page) => {
    dispatch(setFilters({ page }));
  };

  const handleCreateNew = () => {
    router.push('/subscription-plans/create');
  };

  const handleViewDetails = (id) => {
    router.push(`/subscription-plans/${id}`);
  };

  if (loading && plans.length === 0) {
    return <div className="flex justify-center items-center min-h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SubscriptionHeader
        title="Subscription Plans"
        description="Manage your subscription plans and pricing tiers"
      />

      <div className="flex justify-between items-center mb-6">
        <SubscriptionFilters
          searchTerm={searchTerm}
          onSearch={handleSearch}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={() => dispatch(resetFilters())}
        />

        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} />
          Create New Plan
        </Button>
      </div>

      <SubscriptionList
        plans={plans}
        loading={loading}
        onViewDetails={handleViewDetails}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SubscriptionPlansPage;