import React, { useState, useRef } from 'react';
import { Button } from './Button';
import {
  Upload,
  Search,
  Sparkles,
  Check,
  X,
  Image as ImageIcon,
  FolderOpen,
  Trash2,
  Tag
} from 'lucide-react';

// Curated high-res stock assets library for asset search & suggestions
export const STOCK_ASSET_LIBRARY = [
  // Mobiles & Smartphones
  { id: 'asset-mob-1', title: 'iPhone 15 Pro Natural Titanium', category: 'Mobiles', tags: ['iphone', 'apple', 'mobile', 'smartphone', 'phone'], url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80' },
  { id: 'asset-mob-2', title: 'Samsung Galaxy S24 Ultra', category: 'Mobiles', tags: ['samsung', 'galaxy', 'mobile', 'smartphone', 'android'], url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80' },
  { id: 'asset-mob-3', title: 'Google Pixel 8 Pro Obsidian', category: 'Mobiles', tags: ['pixel', 'google', 'mobile', 'smartphone', 'camera'], url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80' },
  { id: 'asset-mob-4', title: 'Minimalist Smartphone Display', category: 'Mobiles', tags: ['phone', 'mobile', 'screen'], url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80' },

  // Laptops & Electronics
  { id: 'asset-lap-1', title: 'MacBook Pro 16-inch Space Black', category: 'Laptops', tags: ['macbook', 'apple', 'laptop', 'computer'], url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80' },
  { id: 'asset-lap-2', title: 'Sleek Modern Laptop Desk', category: 'Laptops', tags: ['laptop', 'computer', 'workstation'], url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80' },
  { id: 'asset-lap-3', title: 'Gaming Laptop RGB Keyboard', category: 'Laptops', tags: ['gaming', 'laptop', 'keyboard'], url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80' },

  // Audio & Wearables
  { id: 'asset-aud-1', title: 'Sony WH-1000XM5 Wireless Headphones', category: 'Audio', tags: ['sony', 'headphones', 'audio', 'sound', 'music'], url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80' },
  { id: 'asset-aud-2', title: 'Apple Watch Ultra Titanium', category: 'Wearables', tags: ['watch', 'apple', 'smartwatch', 'wearable'], url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80' },
  { id: 'asset-aud-3', title: 'AirPods Pro 2 Active Noise Control', category: 'Audio', tags: ['airpods', 'apple', 'earbuds', 'audio'], url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80' },

  // Footwear & Shoes
  { id: 'asset-shoe-1', title: 'Nike Air Jordan 1 Retro Red', category: 'Footwear', tags: ['nike', 'jordan', 'shoes', 'sneakers', 'footwear'], url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' },
  { id: 'asset-shoe-2', title: 'Adidas Ultraboost White Running', category: 'Footwear', tags: ['adidas', 'shoes', 'sneakers', 'running'], url: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&q=80' },
  { id: 'asset-shoe-3', title: 'Casual Classic Leather Sneakers', category: 'Footwear', tags: ['shoes', 'leather', 'footwear'], url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80' },

  // Apparel & Clothing
  { id: 'asset-clo-1', title: 'Premium Cotton Men Hoodie', category: 'Fashion', tags: ['shirt', 'hoodie', 'clothing', 'apparel', 'fashion'], url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80' },
  { id: 'asset-clo-2', title: 'Vintage Denim Outerwear Jacket', category: 'Fashion', tags: ['denim', 'jacket', 'clothing', 'fashion'], url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80' },

  // Home & Living
  { id: 'asset-hom-1', title: 'Modern Wooden Armchair Chair', category: 'Home', tags: ['chair', 'furniture', 'home', 'living'], url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
  { id: 'asset-hom-2', title: 'Minimalist Desk Lamp & Decor', category: 'Home', tags: ['lamp', 'home', 'decor', 'living'], url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80' },

  // Beauty & Personal Care
  { id: 'asset-beau-1', title: 'Organic Serum Skincare Bottle', category: 'Beauty', tags: ['serum', 'beauty', 'skincare', 'cosmetics'], url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80' },
  { id: 'asset-beau-2', title: 'Luxury Perfume Fragrance', category: 'Beauty', tags: ['perfume', 'beauty', 'fragrance'], url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80' }
];

export const ImageAssetPicker = ({
  images = [],
  primaryImage = '',
  onImagesChange,
  onPrimaryImageChange,
  multiple = true
}) => {
  const fileInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [dragActive, setDragActive] = useState(false);

  // File Upload Handler (Computer files)
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileDataUrl = reader.result;
        if (multiple) {
          onImagesChange([...images, fileDataUrl]);
          if (!primaryImage) onPrimaryImageChange(fileDataUrl);
        } else {
          onImagesChange([fileDataUrl]);
          onPrimaryImageChange(fileDataUrl);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Drag and Drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const fileDataUrl = reader.result;
          if (multiple) {
            onImagesChange([...images, fileDataUrl]);
            if (!primaryImage) onPrimaryImageChange(fileDataUrl);
          } else {
            onImagesChange([fileDataUrl]);
            onPrimaryImageChange(fileDataUrl);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Select a suggested stock asset
  const handleSelectAsset = (assetUrl) => {
    if (multiple) {
      if (!images.includes(assetUrl)) {
        onImagesChange([...images, assetUrl]);
        if (!primaryImage) onPrimaryImageChange(assetUrl);
      }
    } else {
      onImagesChange([assetUrl]);
      onPrimaryImageChange(assetUrl);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onImagesChange(updated);
    if (images[indexToRemove] === primaryImage) {
      onPrimaryImageChange(updated.length > 0 ? updated[0] : '');
    }
  };

  // Filter stock suggestions
  const categories = ['All', 'Mobiles', 'Laptops', 'Audio', 'Footwear', 'Fashion', 'Home', 'Beauty'];

  const filteredAssets = STOCK_ASSET_LIBRARY.filter((asset) => {
    const matchesCategory = activeCategory === 'All' || asset.category === activeCategory;
    const matchesQuery =
      !searchQuery.trim() ||
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-4">
      {/* 1. Direct Computer File Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
          dragActive
            ? 'border-blue-600 bg-blue-50/60'
            : 'border-slate-300 hover:border-blue-400 bg-slate-50/50'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          multiple={multiple}
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-xs">
          <Upload className="w-6 h-6" />
        </div>
        <p className="text-xs font-bold text-slate-900">
          Click to Upload Image File from Computer
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5">
          or drag and drop JPG, PNG, WebP image files here
        </p>
      </div>

      {/* 2. Image Asset Search & Suggestions Picker */}
      <div className="bg-white border border-slate-200 rounded-md p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-bold text-slate-900">
              Suggested Image Assets Library & Search
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">Click any image to select</span>
        </div>

        {/* Search input for stock assets */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search stock images (e.g. iphone, nike, macbook, shirt, chair, watch)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 placeholder-slate-400"
          />
        </div>

        {/* Category Badges Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Suggested Asset Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1 pt-1">
          {filteredAssets.map((asset) => {
            const isSelected = images.includes(asset.url);
            return (
              <div
                key={asset.id}
                onClick={() => handleSelectAsset(asset.url)}
                className={`relative group rounded-md border overflow-hidden aspect-square cursor-pointer transition-all ${
                  isSelected
                    ? 'border-2 border-emerald-500 ring-2 ring-emerald-100 scale-95'
                    : 'border-slate-200 hover:border-blue-500 hover:scale-[1.02]'
                }`}
                title={asset.title}
              >
                <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
                {isSelected && (
                  <div className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-xs">
                    <Check className="w-3 h-3" />
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[9px] text-white font-medium truncate">{asset.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Selected Images Gallery & Primary Selector */}
      {images.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-blue-600" /> Selected Image Gallery ({images.length})
            </h4>
            <span className="text-[11px] text-slate-500">Click image to set as Primary</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {images.map((imgUrl, idx) => {
              const isPrimary = primaryImage === imgUrl;
              return (
                <div
                  key={idx}
                  className={`relative group rounded-md border overflow-hidden bg-slate-50 aspect-square ${
                    isPrimary ? 'border-2 border-blue-600 ring-2 ring-blue-100' : 'border-slate-200'
                  }`}
                >
                  <img src={imgUrl} alt={`Selected ${idx}`} className="w-full h-full object-cover" />
                  {isPrimary && (
                    <span className="absolute top-1.5 left-1.5 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-xs shadow-xs">
                      PRIMARY
                    </span>
                  )}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                    {!isPrimary && (
                      <button
                        type="button"
                        onClick={() => onPrimaryImageChange(imgUrl)}
                        className="text-[10px] bg-white text-slate-900 font-bold px-2 py-1 rounded-md shadow-xs hover:bg-slate-100"
                      >
                        Set Main
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="text-[10px] bg-rose-600 text-white font-bold px-2 py-1 rounded-md shadow-xs hover:bg-rose-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
