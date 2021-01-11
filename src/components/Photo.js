import React from 'react';
import PropTypes from 'prop-types';

// Renders each indivdual photo
const Photo = ({ url, server }) => {
    return (
        (server !== "0")
            ? <li>
                <img src={url} alt="" />
            </li>
            : <li>
                <em>No image available</em>
            </li>

    );
}

// Type check props 
Photo.propTypes = {
    url: PropTypes.string,
    server: PropTypes.string
};

export default Photo;