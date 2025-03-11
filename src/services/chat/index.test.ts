// server/services/ChatService.test.ts
import { ChatService } from ".";
import { Message } from "../../utils/chat";

describe('ChatService', () => {
  let chatService: ChatService;

  beforeEach(() => {
    chatService = new ChatService();
  });

  test('debe agregar un usuario correctamente', () => {
    chatService.addUser('socket1', 'usuario1');
    const users = chatService.getConnectedUsers();
    expect(users).toHaveLength(1);
    expect(users[0].username).toBe('usuario1');
  });

  test('debe eliminar un usuario correctamente', () => {
    chatService.addUser('socket1', 'usuario1');
    chatService.removeUser('socket1');
    const users = chatService.getConnectedUsers();
    expect(users).toHaveLength(0);
  });

  test('debe enviar un mensaje correctamente', () => {
    chatService.addUser('socket1', 'usuario1');
    chatService.addUser('socket2', 'usuario2');

    const message: Message = {
      from: 'usuario1',
      to: 'usuario2',
      message: 'Hola',
    };

    const result = chatService.sendMessage(message);
    expect(result.success).toBe(true);
  });

  test('debe fallar si el destinatario no existe', () => {
    chatService.addUser('socket1', 'usuario1');

    const message: Message = {
      from: 'usuario1',
      to: 'usuario2',
      message: 'Hola',
    };

    const result = chatService.sendMessage(message);
    expect(result.success).toBe(false);
    expect(result.error).toBe('Usuario no encontrado');
  });
});