import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setMainGroup } from 'settingsManager';
import { Button, Fa } from 'mdb';

class ChangeMainGroup extends Component {
	constructor (p) {
		super(p);
		this.state = { value: this.props.value || false };
		this.setGroup = this.setGroup.bind(this);
	}
	setGroup () {
		let set = setMainGroup(this.props.groupId);
		this.setState({value: set || false});
	}

	render() {
		if (this.state.value) {
			// If main group
			return <Button size="sm" disabled className="mt-0"onClick={this.setGroup}><Fa icon="home"/>Set as main group</Button>;
		} else {
			// setGroup is a prop because it needs to re-render this comp and do ext. stuff
			return <Button size="sm" className="mt-0"onClick={this.setGroup}><Fa icon="home"/> Set as main group</Button>;
		}
	}
}
export default ChangeMainGroup;
ChangeMainGroup.propTypes = {
	value: PropTypes.bool,
	groupId: PropTypes.number
};
