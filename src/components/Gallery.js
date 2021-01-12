import React from 'react';

// Import proper components
import Photo from './Photo';
import NotFound from './NotFound';

import PropTypes from 'prop-types';

// Access the history object
import { withRouter } from 'react-router';

// Renders photos to the page
const Gallery = (props) => {

    // Get access to everything after "/search/"
    const url = props.history.location.pathname.slice(8);
    // Photo data returned from fetch API
    const results = props.data;
    let images;
    /* 
        Make sure current url matches the latest query saved in state 
        If it does, do not perform a new search. ( 'ipt' are the remaining characters starting on the 8th 
        in the default javascript search in the Nav component) 
    */

    if (url === props.query || url === '' || url === 'ipt') {
        images = results.map(image =>
            <Photo
                url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
                key={image.id}
                server={image.server}
            />
        );
    } else {
        /*
            If it doesn't match, perform a new search and render the results. This is what makes the browser
            search history work.
        */

        props.onSearch(url);
        images = results.map(image =>
            <Photo
                url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
                key={image.id}
                server={image.server}
            />
        );
    }

    return (
        <div className="photo-container">
            {/* 
                If there are image results and the path name to render those results isn't '/' show a search
                results message as a header. Otherwise don't show the message. decodeURIComponent used here to
                decode reserved URI characters back to their original characters to display a user friendly
                message. e.g. %25 -> % etc. "Results for '%'" instead of "Results for '%25'"
            */}
            {
                (images.length && props.history.location.pathname !== '/')
                    ? <h2>Results for <em>"{decodeURIComponent(props.query)}"</em></h2>
                    : <h2> </h2>
            }
            <ul>
                {/* If there are image results, show them. If not show the "NotFound.js" component */}
                {
                    (images.length)
                        ? images
                        : <NotFound search={props.query} />
                }
            </ul>
        </div>
    );
}

// Type check props 
Gallery.propTypes = {
    data: PropTypes.array,
    query: PropTypes.string,
    onSearch: PropTypes.func
};

// Wrapping a component in "withRouter" grants access to the history object.
export default withRouter(Gallery);