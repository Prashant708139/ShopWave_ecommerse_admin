import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Box,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  RefreshCw,
  Search,
  ArrowUpRight,
  TrendingDown,
  Building2
} from 'lucide-react';

export const InventoryView = () => {
  const { products, updateProduct, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'low', 'out'

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Inventory & Stock Manager</h2>
          <p className="text-xs text-slate-500">Monitor warehouse logistics, low stock warnings, and reorder levels</p>
        </div>

        <div className="flex items-center gap-2">
          {outOfStockItems.length > 0 && (
            <button
              onClick={handleRestockAllOutStock}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-md transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Re-stock All Out-of-Stock (+25)
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
          <p className="text-xs text-slate-400 font-medium">Total Units in Stock</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalStockUnits.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-emerald-600 font-medium">Across 8 Categories</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
          <p className="text-xs text-slate-400 font-medium">Total Asset Valuation</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">₹ {totalValuation.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-slate-400">Inventory Cost Value</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
          <p className="text-xs text-slate-400 font-medium">Low Stock Warnings</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{lowStockItems.length}</p>
          <span className="text-[11px] text-amber-600 font-medium">Less than 15 units</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
          <p className="text-xs text-slate-400 font-medium">Out of Stock Alert</p>
          <p className="text-2xl font-bold text-rose-600 mt-1">{outOfStockItems.length}</p>
          <span className="text-[11px] text-rose-600 font-medium">Requires immediate order</span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterMode === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All Stock ({products.length})
          </button>
          <button
            onClick={() => setFilterMode('low')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterMode === 'low' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Low Stock ({lowStockItems.length})
          </button>
          <button
            onClick={() => setFilterMode('out')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterMode === 'out' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
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
            className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-100 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Warehouse Location</th>
                <th className="py-3.5 px-4">Unit Price</th>
                <th className="py-3.5 px-4">Available Units</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredProducts.map((p) => {
                const isOut = (p.stock || 0) === 0;
                const isLow = (p.stock || 0) > 0 && (p.stock || 0) < 15;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover border border-slate-100" />
                        <div>
                          <p className="font-semibold text-slate-900">{p.name}</p>
                          <p className="text-[11px] text-slate-400">{p.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{p.sku}</td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        Warehouse {p.sku.slice(0, 2)}-Central
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
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Out of Stock
                        </span>
                      ) : isLow ? (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          Low Stock
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Optimal Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleRestock(p, 10)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => handleRestock(p, 50)}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                        >
                          +50
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
