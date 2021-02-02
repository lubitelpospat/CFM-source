import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Fa } from 'mdb';


export default class BackButton extends Component {
	constructor (p) {
		super(p);
		this.onClick = this.onClick.bind(this);
	}
	onClick () {
		this.props.close();
	}
	render () {
		return (
			<Button outline onClick={this.onClick} size="sm"><Fa icon="arrow-left"/> Go back</Button>
		);
	}
}
BackButton.propTypes = {
	close: PropTypes.func.isRequired
};
