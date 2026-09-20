import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import {
  ShoppingCart,
  Search,
  Plus,
  Eye,
  FileSpreadsheet,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  Filter,
  ArrowUpDown,
  ArrowLeft
} from 'lucide-react';

export const OrdersView = ({ initialStatus = 'All', initialTab = 'orders' }) => {
  const { orders, updateOrderStatus, navigateTo, setActiveProductId, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [viewMode, setViewMode] = useState(initialTab);

  const statusOptions = [
    { value: 'All', label: 'All Statuses' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' },
  ];

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      !searchTerm.trim() ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.customer?.name && o.customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (o.customer?.email && o.customer.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || o.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === 'All' || o.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const handleExportOrdersCSV = () => {
    const headers = 'Order ID,Date,Customer,Email,Total Amount,Payment Method,Payment Status,Order Status\n';
    const rows = filteredOrders
      .map(
        (o) =>
          `"${o.id}","${o.date}","${o.customer?.name || 'Guest'}","${o.customer?.email || ''}",${o.totalAmount},"${o.paymentMethod || 'Online'}","${o.paymentStatus}","${o.orderStatus}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ShopWave_Orders_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast(`${filteredOrders.length} orders exported to CSV!`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Delivered
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Truck className="w-3 h-3" /> Shipped
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" /> Processing
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  const totalRevenue = orders
    .filter((o) => o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingCount = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Processing').length;
  const deliveredCount = orders.filter((o) => o.orderStatus === 'Delivered').length;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" /> Orders & Tax Invoices Master Page
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Process customer orders, issue invoices, and track fulfillment status
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="secondary"
            size="md"
            icon={Download}
            onClick={handleExportOrdersCSV}
          >
            Export Orders CSV
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => navigateTo('create-order')}
          >
            Create New Order
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Orders Placed</p>
            <p className="text-lg font-bold text-slate-900 mt-0.5">{orders.length}</p>
          </div>
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-md">
            <ShoppingCart className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Pending Fulfillment</p>
            <p className="text-lg font-bold text-amber-600 mt-0.5">{pendingCount}</p>
          </div>
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-md">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Completed Deliveries</p>
            <p className="text-lg font-bold text-emerald-600 mt-0.5">{deliveredCount}</p>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-md">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Order Revenue</p>
            <p className="text-lg font-bold text-slate-900 mt-0.5">₹ {totalRevenue.toLocaleString('en-IN')}</p>
          </div>
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-md">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden space-y-3">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by order ID, customer, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3.5 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-end">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
              size="sm"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-3">Items Purchased</th>
                <th className="py-3 px-3">Total Amount</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3">Order Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div
                        onClick={() => {
                          setActiveProductId(order.id);
                          navigateTo('order-detail');
                        }}
                        className="cursor-pointer group"
                      >
                        <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-mono">
                          {order.id}
                        </p>
                        <p className="text-[11px] text-slate-500">{order.date}</p>
                      </div>
                    </td>

                    <td className="py-3 px-4 max-w-[200px]">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={order.customer?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80'}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover border border-slate-200 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate">
                            {order.customer?.name || 'Guest Customer'}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {order.customer?.email || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-600 font-medium">
                      {order.items && order.items.length > 0 ? (
                        <span className="truncate block max-w-[180px]">
                          {order.items[0].name} {order.items.length > 1 ? `(+${order.items.length - 1} more)` : ''}
                        </span>
                      ) : (
                        <span>Standard Package</span>
                      )}
                    </td>

                    <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                      ₹ {(order.totalAmount || 0).toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <p className="font-semibold text-slate-800 text-[11px]">{order.paymentMethod || 'UPI'}</p>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {order.paymentStatus || 'Paid'}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      {getStatusBadge(order.orderStatus)}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="text-[11px] px-2 py-1 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-800 font-semibold"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <Button
                        variant="secondary"
                        size="sm"
                        icon={Eye}
                        onClick={() => {
                          setActiveProductId(order.id);
                          navigateTo('order-detail');
                        }}
                      >
                        Invoice
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};