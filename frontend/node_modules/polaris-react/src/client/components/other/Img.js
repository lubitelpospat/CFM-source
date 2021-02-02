/* Img implementation making use of a loader. */
import React from 'react';
import PropTypes from 'prop-types';

class Img extends React.Component {
	constructor(props) {
		super(props);
		this.state = {loaded: false};

		this.image = new Image();
		this.image.src = props.src;
		this.image.onload = this.finished.bind(this);
	}
	finished () {
		this.setState({loaded: true});
	}

	render(){
		const {
			src,
			height,
			width,
			className,
			...attributes
		} = this.props;
		if (this.state.loaded) {
			return <img className = {className} src={src} height={height} width={width} {...attributes}/>;
		} else {
			{/*Loading icon does NOT inherit classes. Many classes (especially those applied to images) break it.*/}
			const style = {
				height: height,
				width: width
			};
			return <div className ="loader" style = {style} {...attributes}></div>;
		}
	}
}

export default Img;

Img.propTypes = {
	src: PropTypes.string.isRequired,
	width: PropTypes.string,
	height: PropTypes.string,
	className: PropTypes.string
};
