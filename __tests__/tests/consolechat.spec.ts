import { ConsoleChat } from '../../src/console/ConsoleChat'
import { PollingService } from '../../src/services/PollingService';
import { NotAuthenticatedState } from '../../src/states/polling/NotAuthenticated';
import { AuthenticatedState } from '../../src/states/polling/Authenticated';
import { Server } from "miragejs"

describe('ConsoleChat', function () {
    let consoleChat: ConsoleChat;
    let server: Server;

    beforeEach(function () {
        server = new Server({
            environment: 'test',
            routes() {
                this.namespace = "api/v1";


                this.get("/users", (): any => [
                    { id: "1", name: "Luke" },
                    { id: "2", name: "Leah" },
                    { id: "3", name: "Anakin" },
                ])

                this.post("/user/create", (schema, request) => {
                    // let attrs = JSON.parse(request.requestBody)
                    // attrs.id = Math.floor(Math.random() * 100)

                    return {
                        token: '8ß089ß0jopfaf.asdafeaa.feasdip'
                    }
                })

                this.post("user/login", (): any => {
                    token: '8ß089ß0jopfaf.asdafeaa.feasdip'
                })
            },
        });
        // console.log('Server: ', server);
        // spyOn(window, 'fetch');
        consoleChat = new ConsoleChat({ apiUrl: 'api/v1/' });
    });

    afterEach(() => {
        server.shutdown()
    })

    it('uses correct Service-Class', function () {
        expect(consoleChat.getService()).toBeInstanceOf(PollingService);
    });

    it('doesn\'nt send message if client is not authenticated', function () {
        spyOn(consoleChat.getService().state, 'send');
        // const fetchSpy = jasmine.createSpy('fetch', window.fetch);

        consoleChat.chat('message');

        expect(consoleChat.getService().state.send).toHaveBeenCalled();
        // expect(fetchSpy).not.toHaveBeenCalled();

    });

    it('calls fetch on login', function (done) {

        // spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response()));
        // spyOn(consoleChat.getService().state, 'auth');

        // const fetchSpy = jasmine.createSpy('fetch', fetch);
        // const fetchSpy = spyOn(window, 'fetch');
        
        
        // consoleChat.getService().setApiToken = jasmine.createSpy('setApiToken', consoleChat.getService().setApiToken);
        spyOn(consoleChat.getService(), 'setApiToken').and.callThrough();
        spyOn(consoleChat.getService(), 'setState').and.callThrough();
        
        consoleChat.register('username', 'password').then(() => {

            expect(consoleChat.getService().setApiToken).toHaveBeenCalledWith('8ß089ß0jopfaf.asdafeaa.feasdip');
            expect(consoleChat.getService().setState).toHaveBeenCalled();
            expect(consoleChat.getService().state).toBeInstanceOf(AuthenticatedState);
            
            // server.shutdown();

            done();
        });

    });
});
