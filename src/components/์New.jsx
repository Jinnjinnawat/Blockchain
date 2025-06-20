import React, { Component } from 'react';

export class New extends Component {
  render() {
    return (
      <section className="bg-white py-10">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">ข่าวสารและกิจกรรม</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">

            {/* Card Item */}
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img src="IMAGE_URL1" alt="กิจกรรม 1" className="w-full h-40 object-cover" />
              <div className="p-4">
                <span className="text-xs text-orange-500 font-medium">กิจกรรม</span>
                <h3 className="mt-1 font-semibold text-gray-800 text-sm leading-tight">ตลาดไทสนับสนุนเครื่องดนตรีไทย-สากลแก่สถานศึกษา</h3>
                <p className="text-sm text-gray-600 mt-2">นายธัชชัยพักษ์ ธนาฤทธิ์ ผู้บริหารทีมสำนัก...</p>
                <a href="https://talaadthai.com/news/2" className="text-green-600 text-sm mt-3 inline-block hover:underline">ดูเพิ่มเติม →</a>
              </div>
            </div>

            {/* Card Item */}
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img src="IMAGE_URL2" alt="กิจกรรม 2" className="w-full h-40 object-cover" />
              <div className="p-4">
                <span className="text-xs text-orange-500 font-medium">กิจกรรม</span>
                <h3 className="mt-1 font-semibold text-gray-800 text-sm leading-tight">ครูจีนชี้...ตลาดไทจัดคณะมัลโชว์</h3>
                <p className="text-sm text-gray-600 mt-2">บริษัท ไทย แอ็กโกร เอ็กซเชนจ์ จำกัด...</p>
                <a href="#" className="text-green-600 text-sm mt-3 inline-block hover:underline">ดูเพิ่มเติม →</a>
              </div>
            </div>

            {/* Card Item */}
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img src="IMAGE_URL3" alt="ข่าวสาร 1" className="w-full h-40 object-cover" />
              <div className="p-4">
                <span className="text-xs text-green-600 font-medium">ข่าวสาร</span>
                <h3 className="mt-1 font-semibold text-gray-800 text-sm leading-tight">งานสัมมนา “ไทยจะเป็นศูนย์กลางผลไม้เขตร้อนของโลกได้อย่างไร”</h3>
                <p className="text-sm text-gray-600 mt-2">สมาคมนิสิตเก่า ม.เกษตรศาสตร์...</p>
                <a href="#" className="text-green-600 text-sm mt-3 inline-block hover:underline">ดูเพิ่มเติม →</a>
              </div>
            </div>

            {/* Card Item */}
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img src="IMAGE_URL4" alt="กิจกรรม 3" className="w-full h-40 object-cover" />
              <div className="p-4">
                <span className="text-xs text-orange-500 font-medium">กิจกรรม</span>
                <h3 className="mt-1 font-semibold text-gray-800 text-sm leading-tight">ตลาดไท: โครงการผักร่วมใจ (ผักปลอดภัย)</h3>
                <p className="text-sm text-gray-600 mt-2">รายการเมืองไทยใหญ่ อุดม...</p>
                <a href="#" className="text-green-600 text-sm mt-3 inline-block hover:underline">ดูเพิ่มเติม →</a>
              </div>
            </div>

            {/* Card Item */}
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img src="IMAGE_URL5" alt="ข่าวสาร 2" className="w-full h-40 object-cover" />
              <div className="p-4">
                <span className="text-xs text-green-600 font-medium">ข่าวสาร</span>
                <h3 className="mt-1 font-semibold text-gray-800 text-sm leading-tight">ผู้ค้าผักตลาดไท มอบทุนการศึกษา</h3>
                <p className="text-sm text-gray-600 mt-2">ผู้ค้าผักตลาดไท สมาคมฯ...</p>
                <a href="#" className="text-green-600 text-sm mt-3 inline-block hover:underline">ดูเพิ่มเติม →</a>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }
}

export default New;
