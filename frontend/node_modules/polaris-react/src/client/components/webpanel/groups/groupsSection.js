/* Renders group related section of web panel*/

import React, { Component } from 'react';

import { CardGroup, Button, Fa } from 'mdb';
import MainGroupCard from './mainGroupCard';
import GroupCard from './groupCard';
import PropTypes from 'prop-types';
/*
For when a user has been validated,
and the server exists. Contains the actual options etc.
*/
export default class serverPanel extends Component {
	constructor(props) {
		super(props);
		this.editGroup = props.editGroup;
		this.subGroupDecks = [];
		const array = this.props.settings.subGroups;
		// Splits array into arrays of 3 or less
		if (!array) return;
		var i,j,smallArray,chunk = 3;
		for (i=0,j=array.length; i<j; i+=chunk) {
			smallArray = array.slice(i,i+chunk);
			let deck = [];
			for (var current of smallArray) {
				deck.push(<GroupCard group={current} editGroup={this.editGroup} key={current.id}/>);
			}
			this.subGroupDecks.push(
				<CardGroup deck={true} className= "mb-2" key={i}>
					{deck}
				</CardGroup>
			);
		}



	}
	render () {
		return (
			<div id="groups">
				<MainGroupCard group={this.props.settings.mainGroup} editGroup={this.editGroup} isManagingNicknames={this.props.settings.nicknameTemplate && this.props.settings.nicknameTemplate !== ""}/>
				<h1>Other groups <Button color="default" className="btn-md" onClick={this.editGroup}> <Fa icon="plus"/> </Button></h1>
				{this.subGroupDecks}
			</div>

		);
	}
}
serverPanel.propTypes = {
	settings: PropTypes.object.isRequired,
	editGroup: PropTypes.func.isRequired
};
