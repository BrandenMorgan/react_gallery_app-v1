import React from 'react';

// Renders when there is no route to match the current URL
const NotFound404 = () => {
    return (
        <li className="not-found">
            <h2>Page Not Found 404</h2>
            <p>Oops! Looks like this page doesn't exist...</p>
        </li>
    );
}

export default NotFound404;