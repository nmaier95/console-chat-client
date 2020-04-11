import { SocketService } from '../../services/SocketService';
import { BaseState } from './../BaseState';
import { Message } from '../../interfaces/Message';

export class OpenState extends BaseState {
    service: SocketService;

    private username: string;
    private password: string;

    constructor(socketService: SocketService) {
        super();
        this.service = socketService;
    }

    async auth(username: string, password: string): Promise<void> {
        this.username = username;
        this.password = password;
    }
    
    close(): Promise<void> {
        return new Promise((resolve) => {
            this.service.socket.close();
            this.service.socket.close = (): void => {
                this.service.setState(this.service.closedState);
                resolve();
            }
        });
    }

    async send(message: string): Promise<void> {
        if(!message) return;
        this.service.socket.send(`${this.username ? this.username + ': ' : ' '}${message}`);
    }
}
