# ShopWave E-Commerce Production Database ERD Schema (DBML Format)

This document contains the complete, highly-scalable **Database Entity Relationship Diagram (ERD)** code formatted in **DBML (Database Markup Language)** for [dbdiagram.io](https://dbdiagram.io).

## How to Visualize
1. Copy all the DBML code below.
2. Go to **[https://dbdiagram.io](https://dbdiagram.io)**.
3. Paste the code into the left editor panel.
4. Export as **PDF / PNG / SVG** or generate SQL migrations (PostgreSQL, MySQL, MS SQL).

---

```dbml
// ==========================================
// SHOPWAVE E-COMMERCE DATABASE MODEL (DBML)
// Ready for copy-paste on https://dbdiagram.io
// ==========================================

Project ShopWave_Ecommerce {
  database_type: 'PostgreSQL'
  Note: 'Production-ready scalable database schema for ShopWave E-Commerce Multi-Channel Admin & Storefront'
}

// ------------------------------------------
// 1. ADMINS, USERS & ACCESS CONTROL (RBAC)
// ------------------------------------------

Table users {
  id varchar [pk, note: 'UUID or Clerk User ID']
  email varchar [unique, not null]
  password_hash varchar
  full_name varchar [not null]
  avatar_url varchar
  phone varchar
  is_active boolean [default: true]
  clerk_id varchar [unique]
  last_login_at timestamp
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

Table roles {
  id integer [pk, increment]
  name varchar [not null, unique, note: 'Super Admin, Manager, Inventory Staff']
  description text
  created_at timestamp [default: `now()`]
}

Table permissions {
  id integer [pk, increment]
  name varchar [not null, unique, note: 'products.create, orders.refund']
  module varchar [not null, note: 'catalog, orders, inventory, settings']
}

Table role_permissions {
  role_id integer [ref: > roles.id]
  permission_id integer [ref: > permissions.id]
  
  Indexes {
    (role_id, permission_id) [pk]
  }
}

Table user_roles {
  user_id varchar [ref: > users.id]
  role_id integer [ref: > roles.id]
  
  Indexes {
    (user_id, role_id) [pk]
  }
}

// ------------------------------------------
// 2. CATALOG, CATEGORIES & BRANDS
// ------------------------------------------

Table categories {
  id varchar [pk, note: 'e.g. cat-electronics']
  parent_id varchar [ref: > categories.id, note: 'Self-referencing hierarchy for subcategories']
  name varchar [not null]
  slug varchar [unique, not null]
  description text
  banner_url varchar
  display_order integer [default: 0]
  is_active boolean [default: true]
  is_featured boolean [default: false]
  meta_title varchar
  meta_description text
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

Table brands {
  id varchar [pk, note: 'e.g. brand-apple']
  name varchar [not null, unique]
  slug varchar [unique, not null]
  logo_url varchar
  website varchar
  country_of_origin varchar
  is_verified boolean [default: true]
  created_at timestamp [default: `now()`]
}

Table collections {
  id varchar [pk, note: 'e.g. col-diwali-festive']
  title varchar [not null]
  slug varchar [unique, not null]
  description text
  banner_url varchar
  rule_type varchar [default: 'manual', note: 'manual or automated_conditions']
  is_active boolean [default: true]
  start_date timestamp
  end_date timestamp
  created_at timestamp [default: `now()`]
}

Table category_attributes {
  id integer [pk, increment]
  category_id varchar [ref: > categories.id, not null]
  attribute_name varchar [not null, note: 'Processor, RAM, Sole Material']
  attribute_type varchar [not null, note: 'text, select, numeric, boolean']
  options jsonb [note: 'Array of preset options e.g. ["8GB", "16GB"]']
  is_required boolean [default: false]
  display_order integer [default: 0]
}

// ------------------------------------------
// 3. PRODUCTS, VARIANTS & MEDIA
// ------------------------------------------

Table products {
  id varchar [pk, note: 'e.g. prod-1726001']
  category_id varchar [ref: > categories.id, not null]
  brand_id varchar [ref: > brands.id]
  name varchar [not null]
  subtitle varchar
  sku varchar [unique, not null]
  barcode varchar
  slug varchar [unique, not null]
  description_html text
  price numeric(12,2) [not null]
  original_price numeric(12,2)
  cost_price numeric(12,2) [default: 0]
  profit_margin_percent numeric(5,2)
  stock_quantity integer [default: 0]
  low_stock_threshold integer [default: 5]
  weight_kg numeric(6,3)
  dimensions_cm varchar [note: 'L x W x H']
  is_free_shipping boolean [default: false]
  status varchar [default: 'In Stock', note: 'In Stock, Out of Stock, Draft, Archived']
  is_featured boolean [default: false]
  is_bestseller boolean [default: false]
  meta_title varchar
  meta_description text
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

Table product_images {
  id varchar [pk, note: 'e.g. img-9842']
  product_id varchar [ref: > products.id, not null]
  image_url text [not null]
  display_order integer [default: 0]
  is_primary boolean [default: false]
  created_at timestamp [default: `now()`]
}

Table product_specifications {
  id integer [pk, increment]
  product_id varchar [ref: > products.id, not null]
  spec_key varchar [not null, note: 'Processor, Storage, Fit']
  spec_value varchar [not null, note: 'Apple A17 Pro, 256GB, Slim Fit']
}

Table product_variants {
  id varchar [pk, note: 'e.g. var-iph15-256-blue']
  product_id varchar [ref: > products.id, not null]
  sku varchar [unique, not null]
  variant_name varchar [not null, note: '256GB / Titanium Blue']
  price numeric(12,2) [not null]
  cost_price numeric(12,2)
  stock_quantity integer [default: 0]
  attributes jsonb [note: '{"color": "Blue", "storage": "256GB"}']
  image_url varchar
  is_active boolean [default: true]
  created_at timestamp [default: `now()`]
}

Table product_collections {
  product_id varchar [ref: > products.id]
  collection_id varchar [ref: > collections.id]
  
  Indexes {
    (product_id, collection_id) [pk]
  }
}

// ------------------------------------------
// 4. CUSTOMERS & ADDRESSES
// ------------------------------------------

Table customer_segments {
  id integer [pk, increment]
  name varchar [not null, unique, note: 'VIP Members, Wholesale Buyers, Retail']
  description text
  discount_percentage numeric(5,2) [default: 0]
}

Table customers {
  id varchar [pk, note: 'e.g. cust-10042']
  user_id varchar [ref: > users.id, note: 'Optional linked login user']
  segment_id integer [ref: > customer_segments.id]
  name varchar [not null]
  email varchar [unique, not null]
  phone varchar
  avatar_url varchar
  total_spent numeric(12,2) [default: 0]
  orders_count integer [default: 0]
  status varchar [default: 'Active', note: 'Active, Inactive, Blocked']
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

Table addresses {
  id varchar [pk]
  customer_id varchar [ref: > customers.id, not null]
  address_type varchar [default: 'shipping', note: 'shipping, billing']
  recipient_name varchar [not null]
  phone varchar
  street_address text [not null]
  city varchar [not null]
  state varchar [not null]
  postal_code varchar [not null]
  country varchar [default: 'India']
  is_default boolean [default: false]
}

// ------------------------------------------
// 5. ORDERS, INVOICES & PAYMENTS
// ------------------------------------------

Table orders {
  id varchar [pk, note: 'e.g. ORD-98421']
  customer_id varchar [ref: > customers.id, not null]
  shipping_address_id varchar [ref: > addresses.id]
  order_status varchar [default: 'Pending', note: 'Pending, Processing, Shipped, Delivered, Cancelled']
  payment_status varchar [default: 'Paid', note: 'Paid, Pending, Refunded, Failed']
  payment_method varchar [default: 'Credit Card', note: 'Credit Card, UPI / QR, Net Banking, COD']
  subtotal_amount numeric(12,2) [not null]
  tax_amount numeric(12,2) [default: 0, note: 'GST 18%']
  shipping_fee numeric(12,2) [default: 0]
  discount_amount numeric(12,2) [default: 0]
  total_amount numeric(12,2) [not null]
  coupon_code varchar
  notes text
  placed_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

Table order_items {
  id varchar [pk]
  order_id varchar [ref: > orders.id, not null]
  product_id varchar [ref: > products.id, not null]
  variant_id varchar [ref: > product_variants.id]
  product_name varchar [not null]
  sku varchar [not null]
  unit_price numeric(12,2) [not null]
  cost_price numeric(12,2) [default: 0]
  quantity integer [not null, default: 1]
  line_total numeric(12,2) [not null]
}

Table payments {
  id varchar [pk, note: 'e.g. pay-98421']
  order_id varchar [ref: > orders.id, not null]
  transaction_id varchar [unique, note: 'Gateway Transaction Reference']
  payment_gateway varchar [note: 'Razorpay, Stripe, PhonePe']
  payment_method varchar [not null]
  amount numeric(12,2) [not null]
  status varchar [not null, note: 'Success, Pending, Failed, Refunded']
  created_at timestamp [default: `now()`]
}

Table shipments {
  id varchar [pk]
  order_id varchar [ref: > orders.id, not null]
  carrier varchar [not null, note: 'BlueDart, Delhivery, FedEx']
  tracking_number varchar [unique]
  shipped_at timestamp
  estimated_delivery timestamp
  delivered_at timestamp
  shipping_status varchar [default: 'In Transit', note: 'In Transit, Out for Delivery, Delivered']
}

// ------------------------------------------
// 6. INVENTORY & WAREHOUSES
// ------------------------------------------

Table warehouses {
  id varchar [pk, note: 'e.g. wh-delhi-main']
  name varchar [not null]
  code varchar [unique, not null]
  address text
  city varchar
  state varchar
  manager_name varchar
  contact_phone varchar
  is_active boolean [default: true]
}

Table warehouse_stock {
  warehouse_id varchar [ref: > warehouses.id]
  product_id varchar [ref: > products.id]
  variant_id varchar [ref: > product_variants.id]
  quantity_on_hand integer [default: 0]
  quantity_reserved integer [default: 0]
  reorder_level integer [default: 10]
  
  Indexes {
    (warehouse_id, product_id) [pk]
  }
}

Table stock_logs {
  id varchar [pk]
  warehouse_id varchar [ref: > warehouses.id, not null]
  product_id varchar [ref: > products.id, not null]
  change_qty integer [not null, note: '+15 or -1']
  reason varchar [not null, note: 'order_sale, restock_supplier, damage_return']
  reference_id varchar [note: 'e.g. ORD-98421']
  created_at timestamp [default: `now()`]
}

// ------------------------------------------
// 7. PROMOTIONS & MARKETING
// ------------------------------------------

Table coupons {
  id varchar [pk, note: 'e.g. promo-diwali20']
  code varchar [unique, not null, note: 'FESTIVE20']
  discount_type varchar [not null, note: 'Percentage, Fixed Amount']
  discount_value numeric(10,2) [not null]
  min_order_amount numeric(10,2) [default: 0]
  max_discount_amount numeric(10,2)
  usage_limit integer
  times_used integer [default: 0]
  is_active boolean [default: true]
  start_date timestamp
  expires_at timestamp
  created_at timestamp [default: `now()`]
}

Table coupon_usages {
  id varchar [pk]
  coupon_id varchar [ref: > coupons.id, not null]
  order_id varchar [ref: > orders.id, not null]
  customer_id varchar [ref: > customers.id, not null]
  used_at timestamp [default: `now()`]
}

Table marketing_campaigns {
  id varchar [pk]
  title varchar [not null]
  channel varchar [not null, note: 'Email, SMS, Push Notification']
  subject varchar
  status varchar [default: 'Scheduled', note: 'Draft, Active, Completed']
  audience_segment varchar
  scheduled_at timestamp
  sent_count integer [default: 0]
  created_at timestamp [default: `now()`]
}

// ------------------------------------------
// 8. CONTENT MANAGEMENT & BLOGS
// ------------------------------------------

Table store_pages {
  id varchar [pk]
  title varchar [not null]
  slug varchar [unique, not null]
  content_html text
  status varchar [default: 'Published', note: 'Published, Draft']
  meta_title varchar
  meta_description text
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

Table blog_posts {
  id varchar [pk]
  title varchar [not null]
  slug varchar [unique, not null]
  summary text
  content_html text [not null]
  cover_image_url varchar
  views_count integer [default: 0]
  status varchar [default: 'Published']
  published_at timestamp [default: `now()`]
}

// ------------------------------------------
// 9. SYSTEM AUDIT & NOTIFICATIONS
// ------------------------------------------

Table notifications {
  id varchar [pk, note: 'e.g. notif-1726001']
  user_id varchar [ref: > users.id]
  title varchar [not null]
  description text
  type varchar [default: 'general', note: 'order, product, inventory, payment']
  is_read boolean [default: false]
  created_at timestamp [default: `now()`]
}

Table audit_logs {
  id varchar [pk]
  user_id varchar [ref: > users.id]
  action varchar [not null, note: 'CREATE_PRODUCT, DELETE_ORDER']
  entity_type varchar [not null, note: 'product, order, category']
  entity_id varchar [not null]
  changes jsonb
  ip_address varchar
  created_at timestamp [default: `now()`]
}

Table store_settings {
  key varchar [pk, note: 'e.g. store_name, currency, tax_rate']
  value text [not null]
  description text
  updated_at timestamp [default: `now()`]
}
```
