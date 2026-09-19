import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export const Select = ({
  value,
  onChange,
  options = [],
  placeholder = "Select an option...",
  icon: LeftIcon,
  className = "",
  size = "md",
  disabled = false,
  fullWidth = false,
  align = "left",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Normalize options array to { value, label } objects
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "object" && opt !== null && "value" in opt) {
      return { value: opt.value, label: opt.label || String(opt.value), icon: opt.icon };
    }
    return { value: opt, label: String(opt) };
  });

  const selectedOption = normalizedOptions.find(
    (opt) => String(opt.value) === String(value)
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    if (disabled) return;
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  const sizes = {
    sm: "px-2.5 py-1 text-xs gap-1.5 min-h-[30px]",
    md: "px-3 py-2 text-xs gap-2 min-h-[36px]",
    lg: "px-3.5 py-2.5 text-sm gap-2 min-h-[42px]",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${widthStyle} ${className}`}
    >
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full inline-flex items-center justify-between bg-white text-slate-800 border border-slate-300 rounded-md font-medium transition-all hover:bg-slate-50 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
          sizes[size] || sizes.md
        }`}
      >
        <div className="inline-flex items-center gap-2 truncate">
          {LeftIcon && <LeftIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
        />
      </button>

      {/* Floating Animated Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } top-full mt-1.5 min-w-[160px] w-full max-w-xs bg-white border border-slate-200 rounded-md shadow-lg py-1 z-50 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100`}
        >
          {normalizedOptions.length === 0 ? (
            <div className="px-3 py-2 text-xs text-slate-400 text-center">
              No options available
            </div>
          ) : (
            normalizedOptions.map((opt) => {
              const isSelected = String(opt.value) === String(value);

              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {opt.icon && <opt.icon className="w-3.5 h-3.5 text-slate-400" />}
                    <span className="truncate">{opt.label}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 ml-2" />}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
