import { BaseState } from './../BaseState';
import { PollingService } from '../../services/PollingService';
import { Message } from '../../interfaces/Message';

export class NotAuthenticatedState extends BaseState {
    service: PollingService;

    constructor(service: PollingService) {
        super();
        this.service = service;
    }

    async close(): Promise<void> {
        console.log('Client not authenticated. Can not close/logout!');
    }

    async send(message: string): Promise<void> {
        console.log('Client not authenticated. Can not send messages!');
    }

    async receive(messages: Message[]): Promise<void> {
        console.log('Client not authenticated. Can not receive messages!');
    }

    async auth(username: string, password: string, action = 'create'): Promise<void> {
        const response = await fetch(`${this.service.apiEndpoint}/user/${action}`, {
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
