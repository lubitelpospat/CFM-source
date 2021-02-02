import React, { Component } from 'react';
import { Container} from 'mdb';
import localStorage from '../../util/localStorage';

export default class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = { fetched: false };
	}
	async componentDidMount () {
		const discordInfo = await localStorage.getDiscordInfo();
		if (discordInfo.error) return;
		this.setState({fetched: true, info: discordInfo});
	}


	// Can't use built in navLink because they use routers built-in (RETARDS)
	render() {
		const info = DiscordInfo(this);
		return (

			<div className="col-md-2 d-md-block d-none position-fixed">
				{info ? info : null}
				<Container className={"flex-column"}>
					<h3>Polaris web panel: Beta</h3>
				</Container>
			</div>
		);
	}
}

// this is a component (sorta)

function DiscordInfo (comp) {
	if (comp.state.fetched) {
		return (
			<Container fluid className="elegant-color pb-1 pt-3">

				<h5 className="text-white">
					<img height="40" width="40" className= "rounded-circle mr-2" src ={`https://cdn.discordapp.com/avatars/${comp.state.info.id}/${comp.state.info.avatar}.png`}/>
					{`${comp.state.info.username}#${comp.state.info.discriminator}`}
				</h5>
			</Container>);
	}
}
