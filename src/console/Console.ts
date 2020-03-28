import { IChat } from '../interfaces/IChat';
import { IConfig } from '../interfaces/IConfig';
import { SocketService } from '../services/SocketService';

export class ConsoleChat extends Console implements IChat {

    private request: SocketService;

    constructor(config: IConfig) {
        super();
        this.request = new SocketService(config.socketUrl);
    }

    async chat(message: string): Promise<void> {
        if(!message) return;
        await this.request.send(message);
    }

}
