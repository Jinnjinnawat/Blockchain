import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/firestoreService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-500">กำลังโหลดข้อมูลสินค้า...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          ❌ ไม่พบข้อมูลสินค้านี้
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left: Image */}
          <div className="md:w-1/2">
            <img
              src={product.imageUrl || "/images/placeholder.png"}
              alt={product.product_name}
              className="w-full h-auto object-cover rounded-2xl shadow-md border border-gray-200"
              onError={(e) => (e.target.src = "/images/placeholder.png")}
            />
          </div>

          {/* Right: Details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.product_name}
            </h1>
            <p className="text-gray-600 mb-4">
              {product.detail || "ไม่มีรายละเอียดสินค้า"}
            </p>

            {/* Price Section */}
            <div className="mb-4">
              {product.originalPrice &&
                product.originalPrice !== product.price && (
                  <div className="text-sm text-gray-400 line-through mb-1">
                    ฿{product.originalPrice}
                  </div>
                )}
              <div className="text-2xl font-bold text-green-600">
                ฿{product.price}
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                หมวดหมู่: {product.category || "อื่นๆ"}
              </span>
              <span className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full">
                คงเหลือ: {product.stock || 0}
              </span>
              {product.rating && (
                <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                  ★ {product.rating}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition">
                สั่งซื้อสินค้า
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition">
                เพิ่มลงรายการโปรด
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
