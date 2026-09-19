import React from "react";

export const CategoryCard = ({ category }) => (
  <article className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 transition-colors">
    <div className="h-32 w-full overflow-hidden relative bg-slate-100 border-b border-slate-200">
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4 space-y-3">
      <div>
        <h4 className="font-bold text-slate-900 text-base">{category.name}</h4>
        <p className="text-xs text-slate-500 font-medium">
          {category.count} total products
        </p>
      </div>
      <div>
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          Subcategories:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {category.subcategories.map((subcategory) => (
            <span
              key={subcategory}
              className="px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-md text-xs font-medium"
            >
              {subcategory}
            </span>
          ))}
        </div>
      </div>
    </div>
  </article>
);
