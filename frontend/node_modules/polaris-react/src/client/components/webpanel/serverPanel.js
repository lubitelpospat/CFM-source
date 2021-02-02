import React, { Component, Fragment } from 'react';

import { Container, Row } from 'mdb';
import GroupsSection from './groups/groupsSection';
import OtherSection from './otherSettings/main';
import EditSection from './editSection/editMain';

import PropTypes from 'prop-types';
import SideBar from './sideBar';

import { getGroupInfo } from '../../util/localStorage';
import { getSettings } from 'settingsManager';

import BackButton from '../other/backButton';
import ServerLabel from './serverLabel';
import EditPopup from './editPopup';

/*
For when a user has been validated,
and the server exists. Contains the actual options etc.
*/
export default class serverPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {settings: props.settings};
		this.editGroup = this.editGroup.bind(this);
		this.closeGroup = this.closeGroup.bind(this);

	}
	render () {
		if (this.state.editing) {

			return (
				<Fragment>
					<Row>
						<SideBar />
						<Container className="col-md-8 pt-1 pb-9">
							<BackButton close={this.closeGroup}/>
							<EditSection groupSettings={this.state.group} info={this.state.info} main={this.state.isMain} close={this.closeGroup}/>
						</Container>
					</Row>
					<EditPopup/>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<Row>
						<SideBar />
						<Container className="col-md-8 pt-1 pb-9">
							<ServerLabel/>
							<GroupsSection settings={this.state.settings} editGroup={this.editGroup}/>
							<OtherSection settings={this.state.settings}/>
						</Container>
					</Row>
					<EditPopup/>
				</Fragment>

			);
		}

	}
	async editGroup(group, isMain) {
		isMain = isMain || false;
		if (group.id) {
			const groupInfo = await getGroupInfo(group.id);
			if (groupInfo.error && !groupInfo.error.redirect) {
				throw new Error(groupInfo.error);
			} else {
				this.setState({editing: true, info: groupInfo, group: group, isMain: isMain});
			}
		} else {
			if (this.state.settings.subGroups) {
				if (this.state.settings.subGroups.length > 14) {
					alert("You can only have up to 14 sub groups. Contact us if you want more.");
					return;
				}
			}
			this.setState({editing: true});


		}
	}
	async closeGroup () {
		// Refresh settings
		const newSet = await getSettings();
		if (!newSet.error) return this.setState({editing: false, info: undefined, group: undefined, settings: newSet});
		throw new Error(newSet.error);
	}
}
serverPanel.propTypes = {
	settings: PropTypes.object.isRequired
};
