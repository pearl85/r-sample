import React, {Component} from 'react';
import headerCSS from './header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="header">
                <div id="header-title">Welcome to React!</div>
            </div>
        );
    }
}