import React, { useState, useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Quote,
  Code,
  Undo,
  Redo,
  Sparkles,
  Code2,
  Check,
  X,
  Upload,
  Info,
  Type
} from 'lucide-react';
import { STOCK_ASSET_LIBRARY } from './ImageAssetPicker';

export const RichTextEditor = ({
  value = '',
  onChange,
  placeholder = 'Write detailed content here...',
  minHeight = '240px'
}) => {
  const editorRef = useRef(null);
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [htmlContent, setHtmlContent] = useState(value);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);

  // Link Modal State
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  // Image Modal State
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [selectedStockAsset, setSelectedStockAsset] = useState('');

  // Table Modal State
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [hasHeader, setHasHeader] = useState(true);

  // Sync external value to local state
  useEffect(() => {
    if (value !== htmlContent) {
      setHtmlContent(value);
      if (editorRef.current && editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
      }
    }
  }, [value]);

  const handleExecuteCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      const updated = editorRef.current.innerHTML;
      setHtmlContent(updated);
      onChange?.(updated);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const updated = editorRef.current.innerHTML;
      setHtmlContent(updated);
      onChange?.(updated);
    }
  };

  const handleSourceChange = (e) => {
    const val = e.target.value;
    setHtmlContent(val);
    onChange?.(val);
    if (editorRef.current) {
      editorRef.current.innerHTML = val;
    }
  };

  // Insert HTML snippet directly into editor at cursor
  const insertHtmlSnippet = (htmlSnippet) => {
    if (isSourceMode) {
      const updated = htmlContent + htmlSnippet;
      setHtmlContent(updated);
      onChange?.(updated);
      return;
    }

    if (editorRef.current) {
      editorRef.current.focus();
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const el = document.createElement('div');
        el.innerHTML = htmlSnippet;
        let frag = document.createDocumentFragment(), node, lastNode;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);
        if (lastNode) {
          range.setStartAfter(lastNode);
          range.setEndAfter(lastNode);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else {
        editorRef.current.innerHTML += htmlSnippet;
      }
      const updated = editorRef.current.innerHTML;
      setHtmlContent(updated);
      onChange?.(updated);
    }
  };

  // Insert Table
  const handleInsertTable = () => {
    let tableHtml = `<table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; text-align: left; border: 1px solid #e2e8f0;">`;

    if (hasHeader) {
      tableHtml += `<thead style="background-color: #f8fafc; color: #0f172a; font-weight: 700;"><tr>`;
      for (let c = 1; c <= tableCols; c++) {
        tableHtml += `<th style="border: 1px solid #cbd5e1; padding: 10px 12px;">Header ${c}</th>`;
      }
      tableHtml += `</tr></thead>`;
    }

    tableHtml += `<tbody>`;
    for (let r = 1; r <= tableRows; r++) {
      tableHtml += `<tr>`;
      for (let c = 1; c <= tableCols; c++) {
        tableHtml += `<td style="border: 1px solid #e2e8f0; padding: 8px 12px; color: #334155;">Row ${r} Col ${c}</td>`;
      }
      tableHtml += `</tr>`;
    }
    tableHtml += `</tbody></table><p><br></p>`;

    insertHtmlSnippet(tableHtml);
    setShowTableModal(false);
  };

  // Insert Image
  const handleInsertImage = () => {
    const finalUrl = selectedStockAsset || customImageUrl;
    if (!finalUrl.trim()) return;

    const imgHtml = `<figure style="margin: 16px 0; text-align: center;"><img src="${finalUrl.trim()}" alt="Product Image" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: inline-block;" /><figcaption style="font-size: 11px; color: #64748b; margin-top: 6px; font-style: italic;">Product Detail High-Resolution Asset</figcaption></figure><p><br></p>`;

    insertHtmlSnippet(imgHtml);
    setCustomImageUrl('');
    setSelectedStockAsset('');
    setShowImageModal(false);
  };

  // Insert Link
  const handleInsertLink = () => {
    if (!linkUrl.trim()) return;
    const label = linkText.trim() || linkUrl.trim();
    const linkHtml = `<a href="${linkUrl.trim()}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; font-weight: 600;">${label}</a>`;
    insertHtmlSnippet(linkHtml);
    setLinkUrl('');
    setLinkText('');
    setShowLinkModal(false);
  };

  // Insert Callout Box
  const handleInsertCallout = () => {
    const calloutHtml = `<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; border-radius: 6px; padding: 14px 16px; margin: 16px 0; color: #1e3a8a; font-size: 13px;"><strong>Pro Tip / Key Highlight:</strong> Enter key product certification, warranty info, or customer advice here.</div><p><br></p>`;
    insertHtmlSnippet(calloutHtml);
  };

  // File Upload In Editor
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-md border border-slate-300 overflow-hidden shadow-xs space-y-0">
      {/* Rich Formatting Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex items-center gap-1 flex-wrap text-slate-700 select-none">
        {/* Undo / Redo */}
        <div className="flex items-center border-r border-slate-300 pr-1 mr-1 gap-0.5">
          <button
            type="button"
            onClick={() => handleExecuteCommand('undo')}
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleExecuteCommand('redo')}
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Text Formatting */}
        <div className="flex items-center border-r border-slate-300 pr-1 mr-1 gap-0.5">
          <button
            type="button"
            onClick={() => handleExecuteCommand('bold')}
            className="p-1.5 hover:bg-slate-200 rounded text-slate-700 font-bold transition-colors"
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleExecuteCommand('italic')}
            className="p-1.5 hover:bg-slate-200 rounded text-slate-700 italic transition-colors"
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleExecuteCommand('underline')}
            className="p-1.5 hover:bg-slate-200 rounded text-slate-700 underline transition-colors"
            title="Underline (Ctrl+U)"
          >
            <Underline className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleExecuteCommand('strikeThrough')}
            className="p-1.5 hover:bg-slate-200 rounded text-slate-700 line-through transition-colors"
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </button>
        </div>

        {/* Headings */}
        <div className="flex items-center border-r border-slate-300 pr-1 mr-1 gap-0.5">
          <button
            type="button"
            onClick={() => handleExecuteCommand('formatBlock', '<h1>')}
            className="p-1.5 hover:bg-slate-200 rounded font-bold text-xs px-2 text-slate-800 transition-colors"
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => handleExecuteCommand('formatBlock', '<h2>')}
            className="p-1.5 hover:bg-slate-200 rounded font-bold text-xs px-2 text-slate-800 transition-colors"
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => handleExecuteCommand('formatBlock', '<h3>')}
            className="p-1.5 hover:bg-slate-200 rounded font-bold text-xs px-2 text-slate-800 transition-colors"
            title="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => handleExecuteCommand('formatBlock', '<p>')}
            className="p-1.5 hover:bg-slate-200 rounded font-semibold text-xs px-2 text-slate-600 transition-colors"
            title="Paragraph"
          >
            P
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center border-r border-slate-300 pr-1 mr-1 gap-0.5">
          <button
            type="button"
            onClick={() => handleExecuteCommand('justifyLeft')}
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleExecuteCommand('justifyCenter')}
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleExecuteCommand('justifyRight')}
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center border-r border-slate-300 pr-1 mr-1 gap-0.5">
          <button
            type="button"
            onClick={() => handleExecuteCommand('insertUnorderedList')}
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleExecuteCommand('insertOrderedList')}
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleExecuteCommand('formatBlock', '<blockquote>')}
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </button>
        </div>

        {/* Rich Insertions: Images & Tables */}
        <div className="flex items-center border-r border-slate-300 pr-1 mr-1 gap-1">
          <button
            type="button"
            onClick={() => setShowImageModal(true)}
            className="flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded border border-emerald-200 transition-colors"
            title="Insert Image"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Image</span>
          </button>

          <button
            type="button"
            onClick={() => setShowTableModal(true)}
            className="flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
            title="Insert Table"
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table</span>
          </button>

          <button
            type="button"
            onClick={() => setShowLinkModal(true)}
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleInsertCallout}
            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
            title="Insert Callout Highlight"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
          </button>
        </div>

        {/* Source Mode Toggle */}
        <button
          type="button"
          onClick={() => setIsSourceMode(!isSourceMode)}
          className={`px-2 py-1 text-xs font-bold rounded flex items-center gap-1 transition-colors ${
            isSourceMode
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
          title="Toggle HTML Source Mode"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>{isSourceMode ? 'WYSIWYG Mode' : 'HTML Source'}</span>
        </button>
      </div>

      {/* Editor Body */}
      {isSourceMode ? (
        <textarea
          rows={10}
          value={htmlContent}
          onChange={handleSourceChange}
          style={{ minHeight }}
          className="w-full font-mono text-xs p-4 bg-slate-900 text-emerald-400 focus:outline-none leading-relaxed"
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          style={{ minHeight }}
          placeholder={placeholder}
          className="p-4 text-xs text-slate-800 focus:outline-none overflow-y-auto leading-relaxed prose max-w-none [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-slate-300 [&_td]:p-2 [&_th]:border [&_th]:border-slate-300 [&_th]:p-2 [&_th]:bg-slate-100 [&_h1]:text-lg [&_h1]:font-bold [&_h2]:text-base [&_h2]:font-bold [&_h3]:text-sm [&_h3]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:my-2"
        />
      )}

      {/* Table Insertion Dialog */}
      {showTableModal && (
        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <TableIcon className="w-4 h-4 text-blue-600" /> Insert Custom Data Table
            </h4>
            <button
              type="button"
              onClick={() => setShowTableModal(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Rows Count</label>
              <input
                type="number"
                min="1"
                max="20"
                value={tableRows}
                onChange={(e) => setTableRows(Number(e.target.value) || 1)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Columns Count</label>
              <input
                type="number"
                min="1"
                max="10"
                value={tableCols}
                onChange={(e) => setTableCols(Number(e.target.value) || 1)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 text-xs text-slate-800 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasHeader}
                  onChange={(e) => setHasHeader(e.target.checked)}
                  className="rounded text-blue-600"
                />
                Include Header Row
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowTableModal(false)}
              className="px-3 py-1 text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleInsertTable}
              className="px-3 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Insert Table
            </button>
          </div>
        </div>
      )}

      {/* Image Insertion Dialog */}
      {showImageModal && (
        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-emerald-600" /> Insert Image Into Content
            </h4>
            <button
              type="button"
              onClick={() => setShowImageModal(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* Computer Upload */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Upload Local Computer Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full text-xs text-slate-600 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Custom URL */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                or Paste Direct Image URL
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={customImageUrl}
                onChange={(e) => {
                  setCustomImageUrl(e.target.value);
                  setSelectedStockAsset('');
                }}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:border-blue-600 text-slate-900"
              />
            </div>

            {/* Quick Stock Photo Picker */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                or Pick Suggested Stock Asset
              </label>
              <div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto p-1 bg-white border border-slate-200 rounded">
                {STOCK_ASSET_LIBRARY.slice(0, 12).map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => {
                      setSelectedStockAsset(asset.url);
                      setCustomImageUrl(asset.url);
                    }}
                    className={`h-12 rounded overflow-hidden border cursor-pointer ${
                      selectedStockAsset === asset.url ? 'border-2 border-emerald-600 ring-2 ring-emerald-100' : 'border-slate-200'
                    }`}
                  >
                    <img src={asset.url} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowImageModal(false)}
              className="px-3 py-1 text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleInsertImage}
              className="px-3 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded"
            >
              Insert Image HTML
            </button>
          </div>
        </div>
      )}

      {/* Link Insertion Dialog */}
      {showLinkModal && (
        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3 animate-in fade-in duration-150 text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <LinkIcon className="w-4 h-4 text-blue-600" /> Insert Hyperlink
            </h4>
            <button
              type="button"
              onClick={() => setShowLinkModal(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Display Text</label>
              <input
                type="text"
                placeholder="e.g. View Warranty Guidelines"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target URL</label>
              <input
                type="url"
                placeholder="https://..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowLinkModal(false)}
              className="px-3 py-1 text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleInsertLink}
              className="px-3 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Insert Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
