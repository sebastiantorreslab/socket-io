import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import router from "./routes";
import { SocketController } from "./controllers/socket/chat";
import { RoomSocketController } from "./controllers/socket/room";
import { ChatService } from "./services/chat";
import { RoomService } from "./services/room";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(compression());
app.use("/api/v1", router);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const chatService = new ChatService();
const roomService = new RoomService();

new SocketController(io, chatService);
new RoomSocketController(io, roomService);

export { server, io };
