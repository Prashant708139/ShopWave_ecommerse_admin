import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_METRICS,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_NOTIFICATIONS,
  CATEGORY_TREE_DATA,
  INITIAL_BRANDS,
  INITIAL_PROMOTIONS,
  DATE_RANGE_DATA
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Clerk Key Configuration
  const [clerkPublishableKey, setClerkPublishableKey] = useState(() => {
    return import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || localStorage.getItem('shopwave_clerk_key') || '';
  });

  const isClerkActive = Boolean(clerkPublishableKey && clerkPublishableKey.startsWith('pk_'));

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('shopwave_auth');
    return savedAuth !== null ? JSON.parse(savedAuth) : true;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('shopwave_user');
    return savedUser ? JSON.parse(savedUser) : {
      name: 'Vineet Yadav',
      email: 'admin@shopwave.com',
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
      storeName: 'ShopWave MegaStore'
    };
  });

  // Navigation & Filters State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeProductId, setActiveProductId] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 7 days');
  const [globalSearch, setGlobalSearch] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Data States with LocalStorage Sync
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('shopwave_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('shopwave_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('shopwave_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('shopwave_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [brands, setBrands] = useState(() => {
    const saved = localStorage.getItem('shopwave_brands');
    return saved ? JSON.parse(saved) : INITIAL_BRANDS;
  });

  const [promotions, setPromotions] = useState(() => {
    const saved = localStorage.getItem('shopwave_promotions');
    return saved ? JSON.parse(saved) : INITIAL_PROMOTIONS;
  });

  const [categoryTree, setCategoryTree] = useState(() => {
    const saved = localStorage.getItem('shopwave_categories');
    return saved ? JSON.parse(saved) : CATEGORY_TREE_DATA;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('shopwave_settings');
    return saved ? JSON.parse(saved) : {
      storeName: 'ShopWave',
      tagline: 'Smart. Simple. Shopping.',
      currency: '₹',
      currencySymbol: 'INR',
      taxRate: 18,
      shippingFee: 99,
      freeShippingThreshold: 999,
      contactEmail: 'support@shopwave.com',
      contactPhone: '+91 98765 43210',
      address: 'ShopWave Hub, Connaught Place, New Delhi, India 110001',
      enableNotifications: true,
      autoStockAlert: true,
      lowStockThreshold: 5
    };
  });

  // Toast State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync to LocalStorage
  useEffect(() => {
    if (clerkPublishableKey) {
      localStorage.setItem('shopwave_clerk_key', clerkPublishableKey);
    } else {
      localStorage.removeItem('shopwave_clerk_key');
    }
  }, [clerkPublishableKey]);

  useEffect(() => {
    localStorage.setItem('shopwave_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('shopwave_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('shopwave_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('shopwave_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('shopwave_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('shopwave_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('shopwave_brands', JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem('shopwave_promotions', JSON.stringify(promotions));
  }, [promotions]);

  useEffect(() => {
    localStorage.setItem('shopwave_categories', JSON.stringify(categoryTree));
  }, [categoryTree]);

  useEffect(() => {
    localStorage.setItem('shopwave_settings', JSON.stringify(settings));
  }, [settings]);

  // Auth Functions
  const login = (email, password, name = null) => {
    if (email) {
      setIsAuthenticated(true);
      const userName = name || (email.split('@')[0].toUpperCase() === 'ADMIN' ? 'Vineet Yadav' : email.split('@')[0]);
      setCurrentUser(prev => ({
        ...prev,
        email,
        name: userName
      }));
      showToast(`Welcome back, ${userName}!`);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Logged out successfully.', 'info');
  };

  // Navigation
  const navigateTo = (tab, productId = null) => {
    setActiveTab(tab);
    if (productId !== null) {
      setActiveProductId(productId);
    }
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product Functions
  const addProduct = (newProductData) => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      status: Number(newProductData.stock) > 0 ? 'In Stock' : 'Out of Stock',
      images: newProductData.images || [newProductData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'],
      ...newProductData,
      price: Number(newProductData.price),
      originalPrice: Number(newProductData.originalPrice || newProductData.price * 1.2),
      stock: Number(newProductData.stock)
    };

    setProducts(prev => [newProduct, ...prev]);

    addNotification({
      title: `Product Created: ${newProduct.name}`,
      description: `SKU ${newProduct.sku} added under ${newProduct.category} category.`,
      type: 'product'
    });

    showToast(`Product "${newProduct.name}" created successfully!`);
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const stock = updatedFields.stock !== undefined ? Number(updatedFields.stock) : p.stock;
        const status = stock > 0 ? 'In Stock' : 'Out of Stock';
        return {
          ...p,
          ...updatedFields,
          stock,
          status,
          price: updatedFields.price !== undefined ? Number(updatedFields.price) : p.price,
          originalPrice: updatedFields.originalPrice !== undefined ? Number(updatedFields.originalPrice) : p.originalPrice,
        };
      }
      return p;
    }));

    showToast('Product updated successfully!');
  };

  const deleteProduct = (id) => {
    const prod = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`Product "${prod ? prod.name : id}" deleted.`, 'info');
    if (activeProductId === id) {
      setActiveProductId(null);
      setActiveTab('dashboard');
    }
  };

  const bulkDeleteProducts = (ids) => {
    setProducts(prev => prev.filter(p => !ids.includes(p.id)));
    showToast(`${ids.length} products deleted.`, 'info');
  };

  // Orders Functions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, orderStatus: newStatus };
      }
      return o;
    }));

    addNotification({
      title: `Order #${orderId} Updated`,
      description: `Status changed to "${newStatus}".`,
      type: 'order'
    });

    showToast(`Order #${orderId} status set to ${newStatus}`);
  };

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      orderStatus: 'Processing',
      paymentStatus: 'Paid',
      ...orderData
    };

    // Decrement stock if product found
    if (orderData.items && orderData.items.length > 0) {
      orderData.items.forEach(it => {
        const matchingProd = products.find(p => p.id === it.id || p.sku === it.sku);
        if (matchingProd) {
          updateProduct(matchingProd.id, { stock: Math.max(0, matchingProd.stock - (it.quantity || 1)) });
        }
      });
    }

    setOrders(prev => [newOrder, ...prev]);

    addNotification({
      title: `New Order #${newOrder.id} Placed!`,
      description: `Order total: ₹${(newOrder.totalAmount || 0).toLocaleString('en-IN')}`,
      type: 'order'
    });

    showToast(`New order #${newOrder.id} created!`);
    return newOrder;
  };

  // Customers Functions
  const addCustomer = (customerData) => {
    const newCust = {
      id: `cust-${Date.now()}`,
      totalSpent: 0,
      ordersCount: 0,
      status: 'Active',
      joinedDate: 'Just Now',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
      ...customerData
    };
    setCustomers(prev => [newCust, ...prev]);
    showToast(`Customer ${newCust.name} added.`);
    return newCust;
  };

  const deleteCustomer = (id) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
    showToast('Customer removed.', 'info');
  };

  // Notifications Functions
  const addNotification = ({ title, description, type = 'general' }) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      description,
      time: 'Just now',
      timestamp: Date.now(),
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast('All notifications cleared.', 'info');
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Categories & Brands
  const addCategoryItem = (parentId, name) => {
    const newItem = {
      id: `cat-${Date.now()}`,
      name,
      count: 0
    };

    const updateTree = (nodes) => {
      return nodes.map(node => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...(node.children || []), newItem]
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children)
          };
        }
        return node;
      });
    };

    setCategoryTree(prev => updateTree(prev));
    showToast(`Category "${name}" added!`);
  };

  const addBrandItem = (brandData) => {
    const newBrand = {
      id: `brand-${Date.now()}`,
      count: 0,
      logo: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=50&q=80',
      ...brandData
    };
    setBrands(prev => [newBrand, ...prev]);
    showToast(`Brand "${newBrand.name}" added!`);
  };

  // Promotions
  const addPromotionCode = (promoData) => {
    const newPromo = {
      id: `promo-${Date.now()}`,
      usageCount: 0,
      status: 'Active',
      ...promoData
    };
    setPromotions(prev => [newPromo, ...prev]);
    showToast(`Coupon ${newPromo.code} created!`);
  };

  const togglePromotionStatus = (id) => {
    setPromotions(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return p;
    }));
    showToast('Promotion status updated.');
  };

  // Dynamic Date-Range Metrics & Chart Calculation
  const baseRangeData = DATE_RANGE_DATA[selectedDateRange] || DATE_RANGE_DATA['Last 7 days'];

  const orderAddedRevenue = orders
    .filter(o => o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0) - 120000;

  const currentDynamicMetrics = {
    ...baseRangeData.metrics,
    totalRevenue: Math.max(0, baseRangeData.metrics.totalRevenue + (orderAddedRevenue > 0 ? orderAddedRevenue : 0)),
    totalOrders: baseRangeData.metrics.totalOrders + (orders.length - 5),
    totalCustomers: baseRangeData.metrics.totalCustomers + (customers.length - 5),
    totalProducts: 4320 + (products.length - 8),
    pendingOrders: orders.filter(o => o.orderStatus === 'Pending').length + (selectedDateRange === 'Today' ? 7 : 22),
  };

  const currentSalesChart = baseRangeData.salesChart;

  return (
    <AppContext.Provider
      value={{
        // Clerk Auth
        clerkPublishableKey,
        setClerkPublishableKey,
        isClerkActive,

        // Auth
        isAuthenticated,
        currentUser,
        setCurrentUser,
        login,
        logout,

        // Navigation & Filters
        activeTab,
        setActiveTab,
        activeProductId,
        setActiveProductId,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedDateRange,
        setSelectedDateRange,
        globalSearch,
        setGlobalSearch,
        isSidebarOpen,
        setIsSidebarOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        navigateTo,

        // Data
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        bulkDeleteProducts,

        orders,
        setOrders,
        updateOrderStatus,
        addOrder,

        customers,
        addCustomer,
        deleteCustomer,

        notifications,
        unreadNotificationsCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearAllNotifications,
        deleteNotification,

        categoryTree,
        addCategoryItem,

        brands,
        addBrandItem,

        promotions,
        addPromotionCode,
        togglePromotionStatus,

        settings,
        setSettings,

        dynamicMetrics: currentDynamicMetrics,
        currentSalesChart,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
