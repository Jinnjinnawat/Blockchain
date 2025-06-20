import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import ListMenuHome from "../components/ListMenuHome";
import Carouselbestseller from "../components/Carouselbestseller";
import { getProduct } from "../services/firestoreService";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // ดึงข้อมูลสินค้าจาก Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProduct();
        setProducts(productsData);
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลสินค้าได้');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // จัดกลุ่มสินค้าตามหมวดหมู่
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || 'อื่นๆ';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  // ฟิลเตอร์สินค้าตามหมวดหมู่ที่เลือก
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // หมวดหมู่ทั้งหมด
  const categories = ['all', ...Object.keys(groupedProducts)];

  const renderProductCard = (product) => (
    <div
      key={product.id}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl || product.img || '/images/placeholder.png'}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = '/images/placeholder.png';
          }}
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            ใหม่
          </span>
        )}
        {product.discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.product_name}
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            {product.originalPrice && product.originalPrice !== product.price && (
              <span className="text-sm text-gray-400 line-through">
                ฿{product.originalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-green-600">
              ฿{product.price}
            </span>
          </div>
          
          {product.rating && (
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-600 ml-1">
                {product.rating}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>คงเหลือ: {product.stock || 0}</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
            {product.category || 'อื่นๆ'}
          </span>
        </div>
        
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium">
          เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  );

  const renderCategorySection = (category, products) => (
    <section key={category} className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 relative">
          {category}
          <div className="absolute -bottom-1 left-0 w-12 h-1 bg-green-500 rounded-full"></div>
        </h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {products.length} รายการ
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map(renderProductCard)}
      </div>
    </section>
  );

  return (
    <div>
      <Navbar />
      <Carousel />
      
      <ListMenuHome />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            รายการสินค้า
          </h1>
          <p className="text-gray-600">เลือกสินค้าคุณภาพดีจากเรา</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'ทั้งหมด' : category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="ml-3 text-gray-600">กำลังโหลด...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg inline-block">
              {error}
            </div>
          </div>
        )}

        {/* Products Display */}
        {!loading && !error && (
          <>
            {selectedCategory === 'all' ? (
              // แสดงตามหมวดหมู่
              Object.entries(groupedProducts).map(([category, products]) => 
                renderCategorySection(category, products)
              )
            ) : (
              // แสดงสินค้าที่ฟิลเตอร์แล้ว
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProducts.map(renderProductCard)}
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-xl text-gray-600 mb-2">ไม่พบสินค้า</h3>
                <p className="text-gray-500">ขณะนี้ยังไม่มีสินค้าในหมวดหมู่นี้</p>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}