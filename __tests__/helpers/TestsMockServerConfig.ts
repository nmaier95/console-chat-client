export const getMockServerConfig = (apiNamespace, apiToken, responses = null): any => ({
    environment: 'test',
    routes() {
        this.namespace = apiNamespace;

        this.get('/chat/receive/:id', (schema, request) => responses.chatReceive || ({
            timestamp: 123456789, messages: [
            { chatRoomId: 1, message: 'my message', user: { username: 'Luke'} },
            { chatRoomId: 1, message: 'lorem ipsum', user: { username: 'Lea'} },
            { chatRoomId: 1, message: 'ipsum lorem', user: { username: 'Skywalker'} },
        ]}));

        this.get('/chat/receive/:id/:timestamp', (schema, request) => responses.chatReceiveWithTimestamp || ({
            timestamp: 123456789, messages: [
            { chatRoomId: 1, message: 'my message', user: { username: 'Luke'} },
            { chatRoomId: 1, message: 'lorem ipsum', user: { username: 'Lea'} },
            { chatRoomId: 1, message: 'ipsum lorem', user: { username: 'Skywalker'} },
        ]}));

        this.post('/chat/send', (schema, request) => ({
            chat_room_id: 1,
        }));

        this.post('/user/create', (schema, request) => ({
            token: apiToken,
        }));

        this.post('user/login', () => ({
            token: apiToken,
        }));
    },
});
