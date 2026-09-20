import React from "react";
import { Award, ShieldCheck, Trash2 } from "lucide-react";

// Rich palette of 12 vibrant distinct color themes for cards
const BRAND_PALETTES = [
  { accent: "bg-blue-600", badge: "bg-blue-50 text-blue-700 border-blue-200/80", iconBg: "bg-blue-50/80 border-blue-100", iconColor: "text-blue-600" },
  { accent: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-200/80", iconBg: "bg-emerald-50/80 border-emerald-100", iconColor: "text-emerald-600" },
  { accent: "bg-purple-600", badge: "bg-purple-50 text-purple-700 border-purple-200/80", iconBg: "bg-purple-50/80 border-purple-100", iconColor: "text-purple-600" },
  { accent: "bg-amber-500", badge: "bg-amber-50 text-amber-700 border-amber-200/80", iconBg: "bg-amber-50/80 border-amber-100", iconColor: "text-amber-600" },
  { accent: "bg-rose-500", badge: "bg-rose-50 text-rose-700 border-rose-200/80", iconBg: "bg-rose-50/80 border-rose-100", iconColor: "text-rose-600" },
  { accent: "bg-indigo-600", badge: "bg-indigo-50 text-indigo-700 border-indigo-200/80", iconBg: "bg-indigo-50/80 border-indigo-100", iconColor: "text-indigo-600" },
  { accent: "bg-cyan-500", badge: "bg-cyan-50 text-cyan-700 border-cyan-200/80", iconBg: "bg-cyan-50/80 border-cyan-100", iconColor: "text-cyan-600" },
  { accent: "bg-fuchsia-600", badge: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/80", iconBg: "bg-fuchsia-50/80 border-fuchsia-100", iconColor: "text-fuchsia-600" },
  { accent: "bg-teal-500", badge: "bg-teal-50 text-teal-700 border-teal-200/80", iconBg: "bg-teal-50/80 border-teal-100", iconColor: "text-teal-600" },
  { accent: "bg-orange-500", badge: "bg-orange-50 text-orange-700 border-orange-200/80", iconBg: "bg-orange-50/80 border-orange-100", iconColor: "text-orange-600" },
  { accent: "bg-violet-600", badge: "bg-violet-50 text-violet-700 border-violet-200/80", iconBg: "bg-violet-50/80 border-violet-100", iconColor: "text-violet-600" },
  { accent: "bg-pink-500", badge: "bg-pink-50 text-pink-700 border-pink-200/80", iconBg: "bg-pink-50/80 border-pink-100", iconColor: "text-pink-600" },
];

export const BrandCard = ({ brand, index = 0, onDelete }) => {
  // Hash string to pick a unique color palette for every brand card
  const hashStr = (brand.id || brand.name || '').toString();
  let hash = 0;
  for (let i = 0; i < hashStr.length; i++) {
    hash = hashStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIdx = Math.abs(hash + index) % BRAND_PALETTES.length;
  const palette = BRAND_PALETTES[colorIdx];

  return (
    <article className="bg-white pt-3.5 pb-3.5 px-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center text-center space-y-2 hover:border-slate-300 hover:shadow-md transition-all relative overflow-hidden group">
      {/* Top Accent Color Line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${palette.accent}`} />

      {/* Delete action button on hover */}
      {onDelete && (
        <button
          type="button"
          onClick={() => onDelete(brand.id, brand.name)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all cursor-pointer"
          title="Delete Brand"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}

      <div className={`w-11 h-11 rounded-lg ${palette.iconBg} border flex items-center justify-center p-2 shadow-2xs group-hover:scale-105 transition-transform`}>
        {brand.logo ? (
          <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
        ) : (
          <Award className={`w-5 h-5 ${palette.iconColor}`} />
        )}
      </div>

      <div className="space-y-0.5">
        <h4 className="font-bold text-slate-900 text-xs tracking-tight group-hover:text-blue-600 transition-colors">
          {brand.name}
        </h4>
        <p className="text-[11px] text-slate-500 font-medium">{brand.category || 'General Partner'}</p>
      </div>

      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 border rounded-full text-[10px] font-bold ${palette.badge}`}>
        <ShieldCheck className="w-3 h-3" /> Verified Partner
      </span>
    </article>
  );
};


