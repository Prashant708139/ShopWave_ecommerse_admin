import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar } from 'lucide-react';
import { Select } from '../ui/Select';
import { MetricCards } from './MetricCards';
import { DashboardCharts } from './DashboardCharts';
import { ProductSection } from './ProductSection';

export const Dashboard = () => {
  const { currentUser, selectedDateRange, setSelectedDateRange } = useApp();

  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Vineet';

  const dateRangeOptions = [
    { value: 'Today', label: 'Today' },
    { value: 'Last 7 days', label: 'Last 7 days' },
    { value: 'Last 30 days', label: 'Last 30 days' },
    { value: 'This Quarter', label: 'This Quarter' },
    { value: 'Year to Date', label: 'Year to Date' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Welcome back, {firstName}! Here's what's happening with your store today.
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="self-start sm:self-auto">
          <Select
            icon={Calendar}
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            options={dateRangeOptions}
            size="md"
            align="right"
          />
        </div>
      </div>

      <MetricCards />
      <DashboardCharts />
      <ProductSection />
    </div>
  );
};
