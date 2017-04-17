import React from 'react';
import Square from './square';

export default class Board extends React.Component {
	constructor() {
		super();
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
		};
	}

	handleClick(i) {
		const squares = this.state.squares.slice();
		squares[i] = this.state.xIsNext ? 'X' : 'O';

		this.setState({
			squares: squares,
			xIsNext: !this.state.xIsNext,
		});
	}

	calculateWinner (squares) {
		let i = 0;
		let band = false;
		const playWinner = [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[1,4,7],
			[2,5,8],
			[0,4,8],
			[2,4,6],
		];

		for (let i = 0; i < playWinner.length; i++) {
			const [a, b, c] = playWinner[i];
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return squares[a];
			}
		}
		return null;
	}

	renderSquare(i) {
		return(<Square value={this.state.squares[i]} key={i} id={i} onClick={this.handleClick.bind(this)}/>);
	}

	render () {
		const winner = this.calculateWinner(this.state.squares);
		let status = '';

		if (winner !== null) {
			status = 'winner' + (winner);
		} else {
			status = 'Next play: ' + (this.state.xIsNext ? 'X' : 'O');		
		}

		return(
			<div>	
				<div className='status'>{status}</div>
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
		);
	}
}