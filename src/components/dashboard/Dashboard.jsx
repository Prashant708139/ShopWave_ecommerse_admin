import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, ChevronDown } from 'lucide-react';
import { MetricCards } from './MetricCards';
import { DashboardCharts } from './DashboardCharts';
import { ProductSection } from './ProductSection';

export const Dashboard = () => {
  const { currentUser, selectedDateRange, setSelectedDateRange } = useApp();

  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Vineet';

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome Title matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Welcome back, {firstName}! Here's what's happening with your store today.
          </p>
        </div>

        {/* Date Range Selector matching screenshot ("Last 7 days") */}
        <div className="relative self-start sm:self-auto">
          <div className="flex items-center gap-2 bg-white border border-slate-200/90 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer pr-4 appearance-none"
            >
              <option value="Today">Today</option>
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 30 days">Last 30 days</option>
              <option value="This Quarter">This Quarter</option>
              <option value="Year to Date">Year to Date</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none -ml-3" />
          </div>
        </div>
      </div>

      {/* 5 Summary Metric Cards (Recalculates dynamically with dateRange and state changes) */}
      <MetricCards />

      {/* Middle Row Charts (Updates bar chart values with selectedDateRange) */}
      <DashboardCharts />

      {/* Bottom Products Table, Category Tree, Best Seller Card & Quick Actions with 1-540 page navigation */}
      <ProductSection />
    </div>
  );
};
