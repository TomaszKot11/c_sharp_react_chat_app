import * as React from 'react';
import { UsersService } from '../../services/UsersService';

export class Users extends React.Component {
   

    constructor() {
        super();
        this.state = {
            users: []
        };

        this.userService = new UsersService(this.handleOnSocket);

        this.handleOnSocket = this.handleOnSocket.bind(this);
        this.handleOnLogedOnUserFetched = this.handleOnLogedOnUserFetched.bind(this);

        this.userService.fetchLogedOnUsers(this.handleOnLogedOnUserFetched);        
    }

    render() {
        return <div className='panel panel-default'>
            <div className='panel-body'>
                <h3>Users online:</h3>
                <ul className='chat-users'>

                    {this.state.users.map(user =>
                        <li key={user.id}>{user.name}</li>
                    )}
                </ul>
            </div>
        </div>;
    }

    handleOnLogedOnUserFetched(users) {        
        this.setState({
            users: users
        });
    }

    handleOnSocket(user) {
        let users = this.state.users;
        users.push(user);
        this.setState({
            users: users
        });
    }
}
