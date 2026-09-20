import React, { useState } from "react";
import { Plus, Award, Tag, Layers, Search, X, Zap, ShieldCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/Button";
import {
  CATALOG_ATTRIBUTES,
  FEATURED_COLLECTIONS,
} from "../../data/catalogData";
import { AttributeCard } from "./AttributeCard";
import { BrandCard } from "./BrandCard";
import { CatalogPageHeader } from "./CatalogPageHeader";
import { CollectionCard } from "./CollectionCard";
import { CategoryManagementView } from "./CategoryManagementView";
import { AttributeManagementView } from "./AttributeManagementView";

const VIEW_CONFIG = {
  categories: {
    title: "Product Categories Taxonomy",
    description: "Manage multi-tier store classifications, menu taxonomies, and subcategories",
  },
  brands: {
    title: "Authorized Brand Partners",
    description: "Manage verified manufacturer partners and brand directory",
  },
  attributes: {
    title: "Product Attribute Dictionary",
    description: "Configurable variant attributes for colors, sizing, and specs",
  },
  collections: {
    title: "Storefront Collections & Lookbooks",
    description: "Curated promotional groupings, seasonal banners, and lookbooks",
  },
};

const BANNER_PRESETS = [
  { label: "Diwali Festive Deals", url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80" },
  { label: "Flagship Smartphones", url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80" },
  { label: "Autumn Fashion", url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80" },
  { label: "Home Decor & Luxe", url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" },
  { label: "Gym & Fitness Gear", url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80" },
];

export const CatalogViews = ({ viewType = "categories" }) => {
  const { brands, addBrandItem, deleteBrandItem, showToast } = useApp();
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandCategory, setNewBrandCategory] = useState("Electronics");
  const [searchTerm, setSearchTerm] = useState("");

  // Collections State
  const [collections, setCollections] = useState(FEATURED_COLLECTIONS);
  const [isAddCollectionOpen, setIsAddCollectionOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [newCollection, setNewCollection] = useState({
    title: "",
    itemsCount: 24,
    banner: BANNER_PRESETS[0].url,
    status: "Active",
  });

  const pageConfig = VIEW_CONFIG[viewType] || VIEW_CONFIG.categories;

  // If viewType is categories, render the Category Master Page
  if (viewType === "categories") {
    return <CategoryManagementView />;
  }

  // If viewType is attributes, render the Attribute Master Page
  if (viewType === "attributes") {
    return <AttributeManagementView />;
  }

  const handleAddBrand = (event) => {
    event.preventDefault();
    const name = newBrandName.trim();
    if (!name) {
      showToast("Please enter a brand name.", "error");
      return;
    }
    const success = addBrandItem({ name, category: newBrandCategory });
    if (success) {
      setNewBrandName("");
    }
  };

  const handleCreateCollection = (e) => {
    e.preventDefault();
    if (!newCollection.title.trim()) return;

    const item = {
      id: `collection-${Date.now()}`,
      title: newCollection.title.trim(),
      itemsCount: Number(newCollection.itemsCount) || 0,
      banner: newCollection.banner.trim() || BANNER_PRESETS[0].url,
      status: newCollection.status || "Active",
    };

    setCollections([item, ...collections]);
    setNewCollection({
      title: "",
      itemsCount: 24,
      banner: BANNER_PRESETS[0].url,
      status: "Active",
    });
    setIsAddCollectionOpen(false);
    showToast(`Collection "${item.title}" created successfully!`);
  };

  const handleUpdateCollection = (e) => {
    e.preventDefault();
    if (!editingCollection || !editingCollection.title.trim()) return;

    setCollections(
      collections.map((c) => (c.id === editingCollection.id ? editingCollection : c))
    );
    showToast(`Collection "${editingCollection.title}" updated!`);
    setEditingCollection(null);
  };

  const handleDeleteCollection = (id, title) => {
    setCollections(collections.filter((c) => c.id !== id));
    showToast(`Collection "${title}" deleted.`);
  };

  const toggleCollectionStatus = (id) => {
    setCollections(
      collections.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === "Active" ? "Draft" : "Active";
          showToast(`Collection status changed to ${nextStatus}`);
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const filteredBrands = brands.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.category && b.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredCollections = collections.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-16">
      <CatalogPageHeader
        title={pageConfig.title}
        description={pageConfig.description}
        action={
          viewType === "brands" ? (
            <form onSubmit={handleAddBrand} className="flex items-center gap-2 flex-wrap">
              <input
                type="text"
                required
                placeholder="Brand Name (e.g. Sony, Bose)..."
                value={newBrandName}
                onChange={(event) => setNewBrandName(event.target.value)}
                className="text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
              />
              <select
                value={newBrandCategory}
                onChange={(e) => setNewBrandCategory(e.target.value)}
                className="text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
              >
                <option value="Electronics">Electronics</option>
                <option value="Footwear">Footwear</option>
                <option value="Apparel">Apparel</option>
                <option value="Home">Home & Living</option>
              </select>
              <Button type="submit" variant="primary" size="md" icon={Plus}>
                Add Brand
              </Button>
            </form>
          ) : viewType === "collections" ? (
            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={() => setIsAddCollectionOpen(true)}
            >
              Create Collection
            </Button>
          ) : null
        }
      />

      {viewType === "brands" && (
        <div className="space-y-5">
          {/* Top KPI Cards with Top Accent Line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-white rounded-xl pt-4 pb-3.5 px-4 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600" />
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Total Brands
                </span>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
                  <Award className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900 tracking-tight">
                    {brands.length}
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    Verified Directory 🏆
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Authorized Manufacturer Partners
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl pt-4 pb-3.5 px-4 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Electronics Partners
                </span>
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900 tracking-tight">
                    {brands.filter(b => b.category === 'Electronics').length}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Tech & Gadgets ⚡
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Flagship Audio & Mobile Brands
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl pt-4 pb-3.5 px-4 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500" />
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Footwear Partners
                </span>
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100">
                  <Layers className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900 tracking-tight">
                    {brands.filter(b => b.category === 'Footwear').length}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                    Footwear & Shoes 👟
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Athletic & Premium Footwear
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl pt-4 pb-3.5 px-4 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Apparel & Lifestyle
                </span>
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg border border-amber-100">
                  <Tag className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900 tracking-tight">
                    {brands.filter(b => b.category === 'Apparel' || b.category === 'Home' || b.category === 'Home & Living').length}
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Fashion & Living 👗
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Clothing, Decor & Home Accessories
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search brands directory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
              />
            </div>
            <span className="text-xs font-bold text-slate-600">
              {filteredBrands.length} Verified Brands
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBrands.map((brand, index) => (
              <BrandCard key={brand.id} brand={brand} index={index} onDelete={deleteBrandItem} />
            ))}
          </div>
        </div>
      )}


      {viewType === "attributes" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CATALOG_ATTRIBUTES.map((attribute) => (
              <AttributeCard key={attribute.id} attribute={attribute} />
            ))}
          </div>
        </div>
      )}

      {viewType === "collections" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-md border border-slate-200 shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search storefront collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
              />
            </div>
            <span className="text-xs font-bold text-slate-600">
              {filteredCollections.length} Storefront Collections
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCollections.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                onEdit={setEditingCollection}
                onDelete={handleDeleteCollection}
                onToggleStatus={toggleCollectionStatus}
              />
            ))}
          </div>
        </div>
      )}

      {/* Add Collection Master Modal */}
      {isAddCollectionOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-md max-w-md w-full p-5 space-y-4 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Create Storefront Collection</h3>
              <button
                onClick={() => setIsAddCollectionOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCollection} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Collection Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Winter Festive Sale 2026"
                  value={newCollection.title}
                  onChange={(e) => setNewCollection({ ...newCollection, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Curated Items / Products Count</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="24"
                  value={newCollection.itemsCount}
                  onChange={(e) => setNewCollection({ ...newCollection, itemsCount: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Banner Image Preset</label>
                <select
                  value={newCollection.banner}
                  onChange={(e) => setNewCollection({ ...newCollection, banner: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 mb-2 font-medium"
                >
                  {BANNER_PRESETS.map((p) => (
                    <option key={p.url} value={p.url}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Or enter custom Image URL..."
                  value={newCollection.banner}
                  onChange={(e) => setNewCollection({ ...newCollection, banner: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Visibility Status</label>
                <select
                  value={newCollection.status}
                  onChange={(e) => setNewCollection({ ...newCollection, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-semibold"
                >
                  <option value="Active">Active (Published on Storefront)</option>
                  <option value="Draft">Draft (Internal Only)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <Button type="button" variant="secondary" onClick={() => setIsAddCollectionOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Publish Collection
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Collection Modal */}
      {editingCollection && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-md max-w-md w-full p-5 space-y-4 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Edit Storefront Collection</h3>
              <button
                onClick={() => setEditingCollection(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateCollection} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Collection Title</label>
                <input
                  type="text"
                  required
                  value={editingCollection.title}
                  onChange={(e) =>
                    setEditingCollection({ ...editingCollection, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Handpicked Items Count</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={editingCollection.itemsCount}
                  onChange={(e) =>
                    setEditingCollection({ ...editingCollection, itemsCount: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Banner Image URL</label>
                <input
                  type="text"
                  required
                  value={editingCollection.banner}
                  onChange={(e) =>
                    setEditingCollection({ ...editingCollection, banner: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Visibility Status</label>
                <select
                  value={editingCollection.status}
                  onChange={(e) =>
                    setEditingCollection({ ...editingCollection, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-semibold"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <Button type="button" variant="secondary" onClick={() => setEditingCollection(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

