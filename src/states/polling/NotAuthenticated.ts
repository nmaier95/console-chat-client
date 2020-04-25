import { BaseState } from './../BaseState';
import { PollingService } from '../../services/PollingService';
import { getEmoji, EMOJI } from '../../utils/emoji';

export class NotAuthenticatedState extends BaseState {
    service: PollingService;

    setApiToken(): void {
        console.log('Client not authenticated. Can not set token.')
    }

    constructor(service: PollingService) {
        super(service);
    }

    async close(): Promise<void> {
        console.log(`${getEmoji(EMOJI.ERROR)} Client not authenticated. Can not close/logout!`);
    }

    async send(): Promise<void> {
        console.log(`${getEmoji(EMOJI.ERROR)} Client not authenticated. Can not send messages!`);
    }

    async receive(): Promise<void> {
        console.log(`${getEmoji(EMOJI.ERROR)} Client not authenticated. Can not receive messages!`);
    }

    async auth(username: string, password: string, action = 'create'): Promise<void> {
        if(action !== 'create' && action !== 'login') {
            return;
        }

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
            this.service.setState(this.service.authenticatedState);
            this.service.setApiToken(responseBody.token);
        }
    }

    setChatRoomId(): void {
        console.log(`${getEmoji(EMOJI.ERROR)} Client not authenticated. Can not join a chat-room.`);
    }
}
