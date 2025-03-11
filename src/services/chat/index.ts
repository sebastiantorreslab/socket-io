import { User, Message } from "../../utils/chat";

export class ChatService {
    private users: Record<string, User> = {};


    addUser(socketId: string, username: string): void {
        this.users[socketId] = { id: socketId, username };
        console.log(`${username} ha iniciado sesión.`);
    }

    removeUser(socketId: string): void {
        const username = this.users[socketId]?.username;
        if (username) {
            console.log(`${username} se ha desconectado.`);
            delete this.users[socketId];
        }
    }

    sendMessage(message: Message): { success: boolean; error?: string } {
        const recipient = Object.values(this.users).find(
            (user) => user.username === message.to
        );

        if (!recipient) {
            return { success: false, error: 'Usuario no encontrado' };
        }
        return { success: true };
    }

    getConnectedUsers(): User[] {
        return Object.values(this.users);
    }
    
}
