import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import {
  Download,
  BarChart3,
  FileSpreadsheet,
  TrendingUp,
  Globe,
  PieChart,
  Users,
  Eye,
  CheckCircle2,
  ArrowLeft,
  IndianRupee,
  ShoppingBag,
  Zap,
  RefreshCw
} from 'lucide-react';

export const ReportsView = ({ initialTab = 'sales' }) => {
  const { products, orders, dynamicMetrics, showToast, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState(initialTab === 'analytics' ? 'analytics' : 'sales');

  const handleDownloadFullReport = () => {
    const data = JSON.stringify({ metrics: dynamicMetrics, orders, products }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ShopWave_Full_Report_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Comprehensive report exported successfully!');
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-16">
      {/* Top Header & Sub-Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigateTo('dashboard')}
          >
            Back to Dashboard
          </Button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Analytics & Financial Intelligence</h2>
            <p className="text-xs text-slate-500">Deep-dive transaction auditing, profit margin calculations and storefront traffic analytics</p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-md">
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'sales' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 inline mr-1.5" /> Sales Reports
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'analytics' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 inline mr-1.5" /> Store Analytics
          </button>
        </div>
      </div>

      {activeTab === 'sales' ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Financial Statement & Sales Performance</h3>
              <p className="text-xs text-slate-500">Gross revenue breakdown, order frequency and return auditing</p>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={Download}
              onClick={handleDownloadFullReport}
            >
              Export JSON Report
            </Button>
          </div>

          {/* Top KPI Cards with Signature Top Accent Line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-white rounded-xl pt-4 pb-3.5 px-4 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600" />
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Gross Revenue (YTD)
                </span>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
                  <IndianRupee className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900 tracking-tight">
                    ₹ 48,25,900
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ↑ 18.4% YoY
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Year-to-Date Store Net Sales
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl pt-4 pb-3.5 px-4 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Avg Order Value (AOV)
                </span>
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900 tracking-tight">
                    ₹ 8,422
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ↑ 5.2% MoM
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Average Order Transaction Value
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl pt-4 pb-3.5 px-4 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500" />
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Store Conversion Rate
                </span>
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900 tracking-tight">
                    3.48%
                  </span>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                    Benchmark: 2.5%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Session to Paid Checkout Ratio
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl pt-4 pb-3.5 px-4 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Return & Refund Rate
                </span>
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg border border-amber-100">
                  <RefreshCw className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900 tracking-tight">
                    1.2%
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Healthy (Low)
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  RTO & Cancelled Orders Audit
                </p>
              </div>
            </div>
          </div>

          {/* Top Ranked Products by Sales Revenue */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Top Revenue Generators</h3>
              <span className="text-xs text-slate-500 font-semibold">Ranked by gross sales</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Rank</th>
                    <th className="p-3.5">Product Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Unit Price</th>
                    <th className="p-3.5">Est. Units Sold</th>
                    <th className="p-3.5 text-right">Gross Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {products.slice(0, 5).map((prod, index) => {
                    const unitsSold = (5 - index) * 45 + 12;
                    const totalGross = prod.price * unitsSold;

                    return (
                      <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 font-bold text-blue-600">#{index + 1}</td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            <img src={prod.image} alt={prod.name} className="w-8 h-8 rounded-lg object-cover border border-slate-200" />
                            <span className="font-bold text-slate-900 text-xs">{prod.name}</span>
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-500 font-medium">{prod.category}</td>
                        <td className="p-3.5 font-semibold text-slate-900">₹{prod.price.toLocaleString('en-IN')}</td>
                        <td className="p-3.5 font-semibold text-slate-800">{unitsSold} units</td>
                        <td className="p-3.5 text-right font-black text-slate-900">
                          ₹{totalGross.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* STORE ANALYTICS SUB-PAGE */
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Store Traffic & Customer Acquisition Metrics</h3>
              <p className="text-xs text-slate-500">Real-time visitor counts, referrer traffic channels, and mobile device breakdown</p>
            </div>
            <Button variant="secondary" size="md" icon={Download} onClick={handleDownloadFullReport}>
              Download Analytics Audit
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Analytics Card 1 */}
            <div className="bg-white rounded-xl pt-4 pb-3.5 px-4 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600" />
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Total Unique Visitors
                </span>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
                  <Globe className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900 tracking-tight">
                    248,910
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    +14.2% Growth
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Verified Unique Store IP Traffic
                </p>
              </div>
            </div>

            {/* Analytics Card 2 */}
            <div className="bg-white rounded-xl pt-4 pb-3.5 px-4 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Pageviews & Impressions
                </span>
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900 tracking-tight">
                    1,420,800
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    5.7 Pages / Session
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Total Storefront Page Impressions
                </p>
              </div>
            </div>

            {/* Analytics Card 3 */}
            <div className="bg-white rounded-xl pt-4 pb-3.5 px-4 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500" />
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Mobile vs Desktop
                </span>
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100">
                  <PieChart className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900 tracking-tight">
                    72% Mobile
                  </span>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                    28% Desktop
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Audience Device Type Distribution
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
