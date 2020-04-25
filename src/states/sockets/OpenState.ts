import { SocketService } from '../../services/SocketService';
import { BaseState } from './../BaseState';

export class OpenState extends BaseState {
    service: SocketService;

    apiToken: string;

    private username: string;
    private password: string;

    constructor(service: SocketService) {
        super(service);
    }

    setApiToken(token: string): void {
        this.apiToken = token;
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
        await this.service.socket.send(`${this.username ? this.username + ': ' : ' '}${message}`);
    }

    setChatRoomId(): void {
        throw new Error("Method not implemented.");
    }
}
