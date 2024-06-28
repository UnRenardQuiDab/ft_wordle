import logo from './logo.svg';
import './App.css';
import DictWord from './words.txt';

function App() {

  const getDict = () => {
    let dict; 
    fetch(DictWord)
    .then(function(response){
      return response.text();
    }).then(function (data) {
      dict = data.split('\n');
    })
    return dict;
  }
  const checkWord = (word) => {
    return getDict().find(word);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
