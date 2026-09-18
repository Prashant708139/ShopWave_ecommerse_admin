import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useApp } from "../../context/AppContext";
import {
  CATALOG_ATTRIBUTES,
  CATALOG_CATEGORY_CARDS,
  FEATURED_COLLECTIONS,
} from "../../data/catalogData";
import { AddCategoryModal } from "../modals/AddCategoryModal";
import { AttributeCard } from "./AttributeCard";
import { BrandCard } from "./BrandCard";
import { CatalogPageHeader } from "./CatalogPageHeader";
import { CategoryCard } from "./CategoryCard";
import { CollectionCard } from "./CollectionCard";

const VIEW_CONFIG = {
  categories: {
    title: "Product Categories",
    description:
      "Organize multi-tier store classifications and menu taxonomies",
  },
  brands: {
    title: "Authorized Brands",
    description: "Manage verified brand partners and manufacturer badges",
  },
  attributes: {
    title: "Product Attributes",
    description: "Configurable variant attributes for color, sizing, and specs",
  },
  collections: {
    title: "Featured Collections",
    description:
      "Curated promotional groupings and seasonal storefront lookbooks",
  },
};

export const CatalogViews = ({ viewType = "categories" }) => {
  const { brands, addBrandItem } = useApp();
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");
  const pageConfig = VIEW_CONFIG[viewType] || VIEW_CONFIG.categories;

  const handleAddBrand = (event) => {
    event.preventDefault();
    const name = newBrandName.trim();

    if (!name) return;

    addBrandItem({ name, category: "Electronics" });
    setNewBrandName("");
  };

  const renderHeaderAction = () => {
    if (viewType === "categories") {
      return (
        <button
          onClick={() => setIsAddCategoryModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      );
    }

    if (viewType === "brands") {
      return (
        <form onSubmit={handleAddBrand} className="flex items-center gap-2">
          <input
            type="text"
            required
            placeholder="Brand Name..."
            value={newBrandName}
            onChange={(event) => setNewBrandName(event.target.value)}
            className="text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </form>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      <CatalogPageHeader
        title={pageConfig.title}
        description={pageConfig.description}
        action={renderHeaderAction()}
      />

      {viewType === "categories" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATALOG_CATEGORY_CARDS.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          <AddCategoryModal
            isOpen={isAddCategoryModalOpen}
            onClose={() => setIsAddCategoryModalOpen(false)}
          />
        </>
      )}

      {viewType === "brands" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      )}

      {viewType === "attributes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATALOG_ATTRIBUTES.map((attribute) => (
            <AttributeCard key={attribute.id} attribute={attribute} />
          ))}
        </div>
      )}

      {viewType === "collections" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FEATURED_COLLECTIONS.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
};
