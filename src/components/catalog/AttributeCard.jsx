import React from "react";

export const AttributeCard = ({ attribute }) => (
  <article className="bg-white p-4 rounded-md border border-slate-200 shadow-xs space-y-3">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-bold text-slate-900 text-sm">{attribute.name}</h4>
        <p className="text-xs text-slate-500">{attribute.type}</p>
      </div>
      <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md">
        {attribute.values.length} Variants
      </span>
    </div>
    <div className="flex flex-wrap gap-1.5 pt-1">
      {attribute.values.map((value) => (
        <span
          key={value}
          className="px-2.5 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-md text-xs font-medium"
        >
          {value}
        </span>
      ))}
    </div>
  </article>
);
