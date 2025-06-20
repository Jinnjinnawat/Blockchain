import React, { useState } from "react";
import { X, Upload, Package, DollarSign, Hash, Image, Tag, Grid3X3 } from "lucide-react";

const AddProductModal = ({ onClose, onProductAdded }) => {
  const [formData, setFormData] = useState({
    product_name: "",
    detail: "",
    price: "",
    stock: "",
    imageUrl: "",
    unit: "กิโลกรัม",
    category: "ผลไม้"
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    { value: "ผลไม้", label: "ผลไม้", icon: "🍎" },
    { value: "ข้าว", label: "ข้าว", icon: "🌾" },
    { value: "ผัก", label: "ผัก", icon: "🥬" },
    { value: "เนื้อสัตว์", label: "เนื้อสัตว์", icon: "🥩" }
  ];

  const units = [
    { value: "กิโลกรัม", label: "กิโลกรัม" },
    { value: "กรัม", label: "กรัม" },
    { value: "ชิ้น", label: "ชิ้น" },
    { value: "ลูก", label: "ลูก" }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.product_name.trim()) {
      newErrors.product_name = "กรุณาใส่ชื่อสินค้า";
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "กรุณาใส่ราคาที่ถูกต้อง";
    }
    
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = "กรุณาใส่จำนวนคงเหลือที่ถูกต้อง";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      createdAt: new Date(),
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        onProductAdded?.(newProduct);
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error("Error adding product:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center transform animate-pulse">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">สำเร็จ!</h3>
          <p className="text-gray-600">เพิ่มสินค้าเรียบร้อยแล้ว</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">เพิ่มสินค้าใหม่</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5 max-h-[calc(90vh-80px)] overflow-y-auto">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4" />
              ชื่อสินค้า
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.product_name ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="ใส่ชื่อสินค้า..."
              value={formData.product_name}
              onChange={(e) => handleInputChange('product_name', e.target.value)}
            />
            {errors.product_name && (
              <p className="text-red-500 text-xs mt-1">{errors.product_name}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Grid3X3 className="w-4 h-4" />
              รายละเอียด
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
              placeholder="อธิบายรายละเอียดสินค้า..."
              value={formData.detail}
              onChange={(e) => handleInputChange('detail', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4" />
                ราคา (ETH)
              </label>
              <input
                type="number"
                step="0.001"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.price ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Hash className="w-4 h-4" />
                จำนวนคงเหลือ
              </label>
              <input
                type="number"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.stock ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="0"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', e.target.value)}
              />
              {errors.stock && (
                <p className="text-red-500 text-xs mt-1">{errors.stock}</p>
              )}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Image className="w-4 h-4" />
              รูปภาพ
            </label>
            <input
              type="url"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                หน่วย
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                value={formData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value)}
              >
                {units.map(unit => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                หมวดหมู่
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  กำลังบันทึก...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  บันทึกสินค้า
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;