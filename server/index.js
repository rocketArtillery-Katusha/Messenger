const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const DbConnect = require("./database.js");
const app = express();
const server = require("http").createServer(app);
const dataEnv = require("./config.js");
const actions = require("./socketActions/actions.js");
const authRoute = require("./routes/auth-route.js");
const userRoute = require("./routes/user-route.js");
const postRoute = require("./routes/post-route.js");
const commentRoute = require("./routes/comment-route.js");
const conversationRoute = require("./routes/conversation-route.js");
const messageRoute = require("./routes/message-route.js");
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

DbConnect();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("uploadsPost"));
app.use(express.static("uploadsUser"));

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);
app.use("/conversation", conversationRoute);
app.use("/message", messageRoute);

server.listen(dataEnv.PORT, () => {
    console.log("server working");
});

// SOCKET
let onlineUsers = [];

io.on("connection", (socket) => {
    socket.on("ADD_USER", (userId) => {
        const socketId = socket.id;
        onlineUsers.push({ socketId, userId });
    });

    socket.on(actions.TOGGLE_REQUEST, (data) => {
        const user = onlineUsers.find((user) => user.userId === data.otherUser.id);

        user && io.to(user.socketId).emit(actions.GET_REQUEST, { user: { ...data.otherUser } });
    });

    socket.on(actions.TOGGLE_FRIEND, (data) => {
        const user = onlineUsers.find((user) => user.userId === data.otherUser.id);

        user && io.to(user.socketId).emit(actions.GET_MY_FRIEND, { user: { ...data.otherUser } });
    });

    socket.on(actions.SEND_MESSAGE, (data) => {
        const user = onlineUsers.find((user) => user.userId !== data.message.senderId);

        user && io.to(user.socketId).emit(actions.GET_MESSAGE, { message: { ...data.message } });
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    });
});
