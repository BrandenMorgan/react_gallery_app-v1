import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';

import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';
import NotFound404 from './components/NotFound404';

import apiKey from './config';
const key = apiKey;


class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      query: '',
      cats: [],
      catTitle: 'cats',
      javascript: [],
      javascriptTitle: 'javascript',
      coffee: [],
      coffeeTitle: 'coffee',
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch();
    this.catSearch();
    this.javascriptSearch();
    this.coffeeSearch();
  }

  catSearch = () => {
    const cats = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=cats&per_page=24&format=json&nojsoncallback=1`;
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
  }

  javascriptSearch = () => {
    const javascript = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=javascript&per_page=24&format=json&nojsoncallback=1`;
    fetch(javascript)
      .then(res => res.json())
      .then(resData => {
        this.setState({
          javascript: resData.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })
  }

  coffeeSearch = () => {
    const coffee = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=coffee&per_page=24&format=json&nojsoncallback=1`;
    fetch(coffee)
      .then(res => res.json())
      .then(resData => {
        this.setState({
          coffee: resData.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })
  }

  performSearch = (query = "pacific northwest") => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;
    fetch(url)
      .then(res => res.json())
      .then(resData => {
        this.setState({
          images: resData.photos.photo,
          loading: false,
          query: query
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })
    this.setState({
      loading: true
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Nav />
          <Switch>
            {
              (this.state.loading)
                ? <React.Fragment>...Loading</React.Fragment>
                : <Route exact path='/' render={() => <Gallery data={this.state.images} query={this.state.query} />} />
            }
            <Route exact path='/search' render={() => <SearchForm query={this.state.query} onSearch={this.performSearch} />} />
            <Route path='/search/:query' render={() => <Gallery data={this.state.images} query={this.state.query} onSearch={this.performSearch} />} />
            <Route path='/cats' render={() => <Gallery data={this.state.cats} query={this.state.catTitle} />} />
            <Route path='/javascript' render={() => <Gallery data={this.state.javascript} query={this.state.javascriptTitle} />} />
            <Route path='/coffee' render={() => <Gallery data={this.state.coffee} query={this.state.coffeeTitle} />} />
            <Route component={NotFound404} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}
export default App;
