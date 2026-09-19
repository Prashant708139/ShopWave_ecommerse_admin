import React, { useState } from "react";
import { Plus, Award, Tag, Layers, Search } from "lucide-react";
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

export const CatalogViews = ({ viewType = "categories" }) => {
  const { brands, addBrandItem, showToast } = useApp();
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandCategory, setNewBrandCategory] = useState("Electronics");
  const [searchTerm, setSearchTerm] = useState("");

  const pageConfig = VIEW_CONFIG[viewType] || VIEW_CONFIG.categories;

  // If viewType is categories, render the Category Master Page
  if (viewType === "categories") {
    return <CategoryManagementView />;
  }

  const handleAddBrand = (event) => {
    event.preventDefault();
    const name = newBrandName.trim();
    if (!name) return;
    addBrandItem({ name, category: newBrandCategory });
    setNewBrandName("");
    showToast(`Brand "${name}" added successfully!`);
  };

  const filteredBrands = brands.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.category && b.category.toLowerCase().includes(searchTerm.toLowerCase()))
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
          ) : null
        }
      />

      {viewType === "brands" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-md border border-slate-200 shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search brands directory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
              />
            </div>
            <span className="text-xs font-bold text-slate-600">
              {filteredBrands.length} Verified Brands
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURED_COLLECTIONS.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
