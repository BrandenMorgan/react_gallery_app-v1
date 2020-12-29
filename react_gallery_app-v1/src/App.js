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
      title: '',
      cats: [],
      catTitle: 'cats',
      dogs: [],
      dogTitle: 'dogs',
      computers: [],
      computerTitle: 'computers',
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch();
    this.catSearch();
    this.dogSearch();
    this.computerSearch();
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

  dogSearch = () => {
    const dogs = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=dogs&per_page=24&format=json&nojsoncallback=1`;
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
  }

  computerSearch = () => {
    const computers = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=computers&per_page=24&format=json&nojsoncallback=1`;
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
  }

  performSearch = (query = "pictures") => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;
    fetch(url)
      .then(res => res.json())
      .then(resData => {
        this.setState({
          images: resData.photos.photo,
          loading: false,
          title: query
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
          {/* <SearchForm onSearch={this.performSearch} /> */}
          <Nav />
          <Switch>
            {
              (this.state.loading)
                ? <React.Fragment>...Loading</React.Fragment>
                : <Route exact path='/' render={() => <Gallery data={this.state.images} title={this.state.title} />} />
            }
            <Route exact path='/search' render={() => <SearchForm onSearch={this.performSearch} />} />
            <Route path='/search/:query' render={() => <Gallery data={this.state.images} title={this.state.title} />} />
            {/* <Route path='/:query' render={() => <Gallery data={this.state.images} title={this.state.title} />} /> */}
            {/* <Route exact path='/search' render={() => <SearchForm onSearch={this.performSearch} />} />
            <Route path='/search/:query' render={() => <SearchForm onSearch={this.performSearch} />} /> */}

            <Route path='/cats' render={() => <Gallery data={this.state.cats} title={this.state.catTitle} />} />
            <Route path='/dogs' render={() => <Gallery data={this.state.dogs} title={this.state.dogTitle} />} />
            <Route path='/computers' render={() => <Gallery data={this.state.computers} title={this.state.computerTitle} />} />
            <Route component={NotFound404} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}
export default App;
