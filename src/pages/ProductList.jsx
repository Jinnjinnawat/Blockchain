import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // 1. Import useParams
import { getProduct, getCategoriesFromProducts } from '../services/firestoreService';
import { FiShoppingCart, FiLoader, FiAlertTriangle, FiSearch, FiX } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';

// --- Component สำหรับการ์ดสินค้าแต่ละใบ (ส่วนที่แก้ไข) ---
const ProductCard = ({ product }) => {
  // 1. ดึง cartItems และ addToCart มาจาก useCart Context
  const { addToCart, cartItems } = useCart();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // 2. ปรับปรุงฟังก์ชัน handleAddToCart
  const handleAddToCart = () => {
    // ตรวจสอบว่าสินค้าชิ้นนี้มีอยู่ในตะกร้าแล้วหรือยัง (เช็คจาก product.id)
    const isItemInCart = cartItems.some(item => item.id === product.id);

    if (isItemInCart) {
      // ถ้ามีอยู่แล้ว ให้แสดงข้อความเตือน
      toast.warn(`🛒 "${product.product_name}" มีอยู่ในตะกร้าแล้ว`, {
        position: 'top-right',
        autoClose: 2000,
      });
    } else {
      // ถ้ายังไม่มี ให้เพิ่มลงตะกร้าและแสดงข้อความสำเร็จ
      addToCart(product);
      toast.success(`✅ เพิ่ม "${product.product_name}" แล้ว`, {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="w-full h-48 bg-gray-100">
        <img
          src={product.imageUrl || 'https://placehold.co/600x400/e2e8f0/333333?text=สินค้า'}
          alt={product.product_name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/600x400/e2e8f0/333333?text=รูปเสีย';
          }}
        />
      </div>
      <div className="p-4">
        <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
          {product.category || 'ทั่วไป'}
        </span>
        <h3 className="text-lg font-bold text-gray-800 truncate">{product.product_name}</h3>
        <p className="text-xs font-bold text-gray-800 truncate">{product.detail}</p>
        <p className="text-xl font-semibold text-green-600 mt-2">{formatCurrency(product.price)}</p>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full flex items-center justify-center bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
        >
          <FiShoppingCart className="mr-2" />
          เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  );
};


// --- Component สำหรับช่องค้นหาแบบทันสมัย (ไม่มีการแก้ไข) ---
const SearchBar = ({ searchTerm, onSearchChange, onClearSearch }) => {
    return (
        <div className="relative mb-6 transition-all duration-300">
            <input
                type="text"
                placeholder="🔍 ค้นหาสินค้า..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white/70 backdrop-blur-sm border border-gray-300 shadow-md rounded-full focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-300 placeholder:text-gray-400 text-gray-800"
            />
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                <FiSearch className="h-5 w-5" />
            </div>
            {searchTerm && (
                <button
                    onClick={onClearSearch}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-500 transition duration-200"
                >
                    <FiX className="h-5 w-5" />
                </button>
            )}
        </div>
    );
};


// --- Component หลักของหน้ารายการสินค้า ---
const ProductListPage = () => {
  // 2. อ่านค่า category จาก URL parameter
  const { category: categoryFromUrl } = useParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // 3. ตั้งค่า selectedCategory เริ่มต้นจาก URL หรือเป็น 'ทั้งหมด' ถ้าไม่มี
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl ? decodeURIComponent(categoryFromUrl) : 'ทั้งหมด');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProduct(),
          getCategoriesFromProducts(),
        ]);
        
        // เพิ่ม "ทั้งหมด" เข้าไปในรายการหมวดหมู่ ถ้ายังไม่มี
        const allCategory = { name: 'ทั้งหมด', count: productsData.length };
        const hasAllCategory = categoriesData.some(c => c.name === 'ทั้งหมด');

        setProducts(productsData);
        setCategories(hasAllCategory ? categoriesData : [allCategory, ...categoriesData]);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('ไม่สามารถโหลดข้อมูลสินค้าได้ กรุณาลองใหม่อีกครั้ง');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (selectedCategory !== 'ทั้งหมด') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  // เมื่อ category จาก URL เปลี่ยน, ให้อัพเดท state
  useEffect(() => {
      const decodedCategory = categoryFromUrl ? decodeURIComponent(categoryFromUrl) : 'ทั้งหมด';
      setSelectedCategory(decodedCategory);
  }, [categoryFromUrl]);


  const handleSearchChange = (value) => setSearchTerm(value);
  const handleClearSearch = () => setSearchTerm('');

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
      <FiLoader className="animate-spin text-4xl mb-4" />
      <p className="text-lg">กำลังโหลดข้อมูลสินค้า...</p>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center h-64 text-red-500 bg-red-50 p-8 rounded-lg">
      <FiAlertTriangle className="text-4xl mb-4" />
      <p className="text-lg font-semibold">เกิดข้อผิดพลาด!</p>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
          รายการสินค้า
        </h1>

        <div className="max-w-md mx-auto mb-8">
            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">หมวดหมู่</h2>
            <ul className="space-y-2">
              {/* ปุ่มสำหรับกลับไปดู "ทั้งหมด" */}
              <li>
                <button
                  onClick={() => setSelectedCategory('ทั้งหมด')}
                  className={`w-full text-left px-4 py-2 rounded-md transition duration-200 flex justify-between items-center ${
                    selectedCategory === 'ทั้งหมด'
                      ? 'bg-green-600 text-white font-bold shadow'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>ทั้งหมด</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === 'ทั้งหมด'
                        ? 'bg-white text-green-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {products.length}
                  </span>
                </button>
              </li>

              {categories.filter(cat => cat.name !== 'ทั้งหมด').map((cat) => (
                <li key={cat.name}>
                  <button
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-4 py-2 rounded-md transition duration-200 flex justify-between items-center ${
                      selectedCategory === cat.name
                        ? 'bg-green-600 text-white font-bold shadow'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        selectedCategory === cat.name
                          ? 'bg-white text-green-700'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <main className="md:col-span-3">
             {searchTerm && (
               <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                 <p className="text-sm text-blue-700">
                   ผลการค้นหา "{searchTerm}" พบ {filteredProducts.length} สินค้า
                 </p>
               </div>
             )}

            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState />
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
                    <h3 className="text-2xl font-semibold text-gray-700">ไม่พบสินค้า</h3>
                    <p className="text-gray-500 mt-2">
                        {searchTerm
                            ? `ไม่พบสินค้าที่ตรงกับคำค้นหา "${searchTerm}"`
                            : `ไม่มีสินค้าในหมวดหมู่ "${selectedCategory}" ในขณะนี้`}
                    </p>
                    {searchTerm && (
                        <button
                            onClick={handleClearSearch}
                            className="mt-4 text-green-600 hover:text-green-700 underline"
                        >
                            ล้างคำค้นหา
                        </button>
                    )}
                </div>
            )}
          </main>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
      <Footer></Footer>
    </div>
  );
};

export default ProductListPage;