import React, {Component} from 'react';
import headerCSS from './footer.css';

export default class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="footer">
                <div id="footer-content">Thank You!</div>
            </div>
        );
    }
}