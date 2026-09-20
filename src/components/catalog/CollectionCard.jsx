import React from "react";
import { Edit2, Trash2 } from "lucide-react";

export const CollectionCard = ({ collection, onEdit, onDelete, onToggleStatus }) => (
  <article className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 transition-colors flex flex-col justify-between h-full">
    <div>
      <div className="h-40 w-full relative bg-slate-100 border-b border-slate-200 overflow-hidden group">
        <img
          src={collection.banner}
          alt={collection.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border shadow-xs ${
          collection.status === 'Active'
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-amber-50 text-amber-700 border-amber-200'
        }`}>
          {collection.status}
        </span>
      </div>
      <div className="p-4 space-y-1">
        <h4 className="font-bold text-slate-900 text-base">{collection.title}</h4>
        <p className="text-xs text-slate-500 font-medium">
          {collection.itemsCount} handpicked products
        </p>
      </div>
    </div>

    <div className="p-4 pt-3 flex items-center justify-between gap-2 border-t border-slate-100 mt-2">
      <button
        onClick={() => onToggleStatus && onToggleStatus(collection.id)}
        className={`text-xs font-bold px-3 py-1 rounded-md border cursor-pointer transition-colors ${
          collection.status === 'Active'
            ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
        }`}
      >
        {collection.status === 'Active' ? 'Active' : 'Set Active'}
      </button>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onEdit && onEdit(collection)}
          className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-md border border-slate-200 transition-colors cursor-pointer"
          title="Edit Collection"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete && onDelete(collection.id, collection.title)}
          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md border border-slate-200 transition-colors cursor-pointer"
          title="Delete Collection"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </article>
);
