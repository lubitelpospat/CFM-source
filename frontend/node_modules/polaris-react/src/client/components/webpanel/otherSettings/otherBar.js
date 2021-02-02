import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody} from 'mdb';

export default class OtherBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false
		};
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render () {
		return (
			<div>
				<Card className="mb-1">
					<CardBody>
						<h4 className="float-left align-middle mr-2">{this.props.name}</h4>
						<small className="text-muted d-md-inline d-none align-bottom">{this.props.text}</small>
						<div className="float-right align-middle">
							{this.props.children}
						</div>
					</CardBody>
				</Card>

			</div>
		);
	}

}
OtherBar.propTypes = {
	name: PropTypes.string.isRequired,
	text: PropTypes.string,
	children: PropTypes.node,
};
