import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormLogin from './FormLogin';
import { auth } from '../services/firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { withNavigation } from './withNavigation'; 

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      showLoginModal: false,
      user: null,
      isScrolled: false,
      showUserDropdown: false, // เพิ่ม state สำหรับ dropdown
    };
    this.dropdownRef = React.createRef(); // สำหรับ detect click outside
  }

  componentDidMount() {
    this.unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });

    // เพิ่ม scroll listener สำหรับเอฟเฟกต์
    window.addEventListener('scroll', this.handleScroll);
    // เพิ่ม click listener สำหรับปิด dropdown
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

 

  // Handle click outside dropdown
  handleClickOutside = (event) => {
    if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
      this.setState({ showUserDropdown: false });
    }
  };

  toggleMenu = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  toggleUserDropdown = () => {
    this.setState((prevState) => ({ showUserDropdown: !prevState.showUserDropdown }));
  };

  openLoginModal = () => {
    this.setState({ showLoginModal: true });
  };

  closeLoginModal = () => {
    this.setState({ showLoginModal: false });
  };

  handleLogout = async () => {
    await signOut(auth);
    this.setState({ user: null, showUserDropdown: false });
    this.props.navigate('/');
  };

  render() {
    const { isOpen, showLoginModal, user, isScrolled, showUserDropdown } = this.state;

    return (
      <>
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg' 
            : 'bg-gradient-to-r from-emerald-600/90 to-green-700/90 backdrop-blur-sm border-b border-white/10'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Logo Section */}
              <Link to="/" className="flex items-center space-x-3 group">
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent group-hover:from-emerald-100 group-hover:to-white transition-all duration-200">
                  TaladKaset
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {[
                  { name: 'Home', path: '/home',   },
                  { name: 'About', path: '/about',  },
                  { name: 'Services', path: '/services',  },
                  { name: 'Contact', path: '/contact', },
                ].map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="relative group flex items-center space-x-2 text-white/90 hover:text-white transition-all duration-200 px-3 py-2 rounded-lg hover:bg-white/10"
                  >
                    <span className="text-sm">{link.icon}</span>
                    <span className="font-medium">{link.name}</span>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                ))}
              </div>

              {/* User Section */}
              <div className="flex items-center space-x-4">
                {!user ? (
                  <button
                    onClick={this.openLoginModal}
                    className="relative px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-full hover:from-emerald-400 hover:to-green-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent"
                  >
                    <span className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Login</span>
                    </span>
                  </button>
                ) : (
                  <div className="relative" ref={this.dropdownRef}>
                    {/* User Profile Button */}
                    <button
                      onClick={this.toggleUserDropdown}
                      className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {(user.displayName || user.email).charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-white text-sm font-medium max-w-32 truncate">
                        {user.displayName || user.email}
                      </span>
                      {/* Dropdown Arrow */}
                      <svg 
                        className={`w-4 h-4 text-white/80 transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div className={`absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 transition-all duration-200 origin-top-right ${
                      showUserDropdown 
                        ? 'opacity-100 scale-100 translate-y-0' 
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}>
                      
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-200/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {(user.displayName || user.email).charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user.displayName || 'ผู้ใช้งาน'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/my-products"
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-150 group"
                          onClick={() => this.setState({ showUserDropdown: false })}
                        >
                          <div className="w-8 h-8 bg-emerald-100 group-hover:bg-emerald-200 rounded-lg flex items-center justify-center transition-colors duration-150">
                            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">รายการสินค้าของฉัน</p>
                            <p className="text-xs text-gray-500">จัดการสินค้าที่ลงขาย</p>
                          </div>
                        </Link>

                        <Link
                          to="/order-reports"
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 group"
                          onClick={() => this.setState({ showUserDropdown: false })}
                        >
                          <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors duration-150">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">รายงานการสั่งซื้อ</p>
                            <p className="text-xs text-gray-500">ดูประวัติการสั่งซื้อ</p>
                          </div>
                        </Link>

                        <div className="border-t border-gray-200/50 mt-2 pt-2">
                          <Link
                            to="/profile"
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                            onClick={() => this.setState({ showUserDropdown: false })}
                          >
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-sm">จัดการโปรไฟล์</span>
                          </Link>

                          <button
                            onClick={this.handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-150"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="text-sm font-medium">ออกจากระบบ</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Menu Button */}
                <button
                  onClick={this.toggleMenu}
                  className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <div className="w-6 h-6 relative">
                    <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                    <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 top-3 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}>
              <div className="py-4 space-y-2 bg-white/5 backdrop-blur-sm rounded-lg mt-2 border border-white/10">
                {[
                  { name: 'Home', path: '/home', },
                  { name: 'About', path: '/about',},
                  { name: 'Services', path: '/services',  },
                  { name: 'Contact', path: '/contact',},
                ].map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="flex items-center space-x-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 mx-2 rounded-lg"
                    onClick={() => this.setState({ isOpen: false })}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="font-medium">{link.name}</span>
                  </Link>
                ))}
                
                {/* Mobile User Menu */}
                {user && (
                  <div className="border-t border-white/20 mt-2 pt-2">
                    <Link
                      to="/my-products"
                      className="flex items-center space-x-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 mx-2 rounded-lg"
                      onClick={() => this.setState({ isOpen: false })}
                    >
                      <span className="text-lg">📦</span>
                      <span className="font-medium">รายการสินค้าของฉัน</span>
                    </Link>
                    <Link
                      to="/order-reports"
                      className="flex items-center space-x-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 mx-2 rounded-lg"
                      onClick={() => this.setState({ isOpen: false })}
                    >
                      <span className="text-lg">📊</span>
                      <span className="font-medium">รายงานการสั่งซื้อ</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Spacer for fixed navbar */}
        <div className="h-16"></div>

        <FormLogin showModal={showLoginModal} toggleModal={this.closeLoginModal} />
      </>
    );
  }
}

export default withNavigation(Navbar);