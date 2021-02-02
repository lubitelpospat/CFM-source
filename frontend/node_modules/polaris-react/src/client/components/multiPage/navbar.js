import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdb';
const style = {
	backgroundColor: "#00695c"
};

class FixedNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapse: false,
			isWideEnough: false
		};
		this.onClick = this.onClick.bind(this);
	}

	onClick(){
		this.setState({
			collapse: !this.state.collapse,
		});
	}


	render() {
		return (
			<div>
				<Navbar style={style} dark expand="md" fixed="top">
					<NavbarBrand href="/">
						<strong>Polaris</strong>
					</NavbarBrand>
					{ !this.state.isWideEnough && <NavbarToggler onClick={this.onClick } />}
					<Collapse isOpen = { this.state.collapse } navbar>
						<NavbarNav left>
							<NavItem>
								<NavLink to="/" a={true}>Home</NavLink>
							</NavItem>
							<NavItem>
								<NavLink to="/features" a={true}>Features</NavLink>
							</NavItem>
							<NavItem  active>
								<NavLink to="/panel">Web panel</NavLink>
							</NavItem>
						</NavbarNav>
					</Collapse>
				</Navbar>



			</div>
		);
	}
}

export default FixedNavbar;
