import { ConsoleChat } from '../../src/console/ConsoleChat'
import { AuthenticatedState } from '../../src/states/polling/Authenticated';
import { Server } from 'miragejs';
import { getMockServerConfig } from '../helpers/TestsMockServerConfig';
import { NotAuthenticatedState } from '../../src/states/polling/NotAuthenticated';
import { PollingService } from '../../src/services/PollingService';

describe('PollingService', () => {
    let pollingService: PollingService;
    let server: Server;

    beforeEach(function() {
        server = new Server(getMockServerConfig(this.MOCK_REST_API_NAMESPACE, this.MOCK_REST_API_TOKEN));
        pollingService = new PollingService(this.MOCK_REST_API_NAMESPACE);
    });

    afterEach((done) => {
        server.shutdown();
        pollingService.state.close().then(() => done());
    });

    it('warns when unsecure apiUrl is passed', () => {
        spyOn(console, 'warn');
        new PollingService('http://');
        expect(console.warn).toHaveBeenCalledWith('WARNING! Unsecure protocols used! Please use https/wss to make connections secure and to protect your customers sensible data!');
    });

    it('sets default state to NotAuthenticatedState', () => {
        expect(pollingService.state).toBeInstanceOf(NotAuthenticatedState);
    });

    it('calls lifecycle hooks on state before unsetting old state and setting new state', function() {
        const customPollingService = new PollingService(this.MOCK_REST_API_NAMESPACE);
        spyOn(customPollingService.notAuthenticatedState, 'unmount');
        spyOn(customPollingService.authenticatedState, 'mounted');

        customPollingService.setState(customPollingService.authenticatedState);

        expect(customPollingService.notAuthenticatedState.unmount).toHaveBeenCalled();
        expect(customPollingService.authenticatedState.mounted).toHaveBeenCalled();
        customPollingService.authenticatedState.close();
    });

    it('passes .receive() to NotAuthenticatedState', () => {
        spyOn(pollingService.state, 'receive');

        pollingService.receive({message: 'test', user: { username: 'lorem' }, chatRoomId: 1});

        expect(pollingService.state.receive).toHaveBeenCalled();
    });

    it('passes .send() to NotAuthenticatedState', () => {
        spyOn(pollingService.state, 'send');

        pollingService.send('message');

        expect(pollingService.state.send).toHaveBeenCalled();
    });

    it('calls fetch on login', function(done) {
        spyOn(pollingService, 'setApiToken').and.callThrough();
        spyOn(pollingService, 'setState').and.callThrough();
        
        pollingService.auth('username', 'password').then(() => {

            expect(pollingService.setApiToken).toHaveBeenCalledWith(this.MOCK_REST_API_TOKEN);
            expect(pollingService.setState).toHaveBeenCalled();
            expect(pollingService.state).toBeInstanceOf(AuthenticatedState);

            done();
        });
    });

    it('passes .setChatRoomId() to NotAuthenticatedState', () => {
        spyOn(pollingService.state, 'setChatRoomId');

        pollingService.setChatRoomId(21);

        expect(pollingService.state.setChatRoomId).toHaveBeenCalledWith(21);
    });
});
