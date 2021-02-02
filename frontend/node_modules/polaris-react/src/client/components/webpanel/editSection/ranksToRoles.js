import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from '../switch';
/*
For editng groups ids
*/

export default class ranksCheckBox extends Component {
	constructor(props) {
		super(props);
		this.state = { value: props.checked };
		this.onClick = this.onClick.bind(this);

	}
	onClick () {
		const newVal = !this.state.value;
		this.props.toggle(newVal);
		this.setState({value: newVal});

	}
	render () {
		return (
			<Switch onClick={this.onClick} state={this.state.value}/>



		);
	}

}
ranksCheckBox.propTypes = {
	checked: PropTypes.bool,
	toggle: PropTypes.func.isRequired
};
