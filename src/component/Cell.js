import './Cell.css';

export default function Cell({letter, state}) {

	const getColorBG = (state) => {
		if (state === 0)
			return {
				backgroundColor: 'transparent',
				border: '4px solid #737373'
			};
		else if (state === 1)
			return {
				backgroundColor: '#737373',
				border: '4px solid #737373'
			}; 
		else if (state === 2)
			return {
				backgroundColor: '#d2b334',
				border : '4px solid #d2b334',
			};
		else if (state === 3)
			return {
				backgroundColor: '#29a329',
				border: '4px solid #29a329',
			};
		else if (state === 4)
			return {
				backgroundColor: 'transparent',
				border: '4px solid #AFB3FF',
			};
		else if (state === 5)
			return {
				backgroundColor: '#c71d1d',
				border : '4px solid #c71d1d'
		}
	}

	return (
		<div
			className="cell"
			style={getColorBG(state)}
		>
			<p>{letter}</p>
		</div>
	);
  }
