import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import {
  ArrowLeft,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  XCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  Share2,
  ShoppingCart,
  Package,
  Plus,
  Minus
} from 'lucide-react';

export const ProductDetail = () => {
  const {
    activeProductId,
    products,
    deleteProduct,
    updateProduct,
    navigateTo,
    addOrder,
    showToast
  } = useApp();

  const product = products.find(p => p.id === activeProductId) || products[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [orderQty, setOrderQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="p-8 text-center bg-white rounded-md shadow-xs border border-slate-200">
        <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-900">Product Not Found</h3>
        <Button
          variant="primary"
          className="mt-4"
          onClick={() => navigateTo('dashboard')}
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleStockAdjust = (delta) => {
    const newStock = Math.max(0, product.stock + delta);
    updateProduct(product.id, { stock: newStock });
  };

  const handleCreateOrder = () => {
    addOrder({
      customer: {
        name: 'Direct Portal Customer',
        email: 'customer@shopwave.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
        address: 'Expedited Direct Store Order'
      },
      items: [{ id: product.id, name: product.name, price: product.price, quantity: orderQty, sku: product.sku }],
      totalAmount: product.price * orderQty,
      paymentMethod: 'Instant Checkout'
    });
  };

  const handleShareProduct = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product URL copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-md border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigateTo('dashboard')}
          >
            Back to Products
          </Button>
          <div className="h-4 w-px bg-slate-200 hidden sm:block" />
          <div className="text-xs text-slate-500 hidden sm:flex items-center gap-1">
            <span>Catalog</span>
            <span>›</span>
            <span>{product.category}</span>
            <span>›</span>
            <span className="font-semibold text-slate-800 truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button
            variant="secondary"
            size="sm"
            icon={Share2}
            onClick={handleShareProduct}
            title="Share Product"
          />
          <Button
            variant="primary"
            size="sm"
            icon={Edit2}
            onClick={() => navigateTo('edit-product', product.id)}
          >
            Edit Product
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={() => deleteProduct(product.id)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Main Single Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Gallery Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-md p-6 border border-slate-200 shadow-xs flex items-center justify-center relative min-h-[360px] group">
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-extrabold px-2.5 py-0.5 rounded-md shadow-xs">
                {discountPercent}% OFF
              </span>
            )}
            <img
              src={gallery[selectedImage] || product.image}
              alt={product.name}
              className="max-h-72 max-w-full object-contain"
            />
          </div>

          {/* Thumbnail Strip */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 rounded-md bg-white p-1.5 border transition-all flex-shrink-0 cursor-pointer ${
                    selectedImage === idx ? 'border-blue-600 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Assurance Badges */}
          <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-md border border-slate-200 text-center shadow-xs">
            <div className="space-y-1">
              <Truck className="w-5 h-5 text-blue-600 mx-auto" />
              <p className="text-[11px] font-bold text-slate-900">Fast Shipping</p>
              <p className="text-[10px] text-slate-500">24-48 Hours</p>
            </div>
            <div className="space-y-1 border-x border-slate-200 px-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto" />
              <p className="text-[11px] font-bold text-slate-900">100% Genuine</p>
              <p className="text-[10px] text-slate-500">Brand Warranty</p>
            </div>
            <div className="space-y-1">
              <RotateCcw className="w-5 h-5 text-amber-600 mx-auto" />
              <p className="text-[11px] font-bold text-slate-900">7 Days Return</p>
              <p className="text-[10px] text-slate-500">Easy Return</p>
            </div>
          </div>
        </div>

        {/* Product Info & Actions Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-md p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded-md uppercase tracking-wider">
                  {product.brand || 'ShopWave Select'}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  SKU: {product.sku}
                </span>
              </div>

              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> In Stock ({product.stock} units)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  <XCircle className="w-3.5 h-3.5 text-rose-600" /> Out of Stock
                </span>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 leading-snug">
                {product.name}
              </h1>
              {product.subtitle && (
                <p className="text-sm text-slate-500 mt-1">{product.subtitle}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{product.rating || 4.8}</span>
              </div>
              <span className="text-xs text-slate-500">
                Based on <span className="font-semibold text-slate-800">{product.reviewsCount || 128} verified customer reviews</span>
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-md border border-slate-200 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-slate-900">
                    ₹ {product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-slate-400 line-through">
                      ₹ {product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Inclusive of all taxes & standard warehouse handling
                </p>
              </div>

              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-slate-300">
                <span className="text-xs font-medium text-slate-600 mr-1">Adjust Stock:</span>
                <button
                  onClick={() => handleStockAdjust(-1)}
                  disabled={product.stock <= 0}
                  className="p-1 rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-slate-900 min-w-[24px] text-center">
                  {product.stock}
                </span>
                <button
                  onClick={() => handleStockAdjust(1)}
                  className="p-1 rounded-md text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-slate-300 rounded-md bg-white overflow-hidden">
                <button
                  onClick={() => setOrderQty(q => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-bold text-slate-900 min-w-[32px] text-center">
                  {orderQty}
                </span>
                <button
                  onClick={() => setOrderQty(q => q + 1)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              <Button
                variant="primary"
                fullWidth
                size="lg"
                icon={ShoppingCart}
                onClick={handleCreateOrder}
              >
                Create Test Order (₹{(product.price * orderQty).toLocaleString('en-IN')})
              </Button>
            </div>
          </div>

          {/* Details & Specs Tabs */}
          <div className="bg-white rounded-md p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-6 border-b border-slate-200 pb-3">
              <button
                onClick={() => setActiveTab('description')}
                className={`text-xs font-bold pb-1 transition-colors relative cursor-pointer ${
                  activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Description & Highlights
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`text-xs font-bold pb-1 transition-colors relative cursor-pointer ${
                  activeTab === 'specs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Technical Specifications
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`text-xs font-bold pb-1 transition-colors relative cursor-pointer ${
                  activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Reviews & Ratings ({product.reviewsCount || 128})
              </button>
            </div>

            <div className="pt-4">
              {activeTab === 'description' && (
                <div className="text-xs text-slate-600 leading-relaxed space-y-3">
                  <p>{product.description}</p>
                  <div className="p-3 bg-blue-50 rounded-md text-blue-900 border border-blue-200 space-y-1">
                    <p className="font-bold">✨ Store Administrator Note</p>
                    <p className="text-[11px] text-blue-700">
                      This product is currently indexed across all marketplace channels. Edits made in the editor immediately sync with client endpoints and active customer carts.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-2">
                  {product.specs && Object.keys(product.specs).length > 0 ? (
                    <div className="divide-y divide-slate-200 border border-slate-200 rounded-md overflow-hidden">
                      {Object.entries(product.specs).map(([key, val]) => (
                        <div key={key} className="flex text-xs p-2.5 bg-white odd:bg-slate-50">
                          <span className="w-1/3 font-semibold text-slate-700">{key}</span>
                          <span className="w-2/3 text-slate-600">{val}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-4 text-center">No specific technical data entered.</p>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md border border-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">Outstanding build quality & super fast shipping!</p>
                      <p className="text-[10px] text-slate-500">by Vineet Yadav • Verified Purchase • 2 days ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
