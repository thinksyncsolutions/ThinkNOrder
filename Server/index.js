const express = require("express");
const http = require("http");
const { initSocket } = require("./socket/socket"); // Import our new helper
const connectDB = require("./db/db");
const startPingJob = require("./helpers/pingServer");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));

// 🔥 Initialize Socket.io
const io = initSocket(server);
app.set("io", io);

// Routes & Cron
startPingJob();
app.get("/", (req, res) => res.send("THINKNORDER is Alive!"));
app.use("/api", require("./routes"));

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`THINKNORDER is running on port ${port}`);
});