import { State } from '../interfaces/State';
import { BaseService } from '../services/BaseService';
import { Message } from '../interfaces/Message';

export abstract class BaseState implements State {
    service: BaseService;
    
    async mounted(): Promise<void> {
        return;
    }

    async unmount(): Promise<void> {
        return;
    }

    async receive(messages: Message[]): Promise<void> {
        messages.forEach((message: Message) => console.log(`${message.userName}: ${message.message}`));
    }

    abstract async close(): Promise<void>;

    abstract async send(message: string): Promise<void>;

    abstract async register(username: string, password: string): Promise<void>;
}
