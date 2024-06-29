import './App.css';
import DictFile from './words.txt';
import { useEffect, useState } from 'react';
import Line from './component/Line';

function App() {

  const [dictword, setDictword] = useState([]);
  const [targetWord, setTargetWord] = useState([]);

  useEffect(() => {
    async function dict() {
      await getDict();
    }
    console.log('dict');
    dict()
  }, []);

  const getDict = async () => {
    var dict = [];
    await fetch(DictFile)
    .then(function(response){
      return response.text();
    }).then(function (data) {
      dict = data.split('\n');
    })
    setDictword(dict);
    let i = 0;
    let rand = Math.floor(Math.random() * dict.length);
    //console.log(rand, '; ', dict.length);
    for (let word of dict) {
      if (word.length != 5)
        return (false);
      if (i++ == rand) {
        setTargetWord(word.toUpperCase().split(''));
        console.log(word);
      }
    };
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

    </div>
  );
}

export default App;
