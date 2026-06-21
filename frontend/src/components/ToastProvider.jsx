import { useCallback, useEffect, useRef, useState } from "react";
import { ToastContext } from "./toastContext";

function ToastProvider({ children }) {
  const [message, setMessage] = useState("");
  const timeoutRef = useRef(null);

  const showSuccess = useCallback((nextMessage) => {
    window.clearTimeout(timeoutRef.current);
    setMessage(nextMessage);
    timeoutRef.current = window.setTimeout(() => setMessage(""), 3000);
  }, []);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  return (
    <ToastContext.Provider value={{ showSuccess }}>
      {children}
      {message && (
        <div
          className="fixed right-4 top-4 z-[100] max-w-sm rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-[#2563EB] shadow-lg"
          role="status"
          aria-live="polite"
        >
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
