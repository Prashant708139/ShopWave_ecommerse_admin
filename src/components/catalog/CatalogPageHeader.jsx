import React from "react";
import { ArrowLeft } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/Button";

export const CatalogPageHeader = ({ title, description, action }) => {
  const { navigateTo } = useApp();

  return (
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
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
};
