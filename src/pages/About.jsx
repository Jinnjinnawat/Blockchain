import React, { useState, useEffect } from 'react';
import { Leaf, Users, Target, Award, ChevronRight, Sun, Droplets, Sprout } from 'lucide-react';
import Navbar from '../components/Navbar';
const ModernFarmerAbout = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { number: '500+', label: 'เกษตรกรที่ไว้วางใจ', icon: Users },
    { number: '1,200', label: 'ไร่ที่ดูแล', icon: Sprout },
    { number: '95%', label: 'ผลผลิตคุณภาพสูง', icon: Award },
    { number: '10+', label: 'ปีประสบการณ์', icon: Sun }
  ];

  const values = [
    {
      icon: Leaf,
      title: 'ยั่งยืน',
      description: 'เราใช้เทคโนโลยีที่เป็นมิตรกับสิ่งแวดล้อม เพื่อการเกษตรที่ยั่งยืน'
    },
    {
      icon: Target,
      title: 'นวัตกรรม',
      description: 'นำเทคโนโลジีสมัยใหม่มาใช้ในการเกษตร เพื่อประสิทธิภาพสูงสุด'
    },
    {
      icon: Users,
      title: 'ชุมชน',
      description: 'สร้างเครือข่ายเกษตรกรที่แข็งแกร่ง เพื่อการเติบโตร่วมกัน'
    },
    {
      icon: Droplets,
      title: 'คุณภาพ',
      description: 'มุ่งมั่นผลิตผลผลิตคุณภาพสูง ปลอดภัยต่อผู้บริโภค'
    }
  ];

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
        <Navbar></Navbar>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        <div 
          className="absolute top-40 right-20 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        ></div>
        <div 
          className="absolute bottom-40 left-1/4 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-8 animate-spin-slow">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in">
            เกษตรกรยุคใหม่
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            เราเป็นผู้นำในการใช้เทคโนโลยีสมัยใหม่เพื่อการเกษตรที่ยั่งยืน 
            พร้อมสร้างอนาคทที่ดีกว่าสำหรับเกษตรกรไทย
          </p>
          <div className="flex justify-center">
            <button className="group bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
              <span>เริ่มต้นกับเราวันนี้</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            ค่านิยมของเรา
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20 cursor-pointer ${
                  activeCard === index ? 'ring-2 ring-green-500' : ''
                }`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-12 text-white text-center shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">พันธกิจของเรา</h2>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-8">
            เราเชื่อว่าการเกษตรแบบดั้งเดิมสามารถผสมผสานกับเทคโนโลยีสมัยใหม่ได้อย่างลงตัว 
            เพื่อสร้างระบบเกษตรที่ยั่งยืน เพิ่มผลผลิต และรักษาสิ่งแวดล้อมไปพร้อมกัน 
            เราทำงานร่วมกับเกษตรกรทั่วประเทศเพื่อสร้างอนาคตที่ดีกว่าสำหรับการเกษตรไทย
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium">
              #เกษตรยั่งยืน
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium">
              #เทคโนโลยีเกษตร
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium">
              #ชุมชนเกษตรกร
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium">
              #อนาคตเกษตร
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ModernFarmerAbout;