import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import {
  RefreshCw,
  Search,
  Building2,
  Plus,
  Truck,
  MapPin,
  Box,
  CheckCircle2,
  ArrowLeft,
  ArrowRightLeft,
  X,
  Clock,
  ShieldCheck,
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';

export const InventoryView = ({ initialTab = 'stock' }) => {
  const { products, updateProduct, showToast, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState(initialTab === 'warehouses' ? 'warehouses' : 'stock');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('all');

  // Warehouses List
  const [warehouses, setWarehouses] = useState([
    { id: 1, name: 'Central Distribution Center', code: 'WH-DEL-01', location: 'New Delhi, NCR', capacity: '85,000 units', manager: 'Anil Kumar', phone: '+91 98100 11223', status: 'Operational', stockCount: 14200, dispatchSla: 'Same-Day Dispatch' },
    { id: 2, name: 'Mumbai Express Logistics Hub', code: 'WH-BOM-02', location: 'Bhiwandi, Mumbai', capacity: '120,000 units', manager: 'Priya Sharma', phone: '+91 98200 44556', status: 'Operational', stockCount: 22100, dispatchSla: 'Same-Day Dispatch' },
    { id: 3, name: 'Bengaluru Tech Park Depot', code: 'WH-BLR-03', location: 'Whitefield, Bengaluru', capacity: '60,000 units', manager: 'Suresh Raina', phone: '+91 98450 77889', status: 'Operational', stockCount: 9400, dispatchSla: '24-Hour Express' },
    { id: 4, name: 'Kolkata East Fulfillment Hub', code: 'WH-CCU-04', location: 'Dankuni, West Bengal', capacity: '45,000 units', manager: 'Subhash Sen', phone: '+91 98300 99001', status: 'Operational', stockCount: 6800, dispatchSla: '48-Hour Regional' },
  ]);

  // Add Warehouse Modal State
  const [isAddWarehouseOpen, setIsAddWarehouseOpen] = useState(false);
  const [newWh, setNewWh] = useState({
    name: '',
    location: '',
    capacity: '50,000 units',
    manager: '',
    phone: '',
    dispatchSla: 'Same-Day Dispatch'
  });

  // Stock Transfer Modal State
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferData, setTransferData] = useState({
    sourceWarehouse: '',
    targetWarehouseId: '',
    productId: '',
    quantity: 50,
    logisticsPartner: 'BlueDart Air Freight',
    priority: 'Standard 48h',
    notes: ''
  });

  const totalStockUnits = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const outOfStockItems = products.filter(p => (p.stock || 0) === 0);
  const lowStockItems = products.filter(p => (p.stock || 0) > 0 && (p.stock || 0) < 15);
  const totalValuation = products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);

  const filteredProducts = products.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterMode === 'low') return matchSearch && (p.stock || 0) > 0 && (p.stock || 0) < 15;
    if (filterMode === 'out') return matchSearch && (p.stock || 0) === 0;
    return matchSearch;
  });

  const handleRestock = (product, addQty) => {
    const newStock = (product.stock || 0) + addQty;
    updateProduct(product.id, { stock: newStock });
    showToast(`Restocked ${addQty} units for "${product.name}"`);
  };

  const handleRestockAllOutStock = () => {
    outOfStockItems.forEach(p => {
      updateProduct(p.id, { stock: 25 });
    });
    showToast(`Restocked 25 units for all ${outOfStockItems.length} out-of-stock products!`);
  };

  const handleAddWarehouse = (e) => {
    e.preventDefault();
    if (!newWh.name) return;
    const wh = {
      id: Date.now(),
      name: newWh.name,
      code: `WH-IND-0${warehouses.length + 1}`,
      location: newWh.location || 'India Logistics Hub',
      capacity: newWh.capacity || '50,000 units',
      manager: newWh.manager || 'Operations Head',
      phone: newWh.phone || '+91 98000 00000',
      status: 'Operational',
      stockCount: 5000,
      dispatchSla: newWh.dispatchSla
    };
    setWarehouses([...warehouses, wh]);
    setNewWh({ name: '', location: '', capacity: '50,000 units', manager: '', phone: '', dispatchSla: 'Same-Day Dispatch' });
    setIsAddWarehouseOpen(false);
    showToast(`Warehouse Depot "${wh.name}" registered successfully!`);
  };

  const handleOpenTransfer = (wh) => {
    const otherWh = warehouses.find(w => w.id !== wh.id);
    setTransferData({
      sourceWarehouse: wh.name,
      targetWarehouseId: otherWh ? String(otherWh.id) : '',
      productId: products[0]?.id || '',
      quantity: 50,
      logisticsPartner: 'BlueDart Air Freight',
      priority: 'Standard 48h',
      notes: `Inter-depot stock manifest #${Math.floor(1000 + Math.random() * 9000)}`
    });
    setIsTransferModalOpen(true);
  };

  const handleExecuteTransfer = (e) => {
    e.preventDefault();
    const prod = products.find(p => p.id === transferData.productId);
    const targetWh = warehouses.find(w => String(w.id) === String(transferData.targetWarehouseId));

    if (!prod || !targetWh) return;

    showToast(`Transferred ${transferData.quantity} units of "${prod.name}" from ${transferData.sourceWarehouse} to ${targetWh.name} via ${transferData.logisticsPartner}!`);
    setIsTransferModalOpen(false);
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
              <Box className="w-5 h-5 text-blue-600" /> Inventory & Logistics Center
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Monitor multi-warehouse inventory, stock balances, and supply chain transfers
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-md">
          <button
            onClick={() => setActiveTab('stock')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'stock' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Box className="w-3.5 h-3.5 inline mr-1.5" /> Stock Manager
          </button>
          <button
            onClick={() => setActiveTab('warehouses')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'warehouses' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 inline mr-1.5" /> Warehouses ({warehouses.length})
          </button>
        </div>
      </div>

      {activeTab === 'stock' ? (
        <>
          {/* Action Header */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Product Inventory Catalog</h3>
              <p className="text-xs text-slate-500">Track item balances, valuation, and trigger quick restocks</p>
            </div>
            {outOfStockItems.length > 0 && (
              <Button
                variant="primary"
                size="md"
                icon={RefreshCw}
                onClick={handleRestockAllOutStock}
              >
                Re-stock All Out-of-Stock (+25)
              </Button>
            )}
          </div>

          {/* Summary KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-md border border-slate-200 shadow-xs">
              <p className="text-xs text-slate-500 font-medium">Total Units in Stock</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{totalStockUnits.toLocaleString('en-IN')}</p>
              <span className="text-[11px] text-emerald-600 font-semibold">Across {warehouses.length} Active Hubs</span>
            </div>

            <div className="bg-white p-4 rounded-md border border-slate-200 shadow-xs">
              <p className="text-xs text-slate-500 font-medium">Total Asset Valuation</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">₹ {totalValuation.toLocaleString('en-IN')}</p>
              <span className="text-[11px] text-slate-500 font-medium">Inventory Cost Value</span>
            </div>

            <div className="bg-white p-4 rounded-md border border-slate-200 shadow-xs">
              <p className="text-xs text-slate-500 font-medium">Low Stock Warnings</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{lowStockItems.length}</p>
              <span className="text-[11px] text-amber-600 font-semibold">Less than 15 units</span>
            </div>

            <div className="bg-white p-4 rounded-md border border-slate-200 shadow-xs">
              <p className="text-xs text-slate-500 font-medium">Out of Stock Alert</p>
              <p className="text-2xl font-bold text-rose-600 mt-1">{outOfStockItems.length}</p>
              <span className="text-[11px] text-rose-600 font-semibold">Requires immediate order</span>
            </div>
          </div>

          {/* Filter Tabs & Search */}
          <div className="bg-white p-4 rounded-md border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md w-full sm:w-auto">
              <button
                onClick={() => setFilterMode('all')}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  filterMode === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Stock ({products.length})
              </button>
              <button
                onClick={() => setFilterMode('low')}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  filterMode === 'low' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Low Stock ({lowStockItems.length})
              </button>
              <button
                onClick={() => setFilterMode('out')}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  filterMode === 'out' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Out of Stock ({outOfStockItems.length})
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search inventory items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Product Name</th>
                    <th className="py-3 px-4">SKU</th>
                    <th className="py-3 px-4">Primary Warehouse</th>
                    <th className="py-3 px-4">Unit Price</th>
                    <th className="py-3 px-4">Available Units</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Quick Restock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredProducts.map((p) => {
                    const isOut = (p.stock || 0) === 0;
                    const isLow = (p.stock || 0) > 0 && (p.stock || 0) < 15;

                    return (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-8 h-8 rounded-md object-cover border border-slate-200" />
                            <div>
                              <p className="font-semibold text-slate-900">{p.name}</p>
                              <p className="text-[11px] text-slate-500">{p.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">{p.sku}</td>
                        <td className="py-3.5 px-4 text-slate-600">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            Central Distribution Center
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-900">
                          ₹ {p.price.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-sm">
                          <span className={isOut ? 'text-rose-600' : isLow ? 'text-amber-600' : 'text-slate-800'}>
                            {p.stock || 0}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {isOut ? (
                            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                              Out of Stock
                            </span>
                          ) : isLow ? (
                            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                              Low Stock
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Optimal Stock
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleRestock(p, 10)}
                            >
                              +10
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleRestock(p, 50)}
                            >
                              +50
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* WAREHOUSES MASTER PAGE WITH EQUAL HEIGHT SYMMETRICAL CARDS */
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Fulfillment Warehouses & Distribution Depots</h3>
              <p className="text-xs text-slate-500">Manage storage centers, stock allocations, and regional hubs</p>
            </div>
            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={() => setIsAddWarehouseOpen(true)}
            >
              Add Warehouse Depot
            </Button>
          </div>

          {/* Equal Height Symmetrical Warehouse Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            {warehouses.map((wh) => (
              <div
                key={wh.id}
                className="bg-white rounded-md border border-slate-200 shadow-xs p-5 space-y-4 hover:border-blue-400 transition-all flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-md border border-blue-200 flex-shrink-0">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-slate-900 text-base">{wh.name}</h4>
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                            {wh.code}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" /> {wh.location}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {wh.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-md border border-slate-200 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Max Capacity</span>
                      <span className="font-bold text-slate-800">{wh.capacity}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Active Stock</span>
                      <span className="font-bold text-blue-600">{wh.stockCount.toLocaleString()} units</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">In-Charge</span>
                      <span className="font-bold text-slate-800 truncate block">{wh.manager}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 gap-2">
                  <span className="text-slate-500 text-[11px] flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-slate-400" /> SLA: {wh.dispatchSla || 'Same-day shipping active'}
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={ArrowRightLeft}
                    onClick={() => handleOpenTransfer(wh)}
                  >
                    Transfer Stock
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* ENTERPRISE INTER-WAREHOUSE STOCK TRANSFER MASTER MODAL */}
          {isTransferModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-md max-w-md w-full p-5 space-y-4 shadow-xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <ArrowRightLeft className="w-5 h-5 text-blue-600" /> Inter-Warehouse Stock Transfer
                    </h3>
                    <p className="text-xs text-slate-500">Initiate supply chain transfer manifest between depots</p>
                  </div>
                  <button onClick={() => setIsTransferModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleExecuteTransfer} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Source Origin Depot</label>
                    <input
                      type="text"
                      disabled
                      value={transferData.sourceWarehouse}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-100 font-bold text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Destination Target Depot *</label>
                    <select
                      required
                      value={transferData.targetWarehouseId}
                      onChange={(e) => setTransferData({ ...transferData, targetWarehouseId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-semibold"
                    >
                      {warehouses
                        .filter(w => w.name !== transferData.sourceWarehouse)
                        .map(w => (
                          <option key={w.id} value={w.id}>
                            {w.name} ({w.code} - {w.location})
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Select Product SKU *</label>
                    <select
                      required
                      value={transferData.productId}
                      onChange={(e) => setTransferData({ ...transferData, productId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-semibold"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} (SKU: {p.sku} | In Stock: {p.stock})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Transfer Units *</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={transferData.quantity}
                        onChange={(e) => setTransferData({ ...transferData, quantity: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Freight Partner</label>
                      <select
                        value={transferData.logisticsPartner}
                        onChange={(e) => setTransferData({ ...transferData, logisticsPartner: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                      >
                        <option value="BlueDart Air Freight">BlueDart Air Express</option>
                        <option value="Delhivery Surface Express">Delhivery Surface</option>
                        <option value="GATI Cargo Fleet">GATI Logistics Fleet</option>
                        <option value="In-House Dedicated Truck">In-House Depot Fleet</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Manifest Notes & Reference</label>
                    <input
                      type="text"
                      value={transferData.notes}
                      onChange={(e) => setTransferData({ ...transferData, notes: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                    <Button type="button" variant="secondary" onClick={() => setIsTransferModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" icon={ArrowRightLeft}>
                      Execute Transfer Manifest
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ADD WAREHOUSE DEPOT MASTER MODAL */}
          {isAddWarehouseOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-md max-w-md w-full p-5 space-y-4 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">Register New Warehouse Depot</h3>
                  <button onClick={() => setIsAddWarehouseOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddWarehouse} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Warehouse Hub Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hyderabad South Logistics Hub"
                      value={newWh.name}
                      onChange={(e) => setNewWh({ ...newWh, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Location & State</label>
                    <input
                      type="text"
                      placeholder="e.g. Gachibowli, Telangana"
                      value={newWh.location}
                      onChange={(e) => setNewWh({ ...newWh, location: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Max Capacity</label>
                      <input
                        type="text"
                        placeholder="75,000 units"
                        value={newWh.capacity}
                        onChange={(e) => setNewWh({ ...newWh, capacity: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Hub Manager</label>
                      <input
                        type="text"
                        placeholder="Manager Name"
                        value={newWh.manager}
                        onChange={(e) => setNewWh({ ...newWh, manager: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Dispatch SLA Policy</label>
                    <select
                      value={newWh.dispatchSla}
                      onChange={(e) => setNewWh({ ...newWh, dispatchSla: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                    >
                      <option value="Same-Day Dispatch">Same-Day Shipping Dispatch</option>
                      <option value="24-Hour Express">24-Hour Express Logistics</option>
                      <option value="48-Hour Regional Hub">48-Hour Regional Transport</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                    <Button type="button" variant="secondary" onClick={() => setIsAddWarehouseOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      Save Warehouse Depot
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

