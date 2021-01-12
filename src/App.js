import React, { Component } from 'react';
import {
  /*
    A <Router> that uses the HTML5 history API (pushState, replaceState and the popstate event) 
    to keep your UI in sync with the URL. https://reactrouter.com/web/api/BrowserRouter
  */
  BrowserRouter,
  // Renders some UI when its path matches the current URL. https://reactrouter.com/web/api/Route
  Route,
  // Renders the first child <Route> or <Redirect> that matches the location. https://reactrouter.com/web/api/Switch
  Switch
} from 'react-router-dom';

// Import styles
import './App.css';

// Import components 
import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';
import NotFound404 from './components/NotFound404';

// Import the flickr api key to use when fetching data
import apiKey from './config';

// Container component at the top level of the application. 
class App extends Component {

  // Stores retrieved data
  state = {
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

  // Called when an instance of a component is being created and inserted into the DOM
  // https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount() {
    this.performSearch();
    this.catSearch();
    this.javascriptSearch();
    this.coffeeSearch();

  }


  // Fetches default cat pictures and stores them in state through flickr API
  catSearch = () => {
    const cats = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`;
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

  // Fetches default javascript pictures and stores them in state through flickr API
  javascriptSearch = () => {
    const javascript = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=javascript&per_page=24&format=json&nojsoncallback=1`;
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

  // Fetches default coffee pictures and stores them in state through flickr API
  coffeeSearch = () => {
    const coffee = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=coffee&per_page=24&format=json&nojsoncallback=1`;
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

  /**
   * Fetches user query from flickr API and stores photos in state.
   * @param {String} query The users search query with a default of "pacific northwest" if one is not provided 
   */
  performSearch = (query = "pacific northwest") => {
    let setLoading = new Promise((res, rej) => {
      res(() => {
        this.setState({
          loading: true
        });
      });
    });
    setLoading.then(() => {
      const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;
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
        });
    });
  }

  render() {
    return (
      // Keeps UI in sync with URL
      <BrowserRouter>
        <div className="container">
          {/* Displays default navigation buttons */}
          <Nav />
          {/* Renders first child route that matches the location */}
          <Switch>
            {/* Displays loading screen before data is fetched and stored in state */}
            {
              (this.state.loading)
                ? <React.Fragment>...Loading</React.Fragment>
                : <Route exact path='/' render={() => <Gallery data={this.state.images} query={this.state.query} />} />
            }

            {/* A route that renders the <SearchForm /> component with props, query and onSearch */}
            <Route exact path='/search' render={() => <SearchForm query={this.state.query} onSearch={this.performSearch} />} />
            {/* A route that renders the <Gallery /> component with props, data, query and onSearch */}
            <Route path='/search/:query' render={() => <Gallery data={this.state.images} query={this.state.query} onSearch={this.performSearch} />} />
            {/* A route that renders the <Gallery /> component of cat pictures with props, data and query */}
            <Route path='/cats' render={() => <Gallery data={this.state.cats} query={this.state.catTitle} />} />
            {/* A route that renders the <Gallery /> component of javascript pictures with props, data and query */}
            <Route path='/javascript' render={() => <Gallery data={this.state.javascript} query={this.state.javascriptTitle} />} />
            {/* A route that renders the <Gallery /> component of coffee pictures with props, data and query */}
            <Route path='/coffee' render={() => <Gallery data={this.state.coffee} query={this.state.coffeeTitle} />} />
            {/* A route that renders if there is no matching route */}
            <Route component={NotFound404} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }

}
export default App;
