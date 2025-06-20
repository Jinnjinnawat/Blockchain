import React, { useState } from "react";
import { X, Save, Package, DollarSign, Hash, Image, Tag, Grid3X3, Edit3 } from "lucide-react";

const EditProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    product_name: product.product_name || "",
    detail: product.detail || "",
    price: product.price || "",
    stock: product.stock || "",
    imageUrl: product.imageUrl || "",
    unit: product.unit || "กิโลกรัม",
    category: product.category || "ผลไม้"
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
    { value: "ลูก", label: "ลูก" },
    { value: "ถุง", label: "ถุง" },
    { value: "ต้น", label: "ต้น" },
    { value: "กำ", label: "กำ" }
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

    const updatedProduct = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      updatedAt: new Date(),
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        onSave({ ...product, ...updatedProduct });
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error("Error updating product:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตสินค้า");
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center transform animate-pulse">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">อัปเดตสำเร็จ!</h3>
          <p className="text-gray-600">แก้ไขสินค้าเรียบร้อยแล้ว</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Edit3 className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">แก้ไขสินค้า</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5 max-h-[calc(90vh-80px)] overflow-y-auto">
          {/* Product Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4" />
              ชื่อสินค้า
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
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

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Grid3X3 className="w-4 h-4" />
              รายละเอียด
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="อธิบายรายละเอียดสินค้า..."
              value={formData.detail}
              onChange={(e) => handleInputChange('detail', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4" />
                ราคา (ETH)
              </label>
              <input
                type="number"
                step="0.001"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
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

            {/* Stock */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Hash className="w-4 h-4" />
                จำนวนคงเหลือ
              </label>
              <input
                type="number"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
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

          {/* Image URL */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Image className="w-4 h-4" />
              รูปภาพ
            </label>
            <input
              type="url"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
            />
            {formData.imageUrl && (
              <div className="mt-3">
                <img 
                  src={formData.imageUrl} 
                  alt="Preview" 
                  className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                หน่วย
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                หมวดหมู่
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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

          {/* Product Info Summary */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">ข้อมูลสินค้าปัจจุบัน</span>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <div>ID: {product.id || 'N/A'}</div>
              <div>สร้างเมื่อ: {product.createdAt ? new Date(product.createdAt.seconds * 1000).toLocaleDateString('th-TH') : 'N/A'}</div>
            </div>
          </div>

          {/* Buttons */}
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  กำลังอัปเดต...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  บันทึกการแก้ไข
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;