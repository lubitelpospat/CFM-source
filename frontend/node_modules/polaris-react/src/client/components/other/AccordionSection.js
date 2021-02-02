import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';
import PropTypes from 'prop-types';
import AccordionTitle from './accordionTitle';

export default class AccordionSection extends Component {

	render() {

		const {
			children,
			title,
			active
		} = this.props;
		return (
			<div>
				<AccordionTitle state = {active} text={title} toggle = {this.props.toggle}/>
				<AnimateHeight duration={ 500 } height={ active ? 'auto' : 0 }>
					{children}
				</AnimateHeight>
			</div>
		);
	}
}
AccordionSection.propTypes = {
	children: PropTypes.node,
	toggle: PropTypes.func,

	title: PropTypes.any,
	active: PropTypes.bool
};
