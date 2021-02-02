import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdb';
import PropTypes from 'prop-types';

export default class ServerDropdown extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false,
		};

	}
	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}
	render() {// This will be auto-generated using User details
		var arr = [];
		for (var current of this.props.servers) {
			arr.push(<DropdownItem href={`/panel/${current.id}`} key={current.id}>{current.name}</DropdownItem>);
		}
		return (
			<Dropdown isOpen = { this.state.dropdownOpen } toggle = { this.toggle } >
				<DropdownToggle caret color="default">
            Select server
				</DropdownToggle>
				<DropdownMenu>
					{arr}
				</DropdownMenu>
			</Dropdown>
		);
	}
}


ServerDropdown.propTypes = {
	servers: PropTypes.array.isRequired
};
