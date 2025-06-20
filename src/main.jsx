import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route,Link, createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './components/FormLogin.jsx'
import Jumbotron from './pages/Jumbotron.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TableProduct from './components/TableProduct.jsx';
import Listproduct from './pages/Listproduct.jsx'

import Tableuser from './components/Tableuser.jsx';
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
    element:<Register></Register>
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

])
createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>
)
