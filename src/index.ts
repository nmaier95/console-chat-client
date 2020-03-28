import { ConsoleChat } from './console/Console';
import { IConfig } from './interfaces/IConfig';

export function initChat(config: IConfig): void {
    if(!console.hasOwnProperty('chat')) {
        console = new ConsoleChat(config);
    }
}
