import { User } from "../../utils/chat";
import { MessageData } from "../../utils/chat";

export class RoomService {
  private rooms: Record<string, Set<string>> = {};

  addUserToRoom(userId: string, roomId: string): void {
    if (!this.rooms[roomId]) {
      this.rooms[roomId] = new Set();
    }
    this.rooms[roomId].add(userId);
  }

  removeUserFromRoom(userId: string, roomId: string): void {
    if (this.rooms[roomId]) {
      this.rooms[roomId].delete(userId);
      if (this.rooms[roomId].size === 0) {
        delete this.rooms[roomId]; // Eliminar la room si está vacía
      }
    }
  }

  getRoomUsers(roomId: string): string[] {
    return this.rooms[roomId] ? Array.from(this.rooms[roomId]) : [];
  }

  getRooms(): string[] {
    console.log(this.rooms);
    return Object.keys(this.rooms);
  }

  removeUserFromAllRooms(userId: string): void {
    for (const roomId in this.rooms) {
      this.removeUserFromRoom(userId, roomId);
    }
  }
}
