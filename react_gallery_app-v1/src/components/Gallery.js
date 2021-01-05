import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';
import { withRouter } from 'react-router';


const Gallery = (props) => {
    const url = props.history.location.pathname.slice(8);
    let results = props.data;
    let images;
    if (url === props.query || url === '' || url === 'ipt') {
        images = results.map(image =>
            <Photo
                url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
                key={image.id}
            />
        );
    } else {
        props.onSearch(url);
        images = results.map(image =>
            <Photo
                url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
                key={image.id}
            />
        );
    }
    return (
        <div className="photo-container">
            {
                (images.length && url !== "")
                    ? <h2>Results for "{props.query}"</h2>
                    : <h2></h2>
            }
            <ul>
                {
                    (images.length)
                        ? images
                        : <NotFound search={props.query} />
                }
            </ul>
        </div>
    );
}

export default withRouter(Gallery);