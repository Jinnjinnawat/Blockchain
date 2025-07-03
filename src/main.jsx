import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route,Link, createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './components/FormLogin.jsx'
import Jumbotron from './pages/Jumbotron.jsx';
import FormReg from './components/FormReg.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TableProduct from './components/TableProduct.jsx';
import Listproduct from './pages/Listproduct.jsx'
import { Buffer } from 'buffer'
window.Buffer = Buffer
import Tableuser from './components/Tableuser.jsx';
import ModernFarmerAbout from './pages/About.jsx';
import BlockchainFarmServices from './pages/Services.jsx'
const router = createBrowserRouter([
  {
    path:"/my-products",
    element:<Listproduct></Listproduct>    
  },
  {
    path:"/home",
    element:<Home></Home>    
  },
  {
    path:"/tableuser",
    element:<Tableuser></Tableuser> 
  },
  {
    path:"/tableproduct",
    element:<TableProduct></TableProduct>
  },
  {
    path:"/login",
    element:<Login></Login>  
  },
  {
    path:"/",
    element:<Jumbotron></Jumbotron> 
  },
  {
    path:"/register",
    element:<FormReg></FormReg>
  },
  {
    path:"/dashboard",
    element:<Dashboard></Dashboard>
  }
  ,
  {
    path:"/dashboard",
    element:<Dashboard></Dashboard>
  }
  ,
  {
    path:"/about",
    element:<ModernFarmerAbout></ModernFarmerAbout>
  }
   ,
  {
    path:"/services",
    element:<BlockchainFarmServices></BlockchainFarmServices>
  },

])
createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>
)
