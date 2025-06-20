// src/components/FormLogin.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../services/firebase-config';
import { getDoc, doc } from 'firebase/firestore';
import { Eye, EyeOff, Mail, Lock, X, Loader2, Sparkles, Shield } from 'lucide-react';

const FormLogin = ({ showModal, toggleModal }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  const navigate = useNavigate();

  // Animation effect for modal
  useEffect(() => {
    if (showModal) {
      setIsVisible(true);
    }
  }, [showModal]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      toggleModal();
    }, 300);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.role === 'seller') {
          handleClose();
          navigate('/home');
        } else {
          setError('คุณไม่มีสิทธิ์เข้าถึงหน้านี้');
          await signOut(auth);
        }
      } else {
        setError('ไม่พบข้อมูลผู้ใช้');
        await signOut(auth);
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setError('ไม่พบผู้ใช้นี้ในระบบ');
          break;
        case 'auth/wrong-password':
          setError('รหัสผ่านไม่ถูกต้อง');
          break;
        case 'auth/invalid-email':
          setError('รูปแบบอีเมลไม่ถูกต้อง');
          break;
        case 'auth/too-many-requests':
          setError('มีการพยายามเข้าสู่ระบบมากเกินไป กรุณาลองใหม่ภายหลัง');
          break;
        default:
          setError('เกิดข้อผิดพลาด: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
      isVisible ? 'bg-black/70 backdrop-blur-md' : 'bg-transparent backdrop-blur-none'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-600/20 via-emerald-600/20 to-teal-600/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div 
        className={`relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 max-w-md w-full p-8 transform transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-full opacity-20 blur-lg"></div>
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                เข้าสู่ระบบ
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              ยินดีต้อนรับกลับมา! เข้าสู่ระบบเพื่อเริ่มต้นการใช้งาน
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200 backdrop-blur-sm"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className={`block text-sm font-medium transition-colors duration-200 ${
                focusedField === 'email' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              อีเมล
            </label>
            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                focusedField === 'email' ? 'text-green-500' : 'text-gray-400'
              }`}>
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600"
                placeholder="your@email.com"
                required
                disabled={isLoading}
              />
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 transition-opacity duration-300 pointer-events-none ${
                focusedField === 'email' ? 'opacity-100' : ''
              }`}></div>
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className={`block text-sm font-medium transition-colors duration-200 ${
                focusedField === 'password' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              รหัสผ่าน
            </label>
            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                focusedField === 'password' ? 'text-green-500' : 'text-gray-400'
              }`}>
                <Lock className="h-5 w-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 transition-opacity duration-300 pointer-events-none ${
                focusedField === 'password' ? 'opacity-100' : ''
              }`}></div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="relative p-4 bg-gradient-to-r from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-2xl backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
              <div className="absolute inset-0 bg-red-500/5 rounded-2xl"></div>
              <p className="relative text-red-700 dark:text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 text-green-600 bg-gray-100 border-2 border-gray-300 rounded-lg focus:ring-green-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 transition-all duration-200"
                  disabled={isLoading}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
              <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                จดจำฉัน
              </span>
            </label>
            <Link 
              to="/forgot-password" 
              className="text-sm font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 hover:underline transition-all duration-200 hover:scale-105"
            >
              ลืมรหัสผ่าน?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative overflow-hidden bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
          >
            {/* Button background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                <span>กำลังเข้าสู่ระบบ...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 opacity-80" />
                <span>เข้าสู่ระบบ</span>
              </>
            )}
          </button>

          {/* Register Link */}
          <div className="text-center pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ยังไม่มีบัญชี?{' '}
              <Link 
                to="/register" 
                className="font-semibold text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 hover:underline transition-all duration-200 hover:scale-105 inline-block"
              >
                สร้างบัญชีใหม่
              </Link>
            </p>
          </div>
        </form>

        {/* Footer decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-b-3xl opacity-60"></div>
      </div>
    </div>
  );
};

export default FormLogin;