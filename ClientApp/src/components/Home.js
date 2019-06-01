import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Chat } from './home/Chat';
import { Users } from './home/Users';

export class Home extends React.Component {
    render() {
        return <div className='row'>
            <div className='col-sm-3'>
                <Users />
            </div>
            <div className='col-sm-9'>
                <Chat />
            </div>
        </div>;
    }
}
