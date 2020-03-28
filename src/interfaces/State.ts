import { SocketService } from '../services/SocketService';

export interface SocketState {
    socketService: SocketService;
    close(): Promise<void>;
    send(message: string): void;
    receive(message: string): void;
}
