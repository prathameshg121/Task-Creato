const jwt = require("jsonwebtoken");

const io_config = (server) => {
  const io = require("socket.io")(server, { cors: { origin: "*" } });
  console.log("connection set for socket :");
  io.use(async (socket, next) => {
    console.log("ready to lisen connection");
    try {
      const token = socket.handshake.query.token;
      const payload = await jwt.verify(token, "secret");
      socket.userId = payload.userId;
      next();
    } catch (err) {}
  });

  io.on("connection", (socket) => {
    console.log("Connected: " + socket.userId);

    socket.on("disconnect", () => {
      console.log("Disconnected: " + socket.userId);
    });

    socket.on("joinGroup", ({ userRoomId }) => {
      console.log("chat room" + userRoomId);
      socket.join(userRoomId);
      console.log("A user joined chatroom: " + userRoomId);
    });

    socket.on("leaveGroup", ({ userRoomId }) => {
      socket.leave(userRoomId);
      console.log("A user left chatroom: " + userRoomId);
    });

    socket.on("UserGroup", async ({ userRoomId, message }) => {
      if (message.content.trim().length > 0) {
        // console.log("Message:" + JSON.stringify(message));
        io.to(userRoomId).emit("newNote", {
          message,
        });
      }
    });

    socket.on("notedata", async ({ userRoomId, message }) => {
      // console.log("Save note " + JSON.stringify(message));
      if (message.notedata.content.trim().length > 0) {
        // console.log("Message:" + JSON.stringify(message));
        io.to(userRoomId).emit("Notedata", {
          message,
        });
      }
    });
  });
};

module.exports = io_config;
