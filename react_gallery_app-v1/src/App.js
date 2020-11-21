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
      cats: [],
      dogs: [],
      computers: [],
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch();
    // this.performSearch('cats');
    // this.performSearch('dogs');
    // this.performSearch('computers');
  }

  performSearch = (query = 'vacations') => {
    const defaultUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;
    const cats = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=cats&per_page=24&format=json&nojsoncallback=1`;
    const dogs = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=dogs&per_page=24&format=json&nojsoncallback=1`;
    const computers = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=computers&per_page=24&format=json&nojsoncallback=1`;
    fetch(cats)
      .then(res => res.json())
      .then(resData => {
        this.setState({
          cats: resData.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })

    fetch(dogs)
      .then(res => res.json())
      .then(resData => {
        this.setState({
          dogs: resData.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })

    fetch(computers)
      .then(res => res.json())
      .then(resData => {
        this.setState({
          computers: resData.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })

    fetch(defaultUrl)
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
    console.log("cats: ", this.state.cats);
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} />
          <Nav />
          <Switch>
            <Route exact path='/' render={() => <Gallery data={this.state.images} />} />
            <Route path='/cats' render={() => <Gallery data={this.state.cats} />} />
            <Route path='/dogs' render={() => <Gallery data={this.state.dogs} />} />
            <Route path='/computers' render={() => <Gallery data={this.state.computers} />} />
          </Switch>
          {/* {
            (this.state.loading)
              ? <p>...Loading</p>
              : <Gallery data={this.state.images} />
          } */}

        </div>

      </BrowserRouter>

    );
  }
}
export default App;
