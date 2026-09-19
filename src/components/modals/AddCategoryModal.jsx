import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { X, FolderPlus } from 'lucide-react';

export const AddCategoryModal = ({ isOpen, onClose }) => {
  const { addCategoryItem } = useApp();
  const [name, setName] = useState('');
  const [parent, setParent] = useState('cat-all');

  const parentOptions = [
    { value: 'cat-all', label: 'Root (All Categories)' },
    { value: 'cat-electronics', label: 'Electronics' },
    { value: 'cat-fashion', label: 'Fashion' },
    { value: 'cat-home', label: 'Home & Living' },
  ];

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addCategoryItem(parent, name.trim());
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-md max-w-md w-full shadow-lg border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Add New Category</h3>
              <p className="text-xs text-slate-500">Expand store classification</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Category Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Smart Watches, Wearables"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Parent Hierarchy</label>
            <Select
              value={parent}
              onChange={(e) => setParent(e.target.value)}
              options={parentOptions}
              size="md"
              fullWidth
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
