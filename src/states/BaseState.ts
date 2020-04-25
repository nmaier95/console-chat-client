import { State } from '../interfaces/State';
import { BaseService } from '../services/BaseService';
import { Message } from '../interfaces/Message';

export abstract class BaseState implements State {
    service: BaseService;

    constructor(service: BaseService) {
        this.service = service;
    }

    abstract setApiToken(token: string): void;
    
    async mounted(): Promise<void> {
        return;
    }
    
    async unmount(): Promise<void> {
        return;
    }
    
    async receive(messages: Message[]): Promise<void> {
        messages.forEach((message: Message) => console.log(`${message.user.username}: ${message.message}`));
    }
    
    abstract async close(): Promise<void>;
    
    abstract async send(message: string): Promise<void>;
    
    abstract async auth(username: string, password: string, action: string): Promise<void>;
    
    abstract setChatRoomId(id: number): void;
}
