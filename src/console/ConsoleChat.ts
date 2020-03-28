import { Chat } from '../interfaces/Chat';
import { Config } from '../interfaces/Config';
import { SocketService } from '../services/SocketService';

export class ConsoleChat implements Chat {

    private socketService: SocketService;

    constructor(config: Config) {
        this.socketService = new SocketService(config.socketUrl);
    }

    async chat(message: string): Promise<void> {
        if(!message) return;
        await this.socketService.send(message);
    }

    setUsername(username: string): void {
        this.socketService.setUsername(username);
    }
}
