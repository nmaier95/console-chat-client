import { State } from '../../interfaces/State';
import { SocketService } from '../../services/SocketService';

export class OpenState implements State {
    service: SocketService;

    private username: string;
    private password: string;

    constructor(socketService: SocketService) {
        this.service = socketService;
    }

    async register(username: string, password: string): Promise<void> {
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

    async receive(message: string): Promise<void> {
        console.log(message);
    }
}
