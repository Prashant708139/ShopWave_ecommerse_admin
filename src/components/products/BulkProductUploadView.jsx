import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Download,
  FileText,
  Layers,
  Database,
  Trash2,
  Sparkles,
  Info
} from 'lucide-react';

export const BulkProductUploadView = () => {
  const { addProduct, navigateTo, showToast } = useApp();

  const sampleJsonTemplate = `[
  {
    "name": "Sony PlayStation 5 Slim Console 1TB",
    "subtitle": "Digital & Disc Edition PS5 Console",
    "sku": "SNY-PS5-SLIM",
    "category": "Electronics",
    "brand": "Sony",
    "price": 54990,
    "originalPrice": 59990,
    "costPrice": 44000,
    "stock": 25,
    "description": "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback.",
    "image": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&q=80",
    "specs": {
      "Storage": "1TB Custom NVMe SSD",
      "Resolution": "4K 120Hz / 8K Output",
      "Audio": "Tempest 3D AudioTech"
    }
  },
  {
    "name": "Adidas Ultraboost Light Running Shoes",
    "subtitle": "Lightweight High Energy Return Sneakers",
    "sku": "ADI-UB-LIGHT",
    "category": "Footwear",
    "brand": "Adidas",
    "price": 14999,
    "originalPrice": 18999,
    "costPrice": 9500,
    "stock": 40,
    "description": "Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever with Light BOOST material.",
    "image": "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&q=80",
    "specs": {
      "Upper": "Primeknit+ Textile",
      "Midsole": "Light BOOST",
      "Outsole": "Continental Better Rubber"
    }
  }
]`;

  const [jsonText, setJsonText] = useState('');
  const [parsedPreview, setParsedPreview] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [importSuccessCount, setImportSuccessCount] = useState(null);

  const handleParseAndValidate = (rawText) => {
    setJsonText(rawText);
    setValidationErrors([]);
    setImportSuccessCount(null);

    if (!rawText.trim()) {
      setParsedPreview([]);
      return;
    }

    try {
      const parsed = JSON.parse(rawText);
      if (!Array.isArray(parsed)) {
        setValidationErrors(['Input data must be a valid JSON array of product objects (e.g. [{...}, {...}]).']);
        setParsedPreview([]);
        return;
      }

      const errors = [];
      parsed.forEach((item, idx) => {
        if (!item.name) errors.push(`Row #${idx + 1}: Missing required "name" field.`);
        if (!item.price || isNaN(Number(item.price))) errors.push(`Row #${idx + 1}: Missing or invalid "price" numeric field.`);
        if (!item.category) errors.push(`Row #${idx + 1}: Missing "category" field.`);
      });

      setValidationErrors(errors);
      setParsedPreview(parsed);
    } catch (err) {
      setValidationErrors([`JSON Syntax Error: ${err.message}`]);
      setParsedPreview([]);
    }
  };

  const handleLoadDemoData = () => {
    handleParseAndValidate(sampleJsonTemplate);
    showToast('Loaded 2 sample products into bulk editor!');
  };

  const handleExecuteImport = () => {
    if (parsedPreview.length === 0) {
      showToast('Please provide valid JSON product data before importing.', 'error');
      return;
    }

    if (validationErrors.length > 0) {
      showToast('Please resolve validation errors before executing import.', 'error');
      return;
    }

    let count = 0;
    parsedPreview.forEach((item) => {
      addProduct({
        name: item.name,
        subtitle: item.subtitle || `${item.brand || 'Store'} Series`,
        sku: item.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        category: item.category || 'Mobiles',
        brand: item.brand || 'Generic',
        price: Number(item.price),
        originalPrice: item.originalPrice ? Number(item.originalPrice) : Math.round(Number(item.price) * 1.2),
        costPrice: item.costPrice ? Number(item.costPrice) : Math.round(Number(item.price) * 0.7),
        stock: item.stock !== undefined ? Number(item.stock) : 20,
        status: (item.stock !== undefined ? Number(item.stock) : 20) > 0 ? 'In Stock' : 'Out of Stock',
        description: item.description || 'Imported catalog item.',
        image: item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
        images: item.image ? [item.image] : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'],
        specs: item.specs || {}
      });
      count++;
    });

    setImportSuccessCount(count);
    showToast(`Bulk Import Complete: ${count} products imported successfully!`);
  };

  const handleDownloadTemplate = () => {
    const blob = new Blob([sampleJsonTemplate], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ShopWave_Bulk_Import_Template.json';
    a.click();
    showToast('Sample JSON template downloaded!');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo('dashboard')}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
              <span>Catalog</span>
              <span>/</span>
              <span className="font-semibold text-slate-800">Bulk Product Import Master</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-blue-600" /> Catalog Bulk Import & Batch Sync Page
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="md"
            icon={Download}
            onClick={handleDownloadTemplate}
          >
            Download JSON Template
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={CheckCircle2}
            onClick={handleExecuteImport}
            disabled={parsedPreview.length === 0 || validationErrors.length > 0}
          >
            Execute Bulk Import ({parsedPreview.length})
          </Button>
        </div>
      </div>

      {/* Main Grid Layout: Left Payload Input (5 cols) | Right Live Validation & Preview Table (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Payload Input */}
        <div className="lg:col-span-5 bg-white rounded-md border border-slate-200 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" /> JSON / Array Payload Input
            </h3>
            <button
              type="button"
              onClick={handleLoadDemoData}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" /> Load Sample Data
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-md p-3 text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-slate-800">Batch Processing Instructions:</p>
            <p className="text-[11px] text-slate-500">
              Paste structured JSON array of products. Required fields for each item are <code className="text-blue-600 font-bold">name</code>, <code className="text-blue-600 font-bold">price</code>, and <code className="text-blue-600 font-bold">category</code>.
            </p>
          </div>

          <div>
            <textarea
              rows="16"
              value={jsonText}
              onChange={(e) => handleParseAndValidate(e.target.value)}
              placeholder={sampleJsonTemplate}
              className="w-full font-mono text-xs p-3.5 bg-slate-900 text-slate-100 rounded-md border border-slate-700 focus:outline-none focus:border-blue-500 leading-relaxed shadow-inner"
            />
          </div>

          {validationErrors.length > 0 && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-md space-y-1.5 text-xs text-rose-800">
              <div className="flex items-center gap-2 font-bold text-rose-900">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Found {validationErrors.length} validation issue(s):</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[11px]">
                {validationErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {importSuccessCount !== null && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Import Succeeded!</span>
              </div>
              <p className="text-[11px]">
                Successfully created {importSuccessCount} new product listings in your store database.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigateTo('dashboard')}
              >
                View Catalog Table
              </Button>
            </div>
          )}
        </div>

        {/* Right Side: Data Inspection Table */}
        <div className="lg:col-span-7 bg-white rounded-md border border-slate-200 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600" /> Parsed Products Validation Table
              </h3>
              <p className="text-xs text-slate-500">Live preview of records ready for batch ingestion</p>
            </div>
            <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-md border border-blue-200">
              {parsedPreview.length} Ready
            </span>
          </div>

          {parsedPreview.length === 0 ? (
            <div className="py-20 text-center space-y-3 bg-slate-50 rounded-md border border-dashed border-slate-200">
              <FileSpreadsheet className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-700">No Product Objects Loaded</p>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                Paste your JSON array or click "Load Sample Data" to preview field mapping and validate stock before importing.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLoadDemoData}
              >
                Load Demo Products
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 rounded-md">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Product Name</th>
                    <th className="py-2.5 px-3">SKU</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Price</th>
                    <th className="py-2.5 px-3">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {parsedPreview.map((prod, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-400">{idx + 1}</td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={prod.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80'}
                            alt=""
                            className="w-7 h-7 rounded object-cover border border-slate-200"
                          />
                          <span className="font-bold text-slate-900">{prod.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">{prod.sku || 'AUTO'}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-600">{prod.category}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">₹ {(Number(prod.price) || 0).toLocaleString('en-IN')}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-700">{prod.stock !== undefined ? prod.stock : 20}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
