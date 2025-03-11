import { Server, Socket } from "socket.io";

import { ChatService } from "../../../services/chat";

import { Message } from "../../../utils/chat";

export class SocketController {

  constructor(private io: Server, private readonly chatService: ChatService) {
    this.setupSocketEvents();
  }

  private setupSocketEvents(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log("Un usuario se ha conectado:", socket.id);

      socket.on("login", (username: string) => {
        this.chatService.addUser(socket.id, username);
        socket.emit("loginSuccess", { username });
      });

      // Evento de envío de mensaje
      socket.on("sendMessage", (message: Message) => {
        const result = this.chatService.sendMessage(message);
        if (result.success) {
          const recipient = Object.values(
            this.chatService.getConnectedUsers()
          ).find((user) => user.username === message.to);
          if (recipient) {
            this.io.to(recipient.id).emit("receiveMessage", message);
          }
        } else {
          socket.emit("error", result.error);
        }
      });

      socket.on("getUsers", () => {
        const users = this.chatService.getConnectedUsers();
        socket.emit("receiveUsers", users);
      });

      // Evento de desconexión
      socket.on("disconnect", () => {
        this.chatService.removeUser(socket.id);
      });
    });
  }
}
