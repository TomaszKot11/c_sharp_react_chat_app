import { HubConnection, TransportType, ConsoleLogger, LogLevel, IConnection, IHubConnectionOptions } from 'signalr-client-react';


class ChatWebsocketService {
    //private _connection: HubConnection;

    constructor() {
        var transport = TransportType.WebSockets;
        let logger = new ConsoleLogger(LogLevel.Information);

        let options: IHubConnectionOptions = {
            transport: transport,
            logger:logger
        };
        let url = `http://${document.location.host}/chat`;

        // create Connection
        this._connection = new HubConnection(
            url,
            options);
        // start connection
        this._connection.start().catch(err => console.error(err, 'red'));
    }

    registerMessageAdded(messageAdded: (msg) => void) {
        // get nre chat message from the server
        this._connection.on('MessageAdded', (message) => {
            messageAdded(message);
        });
    }
    sendMessage(message) {
        // send the chat message to the server
        this._connection.invoke('AddMessage', message);
    }

    registerUserLoggedOn(userLoggedOn: (user) => void) {
        // get new user from the server
        this._connection.on('UserLoggedOn', (user) => {
            userLoggedOn(user);
        });
    }
}

const WebsocketService = new ChatWebsocketService();

export default WebsocketService;