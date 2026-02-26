const express = require("express");
const app = express();
require("dotenv").config();

// Connect to DB
const connectDB = require("./database/dbConnect/DbConnect");
connectDB();

const cors = require("cors");
const cookieParser = require("cookie-parser");

const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app); // Attach Express to HTTP server

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://think-n-order.vercel.app"],
    credentials: true,
  })
);

// Initialize Socket.IO
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Attach Socket.IO to app so it can be accessed in controllers
app.set("io", io);

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  // Join room for a specific restaurant (called from frontend on login)
  socket.on("joinRestaurantRoom", (restaurantId, branchId) => {
    const roomName = `restaurant:${restaurantId}:branch:${branchId}`;
    socket.join(roomName);
    console.log(`Socket ${socket.id} joined room ${roomName}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

// Routes

app.get("/", (req, res) => res.send("Server is Alive!"));
app.use("/api", require("./routes")); // 🔥 ONLY THIS

// Start server (ONLY this)
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
