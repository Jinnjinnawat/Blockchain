import React, { useState, useEffect } from 'react';
import { ChevronRight, Search, MapPin, Star, Clock, Users } from 'lucide-react';

const ListMenuHome = () => {
  const [activeTab, setActiveTab] = useState('ทั้งหมด');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    { name: 'ทั้งหมด', icon: '🏪', count: 6 },
    { name: 'ผลไม้', icon: '🍎', count: 1 },
    { name: 'ผัก', icon: '🥬', count: 1 },
    { name: 'เนื้อสัตว์', icon: '🥩', count: 1 },
    { name: 'ปลาและอาหารทะเล', icon: '🐟', count: 1 },
    { name: 'ข้าวสาร', icon: '🌾', count: 1 },
    { name: 'ของแห้ง', icon: '🥜', count: 0 },
    { name: 'ดอกไม้', icon: '🌸', count: 1 },
  ];

  const markets = [
    { 
      name: 'ตลาดผลไม้สด', 
      image: 'https://assets.brandinside.asia/uploads/2023/05/Orange-scaled.jpeg', 
      category: 'ผลไม้', 
      gradient: 'from-orange-400 to-orange-600',
      rating: 4.8,
      vendors: 25,
      openTime: '06:00-18:00',
      description: 'ผลไม้สดใหม่ทุกวัน',
      popular: true
    },
    { 
      name: 'ตลาดผักออร์แกนิค', 
      image: 'https://www.houstonhealth.org/sites/g/files/zsnnfi171/files/styles/coh_x_large/public/2023-10/food-04.jpg?itok=tMoySLSg', 
      category: 'ผัก', 
      gradient: 'from-green-500 to-green-700',
      rating: 4.7,
      vendors: 18,
      openTime: '05:00-17:00',
      description: 'ผักปลอดสารพิษ',
      popular: false
    },
    { 
      name: 'ตลาดเนื้อสดใหม่', 
      image: 'https://s3.eu-west-2.amazonaws.com/cdn.agriland.co.uk/uploads/2023/04/Image-source-Unsplash-Pork-scaled-e1653303066797-2048x1039-1280x720.jpg', 
      category: 'เนื้อสัตว์', 
      gradient: 'from-red-400 to-red-600',
      rating: 4.6,
      vendors: 12,
      openTime: '06:00-16:00',
      description: 'เนื้อคุณภาพเกรดพรีเมียม',
      popular: true
    },
    { 
      name: 'ตลาดซีฟู้ดสด', 
      image: 'https://lh3.googleusercontent.com/proxy/rM-a-9jGgrCBSpNYDlWUGQqJqbsa5KA1oB1uAa5dnAU1OIghvJ8wKGilKcIvLfQczOfoNywI--vdfFksshz_gW5lfTcCHjDKjJMqfhmQL-7MvDmSzKRMmqU8ae-J2fnOKUDs1g', 
      category: 'ปลาและอาหารทะเล', 
      gradient: 'from-blue-500 to-blue-700',
      rating: 4.9,
      vendors: 20,
      openTime: '04:00-14:00',
      description: 'อาหารทะเลสดจากเรือประมง',
      popular: true
    },
    { 
      name: 'ตลาดดอกไม้งาม', 
      image: 'https://media.istockphoto.com/id/1435326449/photo/flowers-at-a-market.jpg?s=612x612&w=0&k=20&c=oIDcSC8TLUA2k8mrSyrrOM8Ss5Eziey0C0JmC3BdR2E=', 
      category: 'ดอกไม้', 
      gradient: 'from-pink-400 to-pink-600',
      rating: 4.5,
      vendors: 15,
      openTime: '07:00-19:00',
      description: 'ดอกไม้สวยทุกโอกาส',
      popular: false
    },
    { 
      name: 'ตลาดข้าวแท้', 
      image: 'https://img.kapook.com/u/2024/Jarosphan/Home/Cleaning/159982/r02.jpg', 
      category: 'ข้าวสาร', 
      gradient: 'from-amber-500 to-amber-700',
      rating: 4.4,
      vendors: 8,
      openTime: '08:00-17:00',
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

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-medium ${
              activeTab === cat.name
                ? 'bg-green-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-green-300'
            }`}
            onClick={() => setActiveTab(cat.name)}
          >
            <span className="text-lg">{cat.icon}</span>
            <span>{cat.name}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              activeTab === cat.name ? 'bg-white/20' : 'bg-gray-200'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
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
            {/* Popular Badge */}
            {market.popular && (
              <div className="absolute top-3 left-3 z-10 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                🔥 ยอดนิยม
              </div>
            )}

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
              {/* Rating & Info */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{market.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{market.vendors} ร้าน</span>
                </div>
              </div>

              {/* Open Time */}
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{market.openTime}</span>
              </div>

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium">
                <MapPin className="w-4 h-4" />
                เข้าตลาด
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

      {/* Statistics */}
      <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {markets.length}
            </div>
            <div className="text-sm text-gray-600">ตลาดทั้งหมด</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {markets.reduce((sum, market) => sum + market.vendors, 0)}
            </div>
            <div className="text-sm text-gray-600">ร้านค้า</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {(markets.reduce((sum, market) => sum + market.rating, 0) / markets.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">คะแนนเฉลี่ย</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-600">
              {markets.filter(market => market.popular).length}
            </div>
            <div className="text-sm text-gray-600">ตลาดยอดนิยม</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListMenuHome;