import React from 'react';
import {render} from 'react-dom';
import {Head,Foot} from 'common-ui';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <Head></Head>
                </div>
                <div id="main-content" className="login-content">
                    
                </div>
                <Foot></Foot>
            </div>
        );
    }
}