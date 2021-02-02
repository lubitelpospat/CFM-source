/* global Sentry */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Fa } from 'mdb';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { error: null };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({ error });
		Sentry.withScope(scope => {
			Object.keys(errorInfo).forEach(key => {
				scope.setExtra(key, errorInfo[key]);
			});
			Sentry.captureException(error);
		});
	}


	render() {
		if (this.state.error) {
			//render fallback UI
			return (
				<div
					className="alert alert-danger" role="alert"
					onClick={() =>Sentry.showReportDialog()}>

					<p>	<Fa icon="exclamation-triangle"/> Sorry! We&#39;ve hit a bump.</p>
					<p>Our team has been notified, but please click on this lovely red message to fill out a report, if you haven&#39;t already. It&#39;ll help us fix it.</p>
				</div>
			);
		} else {
			//when there's not an error, render children untouched
			return this.props.children;
		}
	}
}
ErrorBoundary.propTypes = {
	children: PropTypes.node
};

export default ErrorBoundary;
