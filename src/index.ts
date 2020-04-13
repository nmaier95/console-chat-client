import { ConsoleChat } from './console/ConsoleChat';
import { Config } from './interfaces/Config';


export function initChat(config: Config): void {
    if(!console.hasOwnProperty('chat')) { // eslint-disable-line no-prototype-builtins
        const consoleChat = new ConsoleChat(config); // ws://0.0.0.0:12345/index.php
        
        Object.assign(console, {
                chat: (message: string): string => {
                    consoleChat.chat(message);
                    return 'sending...';
                },
                register: (userName: string, password: string): void => {
                    consoleChat.register(userName, password);
                },
                login: (userName: string, password: string): void => {
                    consoleChat.login(userName, password);
                },
                logout: (): void => {
                    consoleChat.logout();
                },
            }
        );
    }
}
