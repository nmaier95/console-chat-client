import { SocketState } from '../interfaces/State';
import { ClosedState } from "./states/ClosedState";
import { OpenState } from "./states/OpenState";

export class SocketService {
    closedState: SocketState;
    openState: SocketState;
    messageState: SocketState;

    socketState: SocketState;

    socket: WebSocket;
    
    constructor(url: string) {
        this.closedState = new ClosedState(this);
        this.openState = new OpenState(this);
        this.messageState = new OpenState(this);
        
        this.setState(this.closedState);
        this.connect(url);
    }

    connect(url: string): void {
        if(this.socketState === this.openState) {
            this.close();
        }
        
        this.socket = new WebSocket(url);
        this.socket.onclose = (): void => this.setState(this.closedState);
        this.socket.onerror = (): void => this.setState(this.closedState);
        this.socket.onmessage = (message: MessageEvent): void => this.receive(String(message));
        this.socket.onopen = (): void => this.setState(this.openState);
    }

    setState(state: SocketState): void {
        this.socketState = state;
    }

    async close(): Promise<void> {
        await this.socketState.close();
    }

    async send(message: string): Promise<void> {
        this.socketState.send(message);
    }

    receive(message: string): void {
        this.socketState.receive(message);
    }
}
