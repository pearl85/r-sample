import React from 'react';
import {render} from 'react-dom';
import LOGIN from './components/login/login';

render(<LOGIN {...window.__APP_INITIAL_STATE__ }/>, document.getElementById("login"));
