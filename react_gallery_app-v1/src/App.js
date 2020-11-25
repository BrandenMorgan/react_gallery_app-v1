import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';

// import Photo from './components/Photo';
import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
// import Home from './components/Home';
import Gallery from './components/Gallery';
import NotFound404 from './components/NotFound404';

import apiKey from './config';

const key = apiKey;

// const getTitles = (arr) => {
//   const titles = [];
//   for (let obj of arr) {
//     titles.push(obj.title);
//   }
//   return titles;
// }

class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      cats: [],
      catTitle: 'cats',
      dogs: [],
      dogTitle: 'dogs',
      computers: [],
      computerTitle: 'computers',
      loading: true,
      title: ''
    };
  }

  componentDidMount() {
    this.performSearch();
    this.catSearch();
    this.dogSearch();
    this.computerSearch();
  }

  catSearch = (query = 'cats') => {
    const cats = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;
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

  dogSearch = (query = 'dogs') => {
    const dogs = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;
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

  computerSearch = (query = 'computers') => {
    const computers = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;
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

  performSearch = (query = 'vacations') => {
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
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} />
          <Nav />
          <Switch>

            {
              (this.state.loading)
                ? <p>...Loading</p>
                : <Route exact path='/' render={() => <Gallery data={this.state.images} title={this.state.title} />} />
            }
            {/* <Route exact path='/' render={() => <Gallery data={this.state.images} />} /> */}

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
