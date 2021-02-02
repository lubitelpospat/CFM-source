import React from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdb';


class ModalPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false
		};
		this.toggle = this.toggle.bind(this);
	}

	toggle () {
		this.setState({
			modal: !this.state.modal
		});
	}

	render() {
		return (
			<Container>
				<Button onClick={this.toggle}>Modal</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} frame position = "bottom" backdrop = {false}>
					<ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
					<ModalBody>
            (...)
					</ModalBody>
				</Modal>
			</Container>
		);
	}
}

export default ModalPage;
