import { Chat } from '../interfaces/Chat';
import { Config } from '../interfaces/Config';
import { SocketService } from '../services/SocketService';
import { PollingService } from '../services/PollingService';
import { BaseService } from '../services/BaseService';

export class ConsoleChat implements Chat {

    private service: BaseService;

    constructor(config: Config) {
        this.service = config.apiUrl.startsWith('ws') ? new SocketService(config.apiUrl) : new PollingService(config.apiUrl);
    }

    async chat(message: string): Promise<void> {
        await this.service.send(message);
    }

    register(username: string, password: string): void {
        this.service.register(username, password);
    }
}
