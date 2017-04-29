import React from 'react';

export default class Square extends React.Component {
	render () {
		if (this.props.squareWin) {
			return (
				<button className='square-win' 
						onClick={() => this.props.onClick(this.props.id)}>
						{ this.props.value }
				</button>
			);
		}

		return (
			<button className='square' onClick={() => this.props.onClick(this.props.id)}>
			{ this.props.value }
			</button>
		);
	} 
}
