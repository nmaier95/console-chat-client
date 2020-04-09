import { BaseService } from '../services/BaseService';

export interface State {
    service: BaseService;
    close(): Promise<void>;
    send(message: string): Promise<void>;
    receive(message: string): Promise<void>;
    register(username: string, password: string): Promise<void>;
}
