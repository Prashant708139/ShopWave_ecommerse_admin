import React from "react";

export const CollectionCard = ({ collection }) => (
  <article className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
    <div className="h-44 w-full relative">
      <img
        src={collection.banner}
        alt={collection.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
        <div className="text-white">
          <span className="px-2 py-0.5 bg-emerald-500 text-white rounded-full text-[10px] font-bold uppercase mb-1 inline-block">
            {collection.status}
          </span>
          <h4 className="font-bold text-lg">{collection.title}</h4>
          <p className="text-xs text-slate-200">
            {collection.itemsCount} handpicked products
          </p>
        </div>
      </div>
    </div>
  </article>
);
