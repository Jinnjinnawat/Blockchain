import React from 'react';
import { useForm } from 'react-hook-form';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // จุดนี้คือส่วนที่จะนำไป implement การส่งข้อมูลไปยัง backend หรือ service อื่นๆ
    alert('ขอบคุณสำหรับข้อความของคุณ! เราจะติดต่อกลับโดยเร็วที่สุด');
  };

  return (
    
    <div className="bg-white font-sans leading-normal tracking-normal">
        <Navbar></Navbar>
      <div className="container mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">ติดต่อเรา</h1>
          <p className="text-lg text-gray-600 mt-4">
            มีคำถามเกี่ยวกับสินค้าเกษตรของเรา? ติดต่อเราได้เลย!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left Side: Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">ส่งข้อความถึงเรา</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  ชื่อ-นามสกุล
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'กรุณากรอกชื่อของคุณ' })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  อีเมล
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'กรุณากรอกอีเมล',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'รูปแบบอีเมลไม่ถูกต้อง',
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  ข้อความ
                </label>
                <textarea
                  id="message"
                  rows="5"
                  {...register('message', { required: 'กรุณากรอกข้อความ' })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                  }`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300"
              >
                ส่งข้อความ
              </button>
            </form>
          </div>

          {/* Right Side: Contact Info & Map */}
          <div className="space-y-8">
             <div className="bg-gray-50 p-8 rounded-lg shadow-md">
               <h2 className="text-2xl font-semibold text-gray-700 mb-6">ข้อมูลติดต่อ</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FiMapPin className="text-green-600 text-2xl mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">ที่อยู่</h3>
                      <p className="text-gray-600">123 หมู่ 4 ตำบลไร่ใหม่ <br />อำเภอสามร้อยยอด, ประจวบคีรีขันธ์ 77120</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiPhone className="text-green-600 text-2xl mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">เบอร์โทรศัพท์</h3>
                      <p className="text-gray-600">081-234-5678</p>
                    </div>
                  </div>
                   <div className="flex items-start">
                    <FiMail className="text-green-600 text-2xl mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">อีเมล</h3>
                      <p className="text-gray-600">contact@farmfresh.th</p>
                    </div>
                  </div>
                </div>
            </div>
             
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ContactPage;