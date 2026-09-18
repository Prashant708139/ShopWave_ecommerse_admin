import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Plus,
  Sparkles,
  Image as ImageIcon,
  Edit2,
  Trash2,
  ExternalLink
} from 'lucide-react';

export const ContentView = () => {
  const { showToast } = useApp();
  const [pages, setPages] = useState([
    { id: 1, title: 'About ShopWave', slug: '/about-us', status: 'Published', lastUpdated: '2 days ago' },
    { id: 2, title: 'Terms & Conditions', slug: '/terms', status: 'Published', lastUpdated: '1 month ago' },
    { id: 3, title: 'Privacy & Cookie Policy', slug: '/privacy-policy', status: 'Published', lastUpdated: '1 month ago' },
    { id: 4, title: 'Shipping & Return Policies', slug: '/shipping-returns', status: 'Published', lastUpdated: '1 week ago' },
  ]);

  const [articles, setArticles] = useState([
    { id: 1, title: 'Top 10 Flagship Smartphones of 2026: The Ultimate Guide', views: '4,890 views', date: 'Sep 12, 2026', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80' },
    { id: 2, title: 'How to Choose the Right Footwear for Daily Running', views: '2,410 views', date: 'Sep 05, 2026', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80' },
    { id: 3, title: '5 Essential Home Decor Trends for Modern Apartments', views: '3,820 views', date: 'Aug 28, 2026', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Store Content & Blog Manager</h2>
          <p className="text-xs text-slate-500">Manage CMS web pages, editorial blogs, and marketing stories</p>
        </div>

        <button
          onClick={() => showToast('Content editor opened.')}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create New Post
        </button>
      </div>

      {/* Pages Section */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">Static Policy & Store Pages</h3>
        </div>
        <div className="divide-y divide-slate-100 text-xs">
          {pages.map((p) => (
            <div key={p.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
              <div>
                <p className="font-bold text-slate-900">{p.title}</p>
                <p className="text-slate-400 text-[11px] font-mono">{p.slug}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-[11px]">Updated {p.lastUpdated}</span>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-full">
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Articles */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-800 text-sm">Latest Blog Articles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {articles.map((art) => (
            <div key={art.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <img src={art.image} alt={art.title} className="w-full h-36 object-cover" />
              <div className="p-4 space-y-2">
                <p className="text-[10px] text-slate-400 font-semibold">{art.date} • {art.views}</p>
                <h4 className="font-bold text-slate-900 text-xs line-clamp-2">{art.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
