import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import {
  Download,
} from 'lucide-react';

export const ReportsView = () => {
  const { products, orders, dynamicMetrics, showToast } = useApp();

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Analytics & Financial Reports</h2>
          <p className="text-xs text-slate-500">Deep-dive transaction auditing, profit margin calculations and revenue forecasting</p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Download}
          onClick={handleDownloadFullReport}
        >
          Download Complete Report
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-md border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Gross Revenue (YTD)</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">₹ 48,25,900</p>
          <span className="text-[11px] text-emerald-600 font-semibold">↑ 18.4% YoY</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-md border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Avg Order Value (AOV)</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">₹ 8,422</p>
          <span className="text-[11px] text-emerald-600 font-semibold">↑ 5.2% vs last month</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-md border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Store Conversion Rate</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">3.48%</p>
          <span className="text-[11px] text-slate-500 font-semibold">Industry Benchmark: 2.5%</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-md border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Return & Refund Rate</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">1.2%</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Very Low (Healthy)</span>
        </div>
      </div>

      {/* Top Ranked Products by Sales Revenue */}
      <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Top Revenue Generators</h3>
          <span className="text-xs text-slate-500">Ranked by gross sales</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Unit Price</th>
                <th className="p-3">Est. Units Sold</th>
                <th className="p-3 text-right">Gross Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {products.slice(0, 5).map((prod, index) => {
                const unitsSold = (5 - index) * 45 + 12;
                const totalGross = prod.price * unitsSold;

                return (
                  <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-blue-600">#{index + 1}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <img src={prod.image} alt={prod.name} className="w-7 h-7 rounded-md object-cover border border-slate-200" />
                        <span className="font-semibold text-slate-900">{prod.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-500">{prod.category}</td>
                    <td className="p-3 font-medium">₹{prod.price.toLocaleString('en-IN')}</td>
                    <td className="p-3 font-semibold text-slate-800">{unitsSold} units</td>
                    <td className="p-3 text-right font-bold text-slate-900">
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
  );
};
