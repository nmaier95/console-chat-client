import { SocketState } from '../../interfaces/State';
import { SocketService } from '../SocketService';

export class OpenState implements SocketState {
    socketService: SocketService;

    private username: string;

    constructor(socketService: SocketService) {
        this.socketService = socketService;
    }

    setUsername(username: string): void {
        this.username = username;
    }
    
    close(): Promise<void> {
        return new Promise((resolve) => {
            this.socketService.socket.close();
            this.socketService.socket.close = (): void => {
                this.socketService.setState(this.socketService.closedState);
                resolve();
            }
        });
    }

    send(message: string): void {
        this.socketService.socket.send(`${this.username ? this.username + ': ' : ' '}${message}`);
    }

    receive(message: string): void {
        console.log(message);
    }
}
