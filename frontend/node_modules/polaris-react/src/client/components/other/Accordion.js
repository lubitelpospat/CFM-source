import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AccordionSection from './AccordionSection';
import AccordionTitle from './accordionTitle';
/*
For editng groups!
Key is supplied to container as it forces constructors to re-run when another edit button is clicked.

*/

class Accordion extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render () {
		let a = this;
		const children = this.props.children.map((child, index) => {

			return React.cloneElement(child, {
				index,
				active: index === a.state.activeIndex,
				// Toggle function either closes all if already open or opens its one
				toggle: () => { index=== a.state.activeIndex ? a.setState({ activeIndex: undefined }) : a.setState({ activeIndex: index });}
			});
		});
		return Object.values(children);
	}


}
Accordion.propTypes = {
	children: PropTypes.node,
};

export { AccordionSection, AccordionTitle, Accordion };
