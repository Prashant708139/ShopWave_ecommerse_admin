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

  // Keep dropdown open states
  const [openMenus, setOpenMenus] = useState({
    catalog: true,
    orders: false,
    customers: false,
    inventory: false,
    pricing: false,
    marketing: false,
    promotions: false,
    content: false,
    reports: false,
    settings: false,
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
          tab: "orders",
        },
        {
          id: "orders-returns",
          label: "Returns & Refunds",
          icon: RotateCcw,
          tab: "orders",
        },
        {
          id: "orders-invoices",
          label: "Invoices",
          icon: FileSpreadsheet,
          tab: "orders",
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
          tab: "customers",
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
          tab: "inventory",
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
          tab: "pricing",
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
          tab: "marketing",
        },
        {
          id: "marketing-seo",
          label: "SEO Config",
          icon: Globe,
          tab: "marketing",
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
          tab: "promotions",
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
          tab: "content",
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
          tab: "reports",
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
          tab: "settings",
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
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0c1322] border-r border-[#1a243a] flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 flex items-center justify-between border-b border-[#182238]">
          <div
            onClick={() => navigateTo("dashboard")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Logo Icon */}
            <div className="w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-1">
                ShopWave
              </h1>
              <p className="text-[10px] font-medium text-slate-400 tracking-wide">
                Smart. Simple. Shopping.
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links with custom scrollbar */}
        <div className="flex-1 overflow-y-auto dark-scrollbar py-4 px-3 space-y-1.5">
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
                  onClick={() => navigateTo(item.tab)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`}
                  />
                  <span className="flex-1 text-left">{item.label}</span>
                </button>
              );
            }

            return (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => toggleMenu(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isSelected
                      ? "text-white bg-slate-800/40"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-slate-400" />
                    <span>{item.label}</span>
                  </div>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 transition-transform duration-200" />
                  )}
                </button>

                {/* Submenu Dropdown Items */}
                {isOpen && item.children && (
                  <div className="pl-4 pr-1 py-1 space-y-1">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActive =
                        activeTab === child.id ||
                        (child.id === "catalog-products" &&
                          activeTab === "catalog-products") ||
                        (child.tab === activeTab && !child.id.includes("-"));

                      return (
                        <button
                          key={child.id}
                          onClick={() => navigateTo(child.id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            isChildActive
                              ? "text-blue-400 bg-blue-500/10 font-semibold"
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                          }`}
                        >
                          <ChildIcon
                            className={`w-4 h-4 ${isChildActive ? "text-blue-400" : "text-slate-500"}`}
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

        {/* Bottom User Card matching screenshot ("Admin - Super Admin") */}
        <div className="p-3 border-t border-[#182238] relative">
          <div
            onClick={() => setShowAdminDropdown(!showAdminDropdown)}
            className="flex items-center justify-between p-2 rounded-xl bg-[#131b2e] hover:bg-[#1a253d] cursor-pointer transition-colors border border-[#1e2a44]"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={currentUser.avatar}
                alt="Admin"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-blue-500/30"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">Admin</p>
                <p className="text-[11px] text-slate-400 truncate">
                  Super Admin
                </p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>

          {/* Quick Admin Dropdown */}
          {showAdminDropdown && (
            <div className="absolute bottom-16 left-3 right-3 bg-[#131b2e] border border-[#1e2a44] rounded-xl shadow-2xl p-2 z-50 space-y-1">
              <div className="px-3 py-2 border-b border-[#1e2a44]">
                <p className="text-xs font-bold text-white">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {currentUser.email}
                </p>
              </div>

              <button
                onClick={() => {
                  navigateTo("settings");
                  setShowAdminDropdown(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg text-left"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" /> System
                Settings
              </button>

              <button
                onClick={() => {
                  setShowAdminDropdown(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg text-left font-medium"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
