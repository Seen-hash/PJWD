//Linking MongoDB Atlas URI
require('dotenv').config();

//Loading Node modules and dependencies
const express = require("express");
const WebSocket = require("ws");
const mongoose = require("mongoose");
const http = require("http");
const Message = require("./model/Message");

//Creating server and attaching WebSocket with Express
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//Connecting to MongoDB Atlas with Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection to MongoDB is successful ✔️"))
  .catch(err => console.error("Connection to MongoDB is not successful ❌: ", err));  

//Retrieving files in public folder with Express
app.use(express.static("public"));

//Connecting to WebSocket with Node
wss.on("connection", async (ws) => {
  const recentMessages = await Message.find().sort({ timestamp: -1 }).limit(20);
  recentMessages.reverse().forEach((msg) => {
    ws.send(msg.text);
  });
  ws.on("message", async (message) => {
    const msg = new Message({ text: message });
    await msg.save();

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

//Assigning localhost port for bash
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Visit http://localhost:${PORT} on your browser`);
});
