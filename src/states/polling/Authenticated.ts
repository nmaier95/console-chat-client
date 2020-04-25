
import { BaseState } from './../BaseState';
import { PollingService } from '../../services/PollingService';
import { getEmoji, EMOJI } from '../../utils/emoji';

export class AuthenticatedState extends BaseState {
    service: PollingService;

    apiToken: string;

    chatRoomId: number;

    pollingInterval: number;

    isFetchingMessages: boolean;

    lastReceivedMessagesTimestamp: number;
    
    constructor(service: PollingService) {
        super(service);
    }

    setApiToken(token: string): void {
        this.apiToken = token;
    }

    getReceiveMessagesApiUrl(): string {
        return `${this.service.apiEndpoint}/chat/receive/${this.chatRoomId}
            ${this.lastReceivedMessagesTimestamp ? '/' + this.lastReceivedMessagesTimestamp : ''}`
            .replace(/(\r\n|\n|\r|\s)/gm, '');
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
        const response = await fetch(this.getReceiveMessagesApiUrl(),
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
            console.log(`${getEmoji(EMOJI.ERROR)} server-error receiving messages.`);
        } else {
            this.lastReceivedMessagesTimestamp = responseBody.timestamp;
            await this.receive(responseBody.messages);
        }
    }
    
    async close(): Promise<void> {
        window.clearInterval(this.pollingInterval);
        this.pollingInterval = null;
        this.service.setApiToken(null);
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
            console.log(`${getEmoji(EMOJI.ERROR)} server-error sending message. Valid chat-room-id used?`);
        }
        
        this.chatRoomId = responseBody.chat_room_id;

        console.log(getEmoji(EMOJI.CHECK));
    }

    async auth(): Promise<void> {
        console.log(`${getEmoji(EMOJI.ERROR)} Client already authenticated. No need to authenticate again.`);
    }

    setChatRoomId(id: number): void {
        this.chatRoomId = id;
    }
}
