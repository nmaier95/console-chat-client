import { ConsoleChat } from './console/ConsoleChat';
import { Config } from './interfaces/Config';

if(!console.hasOwnProperty('chat')) {
    const consoleChat = new ConsoleChat({socketUrl: 'ws://0.0.0.0:12345/index.php'});
    Object.assign(console, {
            chat: (message: string): void => {
                consoleChat.chat(message);
            },
            setUsername: (userName: string): void => {
                consoleChat.setUsername(userName);
            }
        }
    );
}
// export function initChat(config: Config): void {
//     console = new ConsoleChat({socketUrl: 'ws://0.0.0.0:12345/index.php'});
// }
