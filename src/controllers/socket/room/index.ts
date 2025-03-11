import { Server, Socket } from "socket.io";
import { RoomService } from "../../../services/room/index";
import { MessageData, Room } from "../../../utils/chat";

export class RoomSocketController {
  constructor(private io: Server, private readonly roomService: RoomService) {
    this.setupSocketEvents();
  }

  private setupSocketEvents(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log("Un usuario se ha conectado:", socket.id);

      socket.on("joinRoom", (userId: string, room: Room) => {
        this.roomService.addUserToRoom(userId, room?.id);
        socket.join(room?.id);
        const rooms = this.roomService.getRooms();
        socket.emit("receiveRooms", rooms);
        console.log(`Usuario ${userId} se unió a la sala ${room?.name}`);
      });

      socket.on("leaveRoom", (userId: string, room: Room) => {
        this.roomService.removeUserFromRoom(userId, room?.id);
        socket.leave(room?.id);
        console.log(`Usuario ${userId} abandonó la sala ${room?.id}`);
      });

      socket.on("getRoomUsers", (room: Room) => {
        const users = this.roomService.getRoomUsers(room?.id);
        console.log("users", users);
        socket.emit("receiveRoomUsers", users);
      });

      socket.on("sendMessageToRoom", (message: MessageData, roomId: string) => {
        console.log(message, "room", roomId);
        this.io.to(roomId).emit("receiveMessageRoom", message);
      });

      socket.on("getRooms", () => {
        const rooms = this.roomService.getRooms();
        socket.emit("receiveRooms", rooms);
      });

      socket.on("disconnect", () => {
        console.log("Usuario desconectado:", socket.id);
        this.roomService.removeUserFromAllRooms(socket?.id);
      });
    });
  }
}
