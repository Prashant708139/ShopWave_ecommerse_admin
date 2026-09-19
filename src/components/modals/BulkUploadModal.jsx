import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-md max-w-lg w-full shadow-lg border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Bulk Upload Products</h3>
              <p className="text-xs text-slate-500">Import products in JSON or structured format</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="border border-dashed border-slate-300 rounded-md p-4 text-center bg-slate-50">
            <FileText className="w-7 h-7 text-blue-600 mx-auto mb-2 opacity-80" />
            <p className="text-xs font-semibold text-slate-800">Paste JSON payload or use pre-filled sample</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Click "Load Demo Batch" or type your custom array</p>
            <button
              type="button"
              onClick={() => setJsonText(sampleTemplate)}
              className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 underline cursor-pointer"
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
              className="w-full font-mono text-xs p-3 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900 bg-white"
            />
          </div>

          {uploadStatus?.error && (
            <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-700 rounded-md text-xs border border-rose-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{uploadStatus.error}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 p-4 bg-slate-50 border-t border-slate-200">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" icon={CheckCircle2} onClick={handleImport}>
            Import Products
          </Button>
        </div>
      </div>
    </div>
  );
};
