import { State } from '../../interfaces/State';
import { PollingService } from '../../services/PollingService';

export class NotAuthenticatedState implements State {
    service: PollingService;

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
        const response = await fetch(`${this.service.apiEndpoint}/user/create`, {
            method: 'POST',
            body: JSON.stringify({
                username, password
            }),
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });

        const responseBody = await response.json();

        if(!responseBody.error && responseBody.token) {
            this.service.setApiToken(responseBody.token);
            this.service.setState(this.service.authenticatedState);
        }
    }
    
}
