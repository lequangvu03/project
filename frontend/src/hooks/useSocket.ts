'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const SOCKET_URL = 'http://localhost:5000'

const useSocket = (event: string) => {
  const [message, setMessage] = useState<any>(null)
  const { data } = useSession()
  const socketRef = useRef<Socket | null>(null) // Dùng ref để lưu socket, tránh tạo lại kết nối

  useEffect(() => {
    if (!socketRef.current) {
      // Chỉ tạo kết nối khi chưa có socket
      socketRef.current = io(SOCKET_URL, {
        query: {
          role: (data as any)?.role || 0
        },
        transports: ['websocket'], // Ưu tiên WebSocket, tránh polling
        reconnectionAttempts: 5, // Số lần thử lại kết nối
        reconnectionDelay: 1000 // Độ trễ giữa các lần thử lại
      })
    }

    const socket = socketRef.current

    // Xử lý sự kiện
    const handleEvent = (receivedData: any) => {
      setMessage(receivedData)
    }
    socket.on(event, handleEvent)

    // Cleanup
    return () => {
      socket.off(event, handleEvent)
    }
  }, [event, data]) // Đảm bảo không tái tạo socket khi re-render

  return message
}

export default useSocket
