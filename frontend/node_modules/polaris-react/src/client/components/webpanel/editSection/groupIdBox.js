import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Fa } from 'mdb';
import { getGroupInfo } from '../../../util/localStorage';
import { checkId } from 'settingsManager';
/*
For editng groups ids
*/
export default class GroupIdBox extends Component {
	constructor(props) {
		super(props);
		this.state = { value: props.id ?""+props.id : ""};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	handleChange(event) {
		if (isNum(event.target.value)) {
			this.setState({value: event.target.value, invalid: false});
		} else {
			this.setState({invalid: "Group id must be a number."});
		}
	}
	async handleClick () {
		const id = parseInt(this.state.value, 10);
		if (this.state.value !== "" && !this.state.invalid && !isNaN(this.state.value)) {
			this.setState({msg: "Validating group..."});
			const res = await getGroupInfo(id);
			if (res.error) {
				if (res.error.status === 500 || 404 || 400) {
					this.setState({invalid: 'Invalid group id', msg: false});
				} else if (res.error.message) {
					this.setState({invalid: 'Error: ' + res.error.message, msg: false});
					throw new Error(res.error);
				}
			} else {

				const presenceCheck = checkId(id);
				if (presenceCheck) {
					if (presenceCheck.error) {
						throw new Error(presenceCheck.error);
					} else {
						this.setState({invalid: 'You already have a group with that id. Edit it instead.', msg: false});
					}
				} else {
					this.props.setId(id);
				}
			}
		}
	}
	render () {
		return (
			<Fragment>
				<div className="md-form input-group col-md-4 pl-0 mb-1">
					<input type="text" className="form-control" placeholder="Group id" aria-label="Roblox group id" aria-describedby="The group id of your roblox group" value={this.state.value} onChange={this.handleChange}/>
					<div className="input-group-append">
						<Button className="m-0" type="button" onClick={this.handleClick}>Set</Button>
					</div>
				</div>
				{this.state.invalid ? <small id="GroupIdErrorMsg" className="form-text text-danger mt-0"><Fa icon="warning"/> {this.state.invalid} </small> : null}
				{this.state.msg ? <small id="GroupIdMsg" className="form-text mt-1"><Fa icon="refresh" spin/> {this.state.msg} </small> : null}
			</Fragment>


		);
	}

}

GroupIdBox.propTypes = {
	id: PropTypes.number,
	setId: PropTypes.func,
};

function isNum(num){
	return !isNaN(num);
}
