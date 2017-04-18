import React from 'react';
import ReactDOM from 'react-dom';
import Board from './board';

class Game extends React.Component {
	
	constructor() {
		super();
		this.state = {
			stepNumber: undefined,
			isWinner: false,
			history: [{
				squares: Array(9).fill(null),
			}],			
			xIsNext: true,
		};
	}

	calculateWinner (squares) {
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
			if (squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c]) {
				return squares[a];
			}
		}
		return null;
	}

	handleClick(i) {
		let history = this.state.history;
		let move = this.state.stepNumber !== undefined ?
			this.state.stepNumber :
			history.length-1;
		let current = this.state.history[move];
		const squares = current.squares.slice();

		if (this.calculateWinner(squares) || squares[i]) {
			return;
		}
		
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		history = [...history,{squares: squares}];

		this.setState({
			history: history,
			xIsNext: !this.state.xIsNext,
		});
	}

	jumpTo(move,squares) {
		if (this.calculateWinner(squares) !== undefined) {
			this.setState({
				stepNumber: move,
				xIsNext: (move % 2) ? false : true,
			});
		}
	}

	render() {
		let history = this.state.history;
		console.log('history',this.state.history,this.state.stepNumber);

		let move = this.state.stepNumber !== undefined ?
			this.state.stepNumber :
			history.length-1;

		let squares = history[move].squares;
		const winner = this.calculateWinner(squares);
		let status = '';

		if (winner !== null) {
			status = 'winner ' + (winner);
		} else {
			status = 'Next play: ' + (this.state.xIsNext ? 'X' : 'O');		
		}

		const moves = history.map((element,index) => {
			const desc = index ? 'Move #' + index : 'Start Game';
			return (
				<li>
					<a href="#" key={index} 
						onClick={() => this.jumpTo(index,history[history.length-1])}>
						{desc}
					</a>
				</li>
			);
		});

		return(
			<div className='game'>
				<div className='game-board'>
					<div className='status'>
						<h1>
							{status}
						</h1>
					</div>
					<Board squares={squares} onClick={this.handleClick.bind(this)}/>
				</div>
				<div className='game-info'>
					<ol>{moves}</ol>
				</div>	
			</div>	
		);
	}
}

ReactDOM.render(<Game />, document.getElementById('main'));