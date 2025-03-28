import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './admin/Admin';
import AdminData from './admin/AdminData';
import AdminGameManager from './admin/AdminGameManager';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />
  },
  {
    path:"/admin",
    element: <Admin />,
    children:[
      {index:true, element: <AdminGameManager />},
      {path: 'data', element: <AdminData />},
    ],
  },
])


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);