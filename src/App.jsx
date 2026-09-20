import React from "react";
import { useApp } from "./context/AppContext";
import { ClerkAuthWrapper } from "./components/auth/ClerkAuthWrapper";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { Dashboard } from "./components/dashboard/Dashboard";
import { ProductDetail } from "./components/products/ProductDetail";
import { OrdersView } from "./components/orders/OrdersView";
import { CustomersView } from "./components/customers/CustomersView";
import { InventoryView } from "./components/inventory/InventoryView";
import { CatalogViews } from "./components/catalog/CatalogViews";
import { PricingView } from "./components/pricing/PricingView";
import { MarketingView } from "./components/marketing/MarketingView";
import { PromotionsView } from "./components/promotions/PromotionsView";
import { ContentView } from "./components/content/ContentView";
import { ReportsView } from "./components/reports/ReportsView";
import { SettingsView } from "./components/settings/SettingsView";
import { NotificationHistoryView } from "./components/notifications/NotificationHistoryView";
import { LoginView } from "./components/auth/LoginView";
import { CheckCircle2, Info, AlertTriangle } from "lucide-react";

import { AddEditProductView } from "./components/products/AddEditProductView";
import { BulkProductUploadView } from "./components/products/BulkProductUploadView";
import { CategoryManagementView } from "./components/catalog/CategoryManagementView";
import { OrderCreateDetailView } from "./components/orders/OrderCreateDetailView";

export function AppContent() {
  const { isAuthenticated, activeTab, toast, clerkPublishableKey } = useApp();

  if (!isAuthenticated) {
    return (
      <ClerkAuthWrapper publishableKey={clerkPublishableKey}>
        <LoginView />
      </ClerkAuthWrapper>
    );
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard key="dashboard" />;
      case "catalog-products":
        return <Dashboard key="catalog-products" />;
      case "add-product":
      case "edit-product":
        return <AddEditProductView key={activeTab} />;
      case "bulk-import":
        return <BulkProductUploadView key="bulk-import" />;
      case "catalog-categories":
      case "category-management":
        return <CategoryManagementView key={activeTab} />;
      case "catalog-attributes":
        return <CatalogViews key="catalog-attributes" viewType="attributes" />;
      case "catalog-brands":
        return <CatalogViews key="catalog-brands" viewType="brands" />;
      case "catalog-collections":
        return <CatalogViews key="catalog-collections" viewType="collections" />;
      case "orders":
        return <OrdersView key="orders" initialStatus="All" initialTab="orders" />;
      case "orders-pending":
        return <OrdersView key="orders-pending" initialStatus="Pending" initialTab="orders" />;
      case "orders-returns":
        return <OrdersView key="orders-returns" initialStatus="Cancelled" initialTab="orders" />;
      case "orders-invoices":
        return <OrdersView key="orders-invoices" initialStatus="All" initialTab="invoices" />;
      case "create-order":
        return <OrderCreateDetailView key="create-order" mode="create" />;
      case "order-detail":
        return <OrderCreateDetailView key="order-detail" mode="detail" />;
      case "customers":
        return <CustomersView key="customers" initialTab="directory" />;
      case "customers-segments":
        return <CustomersView key="customers-segments" initialTab="segments" />;
      case "inventory":
        return <InventoryView key="inventory" initialTab="stock" />;
      case "inventory-warehouses":
        return <InventoryView key="inventory-warehouses" initialTab="warehouses" />;
      case "pricing":
        return <PricingView key="pricing" initialTab="rules" />;
      case "pricing-lists":
        return <PricingView key="pricing-lists" initialTab="pricelists" />;
      case "marketing":
        return <MarketingView key="marketing" initialTab="campaigns" />;
      case "marketing-newsletters":
        return <MarketingView key="marketing-newsletters" initialTab="newsletters" />;
      case "marketing-seo":
        return <MarketingView key="marketing-seo" initialTab="seo" />;
      case "promotions":
        return <PromotionsView key="promotions" initialTab="vouchers" />;
      case "promotions-flash":
        return <PromotionsView key="promotions-flash" initialTab="flash" />;
      case "content":
        return <ContentView key="content" initialTab="pages" />;
      case "content-blogs":
        return <ContentView key="content-blogs" initialTab="blogs" />;
      case "reports":
        return <ReportsView key="reports" initialTab="sales" />;
      case "reports-analytics":
        return <ReportsView key="reports-analytics" initialTab="analytics" />;
      case "settings":
        return <SettingsView key="settings" initialTab="general" />;
      case "settings-payment":
        return <SettingsView key="settings-payment" initialTab="payment" />;
      case "notifications-history":
        return <NotificationHistoryView key="notifications-history" />;
      case "product-detail":
        return <ProductDetail key="product-detail" />;
      default:
        return <Dashboard key="default" />;
    }
  };

  return (
    <ClerkAuthWrapper publishableKey={clerkPublishableKey}>
      <div className="min-h-screen bg-[#f5f7fa] flex">
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 md:pl-64 flex flex-col min-w-0">
          <Header />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto overflow-x-hidden">
            {renderActiveView()}
          </main>
        </div>

        {/* Floating Global Toast Alert */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 text-xs font-semibold">
              {toast.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              ) : toast.type === "error" ? (
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    </ClerkAuthWrapper>
  );
}

export default function App() {
  return <AppContent />;
}
