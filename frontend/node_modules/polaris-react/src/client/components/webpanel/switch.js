import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
	onClick: PropTypes.func.isRequired,
	enabled: PropTypes.bool,
	onDisabledClick: PropTypes.func,
	state: PropTypes.bool.isRequired,
	className: PropTypes.string
};

const defaultProps = {
	enabled: true,
	state: true,
	className: '',
	onDisabledClick: () => {}
};

function Switch({state, onClick, onDisabledClick, className, enabled}) {
	const classes = ['switch', className, (state ? 'on ' : ''), (enabled ? '' : 'disabled ')].join(' ');
	return (
		<div className={classes} onClick={(e) => enabled ? onClick(e) : onDisabledClick(e)}>
			<div className="switch-toggle"></div>
		</div>
	);

}

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;
