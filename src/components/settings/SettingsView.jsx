import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import {
  Store,
  CreditCard,
  Save,
} from 'lucide-react';

export const SettingsView = () => {
  const { settings, setSettings, showToast, currentUser, setCurrentUser } = useApp();
  const [formData, setFormData] = useState({ ...settings });
  const [adminName, setAdminName] = useState(currentUser.name);
  const [adminEmail, setAdminEmail] = useState(currentUser.email);

  const handleSave = (e) => {
    e.preventDefault();
    setSettings(formData);
    setCurrentUser(prev => ({
      ...prev,
      name: adminName,
      email: adminEmail
    }));
    showToast('Store settings updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">System & Store Settings</h2>
          <p className="text-xs text-slate-500">Configure store identity, financial parameters, and payment gateways</p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Save}
          onClick={handleSave}
        >
          Save All Changes
        </Button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Profile */}
        <div className="bg-white p-5 rounded-md border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
            <Store className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">Store Information</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Store Name</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Store Slogan / Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Support Email</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Support Phone</label>
                <input
                  type="text"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Business Headquarter Address</label>
              <textarea
                rows="2"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Currency & Taxes */}
        <div className="bg-white p-5 rounded-md border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Currency, Tax & Logistics</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Currency Symbol</label>
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Standard GST Tax Rate (%)</label>
                <input
                  type="number"
                  value={formData.taxRate}
                  onChange={(e) => setFormData({ ...formData, taxRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Standard Shipping Fee (₹)</label>
                <input
                  type="number"
                  value={formData.shippingFee}
                  onChange={(e) => setFormData({ ...formData, shippingFee: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Free Shipping Above (₹)</label>
                <input
                  type="number"
                  value={formData.freeShippingThreshold}
                  onChange={(e) => setFormData({ ...formData, freeShippingThreshold: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
                />
              </div>
            </div>

            {/* Admin Profile Details */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <span className="block font-bold text-slate-900">Admin Account Info</span>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Admin Name"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
                />
                <input
                  type="email"
                  placeholder="Admin Email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
