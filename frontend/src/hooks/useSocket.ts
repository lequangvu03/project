// ~/hooks/useSocket.ts
'use client' // Thêm dòng này

import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const SOCKET_URL = 'http://localhost:5000'

const useSocket = (event: string) => {
  const [data, setData] = useState<any>(null)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io(SOCKET_URL)
    setSocket(newSocket)

    newSocket.on(event, (receivedData: any) => {
      setData(receivedData)
    })

    return () => {
      newSocket.off(event)
      newSocket.disconnect()
    }
  }, [event])

  return data
}

export default useSocket
