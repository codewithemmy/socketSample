require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { Server } = require("socket.io");
const { createServer } = require("http");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "https://sample-socket.onrender.com" },
});

app.use(cors());
// Define a route for your main application (optional)
app.get("/", (req, res) => {
  res.send("Hello, this is your Express app!");
});

// Socket.io event handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Event fired when a user disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  // Example event: listen for a custom event 'chat message'
  socket.on("chat message", (message) => {
    console.log("Received message:", message);
    // Broadcast the message to all connected clients
    io.emit("chat message", message);
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
