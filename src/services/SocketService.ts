import { ISocketState } from '../interfaces/IState';
import { ClosedState } from "./states/ClosedState";
import { OpenState } from "./states/OpenState";

export class SocketService {
    closedState: ISocketState;
    openState: ISocketState;
    messageState: ISocketState;

    socketState: ISocketState;

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
        this.socket.onclose = () => this.setState(this.closedState);
        this.socket.onerror = () => this.setState(this.closedState);
        this.socket.onmessage = (message: MessageEvent) => this.receive(String(message));
        this.socket.onopen = () => this.setState(this.openState);
    }

    setState(state: ISocketState): void {
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
