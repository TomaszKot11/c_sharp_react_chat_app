﻿import { HubConnectionBuilder, HubConnection, HttpTransportType, LogLevel, IConnection, IHubConnectionOptions } from '@aspnet/signalr';


class ChatWebsocketService {

    constructor() {
        let url = `http://${document.location.host}/chatter`;

        // create Connection
        // transport
        this._connection = new HubConnectionBuilder().withUrl(url, { transport: HttpTransportType.WebSockets }).configureLogging(LogLevel.Information).build();
        // start connection
        this._connection.start().catch(err => console.error(err, 'red'));
    }

    registerMessageAdded(messageAdded) {
        // get nre chat message from the server
        this._connection.on('MessageAdded', (message) => {
            messageAdded(message);
        });
    }
    sendMessage(userName, message) {
        // send the chat message to the server
        this._connection.invoke('AddMessage', userName, message);
    }

    registerUserLoggedOn(userLoggedOn) {
        // get new user from the server
        this._connection.on('UserLoggedOn', (user) => {
            userLoggedOn(user);
        });
    }
}

const WebsocketService = new ChatWebsocketService();

export default WebsocketService;