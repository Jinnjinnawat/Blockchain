// src/pages/ProductListPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const ProductListPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock products ที่ตรงกับ category ใน ListMenuHome
  const mockProducts = [
    { id: 1, name: 'มะม่วงน้ำดอกไม้', image: 'https://assets.brandinside.asia/uploads/2023/05/Orange-scaled.jpeg', category: 'ผลไม้', price: 120 },
    { id: 2, name: 'แอปเปิ้ลแดง', image: 'https://assets.brandinside.asia/uploads/2023/05/Orange-scaled.jpeg', category: 'ผลไม้', price: 80 },
    { id: 3, name: 'ส้มโอหวาน', image: 'https://assets.brandinside.asia/uploads/2023/05/Orange-scaled.jpeg', category: 'ผลไม้', price: 60 },
    
    { id: 4, name: 'ผักคะน้าออร์แกนิค', image: 'https://www.houstonhealth.org/sites/g/files/zsnnfi171/files/styles/coh_x_large/public/2023-10/food-04.jpg?itok=tMoySLSg', category: 'ผัก', price: 35 },
    { id: 5, name: 'ผักกาดหอม', image: 'https://www.houstonhealth.org/sites/g/files/zsnnfi171/files/styles/coh_x_large/public/2023-10/food-04.jpg?itok=tMoySLSg', category: 'ผัก', price: 25 },
    { id: 6, name: 'บร็อกโคลี่', image: 'https://www.houstonhealth.org/sites/g/files/zsnnfi171/files/styles/coh_x_large/public/2023-10/food-04.jpg?itok=tMoySLSg', category: 'ผัก', price: 45 },
    
    { id: 7, name: 'เนื้อวัวแองกัส', image: 'https://s3.eu-west-2.amazonaws.com/cdn.agriland.co.uk/uploads/2023/04/Image-source-Unsplash-Pork-scaled-e1653303066797-2048x1039-1280x720.jpg', category: 'เนื้อสัตว์', price: 350 },
    { id: 8, name: 'หมูสามชั้น', image: 'https://s3.eu-west-2.amazonaws.com/cdn.agriland.co.uk/uploads/2023/04/Image-source-Unsplash-Pork-scaled-e1653303066797-2048x1039-1280x720.jpg', category: 'เนื้อสัตว์', price: 180 },
    
    { id: 9, name: 'ปลาทูสด', image: 'https://lh3.googleusercontent.com/proxy/rM-a-9jGgrCBSpNYDlWUGQqJqbsa5KA1oB1uAa5dnAU1OIghvJ8wKGilKcIvLfQczOfoNywI--vdfFksshz_gW5lfTcCHjDKjJMqfhmQL-7MvDmSzKRMmqU8ae-J2fnOKUDs1g', category: 'ปลาและอาหารทะเล', price: 120 },
    { id: 10, name: 'กุ้งแม่น้ำ', image: 'https://lh3.googleusercontent.com/proxy/rM-a-9jGgrCBSpNYDlWUGQqJqbsa5KA1oB1uAa5dnAU1OIghvJ8wKGilKcIvLfQczOfoNywI--vdfFksshz_gW5lfTcCHjDKjJMqfhmQL-7MvDmSzKRMmqU8ae-J2fnOKUDs1g', category: 'ปลาและอาหารทะเล', price: 250 },
    
    { id: 11, name: 'ดอกกุหลาบแดง', image: 'https://media.istockphoto.com/id/1435326449/photo/flowers-at-a-market.jpg?s=612x612&w=0&k=20&c=oIDcSC8TLUA2k8mrSyrrOM8Ss5Eziey0C0JmC3BdR2E=', category: 'ดอกไม้', price: 80 },
    { id: 12, name: 'ช่อลิลลี่', image: 'https://media.istockphoto.com/id/1435326449/photo/flowers-at-a-market.jpg?s=612x612&w=0&k=20&c=oIDcSC8TLUA2k8mrSyrrOM8Ss5Eziey0C0JmC3BdR2E=', category: 'ดอกไม้', price: 150 },
    
    { id: 13, name: 'ข้าวหอมมะลิ', image: 'https://img.kapook.com/u/2024/Jarosphan/Home/Cleaning/159982/r02.jpg', category: 'ข้าวสาร', price: 45 },
    { id: 14, name: 'ข้าวกล้องออร์แกนิค', image: 'https://img.kapook.com/u/2024/Jarosphan/Home/Cleaning/159982/r02.jpg', category: 'ข้าวสาร', price: 55 },
  ];

  useEffect(() => {
    // จำลองการโหลดข้อมูล
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  // กรองสินค้าตาม category
  const filteredProducts = category === 'ทั้งหมด' 
    ? products 
    : products.filter((item) => item.category === decodeURIComponent(category));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดสินค้า...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>กลับหน้าแรก</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            🛒 หมวดหมู่: {decodeURIComponent(category)}
          </h1>
          <p className="text-gray-600">
            พบสินค้าทั้งหมด {filteredProducts.length} รายการ
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    ฿{product.price}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    หมวด: {product.category}
                  </p>
                  
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium">
                    <ShoppingCart className="w-4 h-4" />
                    เพิ่มลงตะกร้า
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="text-6xl mb-4">😢</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                ไม่พบสินค้าในหมวดหมู่นี้
              </h3>
              <p className="text-gray-500 mb-6">
                ขณะนี้ยังไม่มีสินค้าในหมวดหมู่ "{decodeURIComponent(category)}"
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                กลับหน้าแรก
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;