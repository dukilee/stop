import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

function TestServer() {
  const socketRef = useRef(null);

  useEffect(() => {
    // socketRef.current = io('https://stop-server.onrender.com/', {
    //   transports: ['websocket'],
    // });
    socketRef.current = io('http://127.0.0.1:3001', {
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

    socketRef.current.on('updateClients', (data) => {
      console.log('📩 Received update from server:', data);
      alert(`Another user pressed the button! (${JSON.stringify(data)})`);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handlePress = () => {
    const payload = { user: 'TestUser', time: new Date().toLocaleTimeString() };
    console.log('📤 Sending button press:', payload);
    socketRef.current.emit('buttonPressed', payload);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Real-Time Test</h1>
      <button onClick={handlePress}>Press Me</button>
    </div>
  );
}

export default TestServer;

// // App.js or any component
// import React, { useEffect } from 'react';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:3001'); // Replace with your IP if testing on phone

// function TestServer() {
//   useEffect(() => {
//     // Listen for updates from server
//     socket.on('updateClients', (data) => {
//       console.log('Received update from server:', data);
//       alert(`Another user pressed the button! (${JSON.stringify(data)})`);
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handlePress = () => {
//     const payload = { user: 'TestUser', time: new Date().toLocaleTimeString() };
//     console.log('Sending button press:', payload);
//     socket.emit('buttonPressed', payload);
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>Real-Time Test</h1>
//       <button onClick={handlePress}>Press Me</button>
//     </div>
//   );
// }

// export default TestServer;