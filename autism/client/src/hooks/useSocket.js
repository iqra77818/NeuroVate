import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function useSocket(token){
  const socketRef = useRef(null);

  useEffect(()=>{
    const URL = import.meta.env.VITE_API_URL?.replace('/api','') || 'http://localhost:4000';
    socketRef.current = io(URL, { auth: { token } });
    return () => { socketRef.current?.disconnect(); };
  }, [token]);

  return socketRef;
}
