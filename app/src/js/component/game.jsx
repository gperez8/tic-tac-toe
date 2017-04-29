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
			movePlay: Array(1).fill('Start Game'),			
			xIsNext: true,
			sense: 'desc',
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
				return [a,b,c];
			}
		}
		return null;
	}

	handleClick(i) {
		let play;
		let history = this.state.history;
		
		let move = 	this.state.stepNumber !== undefined ? 
					this.state.stepNumber : 
					history.length-1;
		
		let current = this.state.history[move];
		const squares = current.squares.slice();
		const movePlay = this.state.movePlay.slice();
		
		if (this.calculateWinner(squares) || 
			this.state.isWinner ||
			squares[i]) {
			return;
		}
		
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		history = [...history,{squares: squares}];

		play = 
		i >= 0 && i < 3 ? '(1,' : 
		i >= 3 && i < 6 ? '(2,' :
		i >= 6 && i < 9 ? '(3,' : 'null';

		play += (String(i+1) + ')');
		movePlay.push(play);

		this.setState({
			history: history,
			xIsNext: !this.state.xIsNext,
			movePlay: movePlay,
		});
	}

	handleSense() {
		let move = this.state.movePlay;
		move.reverse();

		this.setState({
			sense: this.state.sense === 'desc' ? 'asc' : 'desc',
			movePlay: move,
		});
	}

	jumpTo(move, winner) {		
		if (winner !== null || this.state.isWinner) {
			this.setState({
				isWinner: true,
				stepNumber: move,
				xIsNext: (move % 2) ? false : true,
			});
		}			
	}

	render() {
		let sense = this.state.sense;
		let history = this.state.history;
		
		let move = 
			this.state.stepNumber !== undefined ?
			this.state.stepNumber :
			history.length-1;
		
		let mov = this.state.movePlay;
		let squares = history[move].squares;
		let status = '';

		const winner = this.calculateWinner(squares);
		const isWinner = this.state.isWinner;

		if (winner !== null) {
			status = 'winner ' + (squares[winner[0]]);
		} else {
			status = 'Next play: ' + (this.state.xIsNext ? 'X' : 'O');		
		}

		const moves = history.map((element,index) => {
			/*
				asi lo tienen el tutorial
				const desc = index ? 'Move #' + mov : 'Start Game';
			*/
			
			let pos = index; 
			
			if (sense === 'asc') {
				pos = (history.length-1) - pos;
			}

			const desc = mov[index];
			
			if (pos === move && isWinner) {	
				return (
					<li>
						<b>
							<a href="#" key={pos} 
								onClick={() => this.jumpTo(pos,winner)}>
								{desc}
							</a>
						</b>
					</li>
				);
			} 

			return (
				<li>
					<a href="#" key={pos} 
						onClick={() => this.jumpTo(pos,winner)}>
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
					<Board 	squares={squares} 
							onClick={this.handleClick.bind(this)} 
							sense={this.handleSense.bind(this)}
							winningRoute={winner}/>
				</div>
				<div className='game-info'>
					<ol>{moves}</ol>
				</div>	
			</div>	
		);
	}
}

ReactDOM.render(<Game />, document.getElementById('main'));