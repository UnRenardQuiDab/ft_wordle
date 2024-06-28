import logo from './logo.svg';
import './App.css';
import DictFile from './words.txt';
import { useEffect, useState } from 'react';

function App() {

  const [dictword, setDictword] = useState([]);
  const [targetWord, setTargetWord] = useState('aaaaa');

  useEffect(() => {
    async function dict() {
      await getDict();
    }
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
    console.log(rand, '; ', dict.length);
    for (let word of dict) {
      if (word.length != 5)
        return (false);
      if (i++ == rand)
        setTargetWord(word);
    };
  }

  const checkWord = (word) => {
    return getDict().find(word);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() => {console.log(dictword)}}
        >
          get dict
        </button>
        <button
          onClick={() => {console.log(targetWord)}}
        >
          get word
        </button>
      </header>
    </div>
  );
}

export default App;
