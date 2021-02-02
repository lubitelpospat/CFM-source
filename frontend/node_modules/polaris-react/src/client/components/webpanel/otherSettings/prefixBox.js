import React from 'react';
import OtherBar from './otherBar';
import PropTypes from 'prop-types';
import { changePrefix } from 'settingsManager';

class OtherSwitch extends React.Component {
	constructor (p) {
		super(p);
		this.state = { value: this.props.value || "."};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {

		if (event.target.value.length < 3) {
			this.setState({value: event.target.value, invalid: false});
			changePrefix(event.target.value);
		} else {
			this.setState({invalid: true});
		}

	}
	render() {
		return (
			<OtherBar name="Command prefix" text="Sets the prefix for your server. Up to 2 chars.">

				<input className="form-control form-control-sm" value={this.state.value} onChange={this.handleChange} type="text" placeholder="Prefix"/>
				{this.state.invalid ? <small className="form-text text-danger mt-0">Prefix must be 1 or 2 characters.</small>: null}
			</OtherBar>


		);
	}
}
export default OtherSwitch;
OtherSwitch.propTypes = {
	value: PropTypes.string
};
