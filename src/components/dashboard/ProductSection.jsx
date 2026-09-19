import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit2,
  Trash2,
  CheckSquare,
  Square,
  ShoppingCart,
  UploadCloud,
  Layers,
  Users,
  FileSpreadsheet,
  Download,
} from 'lucide-react';
import { getCatalogItemByGlobalIndex } from '../../data/mockData';

export const ProductSection = () => {
  const {
    products,
    deleteProduct,
    bulkDeleteProducts,
    navigateTo,
    showToast,
    addOrder
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [jumpPageInput, setJumpPageInput] = useState('');
  const itemsPerPage = 8;
  const TOTAL_CATALOG_COUNT = 4320;
  const totalPages = Math.ceil(TOTAL_CATALOG_COUNT / itemsPerPage);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  const [expandedCategories, setExpandedCategories] = useState({
    'cat-all': true,
    'cat-electronics': true,
    'cat-fashion': true,
    'cat-home': false,
  });

  const categoryOptions = [
    { value: 'All', label: 'All Categories' },
    { value: 'Mobiles', label: 'Mobiles' },
    { value: 'Laptops', label: 'Laptops' },
    { value: 'Footwear', label: 'Footwear' },
    { value: 'Men Clothing', label: 'Men Clothing' },
    { value: 'Home & Living', label: 'Home & Living' },
  ];

  const brandOptions = [
    { value: 'All', label: 'All Brands' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Samsung', label: 'Samsung' },
    { value: 'Nike', label: 'Nike' },
    { value: "Levi's", label: "Levi's" },
  ];

  const statusOptions = [
    { value: 'All', label: 'All Status' },
    { value: 'In Stock', label: 'In Stock' },
    { value: 'Out of Stock', label: 'Out of Stock' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'stock', label: 'Stock Available' },
  ];

  const toggleCategoryExpand = (catId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageItems = [];

    for (let i = 0; i < itemsPerPage; i++) {
      const globalIdx = startIndex + i;
      if (globalIdx < TOTAL_CATALOG_COUNT) {
        if (globalIdx < products.length) {
          pageItems.push(products[globalIdx]);
        } else {
          pageItems.push(getCatalogItemByGlobalIndex(globalIdx));
        }
      }
    }

    return pageItems.filter(p => {
      const matchesSearch =
        !searchTerm.trim() ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === 'Electronics' && ['Mobiles', 'Laptops', 'Accessories', 'Electronics'].includes(p.category)) ||
        (selectedCategory === 'Fashion' && ['Footwear', 'Men Clothing', 'Fashion', 'Women Clothing'].includes(p.category));

      const matchesBrand =
        selectedBrand === 'All' || (p.brand && p.brand.toLowerCase() === selectedBrand.toLowerCase());

      const matchesStatus =
        selectedStatus === 'All' || p.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesCategory && matchesBrand && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'stock') return b.stock - a.stock;
      return 0;
    });
  }, [currentPage, products, searchTerm, selectedCategory, selectedBrand, selectedStatus, sortBy]);

  const handleSelectAll = () => {
    if (selectedProductIds.length === paginatedProducts.length && paginatedProducts.length > 0) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(paginatedProducts.map(p => p.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedProductIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleJumpPage = (e) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      setJumpPageInput('');
    } else {
      showToast(`Please enter a valid page number between 1 and ${totalPages}`, 'error');
    }
  };

  const getPaginationNumbers = () => {
    if (totalPages <= 7) {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
      return pageNumbers;
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const handleExportCSV = () => {
    const headers = 'ID,Name,SKU,Category,Brand,Price,Stock,Status\n';
    const rows = paginatedProducts
      .map(p => `"${p.id}","${p.name}","${p.sku}","${p.category}","${p.brand || ''}",${p.price},${p.stock},"${p.status}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ShopWave_Products_Page_${currentPage}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast(`Page ${currentPage} products exported to CSV!`);
  };

  const handleAddBestSellerToCart = (prod) => {
    addOrder({
      customer: {
        name: 'Guest Customer',
        email: 'guest@shopwave.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
        address: 'Direct Express Checkout Order'
      },
      items: [{ id: prod.id, name: prod.name, price: prod.price, quantity: 1, sku: prod.sku }],
      totalAmount: prod.price,
      paymentMethod: 'Instant UPI Checkout'
    });
  };

  const bestSellerProduct = products.find(p => p.isBestSeller) || products[0];

  const startRecord = (currentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(currentPage * itemsPerPage, TOTAL_CATALOG_COUNT);

  return (
    <div className="mt-7">
      {/* Header section */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Products</h2>
          <p className="text-xs text-slate-500">Manage your store's products, inventory and track performance.</p>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs pl-9 pr-3.5 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 w-44 sm:w-56 text-slate-900 placeholder-slate-400"
            />
          </div>

          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => {
              navigateTo('add-product');
            }}
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* Main Grid: Left Category Tree + Center Products Table + Right Sidebar Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ================= LEFT: Category Tree ================= */}
        <div className="lg:col-span-3 bg-white rounded-md p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h3 className="font-bold text-slate-900 text-sm">Categories</h3>
            <Button
              variant="secondary"
              size="sm"
              icon={Plus}
              onClick={() => navigateTo('catalog-categories')}
            >
              Add
            </Button>
          </div>

          {/* Tree Structure */}
          <div className="space-y-1 text-xs font-medium text-slate-600 select-none">
            <div>
              <div
                onClick={() => {
                  setSelectedCategory('All');
                  setCurrentPage(1);
                }}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                  selectedCategory === 'All' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">▼</span>
                  <span>All Categories (4,320)</span>
                </div>
              </div>

              {/* Category Tree Nodes */}
              <div className="pl-4 space-y-1 mt-1">
                {/* 1. Electronics */}
                <div>
                  <div
                    onClick={() => {
                      toggleCategoryExpand('cat-electronics');
                      setSelectedCategory('Electronics');
                      setCurrentPage(1);
                    }}
                    className={`flex items-center justify-between py-1.5 px-2 rounded-md cursor-pointer transition-colors ${
                      selectedCategory === 'Electronics' ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 text-[10px]">{expandedCategories['cat-electronics'] ? '▼' : '▶'}</span>
                      <span>Electronics (1,245)</span>
                    </div>
                  </div>

                  {expandedCategories['cat-electronics'] && (
                    <div className="pl-4 space-y-1 text-[11px] text-slate-500 py-0.5">
                      <div
                        onClick={() => { setSelectedCategory('Mobiles'); setCurrentPage(1); }}
                        className={`py-1 px-2 rounded-md cursor-pointer hover:bg-slate-50 ${selectedCategory === 'Mobiles' ? 'text-blue-600 font-bold bg-blue-50' : ''}`}
                      >
                        › Mobiles (632)
                      </div>
                      <div
                        onClick={() => { setSelectedCategory('Laptops'); setCurrentPage(1); }}
                        className={`py-1 px-2 rounded-md cursor-pointer hover:bg-slate-50 ${selectedCategory === 'Laptops' ? 'text-blue-600 font-bold bg-blue-50' : ''}`}
                      >
                        › Laptops (312)
                      </div>
                      <div
                        onClick={() => { setSelectedCategory('Accessories'); setCurrentPage(1); }}
                        className={`py-1 px-2 rounded-md cursor-pointer hover:bg-slate-50 ${selectedCategory === 'Accessories' ? 'text-blue-600 font-bold bg-blue-50' : ''}`}
                      >
                        › Accessories (301)
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Fashion */}
                <div>
                  <div
                    onClick={() => {
                      toggleCategoryExpand('cat-fashion');
                      setSelectedCategory('Fashion');
                      setCurrentPage(1);
                    }}
                    className={`flex items-center justify-between py-1.5 px-2 rounded-md cursor-pointer transition-colors ${
                      selectedCategory === 'Fashion' ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 text-[10px]">{expandedCategories['cat-fashion'] ? '▼' : '▶'}</span>
                      <span>Fashion (1,280)</span>
                    </div>
                  </div>

                  {expandedCategories['cat-fashion'] && (
                    <div className="pl-4 space-y-1 text-[11px] text-slate-500 py-0.5">
                      <div
                        onClick={() => { setSelectedCategory('Men Clothing'); setCurrentPage(1); }}
                        className={`py-1 px-2 rounded-md cursor-pointer hover:bg-slate-50 ${selectedCategory === 'Men Clothing' ? 'text-blue-600 font-bold bg-blue-50' : ''}`}
                      >
                        › Men (540)
                      </div>
                      <div
                        onClick={() => { setSelectedCategory('Footwear'); setCurrentPage(1); }}
                        className={`py-1 px-2 rounded-md cursor-pointer hover:bg-slate-50 ${selectedCategory === 'Footwear' ? 'text-blue-600 font-bold bg-blue-50' : ''}`}
                      >
                        › Footwear (512)
                      </div>
                      <div
                        onClick={() => { setSelectedCategory('Fashion'); setCurrentPage(1); }}
                        className="py-1 px-2 rounded-md cursor-pointer hover:bg-slate-50"
                      >
                        › Kids (228)
                      </div>
                    </div>
                  )}
                </div>

                {/* Standalone Categories */}
                <div
                  onClick={() => { setSelectedCategory('Home & Living'); setCurrentPage(1); }}
                  className="py-1.5 px-2 rounded-md cursor-pointer hover:bg-slate-50"
                >
                  › Home & Living (820)
                </div>
                <div
                  onClick={() => { setSelectedCategory('Beauty & Personal Care'); setCurrentPage(1); }}
                  className="py-1.5 px-2 rounded-md cursor-pointer hover:bg-slate-50"
                >
                  › Beauty & Personal Care (410)
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              icon={Layers}
              onClick={() => navigateTo('catalog-categories')}
            >
              Manage Categories
            </Button>
          </div>
        </div>

        {/* ================= CENTER: Products Table ================= */}
        <div className="lg:col-span-6 bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
          {/* Custom Animated Filters Bar above table */}
          <div className="p-3.5 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap bg-slate-50">
            <div className="flex items-center gap-2 flex-wrap">
              <Select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                options={categoryOptions}
                size="sm"
              />

              <Select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setCurrentPage(1);
                }}
                options={brandOptions}
                size="sm"
              />

              <Select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                options={statusOptions}
                size="sm"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="whitespace-nowrap">Sort by:</span>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                options={sortOptions}
                size="sm"
                align="right"
              />
            </div>
          </div>

          {/* Bulk Selection Bar */}
          {selectedProductIds.length > 0 && (
            <div className="px-4 py-2 bg-blue-50 border-b border-blue-200 flex items-center justify-between text-xs text-blue-900 font-medium">
              <span>{selectedProductIds.length} item(s) selected</span>
              <button
                onClick={() => {
                  bulkDeleteProducts(selectedProductIds);
                  setSelectedProductIds([]);
                }}
                className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Selected
              </button>
            </div>
          )}

          {/* Table Container with Horizontal Scroll */}
          <div className="overflow-x-auto min-h-[380px]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3 w-8">
                    <button
                      onClick={handleSelectAll}
                      className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {selectedProductIds.length === paginatedProducts.length && paginatedProducts.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300" />
                      )}
                    </button>
                  </th>
                  <th className="py-3 px-3">Product</th>
                  <th className="py-3 px-2">SKU</th>
                  <th className="py-3 px-2">Category</th>
                  <th className="py-3 px-2">Price</th>
                  <th className="py-3 px-2">Stock</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-slate-700">
                {paginatedProducts.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-slate-400">
                      No products match your search or filter on page {currentPage}.
                    </td>
                  </tr>
                ) : (
                  paginatedProducts.map((product) => {
                    const isSelected = selectedProductIds.includes(product.id);
                    const isInStock = product.status === 'In Stock';

                    return (
                      <tr
                        key={product.id}
                        className={`hover:bg-slate-50 transition-colors group ${
                          isSelected ? 'bg-blue-50/40' : ''
                        }`}
                      >
                        <td className="py-3 px-3">
                          <button
                            onClick={() => toggleSelectOne(product.id)}
                            className="text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-300" />
                            )}
                          </button>
                        </td>

                        <td className="py-3 px-3 max-w-[190px]">
                          <div
                            onClick={() => navigateTo('product-detail', product.id)}
                            className="flex items-center gap-2.5 cursor-pointer"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-9 h-9 rounded-md object-cover border border-slate-200 flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                {product.name}
                              </p>
                              <p className="text-[11px] text-slate-500 truncate">
                                {product.subtitle || product.brand}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-2 text-slate-500 font-mono text-[11px]">
                          {product.sku}
                        </td>

                        <td className="py-3 px-2 text-slate-600 font-medium truncate max-w-[90px]">
                          {product.category}
                        </td>

                        <td className="py-3 px-2 font-bold text-slate-900 whitespace-nowrap">
                          ₹ {product.price.toLocaleString('en-IN')}
                        </td>

                        <td className="py-3 px-2 font-semibold text-slate-700">
                          {product.stock}
                        </td>

                        <td className="py-3 px-2 whitespace-nowrap">
                          {isInStock ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              In Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                              Out of Stock
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-3 text-right relative">
                          <button
                            onClick={() => setOpenActionMenuId(openActionMenuId === product.id ? null : product.id)}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {openActionMenuId === product.id && (
                            <div className="absolute right-3 top-10 w-44 bg-white rounded-md shadow-md border border-slate-200 py-1 z-30">
                              <button
                                onClick={() => {
                                  navigateTo('product-detail', product.id);
                                  setOpenActionMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 text-left font-medium cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-blue-600" /> View Details
                              </button>
                              <button
                                onClick={() => {
                                  navigateTo('edit-product', product.id);
                                  setOpenActionMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 text-left font-medium cursor-pointer"
                              >
                                <Edit2 className="w-3.5 h-3.5 text-amber-600" /> Quick Edit
                              </button>
                              <button
                                onClick={() => {
                                  deleteProduct(product.id);
                                  setOpenActionMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left font-medium cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-500" /> Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* DYNAMIC PAGINATION FOOTER */}
          <div className="p-3.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <span>
                Showing {startRecord}-{endRecord} of {TOTAL_CATALOG_COUNT.toLocaleString()} products
              </span>
              <span className="hidden md:inline font-semibold text-slate-700">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                ‹
              </Button>

              {getPaginationNumbers().map((num, idx) => {
                if (num === '...') {
                  return (
                    <span key={`dots-${idx}`} className="px-1 text-slate-400 font-semibold select-none">
                      ...
                    </span>
                  );
                }

                const isCurrent = currentPage === num;

                return (
                  <Button
                    key={num}
                    variant={isCurrent ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setCurrentPage(Number(num))}
                  >
                    {num}
                  </Button>
                );
              })}

              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              >
                ›
              </Button>

              <form onSubmit={handleJumpPage} className="flex items-center gap-1 ml-1">
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  placeholder="Go..."
                  value={jumpPageInput}
                  onChange={(e) => setJumpPageInput(e.target.value)}
                  className="w-14 h-8 text-center text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 px-1"
                />
                <Button type="submit" variant="secondary" size="sm">
                  Go
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: Best Seller Card + Quick Actions ================= */}
        <div className="lg:col-span-3 space-y-5">
          {/* Best Seller Card */}
          <div className="bg-white rounded-md p-4 sm:p-5 border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white">
                Best Seller
              </span>
            </div>

            <div
              onClick={() => navigateTo('product-detail', bestSellerProduct.id)}
              className="cursor-pointer group text-center pt-2"
            >
              <div className="h-40 w-full flex items-center justify-center mb-3">
                <img
                  src={bestSellerProduct.image}
                  alt={bestSellerProduct.name}
                  className="max-h-36 max-w-full object-contain"
                />
              </div>

              <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                {bestSellerProduct.name}
              </h4>

              <div className="flex items-center justify-center gap-2 mt-1 mb-4">
                <span className="text-base font-extrabold text-slate-900">
                  ₹ {bestSellerProduct.price.toLocaleString('en-IN')}
                </span>
                {bestSellerProduct.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹ {bestSellerProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            <Button
              variant="primary"
              fullWidth
              icon={ShoppingCart}
              onClick={() => handleAddBestSellerToCart(bestSellerProduct)}
            >
              Add to Cart
            </Button>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-md p-4 sm:p-5 border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Quick Actions</h3>

            <div className="space-y-1 text-xs font-medium text-slate-700">
              <button
                onClick={() => {
                  navigateTo('add-product');
                }}
                className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 transition-colors text-left group cursor-pointer"
              >
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-800">Add New Product</span>
              </button>

              <button
                onClick={() => navigateTo('bulk-import')}
                className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 transition-colors text-left group cursor-pointer"
              >
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-800">Bulk Upload Products</span>
              </button>

              <button
                onClick={() => navigateTo('catalog-categories')}
                className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 transition-colors text-left group cursor-pointer"
              >
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-800">Manage Categories</span>
              </button>

              <button
                onClick={() => navigateTo('orders')}
                className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 transition-colors text-left group cursor-pointer"
              >
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-800">View Orders</span>
              </button>

              <button
                onClick={() => navigateTo('customers')}
                className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 transition-colors text-left group cursor-pointer"
              >
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                  <Users className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-800">Manage Customers</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 transition-colors text-left group cursor-pointer"
              >
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                  <Download className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-800">Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
