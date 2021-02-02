import React, { Component } from 'react';
import { Container, Fa, Button } from 'mdb';
import { editEvent, save } from 'settingsManager';
export default class EditPopup extends Component {
	constructor (p) {
		super(p);
		this.state = {};

		editEvent(this.showPopup.bind(this));
		this.save = this.save.bind(this);
	}
	showPopup (t) {
		if (t) {
			// a setting has been changed. show popup
			this.setState({showing: true});
		} else {
			// save completed. hide.
			this.setState({showing: false});
		}

	}
	save () {
		save();
	}

	render ( ) {
		if (this.state.showing) {
			return (
				<div className="row">
					<Container className="fixed-bottom bottom-popup elegant-color text-white col-md-9 mb-1 rounded p-2">


						<div className="row d-flex justify-content-center align-items-center">

							<p className="pt-3 pr-2"><Fa icon="warning" className="text-danger"/> You have unsaved changes.</p>
							<p className="pt-3 pr-2 d-none d-md-flex">You will lose them if you do not save. 😱</p>
							<Button color="success" onClick={this.save}>Save <Fa icon="check"/></Button>
						</div>
					</Container>
				</div>
			);
		} else return null;

	}



}
