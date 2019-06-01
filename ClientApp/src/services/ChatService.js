import 'isomorphic-fetch';
import WebsocketService from './WebsocketService';

export class ChatService {

    constructor(messageAdded) {
        this._messageAdded = messageAdded;

        // Chat-Nachrichten vom Server empfangen
        WebsocketService.registerMessageAdded((message) => {
            this._messageAdded(message);
        });
    }

    addMessage(message) {
        WebsocketService.sendMessage(message);
    }

    fetchInitialMessages(fetchInitialMessagesCallback: (msg) => void) {
        fetch('api/Chat/InitialMessages')
            .then(response => response.json())
            .then(data => {
                fetchInitialMessagesCallback(data);
            });
    }
}
