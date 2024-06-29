import './Cell.css';

export default function Cell({letter, state}) {

	// state : 0 trasparent, 1 gris, 2 jaune, 3 vert

	const getColorBG = () => {
		if (state === 0)
			return {
				backgroundColor: 'transparent',
				border: '4px solid rgb(115, 115, 115)'
			};
		else if (state === 1)
			return {
				backgroundColor: 'rgb(115, 115, 115)',
				border: '4px solid rgb(115, 115, 115)'
			}; 
		else if (state === 2)
			return {
				backgroundColor: 'rgb(230, 138, 0)',
				border : '4px solid rgb(230, 138, 0)',
			};
		else if (state === 3)
			return {
				backgroundColor: 'rgb(41, 163, 41)',
				border: '4px solid rgb(41, 163, 41)',
			};
		else if (state === 4)
			return {
				backgroundColor: 'transparent',
				border: '4px solid #AFB3FF',
			};
	}

	return (
		<div
			className="cell"
			style={getColorBG()}
		>
			<p>{letter}</p>
		</div>
	);
  }
