import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Buffer } from 'buffer';
import { CartProvider } from './contexts/CartContext'; // ✅ นำเข้า CartProvider

// นำเข้า pages ทั้งหมด
import Home from './pages/Home.jsx';
import Login from './components/FormLogin.jsx';
import Jumbotron from './pages/Jumbotron.jsx';
import FormReg from './components/FormReg.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TableProduct from './components/TableProduct.jsx';
import Listproduct from './pages/Listproduct.jsx';
import Tableuser from './components/Tableuser.jsx';
import ModernFarmerAbout from './pages/About.jsx';
import BlockchainFarmServices from './pages/Services.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import ContactPage from './pages/Contact.jsx';
import ProductListPage2 from './pages/ProductList.jsx';
import ShoppingCartPage from './pages/Cart.jsx';

window.Buffer = Buffer;

const router = createBrowserRouter([
  { path: "/my-products", element: <Listproduct /> },
  { path: "/home", element: <Home /> },
  { path: "/tableuser", element: <Tableuser /> },
  { path: "/tableproduct", element: <TableProduct /> },
  { path: "/login", element: <Login /> },
  { path: "/", element: <Jumbotron /> },
  { path: "/register", element: <FormReg /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/about", element: <ModernFarmerAbout /> },
  { path: "/services", element: <BlockchainFarmServices /> },
  { path: "/product/:id", element: <ProductDetail /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/productlist/:category", element: <ProductListPage2 /> },
   { path: "/productlist", element: <ProductListPage2 /> },
  { path: "/cart", element: <ShoppingCartPage /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
