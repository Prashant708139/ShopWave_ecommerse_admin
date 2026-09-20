import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { RichTextEditor } from '../ui/RichTextEditor';
import { ImageAssetPicker } from '../ui/ImageAssetPicker';
import {
  Plus,
  FileText,
  Sparkles,
  Eye,
  Trash2,
  X,
  CheckCircle2,
  ArrowLeft,
  Edit2,
  Globe,
  Save
} from 'lucide-react';

export const ContentView = ({ initialTab = 'pages' }) => {
  const { showToast, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState(initialTab === 'blogs' ? 'blogs' : 'pages');
  const [searchTerm, setSearchTerm] = useState('');

  const [pages, setPages] = useState([
    {
      id: 1,
      title: 'About ShopWave',
      slug: '/about-us',
      category: 'Store Information',
      status: 'Published',
      lastUpdated: 'Sep 15, 2026',
      body: `<h3>Welcome to ShopWave - India's Premier Next-Gen E-Commerce Platform</h3>
<p>Founded with a vision to revolutionize digital retail, <strong>ShopWave</strong> connects over 2.5 million active shoppers with top-tier international brands and verified domestic manufacturers.</p>
<h4>Our Quality & Service Assurance:</h4>
<ul>
  <li><strong>100% Authentic Products:</strong> Direct sourcing guarantees genuine products with full manufacturer warranties.</li>
  <li><strong>Express Nationwide Dispatch:</strong> Orders dispatched within 24-48 hours across 19,000+ PIN codes in India.</li>
  <li><strong>Customer Protection Guarantee:</strong> 24/7 dedicated support desk with 7-day hassle-free doorstep returns.</li>
</ul>
<p>For press inquiries or commercial partnerships, contact <em>corporate@shopwave.com</em>.</p>`
    },
    {
      id: 2,
      title: 'Terms & Commercial Conditions',
      slug: '/terms',
      category: 'Legal Terms',
      status: 'Published',
      lastUpdated: 'Aug 28, 2026',
      body: `<h3>ShopWave Storefront Terms of Commerce</h3>
<p>Please read these commercial terms carefully before browsing or placing orders on ShopWave.</p>
<h4>1. User Account Responsibility</h4>
<p>Users are responsible for maintaining the confidentiality of their account login credentials and OTPs. All orders placed under an account are deemed authorized by the registered account holder.</p>
<h4>2. Product Pricing & GST Taxes</h4>
<p>All prices listed on ShopWave are in Indian Rupees (₹ INR) and inclusive of applicable GST taxes. ShopWave reserves the right to modify promotional pricing without prior notice.</p>
<h4>3. Order Acceptance & Fraud Prevention</h4>
<p>ShopWave reserves the right to verify, hold, or cancel any transaction flagged by automated risk assessment systems for suspicious activity.</p>`
    },
    {
      id: 3,
      title: 'Privacy & Cookie Security Policy',
      slug: '/privacy-policy',
      category: 'Legal Terms',
      status: 'Published',
      lastUpdated: 'Aug 24, 2026',
      body: `<h3>ShopWave Data Protection & Customer Privacy Notice</h3>
<p>At ShopWave, safeguarding your personal data and commercial privacy is our highest priority.</p>
<h4>Data Collection Transparency:</h4>
<p>We collect essential order details including customer name, delivery shipping address, mobile phone number, and email address solely to process orders and send dispatch tracking alerts.</p>
<h4>256-Bit SSL Encryption:</h4>
<p>All online payment transactions (UPI, Credit Cards, Net Banking) are encrypted using industry-standard 256-bit SSL encryption. ShopWave never stores full credit card numbers or banking PINs on internal servers.</p>
<h4>Cookie Policy:</h4>
<p>We use session cookies to preserve items in your shopping cart and optimize website page loading speeds.</p>`
    },
    {
      id: 4,
      title: 'Shipping, Delivery & Return Policy',
      slug: '/shipping-returns',
      category: 'Customer Policies',
      status: 'Published',
      lastUpdated: 'Sep 10, 2026',
      body: `<h3>Shipping Timelines & Doorstep Return Policies</h3>
<h4>Dispatch & Shipping SLAs</h4>
<p>Standard delivery orders are processed and dispatched within 24 to 48 hours. Orders dispatched via Express Air Freight are delivered within 2-4 business days across major metro cities in India.</p>
<h4>7-Day Hassle-Free Returns</h4>
<p>If you receive a damaged, defective, or incorrect product, you may request a replacement or full refund within <strong>7 days of delivery</strong> directly from your Customer Order Dashboard.</p>
<h4>Refund Credit Timeline</h4>
<p>Upon receiving and inspecting the returned item at our central warehouse, refunds are initiated within 48 hours and credited back to your original payment source (UPI/Bank) within 3-5 business days.</p>`
    },
    {
      id: 5,
      title: 'Cancellation & Instant Refund Terms',
      slug: '/cancellation-refunds',
      category: 'Customer Policies',
      status: 'Published',
      lastUpdated: 'Sep 02, 2026',
      body: `<h3>Order Cancellation & Refund Processing Rules</h3>
<h4>Cancellation Window</h4>
<p>Orders can be cancelled free of charge at any time prior to warehouse dispatch. Once shipped, orders can be cancelled at the doorstep during delivery attempt.</p>
<h4>Refund Methods</h4>
<p>Prepaid orders are refunded directly to the original payment source (UPI, Credit/Debit Card, Net Banking). Cash on Delivery (COD) orders are refunded via Instant UPI Transfer or ShopWave Store Credit.</p>`
    },
    {
      id: 6,
      title: 'Customer Helpdesk & Grievance Redressal',
      slug: '/support',
      category: 'Store Information',
      status: 'Published',
      lastUpdated: 'Sep 12, 2026',
      body: `<h3>Customer Helpdesk & Official Grievance Officer</h3>
<p>Have questions about your active order, GST invoices, or product warranty?</p>
<ul>
  <li><strong>Email Support:</strong> support@shopwave.com</li>
  <li><strong>Toll-Free Helpline:</strong> 1800-419-7088 (Mon-Sat, 9:00 AM - 8:00 PM IST)</li>
  <li><strong>Nodal Grievance Officer:</strong> Officer - ShopWave Internet Private Limited, Tech Park, Outer Ring Road, Bengaluru, KA 560103</li>
</ul>`
    }
  ]);

  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Top 10 Flagship Smartphones of 2026: The Ultimate Buyer Guide',
      excerpt: 'Explore top flagship smartphones with groundbreaking cameras, satellite connectivity, and AI chips.',
      category: 'Technology',
      author: 'Tech Desk Team',
      readTime: '5 min read',
      views: '4,890 views',
      date: 'Sep 12, 2026',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      featured: true,
      status: 'Published',
      content: '<p>2026 marks a monumental shift in mobile tech with hardware-accelerated generative AI and multi-day battery tech...</p>'
    },
    {
      id: 2,
      title: 'How to Choose the Right Footwear for Daily Marathon Running',
      excerpt: 'Choose high cushion and responsive carbon plate soles for daily road running and marathon protection.',
      category: 'Fitness & Wellness',
      author: 'Fitness Editor',
      readTime: '4 min read',
      views: '2,410 views',
      date: 'Sep 05, 2026',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      featured: false,
      status: 'Published',
      content: '<p>Selecting proper running shoes prevents long-term joint stress and enhances performance metrics...</p>'
    },
    {
      id: 3,
      title: '5 Essential Home Decor Trends for Modern Minimalist Apartments',
      excerpt: 'Elevate your urban living space with minimalist fluted glass, warm oak wood accents, and ambient smart lighting.',
      category: 'Home & Living',
      author: 'Interior Studio',
      readTime: '3 min read',
      views: '3,820 views',
      date: 'Aug 28, 2026',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      featured: true,
      status: 'Published',
      content: '<p>Minimalist luxury focuses on warm natural textures, hidden LED channels, and ergonomic space saving furniture...</p>'
    },
  ]);

  // Static Page Modal States
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const [previewPage, setPreviewPage] = useState(null);
  const [editingPageId, setEditingPageId] = useState(null);
  const [pageFormData, setPageFormData] = useState({
    title: '',
    slug: '',
    category: 'Legal Terms',
    status: 'Published',
    body: ''
  });

  // Blog Editor Modal States
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [previewArticle, setPreviewArticle] = useState(null);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [articleFormData, setArticleFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Technology',
    author: 'ShopWave Editorial',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    featured: false,
    status: 'Published',
    content: ''
  });

  const handleOpenAddPage = () => {
    setEditingPageId(null);
    setPageFormData({ title: '', slug: '', category: 'Legal Terms', status: 'Published', body: '' });
    setIsPageModalOpen(true);
  };

  const handleOpenEditPage = (page) => {
    setEditingPageId(page.id);
    setPageFormData({
      title: page.title,
      slug: page.slug,
      category: page.category || 'Legal Terms',
      status: page.status,
      body: page.body || ''
    });
    setIsPageModalOpen(true);
  };

  const handleSavePageSubmit = (e) => {
    e.preventDefault();
    if (!pageFormData.title) return;

    if (editingPageId) {
      setPages(pages.map(p => p.id === editingPageId ? {
        ...p,
        title: pageFormData.title,
        slug: pageFormData.slug || `/${pageFormData.title.toLowerCase().replace(/\s+/g, '-')}`,
        category: pageFormData.category,
        status: pageFormData.status,
        body: pageFormData.body,
        lastUpdated: 'Just now'
      } : p));
      showToast(`Static page "${pageFormData.title}" updated!`);
    } else {
      const newP = {
        id: Date.now(),
        title: pageFormData.title,
        slug: pageFormData.slug || `/${pageFormData.title.toLowerCase().replace(/\s+/g, '-')}`,
        category: pageFormData.category || 'Legal Terms',
        status: pageFormData.status,
        lastUpdated: 'Just now',
        body: pageFormData.body
      };
      setPages([...pages, newP]);
      showToast(`Static page "${newP.title}" created!`);
    }
    setIsPageModalOpen(false);
  };

  const togglePageStatus = (id) => {
    setPages(pages.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'Published' ? 'Draft' : 'Published';
        showToast(`Page status changed to ${nextStatus}`);
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const handleDeletePage = (id, title) => {
    setPages(pages.filter(p => p.id !== id));
    showToast(`Page "${title}" deleted.`);
  };

  const handleOpenAddArticle = () => {
    setEditingArticleId(null);
    setArticleFormData({
      title: '',
      excerpt: '',
      category: 'Technology',
      author: 'ShopWave Editorial',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      featured: false,
      status: 'Published',
      content: ''
    });
    setIsEditorOpen(true);
  };

  const handleOpenEditArticle = (art) => {
    setEditingArticleId(art.id);
    setArticleFormData({
      title: art.title,
      excerpt: art.excerpt || '',
      category: art.category || 'Technology',
      author: art.author || 'ShopWave Editorial',
      readTime: art.readTime || '4 min read',
      image: art.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      featured: Boolean(art.featured),
      status: art.status || 'Published',
      content: art.content || ''
    });
    setIsEditorOpen(true);
  };

  const handleSaveArticleSubmit = (e) => {
    e.preventDefault();
    if (!articleFormData.title.trim()) return;

    if (editingArticleId) {
      setArticles(articles.map(a => a.id === editingArticleId ? {
        ...a,
        title: articleFormData.title.trim(),
        excerpt: articleFormData.excerpt.trim(),
        category: articleFormData.category,
        author: articleFormData.author,
        readTime: articleFormData.readTime,
        image: articleFormData.image,
        featured: articleFormData.featured,
        status: articleFormData.status,
        content: articleFormData.content
      } : a));
      showToast(`Article "${articleFormData.title}" updated successfully!`);
    } else {
      const art = {
        id: Date.now(),
        title: articleFormData.title.trim(),
        excerpt: articleFormData.excerpt.trim(),
        category: articleFormData.category,
        author: articleFormData.author,
        readTime: articleFormData.readTime,
        views: '0 views',
        date: 'Today',
        image: articleFormData.image,
        featured: articleFormData.featured,
        status: articleFormData.status,
        content: articleFormData.content
      };
      setArticles([art, ...articles]);
      showToast(`Blog article "${art.title}" published!`);
    }
    setIsEditorOpen(false);
  };

  const filteredPages = pages.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-16">
      {/* Top Header & Sub-Tab Switcher */}
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
              <FileText className="w-5 h-5 text-blue-600" /> CMS & Editorial Content Hub
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage static store policies, landing pages, and editorial blog articles
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-md">
          <button
            onClick={() => setActiveTab('pages')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'pages' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 inline mr-1.5" /> Static Pages ({pages.length})
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'blogs' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5" /> Blog Posts ({articles.length})
          </button>
        </div>
      </div>

      {activeTab === 'pages' ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Static Legal & Policy Pages</h3>
              <p className="text-xs text-slate-500">Core footer pages displayed across the storefront</p>
            </div>
            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={handleOpenAddPage}
            >
              Add Page
            </Button>
          </div>

          {/* Search & Filter Header Bar */}
          <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-md border border-slate-200 shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search static legal & policy pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
              />
            </div>
            <span className="text-xs font-bold text-slate-600">
              {filteredPages.length} Storefront Footer Pages
            </span>
          </div>

          <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden">
            <div className="divide-y divide-slate-100 text-xs">
              {filteredPages.map((p) => (
                <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                        {p.category || 'Legal Terms'}
                      </span>
                      <p className="font-bold text-slate-900 text-sm">{p.title}</p>
                    </div>
                    <p className="text-slate-500 text-[11px] font-mono">{p.slug}</p>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-slate-500 text-[11px]">Updated {p.lastUpdated}</span>
                    
                    <button
                      onClick={() => togglePageStatus(p.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-all cursor-pointer ${
                        p.status === 'Published'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                      }`}
                      title="Click to toggle status"
                    >
                      {p.status}
                    </button>

                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Eye}
                      onClick={() => setPreviewPage(p)}
                    >
                      Preview
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Edit2}
                      onClick={() => handleOpenEditPage(p)}
                    >
                      Edit Page
                    </Button>

                    <button
                      onClick={() => handleDeletePage(p.id, p.title)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                      title="Delete Page"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Storefront Live Page Reader Preview Modal */}
          {previewPage && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-hidden">
              <div className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
                <div className="flex-shrink-0 px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between z-10">
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{previewPage.title}</h3>
                      <p className="text-xs text-slate-500 font-mono">https://shopwave.com{previewPage.slug}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setPreviewPage(null)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 text-xs text-slate-700">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-[11px] text-slate-500 font-medium bg-white p-3 rounded-md border border-slate-200">
                    <span>Category: <strong className="text-slate-800">{previewPage.category || 'Legal Terms'}</strong></span>
                    <span>Last Updated: <strong className="text-slate-800">{previewPage.lastUpdated}</strong></span>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: previewPage.body }}
                    className="space-y-2 text-slate-800 font-sans leading-relaxed bg-white p-5 rounded-md border border-slate-200 shadow-xs prose max-w-none"
                  />
                </div>

                <div className="flex-shrink-0 px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-end gap-3 z-10">
                  <Button variant="secondary" onClick={() => setPreviewPage(null)}>
                    Close Preview
                  </Button>
                  <Button variant="primary" icon={Edit2} onClick={() => {
                    const page = previewPage;
                    setPreviewPage(null);
                    handleOpenEditPage(page);
                  }}>
                    Edit Content
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Static Page Editor Modal */}
          {isPageModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-hidden">
              <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
                <div className="flex-shrink-0 px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between z-10">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" /> {editingPageId ? 'Edit Static Policy Page' : 'Create Static Policy Page'}
                  </h3>
                  <button type="button" onClick={() => setIsPageModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSavePageSubmit} className="flex flex-col flex-1 overflow-hidden min-h-0">
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Page Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Return & Exchange Policy"
                        value={pageFormData.title}
                        onChange={(e) => setPageFormData({ ...pageFormData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-bold text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">URL Slug</label>
                        <input
                          type="text"
                          placeholder="/return-policy"
                          value={pageFormData.slug}
                          onChange={(e) => setPageFormData({ ...pageFormData, slug: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 font-mono text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Policy Category</label>
                        <select
                          value={pageFormData.category}
                          onChange={(e) => setPageFormData({ ...pageFormData, category: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                        >
                          <option value="Legal Terms">Legal Terms</option>
                          <option value="Customer Policies">Customer Policies</option>
                          <option value="Store Information">Store Information</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Publish Status</label>
                        <select
                          value={pageFormData.status}
                          onChange={(e) => setPageFormData({ ...pageFormData, status: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-bold"
                        >
                          <option value="Published">Published</option>
                          <option value="Draft">Draft</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Page Policy Content (WYSIWYG Editor)</label>
                      <RichTextEditor
                        value={pageFormData.body}
                        onChange={(val) => setPageFormData({ ...pageFormData, body: val })}
                        placeholder="Enter legal terms, delivery timelines, and customer rights..."
                        minHeight="200px"
                      />
                    </div>
                  </div>

                  <div className="flex-shrink-0 px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3 z-10">
                    <Button type="button" variant="secondary" onClick={() => setIsPageModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" icon={Save}>
                      Save Page Content
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* BLOG POSTS MASTER CMS WITH ULTRA-PREMIUM 2-COLUMN STUDIO MODAL */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Editorial Blog Articles & Stories</h3>
              <p className="text-xs text-slate-500">Engage customers with product guides, lookbooks, and news</p>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={handleOpenAddArticle}
            >
              Create Blog Article
            </Button>
          </div>

          {/* Equal Height Blog Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {articles.map((art) => (
              <div key={art.id} className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between h-full group">
                <div>
                  <div className="h-44 w-full relative bg-slate-100 overflow-hidden border-b border-slate-200">
                    <img src={art.image} alt={art.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 text-white backdrop-blur-xs rounded text-[10px] font-bold uppercase tracking-wider">
                      {art.category || 'Technology'}
                    </span>
                    {art.featured && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 bg-amber-400 text-slate-900 font-bold rounded text-[10px] shadow-xs flex items-center gap-1">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-slate-400" /> {art.date} • {art.views}
                      </span>
                      <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {art.readTime || '4 min read'}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">{art.title}</h4>
                    {art.excerpt && (
                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{art.excerpt}</p>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-2 flex items-center justify-between gap-2 border-t border-slate-100 mt-2">
                  <span className="text-[11px] text-slate-500 font-medium truncate">
                    By <strong>{art.author || 'ShopWave Editorial'}</strong>
                  </span>
                  
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => setPreviewArticle(art)}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md border border-slate-200 transition-colors cursor-pointer"
                      title="Preview Story"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenEditArticle(art)}
                      className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-md border border-slate-200 transition-colors cursor-pointer"
                      title="Edit Article"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setArticles(articles.filter(a => a.id !== art.id));
                        showToast(`Article "${art.title}" deleted.`);
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md border border-slate-200 transition-colors cursor-pointer"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Blog Article Reader Preview Modal */}
          {previewArticle && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-hidden">
              <div className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
                <div className="flex-shrink-0 px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between z-10">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        {previewArticle.category || 'Editorial Story'}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base">{previewArticle.title}</h3>
                    </div>
                  </div>
                  <button type="button" onClick={() => setPreviewArticle(null)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
                  <img src={previewArticle.image} alt={previewArticle.title} className="w-full h-56 object-cover rounded-lg border border-slate-200 shadow-xs" />
                  <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-2">
                    <span>By <strong>{previewArticle.author || 'ShopWave Editorial'}</strong> • {previewArticle.date}</span>
                    <span>{previewArticle.readTime || '4 min read'} • {previewArticle.views}</span>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: previewArticle.content || '<p>Article text content preview...</p>' }}
                    className="text-xs text-slate-800 space-y-3 leading-relaxed font-sans prose max-w-none"
                  />
                </div>

                <div className="flex-shrink-0 px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-end gap-3 z-10">
                  <Button variant="secondary" onClick={() => setPreviewArticle(null)}>
                    Close Preview
                  </Button>
                  <Button variant="primary" icon={Edit2} onClick={() => {
                    const art = previewArticle;
                    setPreviewArticle(null);
                    handleOpenEditArticle(art);
                  }}>
                    Edit Article
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ULTRA-PREMIUM 2-COLUMN MASTER BLOG ARTICLE STUDIO MODAL */}
          {isEditorOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-hidden">
              <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
                {/* Modal Header (Fixed Top) */}
                <div className="flex-shrink-0 px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100/60 shadow-xs">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">
                        {editingArticleId ? 'Edit Editorial Blog Article' : 'Write & Publish Editorial Article'}
                      </h3>
                      <p className="text-xs text-slate-500">Craft rich stories, upload cover media, and manage storefront lookbooks</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setIsEditorOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveArticleSubmit} className="flex flex-col flex-1 overflow-hidden min-h-0">
                  {/* Scrollable Form Body */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
                    {/* 2-Column Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* LEFT COLUMN: Main Article Inputs (2/3 width) */}
                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <label className="block font-bold text-slate-800 mb-1">Article Headline / Title *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 10 Essential Tech Gadgets for Festival Season 2026"
                            value={articleFormData.title}
                            onChange={(e) => setArticleFormData({ ...articleFormData, title: e.target.value })}
                            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 font-bold text-slate-900 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Summary Excerpt / Subtitle *</label>
                          <textarea
                            rows="2"
                            required
                            placeholder="Write a 1-2 sentence compelling summary for search previews & card listings..."
                            value={articleFormData.excerpt}
                            onChange={(e) => setArticleFormData({ ...articleFormData, excerpt: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Full Article Body (Rich Text WYSIWYG Editor) *</label>
                          <RichTextEditor
                            value={articleFormData.content}
                            onChange={(val) => setArticleFormData({ ...articleFormData, content: val })}
                            placeholder="Write your story, insert headings, formatted lists, blockquotes, and tables..."
                            minHeight="220px"
                          />
                        </div>
                      </div>

                      {/* RIGHT COLUMN: Media & Publishing Controls (1/3 width) */}
                      <div className="space-y-4 bg-slate-50 p-4 rounded-md border border-slate-200 h-fit">
                        <h4 className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-2">
                          Publishing Specs & Media
                        </h4>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Publish Status</label>
                          <select
                            value={articleFormData.status}
                            onChange={(e) => setArticleFormData({ ...articleFormData, status: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-bold"
                          >
                            <option value="Published">Published (Live on Storefront)</option>
                            <option value="Draft">Draft (Internal Review)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Article Category</label>
                          <select
                            value={articleFormData.category}
                            onChange={(e) => setArticleFormData({ ...articleFormData, category: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                          >
                            <option value="Technology">Technology & Devices</option>
                            <option value="Fashion & Lifestyle">Fashion & Lifestyle</option>
                            <option value="Home & Living">Home & Living</option>
                            <option value="Fitness & Wellness">Fitness & Wellness</option>
                            <option value="Buying Guides">Buying Guides & Reviews</option>
                            <option value="Store News">Store News & Launches</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">Author Name</label>
                            <input
                              type="text"
                              value={articleFormData.author}
                              onChange={(e) => setArticleFormData({ ...articleFormData, author: e.target.value })}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">Read Time</label>
                            <input
                              type="text"
                              value={articleFormData.readTime}
                              onChange={(e) => setArticleFormData({ ...articleFormData, readTime: e.target.value })}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Cover Image Asset</label>
                          <select
                            value={articleFormData.image}
                            onChange={(e) => setArticleFormData({ ...articleFormData, image: e.target.value })}
                            className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-slate-900 font-medium mb-2"
                          >
                            <option value="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80">Preset: Smartphones & Tech</option>
                            <option value="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80">Preset: Running Footwear</option>
                            <option value="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80">Preset: Home Living Decor</option>
                            <option value="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80">Preset: Festival Deals</option>
                            <option value="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80">Preset: Fashion Showcase</option>
                          </select>

                          <input
                            type="text"
                            placeholder="Or enter custom Image URL..."
                            value={articleFormData.image}
                            onChange={(e) => setArticleFormData({ ...articleFormData, image: e.target.value })}
                            className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 font-mono text-[11px]"
                          />
                        </div>

                        <div className="flex items-center justify-between p-2.5 bg-white rounded-md border border-slate-200">
                          <div>
                            <span className="font-bold text-slate-900 block text-xs">Featured Story</span>
                            <span className="text-[10px] text-slate-500">Pin to Homepage Hero</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={articleFormData.featured}
                            onChange={(e) => setArticleFormData({ ...articleFormData, featured: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                          />
                        </div>

                        {/* Live Card Preview Box */}
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Live Card Preview</span>
                          <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-2xs p-2 space-y-1">
                            <img src={articleFormData.image} alt="Preview" className="w-full h-20 object-cover rounded" />
                            <h5 className="font-bold text-slate-900 text-xs line-clamp-1">
                              {articleFormData.title || 'Article Title Preview'}
                            </h5>
                            <p className="text-slate-500 text-[10px] line-clamp-1">
                              {articleFormData.excerpt || 'Summary preview...'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer (Fixed Bottom) */}
                  <div className="flex-shrink-0 px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3 z-10">
                    <Button type="button" variant="secondary" onClick={() => setIsEditorOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" icon={Sparkles}>
                      {editingArticleId ? 'Save Article Changes' : 'Publish Editorial Article'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

