import React from 'react';
import Photo from './Photo';
import Nav from './Nav';
import SearchForm from './SearchForm';

const Home = () => {
    return (
        <div className="container">
            <SearchForm />
            <Nav />
            <div className="photo-container">
                <Photo />
            </div>
        </div>

    );
}

export default Home;