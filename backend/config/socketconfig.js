
const jwt = require("jsonwebtoken");

 const io_config =(server)=>{
    const io = require("socket.io")(server,{ cors: { origin: '*',} });
    console.log("connection set for socket :");
     io.use(async (socket, next) => {
         console.log('ready to lisen connection');
        try {
          const token = socket.handshake.query.token;
          const payload = await jwt.verify(token, 'secret');
          socket.userId = payload.userId;
          next();
        } catch (err) {}
      });
      
      io.on("connection", (socket) => {
        console.log("Connected: " + socket.userId);
      
        socket.on("disconnect", () => {
          console.log("Disconnected: " + socket.userId);
        });
      
        socket.on("joinRoom", ({ chatroomId }) => {
          console.log("chat room"+chatroomId );
          socket.join(chatroomId);
          console.log("A user joined chatroom: " + chatroomId);
        });
      
        socket.on("leaveRoom", ({ chatroomId }) => {
          socket.leave(chatroomId);
          console.log("A user left chatroom: " + chatroomId);
        });
      
        socket.on("chatroomMessage", async ({ chatroomId, message }) => {
          if (message.content.trim().length > 0) {
            console.log("Message:"+JSON.stringify(message));
            io.to(chatroomId).emit("newMessage", {
              message
            });
          }
        });

        socket.on("notedata", async ({ chatroomId, message }) => {
          console.log("Save note "+ JSON.stringify(message));
          if (message.notedata.content.trim().length > 0) {
            console.log("Message:"+JSON.stringify(message));
            io.to(chatroomId).emit("Notedata", {
              message
            });
          }
        });
      });

};

module.exports = io_config;