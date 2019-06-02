import * as React from 'react';

export class Layout extends React.Component {
    render() {
        return <div>
            <div className='container-fluid'>
                {this.props.children}
                </div>
        </div>;
    }
}
