import React from 'react';

// A special version of Link adds styling attributes to the rendered element when it matches the current URL
import { NavLink } from 'react-router-dom';

// A functional component which renders navigation links
const Nav = () => {
    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink exact to='/search'>Search</NavLink></li>
                <li><NavLink to='/cats'>Cats</NavLink></li>
                <li><NavLink to='/javascript'>JavaScript</NavLink></li>
                <li><NavLink to='/coffee'>Coffee</NavLink></li>
            </ul>
        </nav>
    );
}

export default Nav;