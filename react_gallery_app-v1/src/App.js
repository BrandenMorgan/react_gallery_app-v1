import React, { Component } from 'react';
import './App.css';
import Photo from './components/Photo';
import Nav from './components/Nav';
import SearchForm from './components/SearchForm';

import apiKey from './config';


const key = apiKey;

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     images: []
  //   };
  // }
  render() {
    return (
      <div className="container">
        <SearchForm />
        <Nav />
        <div className="photo-container">
          <h2>Results</h2>
          <Photo />
        </div>
      </div>
    );
  }
}
export default App;
