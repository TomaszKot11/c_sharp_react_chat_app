import { HubConnectionBuilder, HubConnection, HttpTransportType, LogLevel, IConnection, IHubConnectionOptions } from '@aspnet/signalr';


class ChatWebsocketService {
    //private _connection: HubConnection;

    constructor() {
        var transport = HttpTransportType.WebSockets;
        //let logger = new ConsoleLogger(LogLevel.Information);

        let options = {
            transport: transport
            //logger:logger
        };
        let url = `http://${document.location.host}/chatter`;

        // create Connection
        // transport
        this._connection = new HubConnectionBuilder().withUrl(url, { transport: HttpTransportType.WebSockets }).configureLogging(LogLevel.Information).build();
          //  url,
           // options);
        // start connection
        this._connection.start().catch(err => console.error(err, 'red'));
    }

    registerMessageAdded(messageAdded) {
        // get nre chat message from the server
        this._connection.on('MessageAdded', (message) => {
            messageAdded(message);
        });
    }
    sendMessage(message) {
        // send the chat message to the server
        this._connection.invoke('AddMessage', message);
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