import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://192.168.31.94:3000",
  },
});

let onlineUsers = [];

const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addNewUser(userId, socket.id);
    for (const user of onlineUsers) {
      io.to(user.socketId).emit("newUser", onlineUsers);
    }
    console.log(onlineUsers);
  });

  socket.on("logOut", (userId) => {
    const reciever = getUser(userId)
    removeUser(reciever.socketId);
    console.log(reciever, onlineUsers)
    for (const user of onlineUsers) {
      io.to(user.socketId).emit("newUser", onlineUsers);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(onlineUsers);
    for (const user of onlineUsers) {
      io.to(user.socketId).emit("newUser", onlineUsers);
    }
  });

  socket.on("sendMessage", ({userId, chatId}) => {
    console.log(userId)
    const reciever = getUser(userId)
    console.log(reciever);
    if (reciever){
        io.to(reciever.socketId).emit("newMessage", chatId)
    }

  })
});

io.listen(8000);
