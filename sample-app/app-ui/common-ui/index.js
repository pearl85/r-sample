import React from 'react';
import {render} from 'react-dom';
import {Head, Foot} from './main';

render(<div><Head/><Foot/></div>, document.getElementById("starwars"));
