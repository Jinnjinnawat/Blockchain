import { useUser } from '../contexts/UserContext';
import { useState, useEffect } from 'react';
import {
  User, Mail, Phone, MapPin, Calendar, Edit3,
  Camera, Award, Star, Heart, MessageCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Web3 from 'web3';
import sepolia from '../services/sepoliaService';

export default function ModernProfile() {
  const { user } = useUser();
const [totalSupply, setTotalSupply] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  // ใช้ข้อมูลจาก context ถ้ามี หรือ fallback เป็นค่าดีฟอลต์
  const [profileData, setProfileData] = useState(user || {
    name: '',
    position: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    joinDate: '',
    bio: '',
    skills: [],
    achievements: [],
    stats: {
      projects: 0,
      followers: 0,
      following: 0
    }
  });

  useEffect(() => {
    if (user) {
      setProfileData(user); // อัปเดตเมื่อ user เปลี่ยน
    }
  }, [user]);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        // ✅ ตรวจสอบบล็อกปัจจุบัน
        const blockNumber = await sepolia.provider.eth.getBlockNumber();
        console.log("Current Block:", blockNumber);

        // ✅ เรียก totalSupply จาก smart contract
        const total = await sepolia.contract.methods.totalSupply().call();
        setTotalSupply(total);
        console.log("Total Supply:", total);
      } catch (err) {
        console.error("Web3 error:", err);
      }
    };

    initWeb3();
  }, []);
  
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // คุณสามารถเพิ่ม logic บันทึกลงฐานข้อมูลตรงนี้
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-green-200">
      {/* Header */}
      <Navbar></Navbar>
      <div className="relative bg-gradient-to-r from-green-600 to-blue-600 h-64 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-end space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Info */}
              <div className="flex-1 text-white pb-4">
                <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
                <p className="text-xl opacity-90 mb-1">{profileData.position}</p>
                <p className="text-lg opacity-75">{profileData.company}</p>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pb-4">
                <button
                  onClick={handleEdit}
                  className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </button>
                {isEditing && (
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats */}
            

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3"><Mail className="w-5 h-5 text-green-600" /><span>{profileData.email}</span></div>
                <div className="flex items-center space-x-3"><Phone className="w-5 h-5 text-green-600" /><span>{profileData.phone}</span></div>
                <div className="flex items-center space-x-3"><MapPin className="w-5 h-5 text-green-600" /><span>{profileData.location}</span></div>
                <div className="flex items-center space-x-3"><Calendar className="w-5 h-5 text-green-600" /><span>Joined {profileData.joinDate}</span></div>
              </div>
            </div>

           
          </div>

          {/* Main Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md">
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                {[
                  { id: 'about', label: 'About', icon: User },
                  { id: 'achievements', label: 'Achievements', icon: Award },
                  { id: 'activity', label: 'Activity', icon: Heart }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium rounded-t-xl ${
                      activeTab === tab.id ? 'text-green-600 border-b-2 border-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'about' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">About Me</h3>
                    {isEditing ? (
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
                        rows={4}
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                    )}
                  </div>
                )}

                {activeTab === 'achievements' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Achievements</h3>
                    <div className="space-y-3">
                      {profileData.achievements.map((achieve, idx) => (
                        <div key={idx} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <span className="text-gray-700">{achieve}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Recent Activity</h3>
                    <div className="space-y-4">
                      {[
                        { action: 'Completed project "E-commerce Platform"', time: '2 days ago', icon: Heart },
                        { action: 'Received 5-star review from client', time: '1 week ago', icon: Star },
                        { action: 'Joined "React Developers" community', time: '2 weeks ago', icon: MessageCircle }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                          <activity.icon className="w-5 h-5 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-gray-800">{activity.action}</p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
