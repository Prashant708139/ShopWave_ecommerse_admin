import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ORDERS_STATUS_DATA,
  TOP_CATEGORIES_DATA
} from '../../data/mockData';
import {
  Shirt,
  Smartphone,
  Armchair,
  Tv,
  Sparkles,
  Package,
  ChevronDown
} from 'lucide-react';

export const DashboardCharts = () => {
  const { navigateTo, currentSalesChart, selectedDateRange } = useApp();
  const [chartMode, setChartMode] = useState('revenue'); // 'revenue' or 'orders'
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  const categoryIcons = {
    Shirt: Shirt,
    Smartphone: Smartphone,
    Armchair: Armchair,
    Tv: Tv,
    Sparkles: Sparkles,
    Package: Package,
  };

  const chartData = currentSalesChart || [];

  // Determine dynamic max value for nice bar scaling
  const maxValCalc = chartData.reduce((max, item) => {
    const val = chartMode === 'revenue' ? item.revenue : item.orders;
    return Math.max(max, val);
  }, 100);

  const maxAxisVal = maxValCalc * 1.15;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
      {/* 1. Sales Overview Bar Chart (5 cols on lg) */}
      <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base">Sales Overview</h3>
            <span className="text-[11px] text-slate-400 font-medium">Timeline: {selectedDateRange}</span>
          </div>

          <div className="relative">
            <select
              value={chartMode}
              onChange={(e) => setChartMode(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 rounded-lg pl-3 pr-7 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="revenue">Revenue</option>
              <option value="orders">Orders</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Bar Chart Area */}
        <div className="relative pt-4 pb-1">
          {/* Y Axis Grid Lines */}
          <div className="space-y-4 text-[11px] font-medium text-slate-400">
            {chartMode === 'revenue' ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right">₹ {Math.round(maxAxisVal / 1000)}k</span>
                  <div className="flex-1 border-b border-slate-100 border-dashed" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right">₹ {Math.round((maxAxisVal * 0.75) / 1000)}k</span>
                  <div className="flex-1 border-b border-slate-100 border-dashed" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right">₹ {Math.round((maxAxisVal * 0.5) / 1000)}k</span>
                  <div className="flex-1 border-b border-slate-100 border-dashed" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right">₹ {Math.round((maxAxisVal * 0.25) / 1000)}k</span>
                  <div className="flex-1 border-b border-slate-100 border-dashed" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right">₹ 0</span>
                  <div className="flex-1 border-b border-slate-200" />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right">{Math.round(maxAxisVal)}</span>
                  <div className="flex-1 border-b border-slate-100 border-dashed" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right">{Math.round(maxAxisVal * 0.75)}</span>
                  <div className="flex-1 border-b border-slate-100 border-dashed" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right">{Math.round(maxAxisVal * 0.5)}</span>
                  <div className="flex-1 border-b border-slate-100 border-dashed" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right">{Math.round(maxAxisVal * 0.25)}</span>
                  <div className="flex-1 border-b border-slate-100 border-dashed" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right">0</span>
                  <div className="flex-1 border-b border-slate-200" />
                </div>
              </>
            )}
          </div>

          {/* Render Actual Bars Overlay */}
          <div className="absolute inset-0 left-12 right-2 bottom-6 top-3 flex items-end justify-between px-1">
            {chartData.map((item, index) => {
              const val = chartMode === 'revenue' ? item.revenue : item.orders;
              const heightPercent = Math.min(100, Math.max(8, Math.round((val / maxAxisVal) * 100)));

              return (
                <div
                  key={item.date}
                  className="relative flex flex-col items-center flex-1 group h-full justify-end"
                  onMouseEnter={() => setHoveredBarIndex(index)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                >
                  {/* Tooltip on hover */}
                  {hoveredBarIndex === index && (
                    <div className="absolute -top-10 z-20 bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap animate-in fade-in zoom-in duration-150">
                      {chartMode === 'revenue' ? `₹${item.revenue.toLocaleString('en-IN')}` : `${item.orders} orders`}
                    </div>
                  )}

                  {/* Vertical Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-3 sm:w-4 bg-blue-500 group-hover:bg-blue-600 rounded-t-md transition-all duration-300 shadow-sm"
                  />
                </div>
              );
            })}
          </div>

          {/* X-Axis Labels */}
          <div className="flex justify-between pl-12 pr-1 pt-2 text-[10px] sm:text-[11px] font-medium text-slate-500">
            {chartData.map((item) => (
              <span key={item.date} className="text-center truncate px-0.5">{item.date}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Orders by Status Donut Chart (4 cols on lg) */}
      <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col justify-between">
        <h3 className="font-bold text-slate-800 text-base mb-2">Orders by Status</h3>

        <div className="flex flex-col sm:flex-row lg:flex-row items-center justify-around gap-4 my-auto">
          {/* Custom SVG Donut Chart */}
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Delivered: 62% */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#10b981"
                strokeWidth="14"
                strokeDasharray="238.76"
                strokeDashoffset="0"
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              {/* Processing: 18% */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="14"
                strokeDasharray="238.76"
                strokeDashoffset="148"
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              {/* Shipped: 12% */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#eab308"
                strokeWidth="14"
                strokeDasharray="238.76"
                strokeDashoffset="191"
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              {/* Pending: 5% */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#f97316"
                strokeWidth="14"
                strokeDasharray="238.76"
                strokeDashoffset="220"
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              {/* Cancelled: 3% */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#ef4444"
                strokeWidth="14"
                strokeDasharray="238.76"
                strokeDashoffset="232"
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>

            {/* Inner Center Label */}
            <div className="absolute text-center">
              <span className="block text-lg font-extrabold text-slate-800 leading-none">1,482</span>
              <span className="text-[11px] font-medium text-slate-400">Total Orders</span>
            </div>
          </div>

          {/* Status Breakdown Legend */}
          <div className="space-y-2 text-xs w-full sm:w-auto">
            {ORDERS_STATUS_DATA.map((status) => (
              <div key={status.name} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: status.color }}
                  />
                  <span className="text-slate-600 font-medium">{status.name}</span>
                </div>
                <span className="font-bold text-slate-800">{status.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Top Categories Progress Bars (3 cols on lg) */}
      <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-800 text-base">Top Categories</h3>
          <button
            onClick={() => navigateTo('catalog-categories')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="space-y-3.5 py-1">
          {TOP_CATEGORIES_DATA.map((cat) => {
            const Icon = categoryIcons[cat.icon] || Package;

            return (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-slate-100 text-slate-600">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium text-slate-700 truncate max-w-[140px]">
                      {cat.name}
                    </span>
                  </div>
                  <span className="font-bold text-slate-800">{cat.percentage}%</span>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage * 2.5}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
