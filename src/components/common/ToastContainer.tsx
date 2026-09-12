import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div 
      id="toast-container"
      className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#1C1B1A] text-[#FAF8F5] p-4 shadow-xl border border-[#3E3A37] flex items-start space-x-3 animate-slide-left"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-[#DFCFBE] shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-[#93C5FD] shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-[#F87171] shrink-0 mt-0.5" />
          )}

          <div className="flex-1">
            <h5 className="font-serif text-sm font-medium tracking-wide text-[#FAF8F5]">
              {toast.title}
            </h5>
            <p className="text-xs text-[#B8AEA4] mt-0.5 leading-relaxed">
              {toast.message}
            </p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#8E8279] hover:text-[#FAF8F5] p-1 -mr-1"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
