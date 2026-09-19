import React from "react";
import { Loader2 } from "lucide-react";

export const Button = React.forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className = "",
      disabled = false,
      isLoading = false,
      icon: Icon,
      iconPosition = "left",
      fullWidth = false,
      type = "button",
      onClick,
      ...props
    },
    ref
  ) => {
    // Base classes for crisp typography, minor radius, focus states, and transitions
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100";

    // Variants definition (Light Mode aligned, consistent colors)
    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600 shadow-sm",
      secondary:
        "bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 shadow-sm",
      outline:
        "bg-transparent text-blue-600 hover:bg-blue-50 border border-blue-600",
      ghost:
        "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-transparent",
      danger:
        "bg-rose-600 text-white hover:bg-rose-700 border border-rose-600 shadow-sm",
      success:
        "bg-emerald-600 text-white hover:bg-emerald-700 border border-emerald-600 shadow-sm",
    };

    // Sizes definition
    const sizes = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2 text-sm gap-2",
      lg: "px-5 py-2.5 text-base gap-2.5",
    };

    const widthStyle = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${widthStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
        ) : (
          Icon &&
          iconPosition === "left" && (
            <Icon className="w-4 h-4 flex-shrink-0" />
          )
        )}
        {children && <span>{children}</span>}
        {!isLoading && Icon && iconPosition === "right" && (
          <Icon className="w-4 h-4 flex-shrink-0" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
