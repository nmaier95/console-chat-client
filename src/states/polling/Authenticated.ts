import { Message } from '../../interfaces/Message';
import { BaseState } from './../BaseState';
import { PollingService } from '../../services/PollingService';

export class AuthenticatedState extends BaseState {
    service: PollingService;

    apiToken: string;

    chatRoomId: number;

    pollingInterval: number;

    isFetchingMessages: boolean;

    lastReceivedMessagesTimestamp: number;
    
    constructor(service: PollingService) {
        super();
        this.service = service;
    }

    async mounted(): Promise<void> {
        await this.startPolling();
    }

    async startPolling(): Promise<void> {
        if(this.pollingInterval) return;
        this.pollingInterval = window.setInterval(() => this.pollMessages(), 4000);
    }

    async pollMessages(): Promise<void> {
        if(this.isFetchingMessages || !this.chatRoomId || !this.apiToken) {
            return;
        }

        this.isFetchingMessages = true;
        const response = await fetch(`${this.service.apiEndpoint}/chat/receive?chat_room_id=${this.chatRoomId}
                ${this.lastReceivedMessagesTimestamp ? '&timestamp=' + this.lastReceivedMessagesTimestamp : ''}
            `, 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + this.apiToken
                }
            }
        );
        this.isFetchingMessages = false;

        const responseBody = await response.json();
        if(responseBody.error) {
            console.warn('server-error receiving messages.');
        } else {
            this.lastReceivedMessagesTimestamp = responseBody.timestamp;
            this.receive(responseBody.messages);
        }
    }
    
    async close(): Promise<void> {
        window.clearInterval(this.pollingInterval);
        this.pollingInterval = null;
        this.service.setApiToken('');
        this.service.setState(this.service.notAuthenticatedState);
    }
    
    async send(message: string): Promise<void> {
        const response = await fetch(`${this.service.apiEndpoint}/chat/send`, {
            method: 'POST',
            body: JSON.stringify({
                message: message,
                chat_room_id: this.chatRoomId // eslint-disable-line @typescript-eslint/camelcase
            }),
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + this.apiToken,
            }
        });

        const responseBody = await response.json();

        if(responseBody.error) {
            console.warn('server-error sending message.');
        }
    }

    async register(): Promise<void> {
        console.log('Client already signed in. No need to register again.');
    }
}
