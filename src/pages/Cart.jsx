import React, { useState } from 'react';
import { FiPlus, FiMinus, FiTrash2, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

// --- Component: สรุปยอดสั่งซื้อ ---
const OrderSummary = ({ subtotal, shippingCost, onCheckout }) => {
  const total = subtotal + shippingCost;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('th-TH', { 
      style: 'currency', 
      currency: 'THB', 
      minimumFractionDigits: 0 
    }).format(amount);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">สรุปยอดสั่งซื้อ</h2>
      <div className="space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>ราคารวมย่อย</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>ค่าจัดส่ง</span>
          <span>{formatCurrency(shippingCost)}</span>
        </div>
        <div className="border-t border-gray-200 my-3"></div>
        <div className="flex justify-between text-xl font-bold text-gray-900">
          <span>ยอดรวมสุทธิ</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
      <button
        onClick={onCheckout}
        className="mt-6 w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 shadow-lg"
      >
        ดำเนินการชำระเงิน
      </button>
    </div>
  );
};

// --- Component: สินค้าแต่ละชิ้นในตะกร้า ---
const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('th-TH', { 
      style: 'currency', 
      currency: 'THB', 
      minimumFractionDigits: 0 
    }).format(amount);

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
      <img
        src={item.imageUrl || 'https://placehold.co/600x400/e2e8f0/333333?text=สินค้า'}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-md"
        onError={(e) => { 
          e.target.onerror = null; 
          e.target.src='https://placehold.co/600x400/e2e8f0/333333?text=รูปเสีย'; 
        }}
      />
      <div className="flex-grow">
        <h3 className="font-bold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.category || 'ทั่วไป'}</p>
        <p className="text-md font-semibold text-green-600 mt-1">{formatCurrency(item.price)}</p>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} 
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50" 
          disabled={item.quantity <= 1}
        >
          <FiMinus className="w-4 h-4 text-gray-600" />
        </button>
        <span className="font-bold w-8 text-center">{item.quantity}</span>
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} 
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <FiPlus className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      <div className="text-lg font-bold w-24 text-right">
        {formatCurrency(item.price * item.quantity)}
      </div>
      <button 
        onClick={() => onRemoveItem(item.id)} 
        className="p-2 rounded-full hover:bg-red-50 text-red-500"
      >
        <FiTrash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

// --- Component หลักของหน้าตะกร้าสินค้า ---
const ShoppingCartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [shippingCost] = useState(50.00);

  const handleUpdateQuantity = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    const subtotal = getCartTotal();
    const total = subtotal + shippingCost;
    
    const orderData = {
      items: cartItems,
      subtotal: subtotal,
      shipping: shippingCost,
      total: total,
      customerInfo: {
        name: 'ลูกค้า',
        address: 'ที่อยู่จัดส่ง'
      },
      timestamp: new Date().toISOString(),
    };

    console.log("SENDING TO BACKEND:", orderData);
    
    // แสดงข้อความยืนยัน
    const confirmed = window.confirm(
      `ยืนยันการสั่งซื้อ\n` +
      `ยอดรวม: ${new Intl.NumberFormat('th-TH', { 
        style: 'currency', 
        currency: 'THB', 
        minimumFractionDigits: 0 
      }).format(total)}\n\n` +
      `กดตกลงเพื่อยืนยันการสั่งซื้อ`
    );

    if (confirmed) {
      // ล้างตะกร้าหลังจากสั่งซื้อเสร็จ
      clearCart();
      alert('ขอบคุณสำหรับการสั่งซื้อ! คำสั่งซื้อของคุณได้รับการยืนยันแล้ว');
      // สามารถ navigate ไปหน้าอื่นได้ เช่น หน้าขอบคุณ
      // navigate('/thank-you');
    }
  };

  const handleBackToShopping = () => {
    navigate('/productlist'); // หรือเส้นทางที่เหมาะสม
  };

  const subtotal = getCartTotal();

  // --- View สำหรับตะกร้าว่าง ---
  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen font-sans">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 text-center p-8">
          <FiShoppingCart className="text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">ตะกร้าของคุณว่างเปล่า</h2>
          <p className="text-gray-500 mb-6">ดูเหมือนว่าคุณยังไม่ได้เพิ่มสินค้าใดๆ ลงในตะกร้า</p>
          <button 
            onClick={handleBackToShopping}
            className="flex items-center bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300"
          >
            <FiArrowLeft className="mr-2" />
            กลับไปเลือกซื้อสินค้า
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            ตะกร้าสินค้าของคุณ
          </h1>
          <button
            onClick={handleBackToShopping}
            className="flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <FiArrowLeft className="mr-2" />
            กลับไปเลือกซื้อสินค้า
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Side: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <p className="text-sm text-gray-600">
                คุณมีสินค้าในตะกร้า {cartItems.length} รายการ
              </p>
            </div>
            
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              shippingCost={shippingCost}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;