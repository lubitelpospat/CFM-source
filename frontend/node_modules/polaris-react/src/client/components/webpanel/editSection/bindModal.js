import React from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdb';
import PropTypes from 'prop-types';


class BindModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false
		};

	}

	render() {
		return (
			<Container>
				<Modal isOpen={this.props.modal} toggle={this.props.toggle}>
					<ModalHeader toggle={this.props.toggle}>Modal</ModalHeader>
					<ModalBody>
            Modal body! :D
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.props.toggle}>Close</Button>{' '}
						<Button color="primary">Save changes</Button>
					</ModalFooter>
				</Modal>
			</Container>
		);
	}
}

export default BindModal;

BindModal.propTypes = {
	roleName: PropTypes.string.isRequired,
	toggle: PropTypes.func.isRequired,
	modal: PropTypes.bool.isRequired
};
