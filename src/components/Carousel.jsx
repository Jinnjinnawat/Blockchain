import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';

const Carousel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    // Animation on mount
    setTimeout(() => setIsVisible(true), 300);
    
    return () => clearInterval(timer);
  }, []);

  const categories = [
    {
      name: 'ผลไม้',
      image: 'https://waapple.org/wp-content/uploads/2021/06/Variety_Cosmic-Crisp-transparent-300x300.png',
      gradient: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      hoverBg: 'hover:bg-orange-100',
      count: '120+ รายการ',
      trending: true,
    },
    {
      name: 'ผัก',
      image: 'https://res.cloudinary.com/freshketimage001/image/upload/v1646384098/gfxxrnpzsqoqxorebku6.png',
      gradient: 'from-green-400 to-emerald-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverBg: 'hover:bg-green-100',
      count: '85+ รายการ',
      trending: false,
    },
    {
      name: 'เนื้อสัตว์',
      image: 'https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/43/02/0211343/0211343_1.jpg',
      gradient: 'from-red-400 to-pink-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      hoverBg: 'hover:bg-red-100',
      count: '45+ รายการ',
      trending: true,
    },
    {
      name: 'ปลาและอาหารทะเล',
      image: 'https://www.thammachartseafood.com/cdn/shop/products/fresh_mediterranean_seabream_whole_5-min_2_1_1080x.jpg?v=1644801000',
      gradient: 'from-blue-400 to-cyan-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBg: 'hover:bg-blue-100',
      count: '60+ รายการ',
      trending: true,
    },
    {
      name: 'ข้าวสาร',
      image: 'https://png.pngtree.com/png-vector/20241216/ourmid/pngtree-raw-rice-png-image_14794124.png',
      gradient: 'from-amber-400 to-yellow-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      hoverBg: 'hover:bg-amber-100',
      count: '25+ รายการ',
      trending: false,
    },
    {
      name: 'ดอกไม้',
      image: 'https://png.pngtree.com/png-vector/20240125/ourmid/pngtree-mugunghwa-pink-flower-of-korea-png-png-image_11494956.png',
      gradient: 'from-pink-400 to-purple-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      hoverBg: 'hover:bg-pink-100',
      count: '30+ รายการ',
      trending: false,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Implement search logic
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('th-TH', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="relative min-h-[70vh] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzRjMC0yLjIwOSAxLjc5MS00IDQtNHM0IDEuNzkxIDQgNC0xLjc5MSA0LTQgNC00LTEuNzkxLTQtNHptMC0xNmMwLTIuMjA5IDEuNzkxLTQgNC00czQgMS43OTEgNCA0LTEuNzkxIDQtNCA0LTQtMS43OTEtNC00em0tMTYgMTZjMC0yLjIwOSAxLjc5MS00IDQtNHM0IDEuNzkxIDQgNC0xLjc5MSA0LTQgNC00LTEuNzkxLTQtNHptMC0xNmMwLTIuMjA5IDEuNzkxLTQgNC00czQgMS43OTEgNCA0LTEuNzkxIDQtNCA0LTQtMS43OTEtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-orange-400/20 rounded-full animate-bounce delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
  
        

        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            ราคาสินค้า
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              ตลาดสด
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-white/90">
       
          </div>
        </div>

        {/* Enhanced Search Bar */}
        
        {/* Categories Grid */}
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">หมวดหมู่สินค้ายอดนิยม</h2>
            <p className="text-white/80">เลือกหมวดหมู่ที่คุณสนใจ</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`group relative ${category.bgColor} ${category.borderColor} border-2 rounded-2xl p-6 ${category.hoverBg} transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl`}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
  
                
                {/* Category Image */}
                <div className="relative mb-4">
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${category.gradient} p-1 shadow-lg`}>
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSIyNCIgZmlsbD0iI0Y3RkFGQyIvPjx0ZXh0IHg9IjI0IiB5PSIyOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1zaXplPSIyMCI+📦</dGV4dD48L3N2Zz4=';
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Category Info */}
                <div className="text-center">
                  <h3 className="font-bold text-gray-800 mb-1 text-sm">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {category.count}
                  </p>
                </div>
                
                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* Arrow on hover */}
                <div className={`absolute bottom-2 right-2 transform transition-all duration-300 ${
                  hoveredCategory === index ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
                }`}>
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        
        
      </div>
    </div>
  );
};

export default Carousel;