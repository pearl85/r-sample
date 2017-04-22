import React from 'react';
import {render} from 'react-dom';
import Header from './src/components/header/header';
import Footer from './src/components/footer/footer';
//import LazilyLoad, { importLazy } from './src/components/common/lazily-load';

var Head = React.createClass({
	render: function() {
		return (
			<Header/>
		);
	}
});

var Foot = React.createClass({
	render: function() {
		return (
			<Footer/>
		);
	}
});


/*var Foot = React.createClass({
	render: function() {
		return (
			<LazilyLoad modules={{
  Footer: () => importLazy(System.import('./src/components/footer/footer')),
}}>
{({Footer}) => (
  <Footer>  </Footer>
)}
</LazilyLoad>
		);
	}
});*/
module.exports = {Head, Foot };
