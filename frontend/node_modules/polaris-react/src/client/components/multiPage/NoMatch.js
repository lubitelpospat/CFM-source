import React, { Component } from 'react';
import { Container, Fa, Button } from 'mdb';




class NoMatch extends Component {
	render(){
		return(
			<Container className="col-md-10 text-center">
				<h1><Fa icon="times"/> 404 - Not found</h1>
				<h3>Sorry :( We could not find what you were looking for.</h3>
				<Button tag="a" href="/">Go home</Button>
			</Container>
		);
	}
}

export default NoMatch;
