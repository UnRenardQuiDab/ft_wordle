import Line from './Line';
import './Popup.css'

export default function Popup({guess, word, isWin}) {


	
	
	return (
		<div className="popup">
			<h2>{isWin ? 'Victory' : 'Defeat'}</h2>
			<button>Play again</button>
			<Line
				guess={guess}
				word={word}
				lineState={isWin ? 2 : 3}
			/>


		</div>
	);
  }