import { ConsoleChat } from './console/Console';
import { Config } from './interfaces/Config';

export function initChat(config: Config): void {
    console = new ConsoleChat(config);
}
