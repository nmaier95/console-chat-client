import { ClosedState } from "../states/sockets/ClosedState";
import { OpenState } from "../states/sockets/OpenState";
import { BaseService } from './BaseService';

export class SocketService extends BaseService{
    closedState: ClosedState;
    openState: OpenState;
    socket: WebSocket;
    
    constructor(url: string) {
        super(url);
        this.closedState = new ClosedState(this);
        this.openState = new OpenState(this);
        
        this.setState(this.closedState);
        this.connect(url);
    }

    private async connect(url: string): Promise<void> {
        if(this.state === this.openState) {
            await this.close();
        }
        
        this.socket = new WebSocket(url);
        this.socket.onclose = (): void => this.setState(this.closedState);
        this.socket.onerror = (): void => this.setState(this.closedState);
        this.socket.onmessage = async (event: MessageEvent): Promise<void> => {
            await this.receive(event.data);
        };
        this.socket.onopen = (): void => {
            window.onbeforeunload = (): void => {
                this.close();
            };
            this.setState(this.openState);
        };
    }
}
