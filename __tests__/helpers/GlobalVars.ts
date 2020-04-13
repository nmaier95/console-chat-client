


beforeEach(function () {
    // needs to be without slash at the end since only BaseService validates it.
    // It is used at other places as well though.
    this.MOCK_REST_API_NAMESPACE = 'api/v1';
    this.MOCK_REST_API_TOKEN = '8ß089ß0jopfaf.asdafeaa.feasdip';

    this.MOCK_API_RESPONSE_CHAT_RECEIVE = ({
        timestamp: 123456789, 
        messages: [
            { chatRoomId: 1, message: 'my message', user: { username: 'Luke' } },
            { chatRoomId: 1, message: 'lorem ipsum', user: { username: 'Lea' } },
            { chatRoomId: 1, message: 'ipsum lorem', user: { username: 'Skywalker' } },
        ]
    });

    this.MOCK_SOCKET_NAMESPACE = 'wss://0.0.0.0';
});
