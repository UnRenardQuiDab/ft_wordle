import './Cell.css'
import Cell from './Cell';
import { useEffect, useState } from 'react';

export default function Line({guess, word, lineState, selected}) {

	const [state, setState] = useState(new Array(5).fill(0));

	useEffect(() => {
		if (lineState === 0) return;
		var tmpState = new Array(5).fill(1);
		var tmpWord = [...word];
		for (let i = 0; i < 5; i++) {
			if (guess[i] === word[i]) {
				tmpState[i] = 3;
				tmpWord[i] = null;
			}
		}
		for (let i = 0; i < 5; i++) {
			console.log(tmpWord);
			var index = tmpWord.indexOf(guess[i]);
			if (tmpState[i] === 1 && index >= 0) {
				tmpState[i] = 2;
				tmpWord[index] = null;
			}
		}
		setState(tmpState);
	}, [guess, word, lineState]);


	
	return (
		<div className="line">
			{guess.map((l, i) => {
				return (
					<Cell key={i} letter={l} state={state[i]} />
				)
			})}
			{new Array(5 - guess.length).fill(null).map((_, i) => (
				<Cell key={i + guess.length} letter={' '} state={i === 0 && selected ? 4 : 0} />
			))}
		</div>
	);
  }