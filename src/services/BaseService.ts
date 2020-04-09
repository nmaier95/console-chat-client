import { State } from '../interfaces/State';

export abstract class BaseService {

    state: State;

    apiEndpoint: string;

    constructor(url: string) {
        if(!url.includes('wss') && !url.includes('https')) {
            console.warn('WARNING! Unsecure protocols used! Please use https/wss to make connections secure and to protect your customers sensible data!');
        }
    }
    
    setState(state: State): void {
        this.state = state;
    }

    async register(username: string, password: string): Promise<void> {
        await this.state.register(username, password);
    }

    async receive(message: string): Promise<void> {
        await this.state.receive(message);
    }

    async close(): Promise<void> {
        await this.state.close();
    }

    async send(message: string): Promise<void> {
        await this.state.send(message);
    }
}
