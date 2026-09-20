import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  LayoutGrid,
  Tag,
  Award,
  Layers,
  ShoppingCart,
  Users,
  Box,
  BadgePercent,
  Megaphone,
  Percent,
  FileText,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  X,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  FileSpreadsheet,
  Building2,
  Mail,
  Flame,
  Globe,
} from "lucide-react";

export const Sidebar = () => {
  const {
    activeTab,
    navigateTo,
    currentUser,
    logout,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useApp();

  const [openMenus, setOpenMenus] = useState({
    catalog: true,
    orders: true,
    customers: true,
    inventory: true,
    pricing: true,
    marketing: true,
    promotions: true,
    content: true,
    reports: true,
    settings: true,
  });

  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      isDropdown: false,
      tab: "dashboard",
    },
    {
      id: "catalog",
      label: "Catalog",
      icon: Package,
      isDropdown: true,
      children: [
        {
          id: "catalog-products",
          label: "Products",
          icon: ShoppingBag,
          tab: "catalog-products",
        },
        {
          id: "catalog-categories",
          label: "Categories",
          icon: LayoutGrid,
          tab: "catalog-categories",
        },
        {
          id: "catalog-attributes",
          label: "Attributes",
          icon: Tag,
          tab: "catalog-attributes",
        },
        {
          id: "catalog-brands",
          label: "Brands",
          icon: Award,
          tab: "catalog-brands",
        },
        {
          id: "catalog-collections",
          label: "Collections",
          icon: Layers,
          tab: "catalog-collections",
        },
      ],
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingCart,
      isDropdown: true,
      children: [
        {
          id: "orders",
          label: "All Orders",
          icon: ShoppingCart,
          tab: "orders",
        },
        {
          id: "orders-pending",
          label: "Pending Orders",
          icon: Truck,
          tab: "orders-pending",
        },
        {
          id: "orders-returns",
          label: "Returns & Refunds",
          icon: RotateCcw,
          tab: "orders-returns",
        },
        {
          id: "orders-invoices",
          label: "Invoices",
          icon: FileSpreadsheet,
          tab: "orders-invoices",
        },
      ],
    },
    {
      id: "customers",
      label: "Customers",
      icon: Users,
      isDropdown: true,
      children: [
        {
          id: "customers",
          label: "Customer List",
          icon: Users,
          tab: "customers",
        },
        {
          id: "customers-segments",
          label: "Segments",
          icon: ShieldCheck,
          tab: "customers-segments",
        },
      ],
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: Box,
      isDropdown: true,
      children: [
        {
          id: "inventory",
          label: "Stock Manager",
          icon: Box,
          tab: "inventory",
        },
        {
          id: "inventory-warehouses",
          label: "Warehouses",
          icon: Building2,
          tab: "inventory-warehouses",
        },
      ],
    },
    {
      id: "pricing",
      label: "Pricing",
      icon: BadgePercent,
      isDropdown: true,
      children: [
        { id: "pricing", label: "Discount Rules", icon: Tag, tab: "pricing" },
        {
          id: "pricing-lists",
          label: "Price Lists",
          icon: BadgePercent,
          tab: "pricing-lists",
        },
      ],
    },
    {
      id: "marketing",
      label: "Marketing",
      icon: Megaphone,
      isDropdown: true,
      children: [
        {
          id: "marketing",
          label: "Campaigns",
          icon: Megaphone,
          tab: "marketing",
        },
        {
          id: "marketing-newsletters",
          label: "Newsletters",
          icon: Mail,
          tab: "marketing-newsletters",
        },
        {
          id: "marketing-seo",
          label: "SEO Config",
          icon: Globe,
          tab: "marketing-seo",
        },
      ],
    },
    {
      id: "promotions",
      label: "Promotions",
      icon: Percent,
      isDropdown: true,
      children: [
        {
          id: "promotions",
          label: "Coupons & Vouchers",
          icon: Percent,
          tab: "promotions",
        },
        {
          id: "promotions-flash",
          label: "Flash Sales",
          icon: Flame,
          tab: "promotions-flash",
        },
      ],
    },
    {
      id: "content",
      label: "Content",
      icon: FileText,
      isDropdown: true,
      children: [
        { id: "content", label: "Store Pages", icon: FileText, tab: "content" },
        {
          id: "content-blogs",
          label: "Blog Posts",
          icon: Sparkles,
          tab: "content-blogs",
        },
      ],
    },
    {
      id: "reports",
      label: "Reports",
      icon: BarChart3,
      isDropdown: true,
      children: [
        {
          id: "reports",
          label: "Sales Reports",
          icon: BarChart3,
          tab: "reports",
        },
        {
          id: "reports-analytics",
          label: "Store Analytics",
          icon: FileSpreadsheet,
          tab: "reports-analytics",
        },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      isDropdown: true,
      children: [
        {
          id: "settings",
          label: "Store Settings",
          icon: Settings,
          tab: "settings",
        },
        {
          id: "settings-payment",
          label: "Payment & Shipping",
          icon: Truck,
          tab: "settings-payment",
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Light Mode Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-200">
          <div
            onClick={() => {
              navigateTo("dashboard");
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Solid Logo Icon */}
            <div className="w-9 h-9 rounded-md bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                ShopWave
              </h1>
              <p className="text-[10px] font-medium text-slate-500 tracking-wide">
                Smart. Simple. Shopping.
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-slate-500 hover:text-slate-800 p-1 rounded-md hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected =
              activeTab === item.tab ||
              (item.children && item.children.some((c) => c.tab === activeTab));
            const isOpen = openMenus[item.id];

            if (!item.isDropdown) {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigateTo(item.tab);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`}
                  />
                  <span className="flex-1 text-left">{item.label}</span>
                </button>
              );
            }

            return (
              <div key={item.id} className="space-y-0.5">
                <div
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? "text-slate-900 bg-slate-100 font-semibold"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {/* Left Label & Icon -> Navigate to primary route & expand */}
                  <div
                    onClick={() => {
                      if (!isOpen) toggleMenu(item.id);
                      const defaultTab = item.children ? item.children[0].id : item.id;
                      navigateTo(defaultTab);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 flex-1"
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? "text-blue-600" : "text-slate-500"}`} />
                    <span>{item.label}</span>
                  </div>

                  {/* Right Arrow -> Toggle Submenu */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(item.id);
                    }}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
                  >
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* Submenu Dropdown Items */}
                {isOpen && item.children && (
                  <div className="pl-4 pr-1 py-0.5 space-y-0.5">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActive =
                        activeTab === child.id ||
                        activeTab === child.tab ||
                        (child.id === "catalog-products" && activeTab === "dashboard");

                      return (
                        <button
                          key={child.id}
                          onClick={() => {
                            navigateTo(child.tab || child.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                            isChildActive
                              ? "text-blue-700 bg-blue-50 font-semibold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                          }`}
                        >
                          <ChildIcon
                            className={`w-3.5 h-3.5 ${isChildActive ? "text-blue-600" : "text-slate-400"}`}
                          />
                          <span className="truncate">{child.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Light Profile Card */}
        <div className="p-3 border-t border-slate-200 relative bg-slate-50/50">
          <div
            onClick={() => setShowAdminDropdown(!showAdminDropdown)}
            className="flex items-center justify-between p-2 rounded-md bg-white hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={currentUser.avatar}
                alt="Admin"
                className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  Admin
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  Super Admin
                </p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>

          {/* Quick Admin Dropdown Popover */}
          {showAdminDropdown && (
            <div className="absolute bottom-16 left-3 right-3 bg-white border border-slate-200 rounded-md shadow-lg p-1.5 z-50 space-y-0.5">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {currentUser.email}
                </p>
              </div>

              <button
                onClick={() => {
                  navigateTo("settings");
                  setShowAdminDropdown(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-md text-left transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" /> System
                Settings
              </button>

              <button
                onClick={() => {
                  setShowAdminDropdown(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-md text-left font-medium transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-500" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
