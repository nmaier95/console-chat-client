import { Chat } from '../interfaces/Chat';
import { Config } from '../interfaces/Config';
import { SocketService } from '../services/SocketService';

export class ConsoleChat extends Console implements Chat {

    private request: SocketService;

    constructor(config: Config) {
        super();
        this.request = new SocketService(config.socketUrl);
    }

    async chat(message: string): Promise<void> {
        if(!message) return;
        await this.request.send(message);
    }

}
