import { Server } from 'miragejs';
import { PollingService } from '../../src/services/PollingService';
import { getMockServerConfig } from '../helpers/TestsMockServerConfig';
import { AuthenticatedState } from '../../src/states/polling/Authenticated';

describe('NotAuthenticated', () => {
    let notAuthenticatedState;
    let pollingService;

    beforeEach(function () {
        pollingService = new PollingService(this.MOCK_REST_API_NAMESPACE);
        pollingService.setState(pollingService.notAuthenticatedState);
        notAuthenticatedState = pollingService.state;
    });

    it('denies .close() call due to no yet established connection.', function () {
        spyOn(console, 'log').and.callThrough();
        notAuthenticatedState.close();
        expect(console.log).toHaveBeenCalledWith(`${String.fromCodePoint(0x274C)} Client not authenticated. Can not close/logout!`);
    });

    it('denies .send() call due to no yet established connection.', function () {
        spyOn(console, 'log').and.callThrough();
        notAuthenticatedState.send();
        expect(console.log).toHaveBeenCalledWith(`${String.fromCodePoint(0x274C)} Client not authenticated. Can not send messages!`);
    });

    it('denies .receive() call due to no yet established connection.', function () {
        spyOn(console, 'log').and.callThrough();
        notAuthenticatedState.receive();
        expect(console.log).toHaveBeenCalledWith(`${String.fromCodePoint(0x274C)} Client not authenticated. Can not receive messages!`);
    });

    it('only allows valid endpoints for .auth() action param', function (done) {
        spyOn(window, 'fetch').and.callThrough();

        notAuthenticatedState.auth('john', 'doe', 'invalidAction').then(() => {
            expect(fetch).not.toHaveBeenCalled();
            done();
        });
    });

    it('allows user authentication on .auth() for creation of a user', function (done) {
        const server = new Server(getMockServerConfig(this.MOCK_REST_API_NAMESPACE, this.MOCK_REST_API_TOKEN, {chatReceive: this.MOCK_API_RESPONSE_CHAT_RECEIVE}));
        
        spyOn(window, 'fetch').and.callThrough();
        spyOn(pollingService, 'setApiToken').and.callThrough();

        const username = 'john', password = 'doe';
        notAuthenticatedState.auth(username, password).then(() => {

            expect(fetch).toHaveBeenCalledWith(`${this.MOCK_REST_API_NAMESPACE}/user/create`, {
                method: 'POST',
                body: JSON.stringify({
                    username, password
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            });
            expect(pollingService.state).toBeInstanceOf(AuthenticatedState);
            expect(pollingService.setApiToken).toHaveBeenCalledWith(this.MOCK_REST_API_TOKEN);

            server.shutdown();
            done();
        });
    });

    it('allows user login on .auth() for login of a user', function (done) {
        const server = new Server(getMockServerConfig(this.MOCK_REST_API_NAMESPACE, this.MOCK_REST_API_TOKEN, {chatReceive: this.MOCK_API_RESPONSE_CHAT_RECEIVE}));
        
        spyOn(window, 'fetch').and.callThrough();

        const username = 'john', password = 'doe';
        notAuthenticatedState.auth(username, password, 'login').then(() => {

            expect(fetch).toHaveBeenCalledWith(`${this.MOCK_REST_API_NAMESPACE}/user/login`, {
                method: 'POST',
                body: JSON.stringify({
                    username, password
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            });

            server.shutdown();
            done();
        });
    });
});
