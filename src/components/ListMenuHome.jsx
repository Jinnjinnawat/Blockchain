import React, { useState, useEffect } from 'react';
import { ChevronRight, Search, MapPin, Star, Clock, Users } from 'lucide-react';

const ListMenuHome = () => {
  const [activeTab, setActiveTab] = useState('ทั้งหมด');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    { name: 'ทั้งหมด',  count: 6 },
    { name: 'ผลไม้',  count: 1 },
    { name: 'ผัก',  count: 1 },
    { name: 'เนื้อสัตว์',  count: 1 },
    { name: 'ปลาและอาหารทะเล',  count: 1 },
    { name: 'ข้าวสาร',  count: 1 },
    { name: 'ของแห้ง',  count: 0 },
    { name: 'ดอกไม้',  count: 1 },
  ];

  const markets = [
    { 
      name: 'ตลาดผลไม้สด', 
      image: 'https://assets.brandinside.asia/uploads/2023/05/Orange-scaled.jpeg', 
      category: 'ผลไม้', 
      gradient: 'from-orange-400 to-orange-600',
     
      
      description: 'ผลไม้สดใหม่ทุกวัน',
      popular: true
    },
    { 
      name: 'ตลาดผักออร์แกนิค', 
      image: 'https://www.houstonhealth.org/sites/g/files/zsnnfi171/files/styles/coh_x_large/public/2023-10/food-04.jpg?itok=tMoySLSg', 
      category: 'ผัก', 
      gradient: 'from-green-500 to-green-700',
     
    
      description: 'ผักปลอดสารพิษ',
      popular: false
    },
    { 
      name: 'ตลาดเนื้อสดใหม่', 
      image: 'https://s3.eu-west-2.amazonaws.com/cdn.agriland.co.uk/uploads/2023/04/Image-source-Unsplash-Pork-scaled-e1653303066797-2048x1039-1280x720.jpg', 
      category: 'เนื้อสัตว์', 
      gradient: 'from-red-400 to-red-600',
      
      
      description: 'เนื้อคุณภาพเกรดพรีเมียม',
      popular: true
    },
    { 
      name: 'ตลาดซีฟู้ดสด', 
      image: 'https://lh3.googleusercontent.com/proxy/rM-a-9jGgrCBSpNYDlWUGQqJqbsa5KA1oB1uAa5dnAU1OIghvJ8wKGilKcIvLfQczOfoNywI--vdfFksshz_gW5lfTcCHjDKjJMqfhmQL-7MvDmSzKRMmqU8ae-J2fnOKUDs1g', 
      category: 'ปลาและอาหารทะเล', 
      gradient: 'from-blue-500 to-blue-700',
     
      
      description: 'อาหารทะเลสดจากเรือประมง',
      popular: true
    },
    { 
      name: 'ตลาดดอกไม้งาม', 
      image: 'https://media.istockphoto.com/id/1435326449/photo/flowers-at-a-market.jpg?s=612x612&w=0&k=20&c=oIDcSC8TLUA2k8mrSyrrOM8Ss5Eziey0C0JmC3BdR2E=', 
      category: 'ดอกไม้', 
      gradient: 'from-pink-400 to-pink-600',
     
     
      description: 'ดอกไม้สวยทุกโอกาส',
      popular: false
    },
    { 
      name: 'ตลาดข้าวแท้', 
      image: 'https://img.kapook.com/u/2024/Jarosphan/Home/Cleaning/159982/r02.jpg', 
      category: 'ข้าวสาร', 
      gradient: 'from-amber-500 to-amber-700',
      
      
      description: 'ข้าวหอมมะลิแท้ 100%',
      popular: false
    },
  ];

  const filteredMarkets = activeTab === 'ทั้งหมด' 
    ? markets.filter(market => 
        market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        market.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : markets.filter(market => 
        market.category === activeTab &&
        (market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         market.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );

  return (
    <div className="px-4 py-8 bg-gradient-to-br from-gray-50 to-white">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          🏪 ตลาดและร้านค้า
        </h2>
        <p className="text-gray-600 text-lg">
          ค้นหาสินค้าคุณภาพจากตลาดท้องถิ่น
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="ค้นหาตลาดที่ต้องการ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
          />
        </div>
      </div>

      

      {/* Markets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMarkets.map((market, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={market.image} 
                alt={market.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${market.gradient} opacity-80`}></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold text-lg mb-1">{market.name}</h3>
                <p className="text-sm opacity-90">{market.description}</p>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
              </div>
              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium">
                เลือกซื้อ
                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                  hoveredCard === index ? 'translate-x-1' : ''
                }`} />
              </button>
            </div>

            {/* Hover Effect Border */}
            <div className={`absolute inset-0 border-2 border-green-400 rounded-2xl transition-opacity duration-300 ${
              hoveredCard === index ? 'opacity-100' : 'opacity-0'
            }`}></div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMarkets.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            ไม่พบตลาดที่คุณค้นหา
          </h3>
          <p className="text-gray-500">
            ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น
          </p>
        </div>
      )}

      
      
    </div>
  );
};

export default ListMenuHome;