import { ISocketState } from '../../interfaces/IState';
import { SocketService } from '../SocketService';

export class OpenState implements ISocketState {
    socketService: SocketService;

    constructor(socketService: SocketService) {
        this.socketService = socketService;
    }
    
    close(): Promise<void> {
        return new Promise((resolve) => {
            this.socketService.socket.close();
            this.socketService.socket.close = () => {
                this.socketService.setState(this.socketService.closedState);
                resolve();
            }
        });
    }

    send(message: string): void {
        this.socketService.socket.send(message);
    }

    receive(message: string): void {
        console.log(message);
    }
}
