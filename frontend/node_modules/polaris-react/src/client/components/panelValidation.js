import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ServerPanel from './webpanel/serverPanel';
import Loader from './multiPage/Loader';

import { getSettings } from 'settingsManager';
import { Fa, CardHeader, CardBody, Card } from 'mdb';

const propTypes = {
	match: PropTypes.object,
};

export default class WebPanelMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {loading: true, invalid: false};

	}
	async componentDidMount() {
		if (this.props.match.params.id) {
			const component = this;

			const res = await getSettings(this.props.match.params.id);
			if (!res) return; // redirect. stop
			if (res.error) {
				component.setState({invalid: true, error: res.error});
				return;
			}
			component.setState({settings: res, loading: false});
			window._discordServerId = this.props.match.params.id;
		}
	}
	render () {
		if (this.state.invalid) {
			if (this.state.error.status === 403) {
				return (
					<div className="mt-1 col-md-4 mx-auto">
						<Card className="text-white bg-danger mb-3 text-center">
							<CardHeader>Invalid Id!</CardHeader>
							<CardBody>
								<h5 className="card-title">The ID you provided was invalid or you do not have permission.</h5>
								<p className="card-text text-white" >Please get the correct server ID, or use the drop down menu. Polaris is not in the server you provided.</p>
								<p>{this.state.error.message}</p>
							</CardBody>
						</Card>
					</div>);
			}
			return (
				<div className="mt-1 col-md-4 mx-auto">
					<div className="card text-white bg-danger mb-3 text-center ">
						<div className="card-header">An error has occured</div>
						<div className="card-body">
							<h5 className="card-title">HTTP Error {this.state.error.status}</h5>
							<p className="card-text text-white" >{this.state.error.message}</p>
						</div>
					</div>
				</div>);
		} else {
			if (this.state.loading) return <Loader/>;
			return <ServerPanel settings={this.state.settings}/>;
		}
	}
}
WebPanelMenu.propTypes = propTypes;
