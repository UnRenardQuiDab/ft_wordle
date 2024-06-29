import { useEffect } from 'react';
import Line from './Line';
import './Popup.css'

export default function Popup({guess, word, isWin, onClick}) {

	const handleKeyDown = (event) => {
		if (event.keyCode === 32) {
			onClick()
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown, true);
		return () => {
			document.removeEventListener('keydown', handleKeyDown, true);
		};
		// eslint-disable-next-line
	  }, []);
	
	return (
		<div className="popup">
			<h2>{isWin ? 'Victory' : 'Defeat'}</h2>
			<button
				onClick={()=>onClick()}
			>
				Play again
			</button>
			<Line
				guess={guess}
				word={word}
				lineState={isWin ? 2 : 3}
				/>
		</div>
	);
  }