import React from "react";

export const CollectionCard = ({ collection }) => (
  <article className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 transition-colors">
    <div className="h-36 w-full relative bg-slate-100 border-b border-slate-200">
      <img
        src={collection.banner}
        alt={collection.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4 flex items-center justify-between gap-3">
      <div>
        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-[10px] font-bold uppercase mb-1 inline-block">
          {collection.status}
        </span>
        <h4 className="font-bold text-slate-900 text-base">{collection.title}</h4>
        <p className="text-xs text-slate-500 font-medium">
          {collection.itemsCount} handpicked products
        </p>
      </div>
    </div>
  </article>
);
