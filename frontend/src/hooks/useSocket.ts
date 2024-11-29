// ~/hooks/useSocket.ts
'use client' // Thêm dòng này

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const SOCKET_URL = 'http://localhost:5000'

const useSocket = (event: string) => {
  const [message, setMessage] = useState<any>(null)
  const [socket, setSocket] = useState<Socket | null>(null)
  const { data } = useSession()
  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      query: {
        role: (data as any)?.role
      }
    })
    setSocket(newSocket)

    newSocket.on(event, (receivedData: any) => {
      setMessage(receivedData)
    })

    return () => {
      newSocket.off(event)
      newSocket.disconnect()
    }
  }, [event])

  return message
}

export default useSocket
