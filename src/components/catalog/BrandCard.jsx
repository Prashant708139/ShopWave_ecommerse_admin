import React from "react";
import { Award } from "lucide-react";

export const BrandCard = ({ brand }) => (
  <article className="bg-white p-4 rounded-md border border-slate-200 shadow-xs flex flex-col items-center text-center space-y-3 hover:border-blue-300 transition-colors">
    <div className="w-12 h-12 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center p-2">
      {brand.logo ? (
        <img src={brand.logo} alt="" className="w-full h-full object-contain" />
      ) : (
        <Award className="w-6 h-6 text-blue-600" />
      )}
    </div>
    <div>
      <h4 className="font-bold text-slate-900 text-sm">{brand.name}</h4>
      <p className="text-xs text-slate-500">{brand.category}</p>
    </div>
    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-[11px] font-semibold">
      Verified Partner
    </span>
  </article>
);
