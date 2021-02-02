// Seperate to allow for much smaller reloading of component.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fa } from 'mdb';
import { apiFetch } from '../../util/apiFetch';
export default class BindEditor extends Component {
	constructor (p) {
		super(p);
		this.state = {};
	}
	async componentDidMount () {
		if (window._discordServerId) {
			let res=  await apiFetch('/api/servers');
			if (!res || res.error) return;
			for (let current of res) {
				if (current.id === window._discordServerId) {
					this.setState({server: current});
				}
			}
		}

	}
	render ( ) {
		if (this.state.server) {
			return <h1><small>Server: </small>{this.state.server.name}</h1>;
		} else {
			return null;
		}
	}



}
BindEditor.propTypes = {
	rank: PropTypes.number,
	exclusive: PropTypes.bool,
	groupId: PropTypes.number
};
