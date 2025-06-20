import React from "react";

const SuccessAlert = ({ message, onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 text-sm text-green-800 bg-green-100 dark:bg-green-200 dark:text-green-900 shadow-md"
      role="alert"
    >
      <div className="flex items-center">
        <svg
          className="w-5 h-5 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M16.707 5.293a1 1 0 0 0-1.414 0L9 11.586 6.707 9.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0 0-1.414Z" />
        </svg>
        <span>{message}</span>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-green-800 hover:text-green-900 text-xl font-bold"
      >
        ✕
      </button>
    </div>
  );
};

export default SuccessAlert;
