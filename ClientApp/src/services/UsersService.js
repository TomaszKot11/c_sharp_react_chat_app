import 'isomorphic-fetch';

import WebsocketService from './WebsocketService'

export class UsersService {

    constructor(socketCallback: (user) => void) {
        this._userLoggedOn = socketCallback;

        // Chat-Nachrichten vom Server empfangen
        WebsocketService.registerUserLoggedOn((user) => {
            this._userLoggedOn(user);
        });
    }

    fetchLogedOnUsers(fetchUsersCallback: (msg) => void) {
        fetch('api/Chat/LoggedOnUsers')
            .then(response => response.json())
            .then(data => {
                fetchUsersCallback(data);
            });
    }
}
