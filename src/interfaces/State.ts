import { BaseService } from '../services/BaseService';
import { Message } from './Message';

export interface State {
    service: BaseService;
    mounted(): Promise<void>;
    unmount(): Promise<void>;
    close(): Promise<void>;
    send(message: string): Promise<void>;
    receive(messages: Message[]): Promise<void>;
    auth(username: string, password: string, action: string): Promise<void>;
}
