import React from "react";

export const CatalogPageHeader = ({ title, description, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h2 className="text-xl font-bold text-slate-900 tracking-tight">
        {title}
      </h2>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
    {action}
  </div>
);
