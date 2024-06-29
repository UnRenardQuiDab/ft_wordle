import './App.css';
import { useEffect, useState } from 'react';
import Line from './component/Line';

function App() {

  const [lines, setLines] = useState(new Array(6).fill(null).map(() => ({
    guess: [],
    state: 0,
  })));

  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const word = 'HELLO'.split('');

  const addChar = (key) => {
    let newLines = [...lines];
    var line = newLines.find(line => line.state === 0);
    if (line && line.guess.length < 5) {
        line.guess.push(key.toUpperCase());
    }
    setLines(newLines);
  }

  const removeChar = () => {
    let newLines = [...lines];
    var line = newLines.find(line => line.state === 0);
    if (line && line.guess.length > 0) {
      line.guess.pop();
    }
    setLines(newLines);
  }

  const handleKeyDown = (event) => {
    if (charset.includes(event.key)) {
      addChar(event.key)
    } else if (event.keyCode === 8) {
      removeChar()
    } else if (event.keyCode === 13) {
      valideLine()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const valideLine = () => {
    let newLines = [...lines];
    var line = newLines.find(line => line.state === 0);
    if (line && line.guess.length === 5) {
      line.state = 1;
    }
    console.log(newLines);
    setLines(newLines);
  }

  return (
    <div className="App">
      <div>
        {lines.map((line, index) => (
          <Line
            key={index}
            guess={line.guess}
            word={word}
            lineState={line.state}
            selected={index === lines.findIndex((l) => l.state === 0)}
          />
        ))}
      </div>

    </div>
  );
}

export default App;
