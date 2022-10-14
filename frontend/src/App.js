import React from 'react';
import './App.css';
import { Counter } from './features/counter/Counter';

function App() {
  return (
    <div className="App"
      style={{
        backgroundColor: '#ffcccc',
      }}>
      <header className="App-header">
        <h1>React with Redux Tool Kit</h1>
        <Counter />
      </header>
    </div>
  );
}

export default App;
