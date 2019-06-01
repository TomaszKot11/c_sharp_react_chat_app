import 'isomorphic-fetch';

import WebsocketService from './WebsocketService'

export class UsersService {

    constructor(socketCallback) {
        this._userLoggedOn = socketCallback;

        // Chat-Nachrichten vom Server empfangen
        WebsocketService.registerUserLoggedOn((user) => {
            this._userLoggedOn(user);
        });
    }

    fetchLogedOnUsers(fetchUsersCallback) {
        fetch('api/Chat/LoggedOnUsers')
            .then(response => response.json())
            .then(data => {
                fetchUsersCallback(data);
            });
    }
}
