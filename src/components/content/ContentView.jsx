import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import {
  Plus,
} from 'lucide-react';

export const ContentView = () => {
  const { showToast } = useApp();
  const [pages] = useState([
    { id: 1, title: 'About ShopWave', slug: '/about-us', status: 'Published', lastUpdated: '2 days ago' },
    { id: 2, title: 'Terms & Conditions', slug: '/terms', status: 'Published', lastUpdated: '1 month ago' },
    { id: 3, title: 'Privacy & Cookie Policy', slug: '/privacy-policy', status: 'Published', lastUpdated: '1 month ago' },
    { id: 4, title: 'Shipping & Return Policies', slug: '/shipping-returns', status: 'Published', lastUpdated: '1 week ago' },
  ]);

  const [articles] = useState([
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

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => showToast('Content editor opened.')}
        >
          Create New Post
        </Button>
      </div>

      {/* Pages Section */}
      <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Static Policy & Store Pages</h3>
        </div>
        <div className="divide-y divide-slate-100 text-xs">
          {pages.map((p) => (
            <div key={p.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-bold text-slate-900">{p.title}</p>
                <p className="text-slate-500 text-[11px] font-mono">{p.slug}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-500 text-[11px]">Updated {p.lastUpdated}</span>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-md border border-emerald-200">
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Articles */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Latest Blog Articles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {articles.map((art) => (
            <div key={art.id} className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 transition-colors">
              <img src={art.image} alt={art.title} className="w-full h-36 object-cover border-b border-slate-200" />
              <div className="p-4 space-y-2">
                <p className="text-[10px] text-slate-500 font-semibold">{art.date} • {art.views}</p>
                <h4 className="font-bold text-slate-900 text-xs line-clamp-2">{art.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
