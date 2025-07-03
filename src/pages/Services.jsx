import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Link, 
  Zap, 
  Globe, 
  Users, 
  BarChart3, 
  Coins, 
  Database,
  ChevronRight,
  Check,
  Star,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';

const BlockchainFarmServices = () => {
  const [activeService, setActiveService] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 1,
      icon: Shield,
      title: 'ตรวจสอบย้อนกลับ (Traceability)',
      description: 'ระบบติดตามแหล่งกำเนิดสินค้าเกษตรด้วยเทคโนโลยี Blockchain',
      features: [
        'ติดตามจากฟาร์มถึงผู้บริโภค',
        'ข้อมูลโปร่งใสและไม่สามารถแก้ไขได้',
        'QR Code สำหรับตรวจสอบแหล่งกำเนิด',
        'ประวัติการผลิตแบบ Real-time'
      ],
      price: '฿18,000',
      period: '/เดือน',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 2,
      icon: Coins,
      title: 'การชำระเงินดิจิทัล',
      description: 'ระบบชำระเงินด้วย Cryptocurrency และ Smart Contract',
      features: [
        'ชำระเงินด้วย Cryptocurrency',
        'Smart Contract อัตโนมัติ',
        'ค่าธรรมเนียมต่ำ',
        'ความปลอดภัยระดับสูง'
      ],
      price: '฿15,000',
      period: '/เดือน',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 3,
      icon: Database,
      title: 'จัดการข้อมูลสินค้า',
      description: 'เก็บข้อมูลสินค้าเกษตรใน Blockchain อย่างปลอดภัย',
      features: [
        'บันทึกข้อมูลแบบกระจาย',
        'ข้อมูลคุณภาพสินค้า',
        'ประวัติการเก็บเกี่ยว',
        'ใบรับรองมาตรฐาน'
      ],
      price: '฿12,000',
      period: '/เดือน',
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 4,
      icon: Globe,
      title: 'Marketplace แบบกระจาย',
      description: 'แพลตฟอร์มขายสินค้าเกษตรแบบ P2P บน Blockchain',
      features: [
        'ตลาดกลางแบบกระจาย',
        'ไม่มีค่าธรรมเนียมกลาง',
        'การค้าแบบโปร่งใส',
        'ระบบให้คะแนนความน่าเชื่อถือ'
      ],
      price: '฿20,000',
      period: '/เดือน',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 5,
      icon: Link,
      title: 'Supply Chain Management',
      description: 'จัดการห่วงโซ่อุปทานแบบโปร่งใสด้วย Blockchain',
      features: [
        'ติดตามการขนส่งแบบ Real-time',
        'จัดการสต็อกอัตโนมัติ',
        'ประสานงานกับพาร์ทเนอร์',
        'รายงานประสิทธิภาพการขนส่ง'
      ],
      price: '฿16,000',
      period: '/เดือน',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      id: 6,
      icon: BarChart3,
      title: 'การวิเคราะห์ตลาด',
      description: 'วิเคราะห์ข้อมูลตลาดด้วย AI และ Blockchain Analytics',
      features: [
        'วิเคราะห์ราคาแบบ Real-time',
        'พยากรณ์แนวโน้มตลาด',
        'ข้อมูลการซื้อขายโปร่งใส',
        'รายงานประสิทธิภาพการลงทุน'
      ],
      price: '฿10,000',
      period: '/เดือน',
      color: 'from-teal-400 to-green-500'
    }
  ];

  const packages = [
    {
      name: 'แพ็คเกจ Basic Chain',
      price: '฿35,000',
      period: '/เดือน',
      description: 'เหมาะสำหรับเกษตรกรที่เริ่มต้นใช้ Blockchain',
      features: [
        'ระบบตรวจสอบย้อนกลับพื้นฐาน',
        'QR Code สำหรับสินค้า',
        'จัดการข้อมูลสินค้า',
        'การชำระเงินดิจิทัล',
        'สนับสนุน 24/7'
      ],
      popular: false
    },
    {
      name: 'แพ็คเกจ Pro Chain',
      price: '฿65,000',
      period: '/เดือน',
      description: 'แพ็คเกจยอดนิยมสำหรับธุรกิจขนาดกลาง',
      features: [
        'บริการทั้งหมดใน Basic Chain',
        'Marketplace แบบกระจาย',
        'Supply Chain Management',
        'การวิเคราะห์ตลาด',
        'Smart Contract แบบกำหนดเอง',
        'การฝึกอบรมทีมงาน'
      ],
      popular: true
    },
    {
      name: 'แพ็คเกจ Enterprise Chain',
      price: '฿120,000',
      period: '/เดือน',
      description: 'โซลูชันครบวงจรสำหรับธุรกิจขนาดใหญ่',
      features: [
        'บริการทั้งหมดใน Pro Chain',
        'Private Blockchain แบบกำหนดเอง',
        'API Integration แบบไม่จำกัด',
        'ที่ปรึกษาเฉพาะบุคคล',
        'White-label Solution',
        'การรับประกันประสิทธิภาพ',
        'การสนับสนุนแบบ Priority'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-green-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-64 h-64 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)` }}
        ></div>
        <div 
          className="absolute top-1/3 right-20 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ transform: `translate(${-scrollY * 0.15}px, ${scrollY * 0.1}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-800 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
          style={{ transform: `translate(${scrollY * 0.08}px, ${-scrollY * 0.12}px)` }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mb-8 animate-pulse">
            <Link className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
            Blockchain Agriculture
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            ปฏิวัติการขายสินค้าเกษตรด้วยเทคโนโลยี Blockchain และ Smart Contract
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-green-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-green-700/30 cursor-pointer ${
                activeService === index ? 'ring-2 ring-blue-400' : ''
              }`}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-full mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-green-100 mb-4">{service.title}</h3>
              <p className="text-green-200 mb-6 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-green-100 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-blue-300">
                  {service.price}
                  <span className="text-lg text-green-200 font-normal">{service.period}</span>
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2">
                  <span>เลือก</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Blockchain Benefits */}
        <div className="bg-gradient-to-r from-green-800/50 to-blue-800/50 backdrop-blur-sm rounded-3xl p-12 mb-20 border border-green-700/30">
          <h2 className="text-4xl font-bold text-center mb-8 text-green-100">
            ทำไมต้อง Blockchain?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-100 mb-2">ปลอดภัย</h3>
              <p className="text-green-200">ข้อมูลเข้ารหัสและกระจายอย่างปลอดภัย</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-100 mb-2">โปร่งใส</h3>
              <p className="text-green-200">ทุกการทำธุรกรรมโปร่งใสและตรวจสอบได้</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-100 mb-2">รวดเร็ว</h3>
              <p className="text-green-200">ประมวลผลรวดเร็วด้วย Smart Contract</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-100 mb-2">ประหยัด</h3>
              <p className="text-green-200">ลดค่าใช้จ่ายและค่าธรรมเนียมกลาง</p>
            </div>
          </div>
        </div>

        {/* Package Plans */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4 text-green-100">
            แพ็คเกจ Blockchain
          </h2>
          <p className="text-center text-green-200 mb-12 max-w-2xl mx-auto">
            เลือกแพ็คเกจที่เหมาะสมกับความต้องการ Blockchain ของธุรกิจคุณ
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={`relative bg-green-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border transition-all duration-300 hover:scale-105 ${
                  pkg.popular 
                    ? 'border-blue-400 ring-2 ring-blue-400/50' 
                    : 'border-green-700/30'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>ยอดนิยม</span>
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-green-100 mb-2">{pkg.name}</h3>
                  <p className="text-green-200 mb-4">{pkg.description}</p>
                  <div className="text-4xl font-bold text-blue-300">
                    {pkg.price}
                    <span className="text-lg text-green-200 font-normal">{pkg.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-green-100">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-700 to-blue-800 rounded-3xl p-12 text-center shadow-2xl border border-green-600/30">
          <h2 className="text-4xl font-bold mb-6 text-green-100">
            พร้อมเข้าสู่ยุค Agriculture 4.0?
          </h2>
          <p className="text-xl text-green-200 mb-8 max-w-3xl mx-auto">
            เริ่มต้นการปฏิวัติธุรกิจเกษตรของคุณด้วยเทคโนโลยี Blockchain วันนี้
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-800 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>โทรปรึกษา: 02-888-9999</span>
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>ขอ Demo การใช้งาน</span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BlockchainFarmServices;