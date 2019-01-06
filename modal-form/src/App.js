import React, { Component } from 'react';
import './App.css';
import InteractiveGrid from './components/Instrument';

class App extends Component {
  render() {
    return (
      <div className="App">
        <InteractiveGrid />
      </div>
    );
  }
}

export default App;
