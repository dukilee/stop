import Sidebar from './SideBar';
import { Outlet } from 'react-router-dom';

function Admin(){
  return <div>
    <Sidebar />
    <div>
      <Outlet />
    </div>
  </div>
}

export default Admin;