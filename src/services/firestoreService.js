// firestoreService.js
import { db } from "./firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

// CREATE product
export const createProducts = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), data);
    return docRef.id;
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};

//product
export const getProduct = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
};
export const getUsers = async () => {
  const usersSnapshot = await getDocs(collection(db, "users"));
  const users = usersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
};


export const updateProduct = async (id, updatedData) => {
  const productRef = doc(db, "products", id);
  await updateDoc(productRef, updatedData);
};

// DELETE
export const deleteProducts = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
    console.log(`ลบสินค้าสำเร็จ: ${productId}`);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดขณะลบสินค้า:", error);
    throw error; // โยน error กลับให้ modal จัดการต่อได้
  }
};
export const deleteUser = async (userId) => {
  try {
    const productRef = doc(db, "products", userId);
    await deleteDoc(productRef);
    console.log(`ลบสินค้าสำเร็จ: ${productId}`);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดขณะลบสินค้า:", error);
    throw error; // โยน error กลับให้ modal จัดการต่อได้
  }
};
export const getProductById = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
};
// ดึงหมวดหมู่ทั้งหมดจาก products แบบไม่ซ้ำ พร้อมนับจำนวน
export const getCategoriesFromProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => doc.data());

    // สร้าง Map สำหรับเก็บ category และนับจำนวน
    const categoryMap = new Map();

    products.forEach(product => {
      const category = product.category || "ไม่ระบุ";
      if (categoryMap.has(category)) {
        categoryMap.set(category, categoryMap.get(category) + 1);
      } else {
        categoryMap.set(category, 1);
      }
    });

    // แปลงเป็น array สำหรับแสดงผล
    const categoriesArray = Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count
    }));

    // เพิ่ม "ทั้งหมด"
    const totalCount = products.length;
    categoriesArray.unshift({ name: "ทั้งหมด", count: totalCount });

    return categoriesArray;
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
};
