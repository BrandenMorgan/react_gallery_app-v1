import React from 'react';
import PropTypes from 'prop-types';

// Renders each indivdual photo
const Photo = ({ url }) => {
    return (
        <li>
            <img src={url} alt="" />
        </li>
    );
}

// Type check props 
Photo.propTypes = {
    url: PropTypes.string
};

export default Photo;