import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { X, Upload, Image as ImageIcon, Check } from 'lucide-react';

export const ProductModal = ({ isOpen, onClose, initialData = null }) => {
  const { addProduct, updateProduct, showToast } = useApp();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    sku: '',
    category: 'Mobiles',
    brand: 'Apple',
    price: '',
    originalPrice: '',
    stock: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    specsDisplay: '',
    specsChip: '',
    specsStorage: '',
  });

  const categoryOptions = [
    { value: 'Mobiles', label: 'Mobiles' },
    { value: 'Laptops', label: 'Laptops' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Footwear', label: 'Footwear' },
    { value: 'Men Clothing', label: 'Men Clothing' },
    { value: 'Home & Living', label: 'Home & Living' },
    { value: 'Books', label: 'Books' },
    { value: 'Home Care', label: 'Home Care' },
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        subtitle: initialData.subtitle || initialData.name || '',
        sku: initialData.sku || '',
        category: initialData.category || 'Mobiles',
        brand: initialData.brand || 'Apple',
        price: initialData.price || '',
        originalPrice: initialData.originalPrice || '',
        stock: initialData.stock !== undefined ? initialData.stock : '',
        description: initialData.description || '',
        image: initialData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
        specsDisplay: initialData.specs?.Display || '',
        specsChip: initialData.specs?.Processor || initialData.specs?.Chip || '',
        specsStorage: initialData.specs?.Storage || '',
      });
    } else {
      setFormData({
        name: '',
        subtitle: '',
        sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        category: 'Mobiles',
        brand: 'Apple',
        price: '',
        originalPrice: '',
        stock: 25,
        description: '',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
        specsDisplay: '6.1-inch OLED Display',
        specsChip: 'Octa-core High Speed Processor',
        specsStorage: '128GB Storage',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Image size should be less than 2MB for fast local persistence', 'error');
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
        showToast('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      showToast('Please fill product name and selling price.', 'error');
      return;
    }

    const payload = {
      name: formData.name,
      subtitle: formData.subtitle || formData.name,
      sku: formData.sku || `SKU-${Date.now()}`,
      category: formData.category,
      brand: formData.brand,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Number(formData.price) * 1.15,
      stock: Number(formData.stock || 0),
      description: formData.description || 'Premium quality product with certified warranty and nationwide dispatch.',
      image: formData.image,
      images: [formData.image],
      specs: {
        'Display': formData.specsDisplay || 'High Definition Screen',
        'Processor': formData.specsChip || 'Advanced High Performance Core',
        'Storage': formData.specsStorage || 'Standard Capacity',
      }
    };

    if (initialData && initialData.id) {
      updateProduct(initialData.id, payload);
    } else {
      addProduct(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-md max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-slate-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {initialData ? 'Edit Product' : 'Add New Product'}
            </h3>
            <p className="text-xs text-slate-500">
              {initialData ? `Updating ${initialData.sku}` : 'Fill in the information to add a product to catalog'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Product Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. iPhone 15 Pro Max"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle / Short Variant</label>
              <input
                type="text"
                placeholder="e.g. Apple-iPhone 15 (128GB)"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">SKU Code</label>
              <input
                type="text"
                placeholder="e.g. IPH-15-128"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                options={categoryOptions}
                size="md"
                fullWidth
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Brand</label>
              <input
                type="text"
                placeholder="e.g. Apple, Nike"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Selling Price (₹) *</label>
              <input
                type="number"
                required
                placeholder="79999"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Original Price (₹)</label>
              <input
                type="number"
                placeholder="89999"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                placeholder="45"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Product Image (URL or Upload File)</label>
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="w-16 h-16 rounded-md border border-slate-300 flex-shrink-0 overflow-hidden bg-slate-50 flex items-center justify-center relative">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-contain p-1" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-400" />
                )}
              </div>

              <div className="flex-1 w-full space-y-2">
                <input
                  type="url"
                  placeholder="Paste Image URL..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
                />

                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    icon={Upload}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload from Computer
                  </Button>
                  <span className="text-[11px] text-slate-500">JPG, PNG, WebP</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Description</label>
            <textarea
              rows="3"
              placeholder="Enter product description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-md space-y-2 border border-slate-200">
            <span className="text-xs font-bold text-slate-900 block">Key Specifications</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Display spec"
                value={formData.specsDisplay}
                onChange={(e) => setFormData({ ...formData, specsDisplay: e.target.value })}
                className="text-xs px-3 py-1.5 bg-white rounded-md border border-slate-300 text-slate-900"
              />
              <input
                type="text"
                placeholder="Processor spec"
                value={formData.specsChip}
                onChange={(e) => setFormData({ ...formData, specsChip: e.target.value })}
                className="text-xs px-3 py-1.5 bg-white rounded-md border border-slate-300 text-slate-900"
              />
              <input
                type="text"
                placeholder="Storage spec"
                value={formData.specsStorage}
                onChange={(e) => setFormData({ ...formData, specsStorage: e.target.value })}
                className="text-xs px-3 py-1.5 bg-white rounded-md border border-slate-300 text-slate-900"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" icon={Check}>
              {initialData ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
