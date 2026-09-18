import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Percent,
  Plus,
  Flame,
  Tag,
  Copy,
  Clock,
  CheckCircle2,
  Trash2,
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

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      {/* Flash Sale Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-pink-500/10">
        <div className="space-y-1 text-center sm:text-left">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4 text-amber-300" /> Active Flash Sale
          </span>
          <h3 className="text-xl sm:text-2xl font-black">Diwali Grand Tech & Festive Sale</h3>
          <p className="text-xs text-white/90">Extra ₹2,000 instant cashback on orders above ₹15,000</p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-center">
          <div>
            <span className="text-xl font-black block">04</span>
            <span className="text-[10px] uppercase font-bold text-white/80">Days</span>
          </div>
          <span className="text-xl font-black">:</span>
          <div>
            <span className="text-xl font-black block">18</span>
            <span className="text-[10px] uppercase font-bold text-white/80">Hours</span>
          </div>
          <span className="text-xl font-black">:</span>
          <div>
            <span className="text-xl font-black block">32</span>
            <span className="text-[10px] uppercase font-bold text-white/80">Mins</span>
          </div>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-100 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Coupon Code</th>
                <th className="py-3.5 px-4">Discount Value</th>
                <th className="py-3.5 px-4">Min. Cart Value</th>
                <th className="py-3.5 px-4">Usage Count</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {promotions.map((promo) => (
                <tr key={promo.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/50">
                        {promo.code}
                      </span>
                      <button
                        onClick={() => handleCopyCode(promo.code)}
                        className="text-slate-400 hover:text-slate-700 p-1 rounded"
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
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      promo.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {promo.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => togglePromotionStatus(promo.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        promo.status === 'Active' ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {promo.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-base">Create Promotional Coupon</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
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
                  className="w-full font-mono uppercase px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Min. Order Value (₹)</label>
                  <input
                    type="number"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={formData.expires}
                  onChange={(e) => setFormData({ ...formData, expires: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
