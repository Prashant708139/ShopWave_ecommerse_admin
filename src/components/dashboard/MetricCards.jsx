import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  IndianRupee,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export const MetricCards = () => {
  const { dynamicMetrics } = useApp();

  const cards = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: `₹ ${dynamicMetrics.totalRevenue.toLocaleString('en-IN')}`,
      growth: `+${dynamicMetrics.revenueGrowth}%`,
      isPositive: true,
      icon: IndianRupee,
      iconBg: 'bg-blue-50 text-blue-600',
      iconBorder: 'border-blue-200',
      trendColor: '#2563eb',
      sparkline: 'M0 25 Q15 22, 30 18 T60 20 T90 12 T120 5'
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: dynamicMetrics.totalOrders.toLocaleString('en-IN'),
      growth: `+${dynamicMetrics.ordersGrowth}%`,
      isPositive: true,
      icon: ShoppingBag,
      iconBg: 'bg-blue-50 text-blue-600',
      iconBorder: 'border-blue-200',
      trendColor: '#2563eb',
      sparkline: 'M0 24 Q20 20, 40 22 T80 14 T120 4'
    },
    {
      id: 'customers',
      title: 'Total Customers',
      value: dynamicMetrics.totalCustomers.toLocaleString('en-IN'),
      growth: `+${dynamicMetrics.customersGrowth}%`,
      isPositive: true,
      icon: Users,
      iconBg: 'bg-blue-50 text-blue-600',
      iconBorder: 'border-blue-200',
      trendColor: '#2563eb',
      sparkline: 'M0 26 Q25 24, 50 18 T90 10 T120 3'
    },
    {
      id: 'products',
      title: 'Total Products',
      value: dynamicMetrics.totalProducts.toLocaleString('en-IN'),
      growth: `+${dynamicMetrics.productsGrowth}%`,
      isPositive: true,
      icon: Package,
      iconBg: 'bg-blue-50 text-blue-600',
      iconBorder: 'border-blue-200',
      trendColor: '#2563eb',
      sparkline: 'M0 22 Q30 20, 60 16 T90 12 T120 6'
    },
    {
      id: 'pending',
      title: 'Pending Orders',
      value: dynamicMetrics.pendingOrders.toString(),
      growth: `${dynamicMetrics.pendingGrowth}%`,
      isPositive: false,
      icon: ShoppingBag,
      iconBg: 'bg-rose-50 text-rose-600',
      iconBorder: 'border-rose-200',
      trendColor: '#e11d48',
      sparkline: 'M0 5 Q25 8, 50 14 T80 20 T120 26'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className="bg-white rounded-md p-4 border border-slate-200 shadow-xs relative overflow-hidden flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className={`p-2 rounded-md ${card.iconBg} border ${card.iconBorder} flex items-center justify-center`}>
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>

              <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
                card.isPositive ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : 'text-rose-700 bg-rose-50 border border-rose-200'
              }`}>
                {card.isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                <span>{card.growth}</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">{card.title}</p>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {card.value}
                </h3>
              </div>
            </div>

            {/* Sparkline trend wave */}
            <div className="mt-2 h-6 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 120 30" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`grad-${card.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={card.trendColor} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={card.trendColor} stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d={`${card.sparkline} L120 30 L0 30 Z`}
                  fill={`url(#grad-${card.id})`}
                />
                <path
                  d={card.sparkline}
                  fill="none"
                  stroke={card.trendColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
};
