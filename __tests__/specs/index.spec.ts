import { initChat } from './../../src/index';

describe('index', () => {
    let myConsole: any;
    
    beforeEach(function() {
        initChat({ apiUrl: '' });
        myConsole = console;
    });

    it('extends global console with this\' programs methods', () => {
        expect(myConsole.chat).toBeDefined();
        expect(myConsole.register).toBeDefined();
        expect(myConsole.login).toBeDefined();
        expect(myConsole.logout).toBeDefined();
    });

    it('calls .chat() with correct parameters', () => {
        spyOn(myConsole, 'chat').and.callThrough();

        myConsole.chat('message');

        expect(myConsole.chat).toHaveBeenCalledWith('message');

        expect(myConsole.register).toBeDefined();
        expect(myConsole.login).toBeDefined();
        expect(myConsole.logout).toBeDefined();
    });

    it('calls .register() with correct parameters', () => {
        spyOn(myConsole, 'register').and.callThrough();

        myConsole.register('john', 'doe');

        expect(myConsole.register).toHaveBeenCalledWith('john', 'doe');
    });

    it('calls .login() with correct parameters', () => {
        spyOn(myConsole, 'login').and.callThrough();

        myConsole.login('john', 'doe');

        expect(myConsole.login).toHaveBeenCalledWith('john', 'doe');
    });

    it('calls .logout() with correct parameters', () => {
        spyOn(myConsole, 'logout').and.callThrough();

        myConsole.logout();

        expect(myConsole.logout).toHaveBeenCalledWith();
    });

    it('calls .join() with correct parameters', () => {
        spyOn(myConsole, 'join').and.callThrough();

        myConsole.join(12);

        expect(myConsole.join).toHaveBeenCalledWith(12);
    });
});
