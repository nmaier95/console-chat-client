import { ConsoleChat } from './console/ConsoleChat';
import { Config } from './interfaces/Config';

if(!console.hasOwnProperty('chat')) { // eslint-disable-line no-prototype-builtins
    const consoleChat = new ConsoleChat({apiUrl: 'http://localhost/api/v1/'}); // ws://0.0.0.0:12345/index.php
    
    Object.assign(console, {
            chat: (message: string): void => {
                consoleChat.chat(message);
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
// export function initChat(config: Config): void {
//     console = new ConsoleChat({apiUrl: 'ws://0.0.0.0:12345/index.php'});
// }
