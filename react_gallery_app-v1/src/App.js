import React, { Component } from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import './App.css';

import Photo from './components/Photo';
import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
import Home from './components/Home';

import apiKey from './config';


const key = apiKey;
const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunsets&per_page=24&format=json&nojsoncallback=1`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    fetch(url)
      .then(res => res.json())
      .then(resData => console.log(resData.photos.photo))
  }

  render() {
    return (
      <BrowserRouter>
        <Route exact path='/' component={Home} />
        <div className="container">
          <Route path='/search' render={() => <SearchForm />} />
          <Route path='/nav' component={Nav} />
          <Route path='/photos' component={Photo} />
        </div>
      </BrowserRouter>

    );
  }
}
export default App;
