import './Keyboard.css'

export default function Keyboard({lines, word}) {


	const getColorBG = (l) => {

		if (lines.length === 0) return;

		for (let line of lines) {
			var index = line.guess.indexOf(l);
			if (word[index] === l)
				return {
					backgroundColor: '#29a329',
					border : '4px solid #29a329',
				};
		}

		for (let line of lines) {
			if (line.guess.includes(l) && word.includes(l))
				return {
					backgroundColor: '#d2b334',
					border: '4px solid #d2b334',
				}
		}

		for (let line of lines) {
			if (line.guess.includes(l))
				return {
					backgroundColor: '#3D3D3D',
					border: '4px solid #3D3D3D'
				}
		}

	}

	const alpha1 = "QWERTYUIOP".split('')
	const alpha2 = "ASDFGHJKL".split('')
	const alpha3 = "ZXCVBNM".split('')

	return (
		<div className="keyboard col">
			<div className="keyboardLine row">
				{alpha1.map((l) => (
					<p className="key" key={l} style={getColorBG(l)}>
						{l}
					</p>
				))}
			</div>

			<div className="keyboardLine row">
				{alpha2.map((l) => (
					<p className="key" key={l} style={getColorBG(l)}>
						{l}
					</p>
				))}
			</div>

			<div className="keyboardLine row">
				{alpha3.map((l) => (
					<p className="key" key={l} style={getColorBG(l)}>
						{l}
					</p>
				))}
			</div>
		</div>
	);
  }
