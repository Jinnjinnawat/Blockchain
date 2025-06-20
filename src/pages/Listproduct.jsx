import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, ShoppingCart, Eye, Edit, Trash2 } from 'lucide-react';

// Import your actual Firebase service
import { getProduct, deleteProducts, updateProduct } from '../services/firestoreService';
import Navbar from '../components/Navbar';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Use your actual firestoreService.getProduct()
      const productsData = await getProduct();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      // You might want to show a toast notification here
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('คุณต้องการลบสินค้านี้หรือไม่?')) {
      return;
    }

    try {
      setDeleteLoading(productId);
      await deleteProducts(productId);
      // Remove the product from local state
      setProducts(products.filter(product => product.id !== productId));
      // You can add a success toast notification here
    } catch (error) {
      console.error('Error deleting product:', error);
      // You can add an error toast notification here
    } finally {
      setDeleteLoading(null);
    }
  };

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const filteredProducts = products
    .filter(product => 
      product.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'stock':
          return (b.stock || 0) - (a.stock || 0);
        default:
          return (a.product_name || '').localeCompare(b.product_name || '', 'th');
      }
    });

  const formatPrice = (price) => {
    if (!price) return '฿0';
    // แสดงราคาเต็มที่ Firebase ส่งมา
    return `฿${price.toLocaleString('th-TH')}`;
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 hover:border-indigo-200">
      <div className="relative overflow-hidden">
        <img 
          src={product.imageUrl || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&q=80'} 
          alt={product.product_name || 'Product'}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
            (product.stock || 0) > 20 ? 'bg-emerald-500/90 text-white' :
            (product.stock || 0) > 10 ? 'bg-amber-500/90 text-white' :
            'bg-rose-500/90 text-white'
          }`}>
            คงเหลือ {product.stock || 0} {product.unit || 'ชิ้น'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 truncate">{product.product_name || 'ไม่มีชื่อสินค้า'}</h3>
          <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded-full">{product.category || 'ไม่มีหมวดหมู่'}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.detail || 'ไม่มีรายละเอียด'}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{formatPrice(product.price)}</span>
          <span className="text-sm text-gray-500">หน่วย: {product.unit || 'ชิ้น'}</span>
        </div>
        
        <div className="flex gap-2">
          <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
            <ShoppingCart size={16} />
            เพิ่มลงตะกร้า
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-xl transition-colors duration-300">
            <Eye size={16} />
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl transition-colors duration-300">
            <Edit size={16} />
          </button>
          <button 
            onClick={() => handleDeleteProduct(product.id)}
            disabled={deleteLoading === product.id}
            className="bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white p-2 rounded-xl transition-colors duration-300"
          >
            {deleteLoading === product.id ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const ProductListItem = ({ product }) => (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-6">
        <img 
          src={product.imageUrl || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&q=80'} 
          alt={product.product_name || 'Product'}
          className="w-24 h-24 object-cover rounded-2xl shadow-md"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&q=80';
          }}
        />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800">{product.product_name || 'ไม่มีชื่อสินค้า'}</h3>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{formatPrice(product.price)}</span>
          </div>
          <p className="text-gray-600 text-sm mb-3">{product.detail || 'ไม่มีรายละเอียด'}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full">{product.category || 'ไม่มีหมวดหมู่'}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                (product.stock || 0) > 20 ? 'bg-emerald-500 text-white' :
                (product.stock || 0) > 10 ? 'bg-amber-500 text-white' :
                'bg-rose-500 text-white'
              }`}>
                คงเหลือ {product.stock || 0} {product.unit || 'ชิ้น'}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl text-sm transition-all duration-300 shadow-lg">
                เพิ่มลงตะกร้า
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-xl transition-colors duration-300">
                <Eye size={16} />
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl transition-colors duration-300">
                <Edit size={16} />
              </button>
              <button 
                onClick={() => handleDeleteProduct(product.id)}
                disabled={deleteLoading === product.id}
                className="bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white p-2 rounded-xl transition-colors duration-300"
              >
                {deleteLoading === product.id ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Trash2 size={16} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg font-medium">กำลังโหลดสินค้า...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <Navbar></Navbar>
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">รายการสินค้า</h1>
            <p className="text-gray-600 mt-2">จัดการและค้นหาสินค้าของคุณ</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 mb-8 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ค้นหาสินค้า..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/70 border border-gray-300/50 rounded-2xl pl-12 pr-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/70 border border-gray-300/50 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-white">
                    {category === 'All' ? 'ทุกหมวดหมู่' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/70 border border-gray-300/50 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            >
              <option value="name" className="bg-white">เรียงตามชื่อ</option>
              <option value="price-low" className="bg-white">ราคา: ต่ำ-สูง</option>
              <option value="price-high" className="bg-white">ราคา: สูง-ต่ำ</option>
              <option value="rating" className="bg-white">คะแนนสูงสุด</option>
              <option value="stock" className="bg-white">คงเหลือมากสุด</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-gray-300/50 rounded-2xl overflow-hidden bg-white/50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                    : 'bg-transparent text-gray-600 hover:bg-white/50'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                    : 'bg-transparent text-gray-600 hover:bg-white/50'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            แสดง <span className="text-indigo-600 font-bold">{filteredProducts.length}</span> รายการ จากทั้งหมด <span className="text-indigo-600 font-bold">{products.length}</span> รายการ
          </p>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProducts.map(product => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* No Products Found */}
        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">ไม่พบสินค้า</h3>
            <p className="text-gray-500 text-lg">ลองเปลี่ยนคำค้นหาหรือตัวกรองดู</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;