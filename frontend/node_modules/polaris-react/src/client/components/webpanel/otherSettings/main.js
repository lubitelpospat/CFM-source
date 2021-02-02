import React, { Component } from 'react';

import AutoSwitch from './autoVerifySwitch';
import PrefixBox from './prefixBox';
import NicknameBox from './nicknameBox';
import PropTypes from 'prop-types';

class otherSettingsMain extends Component {
	render() {
		return (
			<div id="otherSettings">
				<AutoSwitch value={this.props.settings.autoVerify || false}/>
				<PrefixBox value={this.props.settings.prefix}/>
				<NicknameBox value={this.props.settings.nicknameTemplate}/>
			</div>
		);
	}

}
export default otherSettingsMain;
otherSettingsMain.propTypes = {
	settings: PropTypes.object
};
