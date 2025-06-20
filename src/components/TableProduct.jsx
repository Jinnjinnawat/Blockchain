import React, { Component } from "react";
import NavbarDashboard from "./NavbarDashboard";
import { getProduct } from "../services/firestoreService";
import { HiOutlineDotsHorizontal, HiSearch, HiPlus } from "react-icons/hi";
import { BiFilterAlt } from "react-icons/bi";
import ListGroupWithIcons from "../components/Listgroupwithicons";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import SuccessAlert from "./SuccessAlert";
import { deleteProducts } from "../services/firestoreService";

export default class TableProduct extends Component {
  state = {
    products: [],
    searchQuery: "",
    showPopup: false,
    selectedProduct: null,
    opendropdown: false,
    showAddProductModal: false,
    productToDelete: null,
    showSuccessAlert: false,
    popupPosition: { top: 0, left: 0 }, 
  };

  handleUpdateProduct = (updatedProduct) => {
    this.setState((prevState) => ({
      products: prevState.products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      ),
      showEditModal: false,
      productToEdit: null,
      showSuccessAlert: true,
    }));
    setTimeout(() => {
      this.setState({ showSuccessAlert: false });
    }, 3000);
  };
  openPopup = (product, event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const scrollTop = window.scrollY;
  const scrollLeft = window.scrollX;

  if (this.state.showPopup && this.state.selectedProduct?.id === product.id) {
    this.closePopup();
  } else {
    this.setState({
      showPopup: true,
      selectedProduct: product,
      popupPosition: {
        top: rect.bottom + scrollTop + 4,
        left: rect.left + scrollLeft,
      },
    });
  }
};

  openEditModal = (product) => {
    this.setState({
      showEditModal: true,
      productToEdit: product,
    });
  };

  closeEditModal = () => {
    this.setState({
      showEditModal: false,
      productToEdit: null,
    });
  };

  async componentDidMount() {
    try {
      const products = await getProduct();
      this.setState({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  openAddProductModal = () => {
    this.setState({ showAddProductModal: true });
  };

  closeAddProductModal = () => {
    this.setState({ showAddProductModal: false });
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  openPopup = (product) => {
    const { selectedProduct, showPopup } = this.state;
    if (showPopup && selectedProduct?.id === product.id) {
      this.closePopup();
    } else {
      this.setState({ showPopup: true, selectedProduct: product });
    }
  };

  closePopup = () => {
    this.setState({ showPopup: false, selectedProduct: null });
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      opendropdown: !prevState.opendropdown,
    }));
  };

  openDeleteModal = (product) => {
    this.setState({ showDeleteModal: true, productToDelete: product });
  };

  closeDeleteModal = () => {
    this.setState({ showDeleteModal: false, productToDelete: null });
  };

  handleConfirmDelete = async () => {
    const { productToDelete, products } = this.state;

    try {
      await deleteProducts(productToDelete.id);
      const updated = products.filter((p) => p.id !== productToDelete.id);

      this.setState({
        products: updated,
        showDeleteModal: false,
        productToDelete: null,
      });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดขณะลบสินค้า:", error);
      alert("เกิดข้อผิดพลาดขณะลบสินค้า กรุณาลองใหม่อีกครั้ง");
    }
  };

  getStockStatus = (stock) => {
    if (stock === 0) return { color: 'bg-red-100 text-red-800', text: 'หมดแล้ว' };
    if (stock <= 10) return { color: 'bg-yellow-100 text-yellow-800', text: 'เหลือน้อย' };
    return { color: 'bg-green-100 text-green-800', text: 'พร้อมขาย' };
  };

  render() {
    const { products, searchQuery, showPopup, selectedProduct, opendropdown } =
      this.state;
    const filteredProducts = products.filter((p) =>
      p.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="flex h-screen bg-gray-50">
        <NavbarDashboard />
        <div className="flex-1 overflow-auto">
          {/* Header Section */}
          <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
            <div className="px-8 py-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">รายการสินค้า</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>ทั้งหมด {filteredProducts.length} รายการ</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="ค้นหาชื่อสินค้า..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    value={searchQuery}
                    onChange={this.handleSearchChange}
                  />
                </div>

                <div className="flex items-center gap-3">
                  {/* Filter Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={this.toggleDropdown}
                      className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    >
                      <BiFilterAlt className="h-4 w-4 mr-2" />
                      ประเภทสินค้า
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {opendropdown && (
                      <div className="absolute right-0 z-20 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-1">
                        <a href="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition duration-150">
                          รายการทั้งหมด
                        </a>
                        <a href="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition duration-150">
                          สินค้าคงเหลือน้อย
                        </a>
                        <a href="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition duration-150">
                          สินค้าที่หมดแล้ว
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Add Product Button */}
                  <button
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition duration-200 shadow-lg"
                    onClick={this.openAddProductModal}
                  >
                    <HiPlus className="h-4 w-4 mr-2" />
                    เพิ่มสินค้า
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="p-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        สินค้า
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ประเภท
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        รายละเอียด
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        จำนวน
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        หน่วย
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ราคา
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        รูป
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        จัดการ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredProducts.map((product, index) => {
                      const stockStatus = this.getStockStatus(product.stock);
                      return (
                        <tr 
                          key={product.id} 
                          className="hover:bg-gray-50 transition duration-150 ease-in-out"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12">
                                {product.imageUrl ? (
                                  <img
                                    className="h-12 w-12 rounded-lg object-cover ring-2 ring-gray-200"
                                    src={product.imageUrl}
                                    alt={product.product_name}
                                  />
                                ) : (
                                  <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-gray-900">
                                  {product.product_name}
                                </div>
                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color} mt-1`}>
                                  {stockStatus.text}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate" title={product.detail}>
                              {product.detail}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm font-semibold text-gray-900">
                                {product.stock}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {product.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-semibold text-gray-900">
  ฿{Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt="Product"
                                className="h-16 w-16 object-cover rounded-lg ring-2 ring-gray-200"
                              />
                            ) : (
                              <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-xs text-gray-500">ไม่มีรูป</span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                               onClick={(e) => this.openPopup(product, e)}
                              className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition duration-200"
                            >
                              <HiOutlineDotsHorizontal size={20} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">ไม่พบข้อมูลสินค้า</h3>
                    <p className="mt-1 text-sm text-gray-500">เริ่มต้นด้วยการเพิ่มสินค้าใหม่</p>
                    <div className="mt-6">
                      <button
                        onClick={this.openAddProductModal}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <HiPlus className="h-4 w-4 mr-2" />
                        เพิ่มสินค้า
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modals and Popups */}
        {showPopup && selectedProduct && (
          <ListGroupWithIcons
            onClose={this.closePopup}
            product={selectedProduct}
            onEdit={() => this.openEditModal(selectedProduct)}
            onDeleteClick={() => this.openDeleteModal(selectedProduct)}
             position={this.state.popupPosition}
          />
        )}
        
        {this.state.showAddProductModal && (
          <AddProductModal onClose={this.closeAddProductModal} />
        )}
        
        {this.state.showEditModal && this.state.productToEdit && (
          <EditProductModal
            product={this.state.productToEdit}
            onClose={this.closeEditModal}
            onSave={this.handleUpdateProduct}
          />
        )}
        
        {this.state.showSuccessAlert && (
          <SuccessAlert
            message="แก้ไขข้อมูลสินค้าเรียบร้อยแล้ว"
            onClose={() => this.setState({ showSuccessAlert: false })}
          />
        )}
        
        <ConfirmDeleteModal
          visible={this.state.showDeleteModal}
          onClose={this.closeDeleteModal}
          productId={this.state.productToDelete?.id}
          onDeleted={(deletedId) => {
            const updatedProducts = this.state.products.filter(
              (p) => p.id !== deletedId
            );
            this.setState({ products: updatedProducts });
          }}
        />
      </div>
    );
  }
}