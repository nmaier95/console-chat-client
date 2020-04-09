import { State } from '../../interfaces/State';
import { SocketService } from '../../services/SocketService';

export class ClosedState implements State {
    service: SocketService;

    constructor(socketService: SocketService) {
        this.service = socketService;
    }

    async register(username: string): Promise<void> {
        console.error(`connection closed. cannot set username ${username}`);
    }
    
    async close(): Promise<void> {
        console.error(`connection already closed`);
    }

    async send(message: string): Promise<void> {
        console.error(`connection closed. can't send message: ${message}`);
    }

    async receive(message: string): Promise<void> {
        console.error(`connection closed. unable to receive messages! Did not sent message: ${message}`);
    }
}
