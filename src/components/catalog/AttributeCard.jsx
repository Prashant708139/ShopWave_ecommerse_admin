import React from "react";

export const AttributeCard = ({ attribute }) => (
  <article className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-bold text-slate-900 text-sm">{attribute.name}</h4>
        <p className="text-xs text-slate-400">{attribute.type}</p>
      </div>
      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
        {attribute.values.length} Variants
      </span>
    </div>
    <div className="flex flex-wrap gap-2 pt-1">
      {attribute.values.map((value) => (
        <span
          key={value}
          className="px-3 py-1 bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold"
        >
          {value}
        </span>
      ))}
    </div>
  </article>
);
