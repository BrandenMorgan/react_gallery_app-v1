import React from 'react';
import PropTypes from 'prop-types';

// Renders when a users search returns no results.
const NotFound = ({ search }) => {
    return (
        <li className="not-found">
            <h3>No Results Found</h3>
            <p>Your search for "{search}" did not return any results. Please try again.</p>
        </li>
    );
}

// Type check props 
NotFound.propTypes = {
    search: PropTypes.string
};

export default NotFound;