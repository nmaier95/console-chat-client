import { State } from '../interfaces/State';
import { Message } from '../interfaces/Message';

export abstract class BaseService {

    state: State;

    apiEndpoint: string;

    constructor(url: string) {
        if(!url.includes('wss') && !url.includes('https')) {
            console.warn('WARNING! Unsecure protocols used! Please use https/wss to make connections secure and to protect your customers sensible data!');
        }
    }
    
    setState(state: State): void {
        if(this.state) this.state.unmount();
        this.state = state;
        this.state.mounted();
    }

    async auth(username: string, password: string, action = 'create'): Promise<void> {
        await this.state.auth(username, password, action);
    }

    async receive(message: Message): Promise<void> {
        await this.state.receive([message]);
    }

    async close(): Promise<void> {
        await this.state.close();
    }

    async send(message: string): Promise<void> {
        await this.state.send(message);
    }
}
