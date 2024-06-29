import './App.css';
import { useEffect, useState } from 'react';
import Line from './component/Line';
import Popup from './component/Popup';

function App() {

  const [dictword, setDictword] = useState([]);
  const [targetWord, setTargetWord] = useState([]);
  const [seedOffset, setSeedOffset] = useState(0);

  useEffect(() => {
    async function dict() {
      await getDict();
    }
    dict()
    // eslint-disable-next-line
  }, []);

  const getRandom = (seed = 0) => {
    seed = ((seed * 1103515245 + 12345) & 0x7FFFFFFF);
    return (seed / 0x7FFFFFFF);
  }

  const getDict = async () => {
    var dict = [];
    await fetch('./words.txt')
    .then((response) => {
      return response.text();
    }).then((data) => {
      dict = data.split('\n');
    })
    for (let word of dict) {
      if (word.length !== 5)
        return (false);
    }
    setDictword(dict);
    selectWord(dict);
    return (true)
  }

  const selectWord = (dict, offset = 0) => {
    const date = new Date();
    let rand = Math.floor(getRandom((date.getFullYear() ^ ((date.getDate() + offset) << date.getMonth()))) * dict.length);
    setTargetWord(dict[rand].toUpperCase().split(''));
  }

  const nextWord = () => {
    setSeedOffset(seedOffset + 1);
    selectWord(dictword, Math.floor(Math.random() * dictword.length));
    setLines(resetLines());
  }

  const checkWord = (word) => {
    return dictword.find((w) => w.toUpperCase() === word.join(''));
  }

  const resetLines = () => {
    return new Array(6).fill(null).map(() => ({
      guess: [],
      state: 0,
    }))
  }

  const [lines, setLines] = useState(new Array(6).fill(null).map(() => ({
    guess: [],
    state: 0,
  })));

  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

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
    if (lines.find(line => line.state === 2)) return;
    if (charset.includes(event.key)) {
      addChar(event.key)
    }
    else if (event.keyCode === 8) {
      removeChar()
    }
    else if (event.keyCode === 13) {
      valideLine()
    }
    else if (event.keyCode === 27) {
      console.log(targetWord.join(''))
    }
  }

  useEffect(() => {
    if (targetWord.length === 0 || dictword.length === 0) return;
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
        document.removeEventListener('keydown', handleKeyDown, true);
    };
    // eslint-disable-next-line
  }, [targetWord, dictword]);

  const arrayCompare = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  const valideLine = () => {
    let newLines = [...lines];
    var line = newLines.find(line => line.state === 0);
    if (line && arrayCompare(line.guess, targetWord)) {
      line.state = 2;
    } 
    else if (line && line.guess.length === 5 && checkWord(line.guess)) {
      line.state = 1;
    }
    setLines(newLines);
  }

  if (dictword.length === 0)
    return (
      <div className='App'>
        <p className='invalidDict'>
          Invalid dictionnary
        </p>
      </div>
    )
  return (
    <div className="App">
      <div className='grid'>
        {lines.map((line, index) => (
          <Line
            key={index}
            guess={line.guess}
            word={targetWord}
            lineState={line.state}
            selected={index === lines.findIndex((l) => l.state === 0) && !lines.find((l) => l.state === 2)}
          />
        ))}
        {
          lines.find(line => line.guess.length === 5 && !checkWord(line.guess)) &&
          <p className='error'>Word not in dictionnary</p>
        }
      </div>
      {
       (lines.find(line => line.state === 2) || !lines.find(line => line.state === 0)) &&
        <Popup
          guess={targetWord}
          word={targetWord}
          isWin={lines.find(line => line.state === 2)}
          onClick={nextWord}
        />
      }
    </div>
  );
}

export default App;
