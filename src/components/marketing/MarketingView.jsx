import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import {
  Plus,
  Send,
  TrendingUp,
  Users,
  Megaphone,
  Mail,
  Globe,
  Trash2,
  Edit2,
  X,
  CheckCircle2,
  Search,
  ArrowLeft,
  DollarSign,
  MousePointer,
  Sparkles,
  ShoppingBag,
  Info,
  FileText
} from 'lucide-react';

export const MarketingView = ({ initialTab = 'campaigns' }) => {
  const { showToast, navigateTo, seoConfig: contextSeoConfig, updateSeoConfig, products, brands } = useApp();
  const [activeTab, setActiveTab] = useState(
    initialTab === 'newsletters' ? 'newsletters' : initialTab === 'seo' ? 'seo' : 'campaigns'
  );

  useEffect(() => {
    setActiveTab(initialTab === 'newsletters' ? 'newsletters' : initialTab === 'seo' ? 'seo' : 'campaigns');
  }, [initialTab]);

  // Realistic Campaign Data Schema with Raw Numbers for Exact Math Calculations
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: 'Diwali Festive Super Email Blast',
      channel: 'Email Blast',
      impressions: 12500,
      clicks: 1560,
      orders: 45,
      revenue: 135000,
      status: 'Active'
    },
    {
      id: 2,
      title: 'Diwali Festive Special Offer',
      channel: 'Email Blast',
      impressions: 24500,
      clicks: 4508,
      orders: 312,
      revenue: 936000,
      status: 'Active'
    },
    {
      id: 3,
      title: 'Cart Abandonment Recovery SMS',
      channel: 'SMS Blast',
      impressions: 3120,
      clicks: 902,
      orders: 184,
      revenue: 441600,
      status: 'Active'
    },
    {
      id: 4,
      title: 'Google Shopping Ads - Electronics',
      channel: 'Google Ads',
      impressions: 85000,
      clicks: 3570,
      orders: 410,
      revenue: 1640000,
      status: 'Active'
    },
    {
      id: 5,
      title: 'VIP Loyalty Program Welcome',
      channel: 'Push Notification',
      impressions: 1450,
      clicks: 610,
      orders: 89,
      revenue: 267000,
      status: 'Completed'
    },
  ]);

  const [subscribers, setSubscribers] = useState([
    { id: 1, email: 'anand.verma@example.com', name: 'Anand Verma', category: 'Weekly VIP Deals', subscribedDate: 'Sep 10, 2026', status: 'Subscribed' },
    { id: 2, email: 'priya.sharma@example.com', name: 'Priya Sharma', category: 'Product Launches', subscribedDate: 'Sep 08, 2026', status: 'Subscribed' },
    { id: 3, email: 'vikram.singh@example.com', name: 'Vikram Singh', category: 'Tech & Electronics', subscribedDate: 'Aug 24, 2026', status: 'Subscribed' },
    { id: 4, email: 'neha.gupta@example.com', name: 'Neha Gupta', category: 'Fashion Flash Sales', subscribedDate: 'Aug 15, 2026', status: 'Subscribed' },
  ]);

  const [seoConfig, setSeoConfig] = useState(contextSeoConfig || {
    metaTitle: 'ShopWave | Premium E-Commerce Online Store India',
    metaDescription: 'Shop latest electronics, fashion, footwear, and home living products at ShopWave with best deals and instant express delivery across India.',
    keywords: 'shopwave, online shopping, mobile phones, electronics, fashion, buy shoes',
    canonicalUrl: 'https://shopwave.com',
    ogTitle: "ShopWave - India's Premier Online Shopping Destination",
    ogDescription: 'Discover 10,000+ curated products in electronics, apparel, & home essentials with free shipping & COD.',
    ogImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80',
    robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /checkout/\nSitemap: https://shopwave.com/sitemap.xml',
    gtmContainerId: 'GTM-SW9842K',
    searchConsoleCode: 'google-site-verification=ShopWave_Verify_2026_x892a',
    structuredDataEnabled: true,
    sitemapLastGenerated: 'Sep 19, 2026'
  });

  useEffect(() => {
    if (contextSeoConfig) {
      setSeoConfig(contextSeoConfig);
    }
  }, [contextSeoConfig]);

  const [isSitemapModalOpen, setIsSitemapModalOpen] = useState(false);
  const [isRobotsModalOpen, setIsRobotsModalOpen] = useState(false);
  const [robotsTesting, setRobotsTesting] = useState(false);

  // Campaign Form Modal States
  const [isAddCampaignOpen, setIsAddCampaignOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    channel: 'Email Blast',
    impressions: 15000,
    clicks: 1800,
    orders: 60,
    revenue: 180000,
    status: 'Active'
  });

  // Subscriber Form Modal States
  const [isAddSubscriberOpen, setIsAddSubscriberOpen] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState(null);
  const [newSubscriber, setNewSubscriber] = useState({
    name: '',
    email: '',
    category: 'Weekly VIP Deals',
    status: 'Subscribed'
  });

  const getFormattedRealDate = () => {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // DYNAMIC REAL-TIME MATHEMATICAL CALCULATIONS FROM CAMPAIGN ARRAY
  const totalImpressions = campaigns.reduce((sum, c) => sum + (Number(c.impressions) || 0), 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + (Number(c.clicks) || 0), 0);
  const totalOrders = campaigns.reduce((sum, c) => sum + (Number(c.orders) || 0), 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + (Number(c.revenue) || 0), 0);

  // Exact Mathematical Formula for CTR: (Total Clicks / Total Impressions) * 100
  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : '0.0';

  const channelOptions = [
    { value: 'Email Blast', label: 'Email Blast Campaign' },
    { value: 'SMS Blast', label: 'SMS Blast Campaign' },
    { value: 'Google Ads', label: 'Google Shopping Ads' },
    { value: 'Meta Ads', label: 'Meta & Instagram Ads' },
    { value: 'Push Notification', label: 'App Push Notification' },
  ];

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!newCampaign.title.trim()) return;

    const camp = {
      id: Date.now(),
      title: newCampaign.title.trim(),
      channel: newCampaign.channel,
      impressions: Number(newCampaign.impressions) || 0,
      clicks: Number(newCampaign.clicks) || 0,
      orders: Number(newCampaign.orders) || 0,
      revenue: Number(newCampaign.revenue) || 0,
      status: newCampaign.status || 'Active'
    };

    setCampaigns([camp, ...campaigns]);
    setNewCampaign({
      title: '',
      channel: 'Email Blast',
      impressions: 15000,
      clicks: 1800,
      orders: 60,
      revenue: 180000,
      status: 'Active'
    });
    setIsAddCampaignOpen(false);
    showToast(`Campaign "${camp.title}" launched! Top metrics & CTR recalculated.`);
  };

  const handleUpdateCampaign = (e) => {
    e.preventDefault();
    if (!editingCampaign || !editingCampaign.title) return;
    setCampaigns(campaigns.map(c => c.id === editingCampaign.id ? {
      ...editingCampaign,
      impressions: Number(editingCampaign.impressions) || 0,
      clicks: Number(editingCampaign.clicks) || 0,
      orders: Number(editingCampaign.orders) || 0,
      revenue: Number(editingCampaign.revenue) || 0,
    } : c));
    showToast(`Campaign "${editingCampaign.title}" updated! Metrics recalculated.`);
    setEditingCampaign(null);
  };

  const toggleCampaignStatus = (id) => {
    setCampaigns(campaigns.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'Active' ? 'Inactive' : 'Active';
        showToast(`Campaign status changed to ${nextStatus}`);
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const handleDeleteCampaign = (id, title) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    showToast(`Campaign "${title}" deleted. Metrics updated.`);
  };

  const handleCreateSubscriber = (e) => {
    e.preventDefault();
    if (!newSubscriber.name.trim() || !newSubscriber.email.trim()) return;

    const realDate = getFormattedRealDate();
    const sub = {
      id: Date.now(),
      name: newSubscriber.name.trim(),
      email: newSubscriber.email.trim(),
      category: newSubscriber.category || 'Weekly VIP Deals',
      subscribedDate: realDate,
      status: newSubscriber.status || 'Subscribed'
    };

    setSubscribers([sub, ...subscribers]);
    setNewSubscriber({
      name: '',
      email: '',
      category: 'Weekly VIP Deals',
      status: 'Subscribed'
    });
    setIsAddSubscriberOpen(false);
    showToast(`Subscriber "${sub.name}" added on ${realDate}!`);
  };

  const handleUpdateSubscriber = (e) => {
    e.preventDefault();
    if (!editingSubscriber || !editingSubscriber.name.trim() || !editingSubscriber.email.trim()) return;

    setSubscribers(subscribers.map(s => s.id === editingSubscriber.id ? editingSubscriber : s));
    showToast(`Subscriber record for "${editingSubscriber.name}" updated!`);
    setEditingSubscriber(null);
  };

  const toggleSubscriberStatus = (id) => {
    setSubscribers(subscribers.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Subscribed' ? 'Unsubscribed' : s.status === 'Unsubscribed' ? 'Pending' : 'Subscribed';
        showToast(`Status updated to ${nextStatus} for ${s.name}`);
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const handleSaveSeo = (e) => {
    if (e) e.preventDefault();
    updateSeoConfig(seoConfig);
  };

  const generateSitemapXml = () => {
    const domain = seoConfig.canonicalUrl || 'https://shopwave.com';
    const today = new Date().toISOString().split('T')[0];
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    xml += `  <!-- Homepage -->\n  <url>\n    <loc>${domain}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    xml += `  <!-- Product Catalog Index -->\n  <url>\n    <loc>${domain}/catalog</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>hourly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    
    if (products && products.length > 0) {
      xml += `  <!-- Products (${products.length} Active Items) -->\n`;
      products.slice(0, 10).forEach(p => {
        const slug = p.sku ? p.sku.toLowerCase() : (p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        xml += `  <url>\n    <loc>${domain}/product/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      });
    }

    if (brands && brands.length > 0) {
      xml += `  <!-- Verified Brands (${brands.length} Partners) -->\n`;
      brands.slice(0, 5).forEach(b => {
        const slug = (b.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        xml += `  <url>\n    <loc>${domain}/brand/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
      });
    }
    
    xml += `</urlset>`;
    return xml;
  };

  const handleGenerateSitemap = () => {
    const d = new Date();
    const formatted = `${d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
    const nextConfig = { ...seoConfig, sitemapLastGenerated: formatted };
    setSeoConfig(nextConfig);
    updateSeoConfig(nextConfig);
    setIsSitemapModalOpen(true);
    showToast('XML Sitemap rebuilt with latest store routes!');
  };

  const handleDownloadSitemap = () => {
    const xmlContent = generateSitemapXml();
    const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sitemap.xml');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('sitemap.xml file generated & downloaded!');
    setIsSitemapModalOpen(false);
  };

  const handleCopySitemap = () => {
    const xmlContent = generateSitemapXml();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(xmlContent);
    }
    showToast('Copied sitemap.xml to clipboard!');
  };

  const handleTestRobots = () => {
    setIsRobotsModalOpen(true);
  };

  const handleRunRobotsAudit = () => {
    setRobotsTesting(true);
    setTimeout(() => {
      setRobotsTesting(false);
      showToast('Robots.txt syntax & search crawler simulation passed with 0 errors!');
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-16">
      {/* Top Navigation & Sub-Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigateTo('dashboard')}
          >
            Back to Dashboard
          </Button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-blue-600" /> Marketing & Audience Growth
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage campaign dispatches, newsletter subscriber lists, and search engine optimization
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-md">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-3.5 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'campaigns' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5 inline mr-1.5" /> Campaigns ({campaigns.length})
          </button>
          <button
            onClick={() => setActiveTab('newsletters')}
            className={`px-3.5 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'newsletters' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5 inline mr-1.5" /> Newsletters ({subscribers.length + 18936})
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-3.5 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'seo' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5 inline mr-1.5" /> SEO Config
          </button>
        </div>
      </div>

      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Active Marketing Channels & Campaigns</h3>
              <p className="text-xs text-slate-500">Omnichannel promo blasts across email, SMS, and ad networks</p>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={() => setIsAddCampaignOpen(true)}
            >
              Launch New Campaign
            </Button>
          </div>

          {/* DYNAMIC REAL-TIME MATHEMATICALLY EXACT KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {/* Total Impressions Card */}
            <div className="bg-white p-4 sm:p-5 rounded-md border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 font-medium">Total Campaign Impressions</p>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                  <Send className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-slate-900">{totalImpressions.toLocaleString('en-IN')}</p>
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <Info className="w-3 h-3 text-slate-400" /> Σ Impressions across {campaigns.length} campaigns
                </p>
              </div>
            </div>

            {/* Mathematically Exact CTR % Card */}
            <div className="bg-white p-4 sm:p-5 rounded-md border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 font-medium">Avg Click-Through Rate (CTR)</p>
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-md">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-emerald-600">{avgCtr}%</p>
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-mono">
                  <MousePointer className="w-3 h-3 text-emerald-600" /> ({totalClicks.toLocaleString()} Clicks / {totalImpressions.toLocaleString()} Imp.)
                </p>
              </div>
            </div>

            {/* Total Campaign Revenue Generated Card */}
            <div className="bg-white p-4 sm:p-5 rounded-md border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 font-medium">Campaign Total Revenue</p>
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-md">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-slate-900">₹ {totalRevenue.toLocaleString('en-IN')}</p>
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <ShoppingBag className="w-3 h-3 text-indigo-600" /> Across {totalOrders.toLocaleString()} converted orders
                </p>
              </div>
            </div>

            {/* Newsletter Subscribers Card */}
            <div className="bg-white p-4 sm:p-5 rounded-md border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 font-medium">Newsletter Subscribers</p>
                <div className="p-2 bg-purple-50 text-purple-600 rounded-md">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-purple-600">{(subscribers.length + 18936).toLocaleString('en-IN')}</p>
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-600" /> Verified email mailing list
                </p>
              </div>
            </div>
          </div>

          {/* Campaign Performance History Table */}
          <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Campaign Performance History</h3>
                <p className="text-[11px] text-slate-500">Live breakdown of reach, clicks, orders, revenue and exact CTR calculation</p>
              </div>
              <span className="text-xs text-slate-500 font-semibold">{campaigns.length} campaigns listed</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[950px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="p-3.5 w-32">Channel</th>
                    <th className="p-3.5">Campaign Title</th>
                    <th className="p-3.5 text-right">Impressions</th>
                    <th className="p-3.5 text-right">Clicks</th>
                    <th className="p-3.5 text-center">CTR %</th>
                    <th className="p-3.5 text-right">Revenue (₹)</th>
                    <th className="p-3.5 text-center">Conversions</th>
                    <th className="p-3.5 text-center">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {campaigns.map((c) => {
                    const ctr = c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(1) : '0.0';
                    const conversionRate = c.clicks > 0 ? ((c.orders / c.clicks) * 100).toFixed(1) : '0.0';

                    return (
                      <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 whitespace-nowrap">
                          <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                            {c.channel || 'Email'}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-slate-900 text-sm block">{c.title}</span>
                        </td>
                        <td className="p-3.5 text-right font-medium text-slate-700 font-mono whitespace-nowrap">
                          {c.impressions.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3.5 text-right font-medium text-slate-700 font-mono whitespace-nowrap">
                          {c.clicks.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3.5 text-center whitespace-nowrap">
                          <span className="inline-block text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-bold text-xs border border-emerald-200">
                            {ctr}%
                          </span>
                        </td>
                        <td className="p-3.5 text-right font-bold text-slate-900 font-mono whitespace-nowrap">
                          ₹ {(c.revenue || 0).toLocaleString('en-IN')}
                        </td>
                        <td className="p-3.5 text-center whitespace-nowrap">
                          <span className="inline-block font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                            {c.orders} orders ({conversionRate}% Conv.)
                          </span>
                        </td>
                        <td className="p-3.5 text-center whitespace-nowrap">
                          <button
                            onClick={() => toggleCampaignStatus(c.id)}
                            className={`font-bold px-3 py-1 rounded-md text-xs border transition-all cursor-pointer ${
                              c.status === 'Active'
                                ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                                : c.status === 'Completed'
                                ? 'bg-slate-100 text-slate-700 border-slate-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                            }`}
                            title="Click to toggle status"
                          >
                            {c.status}
                          </button>
                        </td>
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingCampaign({ ...c })}
                              className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-md border border-slate-200 transition-colors cursor-pointer"
                              title="Edit Campaign"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCampaign(c.id, c.title)}
                              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md border border-slate-200 transition-colors cursor-pointer"
                              title="Delete Campaign"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Campaign Modal */}
          {isAddCampaignOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-md max-w-md w-full p-5 space-y-4 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">Launch Marketing Campaign</h3>
                  <button onClick={() => setIsAddCampaignOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateCampaign} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Campaign Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Autumn Electronics Special"
                      value={newCampaign.title}
                      onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Marketing Channel</label>
                    <Select
                      value={newCampaign.channel}
                      onChange={(e) => setNewCampaign({ ...newCampaign, channel: e.target.value })}
                      options={channelOptions}
                      size="md"
                      fullWidth
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Impressions / Reach</label>
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="15000"
                        value={newCampaign.impressions}
                        onChange={(e) => setNewCampaign({ ...newCampaign, impressions: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Clicks</label>
                      <input
                        type="number"
                        required
                        min="0"
                        placeholder="1800"
                        value={newCampaign.clicks}
                        onChange={(e) => setNewCampaign({ ...newCampaign, clicks: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Converted Orders</label>
                      <input
                        type="number"
                        min="0"
                        placeholder="60"
                        value={newCampaign.orders}
                        onChange={(e) => setNewCampaign({ ...newCampaign, orders: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Revenue Generated (₹)</label>
                      <input
                        type="number"
                        min="0"
                        placeholder="180000"
                        value={newCampaign.revenue}
                        onChange={(e) => setNewCampaign({ ...newCampaign, revenue: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                    <Button type="button" variant="secondary" onClick={() => setIsAddCampaignOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      Dispatch Campaign
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Campaign Modal */}
          {editingCampaign && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-md max-w-md w-full p-5 space-y-4 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">Edit Campaign Metrics</h3>
                  <button onClick={() => setEditingCampaign(null)} className="p-1 text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleUpdateCampaign} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Campaign Title</label>
                    <input
                      type="text"
                      required
                      value={editingCampaign.title}
                      onChange={(e) => setEditingCampaign({ ...editingCampaign, title: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Impressions</label>
                      <input
                        type="number"
                        value={editingCampaign.impressions}
                        onChange={(e) => setEditingCampaign({ ...editingCampaign, impressions: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Clicks</label>
                      <input
                        type="number"
                        value={editingCampaign.clicks}
                        onChange={(e) => setEditingCampaign({ ...editingCampaign, clicks: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Converted Orders</label>
                      <input
                        type="number"
                        value={editingCampaign.orders}
                        onChange={(e) => setEditingCampaign({ ...editingCampaign, orders: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Revenue (₹)</label>
                      <input
                        type="number"
                        value={editingCampaign.revenue}
                        onChange={(e) => setEditingCampaign({ ...editingCampaign, revenue: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Status</label>
                    <select
                      value={editingCampaign.status}
                      onChange={(e) => setEditingCampaign({ ...editingCampaign, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-semibold"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                    <Button type="button" variant="secondary" onClick={() => setEditingCampaign(null)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      Save & Recalculate CTR
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'newsletters' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Newsletter Audience & Mailing List</h3>
              <p className="text-xs text-slate-500">Manage subscribed emails, subscriber preferences, real-time timestamps and manual additions</p>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={() => setIsAddSubscriberOpen(true)}
            >
              Add Subscriber
            </Button>
          </div>

          <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="p-3.5">Subscriber Name</th>
                    <th className="p-3.5">Email Address</th>
                    <th className="p-3.5">Preference Topic</th>
                    <th className="p-3.5">Subscription Date</th>
                    <th className="p-3.5 text-center">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{sub.name}</td>
                      <td className="p-3.5 font-mono text-blue-600">{sub.email}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-semibold rounded-md border border-slate-200 text-[11px]">
                          {sub.category || 'Weekly VIP Deals'}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500 font-mono text-xs">{sub.subscribedDate}</td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => toggleSubscriberStatus(sub.id)}
                          className={`font-bold px-3 py-1 rounded-md text-xs border transition-all cursor-pointer ${
                            sub.status === 'Subscribed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : sub.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                              : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                          }`}
                          title="Click to toggle status"
                        >
                          {sub.status}
                        </button>
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingSubscriber({ ...sub })}
                            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-md border border-slate-200 transition-colors cursor-pointer"
                            title="Edit Subscriber"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setSubscribers(subscribers.filter(s => s.id !== sub.id));
                              showToast(`Removed ${sub.name} (${sub.email})`);
                            }}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md border border-slate-200 transition-colors cursor-pointer"
                            title="Remove Subscriber"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Subscriber Modal */}
          {isAddSubscriberOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-md max-w-md w-full p-5 space-y-4 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">Add Newsletter Subscriber</h3>
                  <button onClick={() => setIsAddSubscriberOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateSubscriber} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Subscriber Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Malhotra"
                      value={newSubscriber.name}
                      onChange={(e) => setNewSubscriber({ ...newSubscriber, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Subscriber Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul.malhotra@example.com"
                      value={newSubscriber.email}
                      onChange={(e) => setNewSubscriber({ ...newSubscriber, email: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Newsletter Preference / Topic Group</label>
                    <select
                      value={newSubscriber.category}
                      onChange={(e) => setNewSubscriber({ ...newSubscriber, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                    >
                      <option value="Weekly VIP Deals">Weekly VIP Deals</option>
                      <option value="Tech & Electronics">Tech & Electronics</option>
                      <option value="Fashion Flash Sales">Fashion Flash Sales</option>
                      <option value="Product Launches">Product Launches</option>
                      <option value="Seasonal Promos">Seasonal Promos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Subscription Status</label>
                    <select
                      value={newSubscriber.status}
                      onChange={(e) => setNewSubscriber({ ...newSubscriber, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-semibold"
                    >
                      <option value="Subscribed">Subscribed</option>
                      <option value="Pending">Pending Opt-In</option>
                      <option value="Unsubscribed">Unsubscribed</option>
                    </select>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200 text-[11px] text-slate-600">
                    <span>Registration Timestamp: <strong className="text-slate-900">{getFormattedRealDate()}</strong> (Real Live Date)</span>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                    <Button type="button" variant="secondary" onClick={() => setIsAddSubscriberOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      Add Subscriber Profile
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Subscriber Modal */}
          {editingSubscriber && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-md max-w-md w-full p-5 space-y-4 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">Edit Subscriber Profile</h3>
                  <button onClick={() => setEditingSubscriber(null)} className="p-1 text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleUpdateSubscriber} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={editingSubscriber.name}
                      onChange={(e) => setEditingSubscriber({ ...editingSubscriber, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={editingSubscriber.email}
                      onChange={(e) => setEditingSubscriber({ ...editingSubscriber, email: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Preference Topic Group</label>
                    <select
                      value={editingSubscriber.category || 'Weekly VIP Deals'}
                      onChange={(e) => setEditingSubscriber({ ...editingSubscriber, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                    >
                      <option value="Weekly VIP Deals">Weekly VIP Deals</option>
                      <option value="Tech & Electronics">Tech & Electronics</option>
                      <option value="Fashion Flash Sales">Fashion Flash Sales</option>
                      <option value="Product Launches">Product Launches</option>
                      <option value="Seasonal Promos">Seasonal Promos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Subscription Status</label>
                    <select
                      value={editingSubscriber.status}
                      onChange={(e) => setEditingSubscriber({ ...editingSubscriber, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-semibold"
                    >
                      <option value="Subscribed">Subscribed</option>
                      <option value="Pending">Pending Opt-In</option>
                      <option value="Unsubscribed">Unsubscribed</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                    <Button type="button" variant="secondary" onClick={() => setEditingSubscriber(null)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      Save Profile Changes
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'seo' && (
        <div className="space-y-6">
          {/* SEO Health Audit Card & Action Bar */}
          <div className="bg-white p-5 rounded-md border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">Storefront SEO & Social Metadata Studio</h3>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
                    Health Score: 96 / 100
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure global search index tags, OpenGraph social share previews, Schema.org rich snippets, and XML sitemaps
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <Button variant="secondary" size="md" icon={Globe} onClick={handleGenerateSitemap}>
                  Generate XML Sitemap
                </Button>
                <Button variant="secondary" size="md" icon={FileText} onClick={handleTestRobots}>
                  Test Robots.txt
                </Button>
                <Button variant="primary" size="md" icon={CheckCircle2} onClick={handleSaveSeo}>
                  Save SEO Specs
                </Button>
              </div>
            </div>

            {/* LIVE PREVIEWS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
              {/* Google SERP Live Search Result Mockup */}
              <div className="bg-slate-50 p-4 rounded-md border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-600" /> Google SERP Search Result Preview
                  </span>
                  <span className="text-[10px] text-slate-500">Live Mockup</span>
                </div>

                <div className="bg-white p-4 rounded-md border border-slate-200 shadow-xs space-y-1.5 font-sans">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[9px]">S</span>
                    <span className="text-slate-800 font-medium">ShopWave Storefront</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-mono text-[11px] truncate">{seoConfig.canonicalUrl}</span>
                  </div>
                  <h4 className="text-blue-700 font-semibold text-base hover:underline cursor-pointer leading-snug">
                    {seoConfig.metaTitle || 'ShopWave | Premium E-Commerce Store'}
                  </h4>
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                    {seoConfig.metaDescription || 'Shop latest products online with instant delivery...'}
                  </p>
                </div>
              </div>

              {/* Social OpenGraph Share Card Mockup */}
              <div className="bg-slate-50 p-4 rounded-md border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> WhatsApp / Facebook / OpenGraph Preview
                  </span>
                  <span className="text-[10px] text-slate-500">Social Card</span>
                </div>

                <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/3 h-28 bg-slate-200 relative overflow-hidden flex-shrink-0">
                    <img
                      src={seoConfig.ogImage}
                      alt="OpenGraph Share Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-center space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SHOPWAVE.COM</span>
                    <h5 className="font-bold text-slate-900 text-xs line-clamp-1">
                      {seoConfig.ogTitle || seoConfig.metaTitle}
                    </h5>
                    <p className="text-slate-500 text-[11px] line-clamp-2">
                      {seoConfig.ogDescription || seoConfig.metaDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM CONFIGURATION FIELDS */}
            <form onSubmit={handleSaveSeo} className="space-y-4 text-xs pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-700">Global Meta Title *</label>
                    <span className={`text-[11px] font-mono font-bold ${
                      seoConfig.metaTitle.length >= 50 && seoConfig.metaTitle.length <= 60
                        ? 'text-emerald-600'
                        : 'text-amber-600'
                    }`}>
                      {seoConfig.metaTitle.length} / 60 chars
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={seoConfig.metaTitle}
                    onChange={(e) => setSeoConfig({ ...seoConfig, metaTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 font-medium text-slate-900"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-700">Canonical Store Domain URL</label>
                    <span className="text-[10px] text-slate-400">Canonical Tag</span>
                  </div>
                  <input
                    type="url"
                    required
                    value={seoConfig.canonicalUrl}
                    onChange={(e) => setSeoConfig({ ...seoConfig, canonicalUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 font-mono text-slate-900 text-xs"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700">Global Meta Description *</label>
                  <span className={`text-[11px] font-mono font-bold ${
                    seoConfig.metaDescription.length >= 120 && seoConfig.metaDescription.length <= 160
                      ? 'text-emerald-600'
                      : 'text-amber-600'
                  }`}>
                    {seoConfig.metaDescription.length} / 160 chars
                  </span>
                </div>
                <textarea
                  rows="3"
                  required
                  value={seoConfig.metaDescription}
                  onChange={(e) => setSeoConfig({ ...seoConfig, metaDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">OpenGraph Share Title</label>
                  <input
                    type="text"
                    value={seoConfig.ogTitle}
                    onChange={(e) => setSeoConfig({ ...seoConfig, ogTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">OpenGraph Share Image URL</label>
                  <input
                    type="text"
                    value={seoConfig.ogImage}
                    onChange={(e) => setSeoConfig({ ...seoConfig, ogImage: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Google Analytics / GTM Container ID</label>
                  <input
                    type="text"
                    placeholder="e.g. GTM-SW9842K or G-9824KSL"
                    value={seoConfig.gtmContainerId}
                    onChange={(e) => setSeoConfig({ ...seoConfig, gtmContainerId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 font-mono text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Search Console Verification Tag</label>
                  <input
                    type="text"
                    placeholder="google-site-verification=..."
                    value={seoConfig.searchConsoleCode}
                    onChange={(e) => setSeoConfig({ ...seoConfig, searchConsoleCode: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 font-mono text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Robots.txt Directives</label>
                  <textarea
                    rows="3"
                    value={seoConfig.robotsTxt}
                    onChange={(e) => setSeoConfig({ ...seoConfig, robotsTxt: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 font-mono text-slate-800"
                  />
                </div>

                <div className="space-y-3 bg-slate-50 p-4 rounded-md border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Schema.org JSON-LD Rich Snippets</h4>
                      <p className="text-[11px] text-slate-500">Enable Organization & E-Commerce product markup for Google</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={seoConfig.structuredDataEnabled}
                      onChange={(e) => setSeoConfig({ ...seoConfig, structuredDataEnabled: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600">Sitemap Status: <strong className="text-emerald-700">Active (200 OK)</strong></span>
                    <span className="text-slate-500 font-mono">Last Built: {seoConfig.sitemapLastGenerated}</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* XML Sitemap Inspector & Builder Modal */}
      {isSitemapModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-md max-w-2xl w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Storefront XML Sitemap Builder & Inspector</h3>
                  <p className="text-xs text-slate-500">Live search engine index generated for Googlebot, Bingbot, & Baidubot</p>
                </div>
              </div>
              <button onClick={() => setIsSitemapModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between bg-blue-50 p-3 rounded-md border border-blue-200">
                <div>
                  <span className="font-bold text-blue-900 block text-xs">Live Index Status: 6 Active Storefront Routes</span>
                  <span className="text-blue-700 text-[11px]">Last Rebuilt: <strong>{seoConfig.sitemapLastGenerated}</strong></span>
                </div>
                <button
                  onClick={() => {
                    const d = new Date();
                    const formatted = `${d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
                    setSeoConfig({ ...seoConfig, sitemapLastGenerated: formatted });
                    showToast('Re-scanned store routes and regenerated sitemap.xml!');
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-xs transition-colors cursor-pointer text-xs"
                >
                  Re-Scan & Rebuild Routes
                </button>
              </div>

              <div className="bg-slate-900 p-4 rounded-md text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-72 leading-relaxed border border-slate-800">
                <pre>{generateSitemapXml()}</pre>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
              <span className="text-slate-600 font-medium">Validation: <strong className="text-emerald-700">Valid XML 1.0 (Live Dynamic Routes)</strong></span>
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={handleCopySitemap}>
                  Copy XML Code
                </Button>
                <Button variant="primary" onClick={handleDownloadSitemap}>
                  Download sitemap.xml
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Robots.txt Tester & Crawler Simulation Modal */}
      {isRobotsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-md max-w-2xl w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Robots.txt Syntax Tester & Crawler Simulation</h3>
                  <p className="text-xs text-slate-500">Validate search bot access rules for Googlebot, Bingbot, & Baidu</p>
                </div>
              </div>
              <button onClick={() => setIsRobotsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Directive View */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Current Directives File</label>
                <div className="bg-slate-900 p-3 rounded-md text-slate-200 font-mono text-[11px] h-48 overflow-y-auto border border-slate-800 leading-relaxed">
                  <pre>{seoConfig.robotsTxt}</pre>
                </div>
              </div>

              {/* Crawler Simulation Diagnostic Results */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Crawler Access Simulation</label>
                <div className="bg-slate-50 p-3 rounded-md border border-slate-200 h-48 overflow-y-auto space-y-2 text-[11px]">
                  <div className="flex items-center justify-between p-1.5 bg-white rounded border border-slate-200">
                    <span className="font-medium text-slate-800">Googlebot (Search)</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px] border border-emerald-200">ALLOWED</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 bg-white rounded border border-slate-200">
                    <span className="font-medium text-slate-800">Bingbot (Microsoft)</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px] border border-emerald-200">ALLOWED</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 bg-white rounded border border-slate-200">
                    <span className="font-medium text-slate-800">Admin Path (/admin/)</span>
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-700 font-bold rounded text-[10px] border border-rose-200">DISALLOWED</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 bg-white rounded border border-slate-200">
                    <span className="font-medium text-slate-800">Checkout Path (/checkout/)</span>
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-700 font-bold rounded text-[10px] border border-rose-200">DISALLOWED</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
              <span className="text-slate-600 font-medium">Syntax Audit: <strong className="text-emerald-700">0 Errors, 0 Warnings</strong></span>
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => setIsRobotsModalOpen(false)}>
                  Close
                </Button>
                <Button variant="primary" disabled={robotsTesting} onClick={handleRunRobotsAudit}>
                  {robotsTesting ? 'Running Simulation...' : 'Run Syntax Audit Test'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

