import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingCart,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  FileText,
  Printer,
  ChevronDown,
  X,
  ExternalLink,
  IndianRupee
} from 'lucide-react';

export const OrdersView = () => {
  const { orders, updateOrderStatus, navigateTo, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchStatus = statusFilter === 'All' || order.orderStatus.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3.5 h-3.5" /> Processing
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Truck className="w-3.5 h-3.5" /> Shipped
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Orders Management</h2>
          <p className="text-xs text-slate-500">Track and manage customer orders, fulfillments, and invoices</p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 w-52 sm:w-64"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Delivered">Delivered</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-100 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    No orders match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-blue-600">
                      #{order.id}
                      <span className="block text-[10px] text-slate-400 font-sans font-normal mt-0.5">{order.date}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <img src={order.customer.avatar} alt={order.customer.name} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-slate-900">{order.customer.name}</p>
                          <p className="text-[11px] text-slate-400">{order.customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="font-medium text-slate-800 truncate max-w-[200px]">
                            {item.quantity}x {item.name}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900 text-sm whitespace-nowrap">
                      ₹ {order.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-slate-700 block">{order.paymentMethod}</span>
                      <span className={`text-[10px] font-bold uppercase ${
                        order.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(order.orderStatus)}
                        {/* Status Change Selector */}
                        <select
                          value={order.orderStatus}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="text-[11px] border border-slate-200 rounded-lg p-1 bg-white text-slate-600 focus:outline-none"
                        >
                          <option value="Delivered">Delivered</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Pending">Pending</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setSelectedInvoiceOrder(order)}
                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors inline-flex items-center gap-1 font-semibold"
                        title="View Invoice"
                      >
                        <FileText className="w-4 h-4" />
                        <span className="hidden sm:inline">Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 p-6 space-y-6 animate-in fade-in zoom-in duration-150">
            {/* Invoice Top */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Tax Invoice</h3>
                <p className="text-xs text-slate-400">Order ID: #{selectedInvoiceOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Store & Customer Details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-bold text-slate-800">Billed From:</p>
                <p className="text-slate-600 font-semibold mt-0.5">ShopWave MegaStore Pvt Ltd</p>
                <p className="text-slate-500">Connaught Place, New Delhi, 110001</p>
                <p className="text-slate-500">GSTIN: 07AAACS1429B1ZB</p>
              </div>
              <div>
                <p className="font-bold text-slate-800">Shipped & Billed To:</p>
                <p className="text-slate-600 font-semibold mt-0.5">{selectedInvoiceOrder.customer.name}</p>
                <p className="text-slate-500">{selectedInvoiceOrder.customer.email}</p>
                <p className="text-slate-500">{selectedInvoiceOrder.customer.address || 'Delhi, India'}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-slate-100 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                  <tr>
                    <th className="p-2.5">Item</th>
                    <th className="p-2.5">SKU</th>
                    <th className="p-2.5 text-center">Qty</th>
                    <th className="p-2.5 text-right">Price</th>
                    <th className="p-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {selectedInvoiceOrder.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-medium">{it.name}</td>
                      <td className="p-2.5 font-mono text-slate-500">{it.sku}</td>
                      <td className="p-2.5 text-center">{it.quantity}</td>
                      <td className="p-2.5 text-right">₹{it.price.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-right font-bold">₹{(it.price * it.quantity).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Summary */}
            <div className="flex justify-end text-xs">
              <div className="w-60 space-y-1.5">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal:</span>
                  <span>₹{selectedInvoiceOrder.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>GST Tax (Included 18%):</span>
                  <span>₹{Math.round(selectedInvoiceOrder.totalAmount * 0.18).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping:</span>
                  <span className="text-emerald-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Grand Total:</span>
                  <span className="text-blue-600 font-extrabold">₹{selectedInvoiceOrder.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-400">Payment via {selectedInvoiceOrder.paymentMethod}</span>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Print Invoice
                </button>
                <button
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
