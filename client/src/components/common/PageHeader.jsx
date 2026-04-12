import React from "react";

const PageHeader = ({ 
  title, 
  subtitle, 
  highlight, 
  buttonText, 
  buttonIcon: Icon, 
  onButtonClick,
  extraPill // For cases like your "Active Tables" count
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-4xl font-black text-black uppercase tracking-tight">
          {title} <span className="text-orange-600">{highlight}</span>
        </h1>
        {subtitle && (
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Render extra info like "Active Tables" if provided */}
        {extraPill}

        {/* Primary Action Button */}
        {buttonText && (
          <button
            onClick={onButtonClick}
            className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-orange-950/10"
          >
            {Icon && <Icon size={18} strokeWidth={3} />}
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;