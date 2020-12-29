import React from 'react';
import Photo from './Photo';
import Nav from './Nav';
import SearchForm from './SearchForm';
import Gallery from './Gallery';

// Not being used
const Home = (props) => {
    return (
        <div className="container">
            <SearchForm />
            <Nav />
            <div className="photo-container">
                <Gallery data={props.data} />
            </div>
        </div>

    );
}

export default Home;