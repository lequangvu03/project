// socket.ts

import { Server } from 'socket.io'
import http from 'http'

// Khởi tạo server HTTP từ Express (nếu bạn đang dùng Express)
import app from '~/index' // Import ứng dụng Express của bạn
const server = http.createServer(app)

// Khởi tạo Socket.IO và export ra
export const io = new Server(server, {
  cors: {
    origin: '*', // Cho phép tất cả các nguồn truy cập (nếu muốn an toàn hơn có thể giới hạn nguồn truy cập)
    methods: ['GET', 'POST']
  }
})

// Sự kiện khi client kết nối
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  // Lắng nghe sự kiện tùy chỉnh, ví dụ: khi admin nhận được thông báo
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// Khởi động server lắng nghe
const PORT =  5000
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`)
})
