import React from "react";
import ReactDOM from "react-dom";

const ModalSelectEvent = ({ title, children, onClose, onConfirm }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="bg-brown text-white px-4 py-2 rounded-md"
          >
            Yakin
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalSelectEvent;
