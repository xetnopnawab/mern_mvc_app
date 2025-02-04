import dotenv from "dotenv";
import { app } from "./app.js";
import { Server } from "socket.io";
const io = new Server(Server);

dotenv.config({
  path: "./.env",
});

const users = [];
const connections = [];


app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

io.sockets.on("connection", (socket) => {
  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);

  // Disconnect
  socket.on("disconnect", (data) => {
    users.splice(connections.indexOf(socket));
    io.sockets.emit("get users", users);
    connections.splice(connections.indexOf(socket.username), 1);
    console.log("Disconnected: %s sockets connected", connections.length);
  });

  // Send Message
  socket.on("send message", (data) => {
    io.sockets.emit("new message", { msg: data, user: socket.username });
  });

  // New User
  socket.on("new user", (data, cb) => {
    cb(true);
    socket.username = data;
    users.push(socket.username);
    io.sockets.emit("get users", users);
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server is running on port https://localhost:${process.env.PORT}`
  );
});
