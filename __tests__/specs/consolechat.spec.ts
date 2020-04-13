import { ConsoleChat } from '../../src/console/ConsoleChat'
import { PollingService } from '../../src/services/PollingService';
import { SocketService } from '../../src/services/SocketService';

describe('ConsoleChat', () => {
    let socketConsole;
    let pollingConsole;
    
    beforeEach(function() {
        pollingConsole = new ConsoleChat({ apiUrl: this.MOCK_REST_API_NAMESPACE });
        socketConsole = new ConsoleChat({ apiUrl: this.MOCK_SOCKET_NAMESPACE });
    });

    it('uses/sets correct Service-Classes', () => {
        expect(pollingConsole.getService()).toBeInstanceOf(PollingService);
        expect(socketConsole.getService()).toBeInstanceOf(SocketService);
    });

    it('passes .send() through to correct service instance', () => {
        spyOn(pollingConsole.getService(), 'send');
        spyOn(socketConsole.getService(), 'send');

        pollingConsole.chat('message');
        socketConsole.chat('message');

        expect(pollingConsole.getService().send).toHaveBeenCalled();
        expect(socketConsole.getService().send).toHaveBeenCalled();
    });

    it('passes .register() through to correct service instance', () => {
        spyOn(pollingConsole.getService(), 'auth');
        spyOn(socketConsole.getService(), 'auth');

        pollingConsole.register('username', 'password');
        socketConsole.register('username', 'password');

        expect(pollingConsole.getService().auth).toHaveBeenCalled();
        expect(socketConsole.getService().auth).toHaveBeenCalled();

    });

    it('passes .login() through to correct service instance', () => {
        spyOn(pollingConsole.getService(), 'auth');
        spyOn(socketConsole.getService(), 'auth');

        pollingConsole.login('username', 'password');
        socketConsole.login('username', 'password');

        expect(pollingConsole.getService().auth).toHaveBeenCalled();
        expect(socketConsole.getService().auth).toHaveBeenCalled();
    });

    it('passes .close() through to correct service instance', () => {
        spyOn(pollingConsole.getService(), 'close');
        spyOn(socketConsole.getService(), 'close');

        pollingConsole.logout();
        socketConsole.logout();

        expect(pollingConsole.getService().close).toHaveBeenCalled();
        expect(socketConsole.getService().close).toHaveBeenCalled();
    });
});
