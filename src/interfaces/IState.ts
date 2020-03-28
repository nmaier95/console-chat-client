import { SocketService } from '../services/SocketService';

export interface ISocketState {
    socketService: SocketService;
    close(): any;
    send(message: string): any;
    receive(message: string): any;
}
