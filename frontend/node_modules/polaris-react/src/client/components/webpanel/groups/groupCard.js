import React from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText, Fa, CardFooter } from 'mdb';
import PropTypes from 'prop-types';
import { getGroupInfo } from '../../../util/localStorage';

class GroupCard extends React.Component {
	constructor (props) {
		super(props);
		this.state = { fetched: false };
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {
		let comp = this;
		getGroupInfo(this.props.group.id).then(function(res){

			if (res.error) {
				comp.setState({error: res.error});
			} else {
				comp.setState({fetched: true, info: res});

			}
		});
	}
	render() {
		// Normal card

		if (this.state.fetched) {
			let ownerComp= this.state.info.Owner ?  <a href={`https://www.roblox.com/users/${this.state.info.Owner.Id}/profile`} target="_blank" rel="noopener noreferrer">{this.state.info.Owner.Name}</a> : <strong>No owner</strong>;
			return (
				<Card className="h-md-250">
					<CardImage src={this.state.info.EmblemUrl} height="128" className="rounded"/>
					<CardBody>
						<CardTitle>{this.state.info.Name}</CardTitle>
						<CardText className="mb-1">Owned by: {ownerComp}</CardText>
						<CardText>Group id: {this.props.group.id}</CardText>
					</CardBody>
					<CardFooter><Button onClick={this.handleClick}>Edit</Button></CardFooter>
				</Card>
			);
		} else if (this.state.error){
			// Error page
			return (
				<Card className="h-md-250">

					<CardBody>
						<CardTitle><Fa icon = "exclamation"  className="red-text mr-2 mt-2" style = {{fontSize: 20}}/>Error loading info</CardTitle>
						<CardText className="mb-1">{this.state.error.message}</CardText>
						<CardText>Group id: {this.props.group.id}</CardText>
					</CardBody>
				</Card>
			);
		} else {
			// Loading page
			return (
				<Card className="h-md-250">
					<div className = "loader h-md-128"/>
					<CardBody>
						<CardTitle>Loading Group info...</CardTitle>
						<CardText className="mb-1">Owned by: <a href="#" target="_blank" rel="noopener noreferrer">Loading...</a></CardText>
						<CardText>Group id: {this.props.group.id}</CardText>
						<Button href="#">Edit</Button>
					</CardBody>
				</Card>
			);
		}

	}
	handleClick() {
		this.props.editGroup(this.props.group);
	}
}
export default GroupCard;
GroupCard.propTypes = {
	editGroup: PropTypes.func.isRequired,
	group: PropTypes.object.isRequired
};
