import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';

import Photo from './components/Photo';
import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
import Home from './components/Home';
import Gallery from './components/Gallery';

import apiKey from './config';

const key = apiKey;

class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'vacation') => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(resData => {
        this.setState({
          images: resData.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })
  }

  render() {
    console.log(this.state.images);
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} />
          <Nav onSearch={this.performSearch} />
          {
            (this.state.loading)
              ? <p>...Loading</p>
              : <Gallery data={this.state.images} />
          }

        </div>
        <Switch>
          <Route path='/cats' render={() => <Gallery data={this.state.images} />} />
          <Route path='/dogs' component={Photo} />
          <Route path='/computers' component={Photo} />
        </Switch>
      </BrowserRouter>

    );
  }
}
export default App;
