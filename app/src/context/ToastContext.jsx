import React, { createContext, useContext, useState, useCallback } from 'react';
import { Check, X, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', action = null) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, action }]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* --- TOAST CONTAINER --- */}
      <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
        <div className="flex flex-col gap-4 items-center">
          {toasts.map((toast) => (
            <div 
              key={toast.id}
              className="pointer-events-auto min-w-[300px] max-w-sm bg-white border border-gray-100 shadow-2xl rounded-xl p-4 flex items-center gap-4 animate-in zoom-in-95 fade-in duration-300"
            >
              {/* Icon based on Type */}
              <div className={`p-2 rounded-full shrink-0 ${
                toast.type === 'success' ? 'bg-green-100 text-green-600' :
                toast.type === 'error' ? 'bg-red-100 text-red-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {toast.type === 'success' && <Check size={20} />}
                {toast.type === 'error' && <AlertCircle size={20} />}
                {toast.type === 'info' && <Info size={20} />}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">
                  {toast.type === 'success' ? 'Success' : toast.type === 'error' ? 'Error' : 'Note'}
                </p>
                <p className="text-xs text-gray-500">{toast.message}</p>
                
                {/* Optional Action Link */}
                {toast.action && (
                  <button 
                    onClick={toast.action.onClick}
                    className="mt-2 text-xs font-semibold text-primary hover:underline"
                  >
                    {toast.action.label}
                  </button>
                )}
              </div>

              {/* Close Button */}
              <button 
                onClick={() => removeToast(toast.id)} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};