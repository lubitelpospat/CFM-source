import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Fa } from 'mdb';

/*
For editng groups!
Key is supplied to container as it forces constructors to re-run when another edit button is clicked.

*/

export default class AccordionTitle extends Component {
	constructor(props) {
		super(props);

	}


	render () {
		return (

			<Card className="mb-1" onClick={this.props.toggle} style={{cursor: 'pointer'}}>
				<CardBody>
					{this.props.text}
					<Fa icon= {this.props.state ? "angle-down" : "angle-right"} className="float-right"/>
				</CardBody>
			</Card>

		);
	}

}
AccordionTitle.propTypes = {
	text: PropTypes.any.isRequired,
	state: PropTypes.bool,
	toggle: PropTypes.func.isRequired
};
