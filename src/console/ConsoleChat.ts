import { Chat } from '../interfaces/Chat';
import { Config } from '../interfaces/Config';
import { SocketService } from '../services/SocketService';
import { PollingService } from '../services/PollingService';
import { BaseService } from '../services/BaseService';

export class ConsoleChat implements Chat {

    private service: BaseService;

    getService(): BaseService {
        return this.service;
    }

    constructor(config: Config) {
        this.service = config.apiUrl.startsWith('ws') ? new SocketService(config.apiUrl) : new PollingService(config.apiUrl);
    }

    async chat(message: string): Promise<void> {
        return await this.service.send(message);
    }

    async register(username: string, password: string): Promise<void> {
        await this.service.auth(username, password);
    }

    async login(username: string, password: string): Promise<void> {
        await this.service.auth(username, password, 'login');
    }

    async logout(): Promise<void> {
        await this.service.close();
    }
}
