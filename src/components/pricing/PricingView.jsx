import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BadgePercent,
  Tag,
  Plus,
  CheckCircle2,
  Sliders,
  DollarSign
} from 'lucide-react';

export const PricingView = () => {
  const { showToast } = useApp();
  const [rules, setRules] = useState([
    { id: 1, name: 'Wholesale B2B Bulk Tier', condition: 'Order Qty >= 50 units', discount: '15% Off Total', appliesTo: 'All Catalog', status: 'Active' },
    { id: 2, name: 'VIP Loyalty Discount', condition: 'VIP Role Users', discount: '10% Storewide', appliesTo: 'Electronics & Fashion', status: 'Active' },
    { id: 3, name: 'Festival Clearance Rule', condition: 'Items marked clearance', discount: 'Up to 40% Off', appliesTo: 'Summer Stock', status: 'Active' },
    { id: 4, name: 'Free Shipping Threshold', condition: 'Order Total >= ₹999', discount: '₹99 Shipping Waived', appliesTo: 'All Orders', status: 'Active' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Pricing & Discount Rules</h2>
          <p className="text-xs text-slate-500">Configure global margin markups, wholesale tier pricing and discount automation</p>
        </div>

        <button
          onClick={() => showToast('Pricing rule builder opened.')}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Price Rule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule) => (
          <div key={rule.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">{rule.name}</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {rule.status}
              </span>
            </div>
            <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
              <p><span className="font-semibold text-slate-800">Condition:</span> {rule.condition}</p>
              <p><span className="font-semibold text-slate-800">Benefit:</span> <span className="font-bold text-blue-600">{rule.discount}</span></p>
              <p><span className="font-semibold text-slate-800">Scope:</span> {rule.appliesTo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
