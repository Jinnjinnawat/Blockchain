import React, { useState } from 'react';
import { 
  Package, 
  Users, 
  ChevronDown, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Phone,
  Store
} from 'lucide-react';

export default function NavbarDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <aside className="w-72 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">TaladKaset</h1>
            <p className="text-emerald-100 text-sm">ระบบจัดการ</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
        {/* Product Link */}
        <a
          href="/tableproduct" 
          className="group flex items-center space-x-3 py-3 px-4 rounded-xl hover:bg-slate-700/50 transition-all duration-200 hover:translate-x-1 hover:shadow-lg"
        >
          <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
            <Package className="w-5 h-5 text-blue-400" />
          </div>
          <span className="font-medium">ข้อมูลสินค้า</span>
        </a>

        {/* User Link */}
        <a
          href="/tableuser" 
          className="group flex items-center space-x-3 py-3 px-4 rounded-xl hover:bg-slate-700/50 transition-all duration-200 hover:translate-x-1 hover:shadow-lg"
        >
          <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <span className="font-medium">ข้อมูลผู้ใช้งาน</span>
        </a>

        {/* Dropdown Menu */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="group flex items-center justify-between w-full py-3 px-4 rounded-xl hover:bg-slate-700/50 transition-all duration-200 hover:translate-x-1 hover:shadow-lg"
            type="button"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/30 transition-colors">
                <Settings className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-medium">เมนูเพิ่มเติม</span>
            </div>
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Content */}
          <div className={`overflow-hidden transition-all duration-300 ${
            dropdownOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-xl mt-2 ml-4 border border-slate-600/30">
              <a 
                href="#" 
                className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-700/50 transition-colors rounded-t-xl"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span className="text-sm">ตั้งค่า</span>
              </a>
              <a 
                href="#" 
                className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-700/50 transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span className="text-sm">ช่วยเหลือ</span>
              </a>
              <a 
                href="#" 
                className="flex items-center space-x-3 px-4 py-3 hover:bg-red-500/20 transition-colors rounded-b-xl text-red-400 hover:text-red-300"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">ออกจากระบบ</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Link */}
        <a 
          href="#" 
          className="group flex items-center space-x-3 py-3 px-4 rounded-xl hover:bg-slate-700/50 transition-all duration-200 hover:translate-x-1 hover:shadow-lg"
        >
          <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
            <Phone className="w-5 h-5 text-green-400" />
          </div>
          <span className="font-medium">ติดต่อเรา</span>
        </a>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-800/50">
        <div className="text-center">
          <p className="text-xs text-slate-400">© 2025 TaladKaset</p>
          <p className="text-xs text-slate-500">Dashboard v2.0</p>
        </div>
      </div>
    </aside>
  );
}