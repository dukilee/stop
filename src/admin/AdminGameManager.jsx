import { io } from 'socket.io-client';
import { useRef, useState, useEffect } from 'react';
import Sidebar from './SideBar';
import ToggleTable from './ToggleTable';

function AdminData(){
  return <div>
    <ToggleTable />
  </div>
}

export default AdminData;