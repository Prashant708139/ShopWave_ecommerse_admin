# 🛍️ ShopWave - Full E-Commerce Admin & Management System

ShopWave is a modern, full-featured **React.js + Tailwind CSS** (Pure JavaScript) e-commerce store & admin dashboard application featuring live LocalStorage sync, Clerk authentication, 1-540+ dynamic pagination, image file upload, dynamic date-range charts, and real-time state management.

---

## 📁 Project Directory Structure (Clean & Sequenced)

```
ShopWave-Ecommerce-React/
├── public/                     # Static assets & favicon
├── src/
│   ├── components/
│   │   ├── auth/              # Login, Sign Up, Clerk Authentication Wrapper
│   │   │   ├── ClerkAuthWrapper.jsx
│   │   │   └── LoginView.jsx
│   │   ├── catalog/           # Categories, Brands, Attributes, Collections
│   │   │   └── CatalogViews.jsx
│   │   ├── customers/         # Customer directory & Add customer modal
│   │   │   └── CustomersView.jsx
│   │   ├── dashboard/         # Dashboard master, 5 Metric Cards, Charts, Product Section
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DashboardCharts.jsx
│   │   │   ├── MetricCards.jsx
│   │   │   └── ProductSection.jsx
│   │   ├── inventory/         # Stock alert, warehouse & quick restock
│   │   │   └── InventoryView.jsx
│   │   ├── layout/            # Dark Navy Sidebar, Header with Search & Notifications
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── marketing/         # Campaigns, email newsletters, SEO
│   │   │   └── MarketingView.jsx
│   │   ├── modals/            # Bulk Upload (JSON/CSV), Add Category modal
│   │   │   ├── AddCategoryModal.jsx
│   │   │   └── BulkUploadModal.jsx
│   │   ├── notifications/     # Full Notification History & Logs
│   │   │   └── NotificationHistoryView.jsx
│   │   ├── pricing/           # Pricing discount rules & B2B tier setup
│   │   │   └── PricingView.jsx
│   │   ├── products/          # Single Product Detail Page & Add/Edit Product Modal
│   │   │   ├── ProductDetail.jsx
│   │   │   └── ProductModal.jsx
│   │   ├── promotions/        # Coupon generator & Flash sales banner
│   │   │   └── PromotionsView.jsx
│   │   ├── reports/           # Financial analytics & CSV export
│   │   │   └── ReportsView.jsx
│   │   └── settings/          # Store settings, currency, taxes & admin profile
│   │       └── SettingsView.jsx
│   ├── context/               # Global state context with LocalStorage sync
│   │   └── AppContext.jsx
│   ├── data/                  # Initial data & 4,320 items catalog generator
│   │   └── mockData.js
│   ├── App.jsx                # Master root view switcher & Toast alerts
│   ├── index.css              # Tailwind CSS directives & custom scrollbars
│   └── main.jsx               # Entry point wrapping App in AppProvider
├── .env.example               # Clerk environment variable template
├── index.html                 # HTML template with fonts & metadata
├── package.json               # Dependencies & scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Custom Tailwind color palette & styling
└── vite.config.js             # Vite configuration
```

---

## 🚀 How to Run this Project

1. Open Terminal or PowerShell in this folder:
   ```powershell
   cd C:\Users\Sathi\Desktop\ShopWave-Ecommerce-React
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Start development server:
   ```powershell
   npm run dev
   ```

4. Open in browser:
   **http://localhost:5173/**

---

## 🔑 Authentication (Clerk + Demo Mode)

- **1-Click Demo Login**: Pre-configured credentials (`admin@shopwave.com` / `admin123`).
- **Clerk Account Integration**: Login screen par **"Clerk Key"** tab par click karke apna `pk_test_...` key paste karein.

---

## ✨ Key Features

1. **Exact Reference UI**: Dark navy sidebar (`#0c1322`), top search, 5 metric cards, bar chart, donut chart, category tree, and best seller iPhone 15 card.
2. **Dynamic 1-540+ Pagination**: Multi-page sliding window navigation + direct page jump input.
3. **Product Image Upload**: Supports local file upload from computer (auto Base64) & Image URLs.
4. **All Subpages Functional**: Catalog, Orders (with Tax Invoice Modal), Customers, Inventory, Pricing, Marketing, Promotions, Content, Reports, Settings.
5. **No Backend Required**: 100% persistent in browser `localStorage`.
