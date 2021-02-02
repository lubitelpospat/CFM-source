import React from 'react';

class Alert extends React.Component {
	constructor(props) {
		super(props);
		this.state = {active: false};
	}
	componentDidMount() {
		const component = this;
		const cached =  sessionStorage.getObject("alertMsg_");
		if (cached) {
			if (cached.active) component.setState(cached);
			return;
		}
		fetch('/api/alert')
			.then(res => res.json())
			.then(function(res){
				if (res.active) {
					component.setState(res);
				}
				if (!res.error) sessionStorage.setObject(res);
			});
	}

	render(){
		if (this.state.active) {
			return(
				<div className={"text-center alert alert-" + this.state.type} role="alert">
					<span dangerouslySetInnerHTML={{__html: this.state.message}}/>
				</div>
			);
		} else return null;
	}
}

export default Alert;
