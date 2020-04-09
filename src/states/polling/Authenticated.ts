import { State } from '../../interfaces/State';
import { PollingService } from '../../services/PollingService';

export class AuthenticatedState implements State {
    service: PollingService;

    apiToken: string;
    
    constructor(service: PollingService) {
        this.service = service;
    }
    
    close(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async send(message: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async receive(message: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async register(username: string, password: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
