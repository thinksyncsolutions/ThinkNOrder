import React from "react";
import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";

const ConfirmModal = ({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
  variant = "warning",
}) => {
  if (!open) return null;

  const variantStyles = {
    warning: {
      confirmBtn: "bg-orange-600 hover:bg-orange-500 shadow-orange-600/20",
      iconContainer: "bg-orange-500/10 text-orange-500",
      icon: <AlertCircle size={40} />,
      border: "border-orange-500/30"
    },
    danger: {
      confirmBtn: "bg-red-600 hover:bg-red-500 shadow-red-600/20",
      iconContainer: "bg-red-500/10 text-red-500",
      icon: <AlertTriangle size={40} />,
      border: "border-red-500/30"
    },
    success: {
      confirmBtn: "bg-green-600 hover:bg-green-500 shadow-green-600/20",
      iconContainer: "bg-green-500/10 text-green-500",
      icon: <CheckCircle size={40} />,
      border: "border-green-500/30"
    },
  };

  const current = variantStyles[variant] || variantStyles.warning;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop: Fixed opacity for consistency */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onCancel}
      />

      {/* Modal Card */}
      <div className={`relative w-full max-w-sm rounded-3xl border ${current.border} bg-orange-950 p-8 shadow-2xl animate-in zoom-in-95 duration-200`}>
        <div className="flex flex-col items-center text-center">
          <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${current.iconContainer}`}>
            {current.icon}
          </div>

          <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-white leading-tight">
            {title}
          </h3>

          <p className="mb-8 text-sm font-medium text-orange-200/60">
            {message}
          </p>

          <div className="flex w-full flex-col gap-3">
            <button
              onClick={onConfirm}
              disabled={loading}
              className={`w-full rounded-xl py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${current.confirmBtn}`}
            >
              {loading ? "Processing..." : confirmText}
            </button>

            <button
              onClick={onCancel}
              className="w-full rounded-xl bg-orange-900/40 py-4 text-sm font-bold uppercase tracking-widest text-orange-200 transition-all hover:bg-orange-900 active:scale-95"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;