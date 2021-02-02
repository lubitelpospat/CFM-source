import React from 'react';
import OtherBar from './otherBar';
import Switch from '../switch';
import PropTypes from 'prop-types';
import { changeAutoVerify } from 'settingsManager';

class OtherSwitch extends React.Component {
	constructor (p) {
		super(p);
		this.state = { value: this.props.value || false };
		this.toggle = this.toggle.bind(this);
	}
	toggle () {
		let newValue = !this.state.value;
		changeAutoVerify(newValue);
		this.setState({
			value: newValue
		});

	}
	render() {
		return (
			<OtherBar name="Auto verification" text="If enabled, users will recieve their roles as soon as they join the server. Requires a linked account.">
				<Switch state = {this.state.value} onClick={this.toggle}/>
			</OtherBar>


		);
	}
}
export default OtherSwitch;
OtherSwitch.propTypes = {
	value: PropTypes.bool,
};
