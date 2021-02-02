import React, { Component } from 'react';
import { PopoverBody, PopoverHeader, Fa } from 'mdb';
import  Popover  from './popoverEdited';

export default class HelpPopover extends Component {

	render () {
		return (
			<Popover
				component={<Fa icon="question-circle"/>}
				placement="top"
				popoverBody="popover on top"
				className="btn btn-default">
				<PopoverHeader>popover on top</PopoverHeader>
				<PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
			</Popover>
		);
	}

}
