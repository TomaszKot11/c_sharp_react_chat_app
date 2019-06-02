import * as React from 'react';
import * as moment from 'moment';
import { authenticationService } from '../../services/AuthenticationService';
import { ChatService } from '../../services/ChatService';

export class Chat extends React.Component {
   //msg: HTMLInputElement;
   // panel: HTMLDivElement;
   

    constructor() {
        super();
        this.state = {
            messages: [],
            currentMessage: ''
            };

        let that = this;
        this._chatService = new ChatService((msg) => {
            this.handleOnSocket(that, msg);
        });

        this.handleOnInitialMessagesFetched = this.handleOnInitialMessagesFetched.bind(this);
        this.handlePanelRef = this.handlePanelRef.bind(this);
        this.handleMessageRef = this.handleMessageRef.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this._chatService.fetchInitialMessages(this.handleOnInitialMessagesFetched);
    }

    render() {
        return <div className='panel panel-default'>
            <div className='panel-body panel-chat'
                ref={this.handlePanelRef}>
                <ul>
                    {this.state.messages.map(message =>
                        <li key={message.id}><strong>{message.sender} </strong>
                            ({moment(message.date).format('HH:mm:ss')})<br />
                            {message.message}</li>
                    )}
                </ul>
            </div>
            <div className='panel-footer'>
                <form className='form-inline' onSubmit={this.onSubmit}>
                    <label className='sr-only' htmlFor='msg'>Amount (in dollars)</label>
                    <div className='input-group col-md-12'>

                        <input type='text'
                            value={this.state.currentMessage}
                            onChange={this.handleMessageChange}
                            className='form-control'
                            id='msg'
                            placeholder='Your message'
                            ref={this.handleMessageRef} />
                        <button className='chat-button input-group-addon'>Send</button >
                    </div>
                </form>
                </div>
             <a onClick={this.logout} >Logout</a>
            </div>;
    }

    handleOnInitialMessagesFetched(messages) {
        if(messages != undefined) {
            this.setState({
                messages: messages
            });

            this.scrollDown(this);
         }
    }

    handleOnSocket(that, message) {
        let messages = that.state.messages;
        messages.push(message);
        that.setState({
            messages: messages,
            currentMessage: ''
        });
        that.scrollDown(that);
        that.focusField(that);
    }

    handlePanelRef(div) {
        this.panel = div;
    }
    handleMessageRef(input) {
        this.msg = input;
    }

    handleMessageChange(event) {
        this.setState({
            currentMessage: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        this.addMessage(this);
    }

    addMessage(that) {
        let currentMessage = that.state.currentMessage;
        let userName = JSON.parse(localStorage.getItem('currentUser')).name;
        
        if (currentMessage.length === 0) {
            return;
        }
        
        this._chatService.addMessage(userName, currentMessage);
    }

    logout() {
        authenticationService.logout();
        // poor 'trick'
        window.location.reload(); 
    }

    focusField(that) {
        that.msg.focus();
    }

    scrollDown(that) {
        let div = that.panel;
        div.scrollTop = div.scrollHeight;
    }
}

