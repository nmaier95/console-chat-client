import { BaseService } from './BaseService';
import { NotAuthenticatedState } from '../states/polling/NotAuthenticated';
import { AuthenticatedState } from '../states/polling/Authenticated';

export class PollingService extends BaseService {
    notAuthenticatedState: NotAuthenticatedState;
    authenticatedState: AuthenticatedState;
    apiEndpoint: string;

    constructor(url: string) {
        super(url);

        this.apiEndpoint = url.endsWith('/') ? url.slice(0, -1) : url;
        this.notAuthenticatedState = new NotAuthenticatedState(this);
        this.authenticatedState = new AuthenticatedState(this);

        this.setState(this.notAuthenticatedState);
    }

    setApiToken(token: string): void {
        this.authenticatedState.apiToken = token;
    }
}
