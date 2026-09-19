import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { ImageAssetPicker } from '../ui/ImageAssetPicker';
import { RichTextEditor } from '../ui/RichTextEditor';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  Upload,
  Sparkles,
  Tag,
  DollarSign,
  Package,
  Truck,
  Globe,
  HelpCircle,
  CheckCircle2,
  Layers,
  X,
  Smartphone,
  Laptop,
  Shirt,
  Armchair,
  Sparkle
} from 'lucide-react';

// Preset category specifications map with preset quick pills
const CATEGORY_SPEC_FIELDS = {
  Mobiles: [
    { key: 'processor', label: 'Processor / Chipset', placeholder: 'e.g. Apple A17 Pro', presets: ['Apple A17 Pro', 'Snapdragon 8 Gen 3', 'MediaTek Dimensity 9300'] },
    { key: 'ram', label: 'RAM Capacity', placeholder: 'e.g. 8GB LPDDR5X', presets: ['6GB', '8GB', '12GB', '16GB LPDDR5X'] },
    { key: 'storage', label: 'Internal Storage', placeholder: 'e.g. 256GB NVMe', presets: ['128GB', '256GB', '512GB', '1TB NVMe'] },
    { key: 'battery', label: 'Battery Capacity', placeholder: 'e.g. 5000 mAh Fast Charge', presets: ['4422 mAh', '5000 mAh', '5500 mAh (120W)'] },
    { key: 'display', label: 'Display Specs', placeholder: 'e.g. 6.7-inch OLED 120Hz', presets: ['6.1" OLED 120Hz', '6.7" Super Retina XDR 120Hz', '6.8" QHD+ AMOLED'] },
    { key: 'camera', label: 'Camera Setup', placeholder: 'e.g. 48MP Triple Camera', presets: ['48MP + 12MP + 12MP', '50MP Sony LYT-900', '200MP OIS Main'] },
    { key: 'os', label: 'Operating System', placeholder: 'e.g. iOS 17 / Android 14', presets: ['iOS 17', 'Android 14 (One UI 6.1)', 'Android 14 (OxygenOS)'] },
  ],
  Laptops: [
    { key: 'cpu', label: 'Processor (CPU)', placeholder: 'e.g. Intel Core i7', presets: ['Apple M3 Max', 'Intel Core i7-13700H', 'AMD Ryzen 9 7940HS'] },
    { key: 'gpu', label: 'Graphics (GPU)', placeholder: 'e.g. NVIDIA RTX 4070', presets: ['Apple 30-Core GPU', 'NVIDIA GeForce RTX 4060 8GB', 'NVIDIA RTX 4080 12GB'] },
    { key: 'ram', label: 'RAM Memory', placeholder: 'e.g. 32GB DDR5', presets: ['16GB Unified', '32GB DDR5 5600MHz', '64GB DDR5'] },
    { key: 'storage', label: 'Storage (SSD)', placeholder: 'e.g. 1TB PCIe NVMe', presets: ['512GB NVMe SSD', '1TB PCIe 4.0 SSD', '2TB Gen4 SSD'] },
    { key: 'screen', label: 'Display Resolution', placeholder: 'e.g. 16" QHD+ 240Hz', presets: ['14.2" Liquid Retina XDR', '16" QHD+ 240Hz', '15.6" OLED 4K'] },
    { key: 'battery', label: 'Battery Watt-Hours', placeholder: 'e.g. 99.9Wh', presets: ['70Wh Battery', '99.9Wh Battery (140W Type-C)'] },
  ],
  Footwear: [
    { key: 'shoeSizeScale', label: 'Size Scale', placeholder: 'e.g. UK / US', presets: ['UK Size', 'US Size', 'EU Size'] },
    { key: 'availableSizes', label: 'Available Sizes', placeholder: 'e.g. UK 7, UK 8, UK 9', presets: ['UK 7, 8, 9, 10', 'UK 6, 7, 8', 'US 8, 9, 10, 11'] },
    { key: 'upperMaterial', label: 'Upper Material', placeholder: 'e.g. Primeknit', presets: ['Genuine Italian Leather', 'Primeknit Mesh', 'Suede Leather'] },
    { key: 'soleMaterial', label: 'Sole Material', placeholder: 'e.g. Rubber Cushion', presets: ['Continental Rubber', 'EVA Foam Cushion', 'Vibram Outsole'] },
    { key: 'gender', label: 'Target Gender', placeholder: 'e.g. Unisex', presets: ['Men', 'Women', 'Unisex'] },
    { key: 'closure', label: 'Closure Type', placeholder: 'e.g. Lace-Up', presets: ['Lace-Up', 'Slip-On', 'Velcro Strap'] },
  ],
  'Men Clothing': [
    { key: 'fabric', label: 'Fabric / Material', placeholder: 'e.g. 100% Cotton', presets: ['100% Premium Cotton', 'Linen Blend', 'Denim Cotton', 'Polyester Fleece'] },
    { key: 'fit', label: 'Fit Type', placeholder: 'e.g. Slim Fit', presets: ['Slim Fit', 'Regular Fit', 'Oversized Streetwear', 'Tailored Fit'] },
    { key: 'pattern', label: 'Pattern', placeholder: 'e.g. Solid', presets: ['Solid / Plain', 'Plaid Checks', 'Printed Graphic', 'Striped'] },
    { key: 'sleeve', label: 'Sleeve Length', placeholder: 'e.g. Full Sleeve', presets: ['Full Sleeve', 'Half Sleeve', 'Sleeveless'] },
    { key: 'care', label: 'Care Instructions', placeholder: 'e.g. Machine Wash Cold', presets: ['Machine wash cold, dry flat', 'Dry clean only', 'Hand wash with care'] },
  ],
  'Home & Living': [
    { key: 'material', label: 'Primary Material', placeholder: 'e.g. Teak Wood', presets: ['Solid Teak Wood', 'Stainless Steel 304', 'Tempered Glass', 'Ceramic'] },
    { key: 'dimensions', label: 'Item Dimensions', placeholder: 'e.g. 45 x 45 x 90 cm', presets: ['45 x 45 x 90 cm', '120 x 60 x 75 cm', 'Compact Size'] },
    { key: 'warranty', label: 'Warranty Period', placeholder: 'e.g. 2 Years', presets: ['1 Year Warranty', '2 Years Manufacturer Warranty', '5 Years Frame Warranty'] },
    { key: 'power', label: 'Power Consumption', placeholder: 'e.g. 1500W', presets: ['No Power Required', '750W 230V', '1500W Fast Heating'] },
  ],
  'Beauty & Personal Care': [
    { key: 'skinType', label: 'Suitable Skin Type', placeholder: 'e.g. All Skin Types', presets: ['All Skin Types', 'Sensitive Skin', 'Oily & Acne Prone', 'Dry Skin'] },
    { key: 'volume', label: 'Net Weight / Volume', placeholder: 'e.g. 50 ml', presets: ['30 ml / 1.0 fl. oz.', '50 ml / 1.7 fl. oz.', '100 ml / 3.4 fl. oz.'] },
    { key: 'ingredients', label: 'Key Ingredients', placeholder: 'e.g. Hyaluronic Acid', presets: ['Hyaluronic Acid + Niacinamide', 'Vitamin C + E', 'Salicylic Acid 2%'] },
    { key: 'shelfLife', label: 'Shelf Life', placeholder: 'e.g. 36 Months', presets: ['24 Months from MFG', '36 Months from MFG Date'] },
  ]
};

export const AddEditProductView = () => {
  const {
    products,
    activeProductId,
    setActiveProductId,
    addProduct,
    updateProduct,
    navigateTo,
    showToast
  } = useApp();

  const isEditMode = Boolean(activeProductId);
  const existingProduct = products.find(p => p.id === activeProductId);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    sku: '',
    barcode: '',
    category: 'Mobiles',
    brand: 'Apple',
    price: '',
    originalPrice: '',
    costPrice: '',
    stock: '10',
    lowStockAlert: '5',
    status: 'In Stock',
    featured: false,
    image: '',
    images: [],
    description: '',
    weight: '0.5',
    dimensions: '15 x 7 x 1 cm',
    freeShipping: true,
    metaTitle: '',
    metaDescription: '',
    slug: '',
    tags: 'electronics, premium, bestseller'
  });

  // Dynamic Specs state
  const [dynamicSpecs, setDynamicSpecs] = useState({});
  const [customSpecs, setCustomSpecs] = useState([
    { key: '', value: '' }
  ]);

  // Gallery URL input
  const [newImageUrl, setNewImageUrl] = useState('');

  // Populate form in edit mode
  useEffect(() => {
    if (isEditMode && existingProduct) {
      setFormData({
        name: existingProduct.name || '',
        subtitle: existingProduct.subtitle || '',
        sku: existingProduct.sku || '',
        barcode: existingProduct.barcode || `UPC-${Math.floor(100000 + Math.random() * 900000)}`,
        category: existingProduct.category || 'Mobiles',
        brand: existingProduct.brand || 'Apple',
        price: existingProduct.price !== undefined ? String(existingProduct.price) : '',
        originalPrice: existingProduct.originalPrice !== undefined ? String(existingProduct.originalPrice) : '',
        costPrice: existingProduct.costPrice ? String(existingProduct.costPrice) : String(Math.round((existingProduct.price || 0) * 0.7)),
        stock: existingProduct.stock !== undefined ? String(existingProduct.stock) : '10',
        lowStockAlert: '5',
        status: existingProduct.status || 'In Stock',
        featured: existingProduct.featured || false,
        image: existingProduct.image || (existingProduct.images && existingProduct.images[0]) || '',
        images: existingProduct.images || (existingProduct.image ? [existingProduct.image] : []),
        description: existingProduct.description || '',
        weight: existingProduct.weight || '0.5',
        dimensions: existingProduct.dimensions || '15 x 7 x 1 cm',
        freeShipping: existingProduct.freeShipping !== undefined ? existingProduct.freeShipping : true,
        metaTitle: existingProduct.name ? `${existingProduct.name} - Buy Online | ShopWave` : '',
        metaDescription: existingProduct.description ? existingProduct.description.substring(0, 150) : '',
        slug: existingProduct.name ? existingProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '',
        tags: 'bestseller, featured'
      });

      // Specs
      if (existingProduct.specs) {
        setDynamicSpecs(existingProduct.specs);
      } else if (existingProduct.keySpecs) {
        const specsObj = {};
        existingProduct.keySpecs.forEach((s, idx) => {
          specsObj[`spec_${idx}`] = s;
        });
        setDynamicSpecs(specsObj);
      }
    } else {
      // Auto generate random SKU for new product
      const randomSku = `SKU-${Math.floor(1000 + Math.random() * 9000)}`;
      setFormData(prev => ({
        ...prev,
        sku: randomSku,
        barcode: `UPC-8890${Math.floor(1000 + Math.random() * 9000)}`
      }));
    }
  }, [isEditMode, existingProduct]);

  // Update slug auto when name changes
  const handleNameChange = (e) => {
    const val = e.target.value;
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData(prev => ({
      ...prev,
      name: val,
      slug: autoSlug,
      metaTitle: val ? `${val} | Buy at ShopWave` : ''
    }));
  };

  // Change category handler
  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setFormData(prev => ({ ...prev, category: newCat }));
    setDynamicSpecs({}); // reset specs for new category
  };

  const handleSpecChange = (key, value) => {
    setDynamicSpecs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAddCustomSpec = () => {
    setCustomSpecs(prev => [...prev, { key: '', value: '' }]);
  };

  const handleCustomSpecChange = (index, field, value) => {
    setCustomSpecs(prev => prev.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleRemoveCustomSpec = (index) => {
    setCustomSpecs(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleAddGalleryImage = (e) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;
    setFormData(prev => {
      const updatedImages = [...prev.images, newImageUrl.trim()];
      return {
        ...prev,
        images: updatedImages,
        image: prev.image || newImageUrl.trim()
      };
    });
    setNewImageUrl('');
  };

  const handleRemoveGalleryImage = (idxToRemove) => {
    setFormData(prev => {
      const updatedImages = prev.images.filter((_, idx) => idx !== idxToRemove);
      return {
        ...prev,
        images: updatedImages,
        image: updatedImages.length > 0 ? updatedImages[0] : ''
      };
    });
  };

  const handleSetPrimaryImage = (imgUrl) => {
    setFormData(prev => ({ ...prev, image: imgUrl }));
  };

  // Calculate profit margin
  const priceNum = Number(formData.price) || 0;
  const costNum = Number(formData.costPrice) || 0;
  const profitAmount = Math.max(0, priceNum - costNum);
  const profitMarginPercent = priceNum > 0 ? Math.round((profitAmount / priceNum) * 100) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Please enter a product title.', 'error');
      return;
    }
    if (!formData.price) {
      showToast('Please enter a valid price.', 'error');
      return;
    }

    // Build specs array for UI list
    const categoryFields = CATEGORY_SPEC_FIELDS[formData.category] || [];
    const keySpecsList = [];
    categoryFields.forEach(f => {
      if (dynamicSpecs[f.key]) {
        keySpecsList.push(`${f.label}: ${dynamicSpecs[f.key]}`);
      }
    });
    customSpecs.forEach(cs => {
      if (cs.key && cs.value) {
        keySpecsList.push(`${cs.key}: ${cs.value}`);
      }
    });

    const finalImage = formData.image || (formData.images.length > 0 ? formData.images[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80');
    const finalImages = formData.images.length > 0 ? formData.images : [finalImage];

    const payload = {
      name: formData.name,
      subtitle: formData.subtitle || `${formData.brand} Premium Series`,
      sku: formData.sku,
      barcode: formData.barcode,
      category: formData.category,
      brand: formData.brand,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Math.round(Number(formData.price) * 1.25),
      costPrice: Number(formData.costPrice) || 0,
      stock: Number(formData.stock) || 0,
      status: Number(formData.stock) > 0 ? 'In Stock' : 'Out of Stock',
      featured: formData.featured,
      image: finalImage,
      images: finalImages,
      description: formData.description || 'Professional grade product with high performance specs.',
      weight: formData.weight,
      dimensions: formData.dimensions,
      freeShipping: formData.freeShipping,
      specs: dynamicSpecs,
      keySpecs: keySpecsList.length > 0 ? keySpecsList : ['6.1-inch OLED Display', 'High Speed Processor', 'Fast Charging'],
      slug: formData.slug
    };

    if (isEditMode) {
      updateProduct(activeProductId, payload);
    } else {
      addProduct(payload);
    }

    setActiveProductId(null);
    navigateTo('catalog-products');
  };

  const categoryOptions = [
    { value: 'Mobiles', label: 'Mobiles & Smartphones' },
    { value: 'Laptops', label: 'Laptops & Computers' },
    { value: 'Footwear', label: 'Footwear & Shoes' },
    { value: 'Men Clothing', label: 'Men Clothing & Apparel' },
    { value: 'Home & Living', label: 'Home & Living Appliances' },
    { value: 'Beauty & Personal Care', label: 'Beauty & Personal Care' },
  ];

  const brandOptions = [
    { value: 'Apple', label: 'Apple' },
    { value: 'Samsung', label: 'Samsung' },
    { value: 'Nike', label: 'Nike' },
    { value: "Levi's", label: "Levi's" },
    { value: 'Sony', label: 'Sony' },
    { value: 'LG', label: 'LG Electronics' },
  ];

  const currentCategoryFields = CATEGORY_SPEC_FIELDS[formData.category] || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header Action Bar */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setActiveProductId(null);
              navigateTo('catalog-products');
            }}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            title="Back to Catalog"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
              <span>Catalog</span>
              <span>/</span>
              <span>Products</span>
              <span>/</span>
              <span className="font-semibold text-slate-800">
                {isEditMode ? 'Edit Product' : 'Add New Product'}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {isEditMode ? `Edit Product: ${formData.name || 'Untitled'}` : 'Master Product Creator'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() => {
              setActiveProductId(null);
              navigateTo('catalog-products');
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={Save}
          >
            {isEditMode ? 'Save Product Changes' : 'Publish Product to Store'}
          </Button>
        </div>
      </div>

      {/* Main Grid Layout: Left 65% / Right 35% */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Core Info & Dynamic Specs */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Basic Information */}
          <div className="bg-white rounded-md border border-slate-200 p-5 space-y-4 shadow-xs">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-600" /> Basic Information
                </h3>
                <p className="text-xs text-slate-500">Core title, SKU, brand and catalog classification</p>
              </div>
              <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md border border-blue-200">
                Required Fields
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. iPhone 15 Pro Max 256GB Natural Titanium"
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 placeholder-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subtitle / Short Variant Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. A17 Pro Chip, 48MP Main Camera, Super Retina XDR"
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 placeholder-slate-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    SKU Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SKU-9842"
                    value={formData.sku}
                    onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Barcode / UPC Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UPC-88901429"
                    value={formData.barcode}
                    onChange={(e) => setFormData(prev => ({ ...prev, barcode: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <Select
                    value={formData.category}
                    onChange={handleCategoryChange}
                    options={categoryOptions}
                    size="md"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Brand Partner
                  </label>
                  <Select
                    value={formData.brand}
                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    options={brandOptions}
                    size="md"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Dynamic Category-Based Option Selection */}
          <div className="bg-white rounded-md border border-slate-200 p-5 space-y-4 shadow-xs">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Dynamic Category Specifications
                </h3>
                <p className="text-xs text-slate-500">
                  Custom tech specs dynamically generated for <strong className="text-slate-800">{formData.category}</strong>
                </p>
              </div>
              <span className="text-[11px] font-semibold bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-md border border-amber-200">
                Dynamic Category Engine
              </span>
            </div>

            {/* Render Category Specific Fields with Preset Option Pills */}
            {currentCategoryFields.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/70 p-4 rounded-md border border-slate-200">
                {currentCategoryFields.map(field => (
                  <div key={field.key} className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={dynamicSpecs[field.key] || ''}
                      onChange={(e) => handleSpecChange(field.key, e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                    />

                    {/* Quick Preset Pills */}
                    {field.presets && (
                      <div className="flex items-center gap-1 flex-wrap pt-0.5">
                        <span className="text-[10px] text-slate-400 font-medium">Quick suggestions:</span>
                        {field.presets.map((preset, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => handleSpecChange(field.key, preset)}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                              dynamicSpecs[field.key] === preset
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            + {preset}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Custom Specification Fields Builder */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  Additional Technical Specifications (Key-Value Pairs)
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  icon={Plus}
                  onClick={handleAddCustomSpec}
                >
                  Add Field
                </Button>
              </div>

              {customSpecs.map((spec, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Attribute (e.g. Water Resistance)"
                    value={spec.key}
                    onChange={(e) => handleCustomSpecChange(index, 'key', e.target.value)}
                    className="w-1/2 text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. IP68 6 Meters)"
                    value={spec.value}
                    onChange={(e) => handleCustomSpecChange(index, 'value', e.target.value)}
                    className="w-1/2 text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                  />
                  {customSpecs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomSpec(index)}
                      className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Rich Text Description & Highlights */}
          <div className="bg-white rounded-md border border-slate-200 p-5 space-y-4 shadow-xs">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Product Description & Highlights</h3>
                <p className="text-xs text-slate-500">Provide rich text formatting, features tables, and image callouts</p>
              </div>
              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-md border border-emerald-200">
                WYSIWYG Rich Editor
              </span>
            </div>

            <div>
              <RichTextEditor
                value={formData.description}
                onChange={(val) => setFormData(prev => ({ ...prev, description: val }))}
                placeholder="Write detailed product story, features table, warranty terms, and unboxing details..."
                minHeight="240px"
              />
            </div>
          </div>

          {/* Card 4: Multi-Image Gallery with Computer Upload & Asset Search Suggestions */}
          <div className="bg-white rounded-md border border-slate-200 p-5 space-y-4 shadow-xs">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-600" /> Media & Product Gallery
                </h3>
                <p className="text-xs text-slate-500">Upload computer files or search stock photo assets library</p>
              </div>
            </div>

            <ImageAssetPicker
              images={formData.images}
              primaryImage={formData.image}
              onImagesChange={(newImgs) => {
                setFormData(prev => ({
                  ...prev,
                  images: newImgs,
                  image: prev.image && newImgs.includes(prev.image) ? prev.image : (newImgs.length > 0 ? newImgs[0] : '')
                }));
              }}
              onPrimaryImageChange={(newPrimary) => {
                setFormData(prev => ({ ...prev, image: newPrimary }));
              }}
            />
          </div>
        </div>

        {/* Right Column - Storefront Preview, Pricing, Inventory, Shipping & SEO */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 0: Live Storefront Card Preview */}
          <div className="bg-white rounded-md border border-slate-200 p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Live Storefront Card Preview
              </span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                {formData.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className="border border-slate-200 rounded-md p-3 bg-slate-50/50 space-y-2 text-center">
              <div className="h-36 w-full flex items-center justify-center bg-white rounded border border-slate-100 p-2 overflow-hidden">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="max-h-full max-w-full object-contain" />
                ) : (
                  <ImageIcon className="w-10 h-10 text-slate-300" />
                )}
              </div>
              <h4 className="font-bold text-slate-900 text-xs truncate">
                {formData.name || 'Product Title Preview'}
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
                {formData.subtitle || `${formData.brand} • ${formData.category}`}
              </p>
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-900">
                <span>₹ {Number(formData.price || 0).toLocaleString('en-IN')}</span>
                {formData.originalPrice && (
                  <span className="text-[11px] text-slate-400 line-through">
                    ₹ {Number(formData.originalPrice).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Card 1: Pricing & Profit Calculator */}
          <div className="bg-white rounded-md border border-slate-200 p-5 space-y-4 shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" /> Pricing & Profit Margin
              </h3>
              <p className="text-xs text-slate-500">Define selling prices and check profit margins</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Selling Price (₹) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-bold text-slate-500">₹</span>
                  <input
                    type="number"
                    required
                    placeholder="79999"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full text-xs pl-7 pr-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Original Price / MRP (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-slate-500">₹</span>
                  <input
                    type="number"
                    placeholder="89999"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                    className="w-full text-xs pl-7 pr-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cost Price per Item (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-slate-500">₹</span>
                  <input
                    type="number"
                    placeholder="55000"
                    value={formData.costPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, costPrice: e.target.value }))}
                    className="w-full text-xs pl-7 pr-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                  />
                </div>
              </div>

              {/* Profit Calculation Box */}
              <div className="bg-slate-50 p-3 rounded-md border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Gross Profit / Unit:</span>
                  <span className="font-bold text-slate-900">₹ {profitAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Profit Margin %:</span>
                  <span className={`font-bold ${profitMarginPercent > 20 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {profitMarginPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Stock & Inventory Control */}
          <div className="bg-white rounded-md border border-slate-200 p-5 space-y-4 shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" /> Stock & Warehouse Inventory
              </h3>
              <p className="text-xs text-slate-500">Track units available and stock alert triggers</p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Stock Quantity <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Low Stock Alert
                  </label>
                  <input
                    type="number"
                    value={formData.lowStockAlert}
                    onChange={(e) => setFormData(prev => ({ ...prev, lowStockAlert: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-200">
                <div>
                  <p className="text-xs font-bold text-slate-800">Featured Product Badge</p>
                  <p className="text-[11px] text-slate-500">Display in store homepage showcase</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Shipping & Logistics */}
          <div className="bg-white rounded-md border border-slate-200 p-5 space-y-4 shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-indigo-600" /> Shipping & Fulfillment
              </h3>
              <p className="text-xs text-slate-500">Package weight and dimensions for freight calculation</p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Dimensions (cm)
                  </label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-emerald-50/70 rounded-md border border-emerald-200">
                <div>
                  <p className="text-xs font-bold text-emerald-900">Free Express Shipping</p>
                  <p className="text-[11px] text-emerald-700">Waive shipping fee for customer</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.freeShipping}
                  onChange={(e) => setFormData(prev => ({ ...prev, freeShipping: e.target.checked }))}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-emerald-300"
                />
              </div>
            </div>
          </div>

          {/* Card 4: Search Engine Optimization (SEO) */}
          <div className="bg-white rounded-md border border-slate-200 p-5 space-y-4 shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-600" /> Search Engine Optimization (SEO)
              </h3>
              <p className="text-xs text-slate-500">Manage Google search preview and meta tags</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                />
              </div>

              {/* Google Live Search Preview */}
              <div className="p-3 bg-slate-50 rounded-md border border-slate-200 space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Google Snippet Preview</p>
                <p className="text-xs font-semibold text-blue-700 truncate">{formData.metaTitle || 'Product Title'}</p>
                <p className="text-[11px] text-emerald-700 font-mono truncate">https://shopwave.com/products/{formData.slug || 'slug'}</p>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {formData.description ? formData.description.substring(0, 120) : 'Buy latest electronics with fast shipping and warranty.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
