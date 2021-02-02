import React, { Component } from 'react';
import '../css/atom-loader.css';

import { Container } from 'mdb';
import ServerDropdown from './webpanel/selectServerDropdown.js';

import Loader from './multiPage/Loader';

import { apiFetch, getCookie } from '../util/apiFetch';

export default class WebPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {loading: true, authorised: false};

	}

	componentDidMount(){
		const component = this;
		const authCookie = getCookie('auth');
		if (!authCookie) {
			this.setState({authorised: false, loading: false});
			return null;
		}
		apiFetch('/api/servers')
			.then(function(json){
				if (json.error) return component.setState({error: json.error, loading: false});
				component.setState({authorised: true, servers: json, loading: false});
			});

	}
	render () {
		if (this.state.loading) {
			return (
				<Loader/>
			);

		}

		if (this.state.authorised && !this.state.error) {
			return (

				<Container className="col-md-10 pt-1">
					<Container fluid={true} className="pb-2 ">
						<h1 className="text-center"><span className="badge cyan darken-2">New</span> Polaris web panel</h1>
						<hr className="hr-dark"/>

						<h2>Please choose a server</h2>
						<ServerDropdown servers={this.state.servers}/>
						<h5>The Polaris web panel <strong>Alpha.</strong></h5>
						<p>Change server settings with far greater ease.</p>
						<p>Now in it&apos;s public beta testing phase. Please report errors to us, in our discord and through Sentry.</p>

					</Container>
				</Container>
			);

		} else {
			return (
				<Container className="col-md-10 pt-1">
					<Container fluid={true} className="border border-dark pb-2">
						<h1 className="text-center"><span className="badge cyan darken-2">New</span> Polaris web panel</h1>
						<hr className="hr-dark"/>
						<div className="discord-container">
							<a href="/api/discord/login">Login through discord</a>
						</div>

						{this.state.error ? this.state.error.message : null}
						<h5>The Polaris web panel <strong>Beta.</strong></h5>
						<p>Change server settings with far greater ease.</p>
						<p>Now in it&apos;s public beta testing phase. Please report errors to us, in our discord and through Sentry.</p>
					</Container>
				</Container>
			);

		}

	}
}
