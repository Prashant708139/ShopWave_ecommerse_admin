import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import {
  Users,
  Search,
  Plus,
  Trash2,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Award,
  X,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Download,
  Filter,
  Megaphone,
  Percent,
  Edit2,
  TrendingUp,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Send
} from 'lucide-react';

export const CustomersView = ({ initialTab = 'directory' }) => {
  const { customers, addCustomer, deleteCustomer, showToast, navigateTo, setActiveProductId } = useApp();
  const [activeTab, setActiveTab] = useState(initialTab === 'segments' ? 'segments' : 'directory');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Default Industry Audience Segments
  const [segments, setSegments] = useState([
    {
      id: 1,
      name: 'VIP Power Buyers',
      category: 'Revenue & Spend',
      description: 'High LTV customers with total spent >= ₹50,000 and 3+ completed orders',
      count: 18,
      minSpend: 50000,
      minOrders: 3,
      inactivityDays: 0,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      autoAction: 'Auto-Assign 20% VIP Coupon Code (VIP20)',
      totalRevenue: 1450000,
      avgAov: 18500,
      createdAt: '2026-01-10'
    },
    {
      id: 2,
      name: 'Wholesale B2B Merchants',
      category: 'Behavioral & Frequency',
      description: 'Bulk business buyers ordering >= 20 units/month with verified tax ID',
      count: 8,
      minSpend: 100000,
      minOrders: 10,
      inactivityDays: 0,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      autoAction: 'Bulk Freight & Priority Logistics Dispatch',
      totalRevenue: 2890000,
      avgAov: 42000,
      createdAt: '2026-02-01'
    },
    {
      id: 3,
      name: 'At-Risk Inactive Shoppers',
      category: 'Engagement & Activity',
      description: 'No orders placed in last 90 days. High churn probability.',
      count: 34,
      minSpend: 5000,
      minOrders: 1,
      inactivityDays: 90,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      autoAction: 'Win-Back Email Sequence + ₹500 Re-engagement Voucher',
      totalRevenue: 340000,
      avgAov: 4800,
      createdAt: '2026-02-15'
    },
    {
      id: 4,
      name: 'New Registrations (This Month)',
      category: 'Engagement & Activity',
      description: 'Recently registered user accounts within the last 30 days',
      count: 42,
      minSpend: 0,
      minOrders: 0,
      inactivityDays: 0,
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      autoAction: 'Welcome 10% First Order Coupon (FIRST10)',
      totalRevenue: 185000,
      avgAov: 2400,
      createdAt: '2026-03-01'
    },
  ]);

  // Segment Creation Modal State
  const [isAddSegmentOpen, setIsAddSegmentOpen] = useState(false);
  const [newSegment, setNewSegment] = useState({
    name: '',
    category: 'Revenue & Spend',
    description: '',
    minSpend: 10000,
    minOrders: 2,
    inactivityDays: 30,
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    autoAction: 'Auto-Assign Loyalty Points'
  });

  // Segment Detail Inspector Modal State
  const [selectedSegmentForView, setSelectedSegmentForView] = useState(null);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);

  // Add Customer Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    role: 'Customer',
  });

  const roleOptions = [
    { value: 'All', label: 'All Customer Roles' },
    { value: 'Customer', label: 'Regular Customer' },
    { value: 'VIP Member', label: 'VIP Member' },
    { value: 'Wholesale Buyer', label: 'Wholesale Buyer' },
  ];

  const categoryOptions = [
    { value: 'Revenue & Spend', label: 'Revenue & Spend (High LTV)' },
    { value: 'Behavioral & Frequency', label: 'Behavioral & Purchase Frequency' },
    { value: 'Engagement & Activity', label: 'Engagement & Activity (Recency)' },
    { value: 'Geographic Target', label: 'Geographic Target / Tier 1 Cities' },
  ];

  const autoActionOptions = [
    { value: 'Auto-Assign Loyalty Points', label: 'Auto-Assign Loyalty Points' },
    { value: 'Auto-Assign 20% VIP Coupon Code (VIP20)', label: 'Auto-Assign 20% VIP Coupon Code (VIP20)' },
    { value: 'Welcome 10% First Order Coupon (FIRST10)', label: 'Welcome 10% First Order Coupon (FIRST10)' },
    { value: 'Win-Back Email Sequence + ₹500 Re-engagement Voucher', label: 'Win-Back Email Sequence + ₹500 Voucher' },
    { value: 'Sync with Meta & Google Ads Audience', label: 'Sync with Meta & Google Ads Audience' },
  ];

  const filteredCustomers = customers.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.city && c.city.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === 'All' || c.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // Export Customer Directory CSV
  const handleExportDirectoryCSV = () => {
    const headers = 'ID,Name,Email,Phone,City,Role,Orders Count,Total Spent (₹),Joined Date\n';
    const rows = filteredCustomers
      .map(
        c =>
          `"${c.id}","${c.name}","${c.email}","${c.phone || ''}","${c.city || ''}","${c.role}",${c.ordersCount || 0},${c.totalSpent || 0},"${c.joinedDate || ''}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ShopWave_Customers_Export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast(`${filteredCustomers.length} customer records exported to CSV!`);
  };

  // Export Segment Members CSV
  const handleExportSegmentCSV = (seg) => {
    const matched = customers.filter(c => c.totalSpent >= (seg.minSpend || 0));
    const headers = 'Customer ID,Name,Email,Phone,City,Total Spent (₹),Orders Count\n';
    const rows = matched
      .map(c => `"${c.id}","${c.name}","${c.email}","${c.phone || ''}","${c.city || ''}",${c.totalSpent},${c.ordersCount}`)
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ShopWave_Segment_${seg.name.replace(/\s+/g, '_')}_Members.csv`;
    a.click();
    showToast(`Exported ${matched.length || seg.count} members of "${seg.name}" to CSV!`);
  };

  const handleCreateCustomer = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    addCustomer({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '+91 98000 00000',
      city: formData.city || 'New Delhi',
      role: formData.role,
    });

    setFormData({ name: '', email: '', phone: '', city: '', role: 'Customer' });
    setIsAddModalOpen(false);
    showToast(`Customer "${formData.name}" registered successfully!`);
  };

  const handleCreateSegment = (e) => {
    e.preventDefault();
    if (!newSegment.name.trim()) return;

    // Estimate matched buyers dynamically based on spend criteria
    const matchedCount = customers.filter(c => c.totalSpent >= (Number(newSegment.minSpend) || 0)).length || Math.floor(Math.random() * 15) + 5;

    const seg = {
      id: Date.now(),
      name: newSegment.name.trim(),
      category: newSegment.category,
      description: newSegment.description || `Custom buyer group (Min spent: ₹${newSegment.minSpend})`,
      count: matchedCount,
      minSpend: Number(newSegment.minSpend) || 0,
      minOrders: Number(newSegment.minOrders) || 1,
      inactivityDays: Number(newSegment.inactivityDays) || 0,
      badgeColor: newSegment.badgeColor,
      autoAction: newSegment.autoAction,
      totalRevenue: matchedCount * 12500,
      avgAov: 6800,
      createdAt: new Date().toISOString().slice(0, 10)
    };

    setSegments([seg, ...segments]);
    setNewSegment({
      name: '',
      category: 'Revenue & Spend',
      description: '',
      minSpend: 10000,
      minOrders: 2,
      inactivityDays: 30,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      autoAction: 'Auto-Assign Loyalty Points'
    });
    setIsAddSegmentOpen(false);
    showToast(`Customer segment group "${seg.name}" created with ${matchedCount} buyers!`);
  };

  const handleDeleteSegment = (id, name) => {
    setSegments(segments.filter(s => s.id !== id));
    if (selectedSegmentForView?.id === id) {
      setSelectedSegmentForView(null);
    }
    showToast(`Segment group "${name}" deleted!`);
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    showToast(`Broadcast campaign sent to ${selectedSegmentForView?.count || 18} segment members!`);
    setBroadcastMessage('');
    setIsBroadcastOpen(false);
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
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" /> Customer CRM & Audience Segments
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              View customer directory, track lifetime expenditure, and group buyers into smart segments
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-md">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'directory' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 inline mr-1.5" /> Customer Directory ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab('segments')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'segments' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 inline mr-1.5" /> Buyer Segments ({segments.length})
          </button>
        </div>
      </div>

      {activeTab === 'directory' ? (
        /* CUSTOMER DIRECTORY SUB-PAGE */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">All Registered Customer Profiles</h3>
              <p className="text-xs text-slate-500">Search customer emails, phones, and lifetime expenditure</p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by name, email, city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-xs pl-9 pr-3.5 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 placeholder-slate-400 w-48 sm:w-60"
                />
              </div>

              <Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                options={roleOptions}
                size="sm"
              />

              <Button
                variant="secondary"
                size="md"
                icon={Download}
                onClick={handleExportDirectoryCSV}
              >
                Export CSV
              </Button>

              <Button
                variant="primary"
                size="md"
                icon={Plus}
                onClick={() => setIsAddModalOpen(true)}
              >
                Add Customer
              </Button>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-md border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Registered Accounts</p>
                <p className="text-lg font-bold text-slate-900 mt-0.5">{customers.length}</p>
              </div>
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-md">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-md border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">VIP Power Buyers</p>
                <p className="text-lg font-bold text-emerald-600 mt-0.5">
                  {customers.filter(c => c.role.includes('VIP') || c.totalSpent >= 50000).length}
                </p>
              </div>
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-md">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-md border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Wholesale Buyers</p>
                <p className="text-lg font-bold text-blue-600 mt-0.5">
                  {customers.filter(c => c.role.includes('Wholesale')).length || 2}
                </p>
              </div>
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-md border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Total Customer Spent</p>
                <p className="text-lg font-bold text-slate-900 mt-0.5">
                  ₹ {customers.reduce((acc, c) => acc + (c.totalSpent || 0), 0).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-md">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Customer Directory Table */}
          <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Customer Name</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Role / Segment</th>
                    <th className="py-3 px-4">Orders Placed</th>
                    <th className="py-3 px-4">Total Spent</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-slate-400">
                        No customer profiles found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={customer.avatar}
                              alt={customer.name}
                              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 truncate">{customer.name}</p>
                              <p className="text-[11px] text-slate-500">Joined {customer.joinedDate || '2024'}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <p className="font-medium text-slate-800 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" /> {customer.email}
                          </p>
                          <p className="text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" /> {customer.phone}
                          </p>
                        </td>

                        <td className="py-3.5 px-4 font-medium text-slate-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" /> {customer.city || 'India'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                            {customer.role}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          {customer.ordersCount} Orders
                        </td>

                        <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                          ₹ {(customer.totalSpent || 0).toLocaleString('en-IN')}
                        </td>

                        <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={ShoppingBag}
                            onClick={() => navigateTo('orders')}
                            title="View Customer Orders"
                          >
                            Orders
                          </Button>

                          <button
                            onClick={() => deleteCustomer(customer.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                            title="Delete Customer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Customer Modal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-md max-w-md w-full shadow-lg border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">Add New Customer Profile</h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 rounded-md">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateCustomer} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">City / Region</label>
                      <input
                        type="text"
                        placeholder="e.g. Jaipur"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Segment Role</label>
                      <Select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        options={roleOptions.filter(r => r.value !== 'All')}
                        size="md"
                        fullWidth
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                    <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      Save Customer Profile
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* CUSTOMER SEGMENTS SUB-PAGE */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Smart Audience Segments & Automated Groupings</h3>
              <p className="text-xs text-slate-500">Industry-standard buyer segments based on lifetime expenditure, order frequency, and engagement rules</p>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={() => setIsAddSegmentOpen(true)}
            >
              Add Segment Group
            </Button>
          </div>

          {/* Segment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {segments.map((seg) => (
              <div
                key={seg.id}
                className="bg-white rounded-md border border-slate-200 shadow-xs p-5 space-y-4 hover:border-blue-400 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base leading-tight">{seg.name}</h4>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          {seg.category}
                        </span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${seg.badgeColor}`}>
                      {seg.count} buyers
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{seg.description}</p>

                  {/* Automated Action Badge */}
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 min-w-0">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span className="truncate text-[11px] font-medium">{seg.autoAction}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-500">
                    Est. Revenue: <span className="font-bold text-slate-900">₹{(seg.totalRevenue || 120000).toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteSegment(seg.id, seg.name)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Delete Segment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <Button
                      variant="secondary"
                      size="sm"
                      icon={ChevronRight}
                      onClick={() => setSelectedSegmentForView(seg)}
                    >
                      View Group
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* INDUSTRY-STANDARD "ADD SEGMENT GROUP" MASTER MODAL */}
          {isAddSegmentOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-md max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-blue-600" /> Create Custom Segment Group
                    </h3>
                    <p className="text-xs text-slate-500">Configure customer segmentation rules and automated marketing triggers</p>
                  </div>
                  <button onClick={() => setIsAddSegmentOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 rounded-md">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateSegment} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Segment Group Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Metro Repeat Tech Buyers"
                      value={newSegment.name}
                      onChange={(e) => setNewSegment({ ...newSegment, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Audience Category</label>
                      <Select
                        value={newSegment.category}
                        onChange={(e) => setNewSegment({ ...newSegment, category: e.target.value })}
                        options={categoryOptions}
                        size="md"
                        fullWidth
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Automated CRM Action</label>
                      <Select
                        value={newSegment.autoAction}
                        onChange={(e) => setNewSegment({ ...newSegment, autoAction: e.target.value })}
                        options={autoActionOptions}
                        size="md"
                        fullWidth
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Description & Marketing Objective</label>
                    <textarea
                      rows="2"
                      placeholder="Targeting customers with high lifetime value to send exclusive promo codes and early product access..."
                      value={newSegment.description}
                      onChange={(e) => setNewSegment({ ...newSegment, description: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 resize-none"
                    />
                  </div>

                  {/* Filtering Rules Engine */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md space-y-3">
                    <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-blue-600" /> Filtering Criteria Rules
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-medium text-slate-600 mb-1">Min Total Spent (₹)</label>
                        <input
                          type="number"
                          placeholder="10000"
                          value={newSegment.minSpend}
                          onChange={(e) => setNewSegment({ ...newSegment, minSpend: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block font-medium text-slate-600 mb-1">Min Orders Count</label>
                        <input
                          type="number"
                          placeholder="2"
                          value={newSegment.minOrders}
                          onChange={(e) => setNewSegment({ ...newSegment, minOrders: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block font-medium text-slate-600 mb-1">Inactivity (Days)</label>
                        <input
                          type="number"
                          placeholder="30"
                          value={newSegment.inactivityDays}
                          onChange={(e) => setNewSegment({ ...newSegment, inactivityDays: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white text-slate-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Color Theme Selector */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">Badge Color Theme</label>
                    <div className="flex items-center gap-3">
                      {[
                        { label: 'Emerald VIP', class: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                        { label: 'Blue Merchant', class: 'bg-blue-50 text-blue-700 border-blue-200' },
                        { label: 'Amber At-Risk', class: 'bg-amber-50 text-amber-700 border-amber-200' },
                        { label: 'Purple Launch', class: 'bg-purple-50 text-purple-700 border-purple-200' },
                      ].map((theme, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setNewSegment({ ...newSegment, badgeColor: theme.class })}
                          className={`px-3 py-1.5 rounded-md text-xs font-bold border transition-all cursor-pointer ${theme.class} ${
                            newSegment.badgeColor === theme.class ? 'ring-2 ring-blue-600 ring-offset-1' : 'opacity-70 hover:opacity-100'
                          }`}
                        >
                          {theme.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                    <Button type="button" variant="secondary" onClick={() => setIsAddSegmentOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      Create Segment Group
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* DETAILED "VIEW GROUP" SEGMENT INSPECTOR MODAL */}
          {selectedSegmentForView && (
            <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-md max-w-3xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${selectedSegmentForView.badgeColor}`}>
                        {selectedSegmentForView.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Created {selectedSegmentForView.createdAt || '2026-02-10'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-6 h-6 text-blue-600" /> {selectedSegmentForView.name}
                    </h3>
                    <p className="text-xs text-slate-600">{selectedSegmentForView.description}</p>
                  </div>

                  <button
                    onClick={() => setSelectedSegmentForView(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-800 rounded-md hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Segment KPI Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-slate-50 rounded-md border border-slate-200">
                    <p className="text-[11px] font-medium text-slate-500">Segment Active Buyers</p>
                    <p className="text-lg font-bold text-slate-900 mt-0.5">{selectedSegmentForView.count} Buyers</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-md border border-slate-200">
                    <p className="text-[11px] font-medium text-slate-500">Estimated Total Revenue</p>
                    <p className="text-lg font-bold text-emerald-600 mt-0.5">₹ {(selectedSegmentForView.totalRevenue || 250000).toLocaleString('en-IN')}</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-md border border-slate-200">
                    <p className="text-[11px] font-medium text-slate-500">Avg Order Value (AOV)</p>
                    <p className="text-lg font-bold text-blue-600 mt-0.5">₹ {(selectedSegmentForView.avgAov || 6400).toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {/* Action Bar inside View Group */}
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-blue-950">
                    <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span><strong className="font-bold">Active Trigger:</strong> {selectedSegmentForView.autoAction}</span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Mail}
                      onClick={() => setIsBroadcastOpen(true)}
                    >
                      Broadcast Campaign
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                      icon={Download}
                      onClick={() => handleExportSegmentCSV(selectedSegmentForView)}
                    >
                      Export Segment CSV
                    </Button>
                  </div>
                </div>

                {/* Matched Customer List Table */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs">Matched Member Profiles ({selectedSegmentForView.count})</h4>
                  <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-semibold">
                          <th className="py-2.5 px-3">Member</th>
                          <th className="py-2.5 px-3">Email / Phone</th>
                          <th className="py-2.5 px-3">Lifetime Spent</th>
                          <th className="py-2.5 px-3">Orders</th>
                          <th className="py-2.5 px-3 text-right">Quick Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {customers
                          .filter(c => c.totalSpent >= (selectedSegmentForView.minSpend || 0))
                          .slice(0, 5)
                          .map((c) => (
                            <tr key={c.id} className="hover:bg-slate-50">
                              <td className="py-2.5 px-3 font-bold text-slate-900 flex items-center gap-2">
                                <img src={c.avatar} alt="" className="w-6 h-6 rounded-full object-cover border border-slate-200" />
                                <span>{c.name}</span>
                              </td>
                              <td className="py-2.5 px-3 text-slate-600">{c.email}</td>
                              <td className="py-2.5 px-3 font-bold text-slate-900">₹ {(c.totalSpent || 0).toLocaleString('en-IN')}</td>
                              <td className="py-2.5 px-3 font-semibold text-slate-700">{c.ordersCount}</td>
                              <td className="py-2.5 px-3 text-right">
                                <button
                                  onClick={() => {
                                    showToast(`Promotional voucher issued to ${c.name}`);
                                  }}
                                  className="text-[11px] text-blue-600 font-bold hover:underline cursor-pointer"
                                >
                                  Issue Voucher
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Broadcast Drawer Popup */}
                {isBroadcastOpen && (
                  <div className="p-4 bg-slate-900 text-white rounded-md space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs flex items-center gap-1.5 text-blue-400">
                        <Send className="w-3.5 h-3.5" /> Broadcast Message to {selectedSegmentForView.name} ({selectedSegmentForView.count} buyers)
                      </h4>
                      <button onClick={() => setIsBroadcastOpen(false)} className="text-slate-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleSendBroadcast} className="space-y-2">
                      <textarea
                        required
                        rows="2"
                        placeholder="Write your email/SMS broadcast announcement for this audience..."
                        value={broadcastMessage}
                        onChange={(e) => setBroadcastMessage(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                      />
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="secondary" onClick={() => setIsBroadcastOpen(false)}>
                          Cancel
                        </Button>
                        <Button size="sm" variant="primary" type="submit" icon={Send}>
                          Send Broadcast Now
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Footer Modal Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <Button
                    variant="danger"
                    size="sm"
                    icon={Trash2}
                    onClick={() => handleDeleteSegment(selectedSegmentForView.id, selectedSegmentForView.name)}
                  >
                    Delete Segment
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedSegmentForView(null)}
                  >
                    Close Inspector
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

