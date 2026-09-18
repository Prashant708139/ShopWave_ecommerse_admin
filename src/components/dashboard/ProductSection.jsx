import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Plus,
  ChevronRight,
  ChevronDown,
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
  FolderPlus,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';
import { ProductModal } from '../products/ProductModal';
import { BulkUploadModal } from '../modals/BulkUploadModal';
import { AddCategoryModal } from '../modals/AddCategoryModal';
import { getCatalogItemByGlobalIndex } from '../../data/mockData';

export const ProductSection = () => {
  const {
    products,
    deleteProduct,
    bulkDeleteProducts,
    categoryTree,
    navigateTo,
    showToast,
    addOrder
  } = useApp();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Selection & Action state
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  // Pagination state (1 to 540+)
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpPageInput, setJumpPageInput] = useState('');
  const itemsPerPage = 8;
  const TOTAL_CATALOG_COUNT = 4320;
  const totalPages = Math.ceil(TOTAL_CATALOG_COUNT / itemsPerPage); // 540 pages

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  // Category Tree Expansion state
  const [expandedCategories, setExpandedCategories] = useState({
    'cat-all': true,
    'cat-electronics': true,
    'cat-fashion': true,
    'cat-home': false,
  });

  const toggleCategoryExpand = (catId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  // Generate paginated products dynamically for any page 1 to 540+
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageItems = [];

    for (let i = 0; i < itemsPerPage; i++) {
      const globalIdx = startIndex + i;
      if (globalIdx < TOTAL_CATALOG_COUNT) {
        // If user created custom products, show them first on early pages
        if (globalIdx < products.length) {
          pageItems.push(products[globalIdx]);
        } else {
          pageItems.push(getCatalogItemByGlobalIndex(globalIdx));
        }
      }
    }

    // Apply Client filters
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

  // Select all handler
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

  // Jump to page handler
  const handleJumpPage = (e) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      setJumpPageInput('');
      window.scrollTo({ top: 500, behavior: 'smooth' });
    } else {
      showToast(`Please enter a valid page number between 1 and ${totalPages}`, 'error');
    }
  };

  // Generate sliding window pagination numbers
  const getPaginationNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;

    if (totalPages <= 7) {
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

  // Quick Action Export CSV
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
              className="text-xs pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 w-44 sm:w-56"
            />
          </div>

          <button
            onClick={() => {
              setEditingProduct(null);
              setIsProductModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Category Tree + Center Products Table + Right Sidebar Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ================= LEFT: Category Tree (3 cols on lg) ================= */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h3 className="font-bold text-slate-800 text-sm">Categories</h3>
            <button
              onClick={() => setIsAddCategoryOpen(true)}
              className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          {/* Tree Structure */}
          <div className="space-y-1 text-xs font-medium text-slate-600 select-none">
            <div>
              <div
                onClick={() => {
                  setSelectedCategory('All');
                  setCurrentPage(1);
                }}
                className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors ${
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
                    className={`flex items-center justify-between py-1.5 px-2 rounded-lg cursor-pointer transition-colors ${
                      selectedCategory === 'Electronics' ? 'bg-blue-50/80 text-blue-700 font-semibold' : 'hover:bg-slate-50'
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
                        className={`py-1 px-2 rounded cursor-pointer hover:bg-slate-50 ${selectedCategory === 'Mobiles' ? 'text-blue-600 font-bold bg-blue-50/50' : ''}`}
                      >
                        › Mobiles (632)
                      </div>
                      <div
                        onClick={() => { setSelectedCategory('Laptops'); setCurrentPage(1); }}
                        className={`py-1 px-2 rounded cursor-pointer hover:bg-slate-50 ${selectedCategory === 'Laptops' ? 'text-blue-600 font-bold bg-blue-50/50' : ''}`}
                      >
                        › Laptops (312)
                      </div>
                      <div
                        onClick={() => { setSelectedCategory('Accessories'); setCurrentPage(1); }}
                        className={`py-1 px-2 rounded cursor-pointer hover:bg-slate-50 ${selectedCategory === 'Accessories' ? 'text-blue-600 font-bold bg-blue-50/50' : ''}`}
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
                    className={`flex items-center justify-between py-1.5 px-2 rounded-lg cursor-pointer transition-colors ${
                      selectedCategory === 'Fashion' ? 'bg-blue-50/80 text-blue-700 font-semibold' : 'hover:bg-slate-50'
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
                        className={`py-1 px-2 rounded cursor-pointer hover:bg-slate-50 ${selectedCategory === 'Men Clothing' ? 'text-blue-600 font-bold bg-blue-50/50' : ''}`}
                      >
                        › Men (540)
                      </div>
                      <div
                        onClick={() => { setSelectedCategory('Footwear'); setCurrentPage(1); }}
                        className={`py-1 px-2 rounded cursor-pointer hover:bg-slate-50 ${selectedCategory === 'Footwear' ? 'text-blue-600 font-bold bg-blue-50/50' : ''}`}
                      >
                        › Footwear (512)
                      </div>
                      <div
                        onClick={() => { setSelectedCategory('Fashion'); setCurrentPage(1); }}
                        className="py-1 px-2 rounded cursor-pointer hover:bg-slate-50"
                      >
                        › Kids (228)
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Home & Living */}
                <div>
                  <div
                    onClick={() => {
                      toggleCategoryExpand('cat-home');
                      setSelectedCategory('Home & Living');
                      setCurrentPage(1);
                    }}
                    className={`flex items-center justify-between py-1.5 px-2 rounded-lg cursor-pointer transition-colors ${
                      selectedCategory === 'Home & Living' ? 'bg-blue-50/80 text-blue-700 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 text-[10px]">{expandedCategories['cat-home'] ? '▼' : '▶'}</span>
                      <span>Home & Living (820)</span>
                    </div>
                  </div>

                  {expandedCategories['cat-home'] && (
                    <div className="pl-4 space-y-1 text-[11px] text-slate-500 py-0.5">
                      <div className="py-1 px-2 rounded cursor-pointer hover:bg-slate-50">› Furniture (320)</div>
                      <div className="py-1 px-2 rounded cursor-pointer hover:bg-slate-50">› Kitchen (250)</div>
                      <div className="py-1 px-2 rounded cursor-pointer hover:bg-slate-50">› Decor (250)</div>
                    </div>
                  )}
                </div>

                {/* Standalone Categories */}
                <div
                  onClick={() => { setSelectedCategory('Beauty & Personal Care'); setCurrentPage(1); }}
                  className="py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50"
                >
                  › Beauty & Personal Care (410)
                </div>
                <div
                  onClick={() => { setSelectedCategory('Sports & Fitness'); setCurrentPage(1); }}
                  className="py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50"
                >
                  › Sports & Fitness (280)
                </div>
                <div
                  onClick={() => { setSelectedCategory('Books'); setCurrentPage(1); }}
                  className={`py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50 ${selectedCategory === 'Books' ? 'text-blue-600 font-bold bg-blue-50/50' : ''}`}
                >
                  › Books & Stationery (210)
                </div>
                <div
                  onClick={() => { setSelectedCategory('Home Care'); setCurrentPage(1); }}
                  className={`py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50 ${selectedCategory === 'Home Care' ? 'text-blue-600 font-bold bg-blue-50/50' : ''}`}
                >
                  › Home Care & FMCG (180)
                </div>
                <div
                  onClick={() => { setSelectedCategory('Automotive'); setCurrentPage(1); }}
                  className="py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50"
                >
                  › Automotive (120)
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <button
              onClick={() => navigateTo('catalog-categories')}
              className="w-full text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1.5 py-1.5 bg-blue-50/50 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" /> Manage Categories
            </button>
          </div>
        </div>

        {/* ================= CENTER: Products Table (6 cols on lg) ================= */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden flex flex-col justify-between">
          {/* Filters Bar above table matching screenshot */}
          <div className="p-3.5 border-b border-slate-100 flex items-center justify-between gap-2 flex-wrap bg-slate-50/40">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Mobiles">Mobiles</option>
                <option value="Laptops">Laptops</option>
                <option value="Footwear">Footwear</option>
                <option value="Men Clothing">Men Clothing</option>
                <option value="Home & Living">Home & Living</option>
                <option value="Books">Books</option>
                <option value="Home Care">Home Care</option>
              </select>

              {/* Brand Dropdown */}
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value="All">All Brands</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Nike">Nike</option>
                <option value="Levi's">Levi's</option>
                <option value="Jack & Jones">Jack & Jones</option>
                <option value="Home Centre">Home Centre</option>
                <option value="Surf Excel">Surf Excel</option>
              </select>

              {/* Status Dropdown */}
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span className="whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="stock">Stock Available</option>
              </select>
            </div>
          </div>

          {/* Bulk Selection Bar */}
          {selectedProductIds.length > 0 && (
            <div className="px-4 py-2 bg-blue-50 border-b border-blue-100 flex items-center justify-between text-xs text-blue-800 font-medium">
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

          {/* Table Container */}
          <div className="overflow-x-auto min-h-[380px]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
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
                        className={`hover:bg-slate-50/80 transition-colors group ${
                          isSelected ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        {/* Checkbox */}
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

                        {/* Product Image + Title + Subtitle */}
                        <td className="py-3 px-3 max-w-[190px]">
                          <div
                            onClick={() => navigateTo('product-detail', product.id)}
                            className="flex items-center gap-2.5 cursor-pointer"
                            title="Click to open single product page with details & edit"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover border border-slate-100 flex-shrink-0 group-hover:scale-105 transition-transform"
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                {product.name}
                              </p>
                              <p className="text-[11px] text-slate-400 truncate">
                                {product.subtitle || product.brand}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* SKU */}
                        <td className="py-3 px-2 text-slate-500 font-mono text-[11px]">
                          {product.sku}
                        </td>

                        {/* Category */}
                        <td className="py-3 px-2 text-slate-600 font-medium truncate max-w-[90px]">
                          {product.category}
                        </td>

                        {/* Price */}
                        <td className="py-3 px-2 font-bold text-slate-900 whitespace-nowrap">
                          ₹ {product.price.toLocaleString('en-IN')}
                        </td>

                        {/* Stock */}
                        <td className="py-3 px-2 font-semibold text-slate-700">
                          {product.stock}
                        </td>

                        {/* Status badge */}
                        <td className="py-3 px-2 whitespace-nowrap">
                          {isInStock ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              In Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/50">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                              Out of Stock
                            </span>
                          )}
                        </td>

                        {/* Action menu */}
                        <td className="py-3 px-3 text-right relative">
                          <button
                            onClick={() => setOpenActionMenuId(openActionMenuId === product.id ? null : product.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {openActionMenuId === product.id && (
                            <div className="absolute right-3 top-10 w-44 bg-white rounded-xl shadow-2xl border border-slate-200 py-1 z-30 animate-in fade-in zoom-in duration-100">
                              <button
                                onClick={() => {
                                  navigateTo('product-detail', product.id);
                                  setOpenActionMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 text-left font-medium cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-blue-500" /> View Single Page
                              </button>
                              <button
                                onClick={() => {
                                  setEditingProduct(product);
                                  setIsProductModalOpen(true);
                                  setOpenActionMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 text-left font-medium cursor-pointer"
                              >
                                <Edit2 className="w-3.5 h-3.5 text-amber-500" /> Quick Edit
                              </button>
                              <button
                                onClick={() => {
                                  deleteProduct(product.id);
                                  setOpenActionMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left font-medium cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-500" /> Delete Product
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

          {/* DYNAMIC PAGINATION FOOTER - 1 TO 540+ PAGES */}
          <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/40 text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <span>
                Showing {startRecord}-{endRecord} of {TOTAL_CATALOG_COUNT.toLocaleString()} products
              </span>
              <span className="hidden md:inline text-slate-300">•</span>
              <span className="hidden md:inline font-semibold text-slate-700">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            {/* Sliding Window Pagination Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {/* Previous Button */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer font-bold"
                title="Previous Page"
              >
                ‹
              </button>

              {/* Dynamic Number Pills */}
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
                  <button
                    key={num}
                    onClick={() => setCurrentPage(Number(num))}
                    className={`min-w-[28px] h-7 px-1.5 flex items-center justify-center rounded-lg font-semibold text-xs transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer font-bold"
                title="Next Page"
              >
                ›
              </button>

              {/* Jump to Specific Page Input */}
              <form onSubmit={handleJumpPage} className="flex items-center gap-1 ml-2">
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  placeholder="Go to..."
                  value={jumpPageInput}
                  onChange={(e) => setJumpPageInput(e.target.value)}
                  className="w-14 h-7 text-center text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 px-1"
                />
                <button
                  type="submit"
                  className="h-7 px-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 cursor-pointer"
                >
                  Go
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: Best Seller Card + Quick Actions (3 cols on lg) ================= */}
        <div className="lg:col-span-3 space-y-5">
          {/* Best Seller Card matching screenshot */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white shadow-sm">
                Best Seller
              </span>
            </div>

            <div
              onClick={() => navigateTo('product-detail', bestSellerProduct.id)}
              className="cursor-pointer group text-center pt-2"
            >
              <div className="h-44 w-full flex items-center justify-center mb-3">
                <img
                  src={bestSellerProduct.image}
                  alt={bestSellerProduct.name}
                  className="max-h-40 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
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

            <button
              onClick={() => handleAddBestSellerToCart(bestSellerProduct)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>

          {/* Quick Actions Card matching screenshot */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
            <h3 className="font-bold text-slate-800 text-sm mb-3">Quick Actions</h3>

            <div className="space-y-1.5 text-xs font-medium text-slate-700">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsProductModalOpen(true);
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
              >
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-800">Add New Product</span>
              </button>

              <button
                onClick={() => setIsBulkUploadOpen(true)}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
              >
                <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-800">Bulk Upload Products</span>
              </button>

              <button
                onClick={() => navigateTo('catalog-categories')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
              >
                <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-800">Manage Categories</span>
              </button>

              <button
                onClick={() => navigateTo('orders')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
              >
                <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-800">View Orders</span>
              </button>

              <button
                onClick={() => navigateTo('customers')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
              >
                <div className="p-1.5 bg-sky-50 text-sky-600 rounded-lg group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <Users className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-800">Manage Customers</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
              >
                <div className="p-1.5 bg-rose-50 text-rose-600 rounded-lg group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-800">Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Add / Edit Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setEditingProduct(null);
        }}
        initialData={editingProduct}
      />

      {/* Bulk Upload Modal */}
      <BulkUploadModal
        isOpen={isBulkUploadOpen}
        onClose={() => setIsBulkUploadOpen(false)}
      />

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
      />
    </div>
  );
};
