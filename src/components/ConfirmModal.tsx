import React from "react";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, title, message, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 shadow-lg relative">
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
        <p className="mb-6 text-sm">{message}</p>
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={onCancel}>Cancel</button>
          <button className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
