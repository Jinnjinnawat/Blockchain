import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import {
  Shield,
  Link as LinkIcon,
  Zap,
  Globe,
  Users,
  BarChart3,
  Coins,
  Database,
  Check,
  Phone,
  Mail
} from 'lucide-react';
import Footer from '../components/Footer';

const BlockchainFarmServices = () => {
  const [activeService, setActiveService] = useState(null);
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
      color: 'from-green-500 to-green-700'
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
      color: 'from-emerald-400 to-emerald-600'
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
      color: 'from-lime-400 to-lime-600'
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
      color: 'from-green-400 to-green-600'
    },
    {
      id: 5,
      icon: LinkIcon,
      title: 'Supply Chain Management',
      description: 'จัดการห่วงโซ่อุปทานแบบโปร่งใสด้วย Blockchain',
      features: [
        'ติดตามการขนส่งแบบ Real-time',
        'จัดการสต็อกอัตโนมัติ',
        'ประสานงานกับพาร์ทเนอร์',
        'รายงานประสิทธิภาพการขนส่ง'
      ],
      color: 'from-teal-400 to-teal-600'
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
      color: 'from-green-300 to-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-green-900">
      <Navbar />

      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
            บริการ Blockchain สำหรับเกษตร
          </h1>
          <p className="mt-4 text-lg text-green-600 max-w-2xl mx-auto">
            เทคโนโลยี Blockchain เพื่อความโปร่งใส ความปลอดภัย และประสิทธิภาพในภาคเกษตร
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.id}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
              className={`bg-gradient-to-r ${service.color} text-white rounded-2xl p-6 shadow-lg transition-transform transform hover:scale-105 duration-300`}
            >
              <div className="flex items-center justify-center w-14 h-14 bg-white bg-opacity-20 rounded-full mb-4">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
              <p className="text-sm mb-4">{service.description}</p>
              <ul className="space-y-2 text-sm">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-white mt-1" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            สนใจเข้าร่วมระบบ Blockchain การเกษตร?
          </h2>
          <p className="text-green-600 mb-8">
            ติดต่อเราเพื่อขอรับคำปรึกษาหรือทดลองใช้บริการฟรี
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-green-700 transition">
              <Phone className="w-5 h-5" />
              <span>โทรเลย: 02-888-9999</span>
            </button>
            <button className="bg-white border border-green-600 text-green-800 px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-green-100 transition">
              <Mail className="w-5 h-5" />
              <span>ขอ Demo การใช้งาน</span>
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default BlockchainFarmServices;