import React from 'react';
import OtherBar from './otherBar';
import PropTypes from 'prop-types';
import {changeNickname} from 'settingsManager';

class NicknameBox extends React.Component {
	constructor (p) {
		super(p);
		this.state = { value: this.props.value || ""};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {

		if (event.target.value.length < 35) {
			this.setState({value: event.target.value, invalid: false});
			changeNickname(event.target.value);
		} else {
			this.setState({invalid: true});
		}

	}
	render() {
		return (
			<OtherBar name="Nickname template" text="Sets users nicknames. Use vars {rankName}, {rankId}, {robloxName} & {discordName}.">

				<input className="form-control form-control-sm" value={this.state.value} onChange={this.handleChange} type="text" placeholder="Template"/>
				{this.state.invalid ? <small className="form-text text-danger mt-0">Must be under 35 chars.</small>: null}
			</OtherBar>


		);
	}
}
export default NicknameBox;
NicknameBox.propTypes = {
	value: PropTypes.string
};
