import React, { Component } from 'react';
import { Card, CardBody, CardText, CardTitle, Button, Fa, Row, Col, Container } from 'mdb';
import PropTypes from 'prop-types';
import { getGroupInfo } from '../../../util/localStorage';

export default class MainGroupCard extends Component {
	constructor(props) {
		super(props);
		this.state = { fetched: false};
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {
		let comp = this;
		if (this.props.group.id) {
			getGroupInfo(this.props.group.id).then(function(res){

				if (res.error) {
					comp.setState({error: res.error});
				} else {
					comp.setState({fetched: true, info: res});
				}
			});
		}

	}
	handleClick () {
		this.props.editGroup(this.props.group, true);
	}
	render () {
		// Fetch done. load the info
		if (this.state.fetched) {
			let ownerComp= this.state.info.Owner ?  <a href={`https://www.roblox.com/users/${this.state.info.Owner.Id}/profile`} target="_blank" rel="noopener noreferrer">{this.state.info.Owner.Name}</a> : <strong>No owner</strong>;
			return (
				<div className="jumbotron pt-3">
					{/* Title */}
					<h3>Main Group -
						<small className="text-muted"> {this.state.info.Name}</small>
					</h3>
					<Row>
						<Col>

							<p className="mb-0 mt-1">Group ID: {this.state.info.Id}</p>
							<p className="text-muted mb-0">Owned by: {ownerComp}</p>
							<p className="text-muted">Group description: <br/><small>{this.state.info.Description.substring(0, 200)}</small></p>
						</Col>
						<Col>

							<h5>Group details</h5>
							<p className="mb-0">Ranks to roles: {this.props.group.ranksToRoles ? <Fa icon="check" className="text-success"/> : <Fa icon="times" className="text-danger"/> } </p>
							{/* Will need to deal with this. nickname template isn't in mainGroup obj. This will always be X. */}
							<p className="mb-0">Managing nicknames: {this.props.isManagingNicknames ? <Fa icon="check" className="text-success"/> : <Fa icon="times" className="text-danger"/>} </p>
							{/* Similar to above issue */}
							<p>Binds set: {this.props.group.binds ? this.props.group.binds.length : 0 }</p>
						</Col>
						<Col className="ml-a">

							<img src={this.state.info.EmblemUrl} height="192" className="rounded d-none d-md-block"/>

						</Col>
					</Row>
					<Container fluid className = "px-0 mt-1 top-line-ok">
						<Button onClick={this.handleClick} className="mt-1">Edit</Button>
					</Container>


				</div>

			);
		} else if (this.state.error){
			// Error version
			return (<Card className="flex-md-row mb-4 box-shadow h-md-250">

				<CardBody className="d-flex flex-row">
					<div className="flex-column align-items-start">
						<strong className="d-inline-block mb-2"><Fa icon = "exclamation"  className="red-text mr-2 mt-2" style = {{fontSize: 20}}/>Main group</strong>
						<CardTitle>Error loading main group info</CardTitle>
						<CardText className="mb-1">{this.state.error.message}</CardText>
						<CardText>Group id: {this.props.group.id}</CardText>
					</div>

				</CardBody>
			</Card>);
		} else if (!this.props.group.id) {
			return (
				<Card className="flex-md-row mb-4 box-shadow h-md-250">

					<CardBody className="d-flex flex-row">
						<div className="flex-column align-items-start">
							<strong className="d-inline-block mb-2">Main group</strong>
							<CardTitle>Not currently set.</CardTitle>
							<CardText>To set a main group, click the + button below, enter the group Id and then click <code>set as main group</code>!</CardText>
						</div>

					</CardBody>
				</Card>

			);
		}

		else {
			return (
				<Card className="flex-md-row mb-4 box-shadow h-md-250">

					<CardBody className="d-flex flex-row">
						<div className="flex-column align-items-start">
							<strong className="d-inline-block mb-2">Main group</strong>
							<CardTitle>Loading...</CardTitle>
							<CardText className="mb-1">Owned by: <a href={`#`} target="_blank" rel="noopener noreferrer">Loading...</a></CardText>
							<CardText>Group id: {this.props.group.id}</CardText>
						</div>

					</CardBody>
					<div className = "loader h-md-128 mt-1"/>
				</Card>

			);
		}

	}
}
MainGroupCard.propTypes = {
	group: PropTypes.object.isRequired,
	editGroup: PropTypes.func.isRequired,
	isManagingNicknames: PropTypes.bool

};

// Old
/*<Card className="flex-md-row mb-4 box-shadow h-md-250">

	<CardBody className="d-flex flex-row">

		<div className="flex-column align-items-start">
			<strong className="d-inline-block mb-2">Main group</strong>
			<CardTitle>{this.state.info.Name}</CardTitle>
			<CardText className="mb-1">Owned by: <a href={`https://www.roblox.com/users/${this.state.info.Owner.Id}/profile`} target="_blank" rel="noopener noreferrer">{this.state.info.Owner.Name}</a></CardText>
			<CardText>Group id: {this.props.group.id}</CardText>
			<Button href="#" className="float-left">Edit</Button>
		</div>
		<div className="flex-column ml-5 mr-auto">
			<h5>Group details</h5>
			<p className="mb-0">Ranks to roles: {this.props.group.ranksToRoles ? <Fa icon="check" className="text-success"/> : <Fa icon="times" className="text-danger"/> } </p>
			<p>Binds set: Y</p>
		</div>
	</CardBody>

	<img className="card-img-right flex-auto d-none d-md-block" src={this.state.info.EmblemUrl} alt="Group logo" height="256" width="256"/>

</Card>
*/
