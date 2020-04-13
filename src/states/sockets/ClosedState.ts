import { BaseState } from './../BaseState';
import { SocketService } from '../../services/SocketService';

export class ClosedState extends BaseState {
    service: SocketService;

    constructor(service: SocketService) {
        super(service);
    }

    setApiToken(): void {
        console.log('connection closed. Can not set token.')
    }

    async auth(username: string): Promise<void> {
        console.error(`connection closed. cannot set username ${username}`);
    }
    
    async close(): Promise<void> {
        console.error(`connection already closed`);
    }

    async send(message: string): Promise<void> {
        console.log(`connection closed. can't send message: ${message}`);
    }

    async receive(): Promise<void> {
        console.error(`connection closed. unable to receive messages! Did not sent message.`);
    }
}
