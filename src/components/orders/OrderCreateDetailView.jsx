import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import {
  ArrowLeft,
  Printer,
  FileText,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Plus,
  Trash2,
  User,
  ShoppingBag,
  CreditCard,
  Building,
  Mail,
  Phone,
  MapPin,
  Send
} from 'lucide-react';

export const OrderCreateDetailView = ({ mode = 'detail' }) => {
  const {
    orders,
    products,
    customers,
    activeProductId,
    setActiveProductId,
    updateOrderStatus,
    addOrder,
    navigateTo,
    showToast
  } = useApp();

  // Selected Order for detail mode
  const orderId = activeProductId || (orders.length > 0 ? orders[0].id : null);
  const selectedOrder = orders.find(o => o.id === orderId) || orders[0] || {
    id: 'ORD-98421',
    date: '2026-09-19 11:30',
    customer: {
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      phone: '+91 98765 12345',
      address: 'Flat 402, Green Valley Apartments, Cyber City, Gurugram, Haryana 122002'
    },
    items: [
      { name: 'iPhone 15 Pro Max 256GB', sku: 'SKU-6216', quantity: 1, price: 79999 }
    ],
    totalAmount: 79999,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    orderStatus: 'Processing'
  };

  // Create Order Form State
  const [createForm, setCreateForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: 'Connaught Place, New Delhi, India 110001',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    items: [
      { productId: products[0]?.id || 'p1', name: products[0]?.name || 'iPhone 15 Pro Max', sku: products[0]?.sku || 'SKU-1', quantity: 1, price: products[0]?.price || 79999 }
    ]
  });

  const handleAddOrderItemLine = () => {
    const firstProd = products[0] || { id: 'p1', name: 'Product', sku: 'SKU-0', price: 1000 };
    setCreateForm(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { productId: firstProd.id, name: firstProd.name, sku: firstProd.sku, quantity: 1, price: firstProd.price }
      ]
    }));
  };

  const handleRemoveOrderItemLine = (index) => {
    setCreateForm(prev => ({
      ...prev,
      items: prev.items.filter((_, idx) => idx !== index)
    }));
  };

  const handleProductSelectChange = (index, prodId) => {
    const selected = products.find(p => p.id === prodId);
    if (!selected) return;

    setCreateForm(prev => ({
      ...prev,
      items: prev.items.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            productId: selected.id,
            name: selected.name,
            sku: selected.sku,
            price: selected.price
          };
        }
        return item;
      })
    }));
  };

  const handleQuantityChange = (index, qty) => {
    const parsedQty = Math.max(1, Number(qty) || 1);
    setCreateForm(prev => ({
      ...prev,
      items: prev.items.map((item, idx) => {
        if (idx === index) {
          return { ...item, quantity: parsedQty };
        }
        return item;
      })
    }));
  };

  const calculateCreateTotal = () => {
    return createForm.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCreateOrderSubmit = (e) => {
    e.preventDefault();
    if (!createForm.customerName.trim()) {
      showToast('Please enter customer name.', 'error');
      return;
    }

    const totalAmount = calculateCreateTotal();
    const newOrder = addOrder({
      customer: {
        name: createForm.customerName,
        email: createForm.customerEmail || `${createForm.customerName.toLowerCase().replace(/\s+/g, '')}@example.com`,
        phone: createForm.customerPhone || '+91 98765 00000',
        address: createForm.customerAddress
      },
      items: createForm.items,
      totalAmount,
      paymentMethod: createForm.paymentMethod,
      paymentStatus: createForm.paymentStatus,
      orderStatus: createForm.orderStatus
    });

    setActiveProductId(newOrder.id);
    navigateTo('orders');
  };

  const handlePrint = () => {
    window.print();
  };

  const orderStatusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' },
  ];

  const paymentMethodOptions = [
    { value: 'Credit Card', label: 'Credit / Debit Card' },
    { value: 'UPI / QR', label: 'UPI / PhonePe / Google Pay' },
    { value: 'Net Banking', label: 'Internet Banking' },
    { value: 'COD', label: 'Cash on Delivery (COD)' },
  ];

  // If mode is 'create', render Order Creator Master Page
  if (mode === 'create') {
    return (
      <form onSubmit={handleCreateOrderSubmit} className="space-y-6 max-w-6xl mx-auto pb-16">
        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('orders')}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
                <span>Orders</span>
                <span>/</span>
                <span className="font-semibold text-slate-800">Master Order Builder</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Create New Customer Order</h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => navigateTo('orders')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Send}
            >
              Issue Order & Tax Invoice
            </Button>
          </div>
        </div>

        {/* Master Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side: Customer & Line Items */}
          <div className="lg:col-span-8 space-y-6">
            {/* Customer Details */}
            <div className="bg-white rounded-md border border-slate-200 p-5 space-y-4 shadow-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" /> Customer Information
                </h3>
                <p className="text-xs text-slate-500">Select or enter customer details for billing</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Customer Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra"
                    value={createForm.customerName}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, customerName: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="vikram@example.com"
                    value={createForm.customerEmail}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, customerEmail: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={createForm.customerPhone}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Shipping & Billing Address
                  </label>
                  <input
                    type="text"
                    placeholder="Street, City, Pin code"
                    value={createForm.customerAddress}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, customerAddress: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Line Items Picker */}
            <div className="bg-white rounded-md border border-slate-200 p-5 space-y-4 shadow-xs">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-emerald-600" /> Order Items List
                  </h3>
                  <p className="text-xs text-slate-500">Add products from catalog to this order</p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  icon={Plus}
                  onClick={handleAddOrderItemLine}
                >
                  Add Product Line
                </Button>
              </div>

              <div className="space-y-3">
                {createForm.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-slate-50 rounded-md border border-slate-200 text-xs">
                    <div className="flex-1 w-full">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Product</label>
                      <Select
                        value={item.productId}
                        onChange={(e) => handleProductSelectChange(idx, e.target.value)}
                        options={products.map(p => ({ value: p.id, label: `${p.name} (SKU: ${p.sku})` }))}
                        size="md"
                        className="w-full"
                      />
                    </div>

                    <div className="w-full sm:w-24">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Qty</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(idx, e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md font-bold text-center"
                      />
                    </div>

                    <div className="w-full sm:w-32">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Unit Price</label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          setCreateForm(prev => ({
                            ...prev,
                            items: prev.items.map((it, i) => i === idx ? { ...it, price: val } : it)
                          }));
                        }}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md font-bold text-right"
                      />
                    </div>

                    <div className="w-full sm:w-28 text-right font-extrabold text-slate-900">
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Total</label>
                      ₹ {(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>

                    {createForm.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOrderItemLine(idx)}
                        className="p-2 text-rose-500 hover:bg-rose-100 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Payment & Totals Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-md border border-slate-200 p-5 space-y-4 shadow-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-600" /> Payment & Status Options
                </h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Method</label>
                  <Select
                    value={createForm.paymentMethod}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, paymentMethod: e.target.value }))}
                    options={paymentMethodOptions}
                    size="md"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Order Status</label>
                  <Select
                    value={createForm.orderStatus}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, orderStatus: e.target.value }))}
                    options={orderStatusOptions}
                    size="md"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Order Total Breakdown */}
              <div className="bg-slate-50 p-4 rounded-md border border-slate-200 space-y-2 text-xs pt-3">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900">₹ {calculateCreateTotal().toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST Tax (Included 18%):</span>
                  <span>₹ {Math.round(calculateCreateTotal() * 0.18).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Fee:</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Grand Total:</span>
                  <span className="text-blue-600">₹ {calculateCreateTotal().toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  // Otherwise Mode is 'detail': Full Page Order Detail & Printable Tax Invoice
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-md p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo('orders')}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
              <span>Orders</span>
              <span>/</span>
              <span className="font-mono font-bold text-slate-800">#{selectedOrder.id}</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Order Master Details & Tax Invoice
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="md"
            icon={Printer}
            onClick={handlePrint}
          >
            Print Tax Invoice
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              updateOrderStatus(selectedOrder.id, 'Shipped');
              showToast(`Order #${selectedOrder.id} marked as Shipped!`);
            }}
          >
            Mark as Shipped
          </Button>
        </div>
      </div>

      {/* Visual Status Pipeline Tracker */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Order Progress Pipeline</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-center">
            <CheckCircle2 className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xs font-bold text-blue-900">Order Placed</p>
            <p className="text-[10px] text-blue-700">{selectedOrder.date}</p>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-center">
            <Clock className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <p className="text-xs font-bold text-emerald-900">Payment Paid</p>
            <p className="text-[10px] text-emerald-700">{selectedOrder.paymentMethod}</p>
          </div>
          <div className={`p-3 rounded-md text-center border ${
            selectedOrder.orderStatus === 'Shipped' || selectedOrder.orderStatus === 'Delivered'
              ? 'bg-amber-50 border-amber-200'
              : 'bg-slate-50 border-slate-200'
          }`}>
            <Truck className={`w-5 h-5 mx-auto mb-1 ${
              selectedOrder.orderStatus === 'Shipped' || selectedOrder.orderStatus === 'Delivered' ? 'text-amber-600' : 'text-slate-400'
            }`} />
            <p className="text-xs font-bold text-slate-800">Shipped</p>
            <p className="text-[10px] text-slate-500">BlueDart Express</p>
          </div>
          <div className={`p-3 rounded-md text-center border ${
            selectedOrder.orderStatus === 'Delivered' ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
          }`}>
            <CheckCircle2 className={`w-5 h-5 mx-auto mb-1 ${
              selectedOrder.orderStatus === 'Delivered' ? 'text-emerald-600' : 'text-slate-400'
            }`} />
            <p className="text-xs font-bold text-slate-800">Delivered</p>
            <p className="text-[10px] text-slate-500">Customer Verified</p>
          </div>
        </div>
      </div>

      {/* Tax Invoice Document Card */}
      <div className="bg-white rounded-md border border-slate-200 p-8 shadow-sm space-y-6 text-slate-800" id="tax-invoice-print-area">
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-2xl font-black text-blue-600 tracking-tight">ShopWave</span>
            <p className="text-xs text-slate-500 font-medium mt-1">ShopWave MegaStore Pvt Ltd</p>
            <p className="text-xs text-slate-500">Connaught Place, New Delhi, India 110001</p>
            <p className="text-xs text-slate-500 font-mono mt-0.5">GSTIN: 07AAACS1429B1ZB</p>
          </div>

          <div className="sm:text-right">
            <h2 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight">Tax Invoice</h2>
            <p className="text-xs font-mono font-bold text-blue-600 mt-1">Invoice #: {selectedOrder.id}</p>
            <p className="text-xs text-slate-500">Date: {selectedOrder.date}</p>
            <span className="inline-block mt-2 text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-md border border-emerald-300">
              PAID IN FULL
            </span>
          </div>
        </div>

        {/* Customer & Shipping Addresses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs bg-slate-50 p-4 rounded-md border border-slate-200">
          <div>
            <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">Billed To (Customer)</p>
            <p className="font-extrabold text-slate-900 text-sm">{selectedOrder.customer.name}</p>
            <p className="text-slate-600 mt-0.5">{selectedOrder.customer.email}</p>
            <p className="text-slate-600">{selectedOrder.customer.phone || '+91 98765 12345'}</p>
          </div>

          <div>
            <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">Shipping Address</p>
            <p className="text-slate-700 leading-relaxed font-medium">
              {selectedOrder.customer.address || 'Flat 402, Green Valley Apartments, Cyber City, Gurugram, Haryana 122002'}
            </p>
            <p className="text-slate-500 text-[11px] mt-1">Shipping via BlueDart Express (Tracking: #BD-984129)</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="border border-slate-200 rounded-md overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Item Description</th>
                <th className="py-3 px-4">SKU / Code</th>
                <th className="py-3 px-4 text-center">Qty</th>
                <th className="py-3 px-4 text-right">Unit Price</th>
                <th className="py-3 px-4 text-right">Total (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {selectedOrder.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.name}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{item.sku || 'SKU-6216'}</td>
                  <td className="py-3.5 px-4 text-center font-semibold">{item.quantity}</td>
                  <td className="py-3.5 px-4 text-right">₹ {item.price.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-slate-900">
                    ₹ {(item.price * item.quantity).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Summary Totals */}
        <div className="flex justify-end text-xs">
          <div className="w-72 space-y-2 bg-slate-50 p-4 rounded-md border border-slate-200">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-bold text-slate-900">₹ {selectedOrder.totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>GST Tax (Included 18%):</span>
              <span>₹ {Math.round(selectedOrder.totalAmount * 0.18).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping Fee:</span>
              <span className="text-emerald-600 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-300">
              <span>Grand Total:</span>
              <span className="text-blue-600">₹ {selectedOrder.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row justify-between text-[11px] text-slate-500">
          <span>Thank you for shopping with ShopWave MegaStore!</span>
          <span>Terms & Conditions Apply | Computer Generated Invoice</span>
        </div>
      </div>
    </div>
  );
};
