import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const Gallery = (props) => {
    const results = props.data;
    let images = results.map(image =>
        <Photo
            url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
            key={image.id}
        />
    );
    return (
        <div className="photo-container">
            {
                (images.length)
                    ? <h2>Results for "{props.title}"</h2>
                    : <h2></h2>
            }
            <ul>
                {
                    (images.length)
                        ? images
                        : <NotFound search={props.title} />
                }
            </ul>
        </div>
    );
}

export default Gallery;