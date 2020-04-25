import { PollingService } from '../../src/services/PollingService';
import { Server } from 'miragejs';
import { getMockServerConfig } from '../helpers/TestsMockServerConfig';


describe('AuthenticatedState', () => {
    let authenticatedState;
    let server;
    let pollingService;

    beforeEach(function () {
        server = new Server(getMockServerConfig(this.MOCK_REST_API_NAMESPACE, this.MOCK_REST_API_TOKEN, {chatReceive: this.MOCK_API_RESPONSE_CHAT_RECEIVE}));

        pollingService = new PollingService(this.MOCK_REST_API_NAMESPACE);
        pollingService.setState(pollingService.authenticatedState);
        authenticatedState = pollingService.state;
    });

    afterEach(function (done) {
        server.shutdown();
        authenticatedState.close().then(() => done());
    });

    it('uses/sets Service-Classes', () => {
        expect(authenticatedState.service).toBeInstanceOf(PollingService);
    });

    it('sets apiToken', function () {
        authenticatedState.setApiToken(this.MOCK_REST_API_TOKEN)
        expect(authenticatedState.apiToken).toEqual(this.MOCK_REST_API_TOKEN);
    });

    it('starts polling on mounted', function (done) {
        authenticatedState.mounted().then(() => {
            expect(authenticatedState.pollingInterval).not.toBeUndefined();
            done();
        });
    });

    it('interrupts creating new interval when one is already going', function (done) {
        authenticatedState.startPolling().then(() => {
            const intervalId = authenticatedState.pollingInterval;

            authenticatedState.startPolling().then(() => {
                expect(authenticatedState.pollingInterval).toEqual(intervalId);
                done();
            });
        });
    });

    it('does not poll messages when a previous polling-request is still loading/ongoing', function (done) {
        spyOn(window, 'fetch');

        authenticatedState.isFetchingMessages = true;

        authenticatedState.pollMessages().then(() => {
            expect(window.fetch).not.toHaveBeenCalled();
            done();
        });
    });

    it('polls messages without timestamp', function (done) {
        spyOn(window, 'fetch').and.callThrough();
        spyOn(authenticatedState, 'receive').and.callThrough();

        authenticatedState.chatRoomId = 1;
        authenticatedState.apiToken = this.MOCK_REST_API_TOKEN;

        authenticatedState.pollMessages().then(() => {
            expect(window.fetch).toHaveBeenCalled();
            expect(authenticatedState.isFetchingMessages).toBeFalse();
            expect(authenticatedState.lastReceivedMessagesTimestamp).toEqual(this.MOCK_API_RESPONSE_CHAT_RECEIVE.timestamp);
            expect(authenticatedState.receive).toHaveBeenCalledWith(this.MOCK_API_RESPONSE_CHAT_RECEIVE.messages);
            done();
        });
    });

    it('builds correct api url', function () {
        authenticatedState.chatRoomId = 101;
        expect(authenticatedState.getReceiveMessagesApiUrl()).toMatch(`./${authenticatedState.chatRoomId}$`);

        authenticatedState.lastReceivedMessagesTimestamp = this.MOCK_API_RESPONSE_CHAT_RECEIVE.timestamp;
        expect(authenticatedState.getReceiveMessagesApiUrl()).toMatch(`./${authenticatedState.chatRoomId}/${this.MOCK_API_RESPONSE_CHAT_RECEIVE.timestamp}$`);
    });

    it('clears interval, apiToken and state on .close()', function (done) {
        spyOn(authenticatedState.service, 'setState').and.callThrough();
        spyOn(window, 'clearInterval').and.callThrough();

        authenticatedState.pollMessages().then(() => {
            authenticatedState.close().then(() => {
                expect(window.clearInterval).toHaveBeenCalled();
                expect(authenticatedState.pollingInterval).toBeNull();
                expect(authenticatedState.apiToken).toBeNull();
                expect(authenticatedState.service.setState).toHaveBeenCalledWith(authenticatedState.service.notAuthenticatedState);
                done();
            });
        });
    });

    it('sends messages', function (done) {
        spyOn(window, 'fetch').and.callThrough();
        spyOn(console, 'log').and.callThrough();

        authenticatedState.send('my message').then(() => {
            expect(window.fetch).toHaveBeenCalled();

            expect(authenticatedState.chatRoomId).toEqual(1);
            expect(console.log).toHaveBeenCalledWith(String.fromCodePoint(0x2705));
            done();
        });
    });

    it('denies .auth() call due to already authenticated.', function () {
        spyOn(console, 'log').and.callThrough();
        authenticatedState.auth();
        expect(console.log).toHaveBeenCalledWith(`${String.fromCodePoint(0x274C)} Client already authenticated. No need to authenticate again.`);
    });

    it('sets chat-room-id', function () {
        spyOn(authenticatedState, 'setChatRoomId').and.callThrough();
        authenticatedState.setChatRoomId(32);
        expect(authenticatedState.setChatRoomId).toHaveBeenCalledWith(32);
        expect(authenticatedState.chatRoomId).toEqual(32);
    });
});
