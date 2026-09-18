export const CATALOG_CATEGORY_CARDS = [
  {
    id: "category-electronics",
    name: "Electronics",
    count: 1245,
    subcategories: ["Mobiles (632)", "Laptops (312)", "Accessories (301)"],
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
  },
  {
    id: "category-fashion",
    name: "Fashion & Apparel",
    count: 1280,
    subcategories: ["Men Clothing (540)", "Footwear (512)", "Kids (228)"],
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
  },
  {
    id: "category-home",
    name: "Home & Living",
    count: 820,
    subcategories: ["Furniture (320)", "Kitchen (250)", "Decor (250)"],
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
  },
  {
    id: "category-beauty",
    name: "Beauty & Personal Care",
    count: 410,
    subcategories: ["Skincare", "Fragrances", "Haircare"],
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
  },
  {
    id: "category-sports",
    name: "Sports & Fitness",
    count: 280,
    subcategories: ["Gym Gear", "Outdoor", "Activewear"],
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80",
  },
  {
    id: "category-books",
    name: "Books & Stationery",
    count: 210,
    subcategories: ["Finance & Business", "Self-Help", "Novels"],
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
  },
];

export const CATALOG_ATTRIBUTES = [
  {
    id: "attribute-color",
    name: "Color",
    type: "Color Palette",
    values: [
      "Jet Black",
      "Space Gray",
      "Alpine Blue",
      "Titanium Silver",
      "Rose Gold",
    ],
  },
  {
    id: "attribute-storage",
    name: "Storage Capacity",
    type: "Selection Pill",
    values: ["64GB", "128GB", "256GB", "512GB", "1TB"],
  },
  {
    id: "attribute-clothing-size",
    name: "Clothing Size",
    type: "Size Guide Pill",
    values: ["S", "M", "L", "XL", "XXL", "3XL"],
  },
  {
    id: "attribute-shoe-size",
    name: "Shoe Size (UK/India)",
    type: "Number Pill",
    values: ["6 UK", "7 UK", "8 UK", "9 UK", "10 UK", "11 UK"],
  },
  {
    id: "attribute-material",
    name: "Material & Fabric",
    type: "Text Badge",
    values: [
      "100% Organic Cotton",
      "Solid Hardwood",
      "High Stretch Denim",
      "Mesh Polymer",
    ],
  },
];

export const FEATURED_COLLECTIONS = [
  {
    id: "collection-diwali",
    title: "Diwali Mega Deals 2026",
    itemsCount: 42,
    banner:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
    status: "Active",
  },
  {
    id: "collection-smartphones",
    title: "Top Flagship Smartphones",
    itemsCount: 18,
    banner:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    status: "Active",
  },
  {
    id: "collection-fashion",
    title: "Autumn Fashion Showcase",
    itemsCount: 56,
    banner:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
    status: "Active",
  },
  {
    id: "collection-home",
    title: "Home Decor & Luxe Living",
    itemsCount: 29,
    banner:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    status: "Active",
  },
];
