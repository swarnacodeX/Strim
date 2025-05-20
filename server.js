import express from "express";
import cors from "cors";
import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./mongodb.connect.js"; // ✅ Import the connection function
import authRoutes from "./routes/auth.users.js";
import chatRoutes from "./routes/chat.js";
import itemRoutes from "./routes/items.items.js";
import { Server } from "socket.io";

const app = express();
const port = 2400;
const socketport = 2401;

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Connect to MongoDB
connectDB(); // ✅ Call the function to connect

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/items", itemRoutes);

// Socket.IO logic
io.on('connection', (socket) => {
  socket.on('send-message', ({ newMessage, roomId }) => {
    io.to(roomId).emit('receive-message', newMessage);
  });

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
server.listen(socketport, () => {
  console.log(`Socket listening on port ${socketport}`);
});
