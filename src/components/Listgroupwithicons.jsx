import React from "react";
import { HiPencil, HiTrash } from "react-icons/hi";

export default function ListGroupWithIcons({ onClose, onEdit, onDeleteClick, product }) {
  return (
    <div className="absolute top-30 right-10  z-60 w-48 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl dark:bg-gray-800/95 dark:border-gray-700/50 animate-in fade-in-0 zoom-in-95 duration-200">
      {/* Header with subtle gradient */}
      <div className="px-1 py-1">
        <ul className="space-y-1">
          <li>
            <button
              className="group w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => {
                onEdit();
                onClose();
              }}
            >
              <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors duration-200">
                <HiPencil className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                แก้ไขข้อมูล
              </span>
            </button>
          </li>
          
          <li>
            <button
              className="group w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-red-800/20 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => {
                onDeleteClick();
                onClose();
              }}
            >
              <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-800/50 transition-colors duration-200">
                <HiTrash className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                ลบข้อมูล
              </span>
            </button>
          </li>
        </ul>
      </div>
      
      {/* Subtle bottom border for visual completion */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-600"></div>
    </div>
  );
}

