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
  const { dynamicMetrics, navigateTo } = useApp();

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
      accentColor: 'bg-blue-600',
      trendColor: '#2563eb',
      sparkline: 'M0 25 Q15 22, 30 18 T60 20 T90 12 T120 5',
      tab: 'orders'
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: dynamicMetrics.totalOrders.toLocaleString('en-IN'),
      growth: `+${dynamicMetrics.ordersGrowth}%`,
      isPositive: true,
      icon: ShoppingBag,
      iconBg: 'bg-emerald-50 text-emerald-600',
      iconBorder: 'border-emerald-200',
      accentColor: 'bg-emerald-500',
      trendColor: '#10b981',
      sparkline: 'M0 24 Q20 20, 40 22 T80 14 T120 4',
      tab: 'orders'
    },
    {
      id: 'customers',
      title: 'Total Customers',
      value: dynamicMetrics.totalCustomers.toLocaleString('en-IN'),
      growth: `+${dynamicMetrics.customersGrowth}%`,
      isPositive: true,
      icon: Users,
      iconBg: 'bg-indigo-50 text-indigo-600',
      iconBorder: 'border-indigo-200',
      accentColor: 'bg-indigo-500',
      trendColor: '#6366f1',
      sparkline: 'M0 26 Q25 24, 50 18 T90 10 T120 3',
      tab: 'customers'
    },
    {
      id: 'products',
      title: 'Total Products',
      value: dynamicMetrics.totalProducts.toLocaleString('en-IN'),
      growth: `+${dynamicMetrics.productsGrowth}%`,
      isPositive: true,
      icon: Package,
      iconBg: 'bg-amber-50 text-amber-600',
      iconBorder: 'border-amber-200',
      accentColor: 'bg-amber-500',
      trendColor: '#f59e0b',
      sparkline: 'M0 22 Q30 20, 60 16 T90 12 T120 6',
      tab: 'catalog-products'
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
      accentColor: 'bg-rose-500',
      trendColor: '#f43f5e',
      sparkline: 'M0 5 Q25 8, 50 14 T80 20 T120 26',
      tab: 'orders-pending'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            onClick={() => navigateTo(card.tab)}
            className="bg-white rounded-xl pt-4 pb-3.5 px-4 border border-slate-200 shadow-xs relative overflow-hidden flex flex-col justify-between cursor-pointer hover:border-blue-400 hover:shadow-md transition-all group"
          >
            {/* Top Accent Color Line */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${card.accentColor}`} />

            {/* Upper Header Row: Icon & Growth Badge */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className={`p-2 rounded-lg ${card.iconBg} border ${card.iconBorder} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>

              <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                card.isPositive ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : 'text-rose-700 bg-rose-50 border border-rose-200'
              }`}>
                {card.isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{card.growth}</span>
              </div>
            </div>

            {/* Main Value & Title Content */}
            <div className="space-y-0.5">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-blue-600 transition-colors">
                {card.title}
              </p>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {card.value}
                </h3>
              </div>
            </div>

            {/* Sparkline trend wave */}
            <div className="mt-2.5 h-5 w-full">
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
