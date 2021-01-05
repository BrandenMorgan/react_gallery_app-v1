import React from 'react';
import { NavLink } from 'react-router-dom';


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