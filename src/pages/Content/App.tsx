import React from 'react';
import './App.css';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={chrome.runtime.getURL('logo.svg')}
          className="App-logo"
          alt="logo"
        />
        <p>
          Edit <code>src/pages/Content/Content.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
        <h6>The color of this paragraph is defined using SASS.</h6>
      </header>
    </div>
  );
}

export default App;
