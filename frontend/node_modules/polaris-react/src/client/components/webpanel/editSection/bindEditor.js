import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import  { Table, Fa, Button } from 'mdb';
import BindRow from './BindRow';
import {editGroup, editMainGroup, deleteBind} from 'settingsManager';

export default class BindEditor extends Component {
	constructor (p) {
		// Will need support for old binds too.
		super(p);
		this.save = this.save.bind(this);
		this.rmvRank = this.rmvRank.bind(this);
		this.cancel = this.cancel.bind(this);
		this.state = {
			rows: [],
			values: []
		};
		// Generate rows
		const tableRows = [];
		if (p.bind) {
			for (var counter=0; counter < p.bind.length; counter++) {
				let current = p.bind[counter];
				tableRows.push(
					<BindRow key={`${counter}-bindRow`} pos={counter} rank={current.rank} exclusive={current.exclusive} groupId={this.props.groupId} save = {this.save} rmv={this.rmvRank}/>
				);
				this.state.values.push({
					rank: current.rank,
					exclusive: current.exclusive,
					role: this.props.roleId
				});
			}

		}
		this.state.rows = tableRows;
		this.addRank = this.addRank.bind(this);
	}

	addRank () {
		if (this.state.rows.length === 0 || this.state.rows[this.state.rows.length - 1].props.rank) {
			// if last ele has a rank prop its real. that means add another!
			let newArr = [...this.state.rows];
			let bindId= `${Math.floor(Math.random() * 1000)}-NEW`;

			newArr.push(<BindRow key={bindId} groupId={this.props.groupId} save = {this.save} cancel={this.cancel}/>);

			this.setState({ rows: newArr });
		}
	}
	rmvRank (pos) {
		for (var count = 0; count < this.state.rows.length; count++) {
			if (this.state.rows[count].props.pos === pos) {
				const values = [...this.state.values];
				const rows = [...this.state.rows];
				rows.splice(count, 1);
				const removed = values.splice(count, 1)[0];
				this.setState({
					rows: rows,
					values: values
				});
				removed.role = this.props.roleId;
				deleteBind(this.props.groupId, removed);
				return;
			}
		}
	}
	cancel () {
		const newArr = [...this.state.rows];
		newArr.splice(newArr.length - 1, 1);
		this.setState({ rows: newArr });
	}


	save (newBind) {
		// check dupes
		const values = [...this.state.values];
		const rows = [...this.state.rows];
		for (let current of this.state.values) {
			if (newBind.rank === current.rank && newBind.exclusive === current.exclusive) {
				alert('You cannot have duplicate binds! There is already a bind with those properties.');
				return; // Stop. Its a duplicate, don't allow
			}
		}
		// Add in role id for settings api
		newBind.role = this.props.roleId;
		// If this runs its ok

		values.push(newBind);

		// Delete editing bind thing
		rows.splice(rows.length - 1, 1);
		// Replace with real one:
		rows.push(
			<BindRow key={`${rows.length}-bindRow`} pos={rows.length} rank={newBind.rank} exclusive={newBind.exclusive} groupId={this.props.groupId} save = {this.save} rmv={this.rmvRank}/>);

		if (this.props.isMain) {
			editMainGroup({binds: values});
		} else {
			editGroup(this.props.groupId, {binds: values });
		}
		this.setState({values: values, rows: rows});
	}


	render () {
		return (
			<Fragment>
				<h2>Ranks  <small><Button onClick = {this.addRank} outline size="sm"><Fa icon="plus" aria-hidden="true"/></Button></small></h2>
				<Table>
					<thead>
						<tr>
							<th>Rank id</th>
							<th style={{width: "30%"}}>Rank name</th>
							<th style={{width: "30%"}}>Exclusive?</th>
							<th>Options</th>
						</tr>
					</thead>

					<tbody>
						{this.state.rows ? this.state.rows : null}


					</tbody>
				</Table>
			</Fragment>

		);
	}

}
BindEditor.propTypes = {
	bind: PropTypes.array,
	groupId: PropTypes.number,
	isMain: PropTypes.bool,
	roleId: PropTypes.string
};
