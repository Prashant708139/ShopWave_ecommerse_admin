import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import {
  Search,
  Bell,
  Settings,
  ChevronDown,
  User,
  LogOut,
  Package,
  ShoppingBag,
  Users,
  Menu,
  AlertTriangle,
  CreditCard,
  Star,
  Trash2,
  CheckCheck,
} from "lucide-react";

export const Header = () => {
  const {
    currentUser,
    logout,
    notifications,
    unreadNotificationsCount,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    deleteNotification,
    products,
    orders,
    customers,
    navigateTo,
    setIsMobileMenuOpen,
    isMobileMenuOpen,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter search results across Products, Orders, Customers
  const filteredProducts = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 4)
    : [];

  const filteredOrders = searchQuery.trim()
    ? orders
        .filter(
          (o) =>
            o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 3)
    : [];

  const filteredCustomers = searchQuery.trim()
    ? customers
        .filter(
          (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.email.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 3)
    : [];

  const totalResultsCount =
    filteredProducts.length + filteredOrders.length + filteredCustomers.length;

  const getNotifIcon = (type) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="w-4 h-4 text-blue-600" />;
      case "inventory":
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case "payment":
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case "review":
        return <Star className="w-4 h-4 text-yellow-600" />;
      default:
        return <Bell className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Toggle & Global Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar */}
          <div className="relative w-full" ref={searchRef}>
            <div className="flex items-center w-full bg-slate-50 hover:bg-white border border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 rounded-md px-3.5 py-1.5 transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search products, orders, customers..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-slate-400 hover:text-slate-600 px-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {showSearchResults && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-md shadow-lg border border-slate-200 py-2 z-50 max-h-[440px] overflow-y-auto">
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider flex justify-between">
                  <span>Search Results</span>
                  <span>{totalResultsCount} found</span>
                </div>

                {totalResultsCount === 0 ? (
                  <div className="p-6 text-center text-slate-500 text-sm">
                    No results found for "
                    <span className="font-semibold text-slate-700">
                      {searchQuery}
                    </span>
                    "
                  </div>
                ) : (
                  <>
                    {/* Products */}
                    {filteredProducts.length > 0 && (
                      <div className="py-1">
                        <div className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5" /> Products (
                          {filteredProducts.length})
                        </div>
                        {filteredProducts.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => {
                              navigateTo("product-detail", p.id);
                              setShowSearchResults(false);
                            }}
                            className="flex items-center justify-between px-3.5 py-2 hover:bg-slate-50 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-8 h-8 rounded-md object-cover border border-slate-200"
                              />
                              <div>
                                <p className="text-sm font-medium text-slate-800">
                                  {p.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                  SKU: {p.sku} • {p.category}
                                </p>
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-blue-600">
                              ₹{p.price.toLocaleString("en-IN")}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Orders */}
                    {filteredOrders.length > 0 && (
                      <div className="py-1 border-t border-slate-100">
                        <div className="px-3 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 flex items-center gap-1.5">
                          <ShoppingBag className="w-3.5 h-3.5" /> Orders (
                          {filteredOrders.length})
                        </div>
                        {filteredOrders.map((o) => (
                          <div
                            key={o.id}
                            onClick={() => {
                              navigateTo("orders");
                              setShowSearchResults(false);
                            }}
                            className="flex items-center justify-between px-3.5 py-2 hover:bg-slate-50 cursor-pointer transition-colors"
                          >
                            <div>
                              <p className="text-sm font-medium text-slate-800">
                                Order #{o.id}
                              </p>
                              <p className="text-xs text-slate-500">
                                {o.customer.name} • {o.items.length} items
                              </p>
                            </div>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              {o.orderStatus}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Customers */}
                    {filteredCustomers.length > 0 && (
                      <div className="py-1 border-t border-slate-100">
                        <div className="px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" /> Customers (
                          {filteredCustomers.length})
                        </div>
                        {filteredCustomers.map((c) => (
                          <div
                            key={c.id}
                            onClick={() => {
                              navigateTo("customers");
                              setShowSearchResults(false);
                            }}
                            className="flex items-center justify-between px-3.5 py-2 hover:bg-slate-50 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <img
                                src={c.avatar}
                                alt={c.name}
                                className="w-7 h-7 rounded-full object-cover"
                              />
                              <div>
                                <p className="text-sm font-medium text-slate-800">
                                  {c.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {c.email}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs text-slate-500 font-medium">
                              {c.role}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notification Center */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-[16px] text-[10px] font-bold text-white bg-rose-600 rounded-full px-1">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-md shadow-lg border border-slate-200 overflow-hidden z-50">
                <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900 text-sm">
                      Notifications
                    </h3>
                    <span className="text-xs bg-rose-100 text-rose-700 font-medium px-2 py-0.5 rounded-md">
                      {unreadNotificationsCount} unread
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                        title="Mark all as read"
                      >
                        <CheckCheck className="w-3.5 h-3.5" /> Read All
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button
                        onClick={clearAllNotifications}
                        className="text-xs text-slate-400 hover:text-rose-600 font-medium ml-1"
                        title="Clear all notifications"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-[340px] overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-sm">
                      <Bell className="w-7 h-7 mx-auto mb-2 opacity-30" />
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`p-3 flex items-start gap-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                          !n.read ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <div className="p-2 rounded-md bg-slate-100 flex-shrink-0 mt-0.5">
                          {getNotifIcon(n.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <p
                              className={`text-xs ${!n.read ? "font-semibold text-slate-900" : "font-medium text-slate-700"}`}
                            >
                              {n.title}
                            </p>
                            {!n.read && (
                              <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                            {n.description}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 inline-block">
                            {n.time}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(n.id);
                          }}
                          className="text-slate-300 hover:text-rose-600 p-1 rounded transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center">
                  <button
                    onClick={() => {
                      navigateTo("notifications-history");
                      setShowNotifications(false);
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    View All Notifications History →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Settings Icon */}
          <button
            onClick={() => navigateTo("settings")}
            className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-slate-600" />
          </button>

          {/* User Profile */}
          <div className="relative pl-1" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 rounded-md hover:bg-slate-100 focus:outline-none transition-colors"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-300"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-900 leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {currentUser.role === "Super Admin"
                    ? "Admin"
                    : currentUser.role}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-50">
                <div className="px-3.5 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">
                    {currentUser.name}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {currentUser.email}
                  </p>
                  <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                    {currentUser.role}
                  </span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      navigateTo("customers");
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-100 text-left transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" /> My Profile
                  </button>

                  <button
                    onClick={() => {
                      navigateTo("settings");
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-100 text-left transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" /> Store
                    Settings
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 font-medium text-left transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
