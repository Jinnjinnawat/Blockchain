import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import 'flowbite';

export default function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔐 ตรวจสอบข้อมูล (จำลอง)
    if (email === 'somchai@email.com' && password === '123456') {
      const userData = {
        name: 'สมชาย ใจดี',
        position: 'Senior Developer',
        company: 'Tech Innovation Co.',
        email: 'somchai@email.com',
        phone: '+66 89 123 4567',
        location: 'Bangkok, Thailand',
        joinDate: 'January 2020',
        bio: 'Passionate full-stack developer with 5+ years of experience...',
        skills: ['React', 'Node.js', 'TypeScript'],
        achievements: ['Employee of the Year 2024', 'Led 3 successful product launches'],
        stats: { projects: 42, followers: 1284, following: 892 }
      };

      setUser(userData);
      navigate('/profile'); // ✅ ไปหน้าโปรไฟล์
    } else {
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login to Your Account
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="form-input block w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="name@flowbite.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="form-input block w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember me */}
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
              Remember me
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
