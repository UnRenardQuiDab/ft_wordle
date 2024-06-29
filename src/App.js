import './App.css';
import DictFile from './words.txt';
import { useEffect, useState } from 'react';
import Line from './component/Line';

function App() {

  const [dictword, setDictword] = useState([]);
  const [targetWord, setTargetWord] = useState([]);
  const [seedOffset, setSeedOffset] = useState(0);

  useEffect(() => {
    async function dict() {
      await getDict();
    }
    console.log('dict');
    dict()
  }, []);

  const getRandom = (seed = 0) => {
    console.log('seed: ', seed);
    seed = ((seed * 1103515245 + 12345) & 0x7FFFFFFF);
    return (seed / 0x7FFFFFFF);
  }

  const getDict = async () => {
    var dict = [];
    let i = 0;

    await fetch(DictFile)
    .then(function(response){
      return response.text();
    }).then(function (data) {
      dict = data.split('\n');
    })
    for (let word of dictword) {
      if (word.length != 5)
        return (false);
    }
    setDictword(dict);
    selectWord(dict = dict);
  }

  const selectWord = (dict = dictword, offset = 0) => {
    const date = new Date();
    let rand = Math.floor(getRandom((date.getFullYear() ^ ((date.getDate() + offset) << date.getMonth()))) * dict.length);

    console.log('rand: ', rand);
    setTargetWord(dict[rand].toUpperCase().split(''));
    console.log(dict[rand].toUpperCase());
    //console.log(rand, '; ', dict.length);
  }

  const nextWord = () => {
    setSeedOffset(seedOffset + 1);
    selectWord(dictword, Math.floor(Math.random() * dictword.length));
  }

  const checkWord = (word) => {
    return dictword.find(word);
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
            word={targetWord}
            lineState={line.state}
            selected={index === lines.findIndex((l) => l.state === 0)}
          />
        ))}
      </div>
      <button
        onClick={nextWord}
      >
        nextWord
      </button>
    </div>
  );
}

export default App;
