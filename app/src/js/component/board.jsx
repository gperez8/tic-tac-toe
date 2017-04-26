import React from 'react';
import Square from './square';

export default class Board extends React.Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	renderSquare(i) {
		return(<Square value={this.props.squares[i]} key={i} id={i} onClick={() => this.props.onClick(i)}/>);
	}

	handleClick(e) {
		this.props.sense(e.target.value);
	}

	render () {
		return(
			<div>
				<div>
					<div className='board-row'>
						{this.renderSquare(0)}
						{this.renderSquare(1)}
						{this.renderSquare(2)}
					</div>
					<div className='board-row'>
						{this.renderSquare(3)}
						{this.renderSquare(4)}
						{this.renderSquare(5)}
					</div>
					<div className='board-row'>
						{this.renderSquare(6)}
						{this.renderSquare(7)}
						{this.renderSquare(8)}
					</div>
				</div>
				<button onClick={this.handleClick.bind(this)}>ASC || DESC</button>	
			</div>	
			
		);
	}
}