import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Nav extends Component {

    state = {
        navButton: ''
    }

    onSearchChange = e => {
        this.setState({ navButton: e.target.value })
    }

    handleClick = e => {
        e.preventDefault();
        this.props.onSearch(this.state.value)

    }

    render() {
        return (
            <nav className="main-nav">
                <ul>
                    <li><NavLink to='/cats'>Cats</NavLink></li>
                    <li><NavLink to='/dogs'>Dogs</NavLink></li>
                    <li><NavLink to='/computers'>Computers</NavLink></li>
                </ul>
            </nav>

        );
    }

}

export default Nav;