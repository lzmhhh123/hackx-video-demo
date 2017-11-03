import React, { Component } from 'react';
import './css/App.css';
import NavBar from './NavBar';

class App extends Component {
  constructor() {
    super();

  }
  componentDidMount() {

  }
  render() {
    return (
      <div className="container">
        <NavBar />
      </div>
    );
  }
}

export default App;
