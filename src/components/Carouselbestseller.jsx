import React, { Component } from 'react';
import 'flowbite';

export class Carouselbestseller extends Component {
  render() {
    return (
      <section className="bg-green-600 py-8 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">ราคาสินค้าขายดีวันนี้</h2>
          <div className="flex items-center justify-between mb-4">
            <a
              href="#"
              className="bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              ดูเพิ่มเติม →
            </a>
          </div>

          {/* Grid of cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div className="bg-white text-black rounded-lg p-4 shadow">
              <img
                src="https://via.placeholder.com/80"
                alt="มะนาว"
                className="mx-auto mb-2"
              />
              <h3 className="text-sm font-bold">มะนาวเบอร์ 400 / กระสอบ</h3>
              <p className="text-sm text-gray-700">฿ 450-550 / กระสอบ</p>
            </div>

            <div className="bg-white text-black rounded-lg p-4 shadow">
              <img
                src="https://via.placeholder.com/80"
                alt="ถั่วฝักยาว"
                className="mx-auto mb-2"
              />
              <h3 className="text-sm font-bold">ถั่วฝักยาว</h3>
              <p className="text-sm text-gray-700">฿ 30-50 / กิโลกรัม</p>
            </div>

            <div className="bg-white text-black rounded-lg p-4 shadow">
              <img
                src="https://via.placeholder.com/80"
                alt="ผักชี"
                className="mx-auto mb-2"
              />
              <h3 className="text-sm font-bold">ผักชีไทย</h3>
              <p className="text-sm text-gray-700">฿ 160-180 / กิโลกรัม</p>
            </div>

            <div className="bg-white text-black rounded-lg p-4 shadow">
              <img
                src="https://via.placeholder.com/80"
                alt="มะเขือ"
                className="mx-auto mb-2"
              />
              <h3 className="text-sm font-bold">มะเขือเปราะ</h3>
              <p className="text-sm text-gray-700">฿ 25-30 / กิโลกรัม</p>
            </div>

            <div className="bg-white text-black rounded-lg p-4 shadow">
              <img
                src="https://via.placeholder.com/80"
                alt="ต้นหอม"
                className="mx-auto mb-2"
              />
              <h3 className="text-sm font-bold">ต้นหอม</h3>
              <p className="text-sm text-gray-700">฿ 100-120 / กิโลกรัม</p>
            </div>

            <div className="bg-white text-black rounded-lg p-4 shadow">
              <img
                src="https://via.placeholder.com/80"
                alt="คื่นช่าย"
                className="mx-auto mb-2"
              />
              <h3 className="text-sm font-bold">คื่นช่าย (คิงโอไทย)</h3>
              <p className="text-sm text-gray-700">฿ 70-130 / กิโลกรัม</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Carouselbestseller;
