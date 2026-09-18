import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export const BulkUploadModal = ({ isOpen, onClose }) => {
  const { addProduct, showToast } = useApp();
  const [jsonText, setJsonText] = useState('');
  const [uploadStatus, setUploadStatus] = useState(null);

  if (!isOpen) return null;

  const sampleTemplate = `[
  {
    "name": "Sony PlayStation 5 Slim",
    "subtitle": "Sony PS5 Console 1TB",
    "sku": "SNY-PS5-SLIM",
    "category": "Electronics",
    "brand": "Sony",
    "price": 54990,
    "originalPrice": 59990,
    "stock": 15,
    "description": "PlayStation 5 console unleashes new gaming possibilities that you never anticipated.",
    "image": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&q=80"
  },
  {
    "name": "Adidas Ultraboost Light",
    "subtitle": "Adidas Running Shoes",
    "sku": "ADI-UB-LIGHT",
    "category": "Footwear",
    "brand": "Adidas",
    "price": 14999,
    "originalPrice": 18999,
    "stock": 28,
    "description": "Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever.",
    "image": "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=300&q=80"
  }
]`;

  const handleImport = () => {
    try {
      const dataToImport = jsonText.trim() ? JSON.parse(jsonText) : JSON.parse(sampleTemplate);
      if (!Array.isArray(dataToImport)) {
        throw new Error('Import data must be a JSON array of product objects.');
      }

      let count = 0;
      dataToImport.forEach(item => {
        if (item.name && item.price) {
          addProduct(item);
          count++;
        }
      });

      showToast(`Successfully imported ${count} products!`);
      onClose();
    } catch (err) {
      setUploadStatus({ error: err.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Bulk Upload Products</h3>
              <p className="text-xs text-slate-400">Import products in JSON or structured format</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-blue-400 transition-colors bg-slate-50/50">
            <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2 opacity-80" />
            <p className="text-xs font-semibold text-slate-700">Paste JSON payload or use pre-filled sample</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Click "Load Demo Batch" or type your custom array</p>
            <button
              type="button"
              onClick={() => setJsonText(sampleTemplate)}
              className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
            >
              Load 2 Demo Products into Box
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">JSON Array</label>
            <textarea
              rows="7"
              value={jsonText}
              onChange={(e) => {
                setJsonText(e.target.value);
                setUploadStatus(null);
              }}
              placeholder={sampleTemplate}
              className="w-full font-mono text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50"
            />
          </div>

          {uploadStatus?.error && (
            <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-700 rounded-xl text-xs border border-rose-100">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{uploadStatus.error}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-4 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> Import Products
          </button>
        </div>
      </div>
    </div>
  );
};
