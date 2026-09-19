import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import {
  Plus,
  Send,
  TrendingUp,
  Users
} from 'lucide-react';

export const MarketingView = () => {
  const { showToast } = useApp();
  const [campaigns] = useState([
    { id: 1, title: 'Diwali Festive Email Blast', reach: '24,500 users', clickRate: '18.4%', conversions: '312 orders', status: 'Active' },
    { id: 2, title: 'Cart Abandonment Recovery SMS', reach: '3,120 users', clickRate: '28.9%', conversions: '184 orders', status: 'Active' },
    { id: 3, title: 'Google Shopping Ads - Electronics', reach: '85,000 impressions', clickRate: '4.2%', conversions: '410 orders', status: 'Active' },
    { id: 4, title: 'VIP Loyalty Program Welcome', reach: '1,450 members', clickRate: '42.1%', conversions: '89 orders', status: 'Completed' },
  ]);

  const handleLaunchCampaign = () => {
    showToast('New marketing campaign submitted for dispatch!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Marketing & Campaigns</h2>
          <p className="text-xs text-slate-500">Coordinate omnichannel promotional campaigns and newsletters</p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={handleLaunchCampaign}
        >
          Launch Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-md border border-slate-200 shadow-xs">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-md w-fit mb-3">
            <Send className="w-5 h-5" />
          </div>
          <p className="text-xs text-slate-500 font-medium">Total Campaign Impressions</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">114,070</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-md border border-slate-200 shadow-xs">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-md w-fit mb-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-xs text-slate-500 font-medium">Avg Click-Through Rate</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">16.2%</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-md border border-slate-200 shadow-xs">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-md w-fit mb-3">
            <Users className="w-5 h-5" />
          </div>
          <p className="text-xs text-slate-500 font-medium">Newsletter Subscribers</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">18,940</p>
        </div>
      </div>

      <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm">Active Marketing Channels</h3>
        </div>
        <div className="divide-y divide-slate-100 text-xs">
          {campaigns.map((c) => (
            <div key={c.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-bold text-slate-900 text-sm">{c.title}</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Reach: {c.reach} • CTR: {c.clickRate}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  {c.conversions}
                </span>
                <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
