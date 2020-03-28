import { SocketState } from '../../interfaces/State';
import { SocketService } from '../SocketService';

export class ClosedState implements SocketState {
    socketService: SocketService;

    constructor(socketService: SocketService) {
        this.socketService = socketService;
    }
    
    async close(): Promise<void> {
        console.error(`connection already closed`);
    }

    send(message: string): void {
        console.error(`connection closed. can't send message: ${message}`);
    }

    receive(message: string): void {
        console.error(`connection closed. unable to receive messages! Did not sent message: ${message}`);
    }
}
