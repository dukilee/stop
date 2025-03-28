import { io } from 'socket.io-client';
import { useRef, useState, useEffect } from 'react';
import Sidebar from './SideBar';
import { Outlet } from 'react-router-dom';

function Admin(){
  const socketRef = useRef(null);
  const [number, updateNumber] = useState(19);
  useEffect(() => {
    console.log('Trying to connect to '+import.meta.env.VITE_SOCKET_URL+'...');
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ['websocket'],
    });

    socketRef.current.on('connect', () => {
      console.log('✅ Connected to server');
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('❌ Connection error:', err.message);
    });

    socketRef.current.on('disconnect', (reason) => {
      console.warn('⚠️ Disconnected:', reason);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const randomNumber = () => {
    return Math.floor(Math.random()*30 - 10);
  }

  const generateNewNumber = () => {
    const val = randomNumber();
    socketRef.current.emit('nextNumber', {val});
    console.log(val);
    updateNumber(val);
  }


  return <div>
    <Sidebar />
    <div>
      {number}
      <button onClick={generateNewNumber}>New number</button>
      <Outlet />
    </div>
  </div>
}

export default Admin;