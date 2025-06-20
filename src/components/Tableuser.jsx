import React, { Component } from "react";
import NavbarDashboard from "./NavbarDashboard";
import { getUsers, deleteUser } from "../services/firestoreService";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ListGroupWithIcons from "./Listgroupwithicons";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import SuccessAlert from "./SuccessAlert";

export default class Tableuser extends Component {
  state = {
    users: [],
    searchQuery: "",
    showPopup: false,
    selectedUser: null,
    opendropdown: false,
    showAddProductModal: false,
    userToDelete: null,
    showSuccessAlert: false,
  };

  async componentDidMount() {
    try {
      const users = await getUsers(); // ✅ ดึงข้อมูลผู้ใช้งาน
      this.setState({ users });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  openPopup = (user) => {
    const { selectedUser, showPopup } = this.state;
    if (showPopup && selectedUser?.id === user.id) {
      this.closePopup();
    } else {
      this.setState({ showPopup: true, selectedUser: user });
    }
  };

  closePopup = () => {
    this.setState({ showPopup: false, selectedUser: null });
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      opendropdown: !prevState.opendropdown,
    }));
  };

  openAddProductModal = () => {
    this.setState({ showAddProductModal: true });
  };

  closeAddProductModal = () => {
    this.setState({ showAddProductModal: false });
  };

  openDeleteModal = (user) => {
    this.setState({ showDeleteModal: true, userToDelete: user });
  };

  closeDeleteModal = () => {
    this.setState({ showDeleteModal: false, userToDelete: null });
  };

  handleConfirmDelete = async () => {
    const { userToDelete, users } = this.state;
    try {
      await deleteUser(userToDelete.id); // ✅ สมมุติว่า deleteUser คือฟังก์ชันลบ user
      const updated = users.filter((u) => u.id !== userToDelete.id);
      this.setState({
        users: updated,
        showDeleteModal: false,
        userToDelete: null,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("เกิดข้อผิดพลาดขณะลบผู้ใช้งาน กรุณาลองใหม่อีกครั้ง");
    }
  };

  handleUpdateUser = (updatedUser) => {
    this.setState((prevState) => ({
      users: prevState.users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      ),
      showEditModal: false,
      userToEdit: null,
      showSuccessAlert: true,
    }));
    setTimeout(() => {
      this.setState({ showSuccessAlert: false });
    }, 3000);
  };

  openEditModal = (user) => {
    this.setState({
      showEditModal: true,
      userToEdit: user,
    });
  };

  closeEditModal = () => {
    this.setState({
      showEditModal: false,
      userToEdit: null,
    });
  };

  render() {
    const {
      users,
      searchQuery,
      showPopup,
      selectedUser,
      opendropdown,
    } = this.state;

    const filteredUsers = users.filter((u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="flex h-screen">
        <NavbarDashboard />
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <div className="text-2xl py-2">ข้อมูลผู้ใช้งาน</div>
          <div className="flex items-center mb-2 gap-2">
            <input
              type="text"
              placeholder="ค้นหาผู้ใช้งาน..."
              className="border rounded-lg p-2 w-full max-w-sm"
              value={searchQuery}
              onChange={this.handleSearchChange}
            />
            <div className="relative">
              <button
                type="button"
                onClick={this.toggleDropdown}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 inline-flex items-center"
              >
                ตัวกรอง
                <svg className="w-2.5 h-2.5 ms-3" viewBox="0 0 10 6">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {opendropdown && (
                <div className="absolute left-0 z-10 mt-2 w-44 bg-white rounded-lg shadow">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        ทั้งหมด
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        ผู้ดูแลระบบ
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        ผู้ใช้งานทั่วไป
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <button
              className="ml-auto text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={this.openAddProductModal}
            >
              + เพิ่มผู้ใช้งาน
            </button>
          </div>

          <table className="min-w-full text-sm text-left bg-white shadow-md rounded-lg">
            <thead className="text-xs uppercase bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3">ชื่อผู้ใช้งาน</th>
                <th className="px-6 py-3">อีเมล</th>
                <th className="px-6 py-3">บทบาท</th>
                <th className="px-6 py-3">สถานะ</th>
                <th className="px-6 py-3">สถานะ</th>
                <th className="px-6 py-3">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.walletAddress}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => this.openPopup(user)}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <HiOutlineDotsHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    ไม่พบข้อมูลผู้ใช้งาน
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showPopup && selectedUser && (
          <ListGroupWithIcons
            onClose={this.closePopup}
            product={selectedUser}
            onEdit={() => this.openEditModal(selectedUser)}
            onDeleteClick={() => this.openDeleteModal(selectedUser)}
          />
        )}
        {this.state.showAddProductModal && (
          <AddProductModal onClose={this.closeAddProductModal} />
        )}
        {this.state.showEditModal && this.state.userToEdit && (
          <EditProductModal
            product={this.state.userToEdit}
            onClose={this.closeEditModal}
            onSave={this.handleUpdateUser}
          />
        )}
        {this.state.showSuccessAlert && (
          <SuccessAlert
            message="แก้ไขข้อมูลผู้ใช้งานเรียบร้อยแล้ว"
            onClose={() => this.setState({ showSuccessAlert: false })}
          />
        )}
        <ConfirmDeleteModal
          visible={this.state.showDeleteModal}
          onClose={this.closeDeleteModal}
          productId={this.state.userToDelete?.id}
          onDeleted={(deletedId) => {
            const updatedUsers = this.state.users.filter(
              (u) => u.id !== deletedId
            );
            this.setState({ users: updatedUsers });
          }}
        />
      </div>
    );
  }
}
