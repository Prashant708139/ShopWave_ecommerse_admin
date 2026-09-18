import React from "react";
import { Award } from "lucide-react";

export const BrandCard = ({ brand }) => (
  <article className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center text-center space-y-3 hover:shadow-md transition-shadow">
    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2">
      {brand.logo ? (
        <img src={brand.logo} alt="" className="w-full h-full object-contain" />
      ) : (
        <Award className="w-8 h-8 text-blue-600" />
      )}
    </div>
    <div>
      <h4 className="font-bold text-slate-900 text-sm">{brand.name}</h4>
      <p className="text-xs text-slate-400">{brand.category}</p>
    </div>
    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[11px] font-semibold">
      Verified Partner
    </span>
  </article>
);
