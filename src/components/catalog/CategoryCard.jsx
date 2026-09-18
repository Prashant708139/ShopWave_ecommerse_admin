import React from "react";

export const CategoryCard = ({ category }) => (
  <article className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
    <div className="h-32 w-full overflow-hidden relative">
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
        <div className="text-white">
          <h4 className="font-bold text-base">{category.name}</h4>
          <p className="text-xs text-white/80">
            {category.count} total products
          </p>
        </div>
      </div>
    </div>
    <div className="p-4 space-y-2">
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
        Subcategories:
      </p>
      <div className="flex flex-wrap gap-1.5">
        {category.subcategories.map((subcategory) => (
          <span
            key={subcategory}
            className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
          >
            {subcategory}
          </span>
        ))}
      </div>
    </div>
  </article>
);
