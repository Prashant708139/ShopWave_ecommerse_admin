import React, { useState } from 'react';
import {
  Tag,
  Plus,
  Search,
  Sliders,
  Sparkles,
  Layers,
  Edit2,
  Trash2,
  Check,
  X,
  Palette,
  CheckCircle2,
  Grid,
  Zap,
  Filter,
  Package,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { CatalogPageHeader } from './CatalogPageHeader';

const TYPE_PRESETS = [
  { label: 'Color Palette', value: 'Color Palette', desc: 'Visual color swatches with HEX codes' },
  { label: 'Selection Pill', value: 'Selection Pill', desc: 'Clickable button pills (Storage, RAM, Specs)' },
  { label: 'Size Guide Pill', value: 'Size Guide Pill', desc: 'Sizing chart badges (XS, S, M, L, XL)' },
  { label: 'Number Pill', value: 'Number Pill', desc: 'Numeric measurement pills (Shoe size, Dimensions)' },
  { label: 'Text Badge', value: 'Text Badge', desc: 'Detailed specifications and warranty tags' },
];

const CATEGORY_OPTIONS = [
  'All Categories',
  'Electronics',
  'Fashion & Apparel',
  'Home & Living',
  'Beauty & Personal Care',
  'Sports & Fitness',
  'Books & Stationery'
];

export const AttributeManagementView = () => {
  const {
    attributes,
    addAttribute,
    updateAttribute,
    deleteAttribute,
    toggleAttributeFlag,
    addAttributeValue,
    deleteAttributeValue,
    showToast
  } = useApp();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [driverFilter, setDriverFilter] = useState('all'); // all | variant | spec

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAttrId, setEditingAttrId] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: 'Selection Pill',
    category: 'All Categories',
    isVariantDriver: true,
    isFilterable: true,
    values: []
  });

  // Quick Add Value inline on Cards
  const [quickValueInputs, setQuickValueInputs] = useState({});
  const [quickHexInputs, setQuickHexInputs] = useState({});

  // Modal Value Inputs
  const [newValLabel, setNewValLabel] = useState('');
  const [newValHex, setNewValHex] = useState('#2563EB');
  const [newValMeta, setNewValMeta] = useState('');

  // Open Modal for New Attribute
  const handleOpenAdd = () => {
    setEditingAttrId(null);
    setFormData({
      name: '',
      code: '',
      type: 'Selection Pill',
      category: 'All Categories',
      isVariantDriver: true,
      isFilterable: true,
      values: [
        { id: `val-${Date.now()}-1`, label: 'Option 1', meta: 'Default' }
      ]
    });
    setNewValLabel('');
    setNewValMeta('');
    setIsModalOpen(true);
  };

  // Open Modal for Edit Attribute
  const handleOpenEdit = (attr) => {
    setEditingAttrId(attr.id);
    setFormData({
      name: attr.name,
      code: attr.code,
      type: attr.type,
      category: attr.category || 'All Categories',
      isVariantDriver: attr.isVariantDriver !== undefined ? attr.isVariantDriver : true,
      isFilterable: attr.isFilterable !== undefined ? attr.isFilterable : true,
      values: attr.values ? [...attr.values] : []
    });
    setNewValLabel('');
    setNewValMeta('');
    setIsModalOpen(true);
  };

  // Save Modal Form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Please provide an attribute name.', 'error');
      return;
    }

    const code = formData.code.trim() || formData.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_');

    if (editingAttrId) {
      updateAttribute(editingAttrId, {
        name: formData.name.trim(),
        code,
        type: formData.type,
        category: formData.category,
        isVariantDriver: formData.isVariantDriver,
        isFilterable: formData.isFilterable,
        values: formData.values
      });
    } else {
      addAttribute({
        name: formData.name.trim(),
        code,
        type: formData.type,
        category: formData.category,
        isVariantDriver: formData.isVariantDriver,
        isFilterable: formData.isFilterable,
        values: formData.values
      });
    }

    setIsModalOpen(false);
  };

  // Add value inside Modal
  const handleModalAddValue = () => {
    if (!newValLabel.trim()) return;
    const item = {
      id: `val-${Date.now()}`,
      label: newValLabel.trim(),
      hex: formData.type === 'Color Palette' ? newValHex : undefined,
      meta: newValMeta.trim() || undefined
    };
    setFormData(prev => ({
      ...prev,
      values: [...prev.values, item]
    }));
    setNewValLabel('');
    setNewValMeta('');
  };

  // Remove value inside Modal
  const handleModalRemoveValue = (valId) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.filter(v => v.id !== valId)
    }));
  };

  // Quick Inline Add Value on Card
  const handleQuickAddValueSubmit = (attrId, type) => {
    const label = quickValueInputs[attrId]?.trim();
    if (!label) return;

    const hex = type === 'Color Palette' ? (quickHexInputs[attrId] || '#2563EB') : undefined;

    addAttributeValue(attrId, {
      label,
      hex,
      meta: 'Quick Added'
    });

    setQuickValueInputs(prev => ({ ...prev, [attrId]: '' }));
  };

  // Filter attributes logic
  const filteredAttributes = attributes.filter(attr => {
    const matchesSearch = attr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attr.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attr.values.some(v => (v.label || v).toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === 'All Categories' || attr.category === categoryFilter;

    const matchesDriver = driverFilter === 'all' ? true :
      driverFilter === 'variant' ? attr.isVariantDriver : !attr.isVariantDriver;

    return matchesSearch && matchesCategory && matchesDriver;
  });

  // Calculate Metrics
  const totalValuesCount = attributes.reduce((sum, a) => sum + (a.values ? a.values.length : 0), 0);
  const variantDriversCount = attributes.filter(a => a.isVariantDriver).length;
  const filterableCount = attributes.filter(a => a.isFilterable).length;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-16">
      {/* PAGE HEADER */}
      <CatalogPageHeader
        title="Product Attribute Dictionary"
        description="Manage configurable variant drivers, color swatches, and storefront filter facets"
        action={
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={handleOpenAdd}
          >
            Add New Attribute
          </Button>
        }
      />

      {/* KPI STATS CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-xl pt-4 pb-3.5 px-4 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600" />
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Total Attributes
            </span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900 tracking-tight">
                {attributes.length}
              </span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                Master Dictionary 📚
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Active Store Catalog Attributes
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl pt-4 pb-3.5 px-4 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              SKU Variant Drivers
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900 tracking-tight">
                {variantDriversCount}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Matrix SKUs ⚡
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Generates Price & Stock SKUs
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl pt-4 pb-3.5 px-4 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500" />
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Storefront Filters
            </span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100">
              <Filter className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900 tracking-tight">
                {filterableCount}
              </span>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                Search Facets 🔍
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Sidebar Storefront Filters
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl pt-4 pb-3.5 px-4 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Value Variants
            </span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg border border-amber-100">
              <Grid className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900 tracking-tight">
                {totalValuesCount}
              </span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Option Swatches 🎨
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Configurable Values & Pills
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH, FILTERS & ACTION BAR */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 flex-wrap">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search attributes by name, code, or value swatches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-slate-800 font-medium cursor-pointer"
          >
            {CATEGORY_OPTIONS.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Driver Filter Segmented Control */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setDriverFilter('all')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                driverFilter === 'all' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({attributes.length})
            </button>
            <button
              onClick={() => setDriverFilter('variant')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                driverFilter === 'variant' ? 'bg-white text-emerald-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚡ Drivers ({variantDriversCount})
            </button>
            <button
              onClick={() => setDriverFilter('spec')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                driverFilter === 'spec' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏷️ Specs ({attributes.length - variantDriversCount})
            </button>
          </div>
        </div>

        <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
          Showing {filteredAttributes.length} of {attributes.length} Attributes
        </span>
      </div>

      {/* ATTRIBUTE CARDS GRID */}
      {filteredAttributes.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3 shadow-xs">
          <Tag className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No Product Attributes Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No attributes match your filter criteria. Click below to add a new attribute to your store dictionary.
          </p>
          <Button variant="primary" icon={Plus} onClick={handleOpenAdd}>
            Create Attribute
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredAttributes.map((attr) => (
            <div
              key={attr.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-400 transition-all space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Card Top Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 text-slate-700 rounded-lg border border-slate-200 flex-shrink-0">
                      {attr.type === 'Color Palette' ? (
                        <Palette className="w-5 h-5 text-indigo-600" />
                      ) : attr.type === 'Size Guide Pill' || attr.type === 'Number Pill' ? (
                        <Layers className="w-5 h-5 text-emerald-600" />
                      ) : attr.type === 'Selection Pill' ? (
                        <Sliders className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Tag className="w-5 h-5 text-amber-600" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-base">{attr.name}</h4>
                        <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          code: {attr.code}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap text-[11px]">
                        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded font-bold">
                          {attr.type}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium border border-slate-200">
                          {attr.category || 'All Categories'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(attr)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit Attribute Specs"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteAttribute(attr.id, attr.name)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Attribute"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Status Flags Row */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => toggleAttributeFlag(attr.id, 'isVariantDriver')}
                    className={`flex items-center justify-between p-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      attr.isVariantDriver
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <Zap className={`w-3.5 h-3.5 ${attr.isVariantDriver ? 'text-emerald-600 fill-emerald-600' : ''}`} />
                      Variant Matrix Driver
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${attr.isVariantDriver ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'}`}>
                      {attr.isVariantDriver ? 'YES' : 'NO'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleAttributeFlag(attr.id, 'isFilterable')}
                    className={`flex items-center justify-between p-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      attr.isFilterable
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <Filter className={`w-3.5 h-3.5 ${attr.isFilterable ? 'text-indigo-600' : ''}`} />
                      Storefront Filterable
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${attr.isFilterable ? 'bg-indigo-600 text-white' : 'bg-slate-300 text-slate-700'}`}>
                      {attr.isFilterable ? 'YES' : 'NO'}
                    </span>
                  </button>
                </div>

                {/* Values Swatches & Pills Section */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Active Option Swatches ({attr.values ? attr.values.length : 0})
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Updated {attr.lastUpdated || 'Sep 19, 2026'}
                    </span>
                  </div>

                  {/* Values Flex Badges */}
                  <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-lg border border-slate-200">
                    {attr.values && attr.values.map((vItem) => {
                      const valId = vItem.id || vItem;
                      const label = vItem.label || vItem;
                      const hex = vItem.hex;
                      const meta = vItem.meta;

                      return (
                        <div
                          key={valId}
                          className="group/val inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-slate-800 border border-slate-300 rounded-md text-xs font-medium shadow-2xs hover:border-blue-400 transition-colors"
                        >
                          {hex && (
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs flex-shrink-0"
                              style={{ backgroundColor: hex }}
                              title={`HEX: ${hex}`}
                            />
                          )}
                          <span className="font-semibold text-slate-900">{label}</span>
                          {meta && (
                            <span className="text-[10px] text-slate-500 font-normal">({meta})</span>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteAttributeValue(attr.id, valId)}
                            className="text-slate-300 hover:text-rose-600 ml-0.5 transition-colors cursor-pointer"
                            title="Remove value variant"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quick Inline Add Value on Card */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                {attr.type === 'Color Palette' && (
                  <input
                    type="color"
                    value={quickHexInputs[attr.id] || '#2563EB'}
                    onChange={(e) => setQuickHexInputs({ ...quickHexInputs, [attr.id]: e.target.value })}
                    className="w-8 h-8 rounded border border-slate-300 cursor-pointer flex-shrink-0"
                    title="Select swatch color"
                  />
                )}
                <input
                  type="text"
                  placeholder={`Add new option value (e.g. ${attr.type === 'Color Palette' ? 'Titanium Silver' : attr.type === 'Selection Pill' ? '128GB' : 'XL'})...`}
                  value={quickValueInputs[attr.id] || ''}
                  onChange={(e) => setQuickValueInputs({ ...quickValueInputs, [attr.id]: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleQuickAddValueSubmit(attr.id, attr.type);
                    }
                  }}
                  className="flex-1 text-xs px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => handleQuickAddValueSubmit(attr.id, attr.type)}
                  className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-xs transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT ATTRIBUTE MASTER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="flex-shrink-0 px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between z-10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {editingAttrId ? 'Edit Product Attribute Specs' : 'Create New Product Attribute'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Define configurable swatches, variant drivers, and storefront filters
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden min-h-0">
              <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
                {/* Attribute Title & Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Attribute Display Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Storage Capacity, Shoe Size"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Attribute Code / Slug
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. storage_capacity"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-slate-900 font-mono"
                    />
                  </div>
                </div>

                {/* Type & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      UI Widget Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-slate-900 font-bold cursor-pointer"
                    >
                      {TYPE_PRESETS.map(tp => (
                        <option key={tp.value} value={tp.value}>{tp.label} - ({tp.desc})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Target Catalog Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-slate-900 font-medium cursor-pointer"
                    >
                      {CATEGORY_OPTIONS.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Feature Switches */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isVariantDriver}
                      onChange={(e) => setFormData({ ...formData, isVariantDriver: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">SKU Variant Driver ⚡</span>
                      <span className="text-[10px] text-slate-500">Generates product pricing & stock matrix</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFilterable}
                      onChange={(e) => setFormData({ ...formData, isFilterable: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">Storefront Filter 🔍</span>
                      <span className="text-[10px] text-slate-500">Displays in storefront search sidebar</span>
                    </div>
                  </label>
                </div>

                {/* Values List Builder */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <Grid className="w-4 h-4 text-blue-600" /> Predefined Option Swatches & Values ({formData.values.length})
                    </h4>
                  </div>

                  {/* Add Value Controls Row */}
                  <div className="flex items-center gap-2 bg-slate-100 p-3 rounded-xl border border-slate-200">
                    {formData.type === 'Color Palette' && (
                      <input
                        type="color"
                        value={newValHex}
                        onChange={(e) => setNewValHex(e.target.value)}
                        className="w-8 h-8 rounded border border-slate-300 cursor-pointer flex-shrink-0"
                      />
                    )}
                    <input
                      type="text"
                      placeholder="Option Value Label (e.g. Jet Black, 256GB, XL)..."
                      value={newValLabel}
                      onChange={(e) => setNewValLabel(e.target.value)}
                      className="flex-1 text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-slate-900 font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Subtitle / Meta info (e.g. Chest 38'')..."
                      value={newValMeta}
                      onChange={(e) => setNewValMeta(e.target.value)}
                      className="w-1/3 text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={handleModalAddValue}
                      className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>

                  {/* List of Values */}
                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                    {formData.values.map((v) => (
                      <div
                        key={v.id}
                        className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 text-xs shadow-2xs hover:border-slate-300"
                      >
                        <div className="flex items-center gap-2">
                          {v.hex && (
                            <span
                              className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs"
                              style={{ backgroundColor: v.hex }}
                            />
                          )}
                          <span className="font-bold text-slate-900">{v.label}</span>
                          {v.meta && <span className="text-slate-500 font-medium">({v.meta})</span>}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleModalRemoveValue(v.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex-shrink-0 px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3 z-10">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" icon={Check}>
                  {editingAttrId ? 'Save Attribute Changes' : 'Create Attribute'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
