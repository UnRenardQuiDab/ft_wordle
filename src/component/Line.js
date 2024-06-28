import './Cell.css'
import Cell from './Cell';
import { useEffect, useState } from 'react';

export default function Line({guess, word}) {

	const [state, setState] = useState(new Array(5).fill(0));
	console.log(guess);
	
	useEffect(() => {
		let tmpState = new Array(5).fill(0);
		let tmpWord = word.toUpperCase().split('');
		for (let i = 0; i < 5; i++) {
			if (guess[i] === word[i]) {
				tmpState[i] = 3;
				tmpWord[i] = '';
			}
		}
		for (let i = 0; i < 5; i++) {
			console.log(tmpState);
			console.log(tmpWord);
			var index = tmpWord.indexOf(guess[i]);
			console.log(index);
			if (tmpState[i] === 0 && index >= 0) {
				console.log(i);
				tmpState[i] = 2;
				tmpWord[index] = '';
			}
		}
		setState(tmpState);
	}, [guess, word]);
	
	return (
		<div
			className="line"
		>
			{guess.toUpperCase().split("").map((l, i) => {
				return (
					<Cell key={i} letter={l} state={state[i]} />
				)
			})}
		</div>
	);
  }