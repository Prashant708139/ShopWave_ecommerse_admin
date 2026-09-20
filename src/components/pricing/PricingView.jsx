import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import {
  Plus,
  Tag,
  BadgePercent,
  CheckCircle2,
  Trash2,
  Edit2,
  X,
  Sparkles,
  ArrowLeft,
  SlidersHorizontal,
  Download,
  DollarSign,
  TrendingDown,
  Layers,
  Save
} from 'lucide-react';

export const PricingView = ({ initialTab = 'rules' }) => {
  const { products, showToast, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState(initialTab === 'pricelists' ? 'pricelists' : 'rules');

  const [rules, setRules] = useState([
    { id: 1, name: 'Wholesale B2B Bulk Tier', condition: 'Order Qty >= 50 units', discount: '15% Off Total', appliesTo: 'All Catalog', status: 'Active' },
    { id: 2, name: 'VIP Loyalty Discount', condition: 'VIP Role Users', discount: '10% Storewide', appliesTo: 'Electronics & Fashion', status: 'Active' },
    { id: 3, name: 'Festival Clearance Rule', condition: 'Items marked clearance', discount: 'Up to 40% Off', appliesTo: 'Summer Stock', status: 'Active' },
    { id: 4, name: 'Free Shipping Threshold', condition: 'Order Total >= ₹999', discount: '₹99 Shipping Waived', appliesTo: 'All Orders', status: 'Active' },
  ]);

  const [priceLists, setPriceLists] = useState([
    { id: 1, title: 'Standard Retail Price List', currency: 'INR (₹)', targetGroup: 'B2C Retail Shoppers', itemsCount: 4320, isDefault: true, discountTier: '0% (Standard Retail)' },
    { id: 2, title: 'Wholesale & Distributor Matrix', currency: 'INR (₹)', targetGroup: 'B2B Verified Merchants', itemsCount: 1250, isDefault: false, discountTier: '15% Tier Discount' },
    { id: 3, title: 'Global Export Catalog (USD)', currency: 'USD ($)', targetGroup: 'International Shipments', itemsCount: 890, isDefault: false, discountTier: 'Export Exchange Matrix' },
  ]);

  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);
  const [newRule, setNewRule] = useState({ name: '', condition: '', discount: '', appliesTo: 'All Catalog' });

  const [isAddListOpen, setIsAddListOpen] = useState(false);
  const [newList, setNewList] = useState({ title: '', targetGroup: 'B2B Buyers', currency: 'INR (₹)' });

  // Configure Price Matrix Modal State
  const [selectedListForMatrix, setSelectedListForMatrix] = useState(null);
  const [matrixOverrides, setMatrixOverrides] = useState({});

  const handleOpenMatrix = (list) => {
    setSelectedListForMatrix(list);
    const initialOverrides = {};
    products.forEach(p => {
      const isWholesale = list.title.toLowerCase().includes('wholesale');
      const isExport = list.currency.includes('USD');
      
      let targetPrice = p.price;
      if (isWholesale) targetPrice = Math.round(p.price * 0.85);
      else if (isExport) targetPrice = Math.round((p.price / 85) * 1.1);

      initialOverrides[p.id] = {
        overridePrice: targetPrice,
        bulkPrice: Math.round(targetPrice * 0.9),
        moq: isWholesale ? 10 : 1
      };
    });
    setMatrixOverrides(initialOverrides);
  };

  const handleOverrideChange = (productId, field, value) => {
    setMatrixOverrides(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: Number(value) || 0
      }
    }));
  };

  const handleSaveMatrix = (e) => {
    e.preventDefault();
    showToast(`Price Matrix overrides saved successfully for "${selectedListForMatrix?.title}"!`);
    setSelectedListForMatrix(null);
  };

  const handleExportMatrixCSV = (list) => {
    const headers = 'Product ID,Name,SKU,Standard Retail Price,Matrix Tier Price,Bulk Price (10+ Units),MOQ\n';
    const rows = products
      .map(p => {
        const over = matrixOverrides[p.id] || { overridePrice: p.price, bulkPrice: Math.round(p.price * 0.9), moq: 1 };
        return `"${p.id}","${p.name}","${p.sku}",${p.price},${over.overridePrice},${over.bulkPrice},${over.moq}`;
      })
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Price_Matrix_${list.title.replace(/\s+/g, '_')}.csv`;
    a.click();
    showToast(`Exported Price Matrix for "${list.title}" to CSV!`);
  };

  const handleAddRuleSubmit = (e) => {
    e.preventDefault();
    if (!newRule.name) return;
    const rule = {
      id: Date.now(),
      name: newRule.name,
      condition: newRule.condition || 'Minimum 1 item',
      discount: newRule.discount || '10% OFF',
      appliesTo: newRule.appliesTo,
      status: 'Active',
    };
    setRules([rule, ...rules]);
    setNewRule({ name: '', condition: '', discount: '', appliesTo: 'All Catalog' });
    setIsAddRuleOpen(false);
    showToast(`Price rule "${rule.name}" created successfully!`);
  };

  const handleAddListSubmit = (e) => {
    e.preventDefault();
    if (!newList.title) return;
    const list = {
      id: Date.now(),
      title: newList.title,
      currency: newList.currency,
      targetGroup: newList.targetGroup,
      itemsCount: products.length || 100,
      isDefault: false,
      discountTier: 'Custom Margin Matrix'
    };
    setPriceLists([...priceLists, list]);
    setNewList({ title: '', targetGroup: 'B2B Buyers', currency: 'INR (₹)' });
    setIsAddListOpen(false);
    showToast(`Price List "${list.title}" created successfully!`);
  };

  const toggleRuleStatus = (id) => {
    setRules(rules.map(r => r.id === id ? { ...r, status: r.status === 'Active' ? 'Disabled' : 'Active' } : r));
    showToast('Rule status updated!');
  };

  const deleteRule = (id) => {
    setRules(rules.filter(r => r.id !== id));
    showToast('Price rule removed.');
  };

  const handleDeletePriceList = (id, title) => {
    setPriceLists(priceLists.filter(p => p.id !== id));
    if (selectedListForMatrix?.id === id) setSelectedListForMatrix(null);
    showToast(`Price List "${title}" deleted.`);
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
              <BadgePercent className="w-5 h-5 text-blue-600" /> Pricing Engine & Margins
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure global price rules, wholesale tiers, and currency price matrices
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-md">
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'rules' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tag className="w-3.5 h-3.5 inline mr-1.5" /> Discount Rules ({rules.length})
          </button>
          <button
            onClick={() => setActiveTab('pricelists')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'pricelists' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BadgePercent className="w-3.5 h-3.5 inline mr-1.5" /> Price Lists ({priceLists.length})
          </button>
        </div>
      </div>

      {activeTab === 'rules' ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Automated Discount & Margin Rules</h3>
              <p className="text-xs text-slate-500">Rules applied dynamically during customer checkout</p>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={() => setIsAddRuleOpen(true)}
            >
              Add Price Rule
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {rules.map((rule) => (
              <div key={rule.id} className="bg-white p-4 sm:p-5 rounded-md border border-slate-200 shadow-xs space-y-3 hover:border-blue-400 transition-all flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600" /> {rule.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleRuleStatus(rule.id)}
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold cursor-pointer ${
                          rule.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {rule.status}
                      </button>
                      <button
                        onClick={() => deleteRule(rule.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-md cursor-pointer"
                        title="Delete Rule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-md border border-slate-200">
                    <p><span className="font-semibold text-slate-800">Condition:</span> {rule.condition}</p>
                    <p><span className="font-semibold text-slate-800">Benefit:</span> <span className="font-bold text-blue-600">{rule.discount}</span></p>
                    <p><span className="font-semibold text-slate-800">Scope:</span> {rule.appliesTo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Price Rule Modal */}
          {isAddRuleOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-md max-w-md w-full p-5 space-y-4 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">Create Pricing Rule</h3>
                  <button onClick={() => setIsAddRuleOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddRuleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Rule Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Festival B2B Tier"
                      value={newRule.name}
                      onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Condition Trigger</label>
                    <input
                      type="text"
                      placeholder="e.g. Order Total >= ₹2000"
                      value={newRule.condition}
                      onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Discount Benefit</label>
                      <input
                        type="text"
                        placeholder="e.g. 20% OFF"
                        value={newRule.discount}
                        onChange={(e) => setNewRule({ ...newRule, discount: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Applies To</label>
                      <input
                        type="text"
                        placeholder="All Catalog / Category"
                        value={newRule.appliesTo}
                        onChange={(e) => setNewRule({ ...newRule, appliesTo: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                    <Button type="button" variant="secondary" onClick={() => setIsAddRuleOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      Save Rule
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        /* PRICE LISTS SUB-PAGE */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Multi-Currency & Customer Tier Price Lists</h3>
              <p className="text-xs text-slate-500">Customized price catalogs assigned to wholesale buyers or VIP groups</p>
            </div>
            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={() => setIsAddListOpen(true)}
            >
              Add Price List
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {priceLists.map((list) => (
              <div key={list.id} className="bg-white rounded-md border border-slate-200 shadow-xs p-5 space-y-4 hover:border-blue-400 transition-all flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-md border border-blue-200 flex-shrink-0">
                      <BadgePercent className="w-6 h-6" />
                    </div>
                    {list.isDefault ? (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider">
                        Default Storefront
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        Tier List
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{list.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Target: {list.targetGroup}</p>
                  </div>

                  <div className="space-y-1 text-xs border-t border-slate-100 pt-3">
                    <div className="flex justify-between text-slate-600">
                      <span>Currency:</span>
                      <span className="font-bold text-slate-900">{list.currency}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Catalog Items:</span>
                      <span className="font-bold text-blue-600">{list.itemsCount.toLocaleString()} products</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2">
                  {!list.isDefault && (
                    <button
                      onClick={() => handleDeletePriceList(list.id, list.title)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Delete Price List"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  <Button
                    variant="secondary"
                    fullWidth
                    size="sm"
                    icon={SlidersHorizontal}
                    onClick={() => handleOpenMatrix(list)}
                  >
                    Configure Matrix
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* FULL INTERACTIVE "CONFIGURE MATRIX" MASTER INSPECTOR MODAL */}
          {selectedListForMatrix && (
            <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-md max-w-4xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
                <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase tracking-wider">
                        {selectedListForMatrix.currency} Matrix
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">{selectedListForMatrix.targetGroup}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mt-1">
                      <SlidersHorizontal className="w-6 h-6 text-blue-600" /> {selectedListForMatrix.title} Overrides Matrix
                    </h3>
                    <p className="text-xs text-slate-500">Configure item-level price overrides, bulk volume tiers, and minimum order quantities (MOQ)</p>
                  </div>

                  <button
                    onClick={() => setSelectedListForMatrix(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-800 rounded-md hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Toolbar Bar inside Matrix */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="text-xs text-slate-700 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span><strong className="font-bold">Matrix Policy:</strong> {selectedListForMatrix.discountTier}</span>
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Download}
                    onClick={() => handleExportMatrixCSV(selectedListForMatrix)}
                  >
                    Export Price Matrix CSV
                  </Button>
                </div>

                {/* Matrix Products Table */}
                <form onSubmit={handleSaveMatrix} className="space-y-4">
                  <div className="border border-slate-200 rounded-md overflow-hidden bg-white max-h-[50vh] overflow-y-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider sticky top-0 bg-slate-50 z-10">
                          <th className="py-2.5 px-3">Product Name & SKU</th>
                          <th className="py-2.5 px-3">Retail MRP</th>
                          <th className="py-2.5 px-3">Matrix Override Price</th>
                          <th className="py-2.5 px-3">Bulk Tier Price (10+ Units)</th>
                          <th className="py-2.5 px-3">MOQ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {products.map((product) => {
                          const over = matrixOverrides[product.id] || {
                            overridePrice: product.price,
                            bulkPrice: Math.round(product.price * 0.9),
                            moq: 1
                          };

                          return (
                            <tr key={product.id} className="hover:bg-slate-50">
                              <td className="py-2.5 px-3">
                                <div className="flex items-center gap-2.5">
                                  <img src={product.image} alt="" className="w-7 h-7 rounded-md object-cover border border-slate-200 flex-shrink-0" />
                                  <div>
                                    <p className="font-bold text-slate-900">{product.name}</p>
                                    <p className="text-[10px] font-mono text-slate-500">{product.sku}</p>
                                  </div>
                                </div>
                              </td>

                              <td className="py-2.5 px-3 font-semibold text-slate-500 whitespace-nowrap">
                                ₹ {product.price.toLocaleString('en-IN')}
                              </td>

                              <td className="py-2.5 px-3">
                                <div className="flex items-center gap-1">
                                  <span className="text-slate-400 font-bold">{selectedListForMatrix.currency.slice(0, 3)}</span>
                                  <input
                                    type="number"
                                    value={over.overridePrice}
                                    onChange={(e) => handleOverrideChange(product.id, 'overridePrice', e.target.value)}
                                    className="w-24 px-2 py-1 border border-slate-300 rounded-md font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                                  />
                                </div>
                              </td>

                              <td className="py-2.5 px-3">
                                <div className="flex items-center gap-1">
                                  <span className="text-slate-400 font-bold">{selectedListForMatrix.currency.slice(0, 3)}</span>
                                  <input
                                    type="number"
                                    value={over.bulkPrice}
                                    onChange={(e) => handleOverrideChange(product.id, 'bulkPrice', e.target.value)}
                                    className="w-24 px-2 py-1 border border-slate-300 rounded-md font-bold text-blue-600 focus:outline-none focus:border-blue-600"
                                  />
                                </div>
                              </td>

                              <td className="py-2.5 px-3">
                                <input
                                  type="number"
                                  min="1"
                                  value={over.moq}
                                  onChange={(e) => handleOverrideChange(product.id, 'moq', e.target.value)}
                                  className="w-16 px-2 py-1 border border-slate-300 rounded-md text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <Button type="button" variant="secondary" onClick={() => setSelectedListForMatrix(null)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" icon={Save}>
                      Save Price Matrix Overrides
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Add Price List Dialog */}
          {isAddListOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-md max-w-md w-full p-5 space-y-4 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">Create Price List</h3>
                  <button onClick={() => setIsAddListOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddListSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Price List Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. VIP Member Tier 1"
                      value={newList.title}
                      onChange={(e) => setNewList({ ...newList, title: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Currency</label>
                      <select
                        value={newList.currency}
                        onChange={(e) => setNewList({ ...newList, currency: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                      >
                        <option value="INR (₹)">INR (₹)</option>
                        <option value="USD ($)">USD ($)</option>
                        <option value="EUR (€)">EUR (€)</option>
                        <option value="AED (AED)">AED (AED)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Target Customer Group</label>
                      <input
                        type="text"
                        placeholder="e.g. B2B / VIP"
                        value={newList.targetGroup}
                        onChange={(e) => setNewList({ ...newList, targetGroup: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                    <Button type="button" variant="secondary" onClick={() => setIsAddListOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      Save List
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
