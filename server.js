//Linking the .env file with the MongoDB URI
require('dotenv').config();

//Importing dependencies
const express = require("express");
const WebSocket = require("ws");
const mongoose = require("mongoose");
const http = require("http");
const Message = require("./model/Message");

//Establishing express server
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//Connecting to MongoDB via mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connection to MongoDB is successful ✔️"))
.catch(err => console.error("Connection to MongoDB failed ❌: ", err));

// Serving static files from public directory
app.use(express.static("public"));

// Tracking current number of users
let userCount = 0;

//Connecting to the WebSocket service
wss.on("connection", async (ws) => {
  userCount++;
  broadcastUserCount();

  //Updating users with the last 20 messages (preventing clutter)
  const recentMessages = await Message.find().sort({ timestamp: -1 }).limit(20);
  recentMessages.reverse().forEach((msg) => {
    ws.send(JSON.stringify({ type: "chat", sender: msg.sender, text: msg.text }));
  });

//Receiving messages
ws.on("message", async (data) => {
  try {
    const { text, sender } = JSON.parse(data);
    const msg = new Message({ text, sender });
    await msg.save();

    //Sending message to all clients
    const payload = JSON.stringify({ type: "chat", sender, text });
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  } catch (err) {
    console.error("Invalid message format:", err);
  }
});

//Updating current user count if a user disconnects
  ws.on("close", () => {
    userCount--;
    broadcastUserCount();
  });
});

//Sharing current user count live
function broadcastUserCount() {
  const data = JSON.stringify({ type: "userCount", count: userCount });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

//Establishing server port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Visit http://localhost:${PORT} on your browser`);
});
