import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { ImageAssetPicker } from '../ui/ImageAssetPicker';
import { RichTextEditor } from '../ui/RichTextEditor';
import {
  FolderTree,
  ChevronRight,
  ChevronDown,
  Plus,
  Save,
  Trash2,
  Search,
  Image as ImageIcon,
  Folder,
  Layers,
  Sparkles,
  Tag,
  Globe,
  CheckCircle2,
  XCircle,
  FileText
} from 'lucide-react';

export const CategoryManagementView = () => {
  const { categoryTree, addCategoryItem, showToast } = useApp();

  const [selectedCategoryId, setSelectedCategoryId] = useState('cat-electronics');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNodes, setExpandedNodes] = useState({
    'cat-electronics': true,
    'cat-fashion': true,
    'cat-home': false,
    'cat-beauty': false
  });

  // Find currently selected category item across tree
  const findNode = (nodes, id) => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const activeCategoryNode = findNode(categoryTree, selectedCategoryId) || categoryTree[0] || {
    id: 'cat-electronics',
    name: 'Electronics',
    count: 1245,
    children: []
  };

  // Category Editor Form State
  const [catFormData, setCatFormData] = useState({
    name: activeCategoryNode.name,
    parent: 'root',
    slug: activeCategoryNode.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: `Official catalog classification for ${activeCategoryNode.name} products.`,
    bannerUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&q=80',
    displayOrder: '1',
    status: 'Active',
    featured: true,
    metaTitle: `${activeCategoryNode.name} Category - ShopWave Store`,
    metaDescription: `Browse the best collection of ${activeCategoryNode.name} with warranty and fast shipping.`
  });

  // Dynamic Specification Attributes for this category
  const [categoryAttributes, setCategoryAttributes] = useState([
    { name: 'Brand / Manufacturer', type: 'Select Dropdown', required: true },
    { name: 'Warranty Period', type: 'Text Input', required: true },
    { name: 'Model Number / SKU', type: 'Text Input', required: true }
  ]);

  const [newAttrInput, setNewAttrInput] = useState('');

  // Subcategory Quick Creation Modal/Inline
  const [newSubcatName, setNewSubcatName] = useState('');

  const toggleExpand = (nodeId) => {
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const handleSelectNode = (node) => {
    setSelectedCategoryId(node.id);
    setCatFormData({
      name: node.name,
      parent: 'root',
      slug: node.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: `Official catalog classification for ${node.name} products.`,
      bannerUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&q=80',
      displayOrder: '1',
      status: 'Active',
      featured: true,
      metaTitle: `${node.name} Category - ShopWave Store`,
      metaDescription: `Browse the best collection of ${node.name} with warranty and fast shipping.`
    });
  };

  const handleAddSubcategorySubmit = (e) => {
    e.preventDefault();
    if (!newSubcatName.trim()) return;
    addCategoryItem(selectedCategoryId, newSubcatName.trim());
    showToast(`Subcategory "${newSubcatName}" added under ${activeCategoryNode.name}!`);
    setNewSubcatName('');
  };

  const handleAddAttribute = (e) => {
    e.preventDefault();
    if (!newAttrInput.trim()) return;
    setCategoryAttributes(prev => [
      ...prev,
      { name: newAttrInput.trim(), type: 'Text Input', required: false }
    ]);
    setNewAttrInput('');
    showToast('Category dynamic attribute field added!');
  };

  const handleRemoveAttribute = (idx) => {
    setCategoryAttributes(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    showToast(`Category "${catFormData.name}" changes updated successfully!`);
  };

  // Render tree recursively
  const renderTreeNodes = (nodes) => {
    return (
      <div className="space-y-1 pl-2">
        {nodes.map(node => {
          const isExpanded = expandedNodes[node.id];
          const hasChildren = node.children && node.children.length > 0;
          const isSelected = node.id === selectedCategoryId;

          const matchesSearch = !searchTerm || node.name.toLowerCase().includes(searchTerm.toLowerCase());

          if (!matchesSearch && !hasChildren) return null;

          return (
            <div key={node.id} className="space-y-1">
              <div
                onClick={() => handleSelectNode(node)}
                className={`group flex items-center justify-between px-3 py-2 rounded-md cursor-pointer text-xs transition-colors ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                    : 'hover:bg-slate-100 text-slate-700 font-medium'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(node.id);
                      }}
                      className="p-0.5 text-slate-400 hover:text-slate-700 rounded-md"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                  ) : (
                    <span className="w-3.5 inline-block" />
                  )}

                  <Folder className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="truncate">{node.name}</span>
                </div>

                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {node.count || 0}
                </span>
              </div>

              {hasChildren && isExpanded && renderTreeNodes(node.children)}
            </div>
          );
        })}
      </div>
    );
  };

  const statusOptions = [
    { value: 'Active', label: 'Active / Published' },
    { value: 'Draft', label: 'Draft / Hidden' },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-16">
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Catalog</span>
            <span>/</span>
            <span className="font-semibold text-slate-800">Category Taxonomy Master</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-blue-600" /> Category & Store Taxonomy Master Page
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage store structure, subcategories hierarchy, and dynamic product attribute schemas
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => {
              addCategoryItem('cat-all', 'New Root Category');
              showToast('New Root Category created!');
            }}
          >
            Create Root Category
          </Button>
        </div>
      </div>

      {/* Main Split Layout: Left Tree Navigator (320px) | Right Master Form & Data Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel: Category Hierarchy Tree */}
        <div className="lg:col-span-4 bg-white rounded-md border border-slate-200 p-4 space-y-4 shadow-xs">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" /> Category Tree Navigator
            </h3>
            <span className="text-[11px] font-semibold text-slate-500">
              4,320 Products
            </span>
          </div>

          {/* Search Category Node */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search category hierarchy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 placeholder-slate-400"
            />
          </div>

          {/* Recursive Tree Container */}
          <div className="max-h-[600px] overflow-y-auto pr-1">
            {renderTreeNodes(categoryTree)}
          </div>
        </div>

        {/* Right Panel: Selected Category Editor & Subcategories */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Selected Category Details Form */}
          <form onSubmit={handleSaveCategory} className="bg-white rounded-md border border-slate-200 p-5 space-y-5 shadow-xs">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    Category: {activeCategoryNode.name}
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" /> Published
                  </span>
                </div>
                <p className="text-xs text-slate-500">ID: <code className="font-mono text-slate-700">{activeCategoryNode.id}</code></p>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={Save}
              >
                Save Changes
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={catFormData.name}
                  onChange={(e) => setCatFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={catFormData.slug}
                  onChange={(e) => setCatFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parent Category
                </label>
                <input
                  type="text"
                  disabled
                  value={activeCategoryNode.name === 'Electronics' || activeCategoryNode.name === 'Fashion' ? 'Root Category (Top Level)' : 'Electronics Main'}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-500 font-medium cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Display Order Index
                </label>
                <input
                  type="number"
                  value={catFormData.displayOrder}
                  onChange={(e) => setCatFormData(prev => ({ ...prev, displayOrder: e.target.value }))}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category Store Description & Guidelines
              </label>
              <RichTextEditor
                value={catFormData.description}
                onChange={(val) => setCatFormData(prev => ({ ...prev, description: val }))}
                placeholder="Write category description, SEO guide, and promotional copy..."
                minHeight="140px"
              />
            </div>

            {/* Banner Media Picker */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category Store Banner & Featured Assets
              </label>
              <ImageAssetPicker
                images={catFormData.bannerUrl ? [catFormData.bannerUrl] : []}
                primaryImage={catFormData.bannerUrl}
                multiple={false}
                onImagesChange={(imgs) => {
                  if (imgs.length > 0) {
                    setCatFormData(prev => ({ ...prev, bannerUrl: imgs[0] }));
                  }
                }}
                onPrimaryImageChange={(primary) => {
                  setCatFormData(prev => ({ ...prev, bannerUrl: primary }));
                }}
              />
            </div>
          </form>

          {/* Card 2: Dynamic Product Schema / Default Attributes */}
          <div className="bg-white rounded-md border border-slate-200 p-5 space-y-4 shadow-xs">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Dynamic Product Specification Schema
                </h3>
                <p className="text-xs text-slate-500">
                  Products in <strong>{activeCategoryNode.name}</strong> will inherit these dynamic specification fields
                </p>
              </div>
            </div>

            {/* Add Field */}
            <form onSubmit={handleAddAttribute} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Battery Capacity (mAh), RAM, Sole Material..."
                value={newAttrInput}
                onChange={(e) => setNewAttrInput(e.target.value)}
                className="flex-1 text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
              />
              <Button type="submit" variant="secondary" size="md" icon={Plus}>
                Add Field Schema
              </Button>
            </form>

            <div className="space-y-2 pt-1">
              {categoryAttributes.map((attr, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-200 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Tag className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-bold text-slate-900">{attr.name}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-mono">
                      {attr.type}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveAttribute(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Subcategories Data Table & Direct Add */}
          <div className="bg-white rounded-md border border-slate-200 p-5 space-y-4 shadow-xs">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Subcategories under {activeCategoryNode.name}
                </h3>
                <p className="text-xs text-slate-500">Sub-level child classifications</p>
              </div>
            </div>

            {/* Quick Add Subcategory Form */}
            <form onSubmit={handleAddSubcategorySubmit} className="flex gap-2">
              <input
                type="text"
                required
                placeholder={`New subcategory under ${activeCategoryNode.name}...`}
                value={newSubcatName}
                onChange={(e) => setNewSubcatName(e.target.value)}
                className="flex-1 text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
              />
              <Button type="submit" variant="primary" size="md" icon={Plus}>
                Add Subcategory
              </Button>
            </form>

            {/* Table */}
            <div className="border border-slate-200 rounded-md overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Subcategory Name</th>
                    <th className="py-2.5 px-3">Slug</th>
                    <th className="py-2.5 px-3 text-center">Products Count</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {activeCategoryNode.children && activeCategoryNode.children.length > 0 ? (
                    activeCategoryNode.children.map(child => (
                      <tr key={child.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2">
                          <Folder className="w-4 h-4 text-blue-600" />
                          {child.name}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500">{child.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}</td>
                        <td className="py-3 px-3 text-center font-bold text-slate-900">{child.count || 0}</td>
                        <td className="py-3 px-3 text-right space-x-1">
                          <button
                            type="button"
                            onClick={() => handleSelectNode(child)}
                            className="px-2 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md"
                          >
                            Edit Node
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-6 text-center text-slate-400">
                        No child subcategories under {activeCategoryNode.name} yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
