const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
require("dotenv").config();
require("./config/database");

const { Socket } = require("socket.io");

const cors = require("cors");

const app = express();

// app.use(logger("dev"));
app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(cors());

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5001",
    methods: ["GET", "POST"],
  },
});

// check the connection of socket from client
let onlineUsers = [];
io.on("connection", (socket) => {
  // socket events will be here
  socket.on("join-room", (userId) => {
    socket.join(userId);
  });

  // send message to clients (who are present in members array)
  socket.on("send-message", (message) => {
    io.to(message["members"][0])
      .to(message["members"][1])
      .emit("receive-message", message);
  });

  // clear unread messages
  socket.on("clear-unread-messages", (data) => {
    io.to(data.members[0])
      .to(data.members[1])
      .emit("unread-messages-cleared", data);
  });

  // typing event
  socket.on("typing", (data) => {
    io.to(data.members[0]).to(data.members[1]).emit("started-typing", data);
  });

  // online users

  socket.on("came-online", (userId) => {
    if (!onlineUsers.includes(userId)) {
      onlineUsers.push(userId);
    }

    io.emit("online-users-updated", onlineUsers);
  });
});

// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
// app.use(express.static(path.join(__dirname, 'build')));

app.use(require("./config/checkToken"));

// Put API routes here, before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server

// new impl
app.use("/api/chats", require("./routes/api/chatsRoute"));

app.use("/api/messages", require("./routes/api/messageRoute"));

const port = process.env.PORT || 5001;

server.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
