const socketIO = require("socket.io");

let io;

const initSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinRoom", (restaurantId, branchId) => {
      const roomName = `restaurant:${restaurantId}:branch:${branchId}`;
      socket.join(roomName);
      console.log(`User ${socket.id} joined room: ${roomName}`);
    });

    // 🔔 Waiter Call Logic
    socket.on("callWaiter", (data) => {
      const { restaurantId, branchId, floorName, tableNumber, tableType } = data;
      const roomName = `restaurant:${restaurantId}:branch:${branchId}`;
      
      io.to(roomName).emit("waiterCalled", {
        ...data,
        message: `${tableType} ${tableNumber} on ${floorName} needs a waiter`,
        time: new Date()
      });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initSocket, getIO };