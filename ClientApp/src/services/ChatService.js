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

    addMessage(userName, message) {
        WebsocketService.sendMessage(userName, message);
    }

    fetchInitialMessages(fetchInitialMessagesCallback) {
        fetch('api/Chat/InitialMessages')
            .then(response => {
                //console.log(response);
                //for(var i =0; i<10; i++)
                  //  console.log(response);
                response.json().then(validResponse => {
                    fetchInitialMessagesCallback(validResponse);
                }).then(objectmy => {
                    console.log('Error occured!');
                    console.log(objectmy);
                });
               })
            .then(data => {
                console.log('Error');
                console.log(data);
            });
    }
}
