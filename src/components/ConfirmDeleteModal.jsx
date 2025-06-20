import React from "react";
import { deleteProducts } from "../services/firestoreService";

export default function ConfirmDeleteModal({ visible, onClose, productId, onDeleted }) {
  if (!visible) return null;

  const handleDelete = async () => {
    try {
      await deleteProducts(productId); // ลบสินค้าโดยตรง
      if (onDeleted) {
        onDeleted(productId); // callback เพื่อให้ parent อัปเดตข้อมูล (ถ้ามี)
      }
      onClose(); // ปิด modal
    } catch (error) {
      console.error("ลบสินค้าไม่สำเร็จ:", error);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">ยืนยันการลบ</h2>
        <p className="text-gray-600 mb-6">คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            ลบ
          </button>
        </div>
      </div>
    </div>
  );
}
