import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import {
  Plus,
  Flame,
  Copy,
  X
} from 'lucide-react';

export const PromotionsView = () => {
  const { promotions, addPromotionCode, togglePromotionStatus, showToast } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    discount: '20% OFF',
    minOrder: 1499,
    type: 'Percentage',
    expires: '2026-12-31'
  });

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!formData.code) return;

    addPromotionCode({
      code: formData.code.toUpperCase(),
      discount: formData.discount,
      minOrder: Number(formData.minOrder),
      type: formData.type,
      expires: formData.expires
    });

    setFormData({ code: '', discount: '20% OFF', minOrder: 1499, type: 'Percentage', expires: '2026-12-31' });
    setIsCreateModalOpen(false);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    showToast(`Coupon code ${code} copied!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Promotions & Discount Coupons</h2>
          <p className="text-xs text-slate-500">Create promotional discount codes, manage flash sales and campaign vouchers</p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Coupon
        </Button>
      </div>

      {/* Light Active Flash Sale Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-5 text-blue-950 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-600 text-white rounded-md text-[11px] font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" /> Active Flash Sale
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">Diwali Grand Tech & Festive Sale</h3>
          <p className="text-xs text-slate-600">Extra ₹2,000 instant cashback on orders above ₹15,000</p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-md border border-blue-200 text-center shadow-xs">
          <div>
            <span className="text-lg font-extrabold text-blue-600 block leading-none">04</span>
            <span className="text-[10px] uppercase font-semibold text-slate-500">Days</span>
          </div>
          <span className="text-lg font-bold text-slate-400">:</span>
          <div>
            <span className="text-lg font-extrabold text-blue-600 block leading-none">18</span>
            <span className="text-[10px] uppercase font-semibold text-slate-500">Hours</span>
          </div>
          <span className="text-lg font-bold text-slate-400">:</span>
          <div>
            <span className="text-lg font-extrabold text-blue-600 block leading-none">32</span>
            <span className="text-[10px] uppercase font-semibold text-slate-500">Mins</span>
          </div>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-4">Discount Value</th>
                <th className="py-3 px-4">Min. Cart Value</th>
                <th className="py-3 px-4">Usage Count</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {promotions.map((promo) => (
                <tr key={promo.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        {promo.code}
                      </span>
                      <button
                        onClick={() => handleCopyCode(promo.code)}
                        className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
                        title="Copy Code"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{promo.discount}</td>
                  <td className="py-3.5 px-4 text-slate-600">₹{promo.minOrder.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{promo.usageCount} times</td>
                  <td className="py-3.5 px-4 text-slate-500">{promo.expires}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                      promo.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {promo.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant={promo.status === 'Active' ? 'danger' : 'success'}
                      size="sm"
                      onClick={() => togglePromotionStatus(promo.id)}
                    >
                      {promo.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-md max-w-md w-full shadow-lg border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Create Promotional Coupon</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FESTIVE2026"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full font-mono uppercase px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Discount Text</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 25% OFF / ₹500 FLAT"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Min. Order Value (₹)</label>
                  <input
                    type="number"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={formData.expires}
                  onChange={(e) => setFormData({ ...formData, expires: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <Button type="button" variant="secondary" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Coupon
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
