import React from 'react';

// works most of the time
const NotFound = (props) => {
    return (
        <li className="not-found">
            <h3>No Results Found</h3>
            <p>Your search for "{props.search}" did not return any results. Please try again.</p>
        </li>
    );
}

export default NotFound;