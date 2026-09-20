import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import {
  Store,
  CreditCard,
  Save,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

export const SettingsView = ({ initialTab = 'general' }) => {
  const { settings, setSettings, showToast, currentUser, setCurrentUser, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState(initialTab === 'payment' ? 'payment' : 'general');
  const [formData, setFormData] = useState({ ...settings });
  const [adminName, setAdminName] = useState(currentUser.name);
  const [adminEmail, setAdminEmail] = useState(currentUser.email);

  const [paymentConfig, setPaymentConfig] = useState({
    razorpayKey: 'rzp_live_89412x98124',
    stripePublicKey: 'pk_live_51M0x2891274912',
    codEnabled: true,
    upiQrEnabled: true,
    shippingPartner: 'Shiprocket Express',
    dispatchWarehouse: 'WH-DEL-01 Central'
  });

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    setSettings(formData);
    setCurrentUser(prev => ({
      ...prev,
      name: adminName,
      email: adminEmail
    }));
    showToast('Store settings updated successfully!');
  };

  const handleSavePayment = (e) => {
    e.preventDefault();
    showToast('Payment gateway credentials & shipping partners updated!');
  };

  return (
    <div className="space-y-6">
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
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">System & Store Control Center</h2>
            <p className="text-xs text-slate-500">Configure store profile, financial parameters, payment gateways, and shipping APIs</p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-md">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'general' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Store className="w-3.5 h-3.5 inline mr-1.5" /> Store Settings
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'payment' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 inline mr-1.5" /> Payment & Shipping
          </button>
        </div>
      </div>

      {activeTab === 'general' ? (
        <form onSubmit={handleSaveGeneral} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Store Profile */}
          <div className="bg-white p-5 rounded-md border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
              <Store className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">Store Identity & Contact Info</h3>
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
          <div className="bg-white p-5 rounded-md border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 mb-4">
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

            <Button type="submit" variant="primary" size="md" icon={Save} className="mt-4">
              Save Store Profile
            </Button>
          </div>
        </form>
      ) : (
        /* PAYMENT & SHIPPING SUB-PAGE */
        <form onSubmit={handleSavePayment} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-md border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">Payment Gateways & Keys</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Razorpay Live API Key</label>
                <input
                  type="text"
                  value={paymentConfig.razorpayKey}
                  onChange={(e) => setPaymentConfig({ ...paymentConfig, razorpayKey: e.target.value })}
                  className="w-full px-3 py-2 font-mono border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Stripe Public Key</label>
                <input
                  type="text"
                  value={paymentConfig.stripePublicKey}
                  onChange={(e) => setPaymentConfig({ ...paymentConfig, stripePublicKey: e.target.value })}
                  className="w-full px-3 py-2 font-mono border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-2">
                <span className="block font-bold text-slate-900">Supported Checkout Payment Modes</span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentConfig.codEnabled}
                      onChange={(e) => setPaymentConfig({ ...paymentConfig, codEnabled: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    Cash on Delivery (COD)
                  </label>
                  <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentConfig.upiQrEnabled}
                      onChange={(e) => setPaymentConfig({ ...paymentConfig, upiQrEnabled: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    Instant UPI QR Code
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-md border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 mb-4">
                <Truck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-sm">Shipping Partners & Dispatch Integration</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary Courier Partner</label>
                  <select
                    value={paymentConfig.shippingPartner}
                    onChange={(e) => setPaymentConfig({ ...paymentConfig, shippingPartner: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-semibold"
                  >
                    <option value="Shiprocket Express">Shiprocket Express Courier</option>
                    <option value="BlueDart Air">BlueDart Air Delivery</option>
                    <option value="Delhivery Surface">Delhivery Surface Logistics</option>
                    <option value="DTDC India">DTDC India Express</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Default Dispatch Warehouse</label>
                  <select
                    value={paymentConfig.dispatchWarehouse}
                    onChange={(e) => setPaymentConfig({ ...paymentConfig, dispatchWarehouse: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                  >
                    <option value="WH-DEL-01 Central">WH-DEL-01 Central Hub (New Delhi)</option>
                    <option value="WH-BOM-02 Mumbai">WH-BOM-02 Express Hub (Mumbai)</option>
                    <option value="WH-BLR-03 South">WH-BLR-03 Tech Park (Bengaluru)</option>
                  </select>
                </div>
              </div>
            </div>

            <Button type="submit" variant="primary" size="md" icon={Save} className="mt-4">
              Save Payment & Logistics Config
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
