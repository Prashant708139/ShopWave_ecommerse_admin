export const INITIAL_METRICS = {
  totalRevenue: 1248320,
  revenueGrowth: 12.5,
  totalOrders: 1482,
  ordersGrowth: 8.2,
  totalCustomers: 9642,
  customersGrowth: 14.3,
  totalProducts: 4320,
  productsGrowth: 5.7,
  pendingOrders: 23,
  pendingGrowth: -42.3,
};

// Date range specific metrics & charts
export const DATE_RANGE_DATA = {
  'Today': {
    metrics: {
      totalRevenue: 148500,
      revenueGrowth: 18.2,
      totalOrders: 184,
      ordersGrowth: 12.4,
      totalCustomers: 142,
      customersGrowth: 8.5,
      totalProducts: 4320,
      productsGrowth: 5.7,
      pendingOrders: 8,
      pendingGrowth: -15.0,
    },
    salesChart: [
      { date: '06:00', revenue: 8500, orders: 12 },
      { date: '08:00', revenue: 14200, orders: 18 },
      { date: '10:00', revenue: 24500, orders: 32 },
      { date: '12:00', revenue: 32000, orders: 40 },
      { date: '14:00', revenue: 21000, orders: 25 },
      { date: '16:00', revenue: 28000, orders: 34 },
      { date: '18:00', revenue: 38500, orders: 48 },
      { date: '20:00', revenue: 42000, orders: 52 },
      { date: '22:00', revenue: 19800, orders: 22 },
    ]
  },
  'Last 7 days': {
    metrics: {
      totalRevenue: 1248320,
      revenueGrowth: 12.5,
      totalOrders: 1482,
      ordersGrowth: 8.2,
      totalCustomers: 9642,
      customersGrowth: 14.3,
      totalProducts: 4320,
      productsGrowth: 5.7,
      pendingOrders: 23,
      pendingGrowth: -42.3,
    },
    salesChart: [
      { date: 'Aug 26', revenue: 165000, orders: 120 },
      { date: 'Aug 27', revenue: 195000, orders: 145 },
      { date: 'Aug 28', revenue: 140000, orders: 98 },
      { date: 'Aug 29', revenue: 230000, orders: 180 },
      { date: 'Aug 30', revenue: 175000, orders: 130 },
      { date: 'Aug 31', revenue: 210000, orders: 162 },
      { date: 'Sep 1', revenue: 155000, orders: 115 },
      { date: 'Sep 2', revenue: 190000, orders: 150 },
      { date: 'Sep 3', revenue: 245000, orders: 192 },
    ]
  },
  'Last 30 days': {
    metrics: {
      totalRevenue: 4892400,
      revenueGrowth: 24.1,
      totalOrders: 6210,
      ordersGrowth: 15.6,
      totalCustomers: 18450,
      customersGrowth: 21.0,
      totalProducts: 4320,
      productsGrowth: 5.7,
      pendingOrders: 45,
      pendingGrowth: -28.4,
    },
    salesChart: [
      { date: 'Week 1', revenue: 980000, orders: 1250 },
      { date: 'Week 2', revenue: 1150000, orders: 1480 },
      { date: 'Week 3', revenue: 1320000, orders: 1690 },
      { date: 'Week 4', revenue: 1442400, orders: 1790 },
    ]
  },
  'This Quarter': {
    metrics: {
      totalRevenue: 14820000,
      revenueGrowth: 32.8,
      totalOrders: 18950,
      ordersGrowth: 22.1,
      totalCustomers: 45200,
      customersGrowth: 28.4,
      totalProducts: 4320,
      productsGrowth: 5.7,
      pendingOrders: 68,
      pendingGrowth: -18.2,
    },
    salesChart: [
      { date: 'July', revenue: 4200000, orders: 5400 },
      { date: 'August', revenue: 4950000, orders: 6350 },
      { date: 'September', revenue: 5670000, orders: 7200 },
    ]
  },
  'Year to Date': {
    metrics: {
      totalRevenue: 48650000,
      revenueGrowth: 41.5,
      totalOrders: 62400,
      ordersGrowth: 35.8,
      totalCustomers: 98400,
      customersGrowth: 46.2,
      totalProducts: 4320,
      productsGrowth: 5.7,
      pendingOrders: 112,
      pendingGrowth: -33.1,
    },
    salesChart: [
      { date: 'Jan-Feb', revenue: 8900000, orders: 11200 },
      { date: 'Mar-Apr', revenue: 10400000, orders: 13400 },
      { date: 'May-Jun', revenue: 12100000, orders: 15600 },
      { date: 'Jul-Aug', revenue: 13800000, orders: 17800 },
      { date: 'Sep-Oct', revenue: 3450000, orders: 4400 },
    ]
  }
};

export const ORDERS_STATUS_DATA = [
  { name: 'Delivered', value: 62, count: 919, color: '#10b981' },
  { name: 'Processing', value: 18, count: 267, color: '#3b82f6' },
  { name: 'Shipped', value: 12, count: 178, color: '#eab308' },
  { name: 'Pending', value: 5, count: 74, color: '#f97316' },
  { name: 'Cancelled', value: 3, count: 44, color: '#ef4444' },
];

export const TOP_CATEGORIES_DATA = [
  { name: "Men's & Accessories", percentage: 28, count: '1,209 sales', icon: 'Shirt', color: '#2563eb' },
  { name: 'Mobiles & Tablets', percentage: 22, count: '950 sales', icon: 'Smartphone', color: '#3b82f6' },
  { name: 'Home & Living', percentage: 16, count: '691 sales', icon: 'Armchair', color: '#60a5fa' },
  { name: 'Electronics', percentage: 12, count: '518 sales', icon: 'Tv', color: '#93c5fd' },
  { name: 'Beauty & Personal Care', percentage: 8, count: '345 sales', icon: 'Sparkles', color: '#bfdbfe' },
  { name: 'Others', percentage: 4, count: '172 sales', icon: 'Package', color: '#dbeafe' },
];

export const CATEGORY_TREE_DATA = [
  {
    id: 'cat-all',
    name: 'All Categories',
    count: 4320,
    isOpen: true,
    children: [
      {
        id: 'cat-electronics',
        name: 'Electronics',
        count: 1245,
        isOpen: true,
        children: [
          { id: 'cat-mobiles', name: 'Mobiles', count: 632 },
          { id: 'cat-laptops', name: 'Laptops', count: 312 },
          { id: 'cat-accessories', name: 'Accessories', count: 301 },
        ]
      },
      {
        id: 'cat-fashion',
        name: 'Fashion',
        count: 1280,
        isOpen: false,
        children: [
          { id: 'cat-men', name: 'Men', count: 540 },
          { id: 'cat-women', name: 'Women', count: 512 },
          { id: 'cat-kids', name: 'Kids', count: 228 },
        ]
      },
      {
        id: 'cat-home',
        name: 'Home & Living',
        count: 820,
        isOpen: false,
        children: [
          { id: 'cat-furniture', name: 'Furniture', count: 320 },
          { id: 'cat-kitchen', name: 'Kitchen', count: 250 },
          { id: 'cat-decor', name: 'Decor', count: 250 },
        ]
      },
      { id: 'cat-beauty', name: 'Beauty & Personal Care', count: 410 },
      { id: 'cat-sports', name: 'Sports & Fitness', count: 280 },
      { id: 'cat-books', name: 'Books & Stationery', count: 210 },
      { id: 'cat-toys', name: 'Toys & Games', count: 180 },
      { id: 'cat-auto', name: 'Automotive', count: 120 },
    ]
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'iPhone 15 (128GB)',
    subtitle: 'Apple-iPhone 15 (128GB)',
    sku: 'IPH-15-128',
    category: 'Mobiles',
    brand: 'Apple',
    price: 79999,
    originalPrice: 89999,
    stock: 45,
    status: 'In Stock',
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80'
    ],
    description: 'Dynamic Island bubbles up alerts and Live Activities — so you don’t miss them while you’re doing something else. You can track your next ride, see who’s calling, check your flight status, and so much more. Innovative 48MP main camera captures super-high-resolution photos with vibrant details and deep contrast.',
    specs: {
      'Display': '6.1-inch Super Retina XDR display',
      'Processor': 'A16 Bionic chip with 5-core GPU',
      'Storage': '128GB NVMe',
      'Main Camera': '48MP (f/1.6) + 12MP Ultra-Wide',
      'Front Camera': '12MP TrueDepth Camera',
      'Battery': 'Up to 20 hours video playback',
      'Charging': 'USB-C with MagSafe Wireless Charging'
    }
  },
  {
    id: 'prod-2',
    name: 'Samsung Galaxy S24',
    subtitle: 'Samsung Galaxy S24 (256GB)',
    sku: 'SAM-S24-256',
    category: 'Mobiles',
    brand: 'Samsung',
    price: 84999,
    originalPrice: 89999,
    stock: 32,
    status: 'In Stock',
    isBestSeller: false,
    rating: 4.8,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&q=80'
    ],
    description: 'Welcome to the era of mobile AI. With Galaxy S24 in your hands, you can unleash whole new levels of creativity, productivity and possibility.',
    specs: {
      'Display': '6.2-inch FHD+ Dynamic AMOLED 2X, 120Hz',
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy',
      'Storage': '256GB UFS 4.0',
      'RAM': '8GB LPDDR5X',
      'Battery': '4000mAh with 25W Fast Charging'
    }
  },
  {
    id: 'prod-3',
    name: 'Men Air Max 270',
    subtitle: 'Nike Air Max 270',
    sku: 'NK-AM270',
    category: 'Footwear',
    brand: 'Nike',
    price: 7995,
    originalPrice: 12995,
    stock: 18,
    status: 'In Stock',
    isBestSeller: false,
    rating: 4.6,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'
    ],
    description: "Nike's first lifestyle Air Max brings you style, comfort, and big attitude with a large Air unit in the heel and lightweight mesh upper.",
    specs: {
      'Upper Material': 'Breathable Engineered Mesh',
      'Cushioning': 'Max Air 270 unit in heel',
      'Sole': 'Durable Rubber Outsole',
      'Closure': 'Asymmetric Lace-up'
    }
  },
  {
    id: 'prod-4',
    name: "Levi's Slim Fit Jeans",
    subtitle: "Levi's Slim Fit Jeans",
    sku: 'LV-SF11-32',
    category: 'Men Clothing',
    brand: "Levi's",
    price: 2999,
    originalPrice: 3999,
    stock: 52,
    status: 'In Stock',
    isBestSeller: false,
    rating: 4.5,
    reviewsCount: 154,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80'
    ],
    description: 'A modern slim with room to move, the 511 Slim Fit Stretch Jeans are a classic since right now.',
    specs: {
      'Fit': 'Slim fit through thigh and leg opening',
      'Fabric': '99% Cotton, 1% Elastane',
      'Care': 'Machine wash cold'
    }
  },
  {
    id: 'prod-5',
    name: 'Jack & Jones Shirt',
    subtitle: 'Jack & Jones Casual Shirt',
    sku: 'JJ-CCS-40',
    category: 'Men Clothing',
    brand: 'Jack & Jones',
    price: 1499,
    originalPrice: 2499,
    stock: 0,
    status: 'Out of Stock',
    isBestSeller: false,
    rating: 4.2,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80'
    ],
    description: 'Refined slim-fit shirt made from soft-touch cotton poplin.',
    specs: {
      'Pattern': 'Solid',
      'Material': '100% Pure Organic Cotton'
    }
  },
  {
    id: 'prod-6',
    name: 'Home Centre Sofa Set',
    subtitle: 'Home Centre Sofa Set',
    sku: 'HCSS-3S',
    category: 'Home & Living',
    brand: 'Home Centre',
    price: 24990,
    originalPrice: 34990,
    stock: 15,
    status: 'In Stock',
    isBestSeller: false,
    rating: 4.9,
    reviewsCount: 48,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'
    ],
    description: 'Transform your living room with this luxurious 3-seater sofa set.',
    specs: {
      'Type': '3-Seater Living Room Sofa',
      'Upholstery': 'Premium Velvet Weave Fabric'
    }
  },
  {
    id: 'prod-7',
    name: 'The Psychology of Money',
    subtitle: 'Book',
    sku: 'BOOK-P08',
    category: 'Books',
    brand: 'Harriman House',
    price: 499,
    originalPrice: 699,
    stock: 67,
    status: 'In Stock',
    isBestSeller: false,
    rating: 4.9,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80'
    ],
    description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel.',
    specs: {
      'Author': 'Morgan Housel',
      'Pages': '256 Pages'
    }
  },
  {
    id: 'prod-8',
    name: 'Macaroni & Front Wash Detergent',
    subtitle: 'Detergent',
    sku: 'DET-01',
    category: 'Home Care',
    brand: 'Surf Excel',
    price: 199,
    originalPrice: 299,
    stock: 89,
    status: 'In Stock',
    isBestSeller: false,
    rating: 4.4,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&q=80'
    ],
    description: 'Expert liquid detergent crafted specifically to eliminate deep tough stains.',
    specs: {
      'Volume': '1 Litre Bottle'
    }
  }
];

// Product catalog catalogue generator for 4,320 products (540 pages of 8 items each)
const CATALOG_TEMPLATES = [
  { name: 'Apple iPad Air M2', subtitle: 'Apple iPad Air 11-inch 128GB', category: 'Mobiles', brand: 'Apple', price: 59900, orig: 64900, img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=80' },
  { name: 'Sony WH-1000XM5', subtitle: 'Sony Noise Cancelling Headphones', category: 'Electronics', brand: 'Sony', price: 29990, orig: 34990, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80' },
  { name: 'MacBook Air M3', subtitle: 'Apple MacBook Air 13.6-inch', category: 'Laptops', brand: 'Apple', price: 114900, orig: 124900, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80' },
  { name: 'Puma Velocity Nitro', subtitle: 'Puma Running Shoes', category: 'Footwear', brand: 'Puma', price: 8999, orig: 11999, img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&q=80' },
  { name: 'OnePlus 12 5G', subtitle: 'OnePlus 12 (512GB Silky Black)', category: 'Mobiles', brand: 'OnePlus', price: 64999, orig: 69999, img: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300&q=80' },
  { name: 'Ray-Ban Aviator Classic', subtitle: 'Ray-Ban Polarized Sunglasses', category: 'Men Clothing', brand: 'Ray-Ban', price: 9590, orig: 12490, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&q=80' },
  { name: 'Atomic Habits Book', subtitle: 'James Clear Bestseller', category: 'Books', brand: 'Random House', price: 550, orig: 799, img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&q=80' },
  { name: 'Samsung 55-inch QLED 4K', subtitle: 'Samsung Smart TV', category: 'Electronics', brand: 'Samsung', price: 62990, orig: 84990, img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&q=80' },
  { name: 'Woodland Trekking Boots', subtitle: 'Woodland Leather Casual', category: 'Footwear', brand: 'Woodland', price: 4495, orig: 5995, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80' },
  { name: 'Philips Air Fryer XL', subtitle: 'Philips 4.1L Digital Airfryer', category: 'Home & Living', brand: 'Philips', price: 7999, orig: 11999, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80' },
  { name: 'Dell XPS 13 OLED', subtitle: 'Dell Intel Core Ultra 7', category: 'Laptops', brand: 'Dell', price: 139990, orig: 154990, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80' },
  { name: 'Noise ColorFit Ultra 3', subtitle: 'Bluetooth Calling Smartwatch', category: 'Electronics', brand: 'Noise', price: 3499, orig: 7999, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80' }
];

export const getCatalogItemByGlobalIndex = (globalIdx) => {
  if (globalIdx < INITIAL_PRODUCTS.length) {
    return INITIAL_PRODUCTS[globalIdx];
  }

  const template = CATALOG_TEMPLATES[globalIdx % CATALOG_TEMPLATES.length];
  const itemNumber = globalIdx + 1;
  const stock = (globalIdx * 7) % 65;

  return {
    id: `prod-gen-${itemNumber}`,
    name: `${template.name} - Batch #${Math.floor(itemNumber / 8) + 1}`,
    subtitle: `${template.subtitle} (SKU-${itemNumber})`,
    sku: `SKU-${1000 + itemNumber}`,
    category: template.category,
    brand: template.brand,
    price: template.price,
    originalPrice: template.orig,
    stock: stock,
    status: stock > 0 ? 'In Stock' : 'Out of Stock',
    isBestSeller: itemNumber % 37 === 0,
    rating: (4.0 + (itemNumber % 10) * 0.1).toFixed(1),
    reviewsCount: (itemNumber * 3) % 250 + 15,
    image: template.img,
    images: [template.img],
    description: `High performance ${template.name} with certified brand guarantee, prompt nationwide shipping and top tier durability.`,
    specs: {
      'Model': `${template.name} v2026`,
      'Category': template.category,
      'SKU': `SKU-${1000 + itemNumber}`,
      'Warranty': '1 Year Manufacturer Warranty'
    }
  };
};

export const INITIAL_ORDERS = [
  {
    id: 'ORD-98412',
    customer: {
      name: 'Vineet Yadav',
      email: 'vineet.yadav@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
      address: 'B-402, Green Park Avenue, New Delhi, 110016'
    },
    date: '2026-09-18 18:45',
    items: [
      { id: 'prod-1', name: 'iPhone 15 (128GB)', price: 79999, quantity: 1, sku: 'IPH-15-128' },
      { id: 'prod-4', name: "Levi's Slim Fit Jeans", price: 2999, quantity: 1, sku: 'LV-SF11-32' }
    ],
    totalAmount: 82998,
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    trackingNumber: 'TRK-98412-DEL'
  },
  {
    id: 'ORD-98411',
    customer: {
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      address: '74, Linking Road, Bandra West, Mumbai, 400050'
    },
    date: '2026-09-18 17:15',
    items: [
      { id: 'prod-3', name: 'Men Air Max 270', price: 7995, quantity: 1, sku: 'NK-AM270' }
    ],
    totalAmount: 7995,
    paymentMethod: 'Credit Card (HDFC)',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    trackingNumber: 'TRK-98411-BLR'
  },
  {
    id: 'ORD-98410',
    customer: {
      name: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80',
      address: '12th Cross, Indiranagar, Bengaluru, 560038'
    },
    date: '2026-09-18 14:30',
    items: [
      { id: 'prod-5', name: 'Jack & Jones Shirt', price: 1499, quantity: 1, sku: 'JJ-CCS-40' },
      { id: 'prod-7', name: 'The Psychology of Money', price: 499, quantity: 2, sku: 'BOOK-P08' },
      { id: 'prod-8', name: 'Macaroni & Front Wash Detergent', price: 199, quantity: 1, sku: 'DET-01' }
    ],
    totalAmount: 2696,
    paymentMethod: 'NetBanking (ICICI)',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    trackingNumber: 'TRK-98410-EXP'
  },
  {
    id: 'ORD-98409',
    customer: {
      name: 'Ananya Patel',
      email: 'ananya.p@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
      address: 'Plot 55, SG Highway, Ahmedabad, 380015'
    },
    date: '2026-09-18 11:20',
    items: [
      { id: 'prod-6', name: 'Home Centre Sofa Set', price: 24990, quantity: 1, sku: 'HCSS-3S' }
    ],
    totalAmount: 24990,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
    trackingNumber: 'TRK-98409-BLU'
  },
  {
    id: 'ORD-98408',
    customer: {
      name: 'Rohan Mehta',
      email: 'rohan.m@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      address: 'FC Road, Shivaji Nagar, Pune, 411005'
    },
    date: '2026-09-17 19:40',
    items: [
      { id: 'prod-5', name: 'Jack & Jones Shirt', price: 1499, quantity: 1, sku: 'JJ-CCS-40' }
    ],
    totalAmount: 1499,
    paymentMethod: 'UPI (Paytm)',
    paymentStatus: 'Refunded',
    orderStatus: 'Cancelled',
    trackingNumber: 'TRK-98408-CAN'
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'cust-1',
    name: 'Vineet Yadav',
    email: 'vineet.yadav@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
    city: 'New Delhi',
    totalSpent: 148200,
    ordersCount: 6,
    role: 'Super Admin',
    status: 'Active',
    joinedDate: 'Jan 2024'
  },
  {
    id: 'cust-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98123 45678',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    city: 'Mumbai',
    totalSpent: 45600,
    ordersCount: 4,
    role: 'VIP Member',
    status: 'Active',
    joinedDate: 'Mar 2024'
  },
  {
    id: 'cust-3',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    phone: '+91 97234 56789',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80',
    city: 'Bengaluru',
    totalSpent: 18450,
    ordersCount: 2,
    role: 'Customer',
    status: 'Active',
    joinedDate: 'May 2024'
  },
  {
    id: 'cust-4',
    name: 'Ananya Patel',
    email: 'ananya.p@example.com',
    phone: '+91 96345 67890',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    city: 'Ahmedabad',
    totalSpent: 62300,
    ordersCount: 5,
    role: 'VIP Member',
    status: 'Active',
    joinedDate: 'Feb 2024'
  },
  {
    id: 'cust-5',
    name: 'Rohan Mehta',
    email: 'rohan.m@example.com',
    phone: '+91 95456 78901',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    city: 'Pune',
    totalSpent: 8900,
    ordersCount: 1,
    role: 'Customer',
    status: 'Inactive',
    joinedDate: 'Aug 2024'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'New Order #ORD-98412 received',
    description: 'Vineet Yadav placed an order for ₹82,998 with UPI payment.',
    time: '5 mins ago',
    timestamp: Date.now() - 5 * 60 * 1000,
    type: 'order',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Low Stock Alert: Jack & Jones Shirt',
    description: 'SKU JJ-CCS-40 is currently out of stock (0 units remaining).',
    time: '25 mins ago',
    timestamp: Date.now() - 25 * 60 * 1000,
    type: 'inventory',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Payment Confirmed: ₹7,995',
    description: 'Credit Card payment received for Order #ORD-98411 (Priya Sharma).',
    time: '45 mins ago',
    timestamp: Date.now() - 45 * 60 * 1000,
    type: 'payment',
    read: false
  },
  {
    id: 'notif-4',
    title: 'New 5-Star Review Received',
    description: 'Customer left a 5-star rating on "iPhone 15 (128GB)".',
    time: '2 hours ago',
    timestamp: Date.now() - 2 * 3600 * 1000,
    type: 'review',
    read: true
  },
  {
    id: 'notif-5',
    title: 'Flash Sale Promotion Activated',
    description: 'Campaign "Diwali Mega Bonanza 2026" is now active storewide.',
    time: '1 day ago',
    timestamp: Date.now() - 24 * 3600 * 1000,
    type: 'promo',
    read: true
  }
];

export const INITIAL_BRANDS = [
  { id: 'brand-1', name: 'Apple', category: 'Electronics', count: 142, logo: 'https://cdn.simpleicons.org/apple/000000' },
  { id: 'brand-2', name: 'Samsung', category: 'Electronics', count: 215, logo: 'https://cdn.simpleicons.org/samsung/1428A0' },
  { id: 'brand-3', name: 'Nike', category: 'Footwear & Sportswear', count: 88, logo: 'https://cdn.simpleicons.org/nike/000000' },
  { id: 'brand-4', name: "Levi's", category: 'Fashion & Denim', count: 96, logo: 'https://cdn.simpleicons.org/levis/C4122D' },
  { id: 'brand-5', name: 'Jack & Jones', category: 'Fashion', count: 64, logo: 'https://cdn.simpleicons.org/jackandjones/000000' },
  { id: 'brand-6', name: 'Sony', category: 'Electronics', count: 54, logo: 'https://cdn.simpleicons.org/sony/000000' },
  { id: 'brand-7', name: 'Home Centre', category: 'Home & Furniture', count: 42, logo: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=50&q=80' },
  { id: 'brand-8', name: 'Surf Excel', category: 'Home Care & FMCG', count: 35, logo: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=50&q=80' }
];

export const INITIAL_PROMOTIONS = [
  { id: 'promo-1', code: 'FESTIVE30', discount: '30% OFF', minOrder: 1999, type: 'Percentage', status: 'Active', usageCount: 420, expires: '2026-10-31' },
  { id: 'promo-2', code: 'WELCOME500', discount: '₹500 FLAT', minOrder: 2499, type: 'Flat Amount', status: 'Active', usageCount: 1250, expires: '2026-12-31' },
  { id: 'promo-3', code: 'IPHONEBONANZA', discount: '₹10,000 OFF', minOrder: 70000, type: 'Flat Amount', status: 'Active', usageCount: 98, expires: '2026-09-30' },
  { id: 'promo-4', code: 'FREESHIP', discount: 'Free Shipping', minOrder: 499, type: 'Shipping', status: 'Expired', usageCount: 3100, expires: '2026-08-15' }
];
