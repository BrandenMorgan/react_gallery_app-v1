import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const Gallery = (props) => {
    const results = props.data;
    let images;
    if (results.length) {
        images = results.map(image =>
            <Photo
                url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
                key={image.id}
            />
        );
    } else {
        images = <NotFound />
    }
    return (
        <div className="photo-container">
            <h2>{props.title}</h2>
            <ul>
                {images}
            </ul>
        </div>
    );
}

export default Gallery;